// Public coupon-based narration: validates code, runs ElevenLabs TTS,
// uploads MP3 to cosmic-reports, returns audio URL.
// Coupons accepted: anything in NARRATION_COUPONS env (comma-separated).
// No default/hardcoded coupons — all valid coupons must be set via env.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const VOICE_ID = "bQjXuTZHN8ofphZ0QfAv";

// In-memory rate limit: max 5 calls per coupon per hour per edge instance.
// Resets on cold start. Provides a basic throttle against abuse.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || now >= entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const ELEVEN = Deno.env.get("ELEVENLABS_API_KEY");
    if (!ELEVEN) throw new Error("ELEVENLABS_API_KEY missing");

    const envCoupons = (Deno.env.get("NARRATION_COUPONS") ?? "")
      .split(",")
      .map((s) => s.trim().toUpperCase())
      .filter(Boolean);
    const validCoupons = new Set(envCoupons);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const body = await req.json();
    const coupon = String(body.coupon ?? "").trim().toUpperCase();
    const text = String(body.text ?? "").trim();
    const label = String(body.label ?? "guest")
      .replace(/[^a-z0-9-_]/gi, "_")
      .slice(0, 60);

    if (!coupon || !validCoupons.has(coupon)) {
      return json({ error: "Invalid or missing coupon code." }, 403);
    }
    if (!checkRateLimit(coupon)) {
      return json({ error: "Rate limit exceeded. Please try again later." }, 429);
    }
    if (!text) return json({ error: "text required" }, 400);
    if (text.length > 5000) return json({ error: "text too long (max 5000 chars)" }, 400);

    const ttsResp = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`,
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
      return json({ error: `TTS failed: ${errText.slice(0, 300)}` }, 502);
    }

    const audioBuf = await ttsResp.arrayBuffer();
    const path = `guest-narrations/${Date.now()}-${label}.mp3`;

    const { error: upErr } = await supabase.storage
      .from("cosmic-reports")
      .upload(path, audioBuf, { contentType: "audio/mpeg", upsert: true });
    if (upErr) throw upErr;

    const { data: urlData } = supabase.storage
      .from("cosmic-reports")
      .getPublicUrl(path);

    return json({ audioUrl: urlData.publicUrl });
  } catch (err) {
    console.error("redeem-narration-coupon error:", err);
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
