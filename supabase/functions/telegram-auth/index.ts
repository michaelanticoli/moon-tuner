import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

async function verifyTelegramAuth(user: TelegramUser, botToken: string): Promise<boolean> {
  const { hash, ...data } = user;

  // Build the data-check-string
  const dataCheckArr = Object.entries(data)
    .map(([key, value]) => `${key}=${value}`)
    .sort();
  const dataCheckString = dataCheckArr.join("\n");

  // Secret key is SHA256 of bot token
  const encoder = new TextEncoder();
  const keyData = await crypto.subtle.digest("SHA-256", encoder.encode(botToken));
  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(dataCheckString));
  const computedHash = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  if (computedHash !== hash) return false;

  // Check auth_date is not older than 24 hours
  const now = Math.floor(Date.now() / 1000);
  if (now - user.auth_date > 86400) return false;

  return true;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
    if (!botToken) {
      return new Response(JSON.stringify({ error: "Bot token not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const user: TelegramUser = await req.json();

    const isValid = await verifyTelegramAuth(user, botToken);
    if (!isValid) {
      return new Response(JSON.stringify({ error: "Invalid Telegram auth data" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Upsert using service role (bypasses RLS)
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data, error } = await supabase
      .from("telegram_users")
      .upsert(
        {
          telegram_id: user.id,
          first_name: user.first_name,
          last_name: user.last_name ?? null,
          username: user.username ?? null,
          photo_url: user.photo_url ?? null,
          auth_date: user.auth_date,
        },
        { onConflict: "telegram_id" }
      )
      .select()
      .single();

    if (error) {
      console.error("DB upsert error:", error);
      return new Response(JSON.stringify({ error: "Failed to save user" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, user: data }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
