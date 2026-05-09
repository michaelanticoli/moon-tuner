import { useMemo } from "react";
import { motion } from "framer-motion";
import { useMoonPhase } from "@/hooks/useMoonPhase";

interface LunarSyncProps {
  items: string[];
  wards: string[];
  onRestart: () => void;
}

const LABEL_MAP: Record<string, string> = {
  notifications: "Notification overflow",
  feeds: "Mindless scrolling",
  subscriptions: "Forgotten subscriptions",
  inbox: "Inbox weight",
  tabs: "Phantom tabs",
  apps: "Dormant apps",
  comparison: "Comparison traps",
  reactivity: "Habitual checking",
  news: "Passive news loops",
  drafts: "Unfinished drafts",
};

const PHASE_RETURN_GUIDANCE: Record<string, string> = {
  "New Moon": "Return at the Full Moon — when the light is highest and patterns surface clearly.",
  "Waxing Crescent":
    "Return at the Full Moon — let what you've planted grow before clearing again.",
  "First Quarter":
    "Return after the Full Moon — once the tension has peaked and released.",
  "Waxing Gibbous": "Return at the Full Moon — the clearing will feel more complete at peak light.",
  "Full Moon":
    "This is an ideal moment. Return again at the next Full Moon or Dark Moon.",
  "Waning Gibbous": "Return at the Dark Moon — as the light fades, so does more of what remains.",
  "Last Quarter":
    "Return at the Dark Moon — you are already in the natural season of release.",
  "Waning Crescent":
    "You are in the dark moon. This clearing is deeply aligned. Return at the next Full Moon.",
};

// Minimal moon SVG based on illumination and waxing/waning
function MoonGlyph({
  illumination,
  isWaxing,
}: {
  illumination: number;
  isWaxing: boolean;
}) {
  const r = 24;
  const cx = 32;
  const cy = 32;

  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      {/* dark circle */}
      <circle cx={cx} cy={cy} r={r} fill="hsl(22 10% 14%)" stroke="hsl(22 12% 22%)" strokeWidth="1" />
      {/* lit arc using clipPath */}
      <defs>
        <clipPath id="moon-clip">
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
      </defs>
      {illumination > 0.01 && (
        <g clipPath="url(#moon-clip)">
          {/* lit half */}
          <ellipse
            cx={isWaxing ? cx + r * (1 - illumination * 2) : cx - r * (1 - illumination * 2)}
            cy={cy}
            rx={r}
            ry={r}
            fill="hsl(38 25% 80%)"
            fillOpacity="0.85"
          />
        </g>
      )}
      {illumination > 0.99 && (
        <circle cx={cx} cy={cy} r={r} fill="hsl(38 25% 85%)" fillOpacity="0.85" />
      )}
      {/* ring */}
      <circle cx={cx} cy={cy} r={r} stroke="hsl(38 25% 88%)" strokeWidth="0.5" strokeOpacity="0.25" />
    </svg>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.4 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.2, 0.8, 0.2, 1] } },
};

export function LunarSync({ items, wards, onRestart }: LunarSyncProps) {
  const moonData = useMoonPhase();
  const today = useMemo(() => new Date(), []);

  const phaseName = moonData.astronomical.phaseName;
  const illumination = moonData.astronomical.illumination;
  const isWaxing = moonData.astronomical.isWaxing;
  const moonSign = moonData.astronomical.moonSign;
  const returnGuidance =
    PHASE_RETURN_GUIDANCE[phaseName] ??
    "Return when you feel the weight of digital accumulation again.";

  const dateStr = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="min-h-screen flex flex-col items-center relative overflow-hidden pt-28 pb-24 px-6">
      {/* completion atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 50% 40% at 50% 15%, hsl(140 20% 55% / 0.07) 0%, transparent 60%)",
            "radial-gradient(ellipse 60% 50% at 25% 85%, hsl(25 65% 55% / 0.05) 0%, transparent 65%)",
          ].join(", "),
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center max-w-xl w-full gap-0"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <p
            className="text-xs uppercase tracking-eyebrow mb-5"
            style={{ color: "hsl(140 20% 55%)", letterSpacing: "0.32em" }}
          >
            Chamber V — Lunar Sync
          </p>
          <h2
            className="text-4xl md:text-5xl font-light mb-4 leading-tighter"
            style={{
              fontFamily: "var(--font-editorial, 'Playfair Display', serif)",
              color: "hsl(38 25% 88%)",
              letterSpacing: "-0.02em",
            }}
          >
            Clearing complete
          </h2>
          <p className="text-sm leading-readable" style={{ color: "hsl(22 8% 38%)" }}>
            {dateStr}
          </p>
        </motion.div>

        {/* Moon phase */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center mb-10"
        >
          <MoonGlyph illumination={illumination} isWaxing={isWaxing} />
          <p
            className="mt-3 text-sm font-light"
            style={{ color: "hsl(38 25% 75%)" }}
          >
            {phaseName}
          </p>
          <p className="text-xs mt-1" style={{ color: "hsl(22 8% 38%)" }}>
            Moon in {moonSign} · {Math.round(illumination * 100)}% illuminated
          </p>
        </motion.div>

        {/* Return guidance */}
        <motion.div
          variants={itemVariants}
          className="w-full rounded-lg p-5 mb-8 text-center"
          style={{
            background: "hsl(22 10% 11%)",
            border: "1px solid hsl(22 12% 16%)",
          }}
        >
          <p
            className="text-xs uppercase tracking-eyebrow mb-3"
            style={{ color: "hsl(22 8% 35%)", letterSpacing: "0.28em" }}
          >
            When to return
          </p>
          <p
            className="text-sm leading-readable italic"
            style={{
              color: "hsl(38 25% 65%)",
              fontFamily: "var(--font-editorial, 'Playfair Display', serif)",
            }}
          >
            {returnGuidance}
          </p>
        </motion.div>

        {/* Released items summary */}
        {items.length > 0 && (
          <motion.div variants={itemVariants} className="w-full mb-8">
            <p
              className="text-xs uppercase tracking-eyebrow mb-4 text-center"
              style={{ color: "hsl(22 8% 32%)", letterSpacing: "0.28em" }}
            >
              Released today
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {items.map((id) => (
                <span
                  key={id}
                  className="px-3 py-1 rounded-full text-xs"
                  style={{
                    background: "hsl(22 10% 11%)",
                    border: "1px solid hsl(22 12% 16%)",
                    color: "hsl(22 8% 35%)",
                    fontFamily: "var(--font-ui, 'Work Sans', sans-serif)",
                    textDecoration: "line-through",
                  }}
                >
                  {LABEL_MAP[id] ?? id}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Wards summary */}
        {wards.length > 0 && (
          <motion.div variants={itemVariants} className="w-full mb-10">
            <p
              className="text-xs uppercase tracking-eyebrow mb-4 text-center"
              style={{ color: "hsl(140 20% 45%)", letterSpacing: "0.28em" }}
            >
              Your wards
            </p>
            <div className="flex flex-col gap-2">
              {wards.map((ward, i) => (
                <p
                  key={i}
                  className="text-sm leading-relaxed italic text-center"
                  style={{
                    color: "hsl(38 25% 62%)",
                    fontFamily: "var(--font-editorial, 'Playfair Display', serif)",
                  }}
                >
                  "{ward}"
                </p>
              ))}
            </div>
          </motion.div>
        )}

        {/* Closing note */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <p
            className="text-sm leading-readable"
            style={{ color: "hsl(22 8% 32%)" }}
          >
            Digital maintenance is not a one-time event.
            <br />
            It is a returning practice.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-3 w-full"
        >
          <button
            onClick={onRestart}
            className="px-10 py-3.5 rounded-full text-sm transition-all duration-700 cursor-pointer"
            style={{
              background: "transparent",
              border: "1px solid hsl(22 12% 20%)",
              color: "hsl(22 8% 45%)",
              fontFamily: "var(--font-ui, 'Work Sans', sans-serif)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontSize: "0.75rem",
            }}
          >
            Begin again
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
