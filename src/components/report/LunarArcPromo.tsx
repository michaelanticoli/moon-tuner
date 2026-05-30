// Native Lunar Arc promo — fully built in code, no heavy promo art.
// Architectural typography + thin rules + small glyphs. Sits cleanly
// above the input form and conveys value without crowding the page.
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MoonPhaseGlyph } from "@/components/MoonPhaseGlyph";
import { Compass, CalendarRange, Sparkles, Music2, Sun, ArrowUpRight } from "lucide-react";

const PILLARS = [
  {
    eyebrow: "Precision",
    title: "Twelve Power Days",
    body: "One peak window per month, computed from your natal lunar velocity — not generic transits.",
  },
  {
    eyebrow: "Architecture",
    title: "A 12-Month Blueprint",
    body: "Your year mapped as an arc, not a list. Replace the indifferent calendar with your own rhythm.",
  },
  {
    eyebrow: "Resonance",
    title: "Bloom At Your Flower Moon",
    body: "Locate the singular window where your natal signature flowers into full expression.",
  },
  {
    eyebrow: "Depth",
    title: "Beyond Surface Spirituality",
    body: "An operating system for high-output minds. Negentropy where entropy used to live.",
  },
];

const PHASES = [
  "new", "waxing-crescent", "first-quarter", "waxing-gibbous",
  "full", "waning-gibbous", "last-quarter", "waning-crescent",
] as const;

const ECOSYSTEM = [
  {
    to: "/quantumelodic",
    icon: <Music2 className="w-3.5 h-3.5" />,
    tag: "Astro-Harmonic",
    title: "Hear Your Chart",
    desc: "Generative natal symphony — same birth data, different lens.",
  },
  {
    to: "/cazimi",
    icon: <Sun className="w-3.5 h-3.5" />,
    tag: "Cazimi Punchcard",
    title: "Solar Renewal Windows",
    desc: "Exact dates the Sun ignites every natal placement this year.",
  },
  {
    to: "/lunar-cipher",
    icon: <CalendarRange className="w-3.5 h-3.5" />,
    tag: "Cipher",
    title: "Daily Lunar Intelligence",
    desc: "2026 ephemeris, VOC windows, phase timing — at a glance.",
  },
];

export function LunarArcPromo() {
  return (
    <section className="mb-20 border-b border-border/40 pb-16">
      {/* HERO STATEMENT */}
      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-16 items-end mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-accent mb-6 block">
            Your Lunar Arc · Beyond Linear Time
          </span>
          <h2 className="font-display text-[clamp(2.25rem,5.2vw,4.75rem)] font-extralight leading-[0.95] tracking-tight text-foreground mb-6">
            A precision operating system<br />
            <span className="font-serif italic text-gradient-silver">for the year you were born into.</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
            Stop forcing creative output against an indifferent calendar. Tune your year to
            the arc your natal Moon already traces.
          </p>
        </motion.div>

        {/* Right: minimal phase compass — pure SVG/glyph composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative aspect-square max-w-[360px] ml-auto w-full"
          aria-hidden="true"
        >
          <div className="absolute inset-0 rounded-full border border-border/40" />
          <div className="absolute inset-6 rounded-full border border-border/30" />
          <div className="absolute inset-12 rounded-full border border-accent/20" />
          {PHASES.map((p, i) => {
            const angle = (i / PHASES.length) * 2 * Math.PI - Math.PI / 2;
            const r = 44;
            const x = 50 + Math.cos(angle) * r;
            const y = 50 + Math.sin(angle) * r;
            return (
              <div
                key={p}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <MoonPhaseGlyph phase={p} size={28} className="text-accent/70" />
              </div>
            );
          })}
          <div className="absolute inset-0 flex items-center justify-center">
            <Compass className="w-7 h-7 text-accent/60" />
          </div>
        </motion.div>
      </div>

      {/* FOUR PILLARS — typographic, no images */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/40 border border-border/40 rounded-2xl overflow-hidden mb-16">
        {PILLARS.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="bg-background p-7 hover:bg-card/60 transition-colors duration-500 group"
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-3 h-3 text-accent opacity-60 group-hover:opacity-100 transition-opacity" />
              <span className="text-[9px] uppercase tracking-[0.4em] text-accent font-bold">
                {p.eyebrow}
              </span>
            </div>
            <h3 className="font-serif italic text-xl text-foreground leading-tight mb-3">
              {p.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{p.body}</p>
            <div className="mt-6 text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60">
              0{i + 1} / 04
            </div>
          </motion.div>
        ))}
      </div>

      {/* ECOSYSTEM STRIP — surfaces sister tools without being loud */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-baseline justify-between mb-6">
          <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
            The Metasystem · Same Chart, Three Lenses
          </p>
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60 hidden sm:block">
            Birth data carries forward
          </span>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {ECOSYSTEM.map((e) => (
            <Link
              key={e.to}
              to={e.to}
              className="group relative border border-border/40 rounded-lg p-5 hover:border-accent/60 hover:bg-accent/[0.02] transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 text-accent">
                  {e.icon}
                  <span className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground">
                    {e.tag}
                  </span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
              <h4 className="text-base font-light text-foreground mb-1">{e.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{e.desc}</p>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
