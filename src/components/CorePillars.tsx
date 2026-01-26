import { ArrowRight } from "lucide-react";

const offerings = [
  {
    number: "01",
    label: "The Guide",
    category: "The Lunar Chaperone",
    title: "26 Workbooks",
    description: "Your continuous companion from New Moon to Full Moon and back again. Body-based lunar wisdom designed to deepen with every cycle.",
    href: "/workbooks",
  },
  {
    number: "02",
    label: "The Method",
    category: "Phasecraft Framework",
    title: "Four Arcs",
    description: "The Moontuner methodology for phase-based living. Four Tenets, Four Arcs, and the complete 8-Phase architecture.",
    href: "/method",
  },
  {
    number: "03",
    label: "The Declaration",
    category: "Philosophy & Manifesto",
    title: "Core Tenets",
    description: "Declarations for those who move with the Moon. The why behind everything we practice.",
    href: "/manifesto",
  },
  {
    number: "04",
    label: "The Interface",
    category: "Personal Lunar Map",
    title: "Your Reports",
    description: "Calculate your natal lunar signature and generate your personal 12-month power-day arc.",
    href: "/lunar-reports",
  },
];

export function CorePillars() {
  return (
    <section id="method" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 lg:mb-24">
          <span className="system-label block mb-6">The Moontuner Offerings</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-[1.1]">
            Four Pathways. <br />
            <span className="italic">One Reflected Light.</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-6 max-w-2xl">
            The Moon reflects the Sun across 238,900 miles—a celestial clock cycling every 29.5 days. 
            These are your systems for reading its rhythm.
          </p>
        </div>

        {/* Offerings Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {offerings.map((offering, index) => (
            <a
              key={offering.title}
              href={offering.href}
              className="group node-card relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Number Label */}
              <div className="flex items-center justify-between mb-6">
                <span className="system-label text-accent">{offering.number}</span>
                <span className="text-xs text-muted-foreground/60 tracking-wider">{offering.label}</span>
              </div>

              {/* Category */}
              <span className="system-label block mb-3">
                {offering.category}
              </span>

              {/* Title */}
              <h3 className="font-serif text-2xl lg:text-3xl font-normal text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                {offering.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                {offering.description}
              </p>

              {/* Link */}
              <div className="flex items-center gap-2 text-muted-foreground group-hover:text-accent transition-colors duration-300">
                <span className="text-sm tracking-wide">Explore</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}