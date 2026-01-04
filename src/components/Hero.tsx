import { Button } from "@/components/ui/button";
import { MoonPhaseIndicator } from "@/components/MoonPhaseIndicator";
import moonHero from "@/assets/moon-hero.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={moonHero}
          alt="Luminous moon in night sky"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Eyebrow */}
            <div className="opacity-0 animate-fade-in-up">
              <span className="inline-block text-xs uppercase tracking-ultra text-accent font-medium border border-accent/30 px-4 py-2 rounded-full">
                A Lunar Alignment System
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4 opacity-0 animate-fade-in-up delay-100">
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight text-foreground leading-[0.95]">
                Live in Phase.
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Moontuner is a lunar alignment system for tracking intention, energy, 
                and momentum through the Moon's cycles.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0 animate-fade-in-up delay-200">
              <Button variant="hero" size="xl">
                Begin Lunar Alignment
              </Button>
              <Button variant="hero-outline" size="xl">
                Listen to the Moon
              </Button>
            </div>

            {/* Tagline */}
            <p className="text-sm text-muted-foreground/70 italic opacity-0 animate-fade-in delay-500">
              "The moon is not telling you what to do. It is helping you hear yourself more clearly."
            </p>
          </div>

          {/* Right Column - Moon Phase */}
          <div className="flex justify-center lg:justify-end opacity-0 animate-fade-in delay-300">
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute inset-0 -m-8 border border-border/30 rounded-full animate-pulse-soft" />
              <div className="absolute inset-0 -m-16 border border-border/20 rounded-full" />
              
              <MoonPhaseIndicator />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in delay-600">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
        </div>
      </div>
    </section>
  );
}
