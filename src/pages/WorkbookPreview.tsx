import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Moon, Star, ArrowRight, ArrowLeft, Check, Sparkles, 
  Circle, Edit3, Heart, Compass, Sun, Waves,
  BookOpen, Calendar, Clock, Feather
} from "lucide-react";
import { WorkbookReference } from "@/components/workbook/WorkbookReference";

// Sample workbook: From Bone to Heart (Capricorn → Leo)
const workbookData = {
  number: 1,
  title: "From Bone to Heart",
  subtitle: "A Lunar Chaperone Workbook",
  journey: "Capricorn → Leo",
  fromSign: "Capricorn",
  toSign: "Leo",
  startPhase: "Full Moon",
  endPhase: "New Moon",
  phaseType: "Full Moon → New Moon",
  bodyArc: "Knees/Bones → Heart/Solar Plexus",
  essence: "Structure shifting into expressive heart-based creativity",
  theme: "From discipline to play, from duty to joy, from holding to releasing"
};

// 14-day journey structure
const journeyDays = [
  { 
    day: 1, 
    phase: "Full Moon", 
    theme: "Illumination", 
    icon: Sun,
    title: "The Light Reveals",
    prompt: "What structure in your life is being fully illuminated right now? Where do you feel the weight of your bones, your commitments, your responsibilities?",
    practice: "Sit with your spine tall. Feel each vertebra stacked. Ask: What am I carrying that was never mine to hold?",
    reflection: "Write about one responsibility you've outgrown but haven't yet released."
  },
  { 
    day: 2, 
    phase: "Disseminating", 
    theme: "Integration", 
    icon: Waves,
    title: "Sharing the Truth",
    prompt: "What wisdom has crystallized through your structured efforts? What have you learned from discipline that others might need to hear?",
    practice: "Speak one truth aloud that you've been holding in your bones. Let it vibrate through your chest.",
    reflection: "Who in your life needs to hear what you've learned? Write them a letter (you may or may not send it)."
  },
  { 
    day: 3, 
    phase: "Disseminating", 
    theme: "Transmission", 
    icon: Sparkles,
    title: "The Teaching Unfolds",
    prompt: "How does your body's wisdom want to be shared? The knees bow, but also rise. The spine supports, but also bends.",
    practice: "Move through sun salutations slowly. Feel the give and take between structure and flow.",
    reflection: "What would you teach if fear of judgment didn't exist?"
  },
  { 
    day: 4, 
    phase: "Last Quarter", 
    theme: "Release", 
    icon: Circle,
    title: "The Half-Light Decision",
    prompt: "You stand at the crossroads. The bone structure you've built—does it still serve the heart you're becoming?",
    practice: "Place one hand on your heart, one on your knee. Feel the conversation between them.",
    reflection: "What must be dismantled for your heart to have room to expand?"
  },
  { 
    day: 5, 
    phase: "Last Quarter", 
    theme: "Surrender", 
    icon: Feather,
    title: "Releasing Grip",
    prompt: "Control is a Capricornian gift that can become a cage. Where are you gripping too tightly?",
    practice: "Open and close your fists 10 times. With each release, name something you're letting go.",
    reflection: "Write a permission slip to yourself: 'I give myself permission to...'"
  },
  { 
    day: 6, 
    phase: "Balsamic", 
    theme: "Descent", 
    icon: Moon,
    title: "Into the Dark",
    prompt: "The moon wanes toward invisible. Your structures dissolve in the dark. What remains when the scaffolding falls?",
    practice: "Sit in complete darkness for 10 minutes. Listen to your heartbeat—the rhythm that needs no external structure.",
    reflection: "In the darkness, what do you discover about your true foundation?"
  },
  { 
    day: 7, 
    phase: "Balsamic", 
    theme: "Gestation", 
    icon: Heart,
    title: "The Heart Remembers",
    prompt: "Between cycles, in the pregnant pause, the heart whispers what it truly wants. Can you hear it beneath the noise of obligation?",
    practice: "Lie flat on your back. Breathe into your solar plexus. Ask: 'Heart, what do you need?'",
    reflection: "Write three things your heart desires that your sense of duty has been postponing."
  },
  { 
    day: 8, 
    phase: "New Moon", 
    theme: "Intention", 
    icon: Star,
    title: "The Seed in Darkness",
    prompt: "A new cycle begins. The Leo sun within you stirs. What wants to be born from the ashes of your outgrown structures?",
    practice: "Light a candle. Place your hands on your heart. Speak your new moon intention aloud.",
    reflection: "Complete: 'I am planting the seed of ______ in my heart.'"
  },
  { 
    day: 9, 
    phase: "Crescent", 
    theme: "Emergence", 
    icon: Sparkles,
    title: "First Light",
    prompt: "The crescent appears—fragile, hopeful. Your heart-seed pushes through the soil of old patterns. What support does it need?",
    practice: "Place your hands on your chest. Hum a single tone for 3 minutes. Feel your heart cavity resonate.",
    reflection: "What resources do you need to nurture this emerging heart-vision?"
  },
  { 
    day: 10, 
    phase: "Crescent", 
    theme: "Gathering", 
    icon: Compass,
    title: "Orienting to Joy",
    prompt: "Leo energy gathers resources through play, not through labor. What brings you genuine, unconditional joy?",
    practice: "Do something purely for pleasure today. No productivity. No outcome. Just joy.",
    reflection: "When was the last time you did something just because it was fun?"
  },
  { 
    day: 11, 
    phase: "First Quarter", 
    theme: "Action", 
    icon: Sun,
    title: "The Courage to Play",
    prompt: "Half the moon illuminated—decision time. Will you choose the old, safe structure, or the risky path of the heart?",
    practice: "Make one choice today that your heart wants but your cautious mind resists.",
    reflection: "What bold action is your heart calling you toward?"
  },
  { 
    day: 12, 
    phase: "First Quarter", 
    theme: "Commitment", 
    icon: Heart,
    title: "Heart-Led Structure",
    prompt: "Leo doesn't abandon structure—it builds structure around what matters. What new architecture does your heart require?",
    practice: "Design a daily rhythm that includes one non-negotiable joy practice.",
    reflection: "How can discipline serve creativity instead of suppressing it?"
  },
  { 
    day: 13, 
    phase: "Gibbous", 
    theme: "Refinement", 
    icon: Edit3,
    title: "Polishing the Expression",
    prompt: "The light grows. Your heart's creation takes shape. What details need attention? What edges need smoothing?",
    practice: "Review your creative work (any form). Make three small improvements with love, not criticism.",
    reflection: "Where is your inner critic actually trying to help, and where is it simply afraid?"
  },
  { 
    day: 14, 
    phase: "Gibbous", 
    theme: "Preparation", 
    icon: Sparkles,
    title: "Before the Full Bloom",
    prompt: "Tomorrow the cycle completes. Today, prepare for visibility. Your heart-creation approaches its moment of revelation.",
    practice: "Visualize your intention fully manifested. Feel it in your body. Where does it live?",
    reflection: "How have you changed from Day 1 to Day 14? What has shifted from bone to heart?"
  }
];

const WorkbookPreview = () => {
  const [currentDay, setCurrentDay] = useState(0);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [reflectionText, setReflectionText] = useState("");

  const activeDay = journeyDays[currentDay];
  const ActiveIcon = activeDay.icon;

  const toggleComplete = (dayIndex: number) => {
    setCompletedDays(prev => 
      prev.includes(dayIndex) 
        ? prev.filter(d => d !== dayIndex)
        : [...prev, dayIndex]
    );
  };

  const progress = (completedDays.length / journeyDays.length) * 100;

  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative grain-overlay">
        <Navigation />
        
        <main className="pt-24 lg:pt-32 pb-20">
          {/* Workbook Header */}
          <section className="container mx-auto px-6 lg:px-12 py-12">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto">
                {/* Series Badge */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="system-label text-accent">Workbook {workbookData.number} of 26</span>
                  <span className="px-3 py-1 bg-card border border-border rounded-full text-xs text-muted-foreground">
                    {workbookData.phaseType}
                  </span>
                </div>

                {/* Title Block */}
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
                  {workbookData.title}
                </h1>
                <p className="font-serif text-xl text-muted-foreground italic mb-8">
                  {workbookData.subtitle}
                </p>

                {/* Journey Arc */}
                <div className="grid md:grid-cols-3 gap-6 p-6 bg-card/50 border border-border/50 rounded-lg mb-8">
                  <div>
                    <span className="system-label block mb-2">Zodiac Arc</span>
                    <span className="text-foreground font-serif text-lg">{workbookData.journey}</span>
                  </div>
                  <div>
                    <span className="system-label block mb-2">Body Pathway</span>
                    <span className="text-foreground font-serif text-lg">{workbookData.bodyArc}</span>
                  </div>
                  <div>
                    <span className="system-label block mb-2">Essence</span>
                    <span className="text-muted-foreground text-sm">{workbookData.essence}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span>Journey Progress</span>
                    <span>{completedDays.length} of 14 days complete</span>
                  </div>
                  <div className="h-2 bg-card border border-border/50 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-accent to-gold"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Day Navigation Timeline */}
          <section className="container mx-auto px-6 lg:px-12 mb-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-1 overflow-x-auto pb-4 scrollbar-hide">
                {journeyDays.map((day, index) => {
                  const DayIcon = day.icon;
                  const isActive = currentDay === index;
                  const isComplete = completedDays.includes(index);
                  
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentDay(index)}
                      className={`flex-shrink-0 flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-300 ${
                        isActive 
                          ? 'bg-accent/20 border border-accent/50' 
                          : isComplete
                            ? 'bg-gold/10 border border-gold/30'
                            : 'hover:bg-card border border-transparent'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isActive ? 'bg-accent text-background' : 
                        isComplete ? 'bg-gold/30 text-gold' : 'bg-card text-muted-foreground'
                      }`}>
                        {isComplete ? <Check className="w-4 h-4" /> : <DayIcon className="w-4 h-4" />}
                      </div>
                      <span className={`text-xs ${isActive ? 'text-accent' : 'text-muted-foreground'}`}>
                        Day {day.day}
                      </span>
                      <span className="text-[10px] text-muted-foreground/60 truncate max-w-16">
                        {day.phase}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Main Day Content */}
          <section className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDay}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  {/* Day Header */}
                  <div className="node-card">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                            <ActiveIcon className="w-6 h-6 text-accent" />
                          </div>
                          <div>
                            <span className="system-label block">{activeDay.phase} Phase</span>
                            <span className="text-xs text-gold">{activeDay.theme}</span>
                          </div>
                        </div>
                        <h2 className="font-serif text-3xl text-foreground">
                          Day {activeDay.day}: {activeDay.title}
                        </h2>
                      </div>
                      <button
                        onClick={() => toggleComplete(currentDay)}
                        className={`p-3 rounded-full border transition-all ${
                          completedDays.includes(currentDay)
                            ? 'bg-gold/20 border-gold/50 text-gold'
                            : 'border-border hover:border-accent/50 text-muted-foreground'
                        }`}
                      >
                        <Check className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Prompt Section */}
                  <div className="node-card border-l-4 border-l-accent">
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="w-4 h-4 text-accent" />
                      <span className="system-label">Today's Inquiry</span>
                    </div>
                    <p className="text-foreground text-lg leading-relaxed font-serif italic">
                      {activeDay.prompt}
                    </p>
                  </div>

                  {/* Practice Section */}
                  <div className="node-card bg-accent/5 border-accent/20">
                    <div className="flex items-center gap-2 mb-4">
                      <Heart className="w-4 h-4 text-accent" />
                      <span className="system-label text-accent">Somatic Practice</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {activeDay.practice}
                    </p>
                  </div>

                  {/* Reflection Section */}
                  <div className="node-card">
                    <div className="flex items-center gap-2 mb-4">
                      <Edit3 className="w-4 h-4 text-gold" />
                      <span className="system-label">Reflection Space</span>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {activeDay.reflection}
                    </p>
                    <textarea
                      value={reflectionText}
                      onChange={(e) => setReflectionText(e.target.value)}
                      placeholder="Write your reflection here..."
                      className="w-full h-40 bg-background/50 border border-border/50 rounded-lg p-4 text-foreground placeholder:text-muted-foreground/50 resize-none focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-6 border-t border-border/30">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentDay(Math.max(0, currentDay - 1))}
                      disabled={currentDay === 0}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous Day
                    </Button>
                    
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Day {currentDay + 1} of 14</span>
                    </div>
                    
                    <Button
                      variant="gold"
                      onClick={() => setCurrentDay(Math.min(journeyDays.length - 1, currentDay + 1))}
                      disabled={currentDay === journeyDays.length - 1}
                    >
                      Next Day
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </section>

          {/* Cycle Overview */}
          <section className="container mx-auto px-6 lg:px-12 py-20">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto">
                <h3 className="font-serif text-2xl text-foreground mb-8 text-center">
                  The 14-Day Arc at a Glance
                </h3>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { phase: "Full → Last Quarter", days: "Days 1-5", theme: "Illumination & Release", color: "accent" },
                    { phase: "Balsamic", days: "Days 6-7", theme: "Descent & Gestation", color: "muted" },
                    { phase: "New → Crescent", days: "Days 8-10", theme: "Intention & Emergence", color: "gold" },
                    { phase: "First Quarter → Gibbous", days: "Days 11-14", theme: "Action & Refinement", color: "accent" }
                  ].map((arc, index) => (
                    <div key={index} className="node-card text-center">
                      <span className={`text-xs uppercase tracking-wide ${
                        arc.color === 'gold' ? 'text-gold' : arc.color === 'accent' ? 'text-accent' : 'text-muted-foreground'
                      }`}>
                        {arc.days}
                      </span>
                      <h4 className="font-serif text-lg text-foreground mt-2 mb-1">
                        {arc.phase}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {arc.theme}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Esoteric Reference Section */}
          <section className="container mx-auto px-6 lg:px-12 py-12">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                  <span className="system-label text-accent mb-3 block">Workbook Reference</span>
                  <h3 className="font-serif text-3xl text-foreground mb-3">
                    Correspondences, Rituals & Lore
                  </h3>
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    The esoteric toolkit for your {workbookData.fromSign} → {workbookData.toSign} journey. 
                    Crystals, herbs, mythology, body practices, and lunar experiments.
                  </p>
                </div>
                
                <WorkbookReference
                  fromSign={workbookData.fromSign}
                  toSign={workbookData.toSign}
                  startPhase={workbookData.startPhase}
                  endPhase={workbookData.endPhase}
                />
              </div>
            </ScrollReveal>
          </section>

          {/* CTA */}
          <section className="container mx-auto px-6 lg:px-12">
            <ScrollReveal>
              <div className="max-w-2xl mx-auto text-center p-8 bg-gradient-to-br from-accent/10 to-gold/10 border border-accent/20 rounded-lg">
                <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-foreground mb-3">
                  This is Workbook 1 of 26
                </h3>
                <p className="text-muted-foreground mb-6">
                  Subscribe to access all 24 archetypal lunar journeys plus 2 eclipse portal specials.
                </p>
                <Button variant="gold" size="lg">
                  Subscribe for Full Access
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </ScrollReveal>
          </section>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default WorkbookPreview;
