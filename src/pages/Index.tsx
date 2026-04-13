import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { StartHeroSection } from "@/components/StartHeroSection";
import { StartMoonTool } from "@/components/StartMoonTool";
import { StartReportCTA } from "@/components/StartReportCTA";
import { StartSessionCTA } from "@/components/StartSessionCTA";
import { Newsletter } from "@/components/Newsletter";
import { StartGoDeeper } from "@/components/StartGoDeeper";
import { ScrollReveal } from "@/components/ScrollReveal";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative">
        <Navigation />
        <main>
          <StartHeroSection />
          <ScrollReveal>
            <StartMoonTool />
          </ScrollReveal>
          <ScrollReveal>
            <StartReportCTA />
          </ScrollReveal>
          <ScrollReveal>
            <StartSessionCTA />
          </ScrollReveal>
          <ScrollReveal>
            <Newsletter />
          </ScrollReveal>
          <ScrollReveal>
            <StartGoDeeper />
          </ScrollReveal>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
