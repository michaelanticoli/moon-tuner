import { Moon, Waves, Flame, Wind, Sparkles } from "lucide-react";

// The 8 Phases with their true meanings
const lunarPhases = [
  {
    phase: "New Moon",
    symbol: "🌑",
    keywords: "Initiate, seed, align, create",
    energy: "Pure potential. The slate is clean. Plant seeds in darkness.",
    bestFor: "Setting intentions, new beginnings, starting fresh",
    element: "Void"
  },
  {
    phase: "Crescent",
    symbol: "🌒",
    keywords: "Learn, prepare, curate, sense",
    energy: "Curiosity builds. Gather resources. Explore before committing.",
    bestFor: "Research, planning, gathering information",
    element: "Spark"
  },
  {
    phase: "First Quarter",
    symbol: "🌓",
    keywords: "Act, decide, confront, leap",
    energy: "Turning point. Actions now shape outcomes. Push through.",
    bestFor: "Taking action, overcoming obstacles, making decisions",
    element: "Fire"
  },
  {
    phase: "Gibbous",
    symbol: "🌔",
    keywords: "Perfect, tweak, refine, iterate",
    energy: "Fine-tune. Seek feedback. Trust the process of refinement.",
    bestFor: "Refining, adjusting, editing, perfecting",
    element: "Air"
  },
  {
    phase: "Full Moon",
    symbol: "🌕",
    keywords: "Harvest, celebrate, reveal, release",
    energy: "Maximum illumination. See clearly. Acknowledge what has blossomed.",
    bestFor: "Celebration, revelation, sharing, releasing",
    element: "Light"
  },
  {
    phase: "Disseminating",
    symbol: "🌖",
    keywords: "Share, teach, distribute, give",
    energy: "Wisdom flows outward. What you've learned wants to be shared.",
    bestFor: "Teaching, sharing insights, giving back",
    element: "Water"
  },
  {
    phase: "Last Quarter",
    symbol: "🌗",
    keywords: "Release, resolve, let go, complete",
    energy: "Clean up. Wrap up old work. Unsubscribe from what's done.",
    bestFor: "Releasing, resolving, decluttering, completing",
    element: "Earth"
  },
  {
    phase: "Balsamic",
    symbol: "🌘",
    keywords: "Rest, dream, restore, surrender",
    energy: "Deep rest before renewal. Nap, meditate, float. Trust the dark.",
    bestFor: "Rest, dreaming, restoration, preparation",
    element: "Ether"
  }
];

// The 12 Zodiac Flavors - each Moon sign lasts ~2.5 days
const zodiacFlavors = [
  { sign: "Aries", symbol: "♈", flavor: "Take initiative, start sprints, physical action", element: "Fire" },
  { sign: "Taurus", symbol: "♉", flavor: "Handle finances, indulge senses, slow down", element: "Earth" },
  { sign: "Gemini", symbol: "♊", flavor: "Write, network, take short trips, communicate", element: "Air" },
  { sign: "Cancer", symbol: "♋", flavor: "Nest, nurture, cook, connect deeply with home", element: "Water" },
  { sign: "Leo", symbol: "♌", flavor: "Showcase talents, play, celebrate, be seen", element: "Fire" },
  { sign: "Virgo", symbol: "♍", flavor: "Organize, establish health routines, edit, serve", element: "Earth" },
  { sign: "Libra", symbol: "♎", flavor: "Collaborate, beautify, resolve tensions, partner", element: "Air" },
  { sign: "Scorpio", symbol: "♏", flavor: "Research, purge, engage in deep transformation", element: "Water" },
  { sign: "Sagittarius", symbol: "♐", flavor: "Explore, learn, develop big-picture philosophy", element: "Fire" },
  { sign: "Capricorn", symbol: "♑", flavor: "Strategize, build foundations, set long-term goals", element: "Earth" },
  { sign: "Aquarius", symbol: "♒", flavor: "Innovate, connect groups, work with technology", element: "Air" },
  { sign: "Pisces", symbol: "♓", flavor: "Create, meditate, daydream, dissolve boundaries", element: "Water" }
];

// The Four Elemental Cycles
const elementalCycles = [
  {
    element: "Earth",
    icon: Sparkles,
    title: "Grounding & Manifestation",
    description: "Focus on stability, practicality, and bringing intentions into form. Especially powerful for career and physical goals.",
    signs: "Taurus, Virgo, Capricorn"
  },
  {
    element: "Fire",
    icon: Flame,
    title: "Activation & Expression",
    description: "Enhance confidence, creativity, and passionate action. Ideal for projects requiring courage and bold moves.",
    signs: "Aries, Leo, Sagittarius"
  },
  {
    element: "Air",
    icon: Wind,
    title: "Vision & Communication",
    description: "Support clarity, connection, and intellectual understanding. Perfect for writing, teaching, and relationship work.",
    signs: "Gemini, Libra, Aquarius"
  },
  {
    element: "Water",
    icon: Waves,
    title: "Feeling & Integration",
    description: "Deepen emotional awareness and intuitive knowing. Excellent for healing, artistic expression, and spiritual growth.",
    signs: "Cancer, Scorpio, Pisces"
  }
];

export function PhilosophySection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <div className="mb-16 lg:mb-24">
          <span className="system-label block mb-6">The Complete System</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-[1.1] max-w-3xl">
            8 Phases. 12 Signs. <br />
            <span className="italic">Infinite Combinations.</span>
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl leading-relaxed">
            The Moon moves through 8 phases every 29.5 days. Within that cycle, it transits all 12 zodiac signs—each lasting roughly 2.5 days. 
            This creates a living matrix of energy: <strong className="text-foreground">8 × 12 = 96 unique combinations</strong> every lunar month.
          </p>
        </div>

        {/* The 8 Phases Grid */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Moon className="w-5 h-5 text-accent" />
            <span className="system-label text-accent">The 8 Phases</span>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {lunarPhases.map((phase) => (
              <div
                key={phase.phase}
                className="node-card group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{phase.symbol}</span>
                  <div>
                    <h3 className="font-serif text-lg text-foreground">{phase.phase}</h3>
                    <span className="system-label text-accent/60">{phase.element}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {phase.energy}
                </p>
                
                <div className="text-xs">
                  <span className="text-accent/70 uppercase tracking-wide">Keywords: </span>
                  <span className="text-muted-foreground/70 italic">{phase.keywords}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Zodiac Flavor Layer */}
        <div className="mb-20 pt-16 border-t border-border/30">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="system-label text-accent">The Zodiac Layer</span>
          </div>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Every 2.5 days, the Moon changes zodiac sign—adding a <strong className="text-foreground">flavor</strong> to the current phase. 
            A New Moon in Aries initiates with fire; a New Moon in Pisces initiates with dreams.
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {zodiacFlavors.map((zodiac) => (
              <div
                key={zodiac.sign}
                className="p-4 rounded-lg border border-border/30 bg-card/30 hover:border-accent/30 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{zodiac.symbol}</span>
                  <span className="font-serif text-foreground">{zodiac.sign}</span>
                </div>
                <p className="text-muted-foreground/70 text-xs leading-relaxed">
                  {zodiac.flavor}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* The Four Elemental Cycles */}
        <div className="pt-16 border-t border-border/30">
          <div className="flex items-center gap-3 mb-4">
            <Flame className="w-5 h-5 text-accent" />
            <span className="system-label text-accent">The Elemental Cycles</span>
          </div>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Each workbook falls into one of four elemental categories based on its zodiac journey. 
            The element shapes the entire character of the 14-day practice.
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {elementalCycles.map((cycle) => (
              <div
                key={cycle.element}
                className="node-card"
              >
                <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-4">
                  <cycle.icon className="w-4 h-4 text-accent" />
                </div>
                <h3 className="font-serif text-lg text-foreground mb-1">{cycle.element}</h3>
                <span className="system-label text-accent/60 block mb-3">{cycle.title}</span>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {cycle.description}
                </p>
                <span className="text-xs text-muted-foreground/50 italic">
                  {cycle.signs}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* The Abandonment Problem */}
        <div className="mt-20 pt-16 border-t border-border/30">
          <div className="max-w-3xl mx-auto text-center">
            <span className="system-label block mb-6 text-accent">Why This Matters</span>
            <h3 className="font-serif text-2xl lg:text-3xl text-foreground mb-6">
              The Abandonment Problem
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Big astrology floods your feed with New Moon and Full Moon content—then goes silent for the <strong className="text-foreground">25+ days in between</strong>. 
              You set beautiful intentions... then what? You gain powerful insights at the Full Moon... then what?
            </p>
            <div className="inline-block px-6 py-4 bg-accent/5 border border-accent/20 rounded-lg">
              <p className="text-foreground font-serif italic text-lg">
                "When Big Astrology Goes Silent, We Stay By Your Side"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
