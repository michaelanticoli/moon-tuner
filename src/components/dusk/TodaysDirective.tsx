import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useMoonPhase } from "@/hooks/useMoonPhase";
import { MoonPhaseGlyph } from "@/components/MoonPhaseGlyph";

type Directive = "Push" | "Hold" | "Reflect" | "Release" | "Reconnect" | "Create" | "Recover";

interface DirectivePayload {
  state: Directive;
  weather: string;        // "emotional weather" — short
  guidance: string;       // poetic line
}

// Phase → directive mapping
const PHASE_TO_DIRECTIVE: Record<string, DirectivePayload> = {
  "New Moon": {
    state: "Reflect",
    weather: "Quiet · Inward · Slow",
    guidance:
      "Begin nothing visible. The seed is being chosen in darkness; let the choice be honest.",
  },
  "Waxing Crescent": {
    state: "Create",
    weather: "Tender momentum",
    guidance:
      "Make the first small thing. Don't show it yet. Trust the rough draft of your own direction.",
  },
  "First Quarter": {
    state: "Push",
    weather: "Tension into traction",
    guidance:
      "The friction is the function. Decide. Move. The wall isn't a stop sign — it's an instruction.",
  },
  "Waxing Gibbous": {
    state: "Hold",
    weather: "Almost · Refining · Patient",
    guidance:
      "Don't release it yet. The work is asking for one more honest pass before it meets the world.",
  },
  "Full Moon": {
    state: "Release",
    weather: "Bright · Exposed · Whole",
    guidance:
      "Whatever wants to leave you — let it. Clarity arrives by subtraction, not by holding tighter.",
  },
  "Waning Gibbous": {
    state: "Reconnect",
    weather: "Soft · Generous · Returning",
    guidance:
      "Share what worked. Reach toward someone you've been quietly missing. Wisdom wants distribution.",
  },
  "Last Quarter": {
    state: "Release",
    weather: "Editing · Composting · Honest",
    guidance:
      "Close the open loops. The energy you spend on unfinished things is the energy you owe the next cycle.",
  },
  "Waning Crescent": {
    state: "Recover",
    weather: "Low · Dreaming · Restorative",
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

export function TodaysDirective() {
  const moon = useMoonPhase();

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

  return (
    <section
      id="todays-directive"
      className="relative py-28 lg:py-36 overflow-hidden"
      aria-label="Today's Directive"
    >
      {/* Soft atmospheric edge */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 0%, hsl(var(--dusk-ivory) / 0.025) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1100px] px-6 lg:px-12">
        {/* Section header */}
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
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

        {/* The card */}
        <article className="dusk-surface p-8 lg:p-14 relative overflow-hidden">
          {/* Faint glyph background */}
          <div className="absolute -top-10 -right-10 opacity-[0.06] pointer-events-none">
            <MoonPhaseGlyph
              phase={normalizedKey as never}
              size="lg"
              className="w-[280px] h-[280px] dusk-ivory"
            />
          </div>

          <div className="relative grid lg:grid-cols-[auto,1fr] gap-10 lg:gap-16 items-start">
            {/* Left — phase glyph */}
            <div className="flex flex-col items-start gap-5">
              <div className="w-[112px] h-[112px] rounded-full border border-[hsl(var(--dusk-ivory))]/12 flex items-center justify-center dusk-breath">
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

            {/* Right — directive content */}
            <div>
              <p className="dusk-eyebrow mb-3">Energetic Approach</p>
              <h3 className="dusk-serif text-[clamp(3rem,7vw,5.4rem)] dusk-ivory leading-[0.95] mb-2">
                {payload.state}
                <span className="dusk-gold">.</span>
              </h3>
              <p className="text-[0.95rem] dusk-silver tracking-wide mb-10">
                {DIRECTIVE_TONE[payload.state]}
              </p>

              <div className="dusk-hairline mb-8 max-w-[120px]" />

              <p className="dusk-eyebrow mb-3">Emotional Weather</p>
              <p className="dusk-serif italic text-xl lg:text-2xl mb-10"
                 style={{ color: "hsl(var(--dusk-ivory) / 0.88)" }}>
                {payload.weather}
              </p>

              <p className="dusk-eyebrow mb-3">Guidance</p>
              <p className="dusk-serif text-[1.35rem] lg:text-[1.55rem] leading-[1.45] dusk-ivory max-w-[560px]">
                "{payload.guidance}"
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-4">
                <Link to="/lunar-cipher" className="dusk-btn dusk-btn-primary">
                  Open Today's Cipher
                </Link>
                <Link to="/lunar-reports" className="dusk-btn dusk-btn-ghost">
                  Personalize It
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Footer note */}
        <p className="mt-10 text-[0.72rem] tracking-[0.24em] uppercase dusk-silver text-center">
          Updates daily · Revisitable · Calibrated to live lunar data
        </p>
      </div>
    </section>
  );
}
