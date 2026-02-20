import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SUBSCRIBE-EMAIL] ${step}${detailsStr}`);
};

// Simple in-memory rate limiter (resets on cold start, but sufficient for abuse prevention)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// Email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validateEmail(email: unknown): string {
  if (!email || typeof email !== "string") {
    throw new Error("Email is required");
  }
  const trimmed = email.trim().toLowerCase();
  if (trimmed.length > 254 || trimmed.length < 5) {
    throw new Error("Invalid email format");
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    throw new Error("Invalid email format");
  }
  return trimmed;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limit by IP
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(clientIP)) {
      logStep("Rate limited", { ip: clientIP });
      return new Response(
        JSON.stringify({ success: false, error: "Too many requests. Please try again later." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 429 }
      );
    }

    const body = await req.json();
    const email = validateEmail(body.email);
    const source = typeof body.source === "string" && body.source.length < 50 ? body.source : "website";

    logStep("Processing subscription", { source });

    const mailerliteApiKey = Deno.env.get("MAILERLITE_API_KEY");
    if (!mailerliteApiKey) {
      logStep("MAILERLITE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ success: false, error: "Unable to process subscription. Please try again." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    // Subscribe to MailerLite
    const mailerliteResponse = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${mailerliteApiKey}`,
      },
      body: JSON.stringify({
        email,
        fields: { source },
        status: "active",
      }),
    });

    const mailerliteData = await mailerliteResponse.json();

    if (!mailerliteResponse.ok) {
      logStep("MailerLite API error", mailerliteData);
    } else {
      logStep("MailerLite subscription successful", { subscriberId: mailerliteData.data?.id });
    }

    // Also save to database for backup
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { error: dbError } = await supabaseClient
      .from("newsletter_subscribers")
      .upsert(
        {
          email,
          source,
          convertkit_subscriber_id: mailerliteData.data?.id?.toString() || null,
        },
        { onConflict: "email" }
      );

    if (dbError) {
      logStep("Database save error (non-fatal)", { error: dbError.message });
    } else {
      logStep("Saved to database");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Successfully subscribed!" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });

    // Return generic error to client, keep details server-side only
    const isValidationError = errorMessage === "Invalid email format" || errorMessage === "Email is required";
    return new Response(
      JSON.stringify({
        success: false,
        error: isValidationError ? errorMessage : "Unable to process subscription. Please try again.",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: isValidationError ? 400 : 500 }
    );
  }
});
