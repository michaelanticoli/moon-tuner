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
    <section className="py-12 border-y border-border/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center gap-8">
          {/* Label */}
          <span className="system-label">
            The Eight Phases
          </span>

          {/* Phases */}
          <div className="flex items-center justify-center gap-4 lg:gap-8 flex-wrap">
            {phases.map((phase, index) => (
              <div
                key={phase.name}
                className="group flex flex-col items-center gap-3 cursor-pointer"
              >
                {/* Circle with phase */}
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-border flex items-center justify-center bg-card group-hover:border-accent/50 group-hover:bg-accent/10 transition-all duration-300">
                  <span className="text-lg lg:text-xl">{phase.symbol}</span>
                </div>

                {/* Name */}
                <span className="hidden lg:block text-[10px] font-mono uppercase tracking-widest text-muted-foreground/0 group-hover:text-muted-foreground transition-all duration-300 whitespace-nowrap">
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