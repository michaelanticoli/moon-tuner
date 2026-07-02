import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { Footer } from "@/components/Footer";
import { DuskNav } from "@/components/dusk/DuskNav";
import { LunarCapture } from "@/components/LunarCapture";
import { SEOHead, websiteSchema } from "@/components/SEOHead";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MoonPhaseGlyph } from "@/components/MoonPhaseGlyph";
import { DuskLiveStatus } from "@/components/dusk/DuskLiveStatus";

/**
 * Moontuner — "Spiral" landing page.
 *
 * Hook: "You're not behind. You're on a spiral."
 * A cinematic Dusk-theme home that reframes time as a spiral (not a timeline),
 * with an animated phase-spiral canvas and an interactive "what time is it in
 * your life?" phase picker.
 *
 * Reuses the existing Dusk system: DuskNav, Footer, LunarCapture, SEOHead,
 * PageTransition, ScrollReveal, MoonPhaseGlyph. Styling uses the dusk-* utility
 * classes + --dusk-* tokens defined in index.css.
 */

type PhaseKey =
  | "new" | "waxing-crescent" | "first-quarter" | "waxing-gibbous"
  | "full" | "waning-gibbous" | "last-quarter" | "waning-crescent";

interface PhaseInfo {
  key: PhaseKey;
  name: string;
  short: string;
  color: string;
  when: string;
  act: string;
}

/** Riso phase color-coding, sampled from the brand illustration set. */
const PHASE_COLORS = [
  "#e5432c", "#e8792b", "#f2b02e", "#1f9aa6",
  "#2b4c8c", "#c0397f", "#7a4ea3", "#8a8a3a",
];

const PHASES: PhaseInfo[] = [
  {
    key: "new", name: "New Moon", short: "New", color: "#e5432c",
    when: "Zero point. The page is blank on purpose.",
    act: "This is the quiet before anything shows. Plant the intention before there's proof. Don't rush to make it look like something yet — just name what you're actually reaching for.",
  },
  {
    key: "waxing-crescent", name: "Waxing Crescent", short: "Crescent", color: "#e8792b",
    when: "First light. The idea has a pulse now.",
    act: "Something is real but fragile. Protect it. Take the first small, unglamorous action — and resist the urge to explain it to everyone before it can stand on its own.",
  },
  {
    key: "first-quarter", name: "First Quarter", short: "1st Qtr", color: "#f2b02e",
    when: "The friction phase. The first real no arrives.",
    act: "Resistance means you've reached the part that matters. Decide and push through. This is where most people quit — and where you build the thing instead.",
  },
  {
    key: "waxing-gibbous", name: "Waxing Gibbous", short: "Gibbous", color: "#1f9aa6",
    when: "Almost, but not yet. Close enough to doubt it.",
    act: "The temptation is to restart from scratch. Don't. Refine, adjust, sharpen. You are closer than the anxiety is telling you — finish the version you have.",
  },
  {
    key: "full", name: "Full Moon", short: "Full", color: "#2b4c8c",
    when: "Everything is lit. You can finally see it clearly.",
    act: "Harvest what you built and let yourself be seen. Then notice what the light reveals that you'd rather not — the full moon shows the whole shape, shadow included.",
  },
  {
    key: "waning-gibbous", name: "Waning Gibbous", short: "Dissem.", color: "#c0397f",
    when: "The exhale. Time to give it away.",
    act: "Share what you learned instead of hoarding it. Teach, tell, hand it forward. What you release now comes back around the spiral changed.",
  },
  {
    key: "last-quarter", name: "Last Quarter", short: "Last Qtr", color: "#7a4ea3",
    when: "Clearing house. The half-light of honest edits.",
    act: "Cut what you're only carrying out of habit — a commitment, a story, a weight. Forgiveness is a kind of subtraction. Make room before the next cycle asks for it.",
  },
  {
    key: "waning-crescent", name: "Waning Crescent", short: "Balsamic", color: "#8a8a3a",
    when: "The quiet before. Rest is not the same as behind.",
    act: "Do less on purpose. Dream, sleep, restore the signal. This isn't lost time — it's the pause that lets the next new moon actually land.",
  },
];

/* ── Animated phase-spiral canvas ──────────────────────────────────────────
 * Time rendered as a coil, not a line. Dots are phase-color-coded; a gold
 * marker rides the outer curve as the live "you are here". Purely ambient.
 */
function SpiralField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let rot = 0;
    let w = 0;
    let h = 0;
    const turns = 4.6;
    const density = 260;

    const resize = () => {
      const r = cvs.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cvs.width = Math.max(1, Math.round(r.width * dpr));
      cvs.height = Math.max(1, Math.round(r.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      w = r.width;
      h = r.height;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!w || !h) {
        raf = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.5;
      const cy = h * 0.5;
      const maxR = Math.min(w, h) * 0.47;

      // connecting spiral line
      ctx.beginPath();
      for (let i = 0; i <= density; i++) {
        const t = i / density;
        const a = t * turns * Math.PI * 2 + rot;
        const rad = maxR * Math.pow(t, 0.9);
        const x = cx + Math.cos(a) * rad;
        const y = cy + Math.sin(a) * rad * 0.92;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(233,228,214,0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // phase dots
      for (let i = 0; i < density; i++) {
        const t = i / density;
        const a = t * turns * Math.PI * 2 + rot;
        const rad = maxR * Math.pow(t, 0.9);
        const x = cx + Math.cos(a) * rad;
        const y = cy + Math.sin(a) * rad * 0.92;
        const ph = Math.floor(t * turns * 8) % 8;
        ctx.globalAlpha = 0.22 + t * 0.6;
        ctx.fillStyle = PHASE_COLORS[ph];
        ctx.beginPath();
        ctx.arc(x, y, 1.1 + t * 3.1, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // "you are here" marker riding the outer curve (gold = dusk accent)
      const tm = 0.9;
      const am = tm * turns * Math.PI * 2 + rot;
      const rm = maxR * Math.pow(tm, 0.9);
      const mx = cx + Math.cos(am) * rm;
      const my = cy + Math.sin(am) * rm * 0.92;
      const pulse = 0.5 + 0.5 * Math.sin(Date.now() / 620);
      ctx.beginPath();
      ctx.arc(mx, my, 9 + pulse * 7, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(38, 47%, 59%, ${0.12 + pulse * 0.14})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(mx, my, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = "hsl(38, 47%, 62%)";
      ctx.shadowColor = "hsl(38, 47%, 62%)";
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.shadowBlur = 0;

      if (!prefersReduced) {
        rot += 0.0015;
        raf = requestAnimationFrame(draw);
      }
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReduced]);

  return (
    <div className="relative w-full max-w-[460px] aspect-square mx-auto">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <div className="text-[0.6rem] tracking-[0.28em] uppercase dusk-silver">You are</div>
        <div className="dusk-serif italic text-[1.5rem] dusk-ivory leading-none mt-1">here</div>
      </div>
    </div>
  );
}

const SpiralLanding = () => {
  const [selected, setSelected] = useState(3); // default: Waxing Gibbous
  const cur = PHASES[selected];

  return (
    <PageTransition>
      <SEOHead
        title="Moontuner — You're Not Behind. You're On a Spiral."
        description="Time isn't a line you fall behind on — it's a spiral you can move around. Moontuner helps you hear what time it is in your life and tune toward the one you're reaching for."
        canonical="/"
        keywords={[
          "lunar alignment system",
          "moon phase today",
          "intentional living",
          "cyclical productivity",
          "what phase am I in",
          "lunar timing",
        ]}
        jsonLd={websiteSchema()}
      />
      <div className="dusk min-h-screen relative">
        <DuskNav />
        <main>
          {/* ── HERO ──────────────────────────────────────────────────── */}
          <section className="relative overflow-hidden dusk-atmosphere" aria-label="Hero">
            <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12 pt-28 pb-16 lg:pt-36 lg:pb-24">
              <div className="grid lg:grid-cols-[1.05fr,0.95fr] gap-12 lg:gap-16 items-center">
                <div>
                  <p className="dusk-eyebrow mb-8 dusk-rise">
                    <span className="inline-block w-6 h-px align-middle mr-3 bg-[hsl(var(--dusk-gold))]" />
                    A Phase-Based Living System
                  </p>
                  <h1
                    className="dusk-serif text-[clamp(2.6rem,6.4vw,5.4rem)] dusk-ivory leading-[1.02] mb-7 dusk-rise"
                    style={{ animationDelay: "0.12s" }}
                  >
                    You're not behind.{" "}
                    <em className="italic dusk-gold">You're on a spiral.</em>
                  </h1>
                  <p
                    className="text-[1.0625rem] lg:text-[1.125rem] leading-[1.7] max-w-[540px] mb-10 dusk-rise"
                    style={{ animationDelay: "0.24s", color: "hsl(var(--dusk-ivory) / 0.72)" }}
                  >
                    There's a speed limit to life — one day at a time. But yesterday and
                    tomorrow are on the curve with you, and you can move between them.
                    Moontuner helps you hear what time it actually is{" "}
                    <em className="italic dusk-ivory">inside</em> you, then tune toward the
                    life you're reaching for.
                  </p>
                  <div
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 dusk-rise"
                    style={{ animationDelay: "0.36s" }}
                  >
                    <a href="#whattime" className="dusk-btn dusk-btn-primary">
                      Find your position
                    </a>
                    <Link to="/method" className="dusk-btn dusk-btn-ghost">
                      How it works
                    </Link>
                  </div>
                </div>

                <div className="dusk-rise" style={{ animationDelay: "0.3s" }}>
                  <SpiralField />
                  <p className="mt-6 text-center text-[0.7rem] tracking-[0.22em] uppercase dusk-silver">
                    Your position on the spiral — not the calendar's
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── LIVE SIGNAL (real lunar data via useMoonPhase) ────────── */}
          <section
            className="relative py-16 lg:py-20 border-t"
            style={{ borderColor: "hsl(var(--dusk-ivory) / 0.08)" }}
            aria-label="Live lunar status"
          >
            <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
              <ScrollReveal>
                <div className="mb-8 max-w-[560px]">
                  <p className="dusk-eyebrow mb-4">
                    <span className="inline-block w-6 h-px align-middle mr-3 bg-[hsl(var(--dusk-gold))]" />
                    The Sky, Right Now
                  </p>
                  <h2 className="dusk-serif text-[clamp(1.6rem,3.4vw,2.6rem)] dusk-ivory leading-[1.1]">
                    Where the Moon actually is — <em className="italic dusk-gold">live.</em>
                  </h2>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.08}>
                <DuskLiveStatus />
              </ScrollReveal>
            </div>
          </section>

          {/* ── PREMISE ───────────────────────────────────────────────── */}
          <section className="relative py-20 lg:py-24" aria-label="The premise">
            <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
              <div className="dusk-hairline mb-14" />
              <div className="grid lg:grid-cols-[0.9fr,1.1fr] gap-10 lg:gap-16 items-start">
                <ScrollReveal>
                  <p className="dusk-eyebrow mb-5">
                    <span className="inline-block w-6 h-px align-middle mr-3 bg-[hsl(var(--dusk-gold))]" />
                    The Premise
                  </p>
                  <h2 className="dusk-serif text-[clamp(1.9rem,4vw,3rem)] dusk-ivory leading-[1.1]">
                    Time isn't a line you fall behind on.{" "}
                    <em className="italic dusk-gold">It's a spiral.</em>
                  </h2>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <p
                    className="text-[1rem] leading-[1.75] mb-8"
                    style={{ color: "hsl(var(--dusk-ivory) / 0.7)" }}
                  >
                    We picture our lives as a straight timeline — a race we're winning or
                    losing. But we live in cycles: seasons, breaths, moons. The line bends
                    back on itself. You've been near this point before, one loop down, and
                    you'll pass a version of it again.
                  </p>
                  <div className="flex flex-col gap-4">
                    {[
                      ["01", "One day at a time", "the speed limit is real. You only ever live now."],
                      ["02", "But yesterday and tomorrow count", "the whole curve is with you, informing this moment."],
                      ["03", "You can jump position", "and it isn't equal across all of us. Your clock is yours."],
                    ].map(([n, head, tail]) => (
                      <div key={n} className="flex gap-4 items-start">
                        <span
                          className="text-[0.72rem] tracking-[0.14em] pt-1 shrink-0"
                          style={{ color: "hsl(var(--dusk-gold))", fontFamily: "var(--font-mono)" }}
                        >
                          {n}
                        </span>
                        <p className="text-[0.95rem] leading-[1.6]" style={{ color: "hsl(var(--dusk-ivory) / 0.78)" }}>
                          <strong className="dusk-ivory font-semibold">{head}</strong> — {tail}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* ── WHAT TIME IS IT (interactive) ─────────────────────────── */}
          <section
            id="whattime"
            className="relative py-20 lg:py-24 border-t border-b"
            style={{ borderColor: "hsl(var(--dusk-ivory) / 0.08)", background: "hsl(var(--dusk-black) / 0.5)" }}
            aria-label="What time is it in your life"
          >
            <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
              <ScrollReveal>
                <div className="text-center max-w-[720px] mx-auto mb-11">
                  <p className="dusk-eyebrow mb-4">The Hook</p>
                  <h2 className="dusk-serif text-[clamp(2rem,5vw,3.4rem)] dusk-ivory leading-[1.08]">
                    What time is it in <em className="italic dusk-gold">your</em> life?
                  </h2>
                  <p className="text-[1rem] leading-[1.7] mt-5 max-w-[560px] mx-auto" style={{ color: "hsl(var(--dusk-ivory) / 0.68)" }}>
                    Not the calendar's time — yours. Pick the phase you feel you're in and
                    read what it's asking of you.
                  </p>
                </div>
              </ScrollReveal>

              <div className="flex flex-wrap justify-center gap-2.5 mb-10">
                {PHASES.map((p, i) => {
                  const on = i === selected;
                  return (
                    <button
                      key={p.key}
                      type="button"
                      onClick={() => setSelected(i)}
                      title={p.name}
                      aria-label={p.name}
                      aria-pressed={on}
                      className="flex flex-col items-center gap-2 w-[88px] py-3.5 px-1.5 rounded-[14px] cursor-pointer transition-all duration-300"
                      style={{
                        color: on ? p.color : "hsl(var(--dusk-ivory) / 0.85)",
                        border: `1px solid ${on ? p.color : "hsl(var(--dusk-ivory) / 0.1)"}`,
                        background: on ? `color-mix(in srgb, ${p.color} 13%, transparent)` : "hsl(var(--dusk-ivory) / 0.02)",
                        boxShadow: on ? `0 0 26px -8px ${p.color}` : "none",
                      }}
                    >
                      <MoonPhaseGlyph phase={p.key} size={30} />
                      <span
                        className="text-[0.6rem] tracking-[0.1em] uppercase leading-tight text-center"
                        style={{ color: on ? p.color : "hsl(var(--dusk-ivory) / 0.55)", fontFamily: "var(--font-ui)" }}
                      >
                        {p.short}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="max-w-[820px] mx-auto">
                <div
                  className="relative rounded-[1.25rem] p-7 lg:p-9 overflow-hidden"
                  style={{
                    background: "hsl(var(--dusk-ivory) / 0.028)",
                    border: "1px solid hsl(var(--dusk-ivory) / 0.09)",
                    borderLeft: `2px solid ${cur.color}`,
                  }}
                >
                  <div className="flex items-center gap-3 flex-wrap mb-5">
                    <span
                      className="text-[0.72rem] tracking-[0.22em]"
                      style={{ color: cur.color, fontFamily: "var(--font-mono)" }}
                    >
                      PHASE {String(selected + 1).padStart(2, "0")}
                    </span>
                    <span className="w-1 h-1 rounded-full" style={{ background: "hsl(var(--dusk-ivory) / 0.4)" }} />
                    <h3 className="dusk-serif text-[clamp(1.6rem,3vw,2.1rem)] dusk-ivory m-0">{cur.name}</h3>
                  </div>
                  <p
                    className="dusk-serif italic text-[clamp(1.35rem,2.6vw,1.75rem)] leading-[1.35] mb-4 max-w-[640px]"
                    style={{ color: cur.color }}
                  >
                    &ldquo;{cur.when}&rdquo;
                  </p>
                  <p className="text-[1.02rem] leading-[1.7] max-w-[640px]" style={{ color: "hsl(var(--dusk-ivory) / 0.74)" }}>
                    {cur.act}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── THE WORK (pillars) ────────────────────────────────────── */}
          <section className="relative py-20 lg:py-24" aria-label="What Moontuner does">
            <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
              <ScrollReveal>
                <div className="max-w-[640px] mb-12">
                  <p className="dusk-eyebrow mb-5">
                    <span className="inline-block w-6 h-px align-middle mr-3 bg-[hsl(var(--dusk-gold))]" />
                    The Work
                  </p>
                  <h2 className="dusk-serif text-[clamp(1.9rem,4vw,3rem)] dusk-ivory leading-[1.1] mb-5">
                    Get intuitive. Get grounded. <em className="italic dusk-gold">Hear the signal.</em>
                  </h2>
                  <p className="text-[1rem] leading-[1.72] max-w-[540px]" style={{ color: "hsl(var(--dusk-ivory) / 0.68)" }}>
                    We don't predict your fate. We help you read the frequency you're
                    carrying now — and tune it toward the one your life is asking for. You
                    have a right to harmonize.
                  </p>
                </div>
              </ScrollReveal>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  ["01", "Hear the signal", "Live lunar status turns the sky into data — phase, sign, void-of-course, and the resonance you're carrying right now."],
                  ["02", "Get grounded", "The 14-day Phasecraft arc — guided reflection that moves with the cycle instead of fighting it."],
                  ["03", "Tune the frequency", "The Lunar Cipher — a 2026 ephemeris with phase timing you can actually plan your life around."],
                ].map(([n, head, body], idx) => (
                  <ScrollReveal key={n} delay={idx * 0.08}>
                    <div className="dusk-surface p-6 h-full">
                      <span className="text-[0.72rem] tracking-[0.2em]" style={{ color: "hsl(var(--dusk-gold))", fontFamily: "var(--font-mono)" }}>
                        {n}
                      </span>
                      <h3 className="dusk-serif text-[1.4rem] dusk-ivory mt-4 mb-2.5">{head}</h3>
                      <p className="text-[0.9rem] leading-[1.65]" style={{ color: "hsl(var(--dusk-ivory) / 0.62)" }}>
                        {body}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── THE SYSTEM ────────────────────────────────────────────── */}
          <section
            className="relative py-20 lg:py-24 border-t"
            style={{ borderColor: "hsl(var(--dusk-ivory) / 0.08)" }}
            aria-label="The framework"
          >
            <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
              <ScrollReveal>
                <div className="text-center max-w-[680px] mx-auto mb-11">
                  <p className="dusk-eyebrow mb-4">The Framework</p>
                  <h2 className="dusk-serif text-[clamp(1.9rem,4vw,3rem)] dusk-ivory leading-[1.1]">
                    Eight phases. Twelve signs.{" "}
                    <em className="italic dusk-gold">Ninety-six configurations.</em>
                  </h2>
                  <p className="text-[1rem] leading-[1.7] mt-5 max-w-[520px] mx-auto" style={{ color: "hsl(var(--dusk-ivory) / 0.68)" }}>
                    Every point on the spiral has a name. The Moon's phase sets the tempo;
                    the sign sets the key. Learn to read yours.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.08}>
                <div className="dusk-surface p-6 lg:p-8">
                  <p className="dusk-eyebrow text-center mb-6">The Eight Phases</p>
                  <div className="flex flex-wrap justify-center gap-x-6 gap-y-5">
                    {PHASES.map((p) => (
                      <div key={p.key} className="flex flex-col items-center gap-2 w-[76px]">
                        <span style={{ color: "hsl(var(--dusk-ivory) / 0.85)" }}>
                          <MoonPhaseGlyph phase={p.key} size={28} />
                        </span>
                        <span className="text-[0.58rem] tracking-[0.08em] uppercase text-center leading-tight" style={{ color: "hsl(var(--dusk-ivory) / 0.5)", fontFamily: "var(--font-ui)" }}>
                          {p.short}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-3 gap-3 mt-6">
                {[["8", "Lunar phases"], ["12", "Zodiac signs"], ["96", "Configurations"]].map(([v, l], i) => (
                  <ScrollReveal key={l} delay={i * 0.08}>
                    <div className="dusk-surface p-6 text-center">
                      <div className="dusk-serif text-[clamp(2rem,5vw,3rem)]" style={{ color: i === 2 ? "hsl(var(--dusk-gold))" : "hsl(var(--dusk-ivory))", fontWeight: 200 }}>
                        {v}
                      </div>
                      <div className="dusk-eyebrow mt-2">{l}</div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── MANIFESTO ─────────────────────────────────────────────── */}
          <section className="relative py-20 lg:py-24" aria-label="Manifesto">
            <div className="mx-auto max-w-[900px] px-6 lg:px-12 text-center">
              <ScrollReveal>
                <p className="dusk-eyebrow mb-6" style={{ color: "hsl(var(--dusk-gold))" }}>
                  Astrology with agency
                </p>
                <blockquote className="dusk-serif italic text-[clamp(1.8rem,3.8vw,2.9rem)] leading-[1.28] dusk-ivory m-0">
                  We don't tell you what the stars will do. We help you tune yourself to the
                  frequency of the life you're reaching for.
                </blockquote>
                <p className="mt-8 text-[0.8rem] tracking-[0.16em] uppercase dusk-silver">
                  Less woo, more you.
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* ── EMAIL CAPTURE ─────────────────────────────────────────── */}
          <section className="relative py-16 lg:py-20 border-t" style={{ borderColor: "hsl(var(--dusk-ivory) / 0.08)" }} aria-label="Email subscription">
            <div className="mx-auto max-w-[760px] px-6 lg:px-12">
              <LunarCapture
                source="spiral-landing"
                heading="Print your position in time."
                subheading="Start with the free lunar guide — an introduction to reading your own timing. No fate. No filler. Just your signal."
                items={[
                  "Current-phase guidance, no fatalism",
                  "The 14-day Phasecraft arc",
                  "Early access to new tools",
                ]}
              />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default SpiralLanding;
