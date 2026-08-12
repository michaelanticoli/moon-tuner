/**
 * HarmonicOutput — Step 4 + 5
 *
 * Harmonic archetype generation → personalized output.
 * Two sub-phases: brief generation moment, then the full profile.
 * Editorial, spacious, premium. Never gamified.
 */

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import type { HarmonicArchetype } from "@/data/harmonicArchetypes";
import { QuantumSignaturePanel } from "@/components/harmonic/QuantumSignaturePanel";
import { useSharedBirth } from "@/hooks/useSharedBirth";
import { computeNatalLuminaries } from "@/lib/natalOverlay";

/** Duration (ms) of the archetype generation animation before showing the profile. */
const GENERATION_DURATION_MS = 2600;

interface HarmonicOutputProps {
  archetype: HarmonicArchetype;
  onRestart: () => void;
}

// ─── Generation Interstitial ─────────────────────────────────────────────────

function GenerationMoment({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, GENERATION_DURATION_MS);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      key="generating"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center"
    >
      {/* Slow pulsing orb */}
      <div
        className="dusk-breath rounded-full mb-12"
        style={{
          width: "6rem",
          height: "6rem",
          background:
            "radial-gradient(circle at 38% 35%, hsl(var(--dusk-ivory) / 0.18) 0%, hsl(var(--dusk-gold) / 0.08) 45%, transparent 75%)",
          border: "1px solid hsl(var(--dusk-ivory) / 0.1)",
        }}
      />
      <p
        className="dusk-eyebrow"
        style={{ color: "hsl(var(--dusk-silver))" }}
      >
        Composing your profile
      </p>
    </motion.div>
  );
}

// ─── Full Output ─────────────────────────────────────────────────────────────

function ProfileSection({
  label,
  children,
  delay = 0,
}: {
  label: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.9s cubic-bezier(0.2,0.8,0.2,1) ${delay}s, transform 0.9s cubic-bezier(0.2,0.8,0.2,1) ${delay}s`,
      }}
    >
      <p className="dusk-eyebrow mb-5">{label}</p>
      <div className="node-card p-6 rounded-2xl">{children}</div>
    </div>
  );
}

export function HarmonicOutput({ archetype, onRestart }: HarmonicOutputProps) {
  const [phase, setPhase] = useState<"generating" | "profile">("generating");
  const { birth } = useSharedBirth();
  const [localNatal, setLocalNatal] = useState<null | { moonSign: string }>(null);
  const [natalLoading, setNatalLoading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPhase("profile"), GENERATION_DURATION_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let mounted = true;
    if (!birth?.date || !birth?.time || !birth?.location) return;
    setNatalLoading(true);
    computeNatalLuminaries(birth)
      .then((n) => {
        if (!mounted) return;
        if (n) setLocalNatal({ moonSign: n.moonSign });
      })
      .catch(() => {
        /* ignore local compute failures */
      })
      .finally(() => mounted && setNatalLoading(false));
    return () => { mounted = false; };
  }, [birth]);

  if (phase === "generating") return <GenerationMoment onDone={() => setPhase("profile")} />;

  return (
    <motion.div
      key="profile"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pb-24"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-12 pt-24">
        <ProfileSection label="Your Harmonic Archetype">
          <h2 className="dusk-serif text-3xl mb-4">{archetype.title}</h2>
          <p className="text-muted-foreground mb-6">{archetype.tagline}</p>
          <div className="flex gap-3">
            <button onClick={onRestart} className="dusk-btn dusk-btn-ghost">Start over</button>
            <Link to="/persona" className="dusk-btn dusk-btn-primary">Open Persona Edition</Link>
          </div>
        </ProfileSection>

        {/* Quick local snapshot: natal Moon sign & immediate CTA to Astro‑Harmonic */}
        <div className="mt-10">
          <ProfileSection label="Quick natal snapshot">
            {natalLoading ? (
              <p className="text-sm text-muted-foreground">Computing your natal snapshot…</p>
            ) : localNatal ? (
              <>
                <p className="mb-4">Your natal Moon is in <strong>{localNatal.moonSign}</strong>. This gives a quick sense of your emotional register — a first step toward a fuller Astro‑Harmonic reading.</p>
                <div className="flex gap-3">
                  <Link to="/quantumelodic?source=harmonic-profile" className="dusk-btn dusk-btn-primary">Continue to Astro‑Harmonic</Link>
                  <Link to="/quantumelodic?preview=true" className="dusk-btn dusk-btn-ghost">Preview the Engine</Link>
                </div>
              </>
            ) : (
              <>
                <p className="mb-4 text-sm text-muted-foreground">Add your birth details in the studio to get a quick snapshot and unlock full reports.</p>
                <div className="flex gap-3">
                  <Link to="/studio" className="dusk-btn dusk-btn-primary">Open Studio</Link>
                </div>
              </>
            )}
          </ProfileSection>
        </div>

        {/* Full quantum panel — still available for complete birth data */}
        <div className="mt-10">
          <ProfileSection label="Quantum Signature (full)">
            <QuantumSignaturePanel birth={birth} chartName={birth?.name} forceForm={false} />
          </ProfileSection>
        </div>
      </div>
    </motion.div>
  );
}
