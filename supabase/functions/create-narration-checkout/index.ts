// Creates a $5 Stripe Checkout session for the voice narration add-on.
// Persists report_text + voice_id + report metadata so the success
// callback can generate the audio.
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const VOICE_ID = "bQjXuTZHN8ofphZ0QfAv"; // Michael Moon voice clone
const NARRATION_PRICE_ID = "price_1TTprKCbEehvrcXT91cX9Tl9"; // $5 one-time
const ASTRO_HARMONIC_PROFILE_URL = "https://buy.stripe.com/5kQ00i5QCdHm8qngTfe7m04";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return json({ error: "Unauthorized" }, 401);
  }

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
      apiVersion: "2025-08-27.basil",
    });
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const body = await req.json();
    const { reportType, reportLabel, sourceText, email, returnPath } = body;

    if (!reportType || !sourceText || typeof sourceText !== "string") {
      return json({ error: "reportType and sourceText required" }, 400);
    }
    if (sourceText.length > 12000) {
      return json({ error: "Report text exceeds 12000 char limit" }, 400);
    }

    if (reportType === "astro-harmonic-profile") {
      return json({ url: ASTRO_HARMONIC_PROFILE_URL });
    }

    // Insert pending narration row
    const { data: narration, error: insErr } = await supabase
      .from("report_narrations")
      .insert({
        report_type: reportType,
        report_label: reportLabel ?? null,
        source_text: sourceText,
        voice_id: VOICE_ID,
        email: email ?? null,
        status: "pending_payment",
      })
      .select()
      .single();
    if (insErr || !narration) throw insErr ?? new Error("insert failed");

    const origin = req.headers.get("origin") ?? "https://moontuner.xyz";
    const successUrl = `${origin}${returnPath ?? "/"}?narration_id=${narration.id}&narration_status=success`;
    const cancelUrl = `${origin}${returnPath ?? "/"}?narration_status=canceled`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email ?? undefined,
      line_items: [{ price: NARRATION_PRICE_ID, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { narration_id: narration.id },
    });

    await supabase
      .from("report_narrations")
      .update({ stripe_session_id: session.id })
      .eq("id", narration.id);

    return json({ url: session.url, narrationId: narration.id });
  } catch (err) {
    console.error("create-narration-checkout error:", err);
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
