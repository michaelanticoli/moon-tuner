// Creates a Stripe Checkout session for any catalog product OR an ad-hoc
// digital-good purchase. Uses existing Stripe Price IDs from the live account
// — DO NOT recreate or synthesize new products here.
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// $5 Voice Narration add-on — real Stripe price (one_time)
const NARRATION_ADDON_PRICE_ID = "price_1TTprKCbEehvrcXT91cX9Tl9";

type ProductKey =
  | "lunar-arc"
  | "astro-harmonic"
  | "phasecraft"
  | "cipher-calendar"
  | "lunar-chaperone";

const PRODUCT_CATALOG: Record<
  ProductKey,
  {
    priceId: string;
    mode: "payment" | "subscription";
    success: string;
    cancel: string;
    label: string;
  }
> = {
  "lunar-arc": {
    priceId: "price_1TFj0NCbEehvrcXTegTFTtAL",
    mode: "payment",
    success: "/lunar-reports?paid=true",
    cancel: "/#report",
    label: "Lunar Arc Report",
  },
  "astro-harmonic": {
    priceId: "price_1TOwXBCbEehvrcXTgo8cVfk6",
    mode: "payment",
    success: "/quantumelodic?paid=true",
    cancel: "/quantumelodic",
    label: "Astro-Harmonic Natal Analysis",
  },
  phasecraft: {
    priceId: "price_1TLaLpCbEehvrcXTlgqxLBlW",
    mode: "subscription",
    success: "/school",
    cancel: "/services",
    label: "Academy of Phasecraft",
  },
  "cipher-calendar": {
    priceId: "price_1TLaM7CbEehvrcXTQHok5ilL",
    mode: "payment",
    success: "/lunar-cipher",
    cancel: "/services",
    label: "Lunar Cipher 2026 Calendar",
  },
  "lunar-chaperone": {
    priceId: "price_1TLaMXCbEehvrcXTKc9jIw7q",
    mode: "payment",
    success: "/lunar-chaperone",
    cancel: "/services",
    label: "Lunar Chaperone — Full Access",
  },
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const secret = Deno.env.get("STRIPE_SECRET_KEY") || "";
    if (!secret) return json({ error: "Stripe is not configured (missing STRIPE_SECRET_KEY)" }, 500);
    const stripe = new Stripe(secret, { apiVersion: "2025-08-27.basil" });

    const body = await req.json().catch(() => ({}));
    const origin = req.headers.get("origin") || "https://moontuner.xyz";

    // ── Digital-good ad-hoc purchases ─────────────────────────────────────
    if (body?.product === "digital-good") {
      const { productId, productLabel, amountCents } = body;
      if (typeof productLabel !== "string" || !productLabel.trim()) {
        return json({ error: "productLabel is required for digital-good" }, 400);
      }
      if (typeof amountCents !== "number" || !Number.isInteger(amountCents) || amountCents <= 0) {
        return json({ error: "amountCents must be a positive integer" }, 400);
      }
      const successPath = typeof body?.successPath === "string" && body.successPath.startsWith("/") ? body.successPath : "/store";
      const cancelPath  = typeof body?.cancelPath  === "string" && body.cancelPath.startsWith("/")  ? body.cancelPath  : "/store";
      const metadata: Record<string, string> = { product: "digital-good", label: productLabel.trim() };
      if (typeof productId === "string") metadata.productId = productId.slice(0, 80);
      const joinChar = successPath.includes("?") ? "&" : "?";

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [{
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: amountCents,
            product_data: { name: productLabel.trim() },
          },
        }],
        metadata,
        success_url: `${origin}${successPath}${joinChar}session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}${cancelPath}`,
      });
      return json({ url: session.url });
    }

    // ── Catalog-backed purchases ──────────────────────────────────────────
    const productKey = body?.product as ProductKey;
    if (!productKey || !(productKey in PRODUCT_CATALOG)) {
      return json({
        error: `Unknown product "${body?.product}". Valid: ${Object.keys(PRODUCT_CATALOG).join(", ")} or "digital-good".`,
      }, 400);
    }
    const offer = PRODUCT_CATALOG[productKey];

    const successPath = typeof body?.successPath === "string" && body.successPath.startsWith("/") ? body.successPath : offer.success;
    const cancelPath  = typeof body?.cancelPath  === "string" && body.cancelPath.startsWith("/")  ? body.cancelPath  : offer.cancel;

    const withNarration = body?.withNarration === true;
    const bundledNarration = body?.bundledNarration === true;

    const metadata: Record<string, string> = { product: productKey, label: offer.label };
    if (withNarration) metadata.narration_addon = "true";
    if (bundledNarration) metadata.narration_bundled = "true";
    if (typeof body?.birthDate === "string")     metadata.birthDate     = body.birthDate.slice(0, 32);
    if (typeof body?.birthTime === "string")     metadata.birthTime     = body.birthTime.slice(0, 16);
    if (typeof body?.birthLocation === "string") metadata.birthLocation = body.birthLocation.slice(0, 120);
    if (typeof body?.birthName === "string")     metadata.birthName     = body.birthName.slice(0, 80);

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      { quantity: 1, price: offer.priceId },
    ];
    if (withNarration && !bundledNarration) {
      lineItems.push({ quantity: 1, price: NARRATION_ADDON_PRICE_ID });
    }

    const joinChar = successPath.includes("?") ? "&" : "?";
    const finalSuccess = `${origin}${successPath}${joinChar}session_id={CHECKOUT_SESSION_ID}${withNarration ? "&narration_addon=1" : ""}`;

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: offer.mode,
      metadata,
      success_url: finalSuccess,
      cancel_url: `${origin}${cancelPath}`,
      allow_promotion_codes: true,
    });

    return json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("create-report-payment error:", message);
    return json({ error: message }, 500);
  }
});
