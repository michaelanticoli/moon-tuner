import { ArrowRight } from "lucide-react";

const pillars = [
  {
    number: "01",
    title: "Align",
    description: "Attune your inner rhythms to natural cycles. Find your resonance without dogma or prediction.",
  },
  {
    number: "02", 
    title: "Track",
    description: "Follow intention, energy, and momentum through each phase. Awareness over optimization.",
  },
  {
    number: "03",
    title: "Cultivate",
    description: "Practice calibration, not correction. Build habits that move with you, not against you.",
  },
  {
    number: "04",
    title: "Integrate",
    description: "Transform awareness into embodied practice. From passive consumption to active living.",
  },
];

export function CorePillars() {
  return (
    <section id="method" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 lg:mb-24">
          <span className="inline-block text-xs uppercase tracking-ultra text-accent font-medium mb-4">
            The Phasecraft Method
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground mb-6">
            Four movements through the cycle
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A modern, minimalist system for cyclical awareness—where lunar phases 
            function like tempo markings rather than fate.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className="group relative bg-card border border-border/50 rounded-lg p-8 hover:border-accent/50 transition-all duration-500 hover:shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Number */}
              <span className="block text-xs text-accent font-medium tracking-widest mb-4">
                {pillar.number}
              </span>

              {/* Title */}
              <h3 className="font-serif text-2xl font-medium text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {pillar.description}
              </p>

              {/* Arrow */}
              <ArrowRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
