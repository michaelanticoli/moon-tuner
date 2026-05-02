// Accept a base64-encoded asset (PDF or PNG) from the client and store it
// in cosmic-reports under reportId/<filename>. Updates natal_reports row.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Payload {
  reportId: string;
  // 'pdf' | 'chart-image'
  kind: "pdf" | "chart-image";
  // base64 (no data: prefix)
  base64: string;
  contentType: string;
  filename: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!SUPABASE_URL || !SERVICE_KEY) throw new Error("Supabase env missing");

    const body = (await req.json()) as Payload;
    if (!body?.reportId || !body?.kind || !body?.base64 || !body?.filename) {
      return json({ error: "missing required fields" }, 400);
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
    const path = `${body.reportId}/${body.filename}`;
    const bytes = base64ToUint8(body.base64);

    const { error: upErr } = await supabase.storage
      .from("cosmic-reports")
      .upload(path, bytes, {
        contentType: body.contentType || "application/octet-stream",
        upsert: true,
      });
    if (upErr) throw upErr;

    const { data: urlData } = supabase.storage.from("cosmic-reports").getPublicUrl(path);
    const url = urlData.publicUrl;

    const updateField =
      body.kind === "pdf"
        ? { pdf_url: url, pdf_status: "ready" as const }
        : { chart_image_url: url, chart_status: "ready" as const };

    await supabase.from("natal_reports").update(updateField).eq("id", body.reportId);

    return json({ url });
  } catch (err) {
    console.error("upload-cosmic-asset error:", err);
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
});

function base64ToUint8(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
