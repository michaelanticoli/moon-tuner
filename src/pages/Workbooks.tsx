import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { JourneyPreview } from "@/components/JourneyPreview";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, BookOpen, Check, Moon, Star } from "lucide-react";
import { Link } from "react-router-dom";

// Full Moon → New Moon Series (1-12)
const fullToNewWorkbooks = [
  {
    number: 1,
    title: "From Bone to Heart",
    journey: "Capricorn → Leo",
    body: "Knees/Bones → Heart/Solar Plexus",
    essence: "Structure shifting into expressive heart-based creativity",
    season: "Winter structure flowing into summer expression"
  },
  {
    number: 2,
    title: "From Heart to Mind",
    journey: "Leo → Aquarius",
    body: "Heart/Solar Plexus → Nervous System/Higher Mind",
    essence: "Creative identity expanding into collective innovation",
    season: "Summer creativity expanding into winter innovation"
  },
  {
    number: 3,
    title: "From Mind to Gut",
    journey: "Aquarius → Virgo",
    body: "Nervous System/Higher Mind → Digestive System",
    essence: "Visionary concepts grounding through service and analysis",
    season: "Winter visions grounding into late summer harvest"
  },
  {
    number: 4,
    title: "From Gut to Soul",
    journey: "Virgo → Pisces",
    body: "Digestive System/Gut Instinct → Feet/Etheric Body",
    essence: "Precision dissolving into universal compassion",
    season: "Harvest wisdom flowing into spring transcendence"
  },
  {
    number: 5,
    title: "From Soul to Balance",
    journey: "Pisces → Libra",
    body: "Feet/Etheric Body → Kidneys/Balance",
    essence: "Mystical awareness forming relational harmony",
    season: "Spring transcendence balancing into autumn harmony"
  },
  {
    number: 6,
    title: "From Balance to Fire",
    journey: "Libra → Aries",
    body: "Kidneys/Balance → Head/Initiation",
    essence: "Harmony igniting bold individual action",
    season: "Autumn balance sparking into spring initiation"
  },
  {
    number: 7,
    title: "From Fire to Depth",
    journey: "Aries → Scorpio",
    body: "Head/Initiative → Reproductive Organs/Transformation",
    essence: "Raw energy deepening into transformative power",
    season: "Spring initiation deepening into autumn transformation"
  },
  {
    number: 8,
    title: "From Depth to Root",
    journey: "Scorpio → Taurus",
    body: "Reproductive Organs/Shadow → Throat/Voice",
    essence: "Hidden power grounding into embodied voice",
    season: "Autumn depths rooting into spring embodiment"
  },
  {
    number: 9,
    title: "From Root to Vision",
    journey: "Taurus → Sagittarius",
    body: "Throat/Voice/Stability → Hips/Expansion",
    essence: "Stability opening into philosophical exploration",
    season: "Spring embodiment expanding into autumn wisdom"
  },
  {
    number: 10,
    title: "From Vision to Voice",
    journey: "Sagittarius → Gemini",
    body: "Hips/Philosophy → Lungs/Communication",
    essence: "Wisdom translated into communication",
    season: "Autumn wisdom speaking into spring communication"
  },
  {
    number: 11,
    title: "From Voice to Womb",
    journey: "Gemini → Cancer",
    body: "Lungs/Arms/Communication → Breast/Nurturing",
    essence: "Intellectual connection softening into emotional nourishment",
    season: "Spring communication nurturing into summer care"
  },
  {
    number: 12,
    title: "From Womb to Bone",
    journey: "Cancer → Capricorn",
    body: "Breast/Stomach/Home → Knees/Bones/Structure",
    essence: "Emotional grounding forming long-term structure",
    season: "Summer nurturing structuring into winter foundation"
  }
];

// New Moon → Full Moon Series (13-24)
const newToFullWorkbooks = [
  {
    number: 13,
    title: "Heart Expanding to Mind",
    journey: "Leo → Aquarius",
    body: "Heart/Solar Plexus → Nervous System/Higher Mind",
    essence: "Creativity building toward visionary leadership",
    season: "Summer creativity expanding into winter innovation"
  },
  {
    number: 14,
    title: "Mind Manifesting Through Gut",
    journey: "Aquarius → Virgo",
    body: "Nervous System/Higher Mind → Digestive System",
    essence: "Innovation becoming practical implementation",
    season: "Winter innovation manifesting into late summer harvest"
  },
  {
    number: 15,
    title: "Gut Flowing to Soul",
    journey: "Virgo → Pisces",
    body: "Digestive System/Gut Instinct → Feet/Etheric Body",
    essence: "Practical wisdom flowing into spiritual unity",
    season: "Late summer practicality flowing into spring transcendence"
  },
  {
    number: 16,
    title: "Soul Balancing Through Harmony",
    journey: "Pisces → Libra",
    body: "Feet/Etheric Body → Kidneys/Balance",
    essence: "Transcendence manifesting as relational harmony",
    season: "Spring transcendence balancing into autumn harmony"
  },
  {
    number: 17,
    title: "Balance Igniting to Fire",
    journey: "Libra → Aries",
    body: "Kidneys/Balance → Head/Brain",
    essence: "Diplomatic groundwork sparking courageous initiation",
    season: "Autumn balance igniting into spring courage"
  },
  {
    number: 18,
    title: "Fire Deepening to Shadow",
    journey: "Aries → Scorpio",
    body: "Head/Initiative → Reproductive Organs/Transformation",
    essence: "Action evolving into psychological mastery",
    season: "Spring action deepening into autumn transformation"
  },
  {
    number: 19,
    title: "Depth Rooting in Earth",
    journey: "Scorpio → Taurus",
    body: "Shadow/Transformation → Throat/Stability",
    essence: "Transformed power grounding into tangible embodiment",
    season: "Autumn depths rooting into spring embodiment"
  },
  {
    number: 20,
    title: "Root Expanding to Vision",
    journey: "Taurus → Sagittarius",
    body: "Throat/Stability → Hips/Expansion",
    essence: "Embodied values evolving into philosophical wisdom",
    season: "Spring stability expanding into autumn wisdom"
  },
  {
    number: 21,
    title: "Vision Speaking Through Voice",
    journey: "Sagittarius → Gemini",
    body: "Hips/Philosophy → Lungs/Communication",
    essence: "Grand vision becoming articulate expression",
    season: "Autumn wisdom speaking into spring communication"
  },
  {
    number: 22,
    title: "Voice Nourishing to Womb",
    journey: "Gemini → Cancer",
    body: "Lungs/Communication → Breast/Nurturing",
    essence: "Communication ripening into emotional sanctuary",
    season: "Spring communication nurturing into summer care"
  },
  {
    number: 23,
    title: "Womb Structuring to Bone",
    journey: "Cancer → Capricorn",
    body: "Breast/Nurturing → Knees/Bones",
    essence: "Care forming long-term foundations",
    season: "Summer nurturing structuring into winter foundation"
  },
  {
    number: 24,
    title: "Bone Warming to Heart",
    journey: "Capricorn → Leo",
    body: "Knees/Bones → Heart/Solar Plexus",
    essence: "Structure growing into joyful expression",
    season: "Winter structure warming into summer expression"
  }
];

// Eclipse Portal Specials (25-26)
const eclipseWorkbooks = [
  {
    number: 25,
    title: "Virgo–Aries Eclipse Portal",
    journey: "Virgo → Aries",
    body: "Digestive System/Analysis → Head/Initiative",
    essence: "Eclipse transformation: releasing perfectionism for bold initiation",
    season: "Analysis transforming into action"
  },
  {
    number: 26,
    title: "Pisces–Virgo Eclipse Portal",
    journey: "Pisces → Virgo",
    body: "Feet/Etheric Body → Digestive System",
    essence: "Eclipse completion: spiritual insight grounding into service",
    season: "Transcendence grounding into practical wisdom"
  }
];

const WorkbookCard = ({ workbook, isEclipse = false }: { workbook: typeof fullToNewWorkbooks[0], isEclipse?: boolean }) => (
  <div className={`node-card h-full ${isEclipse ? 'border-accent/40 bg-accent/5' : ''}`}>
    <div className="flex items-center justify-between mb-4">
      <span className="system-label text-accent">{workbook.number} of 26</span>
      <span className={`text-xs px-2 py-1 rounded-full ${isEclipse ? 'bg-accent/20 text-accent' : 'bg-card/50 text-muted-foreground'}`}>
        {workbook.journey}
      </span>
    </div>
    
    {isEclipse && (
      <div className="flex items-center gap-2 mb-3">
        <Star className="w-4 h-4 text-accent" />
        <span className="text-xs text-accent uppercase tracking-wide">Eclipse Portal</span>
      </div>
    )}
    
    <h3 className="font-serif text-xl text-foreground mb-3">{workbook.title}</h3>
    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{workbook.essence}</p>
    
    <div className="space-y-2 text-xs text-muted-foreground/60 border-t border-border/30 pt-4">
      <div className="flex items-start gap-2">
        <Moon className="w-3 h-3 mt-0.5 shrink-0" />
        <span>{workbook.body}</span>
      </div>
      <div className="italic">{workbook.season}</div>
    </div>
    
    <div className="mt-6 flex gap-2">
      <Button variant="gold" size="sm" className="flex-1" asChild>
        <a href="/downloads/Timing_with_the_Moon_Lunar_Guide__Workbook.pdf" download>
          <Download className="w-3 h-3 mr-1" />
          PDF
        </a>
      </Button>
      <Button variant="outline" size="sm" asChild>
        <a href="/downloads/Timing_with_the_Moon_Lunar_Guide_Workbook.epub.zip" download>
          EPUB
        </a>
      </Button>
    </div>
  </div>
);

const Workbooks = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative grain-overlay">
        <Navigation />
        
        <main className="pt-24 lg:pt-32">
          {/* Hero Section */}
          <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/30 rounded-full mb-8">
                  <span className="text-accent text-sm uppercase tracking-wide">Timeless Archetypal Wisdom</span>
                </div>
                
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-tight">
                  Evergreen Lunar Series
                </h1>
                
                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
                  Complete 26-Workbook Timeless Collection
                </p>
                
                <p className="text-muted-foreground max-w-xl mx-auto">
                  24 Archetypal Lunar Cycles + 2 Eclipse Portal Specials. Your lifetime guide to body-based lunar wisdom.
                </p>
              </div>
            </ScrollReveal>
          </section>

          {/* What is a Lunar Chaperone */}
          <section className="container mx-auto px-6 lg:px-12 py-16 border-t border-border/30">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <ScrollReveal>
                  <div>
                    <span className="system-label block mb-6">The Concept</span>
                    <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-8">
                      What is a Lunar Chaperone?
                    </h2>
                    <div className="space-y-6 text-muted-foreground leading-relaxed">
                      <p>
                        A chaperone guides without controlling. It accompanies without dictating. The Lunar Chaperone workbooks serve exactly this purpose—they walk beside you through each phase, offering structure without prescription.
                      </p>
                      <p>
                        Each workbook follows a 14-day arc from intention to integration, with daily prompts, exercises, and reflections designed to help you attune to the specific energy of its archetypal journey.
                      </p>
                    </div>
                    
                    <div className="mt-8">
                      <Link to="/lunar-chaperone">
                        <Button variant="outline">
                          Learn About the Campaign
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal delay={0.2}>
                  <div className="node-card">
                    <h3 className="font-serif text-xl text-foreground mb-6">Who It's For</h3>
                    <ul className="space-y-4 text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                        <span>Path walkers, not peak chasers</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                        <span>Those seeking integration over inspiration</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                        <span>Practitioners ready to work every day of the cycle</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                        <span>Anyone tired of the 3-day drop-off</span>
                      </li>
                    </ul>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* 14-Day Journey Preview */}
          <JourneyPreview />

          {/* Full Moon → New Moon Series */}
          <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <div className="max-w-7xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <span className="system-label block mb-6">Series One</span>
                  <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
                    Full Moon → New Moon
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    12 workbooks for the waning phase—releasing, integrating, and preparing for renewal.
                  </p>
                </div>
              </ScrollReveal>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {fullToNewWorkbooks.map((workbook, index) => (
                  <ScrollReveal key={workbook.title} delay={index * 0.03}>
                    <WorkbookCard workbook={workbook} />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* New Moon → Full Moon Series */}
          <section className="bg-card/20 border-y border-border/30">
            <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
              <div className="max-w-7xl mx-auto">
                <ScrollReveal>
                  <div className="text-center mb-16">
                    <span className="system-label block mb-6">Series Two</span>
                    <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
                      New Moon → Full Moon
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      12 workbooks for the waxing phase—building, manifesting, and illuminating.
                    </p>
                  </div>
                </ScrollReveal>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {newToFullWorkbooks.map((workbook, index) => (
                    <ScrollReveal key={workbook.title} delay={index * 0.03}>
                      <WorkbookCard workbook={workbook} />
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Eclipse Portal Specials */}
          <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full mb-6">
                    <Star className="w-4 h-4 text-accent" />
                    <span className="text-accent text-sm uppercase tracking-wide">Advanced</span>
                  </div>
                  <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
                    Eclipse Portal Specials
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    For those ready to work with the intensified energy of eclipse seasons. Specialized practices for threshold crossings.
                  </p>
                </div>
              </ScrollReveal>
              
              <div className="grid md:grid-cols-2 gap-8">
                {eclipseWorkbooks.map((workbook, index) => (
                  <ScrollReveal key={workbook.title} delay={index * 0.1}>
                    <WorkbookCard workbook={workbook} isEclipse />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* Why Evergreen */}
          <section className="bg-accent/5 border-y border-accent/20">
            <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
              <div className="max-w-4xl mx-auto text-center">
                <ScrollReveal>
                  <span className="system-label block mb-6">Timeless Value</span>
                  <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
                    Why <span className="italic">Evergreen?</span>
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
                    These workbooks transcend specific dates and years. They contain archetypal wisdom that remains true whether you're using them in 2026, 2030, or beyond.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="node-card">
                      <h3 className="font-serif text-lg text-foreground mb-2">Lifetime Investment</h3>
                      <p className="text-muted-foreground text-sm">Use forever—no yearly updates needed</p>
                    </div>
                    <div className="node-card">
                      <h3 className="font-serif text-lg text-foreground mb-2">Archetypal Depth</h3>
                      <p className="text-muted-foreground text-sm">Timeless patterns deepen with each cycle</p>
                    </div>
                    <div className="node-card">
                      <h3 className="font-serif text-lg text-foreground mb-2">Flexible Timing</h3>
                      <p className="text-muted-foreground text-sm">Work with any lunar cycle in any year</p>
                    </div>
                    <div className="node-card">
                      <h3 className="font-serif text-lg text-foreground mb-2">Premium Value</h3>
                      <p className="text-muted-foreground text-sm">Reference-quality vs. disposable content</p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Bundle CTA */}
          <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <ScrollReveal>
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">
                  Get the Complete Series
                </h2>
                <p className="text-muted-foreground mb-10 leading-relaxed">
                  Download all 26 workbooks—24 archetypal cycles plus 2 eclipse portal specials—as a complete bundle.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="gold" size="lg">
                    Download Complete Series
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Link to="/lunar-chaperone">
                    <Button variant="outline" size="lg">
                      Learn About the Campaign
                    </Button>
                  </Link>
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

export default Workbooks;
