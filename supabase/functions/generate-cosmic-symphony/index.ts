// Generate a unique ElevenLabs music composition for a natal chart,
// upload it to the cosmic-reports bucket, and update the natal_reports row.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Payload {
  reportId: string;
  prompt: string;
  // ~120s = 120000ms. ElevenLabs Music takes seconds in milliseconds.
  durationMs?: number;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!ELEVENLABS_API_KEY) throw new Error("ELEVENLABS_API_KEY not configured");
    if (!SUPABASE_URL || !SERVICE_KEY) throw new Error("Supabase env missing");

    const body = (await req.json()) as Payload;
    if (!body?.reportId || !body?.prompt) {
      return json({ error: "reportId and prompt required" }, 400);
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
    const durationMs = Math.min(Math.max(body.durationMs ?? 120000, 10000), 180000);

    // Mark generating
    await supabase
      .from("natal_reports")
      .update({ audio_status: "generating", eleven_labs_prompt: body.prompt })
      .eq("id", body.reportId);

    // Call ElevenLabs Music API
    const elResponse = await fetch("https://api.elevenlabs.io/v1/music", {
      method: "POST",
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        prompt: body.prompt,
        music_length_ms: durationMs,
      }),
    });

    if (!elResponse.ok) {
      const errText = await elResponse.text();
      console.error("ElevenLabs music failed:", elResponse.status, errText);
      await supabase
        .from("natal_reports")
        .update({ audio_status: "failed" })
        .eq("id", body.reportId);
      return json({ error: `ElevenLabs ${elResponse.status}: ${errText.slice(0, 300)}` }, 502);
    }

    const audioBuffer = await elResponse.arrayBuffer();
    const path = `${body.reportId}/symphony.mp3`;

    const { error: upErr } = await supabase.storage
      .from("cosmic-reports")
      .upload(path, audioBuffer, {
        contentType: "audio/mpeg",
        upsert: true,
      });

    if (upErr) {
      await supabase
        .from("natal_reports")
        .update({ audio_status: "failed" })
        .eq("id", body.reportId);
      throw upErr;
    }

    const { data: urlData } = supabase.storage.from("cosmic-reports").getPublicUrl(path);
    const audioUrl = urlData.publicUrl;

    await supabase
      .from("natal_reports")
      .update({ audio_url: audioUrl, audio_status: "ready" })
      .eq("id", body.reportId);

    return json({ audioUrl, status: "ready" });
  } catch (err) {
    console.error("generate-cosmic-symphony error:", err);
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
