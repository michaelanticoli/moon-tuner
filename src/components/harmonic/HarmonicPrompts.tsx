/**
 * HarmonicPrompts — Step 2
 *
 * Six reflective questions, revealed one at a time.
 * Each answer contributes silently to archetype scoring.
 * No progress percentages — only a spatial progress bar.
 */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROMPTS } from "@/data/harmonicArchetypes";
import { HarmonicProgressBar } from "./HarmonicProgressBar";

/** Duration (ms) of the slide-out animation before mounting the next question. */
const TRANSITION_DURATION_MS = 380;

interface HarmonicPromptsProps {
  answers: Record<number, number>;
  onAnswer: (promptId: number, optionIndex: number) => void;
  onComplete: () => void;
}

export function HarmonicPrompts({ answers, onAnswer, onComplete }: HarmonicPromptsProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(
    answers[PROMPTS[0].id] ?? null
  );
  const [transitioning, setTransitioning] = useState(false);

  const prompt = PROMPTS[current];
  const isLast = current === PROMPTS.length - 1;

  function handleSelect(optionIndex: number) {
    if (transitioning) return;
    setSelected(optionIndex);
    onAnswer(prompt.id, optionIndex);
  }

  function handleAdvance() {
    if (selected === null || transitioning) return;
    setTransitioning(true);

    setTimeout(() => {
      if (isLast) {
        onComplete();
      } else {
        const next = current + 1;
        setCurrent(next);
        setSelected(answers[PROMPTS[next].id] ?? null);
        setTransitioning(false);
      }
    }, TRANSITION_DURATION_MS);
  }

  function handleBack() {
    if (current === 0 || transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      const prev = current - 1;
      setCurrent(prev);
      setSelected(answers[PROMPTS[prev].id] ?? null);
      setTransitioning(false);
    }, TRANSITION_DURATION_MS - 100);
  }

  return (
    <motion.div
      key="prompts"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative min-h-screen flex flex-col"
    >
      {/* Top progress bar */}
      <div className="fixed top-0 inset-x-0 z-30 px-6 lg:px-12 pt-[76px] pb-3">
        <div className="max-w-[720px] mx-auto">
          <HarmonicProgressBar total={PROMPTS.length} current={current} />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center px-6 lg:px-12 pt-36 pb-24">
        <div className="w-full max-w-[720px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`prompt-${current}`}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {/* Question number */}
              <p
                className="font-mono text-[0.65rem] tracking-[0.28em] mb-8"
                style={{ color: "hsl(var(--dusk-ivory) / 0.2)" }}
              >
                0{current + 1} / 0{PROMPTS.length}
              </p>

              {/* Question */}
              <h2
                className="dusk-serif dusk-ivory mb-4"
                style={{ fontSize: "clamp(1.65rem, 3.5vw, 2.6rem)", lineHeight: 1.15 }}
              >
                {prompt.question}
              </h2>

              {/* Subtext */}
              {prompt.subtext && (
                <p
                  className="text-[0.9375rem] leading-[1.65] mb-12"
                  style={{ color: "hsl(var(--dusk-ivory) / 0.42)" }}
                >
                  {prompt.subtext}
                </p>
              )}

              {/* Options */}
              <div className="flex flex-col gap-3 mb-12">
                {prompt.options.map((option, i) => {
                  const isSelected = selected === i;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      className="group w-full text-left px-6 py-5 rounded-[1rem] transition-all duration-500 relative overflow-hidden"
                      style={{
                        background: isSelected
                          ? "linear-gradient(135deg, hsl(var(--dusk-ivory) / 0.07) 0%, hsl(var(--dusk-gold) / 0.05) 100%)"
                          : "linear-gradient(180deg, hsl(var(--dusk-ivory) / 0.025) 0%, hsl(var(--dusk-ivory) / 0.008) 100%)",
                        border: isSelected
                          ? "1px solid hsl(var(--dusk-gold) / 0.35)"
                          : "1px solid hsl(var(--dusk-ivory) / 0.08)",
                      }}
                      aria-pressed={isSelected}
                    >
                      {/* Selection indicator */}
                      <span
                        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[1rem] transition-all duration-500"
                        style={{
                          background: isSelected
                            ? "hsl(var(--dusk-gold))"
                            : "transparent",
                        }}
                      />

                      <span
                        className="block text-[0.9875rem] leading-[1.6] transition-colors duration-400"
                        style={{
                          color: isSelected
                            ? "hsl(var(--dusk-ivory))"
                            : "hsl(var(--dusk-ivory) / 0.62)",
                          fontFamily: "var(--font-ui)",
                        }}
                      >
                        {option.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handleBack}
                  disabled={current === 0}
                  className="text-[0.78rem] tracking-[0.14em] uppercase transition-colors duration-300"
                  style={{
                    color:
                      current === 0
                        ? "hsl(var(--dusk-ivory) / 0.15)"
                        : "hsl(var(--dusk-silver))",
                    fontFamily: "var(--font-ui)",
                  }}
                >
                  ← Back
                </button>

                <button
                  onClick={handleAdvance}
                  disabled={selected === null}
                  className="dusk-btn transition-all duration-400"
                  style={{
                    background:
                      selected !== null
                        ? "hsl(var(--dusk-ivory))"
                        : "hsl(var(--dusk-ivory) / 0.12)",
                    color:
                      selected !== null
                        ? "hsl(var(--dusk-black))"
                        : "hsl(var(--dusk-ivory) / 0.25)",
                    border:
                      selected !== null
                        ? "1px solid hsl(var(--dusk-ivory))"
                        : "1px solid hsl(var(--dusk-ivory) / 0.12)",
                    cursor: selected !== null ? "pointer" : "not-allowed",
                    padding: "0.85rem 1.5rem",
                    fontSize: "0.78rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    borderRadius: "999px",
                  }}
                >
                  {isLast ? "See my profile" : "Continue"}
                  {!isLast && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="ml-2 inline-block"
                    >
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
