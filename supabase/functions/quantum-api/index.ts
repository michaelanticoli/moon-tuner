/**
 * Proxy to the Quantumelodics unified API on Render.
 * https://github.com/michaelanticoli/Quantumelodics (backend/api/main.py)
 *
 * Exposes: natal-chart, harmonic-analysis, generate-midi, health
 * No upstream API key required (the service has open CORS, no auth middleware).
 * We add validation + a Lovable-side CORS envelope so the browser can call it safely.
 */
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const QM_BASE = "https://quantumelodic-api.onrender.com/api";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

type Action = "natal-chart" | "harmonic-analysis" | "generate-midi" | "health";

const ALLOWED: Action[] = [
  "natal-chart",
  "harmonic-analysis",
  "generate-midi",
  "health",
];

function bad(message: string, status = 400) {
  return new Response(JSON.stringify({ success: false, error: message }), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function validateNatalChart(body: unknown): string | null {
  if (!body || typeof body !== "object") return "Body must be an object";
  const b = body as Record<string, unknown>;
  const required = ["date", "time", "latitude", "longitude", "timezone"];
  for (const k of required) {
    if (b[k] === undefined || b[k] === null || b[k] === "") {
      return `Missing required field: ${k}`;
    }
  }
  if (typeof b.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(b.date)) {
    return "date must be YYYY-MM-DD";
  }
  if (typeof b.time !== "string" || !/^\d{2}:\d{2}$/.test(b.time)) {
    return "time must be HH:MM (24h)";
  }
  const lat = Number(b.latitude);
  const lon = Number(b.longitude);
  if (!Number.isFinite(lat) || lat < -90 || lat > 90) return "latitude out of range";
  if (!Number.isFinite(lon) || lon < -180 || lon > 180) return "longitude out of range";
  if (typeof b.timezone !== "string" || b.timezone.length < 3) {
    return "timezone must be an IANA string (e.g. America/New_York)";
  }
  return null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    // Path looks like /quantum-api/<action>; take the last non-empty segment.
    const segments = url.pathname.split("/").filter(Boolean);
    const action = (segments[segments.length - 1] || "") as Action;

    if (!ALLOWED.includes(action)) {
      return bad(
        `Unknown action "${action}". Allowed: ${ALLOWED.join(", ")}`,
        404,
      );
    }

    // Health is a simple GET passthrough.
    if (action === "health") {
      const r = await fetch(`${QM_BASE}/health`, { method: "GET" });
      const text = await r.text();
      return new Response(text, {
        status: r.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (req.method !== "POST") {
      return bad("This action requires POST", 405);
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return bad("Invalid JSON body");
    }

    if (action === "natal-chart") {
      const err = validateNatalChart(body);
      if (err) return bad(err);
    } else if (action === "harmonic-analysis") {
      const b = body as Record<string, unknown>;
      if (!b?.chart || typeof b.chart !== "object") {
        return bad("Missing 'chart' object (from /natal-chart response)");
      }
    } else if (action === "generate-midi") {
      const b = body as Record<string, unknown>;
      if (!b?.analysis || typeof b.analysis !== "object") {
        return bad("Missing 'analysis' object (from /harmonic-analysis response)");
      }
    }

    const upstream = await fetch(`${QM_BASE}/${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // Upstream may return JSON or (for midi) a base64-wrapped blob in JSON.
    // It always responds JSON in this app, so passthrough is safe.
    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: {
        ...corsHeaders,
        "Content-Type":
          upstream.headers.get("Content-Type") ?? "application/json",
      },
    });
  } catch (e) {
    console.error("quantum-api error:", e);
    return bad(e instanceof Error ? e.message : "Unknown error", 500);
  }
});
