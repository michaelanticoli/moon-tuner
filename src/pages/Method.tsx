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

// The Five Tenets of Phasecraft
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
    title: "The Tenet of Misalignment",
    declaration: "Suffering often signals phase-mismatch. We are not broken—we are out of sync.",
    practice: "When struggle intensifies, ask first: Am I aligned with what this phase asks of me?",
    icon: Compass
  },
  {
    number: "IV",
    title: "The Tenet of the Fourteen Days",
    declaration: "A complete cycle is fourteen days—not one. Integration takes time; initiation is only the beginning.",
    practice: "Commit to the full arc. Show up not just at New or Full, but every day between.",
    icon: Moon
  },
  {
    number: "V",
    title: "The Tenet of Return",
    declaration: "You will pass through each phase again and again. What you learn this cycle prepares you for the next.",
    practice: "Keep records. Notice patterns. Your relationship with each phase evolves over years.",
    icon: Circle
  }
];

// The Three Windows
const threeWindows = [
  {
    name: "The Void Window",
    phase: "New Moon ± 2 days",
    description: "Strategic rest when the moon is absent. This is the dark room where new images develop. Pushing through the Void creates burnout; honoring it creates reserves.",
    do: ["Rest intentionally", "Dream and vision", "Clear mental space", "Set quiet intentions"],
    dont: ["Launch projects", "Make major decisions", "Overcommit energy", "Force clarity"],
    icon: Eye
  },
  {
    name: "The Waxing Sprint",
    phase: "First Quarter → Full Moon",
    description: "High-velocity execution as illumination grows. This is building season. Momentum is available; use it. The light is increasing—so should your output.",
    do: ["Take bold action", "Build momentum", "Make decisions", "Refine and adjust"],
    dont: ["Procrastinate", "Over-plan", "Second-guess", "Rest excessively"],
    icon: Zap
  },
  {
    name: "The Fullness Audit",
    phase: "Full Moon ± 2 days",
    description: "Critical assessment at peak resonance. Everything is visible now. What's working is clear. What's not working is also clear. This is the moment to see.",
    do: ["Assess honestly", "Celebrate progress", "Acknowledge truth", "Harvest insights"],
    dont: ["Start new things", "Ignore revelations", "Dismiss emotions", "Push past fullness"],
    icon: Flame
  }
];

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

          {/* The Five Tenets */}
          <section className="bg-card/20 border-y border-border/30">
            <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
              <div className="max-w-5xl mx-auto">
                <ScrollReveal>
                  <div className="text-center mb-16">
                    <span className="system-label block mb-6">Core Doctrine</span>
                    <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
                      The Five Tenets of Phasecraft
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

          {/* The Three Windows */}
          <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <span className="system-label block mb-6">Strategic Timing</span>
                  <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
                    The Three Windows
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Within each lunar cycle, there are three critical windows that demand special attention. Master these, and you master the rhythm.
                  </p>
                </div>
              </ScrollReveal>
              
              <div className="grid lg:grid-cols-3 gap-8">
                {threeWindows.map((window, index) => (
                  <ScrollReveal key={window.name} delay={index * 0.1}>
                    <div className="node-card h-full">
                      <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-6">
                        <window.icon className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="font-serif text-xl text-foreground mb-2">{window.name}</h3>
                      <span className="system-label text-accent/60 block mb-4">{window.phase}</span>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {window.description}
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <span className="text-accent text-xs uppercase tracking-wide block mb-2">Do</span>
                          <ul className="space-y-1">
                            {window.do.map((item) => (
                              <li key={item} className="text-muted-foreground text-sm flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-accent" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="text-muted-foreground/50 text-xs uppercase tracking-wide block mb-2">Avoid</span>
                          <ul className="space-y-1">
                            {window.dont.map((item) => (
                              <li key={item} className="text-muted-foreground/60 text-sm flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* Philosophy Section */}
          <section className="bg-night-slate border-y border-border/30">
            <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
              <div className="max-w-3xl mx-auto">
                <ScrollReveal>
                  <span className="system-label block mb-6 text-center">The Philosophy</span>
                  <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-12 text-center">
                    Core Principles
                  </h2>
                </ScrollReveal>
                
                <div className="space-y-8 text-muted-foreground leading-relaxed">
                  <ScrollReveal delay={0.1}>
                    <div className="border-l-2 border-accent/40 pl-6">
                      <h3 className="font-serif text-xl text-foreground mb-3">Resonance, Not Ritual</h3>
                      <p>
                        Phasecraft isn't about following rules. It's about developing sensitivity to natural rhythms and responding authentically. There's no "right way" to work with the Moon—only your way.
                      </p>
                    </div>
                  </ScrollReveal>
                  
                  <ScrollReveal delay={0.2}>
                    <div className="border-l-2 border-accent/40 pl-6">
                      <h3 className="font-serif text-xl text-foreground mb-3">Awareness Over Optimization</h3>
                      <p>
                        This isn't productivity hacking dressed in celestial clothing. The goal isn't to squeeze more out of yourself by timing things better. It's to live more consciously, with greater respect for your own cycles of energy and rest.
                      </p>
                    </div>
                  </ScrollReveal>
                  
                  <ScrollReveal delay={0.3}>
                    <div className="border-l-2 border-accent/40 pl-6">
                      <h3 className="font-serif text-xl text-foreground mb-3">You Move With the Moon</h3>
                      <p>
                        The Moon doesn't command you. It doesn't predict your future or determine your fate. It offers a mirror, a rhythm, a companion in the dark. You are not beneath the Moon—you move with it.
                      </p>
                    </div>
                  </ScrollReveal>
                </div>
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