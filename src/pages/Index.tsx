import { PageTransition } from "@/components/PageTransition";
import { Footer } from "@/components/Footer";
import { DuskNav } from "@/components/dusk/DuskNav";
import { DuskHero } from "@/components/dusk/DuskHero";
import { TodaysDirective } from "@/components/dusk/TodaysDirective";
import { HarmonicProfileTeaser } from "@/components/dusk/HarmonicProfileTeaser";
import { SEOHead, websiteSchema } from "@/components/SEOHead";

/**
 * Moontuner v2 — Cinematic Dusk redesign.
 * Phase 1: design system + nav + hero + Today's Directive + Harmonic Profile teaser.
 * Remaining sections (offerings, journal, capture) ship in follow-up turns.
 */
const Index = () => {
  return (
    <PageTransition>
      <SEOHead
        title="Moontuner | A Reflective Operating System for Emotionally Intelligent People"
        description="Today's Directive, your Harmonic Profile, and a lunar framework for creative rhythm, emotional regulation, and intentional living. Not astrology — a reflective system."
        canonical="/"
        keywords={[
          "emotional regulation",
          "intentional living",
          "creative rhythm",
          "cyclical productivity",
          "daily directive",
          "lunar alignment system",
          "emotional wellness",
          "moon phases",
        ]}
        jsonLd={websiteSchema()}
      />
      <div className="dusk min-h-screen relative">
        <DuskNav />
        <main>
          <DuskHero />
          <TodaysDirective />
          <HarmonicProfileTeaser />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
