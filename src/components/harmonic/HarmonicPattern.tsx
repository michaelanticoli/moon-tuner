/**
 * HarmonicPattern — Step 3
 *
 * Pattern identification interstitial.
 * Reveals detected behavioral patterns with a staggered cinematic entrance.
 * Creates a sense of genuine analysis — not loading theater.
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HarmonicPatternProps {
  patterns: string[];
  onContinue: () => void;
}

export function HarmonicPattern({ patterns, onContinue }: HarmonicPatternProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    // Stagger the pattern reveals with deliberate timing
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setVisibleCount(count);
      if (count >= patterns.length) {
        clearInterval(interval);
        setTimeout(() => setShowContinue(true), 900);
      }
    }, 680);
    return () => clearInterval(interval);
  }, [patterns.length]);

  return (
    <motion.div
      key="pattern"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 lg:px-12"
    >
      {/* Atmospheric gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 50%, hsl(var(--dusk-gold) / 0.05) 0%, transparent 70%), " +
            "radial-gradient(40% 35% at 20% 80%, hsl(168 65% 52% / 0.03) 0%, transparent 60%)",
        }}
      />

      <div className="relative w-full max-w-[660px] mx-auto">
        {/* Eyebrow */}
        <motion.p
          className="dusk-eyebrow mb-12"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <span
            className="inline-block w-6 h-px align-middle mr-3"
            style={{ background: "hsl(var(--dusk-gold))" }}
          />
          Pattern Identification
        </motion.p>

        {/* Heading */}
        <motion.h2
          className="dusk-serif dusk-ivory mb-16"
          style={{ fontSize: "clamp(1.8rem, 3.8vw, 2.9rem)", lineHeight: 1.1 }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.0, ease: [0.2, 0.8, 0.2, 1] }}
        >
          Several patterns are emerging from your responses.
        </motion.h2>

        {/* Pattern list */}
        <div className="space-y-0 mb-16">
          {patterns.map((pattern, i) => (
            <AnimatePresence key={i}>
              {visibleCount > i && (
                <motion.div
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.75,
                    ease: [0.2, 0.8, 0.2, 1],
                  }}
                  className="flex items-start gap-5 py-5"
                  style={{
                    borderBottom:
                      i < patterns.length - 1
                        ? "1px solid hsl(var(--dusk-ivory) / 0.06)"
                        : "none",
                  }}
                >
                  {/* Index tick */}
                  <span
                    className="shrink-0 font-mono text-[0.62rem] tracking-[0.22em] mt-[3px]"
                    style={{ color: "hsl(var(--dusk-gold) / 0.55)" }}
                  >
                    0{i + 1}
                  </span>

                  {/* Pattern text */}
                  <p
                    className="text-[1rem] leading-[1.65]"
                    style={{
                      color: "hsl(var(--dusk-ivory) / 0.8)",
                      fontFamily: "var(--font-ui)",
                    }}
                  >
                    {pattern}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Continue CTA */}
        <AnimatePresence>
          {showContinue && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              className="flex flex-col gap-5"
            >
              <p
                className="text-[0.9375rem] leading-[1.65]"
                style={{ color: "hsl(var(--dusk-ivory) / 0.45)" }}
              >
                Your Harmonic Archetype has been identified.
              </p>
              <div>
                <button onClick={onContinue} className="dusk-btn dusk-btn-primary">
                  Reveal my archetype
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
