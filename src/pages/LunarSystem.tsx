import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { LunarLiveStatus } from "@/components/LunarLiveStatus";
import { PhaseSignMatrix } from "@/components/PhaseSignMatrix";
import { ZodiacBodyMap } from "@/components/ZodiacBodyMap";
import { ArrowDown } from "lucide-react";
import { DeepDiveSection } from "@/components/DeepDiveSection";
import { SEOHead } from "@/components/SEOHead";
import phasesGold from "@/assets/graphic-phases-gold.png";
import waveDivider from "@/assets/graphic-wave-phases-divider.png";
import phaseWaveforms from "@/assets/graphic-phase-waveforms.png";

const LunarSystem = () => {
  return (
    <PageTransition>
      <SEOHead
        title="The Lunar System — 96 Phase-Sign Configurations"
        description="The complete lunar operating system. Explore the phase-sign matrix, zodiac body map, eclipse cycles, and live lunar status — the full framework behind Moontuner."
        canonical="/lunar-system"
        keywords={["lunar system", "moon phases zodiac", "phase sign matrix", "96 lunar configurations", "eclipse cycles"]}
      />
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
                The Moon visits 96 unique configurations every year—each phase expressing differently through each
                zodiac sign, activating specific regions of your body. This is your map to continuous, embodied lunar
                living.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground opacity-0 animate-fade-in delay-300">
                <ArrowDown className="w-4 h-4 animate-bounce" />
                <span>Scroll to explore the living system</span>
              </div>
            </div>
            <img
              src={phasesGold}
              alt=""
              aria-hidden="true"
              className="pointer-events-none select-none mx-auto mt-16 w-full max-w-4xl opacity-60"
              loading="lazy"
            />
          </section>

          <div className="divider-line container mx-auto opacity-0 animate-fade-in delay-400 mb-24" />

          {/* Live Status Section */}
          <section className="container mx-auto px-6 lg:px-12 mb-32">
            <ScrollReveal>
              <LunarLiveStatus />
            </ScrollReveal>
          </section>

          {/* Deep Dive: Synodic Month */}
          <section className="container mx-auto px-6 lg:px-12 mb-16">
            <ScrollReveal>
              <DeepDiveSection
                title="The Science Behind the Synodic Month"
                subtitle="29.53 days of cosmic mechanics — the foundation of every lunar cycle"
                category="synodic"
                contextHint="The synodic month and how it structures the 8-phase system"
              />
            </ScrollReveal>
          </section>

          <div className="divider-line container mx-auto mb-24" />

          {/* Phase-Sign Matrix Section */}
          <section className="container mx-auto px-6 lg:px-12 mb-32">
            <ScrollReveal>
              <PhaseSignMatrix />
            </ScrollReveal>
          </section>

          {/* Deep Dive: Eclipse Cycles */}
          <section className="container mx-auto px-6 lg:px-12 mb-16">
            <ScrollReveal>
              <DeepDiveSection
                title="Eclipse Cycles & the Saros"
                subtitle="18-year return patterns — the ancient rhythm of solar and lunar eclipses"
                category="saros"
                contextHint="Saros eclipse cycles and their 18.03-year periodicity"
              />
            </ScrollReveal>
          </section>

          <div className="divider-line container mx-auto mb-24" />

          <div className="container mx-auto px-6 lg:px-12 mb-16">
            <img
              src={phaseWaveforms}
              alt=""
              aria-hidden="true"
              className="mx-auto w-full max-w-3xl opacity-40"
              loading="lazy"
            />
          </div>

          {/* Zodiac Body Map Section */}
          <section className="container mx-auto px-6 lg:px-12 mb-32">
            <ScrollReveal>
              <ZodiacBodyMap />
            </ScrollReveal>
          </section>

          <div className="container mx-auto px-6 lg:px-12 mb-24">
            <img
              src={waveDivider}
              alt=""
              aria-hidden="true"
              className="mx-auto w-full max-w-3xl opacity-30"
              loading="lazy"
            />
          </div>

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
                  This isn't about checking horoscopes or waiting for eclipses. The Moon cycles through every phase,
                  every sign, every body zone—continuously. Big Astrology only shows up for the big events. We're here
                  for the entire journey.
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
