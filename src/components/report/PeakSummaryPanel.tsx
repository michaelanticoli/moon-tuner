import { motion } from "framer-motion";
import type { LunarReport } from "@/lib/lunarReportEngine";

export function PeakSummaryPanel({ report }: { report: LunarReport }) {
  const { peakSummary } = report;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-16">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-8 bg-card border border-border rounded-3xl">
          <span className="text-[9px] uppercase tracking-[0.5em] text-gold font-bold block mb-6">Three Peak Windows</span>
          <div className="space-y-4">
            {peakSummary.peakLines.map((line, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-gold/10 text-gold text-xs flex items-center justify-center font-bold">{i + 1}</span>
                <span className="text-foreground text-sm">{line}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-card border border-border rounded-3xl">
          <span className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground font-bold block mb-6">Softest Window</span>
          <p className="text-foreground text-sm leading-relaxed">{peakSummary.softestLine}</p>
          <p className="text-muted-foreground text-xs mt-4 leading-relaxed">
            Not every return is for maximum output. The softest month of your arc is an invitation to pull back, recover, and let the cycle do its work without your intervention.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
