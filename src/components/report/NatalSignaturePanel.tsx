import { motion } from "framer-motion";
import { MoonPhaseGlyph } from "@/components/MoonPhaseGlyph";
import { Heart, Zap, Eye } from "lucide-react";
import type { LunarReport } from "@/lib/lunarReportEngine";

type GlyphPhase = "first-quarter" | "full" | "last-quarter" | "new" | "waning-crescent" | "waning-gibbous" | "waxing-crescent" | "waxing-gibbous";

function phaseToGlyphKey(phase: string): GlyphPhase {
  const key = phase.toLowerCase().replace(/\s+/g, '-');
  const valid: GlyphPhase[] = ['new', 'waxing-crescent', 'first-quarter', 'waxing-gibbous', 'full', 'waning-gibbous', 'last-quarter', 'waning-crescent'];
  return valid.includes(key as GlyphPhase) ? (key as GlyphPhase) : 'new';
}

export function NatalSignaturePanel({ report }: { report: LunarReport }) {
  const { natal } = report;
  const glyphKey = phaseToGlyphKey(natal.phase);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-16">
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-1 flex flex-col items-center justify-center p-10 bg-card border border-border rounded-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
          <MoonPhaseGlyph phase={glyphKey} size={80} className="text-gold mb-6 relative z-10" />
          <span className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground font-bold relative z-10">Archetype</span>
          <h3 className="font-serif text-3xl text-foreground mt-2 relative z-10 text-center">{natal.archetype}</h3>
          <span className="text-gold text-sm mt-1 relative z-10">{natal.angle}°</span>
          <p className="text-muted-foreground text-xs mt-3 italic text-center relative z-10">{natal.subtitle}</p>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="p-8 bg-card border border-border rounded-3xl">
            <span className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground font-bold block mb-2">Thematic Title</span>
            <h4 className="font-serif text-2xl text-foreground italic">"{natal.title}"</h4>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-card border border-border rounded-2xl">
              <span className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground font-bold block mb-1">Element</span>
              <p className="text-foreground font-serif text-lg">{natal.element}</p>
            </div>
            <div className="p-6 bg-card border border-border rounded-2xl">
              <span className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground font-bold block mb-1">Modality</span>
              <p className="text-foreground font-serif text-lg">{natal.modality}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-card border border-border rounded-2xl">
          <div className="flex items-center gap-3 mb-3">
            <Heart className="w-4 h-4 text-gold" />
            <span className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground font-bold">Somatic Zone</span>
          </div>
          <p className="text-foreground text-sm">{natal.somaticZone}</p>
        </div>
        <div className="p-6 bg-card border border-border rounded-2xl">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-4 h-4 text-gold" />
            <span className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground font-bold">Solfeggio</span>
          </div>
          <p className="text-foreground text-sm">{natal.solfeggio} — {natal.solfeggioMeaning}</p>
        </div>
        <div className="p-6 bg-card border border-border rounded-2xl">
          <div className="flex items-center gap-3 mb-3">
            <Eye className="w-4 h-4 text-gold" />
            <span className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground font-bold">Instruction</span>
          </div>
          <p className="text-foreground text-sm">{natal.instruction}</p>
        </div>
      </div>

      {/* Keywords */}
      <div className="flex flex-wrap gap-2 mb-8">
        {natal.navTabs.map((kw) => (
          <span key={kw} className="px-3 py-1.5 text-xs tracking-widest uppercase text-gold border border-gold/20 rounded-full bg-gold/5">
            {kw}
          </span>
        ))}
      </div>

      {/* What This Means */}
      <div className="p-8 bg-card border-l-2 border-gold/30 rounded-r-2xl">
        <span className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground font-bold block mb-4">What This Means For You</span>
        {natal.whatThisMeans.split('\n\n').map((p, i) => (
          <p key={i} className="text-muted-foreground text-sm leading-relaxed mb-4 last:mb-0">{p}</p>
        ))}
      </div>
    </motion.div>
  );
}
