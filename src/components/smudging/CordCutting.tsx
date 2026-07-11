import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SMUDGING_PATTERN_BY_ID } from "./content";

interface CordCuttingProps {
  items: string[];
  onComplete: () => void;
}

export function CordCutting({ items, onComplete }: CordCuttingProps) {
  const [released, setReleased] = useState<Set<string>>(new Set());
  const [cutting, setCutting] = useState<string | null>(null);

  const handleRelease = async (id: string) => {
    if (released.has(id) || cutting === id) return;
    setCutting(id);
    // Small pause for the animation to settle
    await new Promise((r) => setTimeout(r, 800));
    setReleased((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    setCutting(null);
  };

  const allReleased = items.length > 0 && released.size === items.length;

  return (
    <section className="min-h-screen flex flex-col items-center relative overflow-hidden pt-28 pb-24 px-6">
      {/* ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 30% at 50% 0%, hsl(25 65% 55% / 0.06) 0%, transparent 60%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] as const }}
        className="text-center mb-14 max-w-xl"
      >
        <p
          className="text-xs uppercase tracking-eyebrow mb-5"
          style={{ color: "hsl(25 65% 55%)", letterSpacing: "0.32em" }}
        >
          Chamber III — Cord Cutting
        </p>
        <h2
          className="text-4xl md:text-5xl font-light mb-5 leading-tighter"
          style={{
            fontFamily: "var(--font-editorial, 'Playfair Display', serif)",
            color: "hsl(38 25% 88%)",
            letterSpacing: "-0.02em",
          }}
        >
          Release each one
        </h2>
        <p className="text-sm leading-readable" style={{ color: "hsl(22 8% 38%)" }}>
          Read the intention. When you are ready, touch it to let it go.
          <br />
          Move slowly. Each release is an act of care.
        </p>
      </motion.div>

      <div className="flex flex-col max-w-lg w-full gap-3 mb-14">
        <AnimatePresence>
          {items.map((id, index) => {
            const isReleased = released.has(id);
            const isCutting = cutting === id;
            const pattern = SMUDGING_PATTERN_BY_ID[id];
            const label = pattern?.label ?? id;
            const phrase = pattern?.releasePhrase ?? "I release this with intention.";

            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40, filter: "blur(4px)" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" as const }}
                layout
              >
                <motion.button
                  onClick={() => handleRelease(id)}
                  disabled={isReleased || isCutting}
                  className="w-full text-left p-5 rounded-lg transition-all duration-700 cursor-pointer disabled:cursor-default group"
                  style={{
                    background: isReleased
                      ? "hsl(22 10% 9%)"
                      : isCutting
                      ? "hsl(25 65% 55% / 0.08)"
                      : "hsl(22 10% 11%)",
                    border: `1px solid ${
                      isReleased
                        ? "hsl(22 12% 13%)"
                        : isCutting
                        ? "hsl(25 65% 55% / 0.6)"
                        : "hsl(22 12% 16%)"
                    }`,
                    opacity: isReleased ? 0.35 : 1,
                  }}
                  whileHover={!isReleased && !isCutting ? { scale: 1.005 } : {}}
                  whileTap={!isReleased && !isCutting ? { scale: 0.998 } : {}}
                  aria-label={`Release: ${label}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-medium mb-1.5"
                        style={{
                          fontFamily: "var(--font-ui, 'Work Sans', sans-serif)",
                          color: isReleased
                            ? "hsl(22 8% 30%)"
                            : "hsl(38 20% 75%)",
                          textDecoration: isReleased ? "line-through" : "none",
                        }}
                      >
                        {label}
                      </p>
                      <p
                        className="text-xs leading-relaxed italic"
                        style={{
                          color: isReleased ? "hsl(22 8% 25%)" : "hsl(22 8% 38%)",
                          fontFamily: "var(--font-editorial, 'Playfair Display', serif)",
                        }}
                      >
                        {phrase}
                      </p>
                    </div>
                    <div className="shrink-0 mt-1">
                      {isReleased ? (
                        <span style={{ color: "hsl(140 20% 45%)", fontSize: "1rem" }}>✓</span>
                      ) : isCutting ? (
                        <motion.span
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                          style={{ color: "hsl(25 65% 55%)", fontSize: "1rem" }}
                        >
                          ◎
                        </motion.span>
                      ) : (
                        <span
                          style={{
                            color: "hsl(22 8% 28%)",
                            fontSize: "0.75rem",
                            fontFamily: "var(--font-ui, 'Work Sans', sans-serif)",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          Release
                        </span>
                      )}
                    </div>
                  </div>
                </motion.button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Progress note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="flex flex-col items-center gap-4"
      >
        {released.size > 0 && !allReleased && (
          <p className="text-xs" style={{ color: "hsl(22 8% 35%)" }}>
            {released.size} of {items.length} released
          </p>
        )}

        {allReleased && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-sm italic"
            style={{
              color: "hsl(140 20% 55%)",
              fontFamily: "var(--font-editorial, 'Playfair Display', serif)",
            }}
          >
            All acknowledged. Space has opened.
          </motion.p>
        )}

        <motion.button
          onClick={onComplete}
          whileHover={allReleased ? { scale: 1.03 } : {}}
          whileTap={allReleased ? { scale: 0.97 } : {}}
          disabled={!allReleased}
          className="px-10 py-3.5 rounded-full text-sm transition-all duration-700 cursor-pointer disabled:cursor-default"
          style={{
            background: "transparent",
            border: `1px solid ${allReleased ? "hsl(25 65% 55% / 0.5)" : "hsl(22 12% 18%)"}`,
            color: allReleased ? "hsl(38 25% 88%)" : "hsl(22 8% 25%)",
            fontFamily: "var(--font-ui, 'Work Sans', sans-serif)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontSize: "0.75rem",
            opacity: allReleased ? 1 : 0.4,
          }}
          animate={{
            opacity: allReleased ? 1 : 0.4,
          }}
        >
          Enter the Void
        </motion.button>
      </motion.div>
    </section>
  );
}
