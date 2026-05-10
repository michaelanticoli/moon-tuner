/**
 * HarmonicProfile — Page
 *
 * Orchestrates the five-step onboarding flow:
 *   1. Welcome
 *   2. Reflective Prompts
 *   3. Pattern Identification
 *   4. Archetype Generation (interstitial)
 *   5. Personalized Output
 *
 * All state is local — no account required.
 */

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { DuskNav } from "@/components/dusk/DuskNav";
import { HarmonicWelcome } from "@/components/harmonic/HarmonicWelcome";
import { HarmonicPrompts } from "@/components/harmonic/HarmonicPrompts";
import { HarmonicPattern } from "@/components/harmonic/HarmonicPattern";
import { HarmonicOutput } from "@/components/harmonic/HarmonicOutput";
import {
  scoreAnswers,
  detectPatterns,
  type HarmonicArchetype,
} from "@/data/harmonicArchetypes";
import { SEOHead } from "@/components/SEOHead";

type FlowStep = "welcome" | "prompts" | "pattern" | "output";

const HarmonicProfile = () => {
  const [step, setStep] = useState<FlowStep>("welcome");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [patterns, setPatterns] = useState<string[]>([]);
  const [archetype, setArchetype] = useState<HarmonicArchetype | null>(null);

  const handleAnswer = useCallback((promptId: number, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [promptId]: optionIndex }));
  }, []);

  const handlePromptsComplete = useCallback(() => {
    const detected = detectPatterns(answers);
    setPatterns(detected);
    setStep("pattern");
  }, [answers]);

  const handlePatternContinue = useCallback(() => {
    const result = scoreAnswers(answers);
    setArchetype(result);
    setStep("output");
  }, [answers]);

  const handleRestart = useCallback(() => {
    setAnswers({});
    setPatterns([]);
    setArchetype(null);
    setStep("welcome");
  }, []);

  return (
    <PageTransition>
      <SEOHead
        title="Harmonic Profile — Discover Your Natal Moon Phase & Personal Archetype | Moontuner"
        description="Your Harmonic Profile maps your natal moon phase to your natural orientation toward timing, creativity, and self-expression. A reflective self-knowledge tool — not a prediction."
        canonical="/harmonic-profile"
        keywords={[
          "harmonic profile",
          "natal moon phase",
          "moon phase personality",
          "lunar archetype",
          "self-knowledge tool",
          "personal lunar map",
          "what moon phase was I born under",
        ]}
      />
      <div className="dusk min-h-screen relative">
        {/* Nav with back link on inner steps */}
        <div className="fixed top-0 inset-x-0 z-50">
          {step === "welcome" ? (
            <DuskNav />
          ) : (
            <nav
              className="mx-auto max-w-[1400px] px-6 lg:px-12 h-[68px] flex items-center justify-between"
              style={{ fontFamily: "var(--font-ui)" }}
              aria-label="Flow navigation"
            >
              <Link
                to="/"
                aria-label="Moontuner"
                className="dusk-serif text-[1.35rem] dusk-ivory hover:dusk-gold transition-colors"
              >
                Moontuner
              </Link>

              {step !== "output" && (
                <button
                  onClick={handleRestart}
                  className="text-[0.72rem] tracking-[0.14em] uppercase dusk-silver hover:dusk-ivory transition-colors"
                >
                  Start over
                </button>
              )}
            </nav>
          )}
        </div>

        {/* Flow content */}
        <main>
          <AnimatePresence mode="wait">
            {step === "welcome" && (
              <HarmonicWelcome key="welcome" onBegin={() => setStep("prompts")} />
            )}

            {step === "prompts" && (
              <HarmonicPrompts
                key="prompts"
                answers={answers}
                onAnswer={handleAnswer}
                onComplete={handlePromptsComplete}
              />
            )}

            {step === "pattern" && (
              <HarmonicPattern
                key="pattern"
                patterns={patterns}
                onContinue={handlePatternContinue}
              />
            )}

            {step === "output" && archetype && (
              <HarmonicOutput
                key="output"
                archetype={archetype}
                onRestart={handleRestart}
              />
            )}
          </AnimatePresence>
        </main>
      </div>
    </PageTransition>
  );
};

export default HarmonicProfile;
