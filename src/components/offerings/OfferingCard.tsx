import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Offering } from "@/data/offeringsData";

interface OfferingCardProps {
  offering: Offering;
  onOpen: (offering: Offering) => void;
  index: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  Clarity: "text-sky-300 border-sky-800/50 bg-sky-950/20",
  Release: "text-teal-300 border-teal-800/50 bg-teal-950/20",
  Momentum: "text-amber-300 border-amber-800/50 bg-amber-950/20",
  Reflection: "text-rose-300 border-rose-800/50 bg-rose-950/20",
  Reorientation: "text-indigo-300 border-indigo-800/50 bg-indigo-950/20",
  Recovery: "text-emerald-300 border-emerald-800/50 bg-emerald-950/20",
  Alignment: "text-violet-300 border-violet-800/50 bg-violet-950/20",
};

export function OfferingCard({ offering, onOpen, index }: OfferingCardProps) {
  const [expanded, setExpanded] = useState(false);
  const categoryStyle = CATEGORY_COLORS[offering.category] ?? "text-gold border-gold/30 bg-gold/10";

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-card border border-border rounded-[2rem] overflow-hidden hover:border-border/80 transition-colors duration-500"
    >
      {/* Ambient gradient top strip */}
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${offering.accentColor} opacity-60`} />

      <div className="p-8 md:p-10">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span
                className={`inline-block text-[9px] uppercase tracking-[0.35em] font-bold px-3 py-1 rounded-full border ${categoryStyle}`}
              >
                {offering.category}
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground/60 font-medium">
                {offering.purchaseModel === "session" ? "Live Session" : offering.purchaseModel === "subscription" ? "Subscription" : "One-time"}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif text-foreground leading-tight mb-1">
              {offering.title}
            </h3>
            <p className="text-sm text-muted-foreground font-light tracking-wide">
              {offering.subtitle}
            </p>
          </div>

          <div className="text-right shrink-0">
            <div className="text-2xl font-serif text-foreground">{offering.price}</div>
            <div className="flex items-center gap-1.5 justify-end mt-1 text-muted-foreground/60">
              <Clock className="w-3 h-3" />
              <span className="text-[10px] tracking-wider">{offering.completionTime}</span>
            </div>
          </div>
        </div>

        {/* Positioning */}
        <p className="text-base text-muted-foreground font-light leading-relaxed mb-6">
          {offering.positioning}
        </p>

        {/* Best for tags */}
        {offering.bestFor.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {offering.bestFor.map((label) => (
              <span
                key={label}
                className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground/70 border border-border/50 rounded-full px-3 py-1"
              >
                {label}
              </span>
            ))}
          </div>
        )}

        {/* Expandable preview */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-border/40 pt-6 mb-6">
                {/* Emotional outcome */}
                <div className="mb-6">
                  <p className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground/60 font-bold mb-2">
                    What You'll Experience
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed italic font-light">
                    {offering.emotionalOutcome}
                  </p>
                </div>

                {/* Example insights */}
                <div className="mb-6">
                  <p className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground/60 font-bold mb-4">
                    Example Insights
                  </p>
                  <div className="space-y-4">
                    {offering.exampleInsights.slice(0, 2).map((insight) => (
                      <div
                        key={insight.headline}
                        className="border-l-2 border-border/50 pl-4"
                      >
                        <p className="text-xs font-semibold text-foreground mb-1">
                          {insight.headline}
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {insight.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timing note */}
                <div className="bg-muted/30 rounded-xl px-4 py-3">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground/60 font-bold mb-1">
                    Timing Note
                  </p>
                  <p className="text-xs text-muted-foreground/80 leading-relaxed">
                    {offering.timingRecommendation}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions row */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            {/* CTA */}
            {offering.ctaHref.startsWith("mailto:") ? (
              <a
                href={offering.ctaHref}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                {offering.ctaLabel}
                <ArrowRight className="w-3 h-3" />
              </a>
            ) : (
              <Link
                to={offering.ctaHref}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                {offering.ctaLabel}
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}

            {/* Deep dive button */}
            <button
              onClick={() => onOpen(offering)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold border border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground transition-all duration-300"
            >
              Full Preview
            </button>
          </div>

          {/* Expand toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-300"
            aria-expanded={expanded}
          >
            {expanded ? "Less" : "Preview"}
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </motion.span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
