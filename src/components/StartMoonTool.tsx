import { useMoonPhase } from "@/hooks/useMoonPhase";
import { MoonPhaseGlyph, phaseNameToKey } from "./MoonPhaseGlyph";
import { Link } from "react-router-dom";

const PHASE_SUMMARY: Record<string, { tag: string; line: string }> = {
  "new": { tag: "VOID", line: "Pure potential. Set intentions. The cycle resets." },
  "waxing-crescent": { tag: "SPARK", line: "Curiosity builds. Follow what pulls you forward." },
  "first-quarter": { tag: "FIRE", line: "Decision point. Commit or retreat — no middle ground." },
  "waxing-gibbous": { tag: "AIR", line: "Refine and adjust. Almost there — precision matters." },
  "full": { tag: "LIGHT", line: "Maximum illumination. What was hidden is now visible." },
  "waning-gibbous": { tag: "WATER", line: "Share what you've learned. Wisdom flows outward." },
  "last-quarter": { tag: "EARTH", line: "Release and resolve. What no longer serves, compost it." },
  "waning-crescent": { tag: "ETHER", line: "Rest and restore. The body knows how to renew." },
};

export function StartMoonTool() {
  const moonPhase = useMoonPhase();
  const key = phaseNameToKey[moonPhase.astronomical.phaseName] ?? "new";
  const summary = PHASE_SUMMARY[key] || { tag: "", line: "" };

  return (
    <section id="moon-tool" className="py-24 border-t border-border/30">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <span className="system-label block mb-10">Right Now</span>

        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
          {/* Glyph */}
          <div className="w-32 h-32 rounded-full border border-border bg-card flex items-center justify-center shrink-0">
            <MoonPhaseGlyph phase={key as any} size={64} className="text-accent" />
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
              <h2 className="font-serif text-4xl lg:text-5xl font-light text-foreground">
                {moonPhase.astronomical.phaseName}
              </h2>
              <span className="text-xs font-bold tracking-[0.3em] text-accent uppercase border border-accent/30 px-2 py-0.5 rounded-full">
                {summary.tag}
              </span>
            </div>
            <p className="text-muted-foreground text-lg mb-2">
              {moonPhase.astronomical.illumination}% illuminated · {moonPhase.astrological.frequencyHz}Hz
            </p>
            <p className="text-foreground text-xl font-light leading-relaxed mb-8 max-w-xl">
              {summary.line}
            </p>
            <Link
              to="/moon-phase-today"
              className="inline-flex items-center text-sm text-accent tracking-wider hover:underline underline-offset-4 gap-2"
            >
              See full phase guidance →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
