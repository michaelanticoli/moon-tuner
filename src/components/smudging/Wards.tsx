import { useState } from "react";
import { motion } from "framer-motion";

interface WardsProps {
  onComplete: (wards: string[]) => void;
}

const WARD_PROMPTS = [
  {
    id: "attention",
    question: "What deserves your undivided attention?",
    placeholder: "Deep work, presence with people you love, creative focus…",
  },
  {
    id: "protect",
    question: "What will you protect your time and energy for?",
    placeholder: "Rest, reflection, the things that genuinely restore you…",
  },
  {
    id: "intention",
    question: "What intention will guide your digital choices?",
    placeholder: "Conscious use, quality over quantity, choosing presence…",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.5 },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.2, 0.8, 0.2, 1] as const } },
};

export function Wards({ onComplete }: WardsProps) {
  const [values, setValues] = useState<Record<string, string>>({
    attention: "",
    protect: "",
    intention: "",
  });
  const [focused, setFocused] = useState<string | null>(null);

  const hasAny = Object.values(values).some((v) => v.trim().length > 0);

  const handleSubmit = () => {
    if (!hasAny) return;
    const wards = WARD_PROMPTS.filter((p) => values[p.id].trim().length > 0).map(
      (p) => values[p.id].trim()
    );
    onComplete(wards);
  };

  return (
    <section className="min-h-screen flex flex-col items-center relative overflow-hidden pt-28 pb-24 px-6">
      {/* ambient light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 30% at 50% 0%, hsl(140 20% 55% / 0.07) 0%, transparent 60%)",
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
          style={{ color: "hsl(140 20% 55%)", letterSpacing: "0.32em" }}
        >
          Chamber V — Wards
        </p>
        <h2
          className="text-4xl md:text-5xl font-light mb-5 leading-tighter"
          style={{
            fontFamily: "var(--font-editorial, 'Playfair Display', serif)",
            color: "hsl(38 25% 88%)",
            letterSpacing: "-0.02em",
          }}
        >
          Set your intentions
        </h2>
        <p className="text-sm leading-readable" style={{ color: "hsl(22 8% 38%)" }}>
          The space you've cleared needs to be held.
          <br />
          Write what you choose to protect it with.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col max-w-lg w-full gap-8 mb-14"
      >
        {WARD_PROMPTS.map((prompt) => {
          const isFocused = focused === prompt.id;
          const hasValue = values[prompt.id].trim().length > 0;

          return (
            <motion.div key={prompt.id} variants={fieldVariants}>
              <label
                htmlFor={`ward-${prompt.id}`}
                className="block text-sm mb-3 leading-snug"
                style={{
                  color: isFocused || hasValue ? "hsl(38 25% 80%)" : "hsl(22 8% 42%)",
                  fontFamily: "var(--font-editorial, 'Playfair Display', serif)",
                  fontStyle: "italic",
                  transition: "color 0.4s ease",
                }}
              >
                {prompt.question}
              </label>
              <textarea
                id={`ward-${prompt.id}`}
                value={values[prompt.id]}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, [prompt.id]: e.target.value }))
                }
                onFocus={() => setFocused(prompt.id)}
                onBlur={() => setFocused(null)}
                placeholder={prompt.placeholder}
                rows={3}
                className="w-full resize-none rounded-lg px-4 py-3 text-sm leading-relaxed outline-none transition-all duration-500"
                style={{
                  background: "hsl(22 10% 11%)",
                  border: `1px solid ${isFocused ? "hsl(140 20% 55% / 0.5)" : "hsl(22 12% 16%)"}`,
                  color: "hsl(38 25% 84%)",
                  fontFamily: "var(--font-ui, 'Work Sans', sans-serif)",
                  caretColor: "hsl(140 20% 55%)",
                  boxShadow: isFocused ? "0 0 20px hsl(140 20% 55% / 0.06)" : "none",
                }}
              />
              {/* placeholder style override via data attr or inline */}
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="flex flex-col items-center gap-4"
      >
        {hasAny && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs italic"
            style={{
              color: "hsl(22 8% 40%)",
              fontFamily: "var(--font-editorial, 'Playfair Display', serif)",
            }}
          >
            These stay with you.
          </motion.p>
        )}
        <button
          onClick={handleSubmit}
          disabled={!hasAny}
          className="px-10 py-3.5 rounded-full text-sm transition-all duration-700 cursor-pointer disabled:cursor-default"
          style={{
            background: "transparent",
            border: `1px solid ${hasAny ? "hsl(140 20% 55% / 0.45)" : "hsl(22 12% 18%)"}`,
            color: hasAny ? "hsl(38 25% 88%)" : "hsl(22 8% 25%)",
            fontFamily: "var(--font-ui, 'Work Sans', sans-serif)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontSize: "0.75rem",
            opacity: hasAny ? 1 : 0.4,
          }}
        >
          Seal the Wards
        </button>
        <button
          onClick={() => onComplete([])}
          className="text-xs transition-all duration-300"
          style={{
            color: "hsl(22 8% 28%)",
            fontFamily: "var(--font-ui, 'Work Sans', sans-serif)",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          Skip — continue without
        </button>
      </motion.div>
    </section>
  );
}
