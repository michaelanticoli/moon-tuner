import { motion } from "framer-motion";
import { useMemo } from "react";

interface SmudgingHeroProps {
  onBegin: () => void;
}

// Deterministic particle positions seeded by index
function buildParticles(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const seed = (i * 137.508) % 1; // golden-angle spread
    const seed2 = (i * 97.3) % 1;
    const seed3 = (i * 61.8) % 1;
    return {
      id: i,
      left: `${(seed * 90 + 5).toFixed(2)}%`,
      top: `${(seed2 * 80 + 10).toFixed(2)}%`,
      size: 2 + (seed3 * 3),
      duration: 12 + seed * 14,
      delay: seed2 * 8,
      opacity: 0.08 + seed3 * 0.12,
    };
  });
}

export function SmudgingHero({ onBegin }: SmudgingHeroProps) {
  const particles = useMemo(() => buildParticles(28), []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20">
      {/* Atmospheric gradient backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 55% 40% at 72% 28%, hsl(25 65% 55% / 0.09) 0%, transparent 65%)",
            "radial-gradient(ellipse 45% 55% at 24% 78%, hsl(140 20% 55% / 0.06) 0%, transparent 60%)",
            "radial-gradient(ellipse 100% 100% at 50% 50%, hsl(22 12% 10% / 0.5) 0%, transparent 100%)",
          ].join(", "),
        }}
      />

      {/* Floating ambient particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: "hsl(25 65% 55%)",
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [p.opacity, p.opacity * 1.6, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Central sigil */}
      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3.5, ease: [0.2, 0.8, 0.2, 1] as const }}
        className="relative mb-14 flex items-center justify-center"
      >
        {/* outer glow */}
        <div
          className="absolute rounded-full blur-3xl pointer-events-none"
          style={{
            width: 160,
            height: 160,
            background: "radial-gradient(circle, hsl(25 65% 55% / 0.18) 0%, transparent 70%)",
          }}
        />
        <svg
          width="128"
          height="128"
          viewBox="0 0 128 128"
          fill="none"
          aria-hidden="true"
          className="relative z-10"
        >
          {/* outermost ring — very faint */}
          <circle
            cx="64"
            cy="64"
            r="60"
            stroke="hsl(38 25% 88%)"
            strokeWidth="0.4"
            strokeOpacity="0.12"
          />
          {/* outer ring */}
          <motion.circle
            cx="64"
            cy="64"
            r="50"
            stroke="hsl(25 65% 55%)"
            strokeWidth="0.6"
            strokeOpacity="0.35"
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "64px 64px" }}
          />
          {/* inner ring */}
          <motion.circle
            cx="64"
            cy="64"
            r="34"
            stroke="hsl(38 25% 88%)"
            strokeWidth="0.5"
            strokeOpacity="0.2"
            strokeDasharray="4 6"
            animate={{ rotate: -360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "64px 64px" }}
          />
          {/* filled center circle */}
          <circle
            cx="64"
            cy="64"
            r="18"
            fill="hsl(25 65% 55% / 0.14)"
            stroke="hsl(25 65% 55%)"
            strokeWidth="0.8"
            strokeOpacity="0.5"
          />
          {/* cardinal tick marks */}
          {[0, 90, 180, 270].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                key={deg}
                x1={64 + 42 * Math.sin(rad)}
                y1={64 - 42 * Math.cos(rad)}
                x2={64 + 50 * Math.sin(rad)}
                y2={64 - 50 * Math.cos(rad)}
                stroke="hsl(25 65% 55%)"
                strokeWidth="1"
                strokeOpacity="0.45"
              />
            );
          })}
          {/* center point */}
          <motion.circle
            cx="64"
            cy="64"
            r="2.5"
            fill="hsl(25 65% 55%)"
            fillOpacity="0.8"
            animate={{ opacity: [0.8, 0.4, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      {/* Copy */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 1, ease: [0.2, 0.8, 0.2, 1] as const }}
        className="text-center max-w-xl px-6 relative z-10"
      >
        <p
          className="text-xs uppercase tracking-eyebrow mb-7"
          style={{ color: "hsl(25 65% 55%)", letterSpacing: "0.32em" }}
        >
          Digital Maintenance
        </p>

        <h1
          className="text-5xl md:text-7xl font-light leading-tighter mb-6"
          style={{
            fontFamily: "var(--font-editorial, 'Playfair Display', serif)",
            color: "hsl(38 25% 88%)",
            letterSpacing: "-0.025em",
          }}
        >
          Digital
          <br />
          <em>Smudging</em>
        </h1>

        <p
          className="text-base md:text-lg leading-readable mb-4"
          style={{ color: "hsl(22 8% 38%)" }}
        >
          Intentional release. Conscious clearing.
          <br />
          A practice of reclaiming what deserves your attention.
        </p>

        <p
          className="text-sm leading-readable mb-14"
          style={{ color: "hsl(22 8% 30%)" }}
        >
          Digital maintenance as conscious release.
        </p>

        <motion.button
          onClick={onBegin}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.4 }}
          whileHover={{ scale: 1.03, borderColor: "hsl(25 65% 55%)" }}
          whileTap={{ scale: 0.97 }}
          className="px-10 py-3.5 rounded-full text-sm transition-all duration-700 cursor-pointer"
          style={{
            background: "transparent",
            border: "1px solid hsl(25 65% 55% / 0.45)",
            color: "hsl(38 25% 88%)",
            fontFamily: "var(--font-ui, 'Work Sans', sans-serif)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontSize: "0.75rem",
          }}
        >
          Begin the Clearing
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 3.2 }}
          className="mt-7 text-xs tracking-widest"
          style={{ color: "hsl(22 8% 28%)" }}
        >
          5 chambers · ~10 minutes
        </motion.p>
      </motion.div>
    </section>
  );
}
