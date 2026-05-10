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

const BASE_URL = "https://moontuner.xyz";

// Map Stripe price IDs → membership tiers
const PRICE_TIER_MAP: Record<string, string> = {
  [Deno.env.get("STRIPE_PRICE_REFLECTIVE") ?? "price_reflective"]: "reflective",
  [Deno.env.get("STRIPE_PRICE_INSIGHT") ?? "price_insight"]: "insight",
  [Deno.env.get("STRIPE_PRICE_PRACTITIONER") ?? "price_practitioner"]: "practitioner",
};

function tierFromPriceId(priceId: string): string {
  return PRICE_TIER_MAP[priceId] ?? "reflective";
}

async function sendGiftClaimEmail(
  recipientEmail: string,
  claimCode: string,
  giftType: string,
  tier: string | null
): Promise<void> {
  const resendKey = Deno.env.get("RESEND_API_KEY");
  if (!resendKey) {
    console.log(`[stripe-webhook] DRY RUN: gift claim email for ${recipientEmail}`);
    return;
  }

  const tierLabel = tier ? (tier.charAt(0).toUpperCase() + tier.slice(1)) : "Reflective";
  const typeLabel = giftType.startsWith("membership")
    ? `${tierLabel} Membership`
    : giftType === "report" ? "Lunar Arc Report" : "Digital Good";

  const claimUrl = `${BASE_URL}/gift/claim?code=${claimCode}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:40px 20px;background:#0a0a0a;font-family:Georgia,serif;color:#c8c4b8;">
  <div style="max-width:560px;margin:0 auto;">
    <p style="font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:#5a5550;margin-bottom:48px;">Moontuner</p>
    <p style="font-size:28px;font-weight:300;line-height:1.3;color:#e8e4dc;margin-bottom:24px;">Someone sent you a gift.</p>
    <p style="font-size:15px;line-height:1.7;color:#6a6660;margin-bottom:20px;">
      You've received a <strong style="color:#c8c4b8;">${typeLabel}</strong> on Moontuner —
      a tool for lunar-oriented reflection, emotional pacing, and intentional living.
    </p>
    <p style="font-size:15px;line-height:1.7;color:#6a6660;margin-bottom:40px;">
      Your claim link is below. It's yours whenever you're ready — no urgency, no expiration pressure.
    </p>
    <a href="${claimUrl}" style="display:inline-block;padding:14px 28px;border-radius:100px;background:#e8e4dc;color:#0a0a0a;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;font-weight:700;text-decoration:none;margin-bottom:24px;">
      Claim Your Gift
    </a>
    <p style="font-size:12px;color:#3a3830;margin-top:24px;">
      Or copy this link: <span style="color:#6a6660;">${claimUrl}</span>
    </p>
    <hr style="border:none;border-top:1px solid #1a1a1a;margin:40px 0 32px;">
    <p style="font-size:11px;color:#3a3830;line-height:1.6;">
      Moontuner is a tool for reflective clarity and timing awareness — not predictions or mystical certainty.
      You can learn more at moontuner.xyz.
    </p>
  </div>
</body>
</html>`;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Moontuner <hello@moontuner.xyz>",
      reply_to: "support@moontuner.xyz",
      to: [recipientEmail],
      subject: `You've received a gift — ${typeLabel}`,
      html,
    }),
  }).catch((err) => console.error("Gift email send error:", err));
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
          // Mark gift as paid and send claim email to recipient
          if (session.id) {
            await supabase
              .from("gifts")
              .update({ status: "paid" })
              .eq("stripe_session_id", session.id);

            // Fetch the gift row to get recipient email and claim code
            const { data: gift } = await supabase
              .from("gifts")
              .select("recipient_email, claim_code, gift_type, tier")
              .eq("stripe_session_id", session.id)
              .single();

            if (gift?.recipient_email && gift?.claim_code) {
              await sendGiftClaimEmail(gift.recipient_email, gift.claim_code, gift.gift_type, gift.tier);
            }
          }
        }

        // ── Track report/product purchases from create-report-payment ──────────
        // Sessions created by create-report-payment have a `product` metadata field
        // but no `purchase_type`. We create a purchases row here if one doesn't exist.
        if (
          session.mode === "payment" &&
          !meta.purchase_type &&
          meta.product &&
          session.customer_details?.email
        ) {
          const paymentIntent =
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : session.payment_intent?.id;

          // Resolve user_id from email if possible
          const { data: userRows } = await supabase.rpc("get_user_id_by_email", {
            email_input: session.customer_details.email,
          });
          const userId = (userRows as Array<{ id: string }> | null)?.[0]?.id ?? null;

          const amountTotal = session.amount_total ?? 0;

          await supabase.from("purchases").upsert(
            {
              user_id: userId,
              product_type: "report",
              product_id: meta.product,
              product_label: meta.label ?? meta.product,
              amount_cents: amountTotal,
              currency: session.currency ?? "usd",
              stripe_session_id: session.id,
              stripe_payment_intent_id: paymentIntent ?? null,
              status: "completed",
              fulfilled_at: new Date().toISOString(),
              metadata: { narration: meta.narration_addon === "true" },
            },
            { onConflict: "stripe_session_id", ignoreDuplicates: true }
          );
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

        const previousStatus = event.type === "customer.subscription.updated"
          ? statusMap[(event.data.previous_attributes as { status?: string })?.status ?? ""] ?? null
          : null;

        // Update subscription row
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

        // ── Send welcome / lifecycle emails ─────────────────────────────────
        // Get customer details from Stripe for email sending
        try {
          const customer = await stripe.customers.retrieve(customerId);
          if (customer && !customer.deleted) {
            const customerEmail = customer.email;
            const customerName = typeof customer.name === "string" ? customer.name : "";

            if (customerEmail && internalStatus === "active") {
              const isNew = event.type === "customer.subscription.created";
              const wasNotActive = previousStatus && previousStatus !== "active";
              const isReturn = !isNew && wasNotActive;

              await supabase.functions.invoke("send-membership-email", {
                body: {
                  flow: isReturn ? "welcome_return" : isNew ? "welcome_new" : null,
                  to: customerEmail,
                  name: customerName,
                  tier,
                },
              }).catch((emailErr) => {
                // Email failures should not fail the webhook
                console.error("Welcome email error:", emailErr);
              });
            }

            // Send paused email when status changes to paused
            if (customerEmail && internalStatus === "paused" && previousStatus !== "paused") {
              await supabase.functions.invoke("send-membership-email", {
                body: {
                  flow: "paused",
                  to: customerEmail,
                  name: customerName,
                },
              }).catch((emailErr) => {
                console.error("Paused email error:", emailErr);
              });
            }
          }
        } catch (emailLookupErr) {
          // Non-critical — do not fail the webhook
          console.error("Customer email lookup error:", emailLookupErr);
        }

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
