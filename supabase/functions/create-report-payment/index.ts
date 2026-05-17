import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};
// Stripe product ID for the $5 voice narration add-on
const NARRATION_ADDON_PRODUCT_ID = "prod_USlOaU9O2tUMAJ";

type ProductKey =
  | "lunar-arc"
  | "astro-harmonic"
  | "phasecraft"
  | "cipher-calendar"
  | "lunar-chaperone";

const PRODUCT_CATALOG: Record<
  ProductKey,
  {
    productId: string;
    amount: number;
    recurring?: { interval: "month" };
    success: string;
    cancel: string;
    label: string;
  }
> = {
  "lunar-arc": {
    productId: "prod_UEBNsyZkZCCziz",
    amount: 1700,
    success: "/lunar-reports?paid=true",
    cancel: "/#report",
    label: "Lunar Arc Report",
  },
  "astro-harmonic": {
    productId: "prod_UNhxQKLgv0Fyny",
    amount: 4700,
    success: "/quantumelodic?paid=true",
    cancel: "/quantumelodic",
    label: "Astro-Harmonic Natal Analysis",
  },
  phasecraft: {
    productId: "prod_UKEpEMBw5bn86v",
    amount: 1700,
    recurring: { interval: "month" },
    success: "/school",
    cancel: "/services",
    label: "Academy of Phasecraft",
  },
  "cipher-calendar": {
    productId: "prod_UKEpa5HiLYpemF",
    amount: 2000,
    success: "/lunar-cipher",
    cancel: "/services",
    label: "Lunar Cipher 2026 Calendar",
  },
  "lunar-chaperone": {
    productId: "prod_UKEqBJxhXZTDk7",
    amount: 9700,
    success: "/lunar-chaperone",
    cancel: "/services",
    label: "Lunar Chaperone",
  },
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
    const origin = req.headers.get("origin") || "https://moontuner.xyz";

    // ── Digital-good purchases from DigitalStore ──────────────────────────
    if (body?.product === "digital-good") {
      const { productId, productLabel, amountCents } = body;

      if (typeof productLabel !== "string" || productLabel.trim() === "") {
        return new Response(JSON.stringify({ error: "productLabel is required for digital-good purchases" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }
      if (typeof amountCents !== "number" || !Number.isInteger(amountCents) || amountCents <= 0) {
        return new Response(JSON.stringify({ error: "amountCents must be a positive integer for digital-good purchases" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }

      const successPath = typeof body?.successPath === "string" && body.successPath.startsWith("/")
        ? body.successPath
        : "/store";
      const cancelPath = typeof body?.cancelPath === "string" && body.cancelPath.startsWith("/")
        ? body.cancelPath
        : "/store";

      const metadata: Record<string, string> = {
        product: "digital-good",
        label: productLabel.trim(),
      };
      if (typeof productId === "string") metadata.productId = productId.slice(0, 80); // Stripe metadata values max 500 chars; 80 is a safe product-ID ceiling

      const joinChar = successPath.includes("?") ? "&" : "?";
      const finalSuccess = `${origin}${successPath}${joinChar}session_id={CHECKOUT_SESSION_ID}`;

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "usd",
              unit_amount: amountCents,
              product_data: { name: productLabel.trim() },
            },
          },
        ],
        metadata,
        success_url: finalSuccess,
        cancel_url: `${origin}${cancelPath}`,
      });

      return new Response(JSON.stringify({ url: session.url }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // ── Catalog-backed products ───────────────────────────────────────────
    const validProducts: ProductKey[] = [
      "lunar-arc",
      "astro-harmonic",
      "phasecraft",
      "cipher-calendar",
      "lunar-chaperone",
    ];
    if (!validProducts.includes(body?.product)) {
      return new Response(JSON.stringify({ error: `Unknown product: "${body?.product}". Valid catalog values are: ${validProducts.join(", ")}. For digital store items use product "digital-good" with productLabel and amountCents.` }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
    const productKey: ProductKey = body.product;
    const offer = PRODUCT_CATALOG[productKey];

    const successPath = typeof body?.successPath === "string" && body.successPath.startsWith("/")
      ? body.successPath
      : offer.success;
    const cancelPath = typeof body?.cancelPath === "string" && body.cancelPath.startsWith("/")
      ? body.cancelPath
      : offer.cancel;

    const withNarration = body?.withNarration === true;
    // bundledNarration: include narration entitlement without charging the $5 add-on
    const bundledNarration = body?.bundledNarration === true;

    const metadata: Record<string, string> = { product: productKey, label: offer.label };
    if (withNarration) metadata.narration_addon = "true";
    if (bundledNarration) metadata.narration_bundled = "true";
    if (typeof body?.birthDate === "string") metadata.birthDate = body.birthDate.slice(0, 32);
    if (typeof body?.birthTime === "string") metadata.birthTime = body.birthTime.slice(0, 16);
    if (typeof body?.birthLocation === "string") metadata.birthLocation = body.birthLocation.slice(0, 120);
    if (typeof body?.birthName === "string") metadata.birthName = body.birthName.slice(0, 80);

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          product: offer.productId,
          unit_amount: offer.amount,
          ...(offer.recurring ? { recurring: offer.recurring } : {}),
        },
      },
    ];
    if (withNarration && !bundledNarration) {
      lineItems.push({
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: 500,
          product: NARRATION_ADDON_PRODUCT_ID,
        },
      });
    }

    // Append session_id + narration flag so the report page can claim the prepaid narration
    const joinChar = successPath.includes("?") ? "&" : "?";
    const finalSuccess = `${origin}${successPath}${joinChar}session_id={CHECKOUT_SESSION_ID}${withNarration ? "&narration_addon=1" : ""}`;

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: offer.recurring ? "subscription" : "payment",
      metadata,
      success_url: finalSuccess,
      cancel_url: `${origin}${cancelPath}`,
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
