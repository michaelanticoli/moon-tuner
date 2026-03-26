export function StartSessionCTA() {
  const SQUARE_URL = "https://square.site/book/LT09Q7KSGAF98/moontuner";

  const sessions = [
    {
      title: "Personal Harmonic Profile",
      price: "$99",
      duration: "90 min",
      desc: "A full birth chart reading mapped to lunar cycles and life patterns.",
    },
    {
      title: "Harmonic Blueprint Session",
      price: "$75",
      duration: "60 min",
      desc: "Focused on one theme: career, relationships, or a current decision.",
    },
    {
      title: "Decision Timing Session",
      price: "$25",
      duration: "20 min",
      desc: "Is now the right time? A quick read on timing and phase alignment.",
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
              Personalized sessions that combine birth chart analysis with lunar cycle timing. 
              Clear, practical, and grounded in your actual situation.
            </p>
            <a
              href={SQUARE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="system-button inline-flex"
            >
              View All Sessions & Book
            </a>
          </div>

          <div className="w-full lg:w-80 space-y-3">
            {sessions.map((s) => (
              <a
                key={s.title}
                href={SQUARE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-5 bg-card border border-border rounded-xl hover:border-accent/50 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                    {s.title}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-muted-foreground tracking-wider">{s.duration}</span>
                    <span className="text-sm font-bold text-accent">{s.price}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
