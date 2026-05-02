// Look up all reports for a given email. Used by the "I've been here before" flow.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!SUPABASE_URL || !SERVICE_KEY) throw new Error("Supabase env missing");

    const { email } = (await req.json()) as { email?: string };
    if (!email) return json({ error: "email required" }, 400);

    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
    const { data, error } = await supabase
      .from("natal_reports")
      .select("id,name,birth_date,sun_sign,moon_sign,ascendant,audio_url,pdf_url,chart_image_url,audio_status,pdf_status,chart_status,created_at")
      .eq("email", email.toLowerCase())
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) throw error;
    return json({ reports: data ?? [] });
  } catch (err) {
    console.error("lookup-natal-reports error:", err);
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
