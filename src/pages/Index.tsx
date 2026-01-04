import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { MoonPhasesStrip } from "@/components/MoonPhasesStrip";
import { SongOfTheMoon } from "@/components/SongOfTheMoon";
import { CorePillars } from "@/components/CorePillars";
import { PhilosophySection } from "@/components/PhilosophySection";
import { EntryPoints } from "@/components/EntryPoints";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative grain-overlay">
      <Navigation />
      <main>
        <Hero />
        <MoonPhasesStrip />
        <SongOfTheMoon />
        <CorePillars />
        <PhilosophySection />
        <EntryPoints />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
