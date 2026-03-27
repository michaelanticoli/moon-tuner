export function StartSessionCTA() {
  const SQUARE_URL = "https://square.site/book/LT09Q7KSGAF98/moontuner";

  const tiers = [
    {
      label: "Tarot Reading",
      from: "$45",
      desc: "The cards don't predict your future. They clarify your present.",
    },
    {
      label: "Astro-Harmonic Analysis",
      from: "$195",
      desc: "Your birth chart read, interpreted, and translated into sound.",
    },
    {
      label: "Custom Composition",
      from: "$800",
      desc: "An original piano piece composed from your natal chart data.",
    },
  ];

  return (
    <section id="session" className="py-24 border-t border-border/30">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <span className="system-label block mb-10">1:1 Sessions</span>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1">
            <h2 className="font-serif text-4xl lg:text-5xl font-light text-foreground mb-6 leading-tight">
              Work with someone<br />
              <span className="italic">who reads the chart.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
              Tarot, birth chart analysis, and harmonic composition. 
              Clear, practical, and grounded in your actual situation.
            </p>
            <a
              href="/services"
              className="system-button inline-flex"
            >
              View All Sessions & Book
            </a>
          </div>

          <div className="w-full lg:w-80 space-y-3">
            {tiers.map((t) => (
              <a
                key={t.label}
              href="/services"
                className="block p-5 bg-card border border-border rounded-xl hover:border-accent/50 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                    {t.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    from <span className="text-sm font-bold text-accent">{t.from}</span>
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
