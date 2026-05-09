/**
 * customer-portal
 *
 * Returns a Stripe Customer Portal URL for billing management.
 * Supports: update payment method, cancel subscription, view invoices.
 *
 * Body: { userId: string, returnPath?: string }
 */
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
      apiVersion: "2025-08-27.basil",
    });
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const body = await req.json();
    const { userId, returnPath } = body as { userId: string; returnPath?: string };

    if (!userId) return json({ error: "userId required" }, 400);

    const { data: sub, error } = await supabase
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", userId)
      .single();

    if (error || !sub?.stripe_customer_id) {
      return json({ error: "No Stripe customer found for this user" }, 404);
    }

    const origin = req.headers.get("origin") ?? "https://moontuner.xyz";
    const returnUrl = `${origin}${returnPath ?? "/membership/manage"}`;

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: sub.stripe_customer_id,
      return_url: returnUrl,
    });

    return json({ url: portalSession.url });
  } catch (err) {
    console.error("customer-portal error:", err);
    return json({ error: "An unexpected error occurred. Please try again." }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
