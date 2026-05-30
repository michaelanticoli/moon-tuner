/**
 * send-membership-email
 *
 * Sends calm, editorially-toned membership lifecycle emails.
 * Supports four flows:
 *   - "welcome_new"     — first time a membership is activated
 *   - "welcome_return"  — a lapsed member resubscribes
 *   - "paused"          — membership is paused
 *   - "archive_access"  — gentle note to long-term archive users (annual anniversary)
 *
 * Email tone: emotionally intelligent, calm, useful, reflective.
 * No urgency, no "don't miss out", no manufactured pressure.
 *
 * Uses Resend (resend.com) for delivery. Set RESEND_API_KEY in Supabase secrets.
 * Gracefully falls back to a console log if the key is absent (useful for testing).
 *
 * Body: { flow: string, to: string, name?: string, tier?: string }
 */
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type EmailFlow = "welcome_new" | "welcome_return" | "paused" | "archive_access";

const FROM = "Moontuner <hello@moontuner.xyz>";
const REPLY_TO = "support@moontuner.xyz";
const BASE_URL = "https://moontuner.xyz";

const TIER_LABELS: Record<string, string> = {
  reflective: "Reflective",
  insight: "Insight",
  practitioner: "Practitioner",
  free: "Free",
};

function tierLabel(tier: string) {
  return TIER_LABELS[tier] ?? tier;
}

// ─── Email Templates ──────────────────────────────────────────────────────────

function welcomeNew(name: string, tier: string): { subject: string; html: string } {
  const greeting = name ? `Hello ${name},` : "Hello,";
  const tl = tierLabel(tier);

  return {
    subject: `Your ${tl} archive is ready.`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:40px 20px;background:#0a0a0a;font-family:Georgia,serif;color:#c8c4b8;">
  <div style="max-width:560px;margin:0 auto;">
    <p style="font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:#5a5550;margin-bottom:48px;">Moontuner</p>

    <p style="font-size:28px;font-weight:300;line-height:1.3;color:#e8e4dc;margin-bottom:24px;">
      ${greeting}
    </p>

    <p style="font-size:16px;line-height:1.7;color:#8a8680;margin-bottom:20px;">
      Your <strong style="color:#c8c4b8;">${tl} membership</strong> is active.
      Your archive is open.
    </p>

    <p style="font-size:15px;line-height:1.7;color:#6a6660;margin-bottom:20px;">
      There's nothing you need to do. The practice is here when you're ready —
      today's directive, your journal, the proposals you've been sitting with.
    </p>

    <p style="font-size:15px;line-height:1.7;color:#6a6660;margin-bottom:40px;">
      Billing is transparent and quiet. You can pause or cancel from your
      account settings at any time. Your archive remains intact either way.
    </p>

    <a href="${BASE_URL}/dashboard" style="display:inline-block;padding:14px 28px;border-radius:100px;background:#e8e4dc;color:#0a0a0a;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;font-weight:700;text-decoration:none;margin-bottom:48px;">
      Open Your Archive
    </a>

    <hr style="border:none;border-top:1px solid #1a1a1a;margin-bottom:40px;">

    <p style="font-size:11px;color:#3a3830;line-height:1.6;">
      You're receiving this because you activated a Moontuner membership.
      Questions? Reply to this email — it reaches a real person.
    </p>
  </div>
</body>
</html>`,
  };
}

function welcomeReturn(name: string, tier: string): { subject: string; html: string } {
  const greeting = name ? `Hello ${name},` : "Hello,";
  const tl = tierLabel(tier);

  return {
    subject: `Welcome back. Your archive is still here.`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:40px 20px;background:#0a0a0a;font-family:Georgia,serif;color:#c8c4b8;">
  <div style="max-width:560px;margin:0 auto;">
    <p style="font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:#5a5550;margin-bottom:48px;">Moontuner</p>

    <p style="font-size:28px;font-weight:300;line-height:1.3;color:#e8e4dc;margin-bottom:24px;">
      ${greeting}<br>Welcome back.
    </p>

    <p style="font-size:16px;line-height:1.7;color:#8a8680;margin-bottom:20px;">
      Your <strong style="color:#c8c4b8;">${tl} membership</strong> is active again.
      Nothing was lost while you were away.
    </p>

    <p style="font-size:15px;line-height:1.7;color:#6a6660;margin-bottom:20px;">
      Your archive, your directives, your proposals — all exactly where you left them.
      The moon has kept moving. Your record picks up where it left off.
    </p>

    <p style="font-size:15px;line-height:1.7;color:#6a6660;margin-bottom:40px;">
      Take your time settling back in. There's no catching up to do.
    </p>

    <a href="${BASE_URL}/dashboard" style="display:inline-block;padding:14px 28px;border-radius:100px;background:#e8e4dc;color:#0a0a0a;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;font-weight:700;text-decoration:none;margin-bottom:48px;">
      Return to Your Archive
    </a>

    <hr style="border:none;border-top:1px solid #1a1a1a;margin-bottom:40px;">

    <p style="font-size:11px;color:#3a3830;line-height:1.6;">
      Questions? Reply directly to this email.
    </p>
  </div>
</body>
</html>`,
  };
}

function pausedEmail(name: string): { subject: string; html: string } {
  const greeting = name ? `Hello ${name},` : "Hello,";

  return {
    subject: `Your membership is paused. Your archive is safe.`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:40px 20px;background:#0a0a0a;font-family:Georgia,serif;color:#c8c4b8;">
  <div style="max-width:560px;margin:0 auto;">
    <p style="font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:#5a5550;margin-bottom:48px;">Moontuner</p>

    <p style="font-size:28px;font-weight:300;line-height:1.3;color:#e8e4dc;margin-bottom:24px;">
      ${greeting}<br>Your pause is confirmed.
    </p>

    <p style="font-size:15px;line-height:1.7;color:#6a6660;margin-bottom:20px;">
      Your archive is exactly where you left it. Nothing has been removed.
      Your directives, reflections, proposals, and reports remain intact.
    </p>

    <p style="font-size:15px;line-height:1.7;color:#6a6660;margin-bottom:20px;">
      While paused, you'll continue to have access to the free layer —
      today's directive, occasional reflections, and lightweight tools.
    </p>

    <p style="font-size:15px;line-height:1.7;color:#6a6660;margin-bottom:40px;">
      Resume whenever you're ready. The practice doesn't go anywhere.
    </p>

    <a href="${BASE_URL}/membership/manage" style="display:inline-block;padding:14px 28px;border-radius:100px;background:#e8e4dc;color:#0a0a0a;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;font-weight:700;text-decoration:none;margin-bottom:48px;">
      Manage Membership
    </a>

    <hr style="border:none;border-top:1px solid #1a1a1a;margin-bottom:40px;">

    <p style="font-size:11px;color:#3a3830;line-height:1.6;">
      If you didn't intend to pause, reply to this email and we'll sort it out.
    </p>
  </div>
</body>
</html>`,
  };
}

function archiveAnniversary(name: string, months: number): { subject: string; html: string } {
  const greeting = name ? `Hello ${name},` : "Hello,";

  return {
    subject: `A quiet note — ${months} months of reflection.`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:40px 20px;background:#0a0a0a;font-family:Georgia,serif;color:#c8c4b8;">
  <div style="max-width:560px;margin:0 auto;">
    <p style="font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:#5a5550;margin-bottom:48px;">Moontuner</p>

    <p style="font-size:28px;font-weight:300;line-height:1.3;color:#e8e4dc;margin-bottom:24px;">
      ${greeting}
    </p>

    <p style="font-size:16px;line-height:1.7;color:#8a8680;margin-bottom:20px;">
      You've been building your archive for <strong style="color:#c8c4b8;">${months} months</strong>.
    </p>

    <p style="font-size:15px;line-height:1.7;color:#6a6660;margin-bottom:20px;">
      That's a real record of where you've been — emotionally, creatively, temporally.
      Patterns are probably visible now that weren't clear at the beginning.
    </p>

    <p style="font-size:15px;line-height:1.7;color:#6a6660;margin-bottom:40px;">
      Your timeline is waiting for you. You can export your full archive from
      Settings at any time — it belongs to you.
    </p>

    <a href="${BASE_URL}/dashboard" style="display:inline-block;padding:14px 28px;border-radius:100px;background:#e8e4dc;color:#0a0a0a;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;font-weight:700;text-decoration:none;margin-bottom:48px;">
      Revisit Your Archive
    </a>

    <hr style="border:none;border-top:1px solid #1a1a1a;margin-bottom:40px;">

    <p style="font-size:11px;color:#3a3830;line-height:1.6;">
      This is not a marketing email. We just wanted to acknowledge the milestone quietly.
    </p>
  </div>
</body>
</html>`,
  };
}

// ─── Resend delivery ──────────────────────────────────────────────────────────

async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<void> {
  const apiKey = Deno.env.get("RESEND_API_KEY");

  if (!apiKey) {
    // Development / test mode — log instead of sending
    console.log(`[send-membership-email] DRY RUN: would send "${subject}" to ${to}`);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      reply_to: REPLY_TO,
      to: [to],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend delivery error:", err);
    throw new Error("Email delivery failed");
  }
}

// ─── Handler ──────────────────────────────────────────────────────────────────

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const {
      flow,
      to,
      name,
      tier,
      months,
    } = body as {
      flow: EmailFlow;
      to: string;
      name?: string;
      tier?: string;
      months?: number;
    };

    if (!flow || !to) {
      return json({ error: "flow and to are required" }, 400);
    }

    const displayName = (name ?? "").trim();
    const memberTier = (tier ?? "reflective").toLowerCase();

    let email: { subject: string; html: string };

    switch (flow) {
      case "welcome_new":
        email = welcomeNew(displayName, memberTier);
        break;
      case "welcome_return":
        email = welcomeReturn(displayName, memberTier);
        break;
      case "paused":
        email = pausedEmail(displayName);
        break;
      case "archive_access":
        email = archiveAnniversary(displayName, months ?? 12);
        break;
      default:
        return json({ error: "Unknown flow" }, 400);
    }

    await sendEmail(to, email.subject, email.html);
    return json({ sent: true });
  } catch (err) {
    console.error("send-membership-email error:", err);
    return json({ error: "An unexpected error occurred." }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
