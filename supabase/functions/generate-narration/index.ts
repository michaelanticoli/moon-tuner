// Verifies Stripe payment, calls ElevenLabs TTS with the voice clone,
// uploads the MP3 to cosmic-reports bucket, returns the audio URL.
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const ELEVEN = Deno.env.get("ELEVENLABS_API_KEY");
    if (!ELEVEN) throw new Error("ELEVENLABS_API_KEY missing");

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
      apiVersion: "2025-08-27.basil",
    });
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const { narrationId } = await req.json();
    if (!narrationId) return json({ error: "narrationId required" }, 400);

    const { data: narration, error: fetchErr } = await supabase
      .from("report_narrations")
      .select("*")
      .eq("id", narrationId)
      .single();
    if (fetchErr || !narration) return json({ error: "Narration not found" }, 404);

    // Already done
    if (narration.status === "ready" && narration.audio_url) {
      return json({ status: "ready", audioUrl: narration.audio_url });
    }

    // Verify payment
    if (!narration.stripe_session_id) return json({ error: "No checkout session" }, 400);
    const session = await stripe.checkout.sessions.retrieve(narration.stripe_session_id);
    if (session.payment_status !== "paid") {
      return json({ status: "unpaid", paymentStatus: session.payment_status }, 402);
    }

    // Mark generating
    await supabase
      .from("report_narrations")
      .update({ status: "generating" })
      .eq("id", narrationId);

    // Truncate to ElevenLabs ~5000 char per request safe limit
    const text = (narration.source_text ?? "").slice(0, 5000);
    const voiceId = narration.voice_id ?? "bQjXuTZHN8ofphZ0QfAv";

    const ttsResp = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.55,
            similarity_boost: 0.8,
            style: 0.3,
            use_speaker_boost: true,
          },
        }),
      },
    );

    if (!ttsResp.ok) {
      const errText = await ttsResp.text();
      console.error("ElevenLabs TTS failed:", ttsResp.status, errText);
      await supabase
        .from("report_narrations")
        .update({ status: "failed", error: `ElevenLabs ${ttsResp.status}` })
        .eq("id", narrationId);
      return json({ error: `TTS failed: ${errText.slice(0, 300)}` }, 502);
    }

    const audioBuf = await ttsResp.arrayBuffer();
    const path = `narrations/${narrationId}.mp3`;

    const { error: upErr } = await supabase.storage
      .from("cosmic-reports")
      .upload(path, audioBuf, { contentType: "audio/mpeg", upsert: true });
    if (upErr) throw upErr;

    const { data: urlData } = supabase.storage
      .from("cosmic-reports")
      .getPublicUrl(path);
    const audioUrl = urlData.publicUrl;

    await supabase
      .from("report_narrations")
      .update({ status: "ready", audio_url: audioUrl })
      .eq("id", narrationId);

    return json({ status: "ready", audioUrl });
  } catch (err) {
    console.error("generate-narration error:", err);
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
