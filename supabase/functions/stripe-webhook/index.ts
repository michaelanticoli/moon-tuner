/**
 * stripe-webhook
 *
 * Handles all Stripe webhook events for the Moontuner subscription lifecycle:
 * - customer.subscription.created / updated / deleted
 * - invoice.payment_succeeded / payment_failed
 * - checkout.session.completed (for one-off purchases and gifts)
 *
 * Updates the `subscriptions` and `purchases` tables accordingly.
 */
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  apiVersion: "2025-08-27.basil",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

// Map Stripe price IDs → membership tiers
const PRICE_TIER_MAP: Record<string, string> = {
  [Deno.env.get("STRIPE_PRICE_REFLECTIVE") ?? "price_reflective"]: "reflective",
  [Deno.env.get("STRIPE_PRICE_INSIGHT") ?? "price_insight"]: "insight",
  [Deno.env.get("STRIPE_PRICE_PRACTITIONER") ?? "price_practitioner"]: "practitioner",
};

function tierFromPriceId(priceId: string): string {
  return PRICE_TIER_MAP[priceId] ?? "reflective";
}

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") ?? "";
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature ?? "", webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      // ── Checkout completed ─────────────────────────────────────────────────
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const meta = session.metadata ?? {};

        if (session.mode === "subscription" && meta.purchase_type === "membership") {
          // Subscription created via checkout — sub record is handled by
          // customer.subscription.created, but we can associate the customer
          // with the user_id here if we stored it in metadata.
          const userId = meta.user_id;
          const customerId =
            typeof session.customer === "string" ? session.customer : session.customer?.id;
          if (userId && customerId) {
            await supabase
              .from("subscriptions")
              .update({ stripe_customer_id: customerId })
              .eq("user_id", userId);
          }
        }

        if (session.mode === "payment" && meta.purchase_type === "one_off") {
          // Mark one-off purchase as completed
          if (session.id) {
            const paymentIntent =
              typeof session.payment_intent === "string"
                ? session.payment_intent
                : session.payment_intent?.id;
            await supabase
              .from("purchases")
              .update({
                status: "completed",
                stripe_payment_intent_id: paymentIntent ?? null,
                fulfilled_at: new Date().toISOString(),
              })
              .eq("stripe_session_id", session.id);
          }
        }

        if (session.mode === "payment" && meta.purchase_type === "gift") {
          // Mark gift as paid
          if (session.id) {
            await supabase
              .from("gifts")
              .update({ status: "paid" })
              .eq("stripe_session_id", session.id);
          }
        }
        break;
      }

      // ── Subscription created ───────────────────────────────────────────────
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const customerId =
          typeof sub.customer === "string" ? sub.customer : sub.customer.id;
        const priceId = sub.items.data[0]?.price?.id ?? "";
        const tier = tierFromPriceId(priceId);

        const periodStart = sub.current_period_start
          ? new Date(sub.current_period_start * 1000).toISOString()
          : null;
        const periodEnd = sub.current_period_end
          ? new Date(sub.current_period_end * 1000).toISOString()
          : null;

        // Map Stripe status → internal status
        const statusMap: Record<string, string> = {
          active: "active",
          trialing: "trialing",
          past_due: "past_due",
          canceled: "canceled",
          incomplete: "incomplete",
          incomplete_expired: "canceled",
          paused: "paused",
          unpaid: "past_due",
        };
        const internalStatus = statusMap[sub.status] ?? "active";

        await supabase
          .from("subscriptions")
          .update({
            tier,
            status: internalStatus,
            stripe_subscription_id: sub.id,
            stripe_price_id: priceId,
            current_period_start: periodStart,
            current_period_end: periodEnd,
            cancel_at_period_end: sub.cancel_at_period_end,
            canceled_at: sub.canceled_at
              ? new Date(sub.canceled_at * 1000).toISOString()
              : null,
          })
          .eq("stripe_customer_id", customerId);
        break;
      }

      // ── Subscription deleted (hard cancel) ────────────────────────────────
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const customerId =
          typeof sub.customer === "string" ? sub.customer : sub.customer.id;

        await supabase
          .from("subscriptions")
          .update({
            tier: "free",
            status: "canceled",
            canceled_at: new Date().toISOString(),
            stripe_subscription_id: null,
            stripe_price_id: null,
          })
          .eq("stripe_customer_id", customerId);
        break;
      }

      // ── Invoice payment succeeded ─────────────────────────────────────────
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId =
          typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;
        if (customerId) {
          await supabase
            .from("subscriptions")
            .update({ status: "active" })
            .eq("stripe_customer_id", customerId);
        }
        break;
      }

      // ── Invoice payment failed ────────────────────────────────────────────
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId =
          typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;
        if (customerId) {
          await supabase
            .from("subscriptions")
            .update({ status: "past_due" })
            .eq("stripe_customer_id", customerId);
        }
        break;
      }

      default:
        // Unhandled event — acknowledge receipt
        break;
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
    return new Response("Handler error", { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
});
