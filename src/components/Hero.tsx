import { useMoonPhase } from "@/hooks/useMoonPhase";
import { Link } from "react-router-dom";
import { LunarBackground } from "./LunarBackground";

export function Hero() {
  const moonPhase = useMoonPhase();

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      {/* Animated lunar background */}
      <LunarBackground />
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* System Label */}
        <div className="opacity-0 animate-fade-in-up mb-8">
          <span className="system-label">
            Phase-Based Living System
          </span>
        </div>

        {/* Headline */}
        <div className="space-y-4 opacity-0 animate-fade-in-up delay-100 mb-12">
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal text-foreground leading-[1.05]">
            Don't Blame The Moon. <br />
            <span className="italic">Change Your Tune.</span>
          </h1>
        </div>

        {/* CTA + Live Phase */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 opacity-0 animate-fade-in-up delay-200 mb-16">
          <Link to="/lunar-system" className="system-button">
            Sync With The Cycle
          </Link>
          
          <div className="flex items-center gap-4">
            <span className="system-label">Current Phase</span>
            <div className="flex items-center gap-3">
              <span className="w-8 h-0.5 bg-accent" />
              <span className="font-sans text-sm text-foreground tracking-[0.1em]">
                {moonPhase.astronomical.phaseName.toUpperCase()} · {moonPhase.astrological.frequencyHz}HZ
              </span>
            </div>
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