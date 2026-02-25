import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: unknown) => {
  const d = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[SEND-STARTER-WELCOME] ${step}${d}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      throw new Error("Email is required");
    }

    const mailerliteApiKey = Deno.env.get("MAILERLITE_API_KEY");
    if (!mailerliteApiKey) {
      throw new Error("MAILERLITE_API_KEY not configured");
    }

    const trimmedEmail = email.trim().toLowerCase();
    logStep("Tagging subscriber for starter welcome", { email: trimmedEmail });

    // Upsert subscriber and add the "starter-purchased" tag
    // MailerLite will trigger the automation based on this tag
    const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${mailerliteApiKey}`,
      },
      body: JSON.stringify({
        email: trimmedEmail,
        fields: { source: "starter-purchase" },
        status: "active",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      logStep("MailerLite upsert error", data);
      throw new Error("Failed to update subscriber in MailerLite");
    }

    const subscriberId = data.data?.id;
    logStep("Subscriber upserted", { subscriberId });

    // Assign the "starter-purchased" tag
    if (subscriberId) {
      const tagResponse = await fetch(
        `https://connect.mailerlite.com/api/subscribers/${subscriberId}/tags`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${mailerliteApiKey}`,
          },
          body: JSON.stringify({
            tags: ["starter-purchased"],
          }),
        }
      );

      if (!tagResponse.ok) {
        const tagData = await tagResponse.json();
        logStep("Tag assignment warning (non-fatal)", tagData);
      } else {
        logStep("Tag 'starter-purchased' assigned successfully");
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Welcome flow triggered" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: msg });
    return new Response(
      JSON.stringify({ success: false, error: msg }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
