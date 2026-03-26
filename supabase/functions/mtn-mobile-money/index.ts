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
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const mtnApiUser = Deno.env.get("MTN_API_USER");
    const mtnApiKey = Deno.env.get("MTN_API_KEY");
    const mtnSubscriptionKey = Deno.env.get("MTN_SUBSCRIPTION_KEY");
    const mtnEnvironment = Deno.env.get("MTN_ENVIRONMENT") || "sandbox";

    if (!mtnApiUser || !mtnApiKey || !mtnSubscriptionKey) {
      throw new Error("MTN API credentials not configured. Please set MTN_API_USER, MTN_API_KEY, and MTN_SUBSCRIPTION_KEY in your edge function secrets.");
    }

    const payload: PaymentRequest = await req.json();
    const { orderId, phoneNumber, amount, currency, customerName, customerEmail } = payload;

    if (!orderId || !phoneNumber || !amount || !currency) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: orderId, phoneNumber, amount, currency" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const transactionRef = crypto.randomUUID();
    const baseUrl = mtnEnvironment === "production"
      ? "https://proxy.momoapi.mtn.com"
      : "https://sandbox.momodeveloper.mtn.com";

    const token = btoa(`${mtnApiUser}:${mtnApiKey}`);

    const callbackUrl = `${supabaseUrl}/functions/v1/mtn-callback`;

    const requestBody = {
      amount: amount.toString(),
      currency: currency,
      externalId: orderId,
      payer: {
        partyIdType: "MSISDN",
        partyId: phoneNumber.replace(/\D/g, ''),
      },
      payerMessage: `Payment for order ${orderId}`,
      payeeNote: `Order payment from ${customerName || 'Customer'}`,
    };

    const mtnResponse = await fetch(
      `${baseUrl}/collection/v1_0/requesttopay`,
      {
        method: "POST",
        headers: {
          "Authorization": `Basic ${token}`,
          "X-Reference-Id": transactionRef,
          "X-Target-Environment": mtnEnvironment,
          "X-Callback-Url": callbackUrl,
          "Ocp-Apim-Subscription-Key": mtnSubscriptionKey,
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify(requestBody),
      }
    );

    const { data: transaction, error: dbError } = await supabase
      .from("payment_transactions")
      .insert({
        order_id: orderId,
        payment_method: "MTN",
        phone_number: phoneNumber,
        amount: amount,
        currency: currency,
        status: mtnResponse.ok ? "pending" : "failed",
        external_transaction_id: transactionRef,
        external_reference: transactionRef,
        payment_response: {
          statusCode: mtnResponse.status,
          requestBody: requestBody,
        },
        error_message: !mtnResponse.ok ? await mtnResponse.text() : null,
        customer_name: customerName,
        customer_email: customerEmail,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to record transaction");
    }

    if (!mtnResponse.ok) {
      const errorText = await mtnResponse.text();
      return new Response(
        JSON.stringify({
          success: false,
          error: "Payment request failed",
          details: errorText,
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
        message: "Payment request initiated. Please approve the transaction on your phone.",
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
    console.error("Error processing MTN payment:", error);
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
