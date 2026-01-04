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

export function PhilosophySection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-muted/50 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <span className="inline-block text-xs uppercase tracking-ultra text-accent font-medium mb-4">
            Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground mb-6">
            The Moontuner Ethos
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Gentle guidance, not instruction. Calibration, not correction. 
            The moon is not romanticized—it is functional.
          </p>
        </div>

        {/* Quotes Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {quotes.map((quote, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-lg border border-border/30 bg-card/50 hover:bg-card hover:border-accent/30 transition-all duration-500"
            >
              {/* Quote Mark */}
              <div className="absolute -top-3 left-6">
                <span className="text-4xl text-accent/30 font-serif">"</span>
              </div>

              {/* Quote Text */}
              <p className="font-serif text-lg lg:text-xl text-foreground leading-relaxed mb-4 italic">
                {quote.text}
              </p>

              {/* Context */}
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                {quote.context}
              </span>
            </div>
          ))}
        </div>

        {/* Guiding Principle */}
        <div className="mt-20 max-w-2xl mx-auto text-center">
          <div className="inline-block p-8 lg:p-12 rounded-2xl border border-border/50 bg-secondary/30">
            <p className="text-xs uppercase tracking-ultra text-accent font-medium mb-4">
              North Star
            </p>
            <p className="font-serif text-xl lg:text-2xl text-foreground leading-relaxed">
              MOONTUNER exists to normalize cyclical living—quietly, intelligently, 
              and with respect for the individual's agency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
