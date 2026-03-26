const deeper = [
  {
    label: "Phasecraft",
    href: "/method",
    desc: "The 14-day arc methodology. Every day of the cycle has a job.",
  },
  {
    label: "Lunar System",
    href: "/lunar-system",
    desc: "8 phases × 12 signs. 96 unique combinations explained.",
  },
  {
    label: "The School",
    href: "/school",
    desc: "Structured curriculum from foundations to full fluency.",
  },
  {
    label: "Chaperones",
    href: "/workbooks",
    desc: "26 workbooks walking beside you through every archetypal journey.",
  },
  {
    label: "Cipher",
    href: "/lunar-cipher",
    desc: "Daily lunar intelligence: phase, sign, aspects, VOC periods.",
  },
  {
    label: "Manifesto",
    href: "/manifesto",
    desc: "Why this framework exists and what it stands for.",
  },
];

export function StartGoDeeper() {
  return (
    <section className="py-24 border-t border-border/30 bg-card/20">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <div className="flex flex-col md:flex-row gap-4 items-baseline mb-12">
          <span className="system-label">Go Deeper</span>
          <p className="text-muted-foreground text-sm">
            For those who want the full doctrine.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {deeper.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="p-6 bg-card border border-border/50 rounded-xl hover:border-accent/40 hover:bg-card/80 transition-all duration-300 group"
            >
              <h3 className="text-sm font-medium tracking-widest uppercase text-foreground group-hover:text-accent transition-colors mb-2">
                {item.label}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
