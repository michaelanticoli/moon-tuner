import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Check, Loader2 } from "lucide-react";

interface LunarCaptureProps {
  source?: string;
  heading?: string;
  subheading?: string;
  items?: string[];
}

/**
 * LunarCapture — a soft, editorially-toned email onboarding component.
 *
 * Connects to the existing `subscribe-email` Supabase edge function.
 * Designed to feel welcome, useful, and emotionally supportive — not like
 * an aggressive conversion funnel.
 */
export function LunarCapture({
  source = "website",
  heading = "Stay in the cycle.",
  subheading = "A quiet transmission, calibrated to the Moon.",
  items = [
    "Daily directives aligned to the current phase",
    "Lunar reflections and timing reports",
    "Digital hygiene reminders when the cycle calls for clearing",
    "Reflective prompts for honest self-observation",
  ],
}: LunarCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      const { data, error } = await supabase.functions.invoke(
        "subscribe-email",
        { body: { email: email.trim(), source } }
      );

      if (error) throw error;

      if (data?.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data?.error ?? "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Unable to subscribe. Please try again.");
    }
  };

  return (
    <div
      className="rounded-xl border p-8 lg:p-12"
      style={{
        background: "hsl(22 12% 9%)",
        borderColor: "hsl(22 12% 16%)",
      }}
    >
      {/* Eyebrow */}
      <p
        className="text-[0.58rem] tracking-[0.3em] uppercase mb-5"
        style={{ color: "hsl(38 90% 58% / 0.5)" }}
      >
        <span
          className="inline-block w-4 h-px align-middle mr-2"
          style={{ background: "hsl(38 90% 58% / 0.4)" }}
        />
        Moontuner Letters
      </p>

      {/* Heading */}
      <h2
        className="font-serif text-2xl lg:text-3xl mb-3 leading-[1.15]"
        style={{ color: "hsl(40 18% 88%)" }}
      >
        {heading}
      </h2>

      {/* Subheading */}
      <p
        className="text-sm lg:text-base leading-[1.75] mb-8"
        style={{ color: "hsl(40 12% 52%)" }}
      >
        {subheading}
      </p>

      {/* What you receive */}
      {!status || status !== "success" ? (
        <>
          <ul className="space-y-3 mb-8">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-[1.65]"
                style={{ color: "hsl(40 12% 52%)" }}
              >
                <span
                  className="mt-1 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "hsl(38 90% 58% / 0.5)" }}
                />
                {item}
              </li>
            ))}
          </ul>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="your@email.com"
              required
              className="flex-1 rounded-lg px-4 py-3 text-sm outline-none transition-colors duration-200 font-sans"
              style={{
                background: "hsl(22 12% 6%)",
                border: "1px solid hsl(22 12% 20%)",
                color: "hsl(40 18% 80%)",
              }}
              aria-label="Email address"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-[0.7rem] tracking-[0.2em] uppercase transition-all duration-200 font-sans"
              style={{
                background: "hsl(22 12% 14%)",
                border: "1px solid hsl(22 12% 22%)",
                color:
                  status === "loading"
                    ? "hsl(40 12% 38%)"
                    : "hsl(40 18% 78%)",
              }}
            >
              {status === "loading" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Subscribe"
              )}
            </button>
          </form>

          {status === "error" && message && (
            <p
              className="mt-3 text-xs"
              style={{ color: "hsl(0 55% 60%)" }}
            >
              {message}
            </p>
          )}

          {/* Privacy note */}
          <p
            className="mt-5 text-[0.6rem] leading-relaxed"
            style={{ color: "hsl(40 12% 32%)" }}
          >
            No spam. No urgency. No manipulation. Unsubscribe whenever the
            timing is right for you.
          </p>
        </>
      ) : (
        /* Success state */
        <div className="flex items-start gap-4 py-4">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
            style={{ background: "hsl(38 90% 58% / 0.12)" }}
          >
            <Check
              className="w-4 h-4"
              style={{ color: "hsl(38 90% 58%)" }}
            />
          </div>
          <div>
            <p
              className="font-serif text-lg mb-1"
              style={{ color: "hsl(40 18% 84%)" }}
            >
              You're in the cycle.
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "hsl(40 12% 50%)" }}
            >
              The first transmission arrives when the timing is right. Until
              then — today's directive is waiting for you.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
