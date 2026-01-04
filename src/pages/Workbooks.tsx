import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, BookOpen, Check } from "lucide-react";

const workbooks = [
  {
    title: "New Moon",
    subtitle: "Intentions & Beginnings",
    description: "A guided practice for planting seeds in the dark. Set intentions, clarify desires, and prepare for the cycle ahead.",
    color: "from-slate-900 to-slate-800",
    features: ["Intention-setting prompts", "Clarity exercises", "Vision mapping", "Seed planting ritual"]
  },
  {
    title: "Waxing Moon",
    subtitle: "Action & Momentum",
    description: "Build energy and take aligned action. This workbook guides you through the growing phase with focus and commitment.",
    color: "from-slate-800 to-slate-700",
    features: ["Action planning", "Momentum tracking", "Decision frameworks", "Energy cultivation"]
  },
  {
    title: "Full Moon",
    subtitle: "Illumination & Celebration",
    description: "See what's been revealed. Celebrate progress, acknowledge growth, and work with the peak energy of the cycle.",
    color: "from-gold/20 to-slate-800",
    features: ["Reflection prompts", "Celebration rituals", "Illumination exercises", "Gratitude practice"]
  },
  {
    title: "Waning Moon",
    subtitle: "Release & Integration",
    description: "Let go of what no longer serves. This workbook guides you through releasing, forgiving, and preparing for rest.",
    color: "from-slate-700 to-slate-900",
    features: ["Release ceremonies", "Forgiveness work", "Integration prompts", "Rest preparation"]
  }
];

const eclipseWorkbook = {
  title: "Eclipse Windows",
  subtitle: "Advanced Practice",
  description: "For those ready to work with the intensified energy of eclipses. This advanced workbook covers both solar and lunar eclipses with specialized practices.",
  features: ["Eclipse preparation", "Portal navigation", "Shadow work", "Threshold crossing"]
};

const Workbooks = () => {
  return (
    <div className="min-h-screen bg-background relative grain-overlay">
      <Navigation />
      
      <main className="pt-24 lg:pt-32">
        {/* Hero Section */}
        <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gold font-medium tracking-widest text-sm uppercase mb-6">
              Lunar Chaperone Series
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-tight">
              Workbooks
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Practical guides for embodying each phase of the Moon. Work with the cycle, not against it.
            </p>
          </div>
        </section>

        {/* What is a Lunar Chaperone */}
        <section className="container mx-auto px-6 lg:px-12 py-16 border-t border-border/30">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-8">
                  What is a Lunar Chaperone?
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    A chaperone guides without controlling. It accompanies without dictating. The Lunar Chaperone workbooks serve exactly this purpose—they walk beside you through each phase, offering structure without prescription.
                  </p>
                  <p>
                    Each workbook contains prompts, exercises, and reflections designed to help you attune to the specific energy of its phase. Use them daily, weekly, or monthly—whatever rhythm resonates.
                  </p>
                </div>
              </div>
              
              <div className="bg-card/30 border border-border/50 rounded-2xl p-8">
                <h3 className="font-serif text-xl text-foreground mb-6">Who It's For</h3>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                    <span>People seeking rhythm in their personal development</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                    <span>Those curious about lunar timing without the mysticism</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                    <span>Creatives, entrepreneurs, and anyone in cyclical work</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                    <span>Practitioners ready to deepen their Phasecraft</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Main Workbooks Grid */}
        <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
                The Core Series
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Four workbooks for the four major lunar phases. Each designed for deep work with its specific energy.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {workbooks.map((workbook) => (
                <div 
                  key={workbook.title}
                  className="group bg-card/30 border border-border/50 rounded-2xl overflow-hidden hover:border-gold/30 transition-all duration-500"
                >
                  <div className={`h-32 bg-gradient-to-br ${workbook.color} flex items-center justify-center`}>
                    <BookOpen className="w-12 h-12 text-gold/60" />
                  </div>
                  <div className="p-8">
                    <div className="mb-4">
                      <p className="text-gold/80 text-sm uppercase tracking-wide mb-1">{workbook.subtitle}</p>
                      <h3 className="font-serif text-2xl text-foreground">{workbook.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {workbook.description}
                    </p>
                    <div className="mb-6">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">Includes</p>
                      <div className="flex flex-wrap gap-2">
                        {workbook.features.map((feature) => (
                          <span 
                            key={feature}
                            className="text-xs px-3 py-1 bg-night-slate/50 border border-border/30 rounded-full text-muted-foreground"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="gold" size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        Preview
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Eclipse Workbook */}
        <section className="bg-card/20 border-y border-border/30">
          <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-block px-3 py-1 bg-gold/10 border border-gold/30 rounded-full text-gold text-xs uppercase tracking-wide mb-6">
                    Advanced
                  </span>
                  <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-4">
                    {eclipseWorkbook.title}
                  </h2>
                  <p className="text-gold/80 text-lg mb-6">{eclipseWorkbook.subtitle}</p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {eclipseWorkbook.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {eclipseWorkbook.features.map((feature) => (
                      <span 
                        key={feature}
                        className="text-xs px-3 py-1 bg-night-slate/50 border border-border/30 rounded-full text-muted-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <Button variant="gold">
                    <Download className="w-4 h-4 mr-2" />
                    Download Eclipse Workbook
                  </Button>
                </div>
                
                <div className="bg-night-slate border border-border/50 rounded-2xl p-8 lg:p-12">
                  <div className="aspect-square relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-radial from-gold/5 to-transparent rounded-full" />
                    <div className="w-32 h-32 rounded-full bg-background border-4 border-gold/30 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-night-slate" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use */}
        <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
                How to Use the Workbooks
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-night-slate/50 border border-border/50 flex items-center justify-center mx-auto mb-6">
                  <span className="font-serif text-2xl text-gold">1</span>
                </div>
                <h3 className="font-serif text-xl text-foreground mb-3">Daily Practice</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Spend 5-10 minutes each day with the prompts relevant to the current phase. Small, consistent practice builds attunement over time.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-night-slate/50 border border-border/50 flex items-center justify-center mx-auto mb-6">
                  <span className="font-serif text-2xl text-gold">2</span>
                </div>
                <h3 className="font-serif text-xl text-foreground mb-3">Weekly Reflection</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Set aside time once a week for deeper work. Use the longer exercises and journaling prompts to process what's emerging.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-night-slate/50 border border-border/50 flex items-center justify-center mx-auto mb-6">
                  <span className="font-serif text-2xl text-gold">3</span>
                </div>
                <h3 className="font-serif text-xl text-foreground mb-3">Monthly Cycle</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Work through one complete lunar cycle, using each workbook as the Moon moves through its phases. Review and integrate at month's end.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bundle CTA */}
        <section className="bg-night-slate border-t border-border/30">
          <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
                Get the Complete Series
              </h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                Download all four core workbooks plus the Eclipse Windows advanced workbook as a complete bundle.
              </p>
              <Button variant="gold" size="lg">
                Download Complete Series
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Workbooks;
