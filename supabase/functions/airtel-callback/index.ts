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

    const callbackData = await req.json();

    console.log("Airtel Callback received:", JSON.stringify(callbackData));

    const transactionId = callbackData.transaction?.id;
    const transactionStatus = callbackData.transaction?.status;
    const reference = callbackData.transaction?.reference;

    if (!reference && !transactionId) {
      console.error("No reference or transaction ID in callback");
      return new Response(
        JSON.stringify({ error: "Missing transaction reference" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    let transaction;
    let findError;

    if (transactionId) {
      const result = await supabase
        .from("payment_transactions")
        .select("*")
        .eq("external_transaction_id", transactionId)
        .eq("payment_method", "AIRTEL")
        .maybeSingle();

      transaction = result.data;
      findError = result.error;
    }

    if (!transaction && reference) {
      const result = await supabase
        .from("payment_transactions")
        .select("*")
        .eq("external_reference", reference)
        .eq("payment_method", "AIRTEL")
        .maybeSingle();

      transaction = result.data;
      findError = result.error;
    }

    if (findError || !transaction) {
      console.error("Transaction not found for reference:", reference || transactionId);
      return new Response(
        JSON.stringify({ error: "Transaction not found" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    let newStatus = "pending";
    let errorMessage = null;

    if (transactionStatus === "TS" || transactionStatus === "SUCCESSFUL") {
      newStatus = "success";
    } else if (transactionStatus === "TF" || transactionStatus === "FAILED") {
      newStatus = "failed";
      errorMessage = callbackData.transaction?.message || "Payment failed";
    } else if (transactionStatus === "TA") {
      newStatus = "pending";
    }

    const { error: updateError } = await supabase
      .from("payment_transactions")
      .update({
        status: newStatus,
        error_message: errorMessage,
        payment_response: {
          ...transaction.payment_response,
          callback: callbackData,
        },
      })
      .eq("id", transaction.id);

    if (updateError) {
      console.error("Failed to update transaction:", updateError);
      throw new Error("Failed to update transaction");
    }

    console.log(`Transaction ${transaction.id} updated to status: ${newStatus}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Callback processed successfully",
        transactionId: transaction.id,
        status: newStatus,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing Airtel callback:", error);
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
