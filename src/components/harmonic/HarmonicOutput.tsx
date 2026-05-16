/**
 * HarmonicOutput — Step 4 + 5
 *
 * Harmonic archetype generation → personalized output.
 * Two sub-phases: brief generation moment, then the full profile.
 * Editorial, spacious, premium. Never gamified.
 */

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import type { HarmonicArchetype } from "@/data/harmonicArchetypes";
import { QuantumSignaturePanel } from "@/components/harmonic/QuantumSignaturePanel";
import { useSharedBirth } from "@/hooks/useSharedBirth";

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
      <p className="dusk-eyebrow mb-5">
        <span
          className="inline-block w-5 h-px align-middle mr-3"
          style={{ background: "hsl(var(--dusk-gold))" }}
        />
        {label}
      </p>
      {children}
    </div>
  );
}

function FullProfile({
  archetype,
  onRestart,
}: {
  archetype: HarmonicArchetype;
  onRestart: () => void;
}) {
  const { birth } = useSharedBirth();
  return (
    <motion.div
      key="output"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Atmospheric background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute"
          style={{
            top: 0,
            right: 0,
            width: "70vw",
            height: "70vh",
            background:
              "radial-gradient(50% 50% at 75% 20%, hsl(var(--dusk-gold) / 0.07) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: 0,
            left: 0,
            width: "50vw",
            height: "50vh",
            background:
              "radial-gradient(50% 50% at 15% 80%, hsl(168 65% 52% / 0.03) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[860px] px-6 lg:px-12 pt-28 lg:pt-36 pb-32">

        {/* ── Archetype Header ── */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <p className="dusk-eyebrow mb-8">
            <span
              className="inline-block w-7 h-px align-middle mr-3"
              style={{ background: "hsl(var(--dusk-gold))" }}
            />
            Your Harmonic Archetype
          </p>

          <h1
            className="dusk-serif dusk-ivory mb-5"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)", lineHeight: 1.04 }}
          >
            {archetype.title}
          </h1>

          <p
            className="text-[1.0625rem] tracking-[0.06em] uppercase mb-16"
            style={{
              color: "hsl(var(--dusk-gold) / 0.7)",
              fontFamily: "var(--font-ui)",
              fontWeight: 400,
              letterSpacing: "0.12em",
            }}
          >
            {archetype.tagline}
          </p>

          <div className="dusk-hairline" />
        </motion.div>

        {/* ── Sections grid ── */}
        <div className="space-y-20">

          {/* Rhythm Description */}
          <ProfileSection label="Rhythm" delay={0}>
            <p
              className="text-[1.125rem] leading-[1.8] max-w-[680px]"
              style={{ color: "hsl(var(--dusk-ivory) / 0.82)" }}
            >
              {archetype.rhythmDescription}
            </p>
          </ProfileSection>

          {/* Directive Style */}
          <ProfileSection label="Directive Style" delay={0.06}>
            <div
              className="dusk-surface p-8 lg:p-10"
              style={{ borderRadius: "1.25rem" }}
            >
              <p
                className="text-[1.0625rem] leading-[1.75] italic"
                style={{
                  color: "hsl(var(--dusk-ivory) / 0.78)",
                  fontFamily: "var(--font-editorial)",
                  fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
                }}
              >
                &ldquo;{archetype.directiveStyle}&rdquo;
              </p>
            </div>
          </ProfileSection>

          {/* Two-column: Emotional Tendencies + Suggested Practices */}
          <div className="grid lg:grid-cols-2 gap-10">
            <ProfileSection label="Emotional Tendencies" delay={0.1}>
              <ul className="space-y-4">
                {archetype.emotionalTendencies.map((t, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4"
                    style={{ color: "hsl(var(--dusk-ivory) / 0.7)" }}
                  >
                    <span
                      className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full"
                      style={{ background: "hsl(var(--dusk-gold) / 0.55)" }}
                    />
                    <span className="text-[0.9375rem] leading-[1.65]">{t}</span>
                  </li>
                ))}
              </ul>
            </ProfileSection>

            <ProfileSection label="Suggested Practices" delay={0.15}>
              <ul className="space-y-4">
                {archetype.suggestedPractices.map((p, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4"
                    style={{ color: "hsl(var(--dusk-ivory) / 0.7)" }}
                  >
                    <span
                      className="shrink-0 font-mono text-[0.6rem] tracking-[0.22em] mt-[5px]"
                      style={{ color: "hsl(var(--dusk-silver) / 0.5)" }}
                    >
                      0{i + 1}
                    </span>
                    <span className="text-[0.9375rem] leading-[1.65]">{p}</span>
                  </li>
                ))}
              </ul>
            </ProfileSection>
          </div>

          {/* Timing Posture — featured */}
          <ProfileSection label="Timing Posture" delay={0.2}>
            <div
              className="relative overflow-hidden rounded-[1.25rem] px-8 lg:px-12 py-10 lg:py-12"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--dusk-ivory) / 0.04) 0%, hsl(var(--dusk-gold) / 0.04) 100%)",
                border: "1px solid hsl(var(--dusk-gold) / 0.15)",
              }}
            >
              {/* Gold accent line */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px]"
                style={{
                  background:
                    "linear-gradient(180deg, transparent, hsl(var(--dusk-gold) / 0.55), transparent)",
                  borderRadius: "0 0 0 1.25rem",
                }}
              />

              <p
                className="text-[1.125rem] leading-[1.75] max-w-[640px]"
                style={{
                  color: "hsl(var(--dusk-ivory) / 0.85)",
                  fontFamily: "var(--font-editorial)",
                  fontStyle: "italic",
                  fontSize: "clamp(1.05rem, 2.2vw, 1.25rem)",
                }}
              >
                {archetype.timingPosture}
              </p>
            </div>
          </ProfileSection>

          {/* Separator */}
          <div className="dusk-hairline" />

          {/* ── Quantum Signature — real Swiss Ephemeris engine ── */}
          <ProfileSection label="Beyond Reflection" delay={0.22}>
            <p
              className="text-[0.9375rem] leading-[1.7] mb-6 max-w-[560px]"
              style={{ color: "hsl(var(--dusk-ivory) / 0.55)" }}
            >
              Your archetype above is reflective — drawn from how you answered.
              Below is the empirical counterpart: your actual chart run through
              the 24-mode canonical harmonic system.
            </p>
            <QuantumSignaturePanel
              birth={{
                date: birth.date,
                time: birth.time,
                location: birth.location,
                name: birth.name,
              }}
              chartName={birth.name || archetype.title}
              heading="Your Computed Harmonic Signature"
              subheading="Real Swiss Ephemeris positions, mapped through 24 canonical modes. Includes downloadable MIDI."
            />
          </ProfileSection>

          {/* Separator */}
          <div className="dusk-hairline" />

          {/* Footer CTAs */}
          <ProfileSection label="Next Steps" delay={0.25}>
            <p
              className="text-[0.9375rem] leading-[1.7] mb-8 max-w-[520px]"
              style={{ color: "hsl(var(--dusk-ivory) / 0.5)" }}
            >
              Your Harmonic Profile is a starting point. The Lunar Cipher and
              your personal reports apply this archetype to live timing — showing
              you when your natural rhythm aligns with current conditions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/lunar-cipher" className="dusk-btn dusk-btn-primary">
                View Today's Cipher
              </Link>
              <Link to="/lunar-reports" className="dusk-btn dusk-btn-ghost">
                Generate Full Report
              </Link>
            </div>
          </ProfileSection>

          {/* Restart */}
          <div className="pt-8">
            <button
              onClick={onRestart}
              className="text-[0.75rem] tracking-[0.18em] uppercase transition-colors duration-300"
              style={{
                color: "hsl(var(--dusk-ivory) / 0.2)",
                fontFamily: "var(--font-ui)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "hsl(var(--dusk-ivory) / 0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "hsl(var(--dusk-ivory) / 0.2)";
              }}
            >
              Retake the reflection
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Orchestrator ─────────────────────────────────────────────────────────────

export function HarmonicOutput({ archetype, onRestart }: HarmonicOutputProps) {
  const [phase, setPhase] = useState<"generating" | "profile">("generating");

  return (
    <AnimatePresence mode="wait">
      {phase === "generating" ? (
        <GenerationMoment key="gen" onDone={() => setPhase("profile")} />
      ) : (
        <FullProfile key="profile" archetype={archetype} onRestart={onRestart} />
      )}
    </AnimatePresence>
  );
}
