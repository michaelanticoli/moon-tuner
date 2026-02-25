import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Category detection by keyword
function categorize(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("saros")) return "saros";
  if (lower.includes("metonic")) return "metonic";
  if (lower.includes("synodic") && !lower.includes("venus") && !lower.includes("mars") && !lower.includes("mercury") && !lower.includes("jupiter")) return "synodic";
  if (lower.includes("venus") || lower.includes("mars") || lower.includes("mercury") || lower.includes("jupiter") || lower.includes("saturn") || lower.includes("planetary")) return "planetary";
  if (lower.includes("nodal") || lower.includes("draconic") || lower.includes("apsidal") || lower.includes("node")) return "nodal";
  if (lower.includes("eclipse") || lower.includes("inex") || lower.includes("umbra") || lower.includes("penumbra")) return "eclipse";
  if (lower.includes("babylon") || lower.includes("greek") || lower.includes("maya") || lower.includes("ancient") || lower.includes("hipparchus") || lower.includes("ptolemy") || lower.includes("aristarchus")) return "historical";
  return "general";
}

function extractTags(text: string): string[] {
  const tags: string[] = [];
  const keywords = ["moon", "sun", "eclipse", "saros", "metonic", "synodic", "venus", "mars", "mercury", "jupiter", "saturn", "nodal", "draconic", "apsidal", "lunar", "solar", "orbit", "perigee", "apogee", "node", "equinox", "solstice"];
  const lower = text.toLowerCase();
  for (const kw of keywords) {
    if (lower.includes(kw)) tags.push(kw);
  }
  return tags;
}

function parseCSV(text: string): Array<{ datapoint: string; cardinal: string; relevance: number; url: string }> {
  const lines = text.split("\n");
  const rows: Array<{ datapoint: string; cardinal: string; relevance: number; url: string }> = [];
  
  // Skip header
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Parse CSV with proper quote handling
    const fields: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let j = 0; j < line.length; j++) {
      const ch = line[j];
      if (ch === '"') {
        if (inQuotes && line[j + 1] === '"') {
          current += '"';
          j++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === "," && !inQuotes) {
        fields.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
    fields.push(current);
    
    const datapoint = (fields[0] || "").trim();
    if (!datapoint || datapoint.length < 10) continue;
    
    const cardinal = (fields[1] || "").trim();
    const relevance = parseFloat(fields[4] || "0.5") || 0.5;
    const url = (fields[6] || "").trim();
    
    rows.push({ datapoint, cardinal, relevance, url });
  }
  return rows;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Fetch CSV from public URL
    const { origin } = new URL(req.url);
    // The CSV should be accessible. We'll accept it as POST body or fetch from a URL parameter.
    const body = await req.json().catch(() => ({}));
    const csvUrl = body.csv_url;
    
    let csvText: string;
    if (csvUrl) {
      const resp = await fetch(csvUrl);
      csvText = await resp.text();
    } else {
      return new Response(JSON.stringify({ error: "Provide csv_url in body" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const rows = parseCSV(csvText);
    
    // Deduplicate by exact datapoint text
    const seen = new Set<string>();
    const unique: typeof rows = [];
    for (const row of rows) {
      const key = row.datapoint.trim().toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(row);
      }
    }

    // Batch insert
    const records = unique.map((row) => ({
      datapoint: row.datapoint,
      category: categorize(row.datapoint),
      cardinal_values: row.cardinal || null,
      relevance: row.relevance,
      source_url: row.url || null,
      tags: extractTags(row.datapoint),
    }));

    // Insert in batches of 100
    let inserted = 0;
    for (let i = 0; i < records.length; i += 100) {
      const batch = records.slice(i, i + 100);
      const { error } = await supabase.from("lunar_datapoints").insert(batch);
      if (error) {
        console.error("Insert error:", error);
        return new Response(JSON.stringify({ error: error.message, inserted }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      inserted += batch.length;
    }

    return new Response(
      JSON.stringify({ success: true, total_rows: rows.length, deduplicated: unique.length, inserted }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
