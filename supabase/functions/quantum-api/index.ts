/**
 * Proxy to the Quantumelodics unified API on Render.
 * https://github.com/michaelanticoli/Quantumelodics (backend/api/main.py)
 *
 * Exposes: natal-chart, harmonic-analysis, generate-midi, health
 * No upstream API key required (CORS open, no auth middleware on upstream).
 *
 * For natal-chart we accept EITHER explicit {latitude, longitude, timezone}
 * OR a {location} string which is geocoded via Nominatim. Timezone falls
 * back to Etc/GMT±N from longitude when not provided (good enough for the
 * harmonic signature; for second-precision charts pass IANA timezone).
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

async function geocode(location: string) {
  const sanitized = String(location).slice(0, 200);
  const r = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(sanitized)}&limit=1`,
    { headers: { "User-Agent": "moontuner-quantum-api/1.0 (hello@moontuner.xyz)" } },
  );
  if (!r.ok) return null;
  const results = await r.json();
  if (!Array.isArray(results) || results.length === 0) return null;
  return {
    latitude: parseFloat(results[0].lat),
    longitude: parseFloat(results[0].lon),
  };
}

/** Convert a numeric UTC offset (e.g. -5) to an Etc/GMT IANA string. Etc/GMT signs are inverted. */
function offsetToIana(offsetHours: number): string {
  const rounded = Math.round(offsetHours);
  if (rounded === 0) return "Etc/GMT";
  // Inverted: UTC-5 → "Etc/GMT+5"
  return rounded < 0 ? `Etc/GMT+${Math.abs(rounded)}` : `Etc/GMT-${rounded}`;
}

async function normalizeNatalBody(raw: unknown): Promise<{ body: Record<string, unknown> } | { error: string }> {
  if (!raw || typeof raw !== "object") return { error: "Body must be an object" };
  const b = { ...(raw as Record<string, unknown>) };

  if (typeof b.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(b.date)) {
    return { error: "date must be YYYY-MM-DD" };
  }
  if (typeof b.time !== "string" || !/^\d{2}:\d{2}$/.test(b.time)) {
    return { error: "time must be HH:MM (24h)" };
  }

  // Geocode if needed
  if ((b.latitude === undefined || b.longitude === undefined) && typeof b.location === "string" && b.location) {
    const geo = await geocode(b.location);
    if (!geo) return { error: `Could not geocode location "${b.location}"` };
    b.latitude = geo.latitude;
    b.longitude = geo.longitude;
  }

  const lat = Number(b.latitude);
  const lon = Number(b.longitude);
  if (!Number.isFinite(lat) || lat < -90 || lat > 90) return { error: "latitude out of range" };
  if (!Number.isFinite(lon) || lon < -180 || lon > 180) return { error: "longitude out of range" };
  b.latitude = lat;
  b.longitude = lon;

  // Timezone: accept IANA string OR numeric offset; fall back to longitude-derived offset.
  if (typeof b.timezone === "number") {
    b.timezone = offsetToIana(b.timezone);
  } else if (typeof b.timezone !== "string" || b.timezone.length < 3) {
    b.timezone = offsetToIana(lon / 15);
  }

  // Drop fields upstream doesn't use.
  delete b.location;
  delete b.name;
  delete b.email;

  return { body: b };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const segments = url.pathname.split("/").filter(Boolean);
    const action = (segments[segments.length - 1] || "") as Action;

    if (!ALLOWED.includes(action)) {
      return bad(`Unknown action "${action}". Allowed: ${ALLOWED.join(", ")}`, 404);
    }

    if (action === "health") {
      const r = await fetch(`${QM_BASE}/health`, { method: "GET" });
      const text = await r.text();
      return new Response(text, {
        status: r.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (req.method !== "POST") return bad("This action requires POST", 405);

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return bad("Invalid JSON body");
    }

    let upstreamBody: unknown = body;

    if (action === "natal-chart") {
      const norm = await normalizeNatalBody(body);
      if ("error" in norm) return bad(norm.error);
      upstreamBody = norm.body;
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
      body: JSON.stringify(upstreamBody),
    });

    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: {
        ...corsHeaders,
        "Content-Type": upstream.headers.get("Content-Type") ?? "application/json",
      },
    });
  } catch (e) {
    console.error("quantum-api error:", e);
    return bad(e instanceof Error ? e.message : "Unknown error", 500);
  }
});
