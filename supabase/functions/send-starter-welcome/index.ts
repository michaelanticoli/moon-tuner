import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validateEmail(input: unknown): string {
  if (!input || typeof input !== "string") throw new Error("Email is required");
  const trimmed = input.trim().toLowerCase();
  if (trimmed.length < 5 || trimmed.length > 254) throw new Error("Invalid email format");
  if (!EMAIL_REGEX.test(trimmed)) throw new Error("Invalid email format");
  return trimmed;
}

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

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

const logStep = (step: string, details?: unknown) => {
  const d = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[SEND-STARTER-WELCOME] ${step}${d}`);
};

function buildWelcomeHTML(): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Welcome to Moon Tuner Starter</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0a0a0a; color: #e0e0e0; font-family: Georgia, 'Times New Roman', serif; }
    .container { max-width: 580px; margin: 0 auto; padding: 40px 24px; }
    h1 { color: #ffffff; font-size: 24px; line-height: 1.3; margin-bottom: 24px; }
    h2 { color: #ffffff; font-size: 18px; margin-top: 32px; margin-bottom: 12px; }
    p { font-size: 16px; line-height: 1.7; color: #c0c0c0; margin-bottom: 16px; }
    ul { padding-left: 20px; margin-bottom: 16px; }
    li { font-size: 16px; line-height: 1.7; color: #c0c0c0; margin-bottom: 8px; }
    .highlight { color: #ffffff; font-weight: 600; }
    .accent { color: #d4a853; }
    .divider { border: none; border-top: 1px solid #222; margin: 32px 0; }
    .footer { font-size: 13px; color: #666; margin-top: 40px; text-align: center; }
    a { color: #d4a853; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <p class="accent" style="font-size: 13px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 32px;">Moon Tuner Starter</p>

    <h1>You just stepped into a very detailed map.</h1>

    <p>The framework I teach in Moon Tuner Starter is based on an <span class="highlight">8&#8209;phase lunar cycle</span>, not just &ldquo;new moon / full moon.&rdquo;</p>

    <p>Behind the scenes, I&rsquo;m working with a 96&#8209;piece pattern library:</p>

    <ul>
      <li>The moon spends about 2.5 days in each zodiac sign</li>
      <li>Every sign interacts differently with each phase</li>
      <li>That gives us <span class="highlight">96 distinct energetic micro&#8209;cycles</span></li>
    </ul>

    <p>That&rsquo;s the engine that lives inside my Quantumelodics system.</p>

    <hr class="divider" />

    <p><span class="highlight">Here&rsquo;s the important part:</span><br/>
    I am not going to ask you to learn all 96 pieces in this starter. That would be overwhelming and unnecessary.</p>

    <p>In Moon Tuner Starter, you will:</p>

    <ul>
      <li>Learn the <span class="highlight">8 core lunar phases</span> and what they&rsquo;re best for</li>
      <li>Apply them to 1&ndash;2 areas of your life for one lunar cycle</li>
      <li>Start to feel how small shifts in timing change your experience</li>
    </ul>

    <p>Think of this as your on&#8209;ramp to a much richer system.<br/>
    You get the benefit of precision and pattern, without needing to hold the whole map in your head.</p>

    <hr class="divider" />

    <h2 class="accent">What to do next</h2>

    <ul>
      <li><span class="highlight">Watch Module 1:</span> The Lunar Operating System</li>
      <li><span class="highlight">Choose</span> the 1&ndash;2 areas of your life you want to focus on for this cycle</li>
      <li><span class="highlight">Open your Moon Tuner Planner</span> and fill in those focus areas</li>
    </ul>

    <p>Once you&rsquo;ve done that, you&rsquo;ll be ready to set up your 28&#8209;day experiment and move into the next phase of the moon with intention instead of guesswork.</p>

    <hr class="divider" />

    <p class="footer">
      &copy; MOONtuner &middot; <a href="https://moontuner.xyz">moontuner.xyz</a><br/>
      A Lunar Alignment System for Living in Phase
    </p>
  </div>
</body>
</html>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Require an authenticated caller and ensure they own the email
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ success: false, error: "Authentication required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
      );
    }
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ success: false, error: "Unauthorized" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
      );
    }

    // Rate limit by user ID (more reliable than IP)
    if (isRateLimited(user.id)) {
      logStep("Rate limited", { user: user.id });
      return new Response(
        JSON.stringify({ success: false, error: "Too many requests. Please try again later." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const trimmedEmail = validateEmail(body.email);

    if (user.email && trimmedEmail !== user.email.toLowerCase()) {
      return new Response(
        JSON.stringify({ success: false, error: "Email does not match authenticated user" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 403 }
      );
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY not configured");
    }

    logStep("Sending welcome email via Resend", { to: trimmedEmail });

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "MOONtuner <hello@moontuner.xyz>",
        to: [trimmedEmail],
        subject: "Welcome to Moon Tuner Starter 🌙 Your 28‑day experiment is on",
        html: buildWelcomeHTML(),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      logStep("Resend API error", data);
      throw new Error(`Resend error: ${JSON.stringify(data)}`);
    }

    logStep("Welcome email sent successfully", { id: data.id });

    return new Response(
      JSON.stringify({ success: true, emailId: data.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: msg });
    return new Response(
      JSON.stringify({ success: false, error: msg }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
