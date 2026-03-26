import { useMoonPhase } from "@/hooks/useMoonPhase";
import { Navigation } from "@/components/Navigation";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { Helmet } from "react-helmet-async";

const ALL_PHASES = [
  {
    num: "01",
    name: "New Moon",
    tag: "Void",
    desc: "Pure potential. The cycle resets. Intentions set here carry maximum momentum — clarity of desire shapes what grows.",
  },
  {
    num: "02",
    name: "Waxing Crescent",
    tag: "Spark",
    desc: "The first sliver appears. Curiosity, learning, and gathering signal the mind activating. Follow what pulls you.",
  },
  {
    num: "03",
    name: "First Quarter",
    tag: "Fire",
    desc: "Half-lit, half-dark. The tension between decision and inertia. This is where commitment is tested — and forged.",
  },
  {
    num: "04",
    name: "Waxing Gibbous",
    tag: "Air",
    desc: "Almost full. Refinement, adjustment, fine-tuning. The work is mostly done — now it's about precision.",
  },
  {
    num: "05",
    name: "Full Moon",
    tag: "Light",
    desc: "Maximum illumination. What was hidden surfaces. Emotion, revelation, and harvest. Release what no longer serves.",
  },
  {
    num: "06",
    name: "Waning Gibbous",
    tag: "Water",
    desc: "Wisdom flows outward. The natural impulse is to teach, share, and distribute what the full moon revealed.",
  },
  {
    num: "07",
    name: "Last Quarter",
    tag: "Earth",
    desc: "A second turning point — now toward release. What systems, habits, or stories need to be resolved and composted?",
  },
  {
    num: "08",
    name: "Waning Crescent",
    tag: "Ether",
    desc: "The dark edge of the cycle. Rest, restore, and surrender. The body knows how to renew — let it.",
  },
];

const PHASE_GUIDANCE: Record<string, { body: string; focus: string[] }> = {
  "New Moon": {
    body: "The slate is cleared. This is the most powerful moment in the cycle for setting direction — not by force, but by clarity. What would you plant in fertile ground, knowing it will grow? The mind is naturally introspective now. Honor that.",
    focus: [
      "Write a single, clear intention — one direction, not a list",
      "Avoid major decisions that require external input",
      "Create space: clear a physical surface, a schedule, a relationship",
      "Rest earlier than usual — the body is completing its reset",
    ],
  },
  "Waxing Crescent": {
    body: "Curiosity is your compass today. The energy of this phase favors gathering information, exploring new angles, and staying light on your feet. Don't push toward conclusions — let your instincts lead you toward what wants to be learned.",
    focus: [
      "Start something small and low-stakes — build momentum gently",
      "Research, read, and absorb without pressure to act",
      "Revisit the intention you set at the New Moon",
      "Notice what excites you without demanding a reason",
    ],
  },
  "First Quarter": {
    body: "There's a productive friction available right now. Something is asking for a decision — and the discomfort you might feel is not a warning, it's the energy of breakthrough. Act from what you know, not from what you wish were different.",
    focus: [
      "Make the decision you've been delaying",
      "Address the obstacle directly instead of navigating around it",
      "Physical movement helps discharge the tension of this phase",
      "Commit to one direction, then let momentum carry it",
    ],
  },
  "Waxing Gibbous": {
    body: "You're close. The instinct to rush or abandon ship comes from impatience, not from reality. This is a phase of fine-tuning — small corrections yield significant results. Trust the work you've already put in.",
    focus: [
      "Review your progress without judgment — adjust, don't restart",
      "Ask: what would make this 10% better, not entirely different?",
      "Patience is the practice here; urgency is the distraction",
      "Prepare for what comes at the Full Moon",
    ],
  },
  "Full Moon": {
    body: "Everything is lit. What you've been building is visible — including what you've been ignoring. Emotion may run higher. That's data, not drama. This is the natural harvest point: receive, release, and recognize.",
    focus: [
      "Name what has come to fruition since the last New Moon",
      "Release one thing that has outgrown its usefulness",
      "Reduce stimulants — the nervous system is already amplified",
      "Sleep may be lighter; journal instead of forcing rest",
    ],
  },
  "Waning Gibbous": {
    body: "The impulse to teach and share is natural now — and generous. Wisdom that was gained through this cycle wants to move. Offer it. This phase rewards those who give what they've learned without attachment to outcomes.",
    focus: [
      "Share something you've figured out — write it, say it, teach it",
      "Show up for others in ways that feel easy, not depleting",
      "Begin organizing what the Full Moon revealed",
      "Gratitude practice has particular power in this window",
    ],
  },
  "Last Quarter": {
    body: "Another decision point — this time toward release rather than action. What you decide to let go of now determines the quality of your next beginning. This isn't about loss. It's about composting: making space for what's next.",
    focus: [
      "Identify one habit, belief, or commitment to consciously release",
      "Forgiveness work lands with unusual clarity here",
      "Clear clutter — physical, digital, relational",
      "Avoid initiating anything that requires sustained momentum",
    ],
  },
  "Waning Crescent": {
    body: "The cycle is completing. The wisest move is rest — not passivity, but the active surrender that allows renewal. Your system is processing. Dreams may be vivid. The threshold between cycles is extraordinarily thin right now.",
    focus: [
      "Prioritize sleep, solitude, and restoration above output",
      "Do not force new beginnings — let the cycle close fully",
      "Meditative and somatic practices are most effective here",
      "Prepare your intention for the New Moon — but don't rush it",
    ],
  },
};

function MoonSVG({
  illumination,
  isWaxing,
  size = 200,
}: {
  illumination: number;
  isWaxing: boolean;
  size?: number;
}) {
  const r = size / 2 - 8;
  const cx = size / 2;
  const cy = size / 2;
  const curveOffset = (1 - illumination * 2) * r;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="drop-shadow-2xl"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="mpg" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="hsl(40, 20%, 95%)" />
          <stop offset="100%" stopColor="hsl(40, 15%, 78%)" />
        </radialGradient>
        <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(42, 50%, 58%)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <filter id="mpGlow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer glow */}
      <circle cx={cx} cy={cy} r={r + 30} fill="url(#glowGrad)" />

      {/* Moon body */}
      <circle cx={cx} cy={cy} r={r} fill="url(#mpg)" filter="url(#mpGlow)" />

      {/* Shadow overlay */}
      {illumination < 0.99 && (
        <path
          d={`
            M ${cx} ${cy - r}
            A ${r} ${r} 0 1 ${isWaxing ? 1 : 0} ${cx} ${cy + r}
            A ${Math.abs(curveOffset)} ${r} 0 0 ${
            curveOffset > 0
              ? isWaxing
                ? 0
                : 1
              : isWaxing
              ? 1
              : 0
          } ${cx} ${cy - r}
            Z
          `}
          fill="hsl(220, 25%, 10%)"
          opacity="0.88"
        />
      )}

      {/* Craters */}
      <circle
        cx={cx * 0.72}
        cy={cy * 0.8}
        r={r * 0.11}
        fill="hsl(40,12%,82%)"
        opacity="0.38"
      />
      <circle
        cx={cx * 1.18}
        cy={cy * 1.1}
        r={r * 0.07}
        fill="hsl(40,12%,82%)"
        opacity="0.28"
      />
      <circle
        cx={cx * 0.9}
        cy={cy * 1.35}
        r={r * 0.09}
        fill="hsl(40,12%,82%)"
        opacity="0.22"
      />
    </svg>
  );
}

export default function MoonPhaseToday() {
  const moon = useMoonPhase();
  const today = new Date();
  const guidance =
    PHASE_GUIDANCE[moon.astronomical.phaseName] ||
    PHASE_GUIDANCE["New Moon"];
  const currentPhaseIndex = ALL_PHASES.findIndex(
    (p) => p.name === moon.astronomical.phaseName
  );

  const illuminationPct = Math.round(moon.astronomical.illumination * 100);
  const cycleDay = Math.round(moon.astronomical.age);

  const nextFull = moon.astronomical.nextFullMoon;
  const daysToFull = Math.ceil(
    (nextFull.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  const dateLabel = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <PageTransition>
      <Helmet>
        <title>Moon Phase Today — Live Lunar Phase Tracker | Moontuner</title>
        <meta
          name="description"
          content="What is the moon phase today? See the current moon phase live — phase name, illumination percentage, cycle day, and what today's lunar energy means for your focus and practice."
        />
        <link rel="canonical" href="https://moontuner.xyz/moon-phase-today" />
        <meta
          property="og:title"
          content="Moon Phase Today | Moontuner"
        />
        <meta
          property="og:description"
          content="Today's moon phase, live. See the current phase name, illumination percentage, and what it means for your energy and practice right now."
        />
        <meta
          property="og:url"
          content="https://moontuner.xyz/moon-phase-today"
        />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Moon Phase Today",
          description:
            "Live lunar phase tracker showing today's moon phase, illumination percentage, cycle day, and phase-based guidance.",
          url: "https://moontuner.xyz/moon-phase-today",
          publisher: {
            "@type": "Organization",
            name: "Moontuner",
            url: "https://moontuner.xyz",
          },
        })}</script>
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background text-foreground">
        {/* ── HERO ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden">
          {/* Radial glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[600px] rounded-full bg-accent/[0.03] blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Eyebrow */}
            <p className="system-label text-accent mb-6 opacity-0 animate-fade-in-up">
              Live · Updated Daily
            </p>

            {/* H1 */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-4 opacity-0 animate-fade-in-up delay-100">
              The Moon Phase{" "}
              <span className="italic font-normal text-[hsl(var(--gold))]">
                Today
              </span>
            </h1>
            <p className="text-muted-foreground text-sm font-light max-w-md mb-10 leading-relaxed opacity-0 animate-fade-in-up delay-200">
              The current lunar phase, live — updated every day. See where the
              moon sits in its 29.5-day cycle and what that means for your
              energy, focus, and practice right now.
            </p>

            {/* Moon graphic */}
            <div className="flex flex-col items-center mb-8 opacity-0 animate-fade-in-up delay-300">
              <MoonSVG
                illumination={moon.astronomical.illumination}
                isWaxing={moon.astronomical.isWaxing}
                size={200}
              />
              <p className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground/50 mt-3">
                {dateLabel}
              </p>
            </div>

            {/* Phase identity */}
            <div className="mb-8 opacity-0 animate-fade-in-up delay-300">
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-1">
                {moon.astronomical.phaseName}
              </h2>
              <p className="font-serif italic text-accent text-base">
                {moon.astrological.energy} · {moon.astrological.theme}
              </p>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-3 justify-center mb-8 opacity-0 animate-fade-in-up delay-[0.45s]">
              {[
                { val: `${illuminationPct}%`, label: "Illuminated" },
                { val: `Day ${cycleDay}`, label: "Of Cycle" },
                {
                  val: daysToFull <= 0 ? "Tonight" : `${daysToFull}d`,
                  label: "To Full Moon",
                },
                {
                  val: moon.astrological.frequencyHz + "Hz",
                  label: "Frequency",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-card border border-border/60 rounded-lg px-5 py-4 text-center min-w-[110px]"
                >
                  <div className="font-serif text-2xl font-semibold text-[hsl(var(--gold))] leading-none mb-1">
                    {s.val}
                  </div>
                  <div className="text-[10px] tracking-[0.14em] uppercase text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Keywords */}
            <div className="flex flex-wrap gap-2 justify-center opacity-0 animate-fade-in-up delay-500">
              {moon.astrological.quality.split(" · ").map((kw) => (
                <span
                  key={kw}
                  className="px-3 py-1 border border-accent/25 rounded-full text-[11px] tracking-[0.1em] uppercase text-accent bg-accent/5"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── PHASE GUIDANCE ── */}
        <section className="px-6 py-20">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <p className="system-label text-accent mb-3">Phase Intelligence</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-light">
                What Today's{" "}
                <em className="italic text-[hsl(var(--gold))]">
                  {moon.astronomical.phaseName}
                </em>{" "}
                Means
              </h2>
            </div>

            <div className="bg-card border border-border/60 rounded-xl p-8 relative overflow-hidden">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

              <p className="text-muted-foreground text-[0.97rem] leading-[1.85] mb-7">
                {guidance.body}
              </p>

              <p className="text-[11px] tracking-[0.18em] uppercase text-accent mb-4">
                Today's Focus
              </p>
              <ul className="space-y-0">
                {guidance.focus.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 items-start py-3 border-t border-border/40 text-muted-foreground text-[0.92rem]"
                  >
                    <span className="text-accent mt-0.5 flex-shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6">
          <hr className="border-border/40" />
        </div>

        {/* ── ALL EIGHT PHASES ── */}
        <section className="px-6 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="system-label text-accent mb-3">
                The Lunar Architecture
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-light mb-3">
                All Eight Phases of the Moon
              </h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
                The moon completes its cycle in 29.5 days. Each of the eight
                phases carries a distinct quality of attention — and a specific
                kind of energy to work with.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {ALL_PHASES.map((phase, i) => {
                const isToday = i === currentPhaseIndex;
                return (
                  <div
                    key={phase.name}
                    className={`rounded-xl p-5 border transition-all duration-300 ${
                      isToday
                        ? "border-accent/50 bg-gradient-to-br from-card to-accent/[0.04]"
                        : "border-border/50 bg-card hover:border-accent/20 hover:-translate-y-0.5"
                    }`}
                  >
                    {isToday && (
                      <p className="text-[10px] tracking-[0.22em] uppercase text-accent mb-2">
                        ◆ Today
                      </p>
                    )}
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50 mb-1">
                      Phase {phase.num}
                    </p>
                    <h3 className="font-serif text-base font-semibold mb-0.5">
                      {phase.name}
                    </h3>
                    <p className="font-serif italic text-accent text-xs mb-3">
                      {phase.tag}
                    </p>
                    <p className="text-muted-foreground text-[0.82rem] leading-relaxed">
                      {phase.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6">
          <hr className="border-border/40" />
        </div>

        {/* ── CTA ── */}
        <section className="px-6 py-20 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl font-light mb-4">
              The Moon Has a{" "}
              <em className="italic text-[hsl(var(--gold))]">System.</em>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              The Moontuner framework moves with the full 29.5-day cycle — not
              just the headlines. 26 workbooks, 4 arcs, every day accounted for.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/lunar-system" className="system-button">
                Explore the System
              </Link>
              <Link
                to="/lunar-cipher"
                className="border border-border/50 text-foreground hover:border-accent hover:text-accent transition-colors duration-300 font-sans text-xs tracking-[0.12em] uppercase font-medium px-6 py-3 rounded"
              >
                Daily Cipher
              </Link>
            </div>
          </div>
        </section>

        {/* ── FOOTER STRIP ── */}
        <footer className="border-t border-border/30 px-6 py-8 text-center">
          <p className="text-muted-foreground/40 text-xs tracking-widest">
            © {today.getFullYear()} Moontuner · moontuner.xyz
          </p>
        </footer>
      </main>
    </PageTransition>
  );
}
