import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type ProductKey = "lunar-arc" | "astro-harmonic";

const PRODUCT_CATALOG: Record<ProductKey, { price: string; success: string; cancel: string; label: string }> = {
  "lunar-arc": {
    price: "price_1TFj0NCbEehvrcXTegTFTtAL",
    success: "/lunar-reports?paid=true",
    cancel: "/#report",
    label: "Lunar Arc Report",
  },
  "astro-harmonic": {
    price: "price_1TOwXBCbEehvrcXTgo8cVfk6",
    success: "/quantumelodic?paid=true",
    cancel: "/quantumelodic",
    label: "Astro-Harmonic Natal Analysis",
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
    const productKey: ProductKey = (body?.product === "astro-harmonic") ? "astro-harmonic" : "lunar-arc";
    const offer = PRODUCT_CATALOG[productKey];

    const origin = req.headers.get("origin") || "https://moontuner.xyz";
    const successPath = typeof body?.successPath === "string" && body.successPath.startsWith("/")
      ? body.successPath
      : offer.success;
    const cancelPath = typeof body?.cancelPath === "string" && body.cancelPath.startsWith("/")
      ? body.cancelPath
      : offer.cancel;

    const metadata: Record<string, string> = { product: productKey, label: offer.label };
    if (typeof body?.birthDate === "string") metadata.birthDate = body.birthDate.slice(0, 32);
    if (typeof body?.birthTime === "string") metadata.birthTime = body.birthTime.slice(0, 16);
    if (typeof body?.birthLocation === "string") metadata.birthLocation = body.birthLocation.slice(0, 120);
    if (typeof body?.birthName === "string") metadata.birthName = body.birthName.slice(0, 80);

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: offer.price,
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata,
      success_url: `${origin}${successPath}`,
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
