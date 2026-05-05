// Lunar Arc promotional block — visual marketing strategy in service of
// conveying tangible value before users fill the birth-data form.
// Uses uploaded promo art directly for now; will be recreated as native
// SVG/components in a later pass.
import { motion } from "framer-motion";
import beyondLinearTime from "@/assets/promo-beyond-linear-time.png";
import mapPeakWindows from "@/assets/promo-map-peak-windows.png";
import twelveMonthArchitecture from "@/assets/promo-lunar-arc-architecture.png";
import beyondSurface from "@/assets/promo-beyond-surface-spirituality.png";
import cognitiveGeometry from "@/assets/promo-cognitive-geometry.png";

const tiles = [
  {
    src: mapPeakWindows,
    eyebrow: "Precision",
    title: "Map Your Peak Windows",
    body: "Identify 100% resonance days based on natal lunar velocity and astronomical data.",
  },
  {
    src: twelveMonthArchitecture,
    eyebrow: "Architecture",
    title: "The 12-Month Blueprint",
    body: "Download your personalized resonance blueprint and replace generic planning forever.",
  },
  {
    src: cognitiveGeometry,
    eyebrow: "Alignment",
    title: "Align Your Cognitive Geometry",
    body: "Phase your thoughts and feelings to match the rising frequency of the lunar spring.",
  },
  {
    src: beyondSurface,
    eyebrow: "Depth",
    title: "Beyond Surface Spirituality",
    body: "Replace entropy with negentropy. A precise operating system for the modern mind.",
  },
];

export function LunarArcPromo() {
  return (
    <section className="mb-24 border-b border-border/40 pb-20">
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-accent mb-6 block">
            Your Lunar Arc · Beyond Linear Time
          </span>
          <h2 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-extralight leading-[0.95] tracking-tight text-foreground mb-6">
            A precision-based<br />
            <span className="font-serif italic">operating system</span><br />
            for high-output professionals.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
            Stop forcing creative output against an indifferent calendar. Tune your year to the
            arc you were actually born into.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <img
            src={beyondLinearTime}
            alt="Your Lunar Arc — Beyond Linear Time"
            className="w-full h-auto rounded-3xl border border-border/50 shadow-2xl shadow-accent/10"
            loading="lazy"
          />
        </motion.div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {tiles.map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/40 hover:border-accent/40 transition-all duration-500"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={t.src}
                alt={t.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                loading="lazy"
              />
            </div>
            <div className="p-5">
              <span className="text-[8px] uppercase tracking-[0.4em] text-accent font-bold block mb-2">
                {t.eyebrow}
              </span>
              <h3 className="font-serif text-base text-foreground leading-tight mb-2">
                {t.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{t.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
