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

    const airtelClientId = Deno.env.get("AIRTEL_CLIENT_ID");
    const airtelClientSecret = Deno.env.get("AIRTEL_CLIENT_SECRET");
    const airtelEnvironment = Deno.env.get("AIRTEL_ENVIRONMENT") || "sandbox";

    if (!airtelClientId || !airtelClientSecret) {
      throw new Error("Airtel API credentials not configured. Please set AIRTEL_CLIENT_ID and AIRTEL_CLIENT_SECRET in your edge function secrets.");
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

    const baseUrl = airtelEnvironment === "production"
      ? "https://openapiuat.airtel.africa"
      : "https://openapiuat.airtel.africa";

    const authResponse = await fetch(`${baseUrl}/auth/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: airtelClientId,
        client_secret: airtelClientSecret,
        grant_type: "client_credentials",
      }),
    });

    if (!authResponse.ok) {
      throw new Error("Failed to authenticate with Airtel API");
    }

    const authData = await authResponse.json();
    const accessToken = authData.access_token;

    const transactionRef = `ORD-${orderId}-${Date.now()}`;
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
    const callbackUrl = `${supabaseUrl}/functions/v1/airtel-callback`;

    const requestBody = {
      reference: transactionRef,
      subscriber: {
        country: currency === "UGX" ? "UG" : "UG",
        currency: currency,
        msisdn: cleanPhoneNumber,
      },
      transaction: {
        amount: amount,
        country: currency === "UGX" ? "UG" : "UG",
        currency: currency,
        id: transactionRef,
      },
      callbackUrl: callbackUrl,
    };

    const paymentResponse = await fetch(
      `${baseUrl}/merchant/v1/payments/`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "X-Country": currency === "UGX" ? "UG" : "UG",
          "X-Currency": currency,
        },
        body: JSON.stringify(requestBody),
      }
    );

    const paymentData = await paymentResponse.json();

    const { data: transaction, error: dbError } = await supabase
      .from("payment_transactions")
      .insert({
        order_id: orderId,
        payment_method: "AIRTEL",
        phone_number: phoneNumber,
        amount: amount,
        currency: currency,
        status: paymentResponse.ok && paymentData.status?.success ? "pending" : "failed",
        external_transaction_id: paymentData.data?.transaction?.id || transactionRef,
        external_reference: transactionRef,
        payment_response: paymentData,
        error_message: !paymentResponse.ok || !paymentData.status?.success
          ? paymentData.status?.message || "Payment request failed"
          : null,
        customer_name: customerName,
        customer_email: customerEmail,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to record transaction");
    }

    if (!paymentResponse.ok || !paymentData.status?.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Payment request failed",
          details: paymentData.status?.message || "Unknown error",
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
        externalTransactionId: paymentData.data?.transaction?.id,
        orderId: orderId,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing Airtel payment:", error);
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
