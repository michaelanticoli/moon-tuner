import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LifeGyre } from "./LifeGyre";
import { getSmudgingPatternLabel } from "./content";
import "./life-gyre-chamber.css";

export type LifeGyreChamberProps = {
  items: string[];
  onComplete: () => void;
};

const FALLBACK_FRAGMENTS = [
  "INBOX", "DEADLINE", "FOLLOW UP", "PAYMENT DUE", "CALL BACK",
  "WHAT NEXT?", "DON'T FORGET", "CATCH UP", "BE PRODUCTIVE",
];

const CLEAR_THRESHOLD = 68;
const HOLD_DURATION_MS = 1800;

export function LifeGyreChamber({ items, onComplete }: LifeGyreChamberProps) {
  const [clarity, setClarity] = useState(0);
  const [ritualReady, setRitualReady] = useState(false);
  const [fieldUnavailable, setFieldUnavailable] = useState(false);
  const thresholdStartedAt = useRef<number | null>(null);
  const completionLocked = useRef(false);

  const particleCount = useMemo(() => {
    if (typeof window === "undefined") return 3600;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const lowPowerDevice = (navigator.hardwareConcurrency ?? 4) <= 4;
    if (reducedMotion) return 900;
    if (coarsePointer || lowPowerDevice) return 2800;
    return 5200;
  }, []);

  const thoughts = useMemo(() => {
    const cleaned = items
      .map((item) => getSmudgingPatternLabel(item).trim().toUpperCase())
      .filter(Boolean);
    return [...new Set([...cleaned, ...FALLBACK_FRAGMENTS])].slice(0, 24);
  }, [items]);

  const handleClarity = useCallback((next: number) => {
    setClarity(next);

    if (completionLocked.current) return;

    if (next >= CLEAR_THRESHOLD) {
      if (thresholdStartedAt.current === null) thresholdStartedAt.current = performance.now();
      const sustainedFor = performance.now() - thresholdStartedAt.current;
      if (sustainedFor >= HOLD_DURATION_MS) {
        completionLocked.current = true;
        setRitualReady(true);
      }
    } else {
      thresholdStartedAt.current = null;
    }
  }, []);

  const handleUnavailable = useCallback(() => setFieldUnavailable(true), []);
  const canContinue = ritualReady || fieldUnavailable;

  useEffect(() => {
    if (!canContinue) return;
    const id = window.setTimeout(() => {
      document.getElementById("gyre-completion")?.focus();
    }, 500);
    return () => window.clearTimeout(id);
  }, [canContinue]);

  return (
    <section className="gyre-chamber" aria-labelledby="gyre-title">
      <LifeGyre
        className="gyre-chamber__field"
        thoughts={thoughts}
        onClarityChange={handleClarity}
        onUnavailable={handleUnavailable}
        showInterface={false}
        particleCount={particleCount}
        speed={0.29}
        smudgeRadius={1.15}
        smudgeStrength={0.25}
        clarityDuration={11}
        particleColor="#c6bca9"
        accentColor="#c97845"
      />

      <div className="gyre-chamber__veil" aria-hidden="true" />

      <motion.header
        className="gyre-chamber__copy"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1 }}
      >
        <p className="gyre-chamber__number">02 · THE LIFE GYRE</p>
        <h1 id="gyre-title">Give the noise<br /><em>somewhere to move.</em></h1>
        <p>
          These are the things occupying your attention. Move through them slowly.
          Press and hold to send a deeper resonance through the field.
        </p>
      </motion.header>

      <div className="gyre-chamber__clarity" aria-live="polite">
        <div className="gyre-chamber__clarity-label">
          <span>OPEN SPACE</span><strong>{clarity}%</strong>
        </div>
        <div className="gyre-chamber__track" aria-hidden="true">
          <motion.i animate={{ width: `${clarity}%` }} transition={{ duration: 0.35 }} />
        </div>
        <small>
          {fieldUnavailable
            ? "The particle field is unavailable on this device."
            : ritualReady
            ? "A clearing has opened."
            : clarity >= CLEAR_THRESHOLD
              ? "Remain here. Let the opening settle."
              : "Move to smudge · hold to resonate"}
        </small>
      </div>

      <AnimatePresence>
        {canContinue && (
          <motion.div
            className="gyre-chamber__completion"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p>
              {fieldUnavailable
                ? "The ritual can continue without the visual field. Your selections will still carry into the release."
                : "You have not erased the obligations. You have made enough room to meet them differently."}
            </p>
            <button id="gyre-completion" type="button" onClick={onComplete}>
              Enter the cords <span aria-hidden="true">→</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="gyre-chamber__gesture" aria-hidden="true">
        <span>○</span> Move to smudge · press or hold Space to resonate
      </div>
    </section>
  );
}
