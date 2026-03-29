import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/**
 * Fetches QuantumMelodic lookup data (planets, signs, aspects, houses)
 * from the QuantumMelodic Supabase project.
 * 
 * This keeps the IP in one database — moontuner reads it cross-project.
 * The QM anon key is a publishable key with read-only RLS access.
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// QuantumMelodic Supabase (publishable / anon key — read-only access via RLS)
const QM_SUPABASE_URL = "https://lstojllbtwuxhvzaxgzi.supabase.co";
const QM_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzdG9qbGxidHd1eGh2emF4Z3ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0NTk4MzEsImV4cCI6MjA4MjAzNTgzMX0.QF8-vVEr1ZvQD2_njhJgsB1OxKt_UM0JacolpQOzLJE";

// Simple in-memory cache (edge functions are short-lived, so this per-instance)
let cache: { data: unknown; timestamp: number } | null = null;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Return cached data if fresh
    if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
      return new Response(JSON.stringify(cache.data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const qm = createClient(QM_SUPABASE_URL, QM_ANON_KEY);

    const [planetsRes, signsRes, aspectsRes, housesRes] = await Promise.all([
      qm.from("qm_planets").select("*"),
      qm.from("qm_signs").select("*"),
      qm.from("qm_aspects").select("*"),
      qm.from("qm_houses").select("*").order("number"),
    ]);

    if (planetsRes.error) throw planetsRes.error;
    if (signsRes.error) throw signsRes.error;
    if (aspectsRes.error) throw aspectsRes.error;
    if (housesRes.error) throw housesRes.error;

    const data = {
      planets: planetsRes.data,
      signs: signsRes.data,
      aspects: aspectsRes.data,
      houses: housesRes.data,
    };

    cache = { data, timestamp: Date.now() };

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching QM data:", error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
