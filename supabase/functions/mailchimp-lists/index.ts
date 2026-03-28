import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

serve(async () => {
  const apiKey = Deno.env.get("MAILCHIMP_API_KEY");
  if (!apiKey) return new Response(JSON.stringify({ error: "No API key" }), { status: 500 });

  const dc = apiKey.split("-").pop();
  const resp = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists?count=100`, {
    headers: { "Authorization": `Basic ${btoa("anystring:" + apiKey)}` }
  });
  const data = await resp.json();
  const lists = (data.lists || []).map((l: any) => ({
    id: l.id, name: l.name, members: l.stats?.member_count
  }));
  return new Response(JSON.stringify({ lists }), {
    headers: { "Content-Type": "application/json" }
  });
});
