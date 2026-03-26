import { useMoonPhase } from "@/hooks/useMoonPhase";
import { LunarBackground } from "./LunarBackground";
import { MoonPhaseGlyph, phaseNameToKey } from "./MoonPhaseGlyph";

export function StartHeroSection() {
  const moonPhase = useMoonPhase();

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      <LunarBackground />
      <div className="relative z-10 container mx-auto px-6 lg:px-12 max-w-4xl">
        {/* Live phase badge */}
        <div className="opacity-0 animate-fade-in-up mb-6 flex items-center gap-4">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm">
            <MoonPhaseGlyph phase={moonPhase.astronomical.phaseKey as any} size="sm" className="text-accent" />
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              {moonPhase.astronomical.phaseName} · {moonPhase.astrological.frequencyHz}Hz
            </span>
          </div>
        </div>

        {/* Headline */}
        <div className="opacity-0 animate-fade-in-up delay-100 mb-8">
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extralight text-foreground leading-[1.05]">
            Find out what phase<br />
            <span className="font-serif italic font-normal">you're in right now.</span>
          </h1>
        </div>

        {/* Subhead */}
        <div className="opacity-0 animate-fade-in-up delay-200 mb-12 max-w-xl">
          <p className="text-lg text-muted-foreground leading-relaxed">
            The Moon doesn't control you — but it does describe you. 
            Three tools, one clear picture of where you are in the cycle.
          </p>
        </div>

        {/* Three actions */}
        <div className="opacity-0 animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4">
          <a href="#moon-tool" className="system-button">
            Today's Phase
          </a>
          <a href="#report" className="inline-flex items-center justify-center h-11 px-8 text-sm font-medium tracking-wider border border-border text-foreground hover:border-accent hover:text-accent transition-all duration-300 rounded-md">
            Get Your Lunar Map · $17
          </a>
          <a href="#session" className="inline-flex items-center justify-center h-11 px-8 text-sm font-medium tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-300">
            Book a Session →
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in delay-600">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="system-label">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
        </div>
      </div>
    </section>
  );
}
