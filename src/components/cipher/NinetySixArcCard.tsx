// 96-Arc Cell card — shows the user where TODAY lives inside the
// full Lunar System lattice, with the matching Chaperone workbook
// + Quantumelodic resonance (Hz, chakra, body zone).

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, BookOpen, ArrowRight, Music2 } from "lucide-react";
import { getCellForPhaseSign } from "@/lib/ninetySixArc";

interface Props {
  phaseName: string;
  signName: string;
}

export function NinetySixArcCard({ phaseName, signName }: Props) {
  const cell = getCellForPhaseSign(phaseName, signName);
  if (!cell) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 border border-accent/20 rounded-2xl overflow-hidden"
    >
      {/* Header strip */}
      <div className="bg-gradient-to-r from-accent/10 via-accent/5 to-transparent px-5 py-3 flex items-center justify-between border-b border-accent/15">
        <div className="flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-accent" />
          <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-accent">
            Lunar System · Cell {cell.cellNumber} of 96
          </span>
        </div>
        <span className="text-[9px] uppercase tracking-widest text-muted-foreground">
          {cell.arc.half === "waxing" ? "Waxing Arc" : "Waning Arc"}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4 bg-card/40">
        <div>
          <h4 className="text-base md:text-lg font-serif text-foreground leading-snug">
            {cell.phase} <span className="text-muted-foreground italic">in</span> {cell.sign}
          </h4>
          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
            {cell.arc.intent}
          </p>
        </div>

        {/* Resonance row — Quantumelodic layer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
          {cell.resonance.hz && (
            <div className="bg-muted/30 border border-border rounded-lg p-2.5">
              <div className="flex items-center gap-1 text-[8px] uppercase tracking-widest text-muted-foreground mb-1">
                <Music2 className="w-2.5 h-2.5" />
                <span>Hz</span>
              </div>
              <span className="text-sm font-bold text-foreground">{cell.resonance.hz}</span>
            </div>
          )}
          {cell.resonance.chakra && (
            <div className="bg-muted/30 border border-border rounded-lg p-2.5">
              <span className="text-[8px] uppercase tracking-widest text-muted-foreground block mb-1">Chakra</span>
              <span className="text-xs font-bold text-foreground">{cell.resonance.chakra}</span>
            </div>
          )}
          {cell.resonance.bodyZone && (
            <div className="bg-muted/30 border border-border rounded-lg p-2.5">
              <span className="text-[8px] uppercase tracking-widest text-muted-foreground block mb-1">Body Zone</span>
              <span className="text-xs font-bold text-foreground leading-tight">{cell.resonance.bodyZone}</span>
            </div>
          )}
          {cell.resonance.element && (
            <div className="bg-muted/30 border border-border rounded-lg p-2.5">
              <span className="text-[8px] uppercase tracking-widest text-muted-foreground block mb-1">Element</span>
              <span className="text-xs font-bold text-foreground">{cell.resonance.element}</span>
            </div>
          )}
        </div>

        {/* Workbook bridge */}
        <Link
          to={cell.arc.workbookHref}
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-accent hover:text-accent/80 transition-colors pt-1"
        >
          <BookOpen className="w-3 h-3" />
          <span>Open the matching Chaperone arc</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </motion.div>
  );
}
