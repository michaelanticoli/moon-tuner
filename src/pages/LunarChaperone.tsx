import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { JourneyPreview } from "@/components/JourneyPreview";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, X, Moon, Zap, Heart, Shield, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

const campaignProblems = [
  {
    title: "The 3-Day Drop-Off",
    description: "Why most people lose motivation 3 days after setting new moon intentions. Peak inspiration fades into silence.",
    icon: Clock
  },
  {
    title: "Screenshot Syndrome",
    description: "Saving astrology content but never knowing how to apply it. Consumption without integration.",
    icon: X
  },
  {
    title: "When Big Astrology Goes Silent",
    description: "Popular accounts disappear between moon phases. You're left alone in the in-between days.",
    icon: Users
  }
];

const chaperonePromises = [
  {
    title: "Never Walk Alone Again",
    description: "Continuous companionship through the entire lunar journey. Every day, every phase, every challenge.",
    icon: Heart
  },
  {
    title: "Integration Over Inspiration",
    description: "We don't just inspire—we guide you through practical application. Theory becomes lived experience.",
    icon: Zap
  },
  {
    title: "The In-Between Days",
    description: "The days between new and full moons are where real transformation happens. We're there for all of them.",
    icon: Moon
  }
];

const workbookSeries = [
  {
    number: 1,
    title: "From Bone to Heart",
    journey: "Capricorn → Leo",
    body: "Knees/Bones → Heart/Solar Plexus",
    essence: "Structure shifting into expressive heart-based creativity"
  },
  {
    number: 2,
    title: "From Heart to Mind",
    journey: "Leo → Aquarius",
    body: "Heart/Solar Plexus → Nervous System/Higher Mind",
    essence: "Creative identity expanding into collective innovation"
  },
  {
    number: 3,
    title: "From Mind to Gut",
    journey: "Aquarius → Virgo",
    body: "Higher Mind → Digestive System",
    essence: "Visionary concepts grounding through service and analysis"
  },
  {
    number: 4,
    title: "From Gut to Soul",
    journey: "Virgo → Pisces",
    body: "Gut Instinct → Feet/Etheric Body",
    essence: "Precision dissolving into universal compassion"
  },
  {
    number: 5,
    title: "From Soul to Balance",
    journey: "Pisces → Libra",
    body: "Etheric Body → Balance",
    essence: "Mystical awareness forming relational harmony"
  },
  {
    number: 6,
    title: "From Balance to Fire",
    journey: "Libra → Aries",
    body: "Balance → Head/Initiation",
    essence: "Harmony igniting bold individual action"
  }
];

const LunarChaperone = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative grain-overlay">
        <Navigation />
        
        <main className="pt-24 lg:pt-32">
          {/* Hero Section */}
          <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center">
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="status-dot" />
                  <span className="system-label">Continuous Lunar Guidance</span>
                </div>
                
                <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-foreground mb-8 leading-[1.05]">
                  Your Trusted <br />
                  <span className="italic text-accent">Lunar Chaperone</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12">
                  Stop chasing peaks. Start walking the path. 26 workbooks for every archetypal lunar journey—with you every single day.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/workbooks">
                    <Button variant="gold" size="lg">
                      Explore the 26-Workbook Series
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg">
                    Download Sample Workbook
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Peak Chasers vs Path Walkers */}
          <section className="border-y border-border/30 bg-card/20">
            <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
              <div className="max-w-5xl mx-auto">
                <ScrollReveal>
                  <div className="text-center mb-16">
                    <span className="system-label block mb-6">The Distinction</span>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground mb-6">
                      Peak Chasers vs <span className="italic">Path Walkers</span>
                    </h2>
                  </div>
                </ScrollReveal>
                
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                  {/* Peak Chasers */}
                  <ScrollReveal delay={0.1}>
                    <div className="node-card border-destructive/30">
                      <div className="flex items-center gap-3 mb-6">
                        <X className="w-6 h-6 text-destructive" />
                        <span className="system-label text-destructive">Peak Chasers</span>
                      </div>
                      <ul className="space-y-4 text-muted-foreground">
                        <li className="flex items-start gap-3">
                          <X className="w-4 h-4 text-destructive mt-1 shrink-0" />
                          <span>Only engage at new and full moons</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <X className="w-4 h-4 text-destructive mt-1 shrink-0" />
                          <span>Screenshot inspiration, never implement</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <X className="w-4 h-4 text-destructive mt-1 shrink-0" />
                          <span>Abandon intentions by day 3</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <X className="w-4 h-4 text-destructive mt-1 shrink-0" />
                          <span>Consume cosmic entertainment</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <X className="w-4 h-4 text-destructive mt-1 shrink-0" />
                          <span>Wait for the next lunation to "start fresh"</span>
                        </li>
                      </ul>
                    </div>
                  </ScrollReveal>
                  
                  {/* Path Walkers */}
                  <ScrollReveal delay={0.2}>
                    <div className="node-card border-accent/30">
                      <div className="flex items-center gap-3 mb-6">
                        <Check className="w-6 h-6 text-accent" />
                        <span className="system-label text-accent">Path Walkers</span>
                      </div>
                      <ul className="space-y-4 text-muted-foreground">
                        <li className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-accent mt-1 shrink-0" />
                          <span>Practice through every phase, every day</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-accent mt-1 shrink-0" />
                          <span>Transform insights into lived experience</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-accent mt-1 shrink-0" />
                          <span>Push through resistance with support</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-accent mt-1 shrink-0" />
                          <span>Pursue life transformation</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-accent mt-1 shrink-0" />
                          <span>Build momentum across complete cycles</span>
                        </li>
                      </ul>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </section>

          {/* The Problem */}
          <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <span className="system-label block mb-6">The Problem</span>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground mb-6">
                    The Astrology <span className="italic">Abandonment Cycle</span>
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Peak inspiration followed by silence. Lost momentum. No guidance in the spaces that matter most.
                  </p>
                </div>
              </ScrollReveal>
              
              <div className="grid md:grid-cols-3 gap-8">
                {campaignProblems.map((problem, index) => {
                  const Icon = problem.icon;
                  return (
                    <ScrollReveal key={problem.title} delay={index * 0.1}>
                      <div className="node-card h-full">
                        <Icon className="w-8 h-8 text-destructive/60 mb-6" />
                        <h3 className="font-serif text-xl text-foreground mb-4">{problem.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{problem.description}</p>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* The Solution */}
          <section className="bg-card/20 border-y border-border/30">
            <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
              <div className="max-w-5xl mx-auto">
                <ScrollReveal>
                  <div className="text-center mb-16">
                    <span className="system-label block mb-6 text-accent">The Solution</span>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground mb-6">
                      Continuous <span className="italic">Companionship</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                      A chaperone guides without controlling. Accompanies without dictating. Present for every step.
                    </p>
                  </div>
                </ScrollReveal>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {chaperonePromises.map((promise, index) => {
                    const Icon = promise.icon;
                    return (
                      <ScrollReveal key={promise.title} delay={index * 0.1}>
                        <div className="node-card h-full border-accent/20">
                          <Icon className="w-8 h-8 text-accent mb-6" />
                          <h3 className="font-serif text-xl text-foreground mb-4">{promise.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">{promise.description}</p>
                        </div>
                      </ScrollReveal>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* 14-Day Journey Preview */}
          <JourneyPreview />

          {/* Workbook Series Preview */}
          <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <span className="system-label block mb-6">The Collection</span>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground mb-6">
                    26 Archetypal <span className="italic">Journeys</span>
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    24 Archetypal Lunar Cycles + 2 Eclipse Portal Specials. Timeless wisdom for lifetime use.
                  </p>
                </div>
              </ScrollReveal>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {workbookSeries.map((workbook, index) => (
                  <ScrollReveal key={workbook.title} delay={index * 0.05}>
                    <div className="node-card h-full">
                      <div className="flex items-center justify-between mb-4">
                        <span className="system-label text-accent">{workbook.number} of 26</span>
                        <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">{workbook.journey}</span>
                      </div>
                      <h3 className="font-serif text-xl text-foreground mb-3">{workbook.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{workbook.essence}</p>
                      <div className="text-xs text-muted-foreground/60 border-t border-border/30 pt-4">
                        {workbook.body}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
              
              <div className="text-center">
                <Link to="/workbooks">
                  <Button variant="gold" size="lg">
                    View All 26 Workbooks
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Evergreen Value */}
          <section className="bg-accent/5 border-y border-accent/20">
            <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
              <div className="max-w-4xl mx-auto text-center">
                <ScrollReveal>
                  <Shield className="w-16 h-16 text-accent mx-auto mb-8" />
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground mb-6">
                    Why <span className="italic">Evergreen?</span>
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
                    These workbooks transcend specific dates and years. They contain archetypal wisdom that remains true whether you're using them in 2026, 2030, or beyond.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="node-card">
                      <h3 className="font-serif text-lg text-foreground mb-2">Lifetime Investment</h3>
                      <p className="text-muted-foreground text-sm">Use forever—no yearly updates needed</p>
                    </div>
                    <div className="node-card">
                      <h3 className="font-serif text-lg text-foreground mb-2">Archetypal Depth</h3>
                      <p className="text-muted-foreground text-sm">Timeless patterns deepen with each cycle</p>
                    </div>
                    <div className="node-card">
                      <h3 className="font-serif text-lg text-foreground mb-2">Flexible Timing</h3>
                      <p className="text-muted-foreground text-sm">Work with any lunar cycle in any year</p>
                    </div>
                    <div className="node-card">
                      <h3 className="font-serif text-lg text-foreground mb-2">Premium Value</h3>
                      <p className="text-muted-foreground text-sm">Reference-quality vs. disposable content</p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <ScrollReveal>
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
                  Stop Chasing Peaks. <br />
                  <span className="italic">Start Walking the Path.</span>
                </h2>
                <p className="text-muted-foreground mb-10 leading-relaxed">
                  Join the path walkers who transform cosmic entertainment into life transformation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/workbooks">
                    <Button variant="gold" size="lg">
                      Get the Complete Series
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/method">
                    <Button variant="outline" size="lg">
                      Learn Phasecraft
                    </Button>
                  </Link>
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

export default LunarChaperone;
