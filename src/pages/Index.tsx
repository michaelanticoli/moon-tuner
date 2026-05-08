import { PageTransition } from "@/components/PageTransition";
import { Footer } from "@/components/Footer";
import { DuskNav } from "@/components/dusk/DuskNav";
import { DuskHero } from "@/components/dusk/DuskHero";
import { TodaysDirective } from "@/components/dusk/TodaysDirective";

/**
 * Moontuner v2 — Cinematic Dusk redesign.
 * Phase 1: design system + nav + hero + Today's Directive only.
 * Remaining sections (profile, offerings, journal, capture) ship in follow-up turns.
 */
const Index = () => {
  return (
    <PageTransition>
      <div className="dusk min-h-screen relative">
        <DuskNav />
        <main>
          <DuskHero />
          <TodaysDirective />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
