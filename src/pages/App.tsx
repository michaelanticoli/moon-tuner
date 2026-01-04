import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Moon, Target, BookOpen, Volume2, Bell, Shield, Sparkles } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Phase-Based Goal Tracking",
    description: "Set intentions that align with lunar phases. Track progress through complete cycles, not arbitrary deadlines."
  },
  {
    icon: Bell,
    title: "Phase-Aware Nudges",
    description: "Gentle, language-based prompts that shift with the Moon. No aggressive notifications—just quiet reminders to check in."
  },
  {
    icon: BookOpen,
    title: "Private Lunar Journal",
    description: "A dedicated space for reflection, integrated with phase context. Your entries are tagged by lunar phase automatically."
  },
  {
    icon: Volume2,
    title: "Optional Sound Layer",
    description: "The Song of the Moon—a generative, phase-responsive tone that shifts with the lunar cycle. Always optional, always subtle."
  }
];

const differentiators = [
  {
    title: "Reflection Loops, Not Streaks",
    description: "Most apps punish you for missing a day. Moontuner invites you back with curiosity, not guilt. Your practice ebbs and flows like the tide."
  },
  {
    title: "Language That Shifts",
    description: "The app speaks differently during different phases. Waning moon prompts are gentler. New moon prompts are more invitational. The tone follows the cycle."
  },
  {
    title: "Privacy by Design",
    description: "Your lunar journal is yours alone. We don't read it, analyze it, or monetize it. Your inner work stays inner."
  }
];

const MoontunedApp = () => {
  return (
    <div className="min-h-screen bg-background relative grain-overlay">
      <Navigation />
      
      <main className="pt-24 lg:pt-32">
        {/* Hero Section */}
        <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm font-medium tracking-wide mb-8">
              Early Access
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-tight">
              The Moon You<br />Move With
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12">
              A companion app for living in phase. Track intentions, reflect with the cycle, and cultivate awareness of natural rhythm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gold" size="lg">
                Join the Waitlist
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* App Preview */}
        <section className="container mx-auto px-6 lg:px-12 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-night-slate border border-border/50 rounded-3xl p-8 lg:p-12">
              <div className="aspect-video bg-background/5 rounded-2xl border border-border/30 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent" />
                
                {/* Mock App UI */}
                <div className="relative z-10 w-full max-w-sm px-6">
                  <div className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-xs text-gold uppercase tracking-wide">Current Phase</p>
                        <p className="font-serif text-lg text-foreground">Waxing Gibbous</p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-transparent via-lunar-ivory to-lunar-ivory" />
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-gold" />
                        <span className="text-sm text-muted-foreground">Launch newsletter</span>
                        <span className="ml-auto text-xs text-gold/60">In progress</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-muted" />
                        <span className="text-sm text-muted-foreground">Complete course outline</span>
                        <span className="ml-auto text-xs text-muted-foreground/60">Planted</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-border/30">
                      <p className="text-xs text-muted-foreground italic">
                        "This phase supports refinement. What needs adjustment?"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What It Does */}
        <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24 border-t border-border/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
                What It Does
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Moontuner isn't about productivity optimization. It's about developing a felt sense of cyclical time.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature) => (
                <div 
                  key={feature.title}
                  className="bg-card/30 border border-border/50 rounded-xl p-8 hover:border-gold/30 transition-colors duration-500"
                >
                  <div className="w-12 h-12 rounded-xl bg-night-slate/50 border border-border/50 flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Makes It Different */}
        <section className="bg-card/20 border-y border-border/30">
          <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
                  What Makes It Different
                </h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {differentiators.map((item, index) => (
                  <div key={item.title} className="text-center">
                    <div className="w-16 h-16 rounded-full bg-night-slate/50 border border-border/50 flex items-center justify-center mx-auto mb-6">
                      {index === 0 && <Sparkles className="w-7 h-7 text-gold" />}
                      {index === 1 && <Moon className="w-7 h-7 text-gold" />}
                      {index === 2 && <Shield className="w-7 h-7 text-gold" />}
                    </div>
                    <h3 className="font-serif text-xl text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
                Built on Principles
              </h2>
            </div>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <div className="border-l-2 border-gold/40 pl-6">
                <h3 className="font-serif text-xl text-foreground mb-3">Gentleness Over Gamification</h3>
                <p>
                  No badges. No streaks. No shame. The app invites practice without weaponizing it against you. Your consistency is your own business.
                </p>
              </div>
              
              <div className="border-l-2 border-gold/40 pl-6">
                <h3 className="font-serif text-xl text-foreground mb-3">Rhythm Over Goals</h3>
                <p>
                  Goals are fine, but rhythm is better. The app helps you develop a cyclical relationship with your intentions—planting, growing, harvesting, resting.
                </p>
              </div>
              
              <div className="border-l-2 border-gold/40 pl-6">
                <h3 className="font-serif text-xl text-foreground mb-3">Quiet by Default</h3>
                <p>
                  The app doesn't demand your attention. It waits quietly until you're ready. Notifications are opt-in and designed to feel like invitations, not interruptions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Waitlist CTA */}
        <section className="bg-night-slate border-t border-border/30">
          <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-gold font-medium tracking-widest text-sm uppercase mb-4">
                Currently in Beta
              </p>
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
                Join the Waitlist
              </h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                Be among the first to experience Moontuner when it launches. Early access members receive the complete workbook series free.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 bg-background/50 border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors"
                />
                <Button variant="gold">
                  Join Waitlist
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground mt-4">
                No spam. Just lunar timing.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MoontunedApp;
