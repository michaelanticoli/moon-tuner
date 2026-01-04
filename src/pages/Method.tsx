import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Circle, Moon, Compass, Waves } from "lucide-react";

const phases = [
  {
    name: "New Moon",
    posture: "Stillness & Intention",
    misalignment: "Forcing action before clarity arrives",
    relationship: "Set quiet intentions. Plant seeds in darkness."
  },
  {
    name: "Waxing Crescent",
    posture: "Emergence & Commitment",
    misalignment: "Doubting early momentum",
    relationship: "Take the first step. Trust the direction."
  },
  {
    name: "First Quarter",
    posture: "Action & Decision",
    misalignment: "Avoiding necessary choices",
    relationship: "Make decisions. Push through resistance."
  },
  {
    name: "Waxing Gibbous",
    posture: "Refinement & Patience",
    misalignment: "Impatience with the process",
    relationship: "Adjust and refine. Trust the timing."
  },
  {
    name: "Full Moon",
    posture: "Illumination & Celebration",
    misalignment: "Ignoring what's revealed",
    relationship: "See clearly. Acknowledge progress."
  },
  {
    name: "Waning Gibbous",
    posture: "Gratitude & Teaching",
    misalignment: "Hoarding wisdom",
    relationship: "Share what you've learned. Give back."
  },
  {
    name: "Last Quarter",
    posture: "Release & Forgiveness",
    misalignment: "Clinging to what's complete",
    relationship: "Let go of what no longer serves."
  },
  {
    name: "Waning Crescent",
    posture: "Rest & Surrender",
    misalignment: "Pushing through exhaustion",
    relationship: "Rest deeply. Prepare for renewal."
  }
];

const Method = () => {
  return (
    <div className="min-h-screen bg-background relative grain-overlay">
      <Navigation />
      
      <main className="pt-24 lg:pt-32">
        {/* Hero Section */}
        <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gold font-medium tracking-widest text-sm uppercase mb-6">
              The Moontuner Method
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-tight">
              Phasecraft
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              A resonance-based system for aligning your intentions, energy, and momentum with the Moon's natural rhythm.
            </p>
          </div>
        </section>

        {/* What is Phasecraft */}
        <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24 border-t border-border/30">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div>
                <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-8">
                  What Phasecraft Is
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    Phasecraft is the practice of living in conscious relationship with cyclical time. It's not about prediction or fate—it's about attunement.
                  </p>
                  <p>
                    The Moon moves through eight distinct phases every 29.5 days, each carrying its own energetic quality. Phasecraft teaches you to recognize these qualities and work with them—not against them.
                  </p>
                  <p>
                    Think of it as tempo markings for your life. Some phases support action and decision. Others invite rest and reflection. When you align your efforts with these natural rhythms, you stop fighting against the current.
                  </p>
                </div>
              </div>
              
              <div className="bg-card/30 border border-border/50 rounded-2xl p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <Compass className="w-6 h-6 text-gold" />
                  <h3 className="font-serif text-xl text-foreground">Core Principles</h3>
                </div>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    <span>Resonance over ritual—feel, don't follow blindly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    <span>Awareness over optimization—notice, don't exploit</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    <span>Guidance over instruction—the Moon suggests, you decide</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    <span>Practice over perfection—alignment is cultivated, not achieved</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Lunar Timing Works */}
        <section className="bg-card/20 border-y border-border/30">
          <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
                Why Lunar Timing Works
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                This isn't mysticism—it's pattern recognition. Humans have tracked the Moon for over 30,000 years because its cycles provide a reliable external rhythm to anchor internal experience.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-night-slate/50 border border-border/50 flex items-center justify-center mx-auto mb-6">
                  <Waves className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-3">Natural Rhythm</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  The Moon governs tides, affects sleep patterns, and marks time in a way calendars cannot. Its phases are tangible, observable, and consistent.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-night-slate/50 border border-border/50 flex items-center justify-center mx-auto mb-6">
                  <Moon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-3">Cyclical Awareness</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Linear productivity culture ignores our need for rest and renewal. Lunar timing restores the cycle—building, releasing, resting, beginning again.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-night-slate/50 border border-border/50 flex items-center justify-center mx-auto mb-6">
                  <Circle className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-3">Embodied Practice</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  When you align action with phase, you develop an embodied sense of timing—knowing when to push, when to pause, when to pivot.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The 8-Phase Framework */}
        <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
                The 8-Phase Framework
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Each lunar phase carries a distinct energetic quality. Understanding these phases helps you work with natural momentum rather than against it.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {phases.map((phase, index) => (
                <div 
                  key={phase.name}
                  className="bg-card/30 border border-border/50 rounded-xl p-6 hover:border-gold/30 transition-colors duration-500"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-night-slate border border-border/50 flex items-center justify-center">
                      <span className="text-gold text-xs font-medium">{index + 1}</span>
                    </div>
                    <h3 className="font-serif text-lg text-foreground">{phase.name}</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gold/80 text-xs uppercase tracking-wide mb-1">Posture</p>
                      <p className="text-muted-foreground">{phase.posture}</p>
                    </div>
                    <div>
                      <p className="text-gold/80 text-xs uppercase tracking-wide mb-1">Common Misalignment</p>
                      <p className="text-muted-foreground">{phase.misalignment}</p>
                    </div>
                    <div>
                      <p className="text-gold/80 text-xs uppercase tracking-wide mb-1">Relationship to Goals</p>
                      <p className="text-foreground/90">{phase.relationship}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="bg-night-slate border-y border-border/30">
          <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-12 text-center">
                The Philosophy
              </h2>
              
              <div className="space-y-8 text-muted-foreground leading-relaxed">
                <div className="border-l-2 border-gold/40 pl-6">
                  <h3 className="font-serif text-xl text-foreground mb-3">Resonance, Not Ritual</h3>
                  <p>
                    Phasecraft isn't about following rules. It's about developing sensitivity to natural rhythms and responding authentically. There's no "right way" to work with the Moon—only your way.
                  </p>
                </div>
                
                <div className="border-l-2 border-gold/40 pl-6">
                  <h3 className="font-serif text-xl text-foreground mb-3">Awareness Over Optimization</h3>
                  <p>
                    This isn't productivity hacking dressed in celestial clothing. The goal isn't to squeeze more out of yourself by timing things better. It's to live more consciously, with greater respect for your own cycles of energy and rest.
                  </p>
                </div>
                
                <div className="border-l-2 border-gold/40 pl-6">
                  <h3 className="font-serif text-xl text-foreground mb-3">You Move With the Moon</h3>
                  <p>
                    The Moon doesn't command you. It doesn't predict your future or determine your fate. It offers a mirror, a rhythm, a companion in the dark. You are not beneath the Moon—you move with it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
              Begin Your Practice
            </h2>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Ready to explore Phasecraft? Start with the Lunar Chaperone workbook series—a guided practice for each phase of the Moon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gold" size="lg" asChild>
                <a href="/workbooks">
                  Explore Workbooks
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/app">
                  Try the App
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Method;
