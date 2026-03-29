import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import ephemeris from "https://esm.sh/ephemeris@2.2.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const planetSymbols: Record<string, string> = {
  Sun: "☉", Moon: "☽", Mercury: "☿", Venus: "♀", Mars: "♂",
  Jupiter: "♃", Saturn: "♄", Uranus: "♅", Neptune: "♆", Pluto: "♇", Ascendant: "Asc",
};

const signNames = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

function createPlanet(name: string, degree: number, isRetro = false) {
  const d = ((degree % 360) + 360) % 360;
  const signNumber = Math.floor(d / 30) + 1;
  return {
    name,
    symbol: planetSymbols[name] || "?",
    degree: d,
    sign: signNames[signNumber - 1],
    signNumber,
    isRetrograde: isRetro,
  };
}

async function geocodeLocation(location: string) {
  const sanitized = location.replace(/[<>"'&;]/g, "").trim().substring(0, 200);
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(sanitized)}&limit=1`,
    { headers: { "User-Agent": "MOONtuner/1.0 (lunar alignment system)" } }
  );
  if (!response.ok) throw new Error("Unable to process location");
  const results = await response.json();
  if (results.length === 0) return { latitude: 40.7128, longitude: -74.006, timezone: -5 };
  const latitude = parseFloat(results[0].lat);
  const longitude = parseFloat(results[0].lon);
  return { latitude, longitude, timezone: Math.round(longitude / 15) };
}

function calculateAscendant(
  year: number, month: number, day: number,
  utcHour: number, minute: number,
  latitude: number, longitude: number
): number {
  const DEG = Math.PI / 180;
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  const jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  const jd = jdn + (utcHour + minute / 60) / 24 - 0.5;
  const d = jd - 2451545.0;
  const T = d / 36525;
  const GMST = ((280.46061837 + 360.98564736629 * d + 0.000387933 * T * T) % 360 + 360) % 360;
  const LST = ((GMST + longitude) % 360 + 360) % 360;
  const eps = (23.439291 - 0.0130042 * T) * DEG;
  const lat_rad = latitude * DEG;
  const LST_rad = LST * DEG;
  const ascY = Math.cos(LST_rad);
  const ascX = -(Math.sin(LST_rad) * Math.cos(eps) + Math.tan(lat_rad) * Math.sin(eps));
  let asc = (Math.atan2(ascY, ascX) * 180 / Math.PI % 360 + 360) % 360;
  if (LST >= 0 && LST < 180) { if (asc < 180) asc = (asc + 180) % 360; }
  else { if (asc >= 180) asc = (asc - 180) % 360; }
  return asc;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => null);
    if (!body?.date || !body?.time) {
      return new Response(JSON.stringify({ error: "date and time required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let { date, time, latitude, longitude, timezone } = body;

    if (body.location && (latitude === undefined || longitude === undefined)) {
      const geo = await geocodeLocation(body.location);
      latitude = geo.latitude;
      longitude = geo.longitude;
      timezone = geo.timezone;
    }

    if (latitude === undefined || longitude === undefined) {
      return new Response(JSON.stringify({ error: "Location or coordinates required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (timezone === undefined) timezone = Math.round(longitude / 15);

    const [year, month, day] = date.split("-").map(Number);
    const [hour, minute] = time.split(":").map(Number);
    const utcHour = hour - timezone;
    const dateObj = new Date(Date.UTC(year, month - 1, day, utcHour, minute, 0));

    const result = ephemeris.getAllPlanets(dateObj, longitude, latitude, 0);
    const observed = result.observed;
    const planets: ReturnType<typeof createPlanet>[] = [];

    const bodies = ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"] as const;
    const names = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];

    bodies.forEach((key, i) => {
      const ob = observed[key];
      if (ob) {
        const isRetro = key !== "sun" && key !== "moon" ? (ob.raw?.motion?.isRetrograde || false) : false;
        planets.push(createPlanet(names[i], ob.apparentLongitudeDd, isRetro));
      }
    });

    const asc = calculateAscendant(year, month, day, utcHour, minute, latitude, longitude);
    planets.push(createPlanet("Ascendant", asc));

    return new Response(JSON.stringify({
      planets,
      sunSign: planets.find(p => p.name === "Sun")?.sign || "Unknown",
      moonSign: planets.find(p => p.name === "Moon")?.sign || "Unknown",
      ascendant: planets.find(p => p.name === "Ascendant")?.sign || "Unknown",
      source: "moshier-de404",
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chart calculation error:", error);
    return new Response(
      JSON.stringify({ error: "Unable to calculate birth chart. Please check your input." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
