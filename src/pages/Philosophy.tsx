import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Circle, Merge, Split, Equal, Moon, Compass, Heart } from "lucide-react";
import { Link } from "react-router-dom";

// Areas where Manifesto and Phasecraft MERGE (same truth, different expression)
const mergedAreas = [
  {
    theme: "Cyclical Time",
    manifesto: "Time spirals. Progress is not a straight line but a returning path that rises.",
    phasecraft: "The 8-phase framework recognizes that we return to similar energetic states each cycle, but at a higher octave.",
    unity: "Both reject linear productivity culture in favor of spiral progression."
  },
  {
    theme: "Body Wisdom",
    manifesto: "The body remembers what the mind forgets. Lunar memory lives in bone and blood.",
    phasecraft: "Each phase has a somatic signature. The body knows the phase before the mind names it.",
    unity: "Both center embodied experience over intellectual understanding."
  },
  {
    theme: "Always Accessible",
    manifesto: "The Moon is always here. No invitation needed. We are already guests at the party.",
    phasecraft: "Every phase is workable. There is no 'bad time' for practice—only different kinds of practice.",
    unity: "Both emphasize that the practice is available right now, in this moment."
  }
];

// Areas where they DIFFER (complementary but distinct)
const differingAreas = [
  {
    theme: "Primary Orientation",
    manifesto: {
      position: "Relationship",
      description: "Emphasizes the quality of connection between you and the Moon. The relationship itself is the practice."
    },
    phasecraft: {
      position: "Framework",
      description: "Provides structure for working with each phase. The 8-phase system is a map for navigation."
    },
    synthesis: "Manifesto asks 'why are you here?' Phasecraft asks 'what do you do now?'"
  },
  {
    theme: "Mode of Engagement",
    manifesto: {
      position: "Receptive",
      description: "Invites you to receive, notice, remember. The Moon is always offering; your job is to be present."
    },
    phasecraft: {
      position: "Active",
      description: "Provides specific practices, postures, and actions aligned with each phase. There is work to do."
    },
    synthesis: "Manifesto is the inhale; Phasecraft is the exhale."
  },
  {
    theme: "Temporal Focus",
    manifesto: {
      position: "Eternal Present",
      description: "Every moment is complete. 'We are already on the way.' The focus is presence, not progress."
    },
    phasecraft: {
      position: "Rhythmic Progression",
      description: "Tracks the arc from New to Full to New. There is a journey with distinct stations."
    },
    synthesis: "Manifesto grounds you in now; Phasecraft orients you within the cycle."
  }
];

// Areas of AUTONOMOUS identity (unique to each)
const autonomousAreas = {
  manifesto: [
    {
      title: "The Seven Declarations",
      description: "A poetic foundation of core truths that exist independent of any practice or system."
    },
    {
      title: "Enchantment Philosophy",
      description: "The explicit embrace of magic as clarity-maker, not escape. A philosophical stance unique to the Manifesto."
    },
    {
      title: "The Party Metaphor",
      description: "We are guests arriving to a celebration. This joyful, welcoming tone is distinctly Manifesto."
    }
  ],
  phasecraft: [
    {
      title: "The 8-Phase Framework",
      description: "A specific technical system with named phases, postures, misalignments, and practices."
    },
    {
      title: "Phase-Specific Guidance",
      description: "Concrete recommendations for each of the eight phases—what to do, what to avoid, what to notice."
    },
    {
      title: "The 14-Day Arc",
      description: "The structured journey from one lunation point to the next, with daily themes and checkpoints."
    }
  ]
};

const Philosophy = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative grain-overlay">
        <Navigation />
        
        <main className="pt-24 lg:pt-32">
          {/* Hero Section */}
          <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center">
                <span className="system-label block mb-6">The Architecture of Alignment</span>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-tight">
                  Where Philosophy <br />
                  <span className="italic">Meets Practice</span>
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  The Moontuner Manifesto and Phasecraft are two expressions of one frequency. Here is where they merge, where they differ, and where each retains its sovereign voice.
                </p>
              </div>
            </ScrollReveal>
          </section>

          {/* Visual Compass */}
          <section className="container mx-auto px-6 lg:px-12 py-16 border-t border-border/30">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal>
                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                  <div className="node-card text-center">
                    <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-6">
                      <Moon className="w-7 h-7 text-accent" />
                    </div>
                    <h3 className="font-serif text-2xl text-foreground mb-2">Manifesto</h3>
                    <span className="system-label text-accent block mb-4">The Why</span>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Philosophy, declaration, and the invitation to relationship. The soul of Moontuner.
                    </p>
                    <Link to="/manifesto" className="inline-flex items-center gap-2 text-accent mt-4 text-sm hover:underline">
                      Read the Manifesto <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full border-2 border-accent/40 flex items-center justify-center">
                        <span className="font-serif text-accent text-lg">∞</span>
                      </div>
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 system-label text-accent/60 whitespace-nowrap">
                        One Frequency
                      </div>
                    </div>
                  </div>
                  
                  <div className="node-card text-center">
                    <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-6">
                      <Compass className="w-7 h-7 text-accent" />
                    </div>
                    <h3 className="font-serif text-2xl text-foreground mb-2">Phasecraft</h3>
                    <span className="system-label text-accent block mb-4">The How</span>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Framework, methodology, and the system for practice. The structure of Moontuner.
                    </p>
                    <Link to="/method" className="inline-flex items-center gap-2 text-accent mt-4 text-sm hover:underline">
                      Explore Phasecraft <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Where They Merge */}
          <section className="bg-card/20 border-y border-border/30">
            <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
              <div className="max-w-5xl mx-auto">
                <ScrollReveal>
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <Merge className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <span className="system-label block text-accent">Unified Ground</span>
                      <h2 className="font-serif text-3xl lg:text-4xl text-foreground">
                        Where They Merge
                      </h2>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-12 max-w-2xl">
                    In these areas, Manifesto and Phasecraft express the same truth through different languages. They are one frequency, two voices.
                  </p>
                </ScrollReveal>
                
                <div className="space-y-8">
                  {mergedAreas.map((area, index) => (
                    <ScrollReveal key={area.theme} delay={index * 0.1}>
                      <div className="node-card">
                        <h3 className="font-serif text-xl text-foreground mb-6">{area.theme}</h3>
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div className="border-l-2 border-accent/40 pl-4">
                            <span className="system-label text-accent/60 block mb-2">Manifesto Voice</span>
                            <p className="text-muted-foreground text-sm italic">"{area.manifesto}"</p>
                          </div>
                          <div className="border-l-2 border-accent/40 pl-4">
                            <span className="system-label text-accent/60 block mb-2">Phasecraft Voice</span>
                            <p className="text-muted-foreground text-sm italic">"{area.phasecraft}"</p>
                          </div>
                        </div>
                        <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                          <span className="system-label text-accent block mb-2">Unity</span>
                          <p className="text-foreground text-sm">{area.unity}</p>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Where They Differ */}
          <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal>
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <Split className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <span className="system-label block text-accent">Complementary Tension</span>
                    <h2 className="font-serif text-3xl lg:text-4xl text-foreground">
                      Where They Differ
                    </h2>
                  </div>
                </div>
                <p className="text-muted-foreground mb-12 max-w-2xl">
                  These differences are not contradictions but complementarities. Like inhale and exhale, each needs the other to complete the breath.
                </p>
              </ScrollReveal>
              
              <div className="space-y-8">
                {differingAreas.map((area, index) => (
                  <ScrollReveal key={area.theme} delay={index * 0.1}>
                    <div className="node-card">
                      <h3 className="font-serif text-xl text-foreground mb-6">{area.theme}</h3>
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-night-slate rounded-lg p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <Moon className="w-4 h-4 text-accent" />
                            <span className="text-accent text-sm font-medium">Manifesto</span>
                          </div>
                          <p className="text-foreground font-serif text-lg mb-2">{area.manifesto.position}</p>
                          <p className="text-muted-foreground text-sm">{area.manifesto.description}</p>
                        </div>
                        <div className="bg-night-slate rounded-lg p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <Compass className="w-4 h-4 text-accent" />
                            <span className="text-accent text-sm font-medium">Phasecraft</span>
                          </div>
                          <p className="text-foreground font-serif text-lg mb-2">{area.phasecraft.position}</p>
                          <p className="text-muted-foreground text-sm">{area.phasecraft.description}</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="inline-block px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-sm text-accent">
                          {area.synthesis}
                        </span>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* Autonomous Identity */}
          <section className="bg-night-slate border-y border-border/30">
            <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
              <div className="max-w-5xl mx-auto">
                <ScrollReveal>
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <Circle className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <span className="system-label block text-accent">Sovereign Ground</span>
                      <h2 className="font-serif text-3xl lg:text-4xl text-foreground">
                        Autonomous Identity
                      </h2>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-12 max-w-2xl">
                    Some elements belong wholly to one or the other. These are not shared territory but the unique DNA of each.
                  </p>
                </ScrollReveal>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  <ScrollReveal delay={0.1}>
                    <div className="node-card h-full">
                      <div className="flex items-center gap-3 mb-6">
                        <Moon className="w-6 h-6 text-accent" />
                        <h3 className="font-serif text-2xl text-foreground">Manifesto Alone</h3>
                      </div>
                      <div className="space-y-6">
                        {autonomousAreas.manifesto.map((item) => (
                          <div key={item.title} className="border-l-2 border-accent/30 pl-4">
                            <h4 className="text-foreground font-medium mb-1">{item.title}</h4>
                            <p className="text-muted-foreground text-sm">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                  
                  <ScrollReveal delay={0.2}>
                    <div className="node-card h-full">
                      <div className="flex items-center gap-3 mb-6">
                        <Compass className="w-6 h-6 text-accent" />
                        <h3 className="font-serif text-2xl text-foreground">Phasecraft Alone</h3>
                      </div>
                      <div className="space-y-6">
                        {autonomousAreas.phasecraft.map((item) => (
                          <div key={item.title} className="border-l-2 border-accent/30 pl-4">
                            <h4 className="text-foreground font-medium mb-1">{item.title}</h4>
                            <p className="text-muted-foreground text-sm">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </section>

          {/* The Complete Picture */}
          <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center">
                <Heart className="w-12 h-12 text-accent/40 mx-auto mb-8" />
                <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-8">
                  The Complete Moontuner
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-12 text-lg">
                  To practice Moontuner fully is to hold both: the poetic truth of the Manifesto and the practical wisdom of Phasecraft. 
                  Neither is complete without the other. Together, they offer a complete path for those who move with the Moon.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="gold" size="lg" asChild>
                    <Link to="/manifesto">
                      Read the Manifesto
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/method">
                      Explore Phasecraft
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/workbooks">
                      Begin with Workbooks
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

export default Philosophy;
