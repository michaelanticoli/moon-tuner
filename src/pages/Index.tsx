import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { MoonPhasesStrip } from "@/components/MoonPhasesStrip";
import { SongOfTheMoon } from "@/components/SongOfTheMoon";
import { CorePillars } from "@/components/CorePillars";
import { PhilosophySection } from "@/components/PhilosophySection";
import { EntryPoints } from "@/components/EntryPoints";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative grain-overlay">
        <Navigation />
        <main>
          <Hero />
          <ScrollReveal>
            <MoonPhasesStrip />
          </ScrollReveal>
          <ScrollReveal>
            <SongOfTheMoon />
          </ScrollReveal>
          <ScrollReveal>
            <CorePillars />
          </ScrollReveal>
          <ScrollReveal>
            <PhilosophySection />
          </ScrollReveal>
          <ScrollReveal>
            <EntryPoints />
          </ScrollReveal>
          <ScrollReveal>
            <Newsletter />
          </ScrollReveal>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
