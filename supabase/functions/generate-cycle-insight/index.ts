import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Require authentication to prevent free-riding on AI API credits
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY")!;

    // Validate the JWT belongs to a real user
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const authClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: authError } = await authClient.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { category, context_hint } = await req.json();

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Fetch relevant datapoints
    let query = supabase
      .from("lunar_datapoints")
      .select("datapoint, category, cardinal_values, source_url")
      .order("relevance", { ascending: false })
      .limit(12);

    if (category) {
      query = query.eq("category", category);
    }

    const { data: datapoints, error } = await query;
    if (error) throw error;

    if (!datapoints || datapoints.length === 0) {
      return new Response(
        JSON.stringify({ insight: "No cycle data available for this configuration." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build context for AI
    const factsContext = datapoints
      .map((d, i) => `${i + 1}. [${d.category}] ${d.datapoint}`)
      .join("\n");

    const systemPrompt = `You are MOONtuner's Cycle Intelligence engine. Your voice is poetic yet precise — like a close friend who happens to know astrophysics. You synthesize astronomical cycle facts into elegant, meaningful insights. Never use bullet points. Write in flowing prose (2-3 paragraphs). Reference specific numbers and periods from the data. The tone should create a sense of cosmic awe and personal empowerment — "Nothing is fated. Change your tune."`;

    const userPrompt = `Given these astronomical cycle facts:\n\n${factsContext}\n\n${context_hint ? `Current context: ${context_hint}\n\n` : ""}Synthesize a "Cycle Intelligence" insight that weaves these facts into a meaningful narrative about lunar cycles and their patterns. Be specific with numbers. Make it feel like remembering something essential, not learning something new.`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 600,
        temperature: 0.7,
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      throw new Error(`AI gateway error: ${aiResponse.status} ${errText}`);
    }

    const aiData = await aiResponse.json();
    const insight = aiData.choices?.[0]?.message?.content || "Unable to generate insight.";

    return new Response(
      JSON.stringify({ 
        insight, 
        sources: datapoints.map(d => d.source_url).filter(Boolean),
        category: category || "all",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
