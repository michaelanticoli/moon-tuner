import { motion } from "framer-motion";
import type { LunarReport } from "@/lib/lunarReportEngine";

export function PowerDayGrid({ report }: { report: LunarReport }) {
  return (
    <div className="mb-16">
      <div className="mb-8">
        <h3 className="font-serif text-3xl text-foreground mb-2">12-Month Power Arc</h3>
        <p className="text-muted-foreground text-sm max-w-2xl">
          Each month, the Moon returns to your natal phase position. These are your personal power days — calculated with eclipse awareness, lunar velocity, and lunation proximity.
        </p>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {report.powerDays.map((day, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className={`p-6 bg-card border rounded-3xl transition-all group relative overflow-hidden ${
              day.isPeak ? 'border-gold/40 ring-1 ring-gold/20' : 'border-border hover:border-gold/30'
            }`}
          >
            {day.isPeak && (
              <div className="absolute top-3 right-3 text-[8px] uppercase tracking-widest text-gold font-bold bg-gold/10 px-2 py-1 rounded-full">
                ★ Peak
              </div>
            )}
            {day.eclipse && (
              <div className="absolute top-3 left-3 text-[8px] uppercase tracking-widest text-accent font-bold bg-accent/10 px-2 py-1 rounded-full">
                Eclipse
              </div>
            )}

            <div className="mb-4 mt-2">
              <span className="text-3xl font-serif text-foreground group-hover:text-gold transition-colors block">{day.monthFull}</span>
              <span className="text-sm text-muted-foreground">Day {day.day}, {day.year}</span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-[9px] text-gold font-bold tracking-widest uppercase">{day.keyword}</span>
              <span className="text-lg font-serif text-foreground">{day.power}%</span>
            </div>

            <p className="text-muted-foreground text-xs leading-relaxed mb-4">
              {day.description}
            </p>

            <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gold rounded-full transition-all duration-1000" style={{ width: `${day.power}%` }} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
