const phases = [
  { symbol: "🌑", name: "New" },
  { symbol: "🌒", name: "Waxing Crescent" },
  { symbol: "🌓", name: "First Quarter" },
  { symbol: "🌔", name: "Waxing Gibbous" },
  { symbol: "🌕", name: "Full" },
  { symbol: "🌖", name: "Waning Gibbous" },
  { symbol: "🌗", name: "Last Quarter" },
  { symbol: "🌘", name: "Waning Crescent" },
];

export function MoonPhasesStrip() {
  return (
    <section className="py-16 border-y border-border/50 bg-secondary/20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center gap-8">
          {/* Label */}
          <span className="text-xs uppercase tracking-ultra text-muted-foreground font-medium">
            The Eight Phases
          </span>

          {/* Phases */}
          <div className="flex items-center justify-center gap-4 lg:gap-8 flex-wrap">
            {phases.map((phase, index) => (
              <div
                key={phase.name}
                className="group flex flex-col items-center gap-2 cursor-pointer"
              >
                {/* Circle with phase */}
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-border/50 flex items-center justify-center bg-card group-hover:border-accent/50 group-hover:bg-accent/5 transition-all duration-300">
                  <span className="text-lg lg:text-xl">{phase.symbol}</span>
                </div>

                {/* Name - hidden on mobile, shown on hover on desktop */}
                <span className="hidden lg:block text-[10px] uppercase tracking-widest text-muted-foreground/0 group-hover:text-muted-foreground transition-all duration-300 whitespace-nowrap">
                  {phase.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
