import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};
const NARRATION_ADDON_NAME = "Voice Narration Add-On";
const NARRATION_ADDON_CREATOR = "Michael Moon";

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
    productId: "prod_UEBc9uSaRZ43aU",
    amount: 1700,
    success: "/lunar-reports?paid=true",
    cancel: "/#report",
    label: "Lunar Arc Report",
  },
  "astro-harmonic": {
    productId: "prod_UECWWxRmAEWGwV",
    amount: 4700,
    success: "/quantumelodic?paid=true",
    cancel: "/quantumelodic",
    label: "Astro-Harmonic Natal Analysis",
  },
  phasecraft: {
    productId: "prod_ULCS3phxieBPCX",
    amount: 1700,
    recurring: { interval: "month" },
    success: "/school",
    cancel: "/services",
    label: "Academy of Phasecraft",
  },
  "cipher-calendar": {
    productId: "prod_ULBtSxOG8oH17X",
    amount: 2000,
    success: "/lunar-cipher",
    cancel: "/services",
    label: "Lunar Cipher 2026 Calendar",
  },
  "lunar-chaperone": {
    productId: "prod_ULCXBTdFl9UvUj",
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
    const validProducts: ProductKey[] = [
      "lunar-arc",
      "astro-harmonic",
      "phasecraft",
      "cipher-calendar",
      "lunar-chaperone",
    ];
    const productKey: ProductKey = validProducts.includes(body?.product) ? body.product : "lunar-arc";
    const offer = PRODUCT_CATALOG[productKey];

    const origin = req.headers.get("origin") || "https://moontuner.xyz";
    const successPath = typeof body?.successPath === "string" && body.successPath.startsWith("/")
      ? body.successPath
      : offer.success;
    const cancelPath = typeof body?.cancelPath === "string" && body.cancelPath.startsWith("/")
      ? body.cancelPath
      : offer.cancel;

    const withNarration = body?.withNarration === true;

    const metadata: Record<string, string> = { product: productKey, label: offer.label };
    if (withNarration) metadata.narration_addon = "true";
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
    if (withNarration) {
      lineItems.push({
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: 500,
          product_data: {
            name: NARRATION_ADDON_NAME,
            description: `${NARRATION_ADDON_CREATOR}'s voice narration for ${offer.label}`,
          },
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
