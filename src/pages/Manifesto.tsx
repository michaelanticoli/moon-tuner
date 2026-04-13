import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Moon, Waves, Eye, Heart, Compass, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const manifestoDeclarations = [
  {
    number: "I",
    title: "The Moon Is Always Here",
    text: "You do not need to seek permission. You do not need to be invited. The Moon rises regardless of whether you watch. It pulls the tides whether or not you believe. This is not about belief—it is about relationship.",
    essence: "Access requires no invitation"
  },
  {
    number: "II", 
    title: "You Are Already Moving With It",
    text: "Every breath, every sleep cycle, every surge of creativity or need for rest—you are already in rhythm. The question is not whether you are connected, but whether you are conscious of the connection.",
    essence: "Connection precedes awareness"
  },
  {
    number: "III",
    title: "The Path Is The Destination",
    text: "We are not climbing toward enlightenment. We are walking through it. Every phase is complete. Every day of the cycle holds equal weight. The waning is as sacred as the waxing.",
    essence: "Every phase is whole"
  },
  {
    number: "IV",
    title: "Local Means Universal",
    text: "The Moon you see from your window is the same Moon that rose over ancient temples, that guided sailors, that marked seasons for a thousand generations. Your local experience is a portal to the universal.",
    essence: "Your view is the gateway"
  },
  {
    number: "V",
    title: "Enchantment Is Not Escape",
    text: "To be enchanted is not to flee reality but to see it more clearly. The Moon does not offer escape from your life—it offers a lens through which your life becomes more vivid, more patterned, more navigable.",
    essence: "Magic clarifies reality"
  },
  {
    number: "VI",
    title: "The Body Remembers",
    text: "Your bones, your blood, your rhythms—they carry lunar memory. Before calendars, before clocks, the body knew. Moontuning is not learning something new. It is remembering what the body never forgot.",
    essence: "Wisdom lives in the body"
  },
  {
    number: "VII",
    title: "We Are On The Way",
    text: "We are not waiting to arrive. We are already the path, the walker, and the destination. We are the guests arriving to the party that never stops, the celebration that began before us and continues through us.",
    essence: "Arrival is perpetual"
  }
];

const moontunerPrinciples = [
  {
    icon: Moon,
    title: "Cyclical Over Linear",
    description: "Time spirals. Progress is not a straight line but a returning path that rises. Each cycle brings you back to familiar ground at a higher elevation."
  },
  {
    icon: Waves,
    title: "Rhythm Over Schedule",
    description: "The Moon does not hurry. It does not meet deadlines. It rises when it rises. We learn to work with tempo rather than against clock."
  },
  {
    icon: Eye,
    title: "Awareness Over Achievement",
    description: "The goal is not to accomplish more but to be more present to what you are already doing. Attention is the practice."
  },
  {
    icon: Heart,
    title: "Resonance Over Prescription",
    description: "We do not tell you what to feel. We invite you to notice what you already feel. The Moon suggests; you decide."
  },
  {
    icon: Compass,
    title: "Integration Over Inspiration",
    description: "A flash of insight means nothing without the thirteen days that follow. We are companions for the whole journey, not just the beginning."
  },
  {
    icon: Sparkles,
    title: "Enchantment Over Optimization",
    description: "This is not productivity culture in celestial costume. The Moon is not a hack. It is a relationship with the cosmos itself."
  }
];

const Manifesto = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative grain-overlay">
        <Navigation />
        
        <main className="pt-24 lg:pt-32">
          {/* Hero Section */}
          <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center">
                <span className="system-label block mb-6">The Declaration</span>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-tight">
                  The Moontuner <br />
                  <span className="italic text-accent">Manifesto</span>
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  A declaration of principles for those who move with the Moon. Not rules to follow—truths to remember.
                </p>
              </div>
            </ScrollReveal>
          </section>

          {/* Opening Statement */}
          <section className="container mx-auto px-6 lg:px-12 py-16 border-t border-border/30">
            <div className="max-w-3xl mx-auto">
              <ScrollReveal>
                <div className="text-center">
                  <p className="font-serif text-2xl lg:text-3xl text-foreground leading-relaxed italic">
                    "The Moon's pull isn't distant—it's in your lungs and your shoreline. You're not being invited in. You're already here. This isn't a beginning. It's a beat you've always been moving to."
                  </p>
                  <span className="system-label block mt-8 text-accent">— The Moontuner Foundation</span>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* The Seven Declarations */}
          <section className="bg-card/20 border-y border-border/30">
            <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
              <div className="max-w-4xl mx-auto">
                <ScrollReveal>
                  <div className="text-center mb-16">
                    <span className="system-label block mb-6">Core Truths</span>
                    <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
                      The Seven Declarations
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Not commandments but recognitions. Not instructions but invitations to remember what you already know.
                    </p>
                  </div>
                </ScrollReveal>
                
                <div className="space-y-12">
                  {manifestoDeclarations.map((declaration, index) => (
                    <ScrollReveal key={declaration.number} delay={index * 0.05}>
                      <div className="group relative">
                        <div className="flex items-start gap-8">
                          <div className="shrink-0">
                            <span className="font-serif text-4xl lg:text-5xl text-accent/40 group-hover:text-accent transition-colors duration-500">
                              {declaration.number}
                            </span>
                          </div>
                          <div className="flex-1 pt-2">
                            <h3 className="font-serif text-xl lg:text-2xl text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                              {declaration.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                              {declaration.text}
                            </p>
                            <span className="system-label text-accent/60">
                              {declaration.essence}
                            </span>
                          </div>
                        </div>
                        {index < manifestoDeclarations.length - 1 && (
                          <div className="divider-line mt-12" />
                        )}
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* The Moontuner Principles */}
          <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <span className="system-label block mb-6">Operating Principles</span>
                  <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
                    The Moontuner Way
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    These are the principles that guide every workbook, every tool, every piece of guidance we offer.
                  </p>
                </div>
              </ScrollReveal>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {moontunerPrinciples.map((principle, index) => (
                  <ScrollReveal key={principle.title} delay={index * 0.05}>
                    <div className="node-card h-full">
                      <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-6">
                        <principle.icon className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="font-serif text-xl text-foreground mb-3">
                        {principle.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* The Methodology Connection */}
          <section className="bg-night-slate border-y border-border/30">
            <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
              <div className="max-w-4xl mx-auto text-center">
                <ScrollReveal>
                  <span className="system-label block mb-6">The System</span>
                  <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-8">
                    From Philosophy to Practice
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto">
                    The Manifesto declares what we believe. <strong className="text-foreground">Phasecraft</strong> is how we practice it. 
                    One is the why; the other is the how. Together, they form the complete Moontuner methodology.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-6 max-w-xl mx-auto mb-12">
                    <div className="node-card text-center">
                      <span className="system-label text-accent block mb-2">Manifesto</span>
                      <p className="text-foreground font-serif text-lg mb-2">The Why</p>
                      <p className="text-muted-foreground text-sm">Philosophy & Declaration</p>
                    </div>
                    <div className="node-card text-center">
                      <span className="system-label text-accent block mb-2">Phasecraft</span>
                      <p className="text-foreground font-serif text-lg mb-2">The How</p>
                      <p className="text-muted-foreground text-sm">Framework & Practice</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="gold" size="lg" asChild>
                      <Link to="/method">
                        Explore Phasecraft
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link to="/philosophy">
                        See the Interconnection
                      </Link>
                    </Button>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Closing */}
          <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center">
                <Moon className="w-16 h-16 text-accent/40 mx-auto mb-8" />
                <p className="font-serif text-2xl lg:text-3xl text-foreground leading-relaxed italic mb-8">
                  "We are on the way. We are the way. We are the guests arriving to the party."
                </p>
                <span className="system-label block text-accent">
                  Welcome to Moontuner
                </span>
              </div>
            </ScrollReveal>
          </section>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Manifesto;
