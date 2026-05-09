/**
 * create-subscription-checkout
 *
 * Creates a Stripe Checkout session for membership tier subscriptions.
 * Stores user_id in metadata so the webhook can associate the customer.
 *
 * Body: { tier: 'reflective' | 'insight' | 'practitioner', userId: string }
 */
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

type MembershipTier = "reflective" | "insight" | "practitioner";

const TIER_CONFIG: Record<
  MembershipTier,
  { label: string; priceEnvKey: string; successPath: string }
> = {
  reflective: {
    label: "Reflective Membership",
    priceEnvKey: "STRIPE_PRICE_REFLECTIVE",
    successPath: "/membership?welcome=reflective",
  },
  insight: {
    label: "Premium Insight Layer",
    priceEnvKey: "STRIPE_PRICE_INSIGHT",
    successPath: "/membership?welcome=insight",
  },
  practitioner: {
    label: "Practitioner Archive",
    priceEnvKey: "STRIPE_PRICE_PRACTITIONER",
    successPath: "/membership?welcome=practitioner",
  },
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
    const { tier, userId } = body as { tier: MembershipTier; userId: string };

    if (!tier || !TIER_CONFIG[tier]) {
      return json({ error: "Invalid tier" }, 400);
    }
    if (!userId) {
      return json({ error: "userId required" }, 400);
    }

    const config = TIER_CONFIG[tier];
    const priceId = Deno.env.get(config.priceEnvKey);
    if (!priceId) {
      return json({ error: `Stripe price not configured for tier: ${tier}` }, 500);
    }

    // Look up existing Stripe customer ID if the user already has one
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", userId)
      .single();

    const existingCustomerId = sub?.stripe_customer_id ?? undefined;

    const origin = req.headers.get("origin") ?? "https://moontuner.xyz";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: existingCustomerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}${config.successPath}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/membership`,
      metadata: {
        purchase_type: "membership",
        tier,
        user_id: userId,
        label: config.label,
      },
      subscription_data: {
        metadata: { user_id: userId, tier },
      },
      allow_promotion_codes: true,
    });

    // Associate the customer immediately so the webhook can find the user
    if (session.customer && typeof session.customer === "string") {
      await supabase
        .from("subscriptions")
        .update({ stripe_customer_id: session.customer })
        .eq("user_id", userId);
    }

    return json({ url: session.url });
  } catch (err) {
    console.error("create-subscription-checkout error:", err);
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
