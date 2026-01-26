import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { LunarLiveStatus } from "@/components/LunarLiveStatus";
import { PhaseSignMatrix } from "@/components/PhaseSignMatrix";
import { ZodiacBodyMap } from "@/components/ZodiacBodyMap";
import { ArrowDown } from "lucide-react";

const LunarSystem = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative grain-overlay">
        <Navigation />
        
        <main className="pt-32 pb-24">
          {/* Hero Section */}
          <section className="container mx-auto px-6 lg:px-12 mb-24">
            <div className="max-w-4xl">
              <span className="system-label block mb-6 opacity-0 animate-fade-in">
                The Complete Lunar Operating System
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal text-foreground leading-[1.05] opacity-0 animate-fade-in-up delay-100 mb-6">
                Predict The Future. <br />
                <span className="italic">By Creating It.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed opacity-0 animate-fade-in-up delay-200 mb-8">
                The Moon visits 96 unique configurations every month—each phase expressing differently 
                through each zodiac sign, activating specific regions of your body. This is your map 
                to continuous, embodied lunar living.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground opacity-0 animate-fade-in delay-300">
                <ArrowDown className="w-4 h-4 animate-bounce" />
                <span>Scroll to explore the living system</span>
              </div>
            </div>
          </section>

          <div className="divider-line container mx-auto opacity-0 animate-fade-in delay-400 mb-24" />

          {/* Live Status Section */}
          <section className="container mx-auto px-6 lg:px-12 mb-32">
            <ScrollReveal>
              <LunarLiveStatus />
            </ScrollReveal>
          </section>

          <div className="divider-line container mx-auto mb-24" />

          {/* Phase-Sign Matrix Section */}
          <section className="container mx-auto px-6 lg:px-12 mb-32">
            <ScrollReveal>
              <PhaseSignMatrix />
            </ScrollReveal>
          </section>

          <div className="divider-line container mx-auto mb-24" />

          {/* Zodiac Body Map Section */}
          <section className="container mx-auto px-6 lg:px-12 mb-32">
            <ScrollReveal>
              <ZodiacBodyMap />
            </ScrollReveal>
          </section>

          <div className="divider-line container mx-auto mb-24" />

          {/* Integration Message */}
          <section className="container mx-auto px-6 lg:px-12">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center">
                <span className="system-label block mb-6">The Continuous Companion</span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mb-8">
                  The Party Never Stops. <br />
                  <span className="italic">You're Already Invited.</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
                  This isn't about checking horoscopes or waiting for eclipses. The Moon cycles through 
                  every phase, every sign, every body zone—continuously. Big Astrology only shows up 
                  for the big events. We're here for the entire journey.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="/workbooks" className="system-button">
                    Explore Workbooks
                  </a>
                  <a 
                    href="/method" 
                    className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
                  >
                    <span>Learn Phasecraft</span>
                    <span>→</span>
                  </a>
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

export default LunarSystem;