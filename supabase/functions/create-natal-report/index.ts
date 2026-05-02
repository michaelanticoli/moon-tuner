// Create a natal_reports row from the front-end and return its ID.
// Front-end then calls generate-cosmic-symphony, generate-cosmic-pdf,
// and generate-cosmic-chart-image with this reportId.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Payload {
  email: string;
  name?: string;
  birthDate: string;
  birthTime?: string;
  birthLocation?: string;
  sunSign?: string;
  moonSign?: string;
  ascendant?: string;
  chartData?: unknown;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!SUPABASE_URL || !SERVICE_KEY) throw new Error("Supabase env missing");

    const body = (await req.json()) as Payload;
    if (!body?.email || !body?.birthDate) {
      return json({ error: "email and birthDate required" }, 400);
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email);
    if (!emailOk) return json({ error: "invalid email" }, 400);

    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
    const { data, error } = await supabase
      .from("natal_reports")
      .insert({
        email: body.email.toLowerCase(),
        name: body.name ?? null,
        birth_date: body.birthDate,
        birth_time: body.birthTime ?? null,
        birth_location: body.birthLocation ?? null,
        sun_sign: body.sunSign ?? null,
        moon_sign: body.moonSign ?? null,
        ascendant: body.ascendant ?? null,
        chart_data: body.chartData ?? null,
      })
      .select("id")
      .single();

    if (error) throw error;
    return json({ reportId: data.id });
  } catch (err) {
    console.error("create-natal-report error:", err);
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
