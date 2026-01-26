import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Circle, Moon, Compass, Waves, Zap, Eye, Shield, Flame } from "lucide-react";
import { Link } from "react-router-dom";

const phases = [
  {
    name: "New Moon",
    posture: "Stillness & Intention",
    misalignment: "Forcing action before clarity arrives",
    relationship: "Set quiet intentions. Plant seeds in darkness.",
    element: "Void"
  },
  {
    name: "Waxing Crescent",
    posture: "Emergence & Commitment",
    misalignment: "Doubting early momentum",
    relationship: "Take the first step. Trust the direction.",
    element: "Spark"
  },
  {
    name: "First Quarter",
    posture: "Action & Decision",
    misalignment: "Avoiding necessary choices",
    relationship: "Make decisions. Push through resistance.",
    element: "Fire"
  },
  {
    name: "Waxing Gibbous",
    posture: "Refinement & Patience",
    misalignment: "Impatience with the process",
    relationship: "Adjust and refine. Trust the timing.",
    element: "Air"
  },
  {
    name: "Full Moon",
    posture: "Illumination & Celebration",
    misalignment: "Ignoring what's revealed",
    relationship: "See clearly. Acknowledge progress.",
    element: "Light"
  },
  {
    name: "Waning Gibbous",
    posture: "Gratitude & Teaching",
    misalignment: "Hoarding wisdom",
    relationship: "Share what you've learned. Give back.",
    element: "Water"
  },
  {
    name: "Last Quarter",
    posture: "Release & Forgiveness",
    misalignment: "Clinging to what's complete",
    relationship: "Let go of what no longer serves.",
    element: "Earth"
  },
  {
    name: "Waning Crescent",
    posture: "Rest & Surrender",
    misalignment: "Pushing through exhaustion",
    relationship: "Rest deeply. Prepare for renewal.",
    element: "Ether"
  }
];

// The Four Tenets of Phasecraft - Grounded in lunar truth
const phasecraftTenets = [
  {
    number: "I",
    title: "The Tenet of Tempo",
    declaration: "There is a time for every action, and every action has its time.",
    practice: "Before beginning any significant endeavor, consult the phase. Not for permission, but for partnership.",
    icon: Waves
  },
  {
    number: "II",
    title: "The Tenet of Posture",
    declaration: "Each phase demands its own stance. Confusion arises when we bring the wrong posture to the present moment.",
    practice: "Learn the posture of each phase. Practice holding the correct stance even when habit pulls you elsewhere.",
    icon: Shield
  },
  {
    number: "III",
    title: "The Tenet of Return",
    declaration: "Time spirals. You will pass through each phase again and again, each return at a higher octave.",
    practice: "Keep records. Notice patterns. Your relationship with each phase evolves over years, not days.",
    icon: Circle
  },
  {
    number: "IV",
    title: "The Tenet of Integration",
    declaration: "A complete arc is fourteen days—not one. Initiation is only the beginning; integration takes time.",
    practice: "Commit to the full arc. Show up not just at New or Full, but every day between.",
    icon: Moon
  }
];

// The Four Arcs - The complete lunar cycle mapped
const fourArcs = [
  {
    name: "The Seed Arc",
    phase: "New Moon → First Quarter",
    duration: "~7 days",
    element: "Earth",
    theme: "Planting",
    description: "The dark room where new images develop. Intention solidifies into commitment. Energy moves from stillness toward first action.",
    guidance: ["Set quiet intentions", "Take the first physical step", "Commit to direction", "Resist premature exposure"],
    icon: Moon
  },
  {
    name: "The Build Arc",
    phase: "First Quarter → Full Moon",
    duration: "~7 days",
    element: "Fire",
    theme: "Action",
    description: "High-velocity execution as illumination grows. Momentum is available—use it. The light is increasing; so should your output.",
    guidance: ["Take bold action", "Make decisions without hesitation", "Refine through iteration", "Build visible momentum"],
    icon: Zap
  },
  {
    name: "The Harvest Arc",
    phase: "Full Moon → Last Quarter",
    duration: "~7 days",
    element: "Water",
    theme: "Revelation",
    description: "Maximum illumination reveals truth. What bloomed is clear; what failed is also clear. Share findings. Begin the release.",
    guidance: ["Celebrate what worked", "Acknowledge what didn't", "Share wisdom outward", "Begin releasing attachments"],
    icon: Eye
  },
  {
    name: "The Compost Arc",
    phase: "Last Quarter → New Moon",
    duration: "~7 days",
    element: "Ether",
    theme: "Dissolution",
    description: "Deep release and preparation for renewal. Old forms decompose into fertile ground. Rest is not optional—it is essential.",
    guidance: ["Complete unfinished business", "Release what no longer serves", "Rest deeply and dream", "Prepare the soil for new seeds"],
    icon: Compass
  }
];

// Void of Course Moon Protocol - Accurate astrological definition
const voidOfCourseProtocol = {
  title: "The Void of Course Moon",
  definition: "The Moon goes 'void of course' when it has completed its last major aspect in a sign before moving into the next sign. This is NOT tied to any specific phase—voids occur scattered throughout the lunar month.",
  duration: "Void periods range from minutes to over 24 hours. They require calculation and cannot be guessed.",
  guidance: {
    honor: ["Rest and dream", "Routine tasks only", "Meditation and reflection", "Creative play without stakes"],
    avoid: ["Signing contracts", "Launching projects", "Making major decisions", "Starting anything you want to succeed"]
  },
  note: "We've calculated all Void of Course periods for 2026. The Lunar Cipher includes this data for daily reference."
};

const Method = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative grain-overlay">
        <Navigation />
        
        <main className="pt-24 lg:pt-32">
          {/* Hero Section */}
          <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-gold font-medium tracking-widest text-sm uppercase mb-6">
                  The Moontuner Method
                </p>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-tight">
                  Phasecraft
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  A resonance-based system for aligning your intentions, energy, and momentum with the Moon's natural rhythm.
                </p>
              </div>
            </ScrollReveal>
          </section>

          {/* What is Phasecraft */}
          <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24 border-t border-border/30">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                <ScrollReveal>
                  <div>
                    <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-8">
                      What Phasecraft Is
                    </h2>
                    <div className="space-y-6 text-muted-foreground leading-relaxed">
                      <p>
                        Phasecraft is the practice of living in conscious relationship with cyclical time. It's not about prediction or fate—it's about attunement.
                      </p>
                      <p>
                        The Moon moves through eight distinct phases every 29.5 days, each carrying its own energetic quality. Phasecraft teaches you to recognize these qualities and work with them—not against them.
                      </p>
                      <p>
                        Think of it as tempo markings for your life. Some phases support action and decision. Others invite rest and reflection. When you align your efforts with these natural rhythms, you stop fighting against the current.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal delay={0.2}>
                  <div className="bg-card/30 border border-border/50 rounded-2xl p-8 lg:p-10">
                    <div className="flex items-center gap-3 mb-6">
                      <Compass className="w-6 h-6 text-gold" />
                      <h3 className="font-serif text-xl text-foreground">Core Principles</h3>
                    </div>
                    <ul className="space-y-4 text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                        <span>Resonance over ritual—feel, don't follow blindly</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                        <span>Awareness over optimization—notice, don't exploit</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                        <span>Guidance over instruction—the Moon suggests, you decide</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                        <span>Practice over perfection—alignment is cultivated, not achieved</span>
                      </li>
                    </ul>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Why Lunar Timing Works */}
          <section className="bg-card/20 border-y border-border/30">
            <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
              <ScrollReveal>
                <div className="max-w-3xl mx-auto text-center mb-16">
                  <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
                    Why Lunar Timing Works
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    This isn't mysticism—it's pattern recognition. Humans have tracked the Moon for over 30,000 years because its cycles provide a reliable external rhythm to anchor internal experience.
                  </p>
                </div>
              </ScrollReveal>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <ScrollReveal delay={0.1}>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-night-slate/50 border border-border/50 flex items-center justify-center mx-auto mb-6">
                      <Waves className="w-7 h-7 text-gold" />
                    </div>
                    <h3 className="font-serif text-xl text-foreground mb-3">Natural Rhythm</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      The Moon governs tides, affects sleep patterns, and marks time in a way calendars cannot. Its phases are tangible, observable, and consistent.
                    </p>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal delay={0.2}>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-night-slate/50 border border-border/50 flex items-center justify-center mx-auto mb-6">
                      <Moon className="w-7 h-7 text-gold" />
                    </div>
                    <h3 className="font-serif text-xl text-foreground mb-3">Cyclical Awareness</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Linear productivity culture ignores our need for rest and renewal. Lunar timing restores the cycle—building, releasing, resting, beginning again.
                    </p>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal delay={0.3}>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-night-slate/50 border border-border/50 flex items-center justify-center mx-auto mb-6">
                      <Circle className="w-7 h-7 text-gold" />
                    </div>
                    <h3 className="font-serif text-xl text-foreground mb-3">Embodied Practice</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      When you align action with phase, you develop an embodied sense of timing—knowing when to push, when to pause, when to pivot.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* The 8-Phase Framework */}
          <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <span className="system-label block mb-6">The Framework</span>
                  <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
                    The 8-Phase Framework
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Each lunar phase carries a distinct energetic quality. Understanding these phases helps you work with natural momentum rather than against it.
                  </p>
                </div>
              </ScrollReveal>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {phases.map((phase, index) => (
                  <ScrollReveal key={phase.name} delay={index * 0.05}>
                    <div 
                      className="node-card h-full"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-night-slate border border-border/50 flex items-center justify-center">
                            <span className="text-accent text-xs font-medium">{index + 1}</span>
                          </div>
                          <h3 className="font-serif text-lg text-foreground">{phase.name}</h3>
                        </div>
                      </div>
                      <span className="system-label text-accent/60 block mb-4">{phase.element}</span>
                      <div className="space-y-3 text-sm">
                        <div>
                          <p className="text-accent/80 text-xs uppercase tracking-wide mb-1">Posture</p>
                          <p className="text-muted-foreground">{phase.posture}</p>
                        </div>
                        <div>
                          <p className="text-accent/80 text-xs uppercase tracking-wide mb-1">Misalignment</p>
                          <p className="text-muted-foreground">{phase.misalignment}</p>
                        </div>
                        <div>
                          <p className="text-accent/80 text-xs uppercase tracking-wide mb-1">Practice</p>
                          <p className="text-foreground/90">{phase.relationship}</p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* The Four Tenets */}
          <section className="bg-card/20 border-y border-border/30">
            <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
              <div className="max-w-5xl mx-auto">
                <ScrollReveal>
                  <div className="text-center mb-16">
                    <span className="system-label block mb-6">Core Doctrine</span>
                    <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
                      The Four Tenets of Phasecraft
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      These are the foundational principles that guide all phase-based practice. Not rules to obey, but truths to internalize.
                    </p>
                  </div>
                </ScrollReveal>
                
                <div className="space-y-8">
                  {phasecraftTenets.map((tenet, index) => (
                    <ScrollReveal key={tenet.number} delay={index * 0.1}>
                      <div className="node-card">
                        <div className="flex items-start gap-6">
                          <div className="shrink-0">
                            <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
                              <tenet.icon className="w-6 h-6 text-accent" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                              <span className="font-serif text-2xl text-accent/50">{tenet.number}</span>
                              <h3 className="font-serif text-xl lg:text-2xl text-foreground">{tenet.title}</h3>
                            </div>
                            <p className="text-foreground leading-relaxed mb-4 font-serif italic">
                              "{tenet.declaration}"
                            </p>
                            <div className="bg-night-slate/50 rounded-lg p-4">
                              <span className="system-label text-accent block mb-2">Practice</span>
                              <p className="text-muted-foreground text-sm">{tenet.practice}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* The Four Arcs */}
          <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <span className="system-label block mb-6">The Complete Cycle</span>
                  <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
                    The Four Arcs
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    The lunar cycle divides naturally into four arcs of approximately seven days each. Each arc has its own rhythm, element, and purpose. Together, they form the complete journey from seed to compost and back again.
                  </p>
                </div>
              </ScrollReveal>
              
              <div className="grid md:grid-cols-2 gap-8">
                {fourArcs.map((arc, index) => (
                  <ScrollReveal key={arc.name} delay={index * 0.1}>
                    <div className="node-card h-full">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
                          <arc.icon className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-serif text-xl text-foreground">{arc.name}</h3>
                          <span className="system-label text-accent/60">{arc.phase}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-xs text-muted-foreground/60 uppercase tracking-wide">{arc.duration}</span>
                        <span className="text-xs text-accent/60 uppercase tracking-wide">{arc.element}</span>
                        <span className="text-xs text-foreground/80 uppercase tracking-wide font-medium">{arc.theme}</span>
                      </div>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {arc.description}
                      </p>
                      
                      <div>
                        <span className="text-accent text-xs uppercase tracking-wide block mb-2">Guidance</span>
                        <ul className="space-y-1">
                          {arc.guidance.map((item) => (
                            <li key={item} className="text-muted-foreground text-sm flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-accent" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* Void of Course Protocol */}
          <section className="bg-night-slate border-y border-border/30">
            <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
              <div className="max-w-4xl mx-auto">
                <ScrollReveal>
                  <div className="text-center mb-12">
                    <span className="system-label block mb-6 text-accent">Astrological Precision</span>
                    <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
                      {voidOfCourseProtocol.title}
                    </h2>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal delay={0.1}>
                  <div className="node-card mb-8">
                    <h3 className="font-serif text-xl text-foreground mb-4">What It Actually Is</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {voidOfCourseProtocol.definition}
                    </p>
                    <p className="text-muted-foreground/70 text-sm italic">
                      {voidOfCourseProtocol.duration}
                    </p>
                  </div>
                </ScrollReveal>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <ScrollReveal delay={0.2}>
                    <div className="node-card h-full">
                      <span className="text-accent text-xs uppercase tracking-wide block mb-4">Honor The Void</span>
                      <ul className="space-y-2">
                        {voidOfCourseProtocol.guidance.honor.map((item) => (
                          <li key={item} className="text-muted-foreground text-sm flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                  
                  <ScrollReveal delay={0.3}>
                    <div className="node-card h-full">
                      <span className="text-muted-foreground/50 text-xs uppercase tracking-wide block mb-4">Avoid During Void</span>
                      <ul className="space-y-2">
                        {voidOfCourseProtocol.guidance.avoid.map((item) => (
                          <li key={item} className="text-muted-foreground/60 text-sm flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                </div>
                
                <ScrollReveal delay={0.4}>
                  <div className="mt-8 p-6 bg-accent/5 border border-accent/20 rounded-lg text-center">
                    <p className="text-foreground text-sm">
                      {voidOfCourseProtocol.note}
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Connection to Manifesto */}
          <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center">
                <span className="system-label block mb-6">The Complete System</span>
                <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-8">
                  Phasecraft + Manifesto = Moontuner
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto">
                  Phasecraft is the how. The Moontuner Manifesto is the why. Together, they form a complete philosophy and practice for those who move with the Moon.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button variant="gold" size="lg" asChild>
                    <Link to="/manifesto">
                      Read the Manifesto
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/philosophy">
                      See the Interconnection
                    </Link>
                  </Button>
                </div>
                
                <div className="divider-line mb-12" />
                
                <h3 className="font-serif text-2xl text-foreground mb-6">Begin Your Practice</h3>
                <p className="text-muted-foreground mb-8">
                  Ready to experience Phasecraft? Start with the Lunar Chaperone workbook series.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/workbooks">
                      Explore Workbooks
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </section>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Method;