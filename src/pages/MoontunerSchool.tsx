import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { MoonPhaseGlyph } from "@/components/MoonPhaseGlyph";
import { ZodiacGlyph } from "@/components/ZodiacGlyph";
import { ArrowUpRight, BookOpen, Brain, Layers, Target, Sparkles, Clock, Compass } from "lucide-react";

const SCHOOL_URL = "https://moontuner-school.netlify.app";

const curriculum = [
  { icon: BookOpen, title: "Foundations", desc: "Master the 8 phases and 12 signs individually" },
  { icon: Brain, title: "Flashcards", desc: "Build retention through active recall of all 96 combinations" },
  { icon: Layers, title: "Matrix Explorer", desc: "Navigate the complete lunar-zodiac signature system" },
  { icon: Target, title: "Workbook", desc: "Apply knowledge through structured reflective exercises" },
  { icon: Sparkles, title: "Assessment", desc: "Validate understanding and identify growth edges" },
  { icon: Clock, title: "Progress", desc: "Track mastery development over time" },
];

const phases = [
  { name: "New Moon", element: "VOID", glyph: "new" as const },
  { name: "Crescent", element: "SPARK", glyph: "waxing-crescent" as const },
  { name: "First Quarter", element: "FIRE", glyph: "first-quarter" as const },
  { name: "Gibbous", element: "AIR", glyph: "waxing-gibbous" as const },
  { name: "Full Moon", element: "LIGHT", glyph: "full" as const },
  { name: "Disseminating", element: "WATER", glyph: "waning-gibbous" as const },
  { name: "Last Quarter", element: "EARTH", glyph: "last-quarter" as const },
  { name: "Balsamic", element: "ETHER", glyph: "waning-crescent" as const },
];

export default function MoontunerSchool() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />

        {/* Hero */}
        <header className="pt-28 lg:pt-40 pb-20 lg:pb-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
          <div className="container mx-auto px-6 lg:px-12 relative">
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-accent font-medium mb-6">
              The Education System
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-light text-foreground mb-6 tracking-tight leading-[1.1]">
              MOONtuner School
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-4">
              A systematic approach to temporal navigation through 96 unique lunar-zodiac combinations. 
              Learn to read the sky with precision — and live in phase.
            </p>
            <p className="text-muted-foreground max-w-xl leading-relaxed mb-10">
              8 Moon Phases × 12 Zodiac Signs = 96 Unique Signatures. Each combination represents 
              a distinct energetic configuration. This is where you learn them all.
            </p>
            <a href={SCHOOL_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="group">
                Enter the School
                <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </a>
          </div>
        </header>

        {/* Phase Preview Strip */}
        <ScrollReveal>
          <section className="py-16 lg:py-24 border-t border-border">
            <div className="container mx-auto px-6 lg:px-12">
              <span className="inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
                The 8 Phases You'll Master
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                {phases.map((phase) => (
                  <div key={phase.name} className="bg-card border border-border p-4 text-center group hover:border-accent/40 transition-colors">
                    <MoonPhaseGlyph phase={phase.glyph} size={36} className="mx-auto mb-3" />
                    <p className="text-xs font-medium text-foreground mb-1">{phase.name}</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{phase.element}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Application Framework */}
        <ScrollReveal>
          <section className="py-16 lg:py-24 border-t border-border">
            <div className="container mx-auto px-6 lg:px-12">
              <span className="inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
                Application Framework
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-light text-foreground mb-12">
                What you'll learn to do
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border border-border p-8 hover:border-accent/30 transition-colors">
                  <Clock className="w-8 h-8 text-accent mb-4" />
                  <h4 className="font-medium text-foreground mb-2">Precision Timing</h4>
                  <p className="text-sm text-muted-foreground">
                    Identify optimal moments for launches, decisions, and strategic initiatives through systematic lunar-zodiac analysis.
                  </p>
                </div>
                <div className="bg-card border border-border p-8 hover:border-accent/30 transition-colors">
                  <Compass className="w-8 h-8 text-accent mb-4" />
                  <h4 className="font-medium text-foreground mb-2">Natural Rhythm Alignment</h4>
                  <p className="text-sm text-muted-foreground">
                    Synchronize activities with cosmic cycles rather than operating in opposition to natural energetic flow.
                  </p>
                </div>
                <div className="bg-card border border-border p-8 hover:border-accent/30 transition-colors">
                  <Sparkles className="w-8 h-8 text-accent mb-4" />
                  <h4 className="font-medium text-foreground mb-2">Enhanced Manifestation</h4>
                  <p className="text-sm text-muted-foreground">
                    Amplify intentions through strategic timing with supportive energetic signatures for maximum efficacy.
                  </p>
                </div>
                <div className="bg-card border border-border p-8 hover:border-accent/30 transition-colors">
                  <Target className="w-8 h-8 text-accent mb-4" />
                  <h4 className="font-medium text-foreground mb-2">Strategic Navigation</h4>
                  <p className="text-sm text-muted-foreground">
                    Develop sophisticated temporal intelligence for navigating complexity with cosmic precision and clarity.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Curriculum */}
        <ScrollReveal>
          <section className="py-16 lg:py-24 border-t border-border">
            <div className="container mx-auto px-6 lg:px-12">
              <span className="inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
                The Curriculum
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-light text-foreground mb-4">
                Six stages to mastery
              </h2>
              <p className="text-muted-foreground mb-12 max-w-xl">
                A structured learning path from foundational concepts through interactive practice to full system fluency.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {curriculum.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="bg-card border border-border p-6 hover:border-accent/30 transition-colors">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-xs text-muted-foreground font-mono">{String(i + 1).padStart(2, "0")}</span>
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <h4 className="font-medium text-foreground mb-2">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Chaperone Connection */}
        <ScrollReveal>
          <section className="py-16 lg:py-24 border-t border-border">
            <div className="container mx-auto px-6 lg:px-12">
              <div className="bg-muted/30 border border-border p-8 lg:p-12 max-w-3xl">
                <h3 className="font-serif text-2xl text-foreground mb-4">From Theory to Practice</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  The School teaches the foundational 96-combination system. The <strong className="text-foreground">Lunar Chaperone</strong> is 
                  where this knowledge becomes lived practice — a 26-workbook series designed for continuous lunar companionship.
                </p>
                <div className="grid grid-cols-3 gap-4 text-sm mb-8">
                  <div className="bg-background/50 p-4 border border-border">
                    <span className="text-2xl font-serif text-foreground">12</span>
                    <p className="text-muted-foreground mt-1">New → Full Moon</p>
                  </div>
                  <div className="bg-background/50 p-4 border border-border">
                    <span className="text-2xl font-serif text-foreground">12</span>
                    <p className="text-muted-foreground mt-1">Full → New Moon</p>
                  </div>
                  <div className="bg-background/50 p-4 border border-border">
                    <span className="text-2xl font-serif text-foreground">2</span>
                    <p className="text-muted-foreground mt-1">Eclipse Portals</p>
                  </div>
                </div>
                <Button variant="gold-outline" onClick={() => window.location.href = "/workbooks"}>
                  Explore the Chaperone
                </Button>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Final CTA */}
        <ScrollReveal>
          <section className="py-20 lg:py-32 border-t border-border text-center">
            <div className="container mx-auto px-6 lg:px-12">
              <h2 className="font-serif text-3xl lg:text-5xl font-light text-foreground mb-6">
                Ready to learn the language of the Moon?
              </h2>
              <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
                96 combinations. One complete system. Your fluency begins here.
              </p>
              <a href={SCHOOL_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="group">
                  Enter the School
                  <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </a>
            </div>
          </section>
        </ScrollReveal>

        <Footer />
      </div>
    </PageTransition>
  );
}
