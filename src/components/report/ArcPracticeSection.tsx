import { motion } from "framer-motion";
import type { LunarReport } from "@/lib/lunarReportEngine";

export function ArcPracticeSection({ report }: { report: LunarReport }) {
  const { arcPractice } = report;
  if (!arcPractice) return null;

  const { panelA, panelB, panelC, panelD } = arcPractice;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-16">
      <h3 className="font-serif text-3xl text-foreground mb-2">Arc Practice</h3>
      <p className="text-muted-foreground text-sm max-w-2xl mb-8">How to work with your power days — before, during, and after each return.</p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Panel A: Before · During · After */}
        <div className="p-8 bg-card border border-border rounded-3xl">
          <h4 className="font-serif text-xl text-foreground mb-6">{panelA.title}</h4>
          {panelA.before && (
            <div className="mb-5">
              <span className="text-[9px] uppercase tracking-[0.4em] text-gold font-bold block mb-2">Before</span>
              <p className="text-muted-foreground text-sm leading-relaxed">{panelA.before}</p>
            </div>
          )}
          {panelA.during && (
            <div className="mb-5">
              <span className="text-[9px] uppercase tracking-[0.4em] text-gold font-bold block mb-2">During</span>
              <p className="text-muted-foreground text-sm leading-relaxed">{panelA.during}</p>
            </div>
          )}
          {panelA.after && (
            <div>
              <span className="text-[9px] uppercase tracking-[0.4em] text-gold font-bold block mb-2">After</span>
              <p className="text-muted-foreground text-sm leading-relaxed">{panelA.after}</p>
            </div>
          )}
        </div>

        {/* Panel B: The Arc */}
        <div className="p-8 bg-card border border-border rounded-3xl">
          <h4 className="font-serif text-xl text-foreground mb-4">{panelB.title}</h4>
          {panelB.body?.split('\n\n').map((p, i) => (
            <p key={i} className="text-muted-foreground text-sm leading-relaxed mb-3 last:mb-0">{p}</p>
          ))}
        </div>

        {/* Panel C: Where This Breaks */}
        <div className="p-8 bg-card border border-border rounded-3xl">
          <h4 className="font-serif text-xl text-foreground mb-4">{panelC.title}</h4>
          {panelC.body?.split('\n\n').map((p, i) => (
            <p key={i} className="text-muted-foreground text-sm leading-relaxed mb-3 last:mb-0">{p}</p>
          ))}
        </div>

        {/* Panel D: The Practice */}
        <div className="p-8 bg-card border border-gold/20 rounded-3xl">
          <h4 className="font-serif text-xl text-foreground mb-1">{panelD.title}</h4>
          {panelD.subtitle && <p className="text-gold text-sm italic mb-4">{panelD.subtitle}</p>}
          {panelD.body?.split('\n\n').map((p, i) => (
            <p key={i} className="text-muted-foreground text-sm leading-relaxed mb-3 last:mb-0">{p}</p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
