const quotes = [
  {
    text: "This is a pause. Use it.",
    context: "New Moon",
  },
  {
    text: "Notice the interval.",
    context: "Waxing",
  },
  {
    text: "What are you tuning toward?",
    context: "Full Moon",
  },
  {
    text: "Alignment is practiced, not achieved.",
    context: "Waning",
  },
];

const principles = [
  {
    label: "The Void Window",
    description: "Strategic rest when the moon is absent.",
  },
  {
    label: "The Waxing Sprint",
    description: "High-velocity execution as illumination grows.",
  },
  {
    label: "The Fullness Audit",
    description: "Critical assessment at peak resonance.",
  },
];

export function PhilosophySection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <div className="mb-16 lg:mb-24">
          <span className="system-label block mb-6">Branch II: Phasecraft</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-[1.1] max-w-2xl">
            The Logic <br />
            <span className="italic">of Manifestation.</span>
          </h2>
        </div>

        {/* Philosophy Description */}
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-lg leading-relaxed">
            Phasecraft is not about "wishing." It is a methodology designed to synchronize 
            your high-output windows with the lunar expansion.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="node-card"
            >
              <h3 className="font-serif text-xl text-foreground mb-3">
                {principle.label}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <button className="system-button">
            Phasecraft System
          </button>
        </div>

        {/* Quotes Section */}
        <div className="mt-24 pt-16 border-t border-border/30">
          <span className="system-label block mb-12 text-center">Core Tenets</span>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {quotes.map((quote, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-lg border border-border/30 bg-card/50 hover:border-accent/30 transition-all duration-500"
              >
                {/* Quote Mark */}
                <div className="absolute -top-2 left-4">
                  <span className="text-2xl text-accent/40 font-serif">"</span>
                </div>

                {/* Quote Text */}
                <p className="font-serif text-lg text-foreground leading-relaxed mb-4 italic">
                  {quote.text}
                </p>

                {/* Context */}
                <span className="system-label text-accent">
                  {quote.context}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}