import michaelPortrait from "@/assets/michael-portrait-2.jpeg";
import moontunerLogo from "@/assets/moontuner-logo.png";

export function StartSessionCTA() {
  const tiers = [
    {
      label: "Tarot Reading",
      from: "$45",
      desc: "The cards don't predict your future. They clarify your present.",
      href: "/services",
    },
    {
      label: "Astro-Harmonic Analysis",
      from: "$197",
      desc: "Your birth chart read, interpreted, and translated into sound — with an algorithmic composition included.",
      href: "/services",
    },
    {
      label: "Original Piano Étude",
      from: "$800",
      desc: "A hand-penned solo piano piece composed from your chart, recorded and delivered within 2 weeks.",
      href: "/services",
    },
  ];

  return (
    <section id="session" className="py-24 border-t border-border/30">
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        <span className="system-label block mb-10">1:1 Sessions</span>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left: copy + portraits */}
          <div className="flex-1">
            <h2 className="font-serif text-4xl lg:text-5xl font-light text-foreground mb-6 leading-tight">
              Work with someone<br />
              <span className="italic">who reads the chart.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
              Tarot, birth chart analysis, and harmonic composition. 
              Clear, practical, and grounded in your actual situation.
            </p>

            {/* Portrait + logo */}
            <div className="flex gap-4 mb-8 items-center">
              <div className="w-28 h-36 rounded-xl overflow-hidden border border-border/40">
                <img
                  src={michaelPortrait}
                  alt="Michael Moon"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div className="w-28 h-36 rounded-xl border border-border/40 bg-card/50 flex items-center justify-center p-4">
                <img
                  src={moontunerLogo}
                  alt="Moontuner"
                  className="w-16 h-16 object-contain brightness-0 invert opacity-80"
                  loading="lazy"
                />
              </div>
            </div>

            <a
              href="/services"
              className="system-button inline-flex"
            >
              View All Sessions & Book
            </a>
          </div>

          {/* Right: tier cards */}
          <div className="w-full lg:w-80 space-y-3">
            {tiers.map((t) => (
              <a
                key={t.label}
                href={t.href}
                {...(t.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
