import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const offerings = [
  {
    number: "01",
    label: "New Moon",
    category: "The Lunar Chaperone",
    title: "26 Workbooks",
    description: "Your continuous companion from New Moon to Full Moon and back again. Body-based lunar wisdom designed to deepen with every cycle.",
    href: "/workbooks",
    quadrant: "top-left",
  },
  {
    number: "02",
    label: "First Quarter",
    category: "Phasecraft Framework",
    title: "Four Arcs",
    description: "The Moontuner methodology for phase-based living. Four Tenets, Four Arcs, and the complete 8-Phase architecture.",
    href: "/method",
    quadrant: "top-right",
  },
  {
    number: "03",
    label: "Full Moon",
    category: "Philosophy & Manifesto",
    title: "Core Tenets",
    description: "Declarations for those who move with the Moon. The why behind everything we practice.",
    href: "/manifesto",
    quadrant: "bottom-left",
  },
  {
    number: "04",
    label: "Last Quarter",
    category: "Personal Lunar Map",
    title: "Your Reports",
    description: "Calculate your natal lunar signature and generate your personal 12-month power-day arc.",
    href: "/lunar-reports",
    quadrant: "bottom-right",
  },
];

// Lunar quarter indicators for each card
function QuarterIndicator({ quadrant }: { quadrant: string }) {
  const getClipPath = () => {
    switch (quadrant) {
      case "top-left": return "polygon(0 0, 100% 0, 0 100%)";
      case "top-right": return "polygon(0 0, 100% 0, 100% 100%)";
      case "bottom-left": return "polygon(0 0, 0 100%, 100% 100%)";
      case "bottom-right": return "polygon(100% 0, 0 100%, 100% 100%)";
      default: return "none";
    }
  };

  return (
    <div className="absolute top-4 right-4 w-8 h-8">
      <div className="relative w-full h-full">
        {/* Outer circle */}
        <div className="absolute inset-0 rounded-full border border-muted-foreground/20" />
        {/* Illuminated quarter */}
        <motion.div
          className="absolute inset-0 rounded-full bg-accent/30"
          style={{ clipPath: getClipPath() }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </div>
  );
}

export function CorePillars() {
  return (
    <section id="method" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 lg:mb-24">
          <span className="system-label block mb-6">The Moontuner Offerings</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-[1.1]">
            Four Quarters of <br />
            <span className="italic">Time Slice Pie.</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-6 max-w-2xl">
            New Moon asks "What do I want?" First Quarter asks "What must I do?" 
            Full Moon asks "What do I see?" Last Quarter asks "What do I release?"
          </p>
        </div>

        {/* Central Moon Illustration */}
        <div className="relative mb-12 lg:mb-16 flex justify-center">
          <motion.div 
            className="w-24 h-24 lg:w-32 lg:h-32 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Moon circle with quarters */}
            <div className="absolute inset-0 rounded-full border border-border/50 overflow-hidden">
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                <div className="border-r border-b border-border/30 bg-accent/5" />
                <div className="border-b border-border/30 bg-accent/10" />
                <div className="border-r border-border/30 bg-accent/15" />
                <div className="bg-accent/10" />
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-accent/10 blur-xl -z-10" />
          </motion.div>
        </div>

        {/* Offerings Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {offerings.map((offering, index) => (
            <motion.a
              key={offering.title}
              href={offering.href}
              className="group node-card relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Quarter indicator */}
              <QuarterIndicator quadrant={offering.quadrant} />

              {/* Number Label */}
              <div className="flex items-center gap-4 mb-6">
                <span className="system-label text-accent">{offering.number}</span>
                <span className="w-8 h-px bg-border/50" />
                <span className="text-xs text-muted-foreground/60 tracking-wider uppercase">{offering.label}</span>
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
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}