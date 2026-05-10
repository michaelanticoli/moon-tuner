import { useState } from "react";
import { motion } from "framer-motion";

interface SageScanProps {
  onComplete: (selected: string[]) => void;
}

const SCAN_ITEMS = [
  {
    id: "notifications",
    label: "Notification overflow",
    desc: "Alerts interrupting focus without adding real value",
    icon: "◎",
  },
  {
    id: "feeds",
    label: "Mindless scrolling",
    desc: "Feeds consumed without intention or return",
    icon: "◈",
  },
  {
    id: "subscriptions",
    label: "Forgotten subscriptions",
    desc: "Services quietly drawing energy and attention",
    icon: "◇",
  },
  {
    id: "inbox",
    label: "Inbox weight",
    desc: "Unread messages creating background pressure",
    icon: "◻",
  },
  {
    id: "tabs",
    label: "Phantom tabs",
    desc: "Kept open out of obligation, never revisited",
    icon: "◈",
  },
  {
    id: "apps",
    label: "Dormant apps",
    desc: "Digital clutter collecting in silence",
    icon: "◇",
  },
  {
    id: "comparison",
    label: "Comparison traps",
    desc: "Spaces that diminish more than they expand",
    icon: "◎",
  },
  {
    id: "reactivity",
    label: "Habitual checking",
    desc: "Reaching for a device without purpose",
    icon: "◻",
  },
  {
    id: "news",
    label: "Passive news loops",
    desc: "Consuming updates that create anxiety, not clarity",
    icon: "◈",
  },
  {
    id: "drafts",
    label: "Unfinished drafts",
    desc: "Messages and projects carrying unresolved weight",
    icon: "◇",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.4 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const } },
};

export function SageScan({ onComplete }: SageScanProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleProceed = () => {
    if (selected.size === 0) return;
    onComplete(Array.from(selected));
  };

  return (
    <section className="min-h-screen flex flex-col items-center relative overflow-hidden pt-28 pb-24 px-6">
      {/* ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 35% at 50% 0%, hsl(140 20% 55% / 0.07) 0%, transparent 65%)",
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
          Chamber I — Sage Scan
        </p>
        <h2
          className="text-4xl md:text-5xl font-light mb-5 leading-tighter"
          style={{
            fontFamily: "var(--font-editorial, 'Playfair Display', serif)",
            color: "hsl(38 25% 88%)",
            letterSpacing: "-0.02em",
          }}
        >
          What weighs on you?
        </h2>
        <p className="text-sm leading-readable" style={{ color: "hsl(22 8% 38%)" }}>
          Sit with each one. Select what honestly resonates.
          <br />
          There is no wrong answer here.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 max-w-2xl w-full gap-3 mb-14"
      >
        {SCAN_ITEMS.map((item) => {
          const isSelected = selected.has(item.id);
          return (
            <motion.button
              key={item.id}
              variants={itemVariants}
              onClick={() => toggle(item.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              aria-pressed={isSelected}
              className="text-left p-4 rounded-lg transition-all duration-500 cursor-pointer"
              style={{
                background: isSelected ? "hsl(25 65% 55% / 0.1)" : "hsl(22 10% 11%)",
                border: `1px solid ${isSelected ? "hsl(25 65% 55% / 0.5)" : "hsl(22 12% 16%)"}`,
                boxShadow: isSelected ? "0 0 20px hsl(25 65% 55% / 0.08)" : "none",
              }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="text-lg mt-0.5 shrink-0 leading-none"
                  style={{ color: isSelected ? "hsl(25 65% 55%)" : "hsl(22 8% 30%)" }}
                  aria-hidden="true"
                >
                  {isSelected ? "◉" : item.icon}
                </span>
                <div>
                  <p
                    className="text-sm font-medium mb-0.5"
                    style={{
                      color: isSelected ? "hsl(38 25% 88%)" : "hsl(38 20% 70%)",
                      fontFamily: "var(--font-ui, 'Work Sans', sans-serif)",
                    }}
                  >
                    {item.label}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "hsl(22 8% 35%)" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.2 }}
        className="flex flex-col items-center gap-4"
      >
        {selected.size > 0 && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs"
            style={{ color: "hsl(22 8% 38%)" }}
          >
            {selected.size} {selected.size === 1 ? "pattern" : "patterns"} acknowledged
          </motion.p>
        )}
        <button
          onClick={handleProceed}
          disabled={selected.size === 0}
          className="px-10 py-3.5 rounded-full text-sm transition-all duration-700 cursor-pointer disabled:cursor-default"
          style={{
            background: "transparent",
            border: `1px solid ${selected.size > 0 ? "hsl(25 65% 55% / 0.5)" : "hsl(22 12% 20%)"}`,
            color: selected.size > 0 ? "hsl(38 25% 88%)" : "hsl(22 8% 28%)",
            fontFamily: "var(--font-ui, 'Work Sans', sans-serif)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontSize: "0.75rem",
            opacity: selected.size === 0 ? 0.5 : 1,
          }}
        >
          Proceed to Cord Cutting
        </button>
      </motion.div>
    </section>
  );
}
