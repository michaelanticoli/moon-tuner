import { PageTransition } from "@/components/PageTransition";
import { Footer } from "@/components/Footer";
import { DuskNav } from "@/components/dusk/DuskNav";
import { DuskHero } from "@/components/dusk/DuskHero";
import { TodaysDirective } from "@/components/dusk/TodaysDirective";
import { HarmonicProfileTeaser } from "@/components/dusk/HarmonicProfileTeaser";

/**
 * Moontuner v2 — Cinematic Dusk redesign.
 * Phase 1: design system + nav + hero + Today's Directive + Harmonic Profile teaser.
 * Remaining sections (offerings, journal, capture) ship in follow-up turns.
 */
const Index = () => {
  return (
    <PageTransition>
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
