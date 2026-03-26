import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

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

    const url = new URL(req.url);
    const transactionId = url.searchParams.get("transactionId");

    if (!transactionId) {
      return new Response(
        JSON.stringify({ error: "Transaction ID is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { data: transaction, error: dbError } = await supabase
      .from("payment_transactions")
      .select("*")
      .eq("id", transactionId)
      .single();

    if (dbError || !transaction) {
      return new Response(
        JSON.stringify({ error: "Transaction not found" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (transaction.status !== "pending") {
      return new Response(
        JSON.stringify({
          success: true,
          status: transaction.status,
          transaction: {
            id: transaction.id,
            orderId: transaction.order_id,
            amount: transaction.amount,
            currency: transaction.currency,
            paymentMethod: transaction.payment_method,
            status: transaction.status,
            createdAt: transaction.created_at,
            completedAt: transaction.completed_at,
          },
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    let updatedStatus = "pending";
    let errorMessage = null;

    if (transaction.payment_method === "MTN") {
      const mtnApiUser = Deno.env.get("MTN_API_USER");
      const mtnApiKey = Deno.env.get("MTN_API_KEY");
      const mtnSubscriptionKey = Deno.env.get("MTN_SUBSCRIPTION_KEY");
      const mtnEnvironment = Deno.env.get("MTN_ENVIRONMENT") || "sandbox";

      if (mtnApiUser && mtnApiKey && mtnSubscriptionKey) {
        const baseUrl = mtnEnvironment === "production"
          ? "https://proxy.momoapi.mtn.com"
          : "https://sandbox.momodeveloper.mtn.com";

        const token = btoa(`${mtnApiUser}:${mtnApiKey}`);

        const statusResponse = await fetch(
          `${baseUrl}/collection/v1_0/requesttopay/${transaction.external_transaction_id}`,
          {
            headers: {
              "Authorization": `Basic ${token}`,
              "X-Target-Environment": mtnEnvironment,
              "Ocp-Apim-Subscription-Key": mtnSubscriptionKey,
            },
          }
        );

        if (statusResponse.ok) {
          const statusData = await statusResponse.json();

          if (statusData.status === "SUCCESSFUL") {
            updatedStatus = "success";
          } else if (statusData.status === "FAILED") {
            updatedStatus = "failed";
            errorMessage = statusData.reason || "Payment failed";
          }

          await supabase
            .from("payment_transactions")
            .update({
              status: updatedStatus,
              error_message: errorMessage,
              payment_response: statusData,
            })
            .eq("id", transactionId);
        }
      }
    } else if (transaction.payment_method === "AIRTEL") {
      const airtelClientId = Deno.env.get("AIRTEL_CLIENT_ID");
      const airtelClientSecret = Deno.env.get("AIRTEL_CLIENT_SECRET");
      const airtelEnvironment = Deno.env.get("AIRTEL_ENVIRONMENT") || "sandbox";

      if (airtelClientId && airtelClientSecret) {
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

        if (authResponse.ok) {
          const authData = await authResponse.json();
          const accessToken = authData.access_token;

          const statusResponse = await fetch(
            `${baseUrl}/standard/v1/payments/${transaction.external_transaction_id}`,
            {
              headers: {
                "Authorization": `Bearer ${accessToken}`,
                "X-Country": transaction.currency === "UGX" ? "UG" : "UG",
                "X-Currency": transaction.currency,
              },
            }
          );

          if (statusResponse.ok) {
            const statusData = await statusResponse.json();

            if (statusData.status?.success && statusData.data?.transaction?.status === "TS") {
              updatedStatus = "success";
            } else if (statusData.data?.transaction?.status === "TF") {
              updatedStatus = "failed";
              errorMessage = "Payment failed";
            }

            await supabase
              .from("payment_transactions")
              .update({
                status: updatedStatus,
                error_message: errorMessage,
                payment_response: statusData,
              })
              .eq("id", transactionId);
          }
        }
      }
    }

    const { data: updatedTransaction } = await supabase
      .from("payment_transactions")
      .select("*")
      .eq("id", transactionId)
      .single();

    return new Response(
      JSON.stringify({
        success: true,
        status: updatedTransaction?.status || updatedStatus,
        transaction: {
          id: updatedTransaction?.id || transaction.id,
          orderId: updatedTransaction?.order_id || transaction.order_id,
          amount: updatedTransaction?.amount || transaction.amount,
          currency: updatedTransaction?.currency || transaction.currency,
          paymentMethod: updatedTransaction?.payment_method || transaction.payment_method,
          status: updatedTransaction?.status || updatedStatus,
          createdAt: updatedTransaction?.created_at || transaction.created_at,
          completedAt: updatedTransaction?.completed_at,
          errorMessage: updatedTransaction?.error_message,
        },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error checking payment status:", error);
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
