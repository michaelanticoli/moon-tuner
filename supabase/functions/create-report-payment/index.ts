import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const body = await req.json().catch(() => ({}));
    const { birthDate, birthTime, birthLocation } = body;

    // Build a descriptive line item name
    const reportDesc = birthDate
      ? `Lunar Map Report — Born ${birthDate}${birthLocation ? `, ${birthLocation}` : ""}`
      : "Lunar Map Report";

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: "price_1TFCbXPHw233ej93pBzgKcgO",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/lunar-reports?session_id={CHECKOUT_SESSION_ID}&birth_date=${encodeURIComponent(birthDate || "")}&birth_time=${encodeURIComponent(birthTime || "")}&birth_location=${encodeURIComponent(birthLocation || "")}`,
      cancel_url: `${req.headers.get("origin")}/lunar-reports`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
