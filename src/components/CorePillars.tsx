import { ArrowRight } from "lucide-react";

const pillars = [
  {
    node: "Node 1",
    category: "The 26-Workbook Program",
    title: "Lunar Chaperone",
    description: "Continuous phase-based guidance from New Moon to Full Moon. A structured path for the silence between the sounds.",
    href: "/workbooks",
  },
  {
    node: "Node 2",
    category: "Methodology & Framework",
    title: "Phasecraft",
    description: "The Moontuner framework for phase-based living. The Five Tenets, Three Windows, and 8-Phase system.",
    href: "/method",
  },
  {
    node: "Node 3",
    category: "Philosophy & Declaration",
    title: "The Manifesto",
    description: "Seven declarations for those who move with the Moon. The why behind everything we practice.",
    href: "/manifesto",
  },
  {
    node: "Node 4",
    category: "The Complete System",
    title: "Philosophy Map",
    description: "Where Manifesto and Phasecraft merge, differ, and retain autonomy. The interconnection of all paths.",
    href: "/philosophy",
  },
];

export function CorePillars() {
  return (
    <section id="method" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 lg:mb-24">
          <span className="system-label block mb-6">The Architecture</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-[1.1]">
            Four Branches. <br />
            <span className="italic">One Frequency.</span>
          </h2>
        </div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <a
              key={pillar.title}
              href={pillar.href}
              className="group node-card relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Node Label */}
              <div className="flex items-center justify-between mb-6">
                <span className="system-label text-accent">{pillar.node}</span>
              </div>

              {/* Category */}
              <span className="system-label block mb-3">
                {pillar.category}
              </span>

              {/* Title */}
              <h3 className="font-serif text-2xl lg:text-3xl font-normal text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                {pillar.description}
              </p>

              {/* Link */}
              <div className="flex items-center gap-2 text-muted-foreground group-hover:text-accent transition-colors duration-300">
                <span className="text-sm tracking-wide">Explore Branch</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}