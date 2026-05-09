/**
 * HarmonicWelcome — Step 1
 *
 * Atmospheric welcome screen for the Harmonic Profile onboarding.
 * Cinematic, editorial, unhurried. Sets the tone before any reflection begins.
 */

import { motion } from "framer-motion";

interface HarmonicWelcomeProps {
  onBegin: () => void;
}

export function HarmonicWelcome({ onBegin }: HarmonicWelcomeProps) {
  return (
    <motion.div
      key="welcome"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Atmospheric background geometry */}
      <div className="pointer-events-none absolute inset-0">
        {/* Concentric rings — off-center, drifting */}
        <div
          className="absolute dusk-drift"
          style={{
            top: "50%",
            left: "65%",
            transform: "translate(-50%, -50%)",
            width: "90vmin",
            height: "90vmin",
          }}
        >
          {[0.28, 0.44, 0.62, 0.8, 1].map((s, i) => (
            <div
              key={i}
              className="absolute inset-0 m-auto rounded-full border"
              style={{
                width: `${s * 100}%`,
                height: `${s * 100}%`,
                borderColor: `hsl(var(--dusk-ivory) / ${0.03 + i * 0.01})`,
              }}
            />
          ))}
          {/* Soft inner disc */}
          <div
            className="absolute inset-0 m-auto rounded-full dusk-breath"
            style={{
              width: "28%",
              height: "28%",
              background:
                "radial-gradient(circle at 38% 32%, hsl(var(--dusk-ivory) / 0.14) 0%, hsl(var(--dusk-gold) / 0.06) 45%, transparent 70%)",
              filter: "blur(0.5px)",
            }}
          />
        </div>

        {/* Gold radial glow */}
        <div
          className="absolute"
          style={{
            top: "30%",
            right: "15%",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, hsl(var(--dusk-gold) / 0.06) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        {/* Left-edge vignette to anchor copy */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, hsl(var(--dusk-black)) 0%, hsl(var(--dusk-black) / 0.55) 40%, transparent 72%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-[1100px] mx-auto px-6 lg:px-12">
        <div className="max-w-[600px]">
          {/* Eyebrow */}
          <motion.p
            className="dusk-eyebrow mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <span
              className="inline-block w-7 h-px align-middle mr-3"
              style={{ background: "hsl(var(--dusk-gold))" }}
            />
            Harmonic Profile
          </motion.p>

          {/* Headline */}
          <motion.h1
            className="dusk-serif dusk-ivory mb-8"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.6rem)", lineHeight: 1.04 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
          >
            A map of how you{" "}
            <em className="italic dusk-gold">actually</em> move
            <br />
            through time and work.
          </motion.h1>

          {/* Body */}
          <motion.p
            className="text-[1.0625rem] leading-[1.75] mb-4 max-w-[500px]"
            style={{ color: "hsl(var(--dusk-ivory) / 0.65)" }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 1.0, ease: [0.2, 0.8, 0.2, 1] }}
          >
            This is not a quiz. It is a reflection — six questions designed to
            surface the timing patterns already present in how you work, decide,
            and move through friction.
          </motion.p>

          <motion.p
            className="text-[1.0625rem] leading-[1.75] mb-14 max-w-[500px]"
            style={{ color: "hsl(var(--dusk-ivory) / 0.5)" }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.88, duration: 1.0, ease: [0.2, 0.8, 0.2, 1] }}
          >
            Your Harmonic Archetype will include a rhythm description, directive
            style, emotional tendencies, and a timing posture — the operating
            manual for how you function best.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <button onClick={onBegin} className="dusk-btn dusk-btn-primary">
              Begin the reflection
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
          </motion.div>

          {/* Quiet meta */}
          <motion.div
            className="mt-16 flex items-center gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1.0 }}
          >
            <div className="dusk-hairline max-w-[56px]" />
            <span className="text-[0.68rem] tracking-[0.28em] uppercase dusk-silver">
              6 prompts · ~4 minutes · No account required
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
