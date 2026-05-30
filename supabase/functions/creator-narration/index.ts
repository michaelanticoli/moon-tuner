// Creator-only narration: takes arbitrary text, returns MP3 URL.
// Auth: requires JWT, checks email against allowlist.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const CREATOR_EMAILS = [
  "michaelanticoli@gmail.com",
  "hello@moontuner.xyz",
  "logisticalastrology@gmail.com",
];

const VOICE_ID = "bQjXuTZHN8ofphZ0QfAv";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const ELEVEN = Deno.env.get("ELEVENLABS_API_KEY");
    if (!ELEVEN) throw new Error("ELEVENLABS_API_KEY missing");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    // Validate JWT and creator email
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.replace("Bearer ", "");
    if (!token) return json({ error: "Unauthorized" }, 401);
    const { data: userData, error: userErr } = await supabase.auth.getUser(token);
    if (userErr || !userData.user) return json({ error: "Unauthorized" }, 401);
    const email = (userData.user.email ?? "").toLowerCase();
    if (!CREATOR_EMAILS.includes(email)) {
      return json({ error: "Forbidden — creator only" }, 403);
    }

    const body = await req.json();
    const text = String(body.text ?? "").trim();
    const label = String(body.label ?? "narration").replace(/[^a-z0-9-_]/gi, "_").slice(0, 60);
    const voiceId = String(body.voiceId ?? VOICE_ID);
    if (!text) return json({ error: "text required" }, 400);
    if (text.length > 5000) return json({ error: "text too long (max 5000 chars)" }, 400);

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
      return json({ error: `TTS failed: ${errText.slice(0, 300)}` }, 502);
    }

    const audioBuf = await ttsResp.arrayBuffer();
    const path = `creator-bits/${Date.now()}-${label}.mp3`;

    const { error: upErr } = await supabase.storage
      .from("cosmic-reports")
      .upload(path, audioBuf, { contentType: "audio/mpeg", upsert: true });
    if (upErr) throw upErr;

    const { data: urlData } = supabase.storage
      .from("cosmic-reports")
      .getPublicUrl(path);

    return json({ audioUrl: urlData.publicUrl, path });
  } catch (err) {
    console.error("creator-narration error:", err);
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
