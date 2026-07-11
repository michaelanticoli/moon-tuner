import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LifeGyre } from "./LifeGyre";
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
  const [thresholdReached, setThresholdReached] = useState(false);
  const [ritualReady, setRitualReady] = useState(false);
  const thresholdStartedAt = useRef<number | null>(null);

  const thoughts = useMemo(() => {
    const cleaned = items
      .map((item) => item.trim().toUpperCase())
      .filter(Boolean);
    return [...new Set([...cleaned, ...FALLBACK_FRAGMENTS])].slice(0, 24);
  }, [items]);

  const handleClarity = useCallback((next: number) => {
    setClarity(next);

    if (next >= CLEAR_THRESHOLD) {
      if (thresholdStartedAt.current === null) thresholdStartedAt.current = performance.now();
      const sustainedFor = performance.now() - thresholdStartedAt.current;
      if (sustainedFor >= HOLD_DURATION_MS) {
        setThresholdReached(true);
        setRitualReady(true);
      }
    } else if (!thresholdReached) {
      thresholdStartedAt.current = null;
    }
  }, [thresholdReached]);

  useEffect(() => {
    if (!ritualReady) return;
    const id = window.setTimeout(() => {
      document.getElementById("gyre-completion")?.focus();
    }, 500);
    return () => window.clearTimeout(id);
  }, [ritualReady]);

  return (
    <section className="gyre-chamber" aria-labelledby="gyre-title">
      <LifeGyre
        className="gyre-chamber__field"
        thoughts={thoughts}
        onClarityChange={handleClarity}
        showInterface={false}
        particleCount={7200}
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
          {ritualReady
            ? "A clearing has opened."
            : clarity >= CLEAR_THRESHOLD
              ? "Remain here. Let the opening settle."
              : "Move to smudge · hold to resonate"}
        </small>
      </div>

      <AnimatePresence>
        {ritualReady && (
          <motion.div
            className="gyre-chamber__completion"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p>You have not erased the obligations. You have made enough room to meet them differently.</p>
            <button id="gyre-completion" type="button" onClick={onComplete}>
              Enter the cords <span aria-hidden="true">→</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="gyre-chamber__gesture" aria-hidden="true">
        <span>○</span> Cursor as smudge stick · press as singing bowl
      </div>
    </section>
  );
}
