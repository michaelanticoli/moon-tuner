import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useMoonPhase } from "@/hooks/useMoonPhase";
import { MoonPhaseGlyph } from "@/components/MoonPhaseGlyph";
import { DirectiveShareCard } from "@/components/sharing/DirectiveShareCard";

type Directive = "Push" | "Hold" | "Reflect" | "Release" | "Reconnect" | "Create" | "Recover";

interface DirectivePayload {
  state: Directive;
  weather: string;        // "emotional weather" — short
  recommendation: string; // energetic recommendation — one action
  guidance: string;       // poetic line
}

// Phase → directive mapping
const PHASE_TO_DIRECTIVE: Record<string, DirectivePayload> = {
  "New Moon": {
    state: "Reflect",
    weather: "Quiet · Inward · Slow",
    recommendation: "Sit with what you want before you speak it. Journal for 10 minutes before opening your phone.",
    guidance:
      "Begin nothing visible. The seed is being chosen in darkness; let the choice be honest.",
  },
  "Waxing Crescent": {
    state: "Create",
    weather: "Tender momentum",
    recommendation: "Start one thing you've been circling. Small, scrappy, undone — that's how beginnings work.",
    guidance:
      "Make the first small thing. Don't show it yet. Trust the rough draft of your own direction.",
  },
  "First Quarter": {
    state: "Push",
    weather: "Tension into traction",
    recommendation: "Make the decision you've been deferring. Commit to one direction and move.",
    guidance:
      "The friction is the function. Decide. Move. The wall isn't a stop sign — it's an instruction.",
  },
  "Waxing Gibbous": {
    state: "Hold",
    weather: "Almost · Refining · Patient",
    recommendation: "Resist the urge to launch. Read it once more. Ask: is this the best version you can offer?",
    guidance:
      "Don't release it yet. The work is asking for one more honest pass before it meets the world.",
  },
  "Full Moon": {
    state: "Release",
    weather: "Bright · Exposed · Whole",
    recommendation: "Name what you're letting go. Say it aloud or write it down and burn it.",
    guidance:
      "Whatever wants to leave you — let it. Clarity arrives by subtraction, not by holding tighter.",
  },
  "Waning Gibbous": {
    state: "Reconnect",
    weather: "Soft · Generous · Returning",
    recommendation: "Reach out to someone. Share something true. Generosity is the medicine of this phase.",
    guidance:
      "Share what worked. Reach toward someone you've been quietly missing. Wisdom wants distribution.",
  },
  "Last Quarter": {
    state: "Release",
    weather: "Editing · Composting · Honest",
    recommendation: "Close three open loops today. Archive, finish, or consciously abandon each one.",
    guidance:
      "Close the open loops. The energy you spend on unfinished things is the energy you owe the next cycle.",
  },
  "Waning Crescent": {
    state: "Recover",
    weather: "Low · Dreaming · Restorative",
    recommendation: "Do less than you think you should. Protect sleep. Let the body lead.",
    guidance:
      "Rest is not a reward you earn. It's the soil the next phase grows from. Let yourself disappear a little.",
  },
};

const DIRECTIVE_TONE: Record<Directive, string> = {
  Push: "Move now. Resistance is the path.",
  Hold: "Steady. The timing is not the obstacle — impatience is.",
  Reflect: "Listen inward before you act outward.",
  Release: "Loosen your grip on what is already leaving.",
  Reconnect: "Reach toward people, signal, and softness.",
  Create: "Make something small and unfinished.",
  Recover: "Restore. Permission granted.",
};

/** Accent color applied to each directive state */
const DIRECTIVE_ACCENT: Record<Directive, string> = {
  Push:      "hsl(var(--dusk-gold))",
  Hold:      "hsl(var(--dusk-ivory) / 0.5)",
  Reflect:   "hsl(var(--dusk-silver))",
  Release:   "hsl(var(--dusk-gold) / 0.7)",
  Reconnect: "hsl(168 65% 52%)",
  Create:    "hsl(var(--dusk-gold))",
  Recover:   "hsl(var(--dusk-silver) / 0.7)",
};

export function TodaysDirective() {
  const moon = useMoonPhase();
  const [visible, setVisible] = useState(false);
  const [contentKey, setContentKey] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const payload: DirectivePayload = useMemo(
    () =>
      PHASE_TO_DIRECTIVE[moon.astronomical.phaseName] ??
      PHASE_TO_DIRECTIVE["New Moon"],
    [moon.astronomical.phaseName]
  );

  const today = useMemo(
    () =>
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    []
  );

  const rawKey = moon.astronomical.phaseName.toLowerCase().replace(/\s+/g, "-");
  const normalizedKey = (
    rawKey === "new-moon" ? "new" : rawKey === "full-moon" ? "full" : rawKey
  ) as
    | "new"
    | "waxing-crescent"
    | "first-quarter"
    | "waxing-gibbous"
    | "full"
    | "waning-gibbous"
    | "last-quarter"
    | "waning-crescent";

  const illumPct = Math.round(moon.astronomical.illumination * 100);
  const accentColor = DIRECTIVE_ACCENT[payload.state];

  // Scroll-reveal: mark section visible once it enters the viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Re-trigger card animation on payload change (phase transitions)
  useEffect(() => { setContentKey((k) => k + 1); }, [payload.state]);

  return (
    <section
      id="todays-directive"
      ref={sectionRef}
      className="relative py-28 lg:py-36 overflow-hidden"
      aria-label="Today's Directive"
    >
      {/* Top atmospheric edge */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 0%, hsl(var(--dusk-ivory) / 0.025) 0%, transparent 60%)",
        }}
      />

      {/* Accent ambient orb — shifts per directive state */}
      <div
        className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 w-[800px] h-[320px] rounded-full blur-[120px] opacity-[0.06] dusk-breath"
        style={{ background: accentColor }}
      />

      <div className="relative mx-auto max-w-[1100px] px-6 lg:px-12">
        {/* Section header */}
        <div
          className="flex items-end justify-between flex-wrap gap-6 mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(18px)",
            transition: "opacity 1.1s cubic-bezier(0.2,0.8,0.2,1), transform 1.1s cubic-bezier(0.2,0.8,0.2,1)",
          }}
        >
          <div>
            <p className="dusk-eyebrow mb-4">
              <span className="inline-block w-6 h-px align-middle mr-3 bg-[hsl(var(--dusk-gold))]" />
              Today's Directive
            </p>
            <h2 className="dusk-serif text-[clamp(2rem,4.2vw,3.4rem)] dusk-ivory max-w-[560px]">
              The single instruction the day is offering you.
            </h2>
          </div>
          <div className="text-right">
            <p className="text-[0.7rem] tracking-[0.28em] uppercase dusk-silver mb-1">
              {today}
            </p>
            <p className="text-[0.7rem] tracking-[0.28em] uppercase dusk-mute">
              {moon.astronomical.moonSign} · {illumPct}% illuminated
            </p>
          </div>
        </div>

        {/* The card — animates in on scroll, re-animates on phase change */}
        <article
          key={contentKey}
          className="dusk-surface p-8 lg:p-14 relative overflow-hidden"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.985)",
            transition: "opacity 1.1s cubic-bezier(0.2,0.8,0.2,1) 0.15s, transform 1.1s cubic-bezier(0.2,0.8,0.2,1) 0.15s",
          }}
        >
          {/* Faint glyph watermark */}
          <div className="absolute -top-10 -right-10 opacity-[0.06] pointer-events-none">
            <MoonPhaseGlyph
              phase={normalizedKey as never}
              size="lg"
              className="w-[280px] h-[280px] dusk-ivory"
            />
          </div>

          {/* Accent rule — subtle left border that carries the directive color */}
          <div
            className="absolute top-0 left-0 w-[3px] h-full rounded-l-[1.25rem] opacity-40"
            style={{ background: accentColor }}
          />

          <div className="relative grid lg:grid-cols-[auto,1fr] gap-10 lg:gap-16 items-start">
            {/* Left — phase glyph */}
            <div className="flex flex-col items-start gap-5">
              <div
                className="w-[112px] h-[112px] rounded-full flex items-center justify-center dusk-breath"
                style={{ border: `1px solid ${accentColor}` }}
              >
                <MoonPhaseGlyph
                  phase={normalizedKey as never}
                  size="lg"
                  className="w-16 h-16 dusk-ivory"
                />
              </div>
              <div>
                <p className="dusk-eyebrow mb-1">Phase</p>
                <p className="dusk-serif text-2xl dusk-ivory">
                  {moon.astronomical.phaseName}
                </p>
              </div>
            </div>

            {/* Right — directive content, staggered reveal */}
            <div>
              {/* Directive headline */}
              <div
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(12px)",
                  transition: "opacity 0.9s cubic-bezier(0.2,0.8,0.2,1) 0.28s, transform 0.9s cubic-bezier(0.2,0.8,0.2,1) 0.28s",
                }}
              >
                <p className="dusk-eyebrow mb-3">Energetic Approach</p>
                <h3
                  className="dusk-serif text-[clamp(3rem,7vw,5.4rem)] leading-[0.95] mb-2"
                  style={{ color: accentColor }}
                >
                  {payload.state}
                  <span style={{ color: "hsl(var(--dusk-gold))" }}>.</span>
                </h3>
                <p className="text-[0.95rem] dusk-silver tracking-wide mb-10">
                  {DIRECTIVE_TONE[payload.state]}
                </p>
              </div>

              <div className="dusk-hairline mb-8 max-w-[120px]" />

              {/* Emotional weather */}
              <div
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(12px)",
                  transition: "opacity 0.9s cubic-bezier(0.2,0.8,0.2,1) 0.42s, transform 0.9s cubic-bezier(0.2,0.8,0.2,1) 0.42s",
                }}
              >
                <p className="dusk-eyebrow mb-3">Emotional Weather</p>
                <p
                  className="dusk-serif italic text-xl lg:text-2xl mb-10"
                  style={{ color: "hsl(var(--dusk-ivory) / 0.88)" }}
                >
                  {payload.weather}
                </p>
              </div>

              {/* Energetic recommendation */}
              <div
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(12px)",
                  transition: "opacity 0.9s cubic-bezier(0.2,0.8,0.2,1) 0.56s, transform 0.9s cubic-bezier(0.2,0.8,0.2,1) 0.56s",
                }}
              >
                <p className="dusk-eyebrow mb-3">Energetic Recommendation</p>
                <p
                  className="text-[1rem] lg:text-[1.0625rem] leading-[1.7] mb-10 max-w-[520px]"
                  style={{ color: "hsl(var(--dusk-ivory) / 0.72)" }}
                >
                  {payload.recommendation}
                </p>
              </div>

              {/* Poetic guidance */}
              <div
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(12px)",
                  transition: "opacity 0.9s cubic-bezier(0.2,0.8,0.2,1) 0.70s, transform 0.9s cubic-bezier(0.2,0.8,0.2,1) 0.70s",
                }}
              >
                <p className="dusk-eyebrow mb-3">Guidance</p>
                <p className="dusk-serif text-[1.35rem] lg:text-[1.55rem] leading-[1.45] dusk-ivory max-w-[560px]">
                  "{payload.guidance}"
                </p>

                <div className="mt-12 flex flex-wrap items-center gap-4">
                  <Link to="/today" className="dusk-btn dusk-btn-primary">
                    Open Today's Page
                  </Link>
                  <Link
                    to="/lunar-reports"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm text-[0.7rem] tracking-[0.2em] uppercase transition-colors hover:bg-[hsl(var(--dusk-gold))] hover:text-[hsl(var(--dusk-black))]"
                    style={{
                      border: "1px solid hsl(var(--dusk-gold) / 0.5)",
                      color: "hsl(var(--dusk-gold))",
                    }}
                  >
                    Generate Your Lunar Report →
                  </Link>
                  <DirectiveShareCard
                    phaseName={moon.astronomical.phaseName}
                    phaseKey={normalizedKey}
                    directiveState={payload.state}
                    emotionalWeather={payload.weather}
                    guidance={payload.guidance}
                    date={today}
                  />
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Footer note */}
        <p
          className="mt-10 text-[0.72rem] tracking-[0.24em] uppercase dusk-silver text-center text-slate-950"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 1.1s cubic-bezier(0.2,0.8,0.2,1) 0.85s",
          }}
        >
          Updates daily · Revisitable · Calibrated to live lunar data
        </p>
      </div>
    </section>
  );
}
