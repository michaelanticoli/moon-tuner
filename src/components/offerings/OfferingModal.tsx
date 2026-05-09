import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Offering } from "@/data/offeringsData";

interface OfferingModalProps {
  offering: Offering | null;
  onClose: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Clarity: "text-sky-300",
  Release: "text-teal-300",
  Momentum: "text-amber-300",
  Reflection: "text-rose-300",
  Reorientation: "text-indigo-300",
  Recovery: "text-emerald-300",
  Alignment: "text-violet-300",
};

export function OfferingModal({ offering, onClose }: OfferingModalProps) {
  // Lock body scroll while open
  useEffect(() => {
    if (offering) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [offering]);

  // Escape key to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const categoryColor = offering ? (CATEGORY_COLORS[offering.category] ?? "text-gold") : "";

  return (
    <AnimatePresence>
      {offering && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[400] bg-background/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[401] w-full max-w-2xl bg-card border-l border-border overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label={offering.title}
          >
            {/* Gradient header strip */}
            <div className={`h-px w-full bg-gradient-to-r ${offering.accentColor}`} />

            <div className="px-8 md:px-12 py-12">
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-8 right-8 w-8 h-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors duration-300"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Category + delivery */}
              <div className="flex items-center gap-3 mb-8 flex-wrap">
                <span className={`text-[9px] uppercase tracking-[0.4em] font-bold ${categoryColor}`}>
                  {offering.category}
                </span>
                <span className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground/50">
                  {offering.deliveryFormat}
                </span>
              </div>

              {/* Title block */}
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="text-[clamp(2rem,5vw,3.5rem)] font-serif font-light leading-[0.95] tracking-tight text-foreground mb-3"
              >
                {offering.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-base text-muted-foreground font-light mb-10"
              >
                {offering.subtitle}
              </motion.p>

              {/* Positioning */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="mb-10 pb-10 border-b border-border/40"
              >
                <p className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground/60 font-bold mb-3">
                  Overview
                </p>
                <p className="text-base text-foreground/80 leading-relaxed font-light">
                  {offering.positioning}
                </p>
              </motion.div>

              {/* Emotional outcome */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mb-10 pb-10 border-b border-border/40"
              >
                <p className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground/60 font-bold mb-3">
                  What You'll Experience
                </p>
                <p className="text-base text-foreground/70 leading-relaxed italic font-light">
                  {offering.emotionalOutcome}
                </p>
              </motion.div>

              {/* Report sections */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="mb-10 pb-10 border-b border-border/40"
              >
                <p className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground/60 font-bold mb-5">
                  Report Sections
                </p>
                <div className="space-y-4">
                  {offering.reportSections.map((section, i) => (
                    <motion.div
                      key={section.title}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.07, duration: 0.4 }}
                      className="flex gap-4 items-start"
                    >
                      <span className="text-[9px] text-muted-foreground/30 font-mono mt-0.5 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-foreground mb-0.5">{section.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{section.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Example insights */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="mb-10 pb-10 border-b border-border/40"
              >
                <p className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground/60 font-bold mb-5">
                  Example Insights
                </p>
                <div className="space-y-6">
                  {offering.exampleInsights.map((insight) => (
                    <div key={insight.headline} className="border-l-2 border-border/40 pl-5">
                      <p className="text-sm font-semibold text-foreground mb-2 leading-snug">
                        {insight.headline}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed font-light">
                        {insight.body}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Use cases */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mb-10 pb-10 border-b border-border/40"
              >
                <p className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground/60 font-bold mb-4">
                  Suggested For
                </p>
                <ul className="space-y-2">
                  {offering.suggestedUseCases.map((uc) => (
                    <li key={uc} className="flex items-start gap-3">
                      <span className="text-muted-foreground/30 mt-1">—</span>
                      <span className="text-sm text-muted-foreground font-light">{uc}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Timing + delivery meta */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="mb-10 bg-muted/20 rounded-2xl p-6"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground/60 font-bold mb-2">
                      Delivery
                    </p>
                    <p className="text-sm text-foreground font-light">{offering.deliveryFormat}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground/60 font-bold mb-2">
                      Completion
                    </p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-muted-foreground/50" />
                      <p className="text-sm text-foreground font-light">{offering.completionTime}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border/30">
                  <p className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground/60 font-bold mb-2">
                    Timing Note
                  </p>
                  <p className="text-xs text-muted-foreground/80 leading-relaxed font-light">
                    {offering.timingRecommendation}
                  </p>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex items-center justify-between gap-4"
              >
                <div>
                  <p className="text-3xl font-serif text-foreground">{offering.price}</p>
                  <p className="text-[9px] uppercase tracking-wider text-muted-foreground/60 mt-1">
                    {offering.purchaseModel === "session"
                      ? "Per session"
                      : offering.purchaseModel === "subscription"
                      ? "Per month"
                      : "One-time"}
                  </p>
                </div>

                {offering.ctaHref.startsWith("mailto:") ? (
                  <a
                    href={offering.ctaHref}
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-[11px] uppercase tracking-[0.25em] font-bold bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                  >
                    {offering.ctaLabel}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <Link
                    to={offering.ctaHref}
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-[11px] uppercase tracking-[0.25em] font-bold bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                  >
                    {offering.ctaLabel}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
