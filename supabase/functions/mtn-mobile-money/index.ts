import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface PaymentRequest {
  orderId: string;
  phoneNumber: string;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    // -----------------------------
    // SUPABASE CLIENT
    // -----------------------------
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // -----------------------------
    // MTN ENV VARIABLES
    // -----------------------------
    const mtnApiUser = Deno.env.get("MTN_API_USER");
    const mtnApiKey = Deno.env.get("MTN_API_KEY");
    const mtnSubscriptionKey = Deno.env.get("MTN_SUBSCRIPTION_KEY");
    const mtnEnvironment = Deno.env.get("MTN_ENVIRONMENT") || "sandbox";

    if (!mtnApiUser || !mtnApiKey || !mtnSubscriptionKey) {
      throw new Error("MTN API credentials not configured.");
    }

    // -----------------------------
    // REQUEST BODY
    // -----------------------------
    const payload: PaymentRequest = await req.json();
    const { orderId, phoneNumber, amount, currency, customerName, customerEmail } = payload;

    if (!orderId || !phoneNumber || !amount || !currency) {
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // -----------------------------
    // FORMAT UGANDA PHONE NUMBER
    // -----------------------------
    const formattedPhone = phoneNumber.startsWith("256")
      ? phoneNumber
      : `256${phoneNumber.replace(/^0/, "")}`;

    // -----------------------------
    // MTN BASE URL
    // -----------------------------
    const baseUrl =
      mtnEnvironment === "production"
        ? "https://proxy.momoapi.mtn.com"
        : "https://sandbox.momodeveloper.mtn.com";

    // -----------------------------
    // STEP 1: GENERATE ACCESS TOKEN
    // -----------------------------
    const tokenResponse = await fetch(`${baseUrl}/collection/token/`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${mtnApiUser}:${mtnApiKey}`)}`,
        "Ocp-Apim-Subscription-Key": mtnSubscriptionKey,
      },
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      throw new Error("Failed to get MTN access token: " + errorText);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // -----------------------------
    // STEP 2: REQUEST TO PAY
    // -----------------------------
    const transactionRef = crypto.randomUUID();
    const callbackUrl = `${supabaseUrl}/functions/v1/mtn-callback`;

    const requestBody = {
      amount: amount.toString(),
      currency: currency,
      externalId: orderId,
      payer: {
        partyIdType: "MSISDN",
        partyId: formattedPhone,
      },
      payerMessage: `Payment for order ${orderId}`,
      payeeNote: `Order payment from ${customerName || "Customer"}`,
    };

    const paymentResponse = await fetch(
      `${baseUrl}/collection/v1_0/requesttopay`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Reference-Id": transactionRef,
          "X-Target-Environment": mtnEnvironment,
          "X-Callback-Url": callbackUrl,
          "Ocp-Apim-Subscription-Key": mtnSubscriptionKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    // -----------------------------
    // SAVE TRANSACTION IN DATABASE
    // -----------------------------
    const { data: transaction, error: dbError } = await supabase
      .from("payment_transactions")
      .insert({
        order_id: orderId,
        payment_method: "MTN",
        phone_number: formattedPhone,
        amount: amount,
        currency: currency,
        status: paymentResponse.ok ? "pending" : "failed",
        external_transaction_id: transactionRef,
        external_reference: transactionRef,
        payment_response: {
          statusCode: paymentResponse.status,
          requestBody: requestBody,
        },
        error_message: !paymentResponse.ok ? await paymentResponse.text() : null,
        customer_name: customerName,
        customer_email: customerEmail,
      })
      .select()
      .single();

    if (dbError) {
      throw new Error("Failed to record transaction");
    }

    // -----------------------------
    // RESPONSE TO FRONTEND
    // -----------------------------
    if (!paymentResponse.ok) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Payment request failed",
          transactionId: transaction.id,
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Payment request sent. Approve on your phone.",
        transactionId: transaction.id,
        externalTransactionId: transactionRef,
        orderId: orderId,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Internal server error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});