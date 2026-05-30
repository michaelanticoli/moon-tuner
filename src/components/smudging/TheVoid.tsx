import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TheVoidProps {
  onComplete: () => void;
}

type VoidPhase = "resting" | "releasing" | "dissolving" | "settled";

function buildParticles(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const a = (i * 137.508 * Math.PI) / 180; // golden angle
    const r = 40 + (((i * 61.8) % 1) * 1 + ((i * 97.3) % 1)) * 120;
    return {
      id: i,
      x: Math.cos(a) * r,
      y: Math.sin(a) * r,
      size: 1.5 + ((i * 37.1) % 1) * 2.5,
      duration: 8 + ((i * 53.7) % 1) * 10,
      delay: ((i * 29.4) % 1) * 5,
      driftX: (((i * 71.2) % 1) - 0.5) * 30,
      driftY: -20 - ((i * 43.1) % 1) * 40,
      opacity: 0.12 + ((i * 67.9) % 1) * 0.18,
    };
  });
}

export function TheVoid({ onComplete }: TheVoidProps) {
  const [phase, setPhase] = useState<VoidPhase>("resting");
  const particles = useMemo(() => buildParticles(48), []);

  const handleRelease = () => {
    if (phase !== "resting") return;
    setPhase("releasing");
  };

  useEffect(() => {
    if (phase === "releasing") {
      const t1 = setTimeout(() => setPhase("dissolving"), 1800);
      return () => clearTimeout(t1);
    }
    if (phase === "dissolving") {
      const t2 = setTimeout(() => setPhase("settled"), 2400);
      return () => clearTimeout(t2);
    }
  }, [phase]);

  const isActive = phase === "releasing" || phase === "dissolving";

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: phase === "settled" ? "hsl(22 12% 7%)" : "hsl(22 12% 5%)",
        transition: "background 3s ease",
      }}
    >
      {/* Deep void gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: phase === "releasing" ? 1 : phase === "dissolving" ? 0.4 : 0,
        }}
        transition={{ duration: 1.5 }}
        style={{
          background: "radial-gradient(ellipse 80% 80% at 50% 50%, hsl(25 65% 55% / 0.12) 0%, transparent 70%)",
        }}
      />

      {/* Flash on release */}
      <AnimatePresence>
        {phase === "releasing" && (
          <motion.div
            key="flash"
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.08, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, times: [0, 0.3, 1] }}
            style={{ background: "hsl(38 25% 88%)" }}
          />
        )}
      </AnimatePresence>

      {/* Ambient particles — drift state */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: "50%",
            top: "50%",
            width: p.size,
            height: p.size,
            background: "hsl(25 65% 55%)",
            x: p.x,
            y: p.y,
          }}
          animate={
            phase === "resting"
              ? {
                  opacity: [p.opacity, p.opacity * 1.5, p.opacity],
                  y: [p.y, p.y + p.driftY * 0.3, p.y],
                }
              : phase === "releasing"
              ? {
                  x: [p.x, 0],
                  y: [p.y, 0],
                  opacity: [p.opacity, p.opacity * 2.5],
                  scale: [1, 1.4],
                }
              : phase === "dissolving"
              ? {
                  x: [0, p.x * 2.5 + p.driftX],
                  y: [0, p.y * 2.5 + p.driftY],
                  opacity: [p.opacity * 2.5, 0],
                  scale: [1.4, 0.4],
                }
              : {
                  opacity: 0,
                }
          }
          transition={
            phase === "resting"
              ? {
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : phase === "releasing"
              ? {
                  duration: 1.2,
                  ease: [0.2, 0.8, 0.2, 1] as const,
                  delay: p.id * 0.008,
                }
              : phase === "dissolving"
              ? {
                  duration: 2,
                  ease: [0.4, 0, 0.8, 1] as const,
                  delay: p.id * 0.01,
                }
              : {
                  duration: 0.5,
                }
          }
        />
      ))}

      {/* Central orb */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          className="relative mb-16 flex items-center justify-center"
          animate={
            phase === "releasing"
              ? { scale: [1, 1.6, 0.8] }
              : phase === "dissolving"
              ? { scale: [0.8, 0.3], opacity: [1, 0] }
              : phase === "settled"
              ? { scale: 0.3, opacity: 0 }
              : { scale: 1, opacity: 1 }
          }
          transition={
            phase === "releasing"
              ? { duration: 1.5, ease: [0.2, 0.8, 0.2, 1] as const }
              : phase === "dissolving"
              ? { duration: 2, ease: [0.4, 0, 0.8, 1] as const }
              : { duration: 0 }
          }
        >
          {/* outer glow ring */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 200,
              height: 200,
              background:
                "radial-gradient(circle, hsl(25 65% 55% / 0.15) 0%, transparent 70%)",
            }}
            animate={
              phase === "resting"
                ? {
                    opacity: [0.6, 1, 0.6],
                    scale: [0.96, 1.04, 0.96],
                  }
                : { opacity: 1, scale: 1 }
            }
            transition={
              phase === "resting"
                ? { duration: 6, repeat: Infinity, ease: "easeInOut" }
                : {}
            }
          />

          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            aria-hidden="true"
          >
            {/* concentric rings */}
            <motion.circle
              cx="60"
              cy="60"
              r="54"
              stroke="hsl(25 65% 55%)"
              strokeWidth="0.5"
              strokeOpacity="0.2"
              animate={
                phase === "resting"
                  ? { rotate: 360 }
                  : phase === "releasing"
                  ? { r: [54, 80], opacity: [0.2, 0] }
                  : {}
              }
              transition={
                phase === "resting"
                  ? { duration: 180, repeat: Infinity, ease: "linear" }
                  : { duration: 1.2 }
              }
              style={{ transformOrigin: "60px 60px" }}
            />
            <motion.circle
              cx="60"
              cy="60"
              r="38"
              stroke="hsl(38 25% 88%)"
              strokeWidth="0.5"
              strokeOpacity="0.15"
              strokeDasharray="3 5"
              animate={
                phase === "resting"
                  ? { rotate: -360 }
                  : phase === "releasing"
                  ? { r: [38, 60], opacity: [0.15, 0] }
                  : {}
              }
              transition={
                phase === "resting"
                  ? { duration: 120, repeat: Infinity, ease: "linear" }
                  : { duration: 1.0, delay: 0.1 }
              }
              style={{ transformOrigin: "60px 60px" }}
            />

            {/* inner glowing core */}
            <motion.circle
              cx="60"
              cy="60"
              r="16"
              fill="hsl(25 65% 55% / 0.15)"
              stroke="hsl(25 65% 55%)"
              strokeWidth="1"
              strokeOpacity="0.5"
              animate={
                phase === "resting"
                  ? {
                      opacity: [0.7, 1, 0.7],
                      r: [16, 18, 16],
                    }
                  : phase === "releasing"
                  ? { r: [16, 42], opacity: [0.7, 0], fill: "hsl(38 25% 88% / 0.3)" }
                  : {}
              }
              transition={
                phase === "resting"
                  ? { duration: 5, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 1.4, ease: [0.2, 0.8, 0.2, 1] as const }
              }
            />

            {/* center point */}
            <motion.circle
              cx="60"
              cy="60"
              r="2.5"
              fill="hsl(25 65% 55%)"
              animate={
                phase === "resting"
                  ? { opacity: [0.9, 0.4, 0.9] }
                  : { opacity: 0 }
              }
              transition={
                phase === "resting"
                  ? { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.8 }
              }
            />
          </svg>
        </motion.div>

        {/* Text layer */}
        <AnimatePresence mode="wait">
          {phase === "resting" && (
            <motion.div
              key="resting-text"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] as const }}
              className="text-center flex flex-col items-center gap-6 max-w-sm px-6"
            >
              <p
                className="text-xs uppercase tracking-eyebrow"
                style={{ color: "hsl(25 65% 55%)", letterSpacing: "0.32em" }}
              >
                Chamber III — The Void
              </p>
              <h2
                className="text-4xl md:text-5xl font-light leading-tighter"
                style={{
                  fontFamily: "var(--font-editorial, 'Playfair Display', serif)",
                  color: "hsl(38 25% 88%)",
                  letterSpacing: "-0.02em",
                }}
              >
                Let it go
              </h2>
              <p
                className="text-sm leading-readable"
                style={{ color: "hsl(22 8% 38%)" }}
              >
                When you are ready, release everything
                <br />
                into the open dark.
              </p>
              <button
                onClick={handleRelease}
                className="mt-2 px-10 py-3.5 rounded-full text-sm transition-all duration-700 cursor-pointer"
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
                Release
              </button>
            </motion.div>
          )}

          {(phase === "releasing" || phase === "dissolving") && (
            <motion.div
              key="releasing-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="text-center max-w-sm px-6"
            >
              <motion.p
                animate={{ opacity: [0, 0.7, 0.3] }}
                transition={{ duration: 3, ease: "easeInOut" }}
                className="text-base italic"
                style={{
                  color: "hsl(38 25% 88%)",
                  fontFamily: "var(--font-editorial, 'Playfair Display', serif)",
                }}
              >
                Releasing…
              </motion.p>
            </motion.div>
          )}

          {phase === "settled" && (
            <motion.div
              key="settled-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 0.8, ease: [0.2, 0.8, 0.2, 1] as const }}
              className="text-center flex flex-col items-center gap-8 max-w-sm px-6"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 0.6 }}
                className="text-lg italic"
                style={{
                  color: "hsl(38 25% 70%)",
                  fontFamily: "var(--font-editorial, 'Playfair Display', serif)",
                }}
              >
                It is done.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1.4 }}
                className="text-sm leading-readable"
                style={{ color: "hsl(22 8% 38%)" }}
              >
                Space has returned.
                <br />
                Notice the quiet.
              </motion.p>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 2.8 }}
                onClick={onComplete}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-3.5 rounded-full text-sm transition-all duration-700 cursor-pointer"
                style={{
                  background: "transparent",
                  border: "1px solid hsl(140 20% 55% / 0.4)",
                  color: "hsl(38 25% 88%)",
                  fontFamily: "var(--font-ui, 'Work Sans', sans-serif)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                }}
              >
                Set Your Wards
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanding rings on release */}
        <AnimatePresence>
          {isActive && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`ring-${i}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{ border: "1px solid hsl(25 65% 55%)" }}
                  initial={{ width: 120, height: 120, opacity: 0.5 }}
                  animate={{ width: 480, height: 480, opacity: 0 }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.35,
                    ease: [0.2, 0.8, 0.2, 1] as const,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
