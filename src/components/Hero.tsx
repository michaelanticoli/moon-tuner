import { Button } from "@/components/ui/button";
import { MoonPhaseIndicator } from "@/components/MoonPhaseIndicator";
import { useMoonPhase } from "@/hooks/useMoonPhase";

export function Hero() {
  const moonPhase = useMoonPhase();

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* System Label */}
        <div className="opacity-0 animate-fade-in-up mb-8">
          <span className="system-label">
            Integrated Lunar Operating System
          </span>
        </div>

        {/* Headline */}
        <div className="space-y-4 opacity-0 animate-fade-in-up delay-100 mb-12">
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal text-foreground leading-[1.05]">
            Align with <br />
            <span className="italic">The Source.</span>
          </h1>
        </div>

        {/* CTA + Frequency */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 opacity-0 animate-fade-in-up delay-200 mb-16">
          <button className="system-button">
            Initialize System
          </button>
          
          <div className="flex items-center gap-4">
            <span className="system-label">Current Frequency</span>
            <div className="flex items-center gap-3">
              <span className="w-8 h-0.5 bg-accent" />
              <span className="font-sans text-sm text-foreground tracking-[0.1em]">
                {moonPhase.astrological.frequencyHz}HZ RESONANCE
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-line opacity-0 animate-fade-in delay-300 mb-12" />

        {/* System Status Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 opacity-0 animate-fade-in-up delay-400">
          <div className="space-y-2">
            <span className="system-label">Ecosystem</span>
            <p className="font-sans text-sm text-foreground">4 Pillars</p>
          </div>
          <div className="space-y-2">
            <span className="system-label">Methodology</span>
            <p className="font-sans text-sm text-foreground">Phasecraft</p>
          </div>
          <div className="space-y-2">
            <span className="system-label">Data Node</span>
            <p className="font-sans text-sm text-foreground">Lunar Cipher</p>
          </div>
          <div className="space-y-2">
            <span className="system-label">Status</span>
            <p className="font-sans text-sm text-accent">Synced</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in delay-600">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="system-label">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
        </div>
      </div>
    </section>
  );
}