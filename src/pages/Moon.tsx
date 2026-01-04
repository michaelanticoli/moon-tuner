import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { InteractivePhaseDial } from "@/components/InteractivePhaseDial";
import { MoonPhaseIndicator } from "@/components/MoonPhaseIndicator";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Calculate current moon phase
function calculateCurrentPhase() {
  const now = new Date();
  const knownNewMoon = new Date('2024-01-11T11:57:00Z');
  const lunarCycle = 29.53059;
  const daysSinceNew = (now.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const currentCycleDay = daysSinceNew % lunarCycle;
  const phaseIndex = Math.floor((currentCycleDay / lunarCycle) * 8) % 8;
  
  const phases = [
    { name: "New Moon", quality: "Stillness", frequency: "396 Hz" },
    { name: "Waxing Crescent", quality: "Emergence", frequency: "417 Hz" },
    { name: "First Quarter", quality: "Action", frequency: "528 Hz" },
    { name: "Waxing Gibbous", quality: "Refinement", frequency: "639 Hz" },
    { name: "Full Moon", quality: "Illumination", frequency: "741 Hz" },
    { name: "Waning Gibbous", quality: "Gratitude", frequency: "852 Hz" },
    { name: "Last Quarter", quality: "Release", frequency: "963 Hz" },
    { name: "Waning Crescent", quality: "Surrender", frequency: "432 Hz" }
  ];
  
  return phases[phaseIndex];
}

function SongOfTheMoonPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const currentPhase = calculateCurrentPhase();
  
  return (
    <div className="bg-primary text-primary-foreground rounded-2xl p-8 lg:p-12 relative overflow-hidden">
      {/* Background Rings */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-primary-foreground/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-primary-foreground/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-primary-foreground/20 rounded-full" />
      </div>
      
      <div className="relative">
        <span className="inline-block text-xs uppercase tracking-ultra text-accent font-medium mb-3">
          Live Stream · 24 Hours
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium mb-4">
          Song of the Moon
        </h2>
        <p className="text-primary-foreground/70 text-sm lg:text-base max-w-xl mb-8">
          A generative lunar tone stream that shifts with the phase. 
          The frequency follows the Moon—waxing, waning, stillness, emergence.
        </p>
        
        {/* Player Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex items-center gap-4">
            {/* Waveform */}
            <div className="flex items-end gap-1 h-12">
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-accent rounded-full"
                  animate={{
                    height: isPlaying 
                      ? [16, Math.random() * 32 + 16, 16]
                      : 16
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.05,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
            
            {/* Play Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </button>
            
            {/* Volume */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-primary-foreground/50" />
              ) : (
                <Volume2 className="w-5 h-5 text-primary-foreground/50" />
              )}
            </button>
          </div>
          
          {/* Current State */}
          <div className="sm:ml-auto text-left sm:text-right">
            <p className="text-xs uppercase tracking-widest text-primary-foreground/50 mb-1">
              Now Playing
            </p>
            <p className="font-serif text-xl text-primary-foreground">
              {currentPhase.name} · {currentPhase.quality}
            </p>
            <p className="text-primary-foreground/50 text-sm">
              {currentPhase.frequency} · Resonance Frequency
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Moon() {
  const [currentPhase, setCurrentPhase] = useState(calculateCurrentPhase());
  
  useEffect(() => {
    // Update phase every hour
    const interval = setInterval(() => {
      setCurrentPhase(calculateCurrentPhase());
    }, 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative grain-overlay">
        <Navigation />
        
        <main className="pt-24 lg:pt-32">
          {/* Hero Section */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-6 lg:px-12">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="inline-block text-xs uppercase tracking-ultra text-accent font-medium mb-4">
                    Live Lunar Interface
                  </span>
                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium mb-6 text-foreground">
                    The Moon
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Make the Moon feel present, not abstract. 
                    Track its phase, feel its quality, and move with its rhythm.
                  </p>
                </div>
              </ScrollReveal>
              
              {/* Current Phase Display */}
              <ScrollReveal delay={0.2}>
                <div className="flex justify-center mb-16">
                  <MoonPhaseIndicator />
                </div>
              </ScrollReveal>
            </div>
          </section>
          
          {/* Interactive Phase Dial */}
          <section className="py-16 lg:py-24 bg-secondary/30">
            <div className="container mx-auto px-6 lg:px-12">
              <ScrollReveal>
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="inline-block text-xs uppercase tracking-ultra text-accent font-medium mb-4">
                    Explore
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-medium mb-4 text-foreground">
                    Phase Dial
                  </h2>
                  <p className="text-muted-foreground">
                    Scroll through the phases to feel tonal shifts. 
                    Each phase carries its own energetic quality.
                  </p>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={0.2}>
                <InteractivePhaseDial />
              </ScrollReveal>
            </div>
          </section>
          
          {/* Song of the Moon */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-6 lg:px-12">
              <ScrollReveal>
                <SongOfTheMoonPlayer />
              </ScrollReveal>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-16 lg:py-24 border-t border-border">
            <div className="container mx-auto px-6 lg:px-12">
              <ScrollReveal>
                <div className="text-center max-w-2xl mx-auto">
                  <h2 className="font-serif text-2xl sm:text-3xl font-medium mb-4 text-foreground">
                    Work With This Phase
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Track your intentions and align your actions with the current lunar phase 
                    using the Moontuner app.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button variant="gold" size="lg">
                      Track This Phase
                    </Button>
                    <Button variant="outline" size="lg">
                      Learn the Method
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
}
