import { motion } from "framer-motion";
import type { LunarReport } from "@/lib/lunarReportEngine";

export function ReportClosing({ report }: { report: LunarReport }) {
  const { closing } = report;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center py-20 border-t border-border">
      <h3 className="font-serif text-4xl text-foreground mb-1">{closing.headline1}</h3>
      <h3 className="font-serif text-4xl text-gold italic mb-8">{closing.headline2}</h3>
      <p className="text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed">{closing.body}</p>
      <p className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground mt-12">moontuner.xyz</p>
    </motion.div>
  );
}
