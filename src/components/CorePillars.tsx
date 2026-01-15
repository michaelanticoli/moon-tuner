import { ArrowRight } from "lucide-react";

const pillars = [
  {
    channel: "Channel I",
    wavelength: "Visible Spectrum",
    category: "The 26-Workbook Program",
    title: "Lunar Chaperone",
    description: "Continuous phase-based guidance from New Moon to Full Moon. A structured path for the silence between the sounds.",
    href: "/workbooks",
  },
  {
    channel: "Channel II",
    wavelength: "Prismatic Layer",
    category: "Methodology & Framework",
    title: "Phasecraft",
    description: "The Moontuner framework for phase-based living. The Five Tenets, Three Windows, and 8-Phase system.",
    href: "/method",
  },
  {
    channel: "Channel III",
    wavelength: "Deep Radiance",
    category: "Philosophy & Declaration",
    title: "The Manifesto",
    description: "Seven declarations for those who move with the Moon. The why behind everything we practice.",
    href: "/manifesto",
  },
  {
    channel: "Channel IV",
    wavelength: "Full Spectrum",
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
          <span className="system-label block mb-6">The Illumination Architecture</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-[1.1]">
            Four Spectral Channels. <br />
            <span className="italic">One Source Radiance.</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-6 max-w-2xl">
            The Moon reflects the Sun's nuclear fusion—photons scattered across 93 million miles, 
            bent through atmosphere, arriving as silver light. Navigate the spectrum.
          </p>
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
              {/* Channel Label */}
              <div className="flex items-center justify-between mb-6">
                <span className="system-label text-accent">{pillar.channel}</span>
                <span className="text-xs text-muted-foreground/60 tracking-wider">{pillar.wavelength}</span>
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
                <span className="text-sm tracking-wide">Enter Channel</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}