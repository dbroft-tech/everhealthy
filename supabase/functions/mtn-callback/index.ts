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

    console.log("MTN Callback received:", JSON.stringify(callbackData));

    const financialTransactionId = callbackData.financialTransactionId;
    const externalId = callbackData.externalId;
    const status = callbackData.status;
    const reason = callbackData.reason;

    if (!externalId) {
      console.error("No external ID in callback");
      return new Response(
        JSON.stringify({ error: "Missing external ID" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { data: transaction, error: findError } = await supabase
      .from("payment_transactions")
      .select("*")
      .eq("order_id", externalId)
      .eq("payment_method", "MTN")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (findError || !transaction) {
      console.error("Transaction not found for order:", externalId);
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

    if (status === "SUCCESSFUL") {
      newStatus = "success";
    } else if (status === "FAILED") {
      newStatus = "failed";
      errorMessage = reason || "Payment failed";
    }

    const { error: updateError } = await supabase
      .from("payment_transactions")
      .update({
        status: newStatus,
        error_message: errorMessage,
        payment_response: {
          ...transaction.payment_response,
          callback: callbackData,
          financialTransactionId: financialTransactionId,
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
    console.error("Error processing MTN callback:", error);
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
