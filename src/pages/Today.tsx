/**
 * Today — Mobile-first daily home surface.
 *
 * Design philosophy:
 * - Cinematic personal observatory feel
 * - Single-column card stack, thumb-friendly
 * - Ambient gradient background keyed to lunar phase
 * - Contemplative scroll: each card breathes before the next
 * - Haptic feedback on meaningful interactions
 * - Large typography, generous spacing, no dashboard density
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTodayData } from "@/hooks/useTodayData";
import { useHaptic } from "@/hooks/useHaptic";
import { MoonPhaseGlyph } from "@/components/MoonPhaseGlyph";

type PhaseKey =
  | "new" | "waxing-crescent" | "first-quarter" | "waxing-gibbous"
  | "full" | "waning-gibbous" | "last-quarter" | "waning-crescent";
import { PageTransition } from "@/components/PageTransition";

// ─── Scroll-reveal hook (lightweight, no framer dep needed for simple fades) ──
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ─── Phase key normalizer (for MoonPhaseGlyph) ────────────────────────────────
function normalizePhaseKey(phaseName: string): PhaseKey {
  const slug = phaseName.toLowerCase().replace(/\s+/g, "-");
  if (slug === "new-moon") return "new";
  if (slug === "full-moon") return "full";
  const valid: PhaseKey[] = [
    "waxing-crescent", "first-quarter", "waxing-gibbous",
    "waning-gibbous", "last-quarter", "waning-crescent",
  ];
  return valid.includes(slug as PhaseKey) ? (slug as PhaseKey) : "new";
}

// ─── Tiny section fade wrapper ─────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 1s cubic-bezier(0.2,0.8,0.2,1) ${delay}s, transform 1s cubic-bezier(0.2,0.8,0.2,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Today Card shell ─────────────────────────────────────────────────────────
function TodayCard({
  children,
  accent = "transparent",
  className = "",
}: {
  children: React.ReactNode;
  accent?: string;
  className?: string;
}) {
  return (
    <div
      className={`today-card relative ${className}`}
      style={{ borderColor: accent }}
    >
      {/* Left accent rule */}
      <div
        className="absolute top-0 left-0 w-[2px] h-full rounded-l-[1rem] opacity-50"
        style={{ background: accent }}
      />
      {children}
    </div>
  );
}

/** Default accent color used when directive state is not in the map */
const DEFAULT_DIRECTIVE_ACCENT = "hsl(38 47% 59%)";

// ─── Directive badge ──────────────────────────────────────────────────────────
const DIRECTIVE_ACCENT: Record<string, string> = {
  Push:      DEFAULT_DIRECTIVE_ACCENT,
  Hold:      "hsl(38 33% 91% / 0.5)",
  Reflect:   "hsl(40 5% 53%)",
  Release:   "hsl(38 47% 59% / 0.7)",
  Reconnect: "hsl(168 65% 52%)",
  Create:    DEFAULT_DIRECTIVE_ACCENT,
  Recover:   "hsl(40 5% 53% / 0.7)",
};

// ─── Page component ───────────────────────────────────────────────────────────

const Today = () => {
  const data = useTodayData();
  const { vibrate } = useHaptic();
  const [ritualExpanded, setRitualExpanded] = useState(false);
  const [ritualComplete, setRitualComplete] = useState(false);
  const [reflectionOpen, setReflectionOpen] = useState(false);

  const phaseKey = normalizePhaseKey(data.lunar.phaseName);
  const directiveAccent = DIRECTIVE_ACCENT[data.directive.state] ?? DEFAULT_DIRECTIVE_ACCENT;

  const handleRitualToggle = () => {
    vibrate("soft");
    setRitualExpanded((v) => !v);
  };

  const handleRitualComplete = () => {
    vibrate("ritual");
    setRitualComplete(true);
  };

  const handleReflectionOpen = () => {
    vibrate("light");
    setReflectionOpen(true);
  };

  return (
    <PageTransition>
      {/* Full-screen atmospheric wrapper */}
      <div
        className="today-page dusk min-h-screen relative"
        style={{ background: data.ambient.gradient }}
      >
        {/* Grain overlay */}
        <div className="today-grain pointer-events-none" />

        {/* Ambient breathing orb — phase-keyed glow */}
        <div
          className="today-orb pointer-events-none"
          style={{ background: `hsl(${data.ambient.accentHsl} / 0.12)` }}
        />

        {/* ── Minimal Mobile Nav ────────────────────────────────────── */}
        <nav className="today-nav">
          <Link to="/" className="today-nav-back" aria-label="Back to home">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          <div className="today-nav-center">
            <span className="today-eyebrow">{data.date}</span>
          </div>

          {/* Phase pill */}
          <div className="today-phase-pill">
            <span
              className="today-phase-dot"
              style={{ background: `hsl(${data.ambient.accentHsl})` }}
            />
            <span className="today-eyebrow" style={{ color: "hsl(var(--dusk-ivory) / 0.6)" }}>
              {data.lunar.phaseName}
            </span>
          </div>
        </nav>

        {/* ── Main scroll container ─────────────────────────────────── */}
        <main className="today-main">

          {/* ── Hero greeting ────────────────────────────────────────── */}
          <section className="today-hero">
            <Reveal>
              <p className="today-eyebrow mb-4" style={{ color: "hsl(var(--dusk-silver))" }}>
                <span
                  className="inline-block w-4 h-px align-middle mr-2"
                  style={{ background: directiveAccent }}
                />
                Your day
              </p>
              <h1 className="today-headline dusk-serif">
                <span style={{ color: directiveAccent }}>{data.directive.state}</span>
                <span className="dusk-ivory">.</span>
              </h1>
              <p className="today-subhead dusk-serif italic" style={{ color: "hsl(var(--dusk-ivory) / 0.62)" }}>
                {data.directive.weather}
              </p>
            </Reveal>
          </section>

          {/* ── Directive card ────────────────────────────────────────── */}
          <Reveal delay={0.08} className="today-section">
            <TodayCard accent={directiveAccent}>
              <p className="today-card-label">Today's Directive</p>
              <p className="today-card-body" style={{ color: "hsl(var(--dusk-ivory) / 0.82)" }}>
                {data.directive.recommendation}
              </p>
              <div className="today-divider mt-5 mb-5" />
              <p className="today-quote dusk-serif">
                "{data.directive.guidance}"
              </p>
            </TodayCard>
          </Reveal>

          {/* ── Lunar state card ─────────────────────────────────────── */}
          <Reveal delay={0.04} className="today-section">
            <TodayCard accent={data.ambient.cardAccent}>
              <p className="today-card-label">Lunar State</p>
              <div className="today-lunar-row">
                {/* Phase glyph */}
                <div
                  className="today-glyph-ring"
                  style={{ borderColor: `hsl(${data.ambient.accentHsl} / 0.35)` }}
                >
                  <MoonPhaseGlyph phase={phaseKey} size="md" className="dusk-ivory" />
                </div>
                {/* Phase data */}
                <div>
                  <p className="today-data-headline dusk-serif">{data.lunar.phaseName}</p>
                  <p className="today-data-meta">
                    {data.lunar.sign} · {data.lunar.illuminationPct}% illuminated
                  </p>
                  <p className="today-data-meta">
                    {data.lunar.isWaxing ? "Waxing ↑" : "Waning ↓"} · ~{data.lunar.hoursInSign}h in sign
                  </p>
                </div>
              </div>
              <div className="today-divider mt-5 mb-4" />
              <div className="today-phase-quality">
                <span className="today-eyebrow" style={{ color: "hsl(var(--dusk-silver))" }}>
                  {data.lunar.astrological.energy}
                </span>
                <span className="today-data-meta">
                  {data.lunar.astrological.theme} · {data.lunar.astrological.quality}
                </span>
              </div>
              {/* Next milestone */}
              <div className="today-next-phase mt-5">
                <span className="today-eyebrow" style={{ color: "hsl(var(--dusk-mute))" }}>Next Full Moon</span>
                <span className="today-data-meta">
                  {data.lunar.nextFullMoon.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                </span>
              </div>
            </TodayCard>
          </Reveal>

          {/* ── Timing posture card ───────────────────────────────────── */}
          <Reveal delay={0.04} className="today-section">
            <TodayCard accent={data.ambient.cardAccent}>
              <p className="today-card-label">Timing Posture</p>
              <p
                className="today-data-headline dusk-serif mb-2"
                style={{ color: `hsl(${data.ambient.accentHsl})` }}
              >
                {data.timing.label}
              </p>
              <p className="today-card-body mb-5" style={{ color: "hsl(var(--dusk-ivory) / 0.66)" }}>
                {data.timing.quality}
              </p>
              <div className="today-timing-grid">
                <div>
                  <p className="today-eyebrow mb-2" style={{ color: "hsl(168 60% 48% / 0.8)" }}>
                    Favorable
                  </p>
                  {data.timing.favorable.map((item) => (
                    <p key={item} className="today-timing-item">
                      {item}
                    </p>
                  ))}
                </div>
                <div>
                  <p className="today-eyebrow mb-2" style={{ color: "hsl(15 60% 55% / 0.8)" }}>
                    Avoid
                  </p>
                  {data.timing.avoid.map((item) => (
                    <p key={item} className="today-timing-item" style={{ color: "hsl(var(--dusk-ivory) / 0.45)" }}>
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </TodayCard>
          </Reveal>

          {/* ── Reflection prompt ─────────────────────────────────────── */}
          <Reveal delay={0.04} className="today-section">
            <TodayCard accent={data.ambient.cardAccent}>
              <p className="today-card-label">Reflection Prompt</p>
              <p className="today-quote dusk-serif" style={{ color: "hsl(var(--dusk-ivory) / 0.88)" }}>
                {data.reflection}
              </p>
              {!reflectionOpen ? (
                <button
                  onClick={handleReflectionOpen}
                  className="today-action-btn mt-6"
                  style={{ borderColor: `hsl(${data.ambient.accentHsl} / 0.3)`, color: `hsl(${data.ambient.accentHsl})` }}
                >
                  Sit with this
                </button>
              ) : (
                <div
                  className="mt-6"
                  style={{
                    opacity: reflectionOpen ? 1 : 0,
                    transition: "opacity 0.8s cubic-bezier(0.2,0.8,0.2,1)",
                  }}
                >
                  <p className="today-data-meta" style={{ color: "hsl(var(--dusk-silver))" }}>
                    Take a breath. There's no answer required — only presence.
                  </p>
                  <div className="today-divider mt-4" />
                  <Link
                    to="/journal"
                    onClick={() => vibrate("soft")}
                    className="today-action-btn mt-4 inline-block"
                    style={{ borderColor: `hsl(${data.ambient.accentHsl} / 0.3)`, color: `hsl(${data.ambient.accentHsl})` }}
                  >
                    Write in journal →
                  </Link>
                </div>
              )}
            </TodayCard>
          </Reveal>

          {/* ── Ritual card ───────────────────────────────────────────── */}
          <Reveal delay={0.04} className="today-section">
            <TodayCard accent={data.ambient.cardAccent}>
              <div className="today-ritual-header">
                <div>
                  <p className="today-card-label">Optional Ritual</p>
                  <p className="today-data-headline dusk-serif">{data.ritual.title}</p>
                  <p className="today-data-meta" style={{ color: "hsl(var(--dusk-silver))" }}>
                    {data.ritual.duration}
                  </p>
                </div>
                <button
                  className="today-expand-btn"
                  onClick={handleRitualToggle}
                  aria-expanded={ritualExpanded}
                  aria-label={ritualExpanded ? "Collapse ritual" : "Expand ritual"}
                  style={{ borderColor: `hsl(${data.ambient.accentHsl} / 0.25)` }}
                >
                  <svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    style={{
                      transform: ritualExpanded ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.5s cubic-bezier(0.2,0.8,0.2,1)",
                    }}
                  >
                    <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Expandable steps */}
              <div
                className="today-ritual-steps"
                style={{
                  maxHeight: ritualExpanded ? "500px" : "0",
                  opacity: ritualExpanded ? 1 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.7s cubic-bezier(0.2,0.8,0.2,1), opacity 0.5s cubic-bezier(0.2,0.8,0.2,1)",
                }}
              >
                <div className="today-divider my-5" />
                {data.ritual.steps.map((step, i) => (
                  <div key={i} className="today-ritual-step">
                    <span
                      className="today-ritual-num"
                      style={{ color: `hsl(${data.ambient.accentHsl})` }}
                    >
                      {i + 1}
                    </span>
                    <p className="today-card-body" style={{ color: "hsl(var(--dusk-ivory) / 0.78)" }}>
                      {step}
                    </p>
                  </div>
                ))}
                {!ritualComplete ? (
                  <button
                    onClick={handleRitualComplete}
                    className="today-complete-btn mt-6"
                    style={{
                      background: `hsl(${data.ambient.accentHsl} / 0.12)`,
                      borderColor: `hsl(${data.ambient.accentHsl} / 0.35)`,
                      color: `hsl(${data.ambient.accentHsl})`,
                    }}
                  >
                    Mark complete
                  </button>
                ) : (
                  <p
                    className="today-complete-msg mt-6 dusk-serif italic"
                    style={{ color: `hsl(${data.ambient.accentHsl} / 0.8)` }}
                  >
                    ✓ Completed. Well done.
                  </p>
                )}
              </div>
            </TodayCard>
          </Reveal>

          {/* ── Cipher & Report links ──────────────────────────────────── */}
          <Reveal delay={0.04} className="today-section">
            <div className="today-links-row">
              <Link
                to="/lunar-cipher"
                onClick={() => vibrate("light")}
                className="today-deep-link"
                style={{
                  background: `hsl(${data.ambient.accentHsl} / 0.08)`,
                  borderColor: `hsl(${data.ambient.accentHsl} / 0.2)`,
                }}
              >
                <span className="today-eyebrow" style={{ color: `hsl(${data.ambient.accentHsl})` }}>
                  Lunar Cipher
                </span>
                <p className="today-data-meta mt-1">
                  Your natal phase · pattern · timing
                </p>
              </Link>
              <Link
                to="/lunar-reports"
                onClick={() => vibrate("light")}
                className="today-deep-link"
                style={{
                  background: `hsl(${data.ambient.accentHsl} / 0.06)`,
                  borderColor: `hsl(var(--dusk-line))`,
                }}
              >
                <span className="today-eyebrow" style={{ color: "hsl(var(--dusk-silver))" }}>
                  Reports
                </span>
                <p className="today-data-meta mt-1">
                  Personalized lunar documents
                </p>
              </Link>
            </div>
          </Reveal>

          {/* ── Footer note ────────────────────────────────────────────── */}
          <Reveal delay={0.04} className="today-footer">
            <p className="today-eyebrow text-center" style={{ color: "hsl(var(--dusk-mute))" }}>
              Updated daily · Calibrated to live lunar data
            </p>
            <p className="today-eyebrow text-center mt-2" style={{ color: "hsl(var(--dusk-mute) / 0.6)" }}>
              {data.lunar.astrological.frequency} · {data.lunar.astrological.frequencyHz} Hz
            </p>
          </Reveal>

        </main>
      </div>
    </PageTransition>
  );
};

export default Today;
