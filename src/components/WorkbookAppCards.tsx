import { ArrowUpRight } from "lucide-react";

const APPS = [
  {
    tag: "Main program",
    title: "Lunar Workbook Program",
    desc:
      "The full 26-workbook Chaperone build — every half-cycle, live to the current phase, with the 14-day arc and practice logs. This is the core program.",
    href: "https://lunar-chaperone.lovable.app",
    accent: true,
  },
  {
    tag: "Personalized add-on",
    title: "Persona Edition",
    desc:
      "Your birth chart layered over the same cycle: natal placements, instrumentation, and a compendium written to your own signature rather than the archetype.",
    href: "https://persona-edition.lovable.app",
    accent: false,
  },
];

export function WorkbookAppCards({ className = "" }: { className?: string }) {
  return (
    <section className={`container mx-auto px-6 lg:px-12 py-16 lg:py-24 border-t border-border ${className}`}>
      <span className="system-label text-muted-foreground block mb-4">
        Open the workbooks
      </span>
      <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-10 max-w-2xl">
        Two live builds. One cycle.
      </h2>

      <div className="grid gap-6 md:grid-cols-2 max-w-5xl">
        {APPS.map((app) => (
          <a
            key={app.href}
            href={app.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`node-card group block transition-colors ${
              app.accent
                ? "border-accent/30 hover:border-accent/60"
                : "hover:border-foreground/30"
            }`}
          >
            <span className="text-[10px] uppercase tracking-[0.22em] text-accent">
              {app.tag}
            </span>
            <h3 className="font-serif text-2xl text-foreground mt-3 mb-3 flex items-center gap-2">
              {app.title}
              <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{app.desc}</p>
            <span className="mt-5 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground/60">
              Opens in a new tab
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
