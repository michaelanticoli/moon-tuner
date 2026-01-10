import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Heart, Flame, Eye, Compass, MessageCircle, Sparkles, Target, Zap, RotateCcw, Telescope, Gift, Pause, FileText } from "lucide-react";

const journeyDays = [
  {
    day: 1,
    theme: "Intention Setting",
    type: "Ritual Entry",
    anchoring: "New or Full Moon",
    icon: Target,
    description: "Plant your seeds in sacred darkness. Set clear intentions for the cycle ahead."
  },
  {
    day: 2,
    theme: "Emotional Weather",
    type: "Reflective Prompt",
    anchoring: "Moon in 1st sign after lunation",
    icon: Heart,
    description: "Check in with your emotional landscape. What feelings are present today?"
  },
  {
    day: 3,
    theme: "Root & Rhythm",
    type: "Somatic Exercise",
    anchoring: "Root chakra / embodiment",
    icon: Flame,
    description: "Ground into your body. Find rhythm through movement and breath."
  },
  {
    day: 4,
    theme: "Mirror Work",
    type: "Relationship Insight",
    anchoring: "Inner/outer dynamic",
    icon: Eye,
    description: "Explore what you project outward and what reflects back from others."
  },
  {
    day: 5,
    theme: "Resistance or Shadow",
    type: "Journaling Prompt",
    anchoring: "Explore resistance in cycle",
    icon: Moon,
    description: "Meet your resistance with curiosity. What shadows ask for attention?"
  },
  {
    day: 6,
    theme: "Signal & Silence",
    type: "Meditation or Oracle",
    anchoring: "Intuitive check-in",
    icon: Compass,
    description: "Quiet the noise. Listen for the subtle signals guiding your path."
  },
  {
    day: 7,
    theme: "Choice Point",
    type: "Mini-Ritual",
    anchoring: "Mid-cycle anchor",
    icon: Zap,
    description: "A threshold moment. Make a conscious choice that honors your intention."
  },
  {
    day: 8,
    theme: "Devotion",
    type: "Creative Practice",
    anchoring: "Build momentum",
    icon: Sparkles,
    description: "Pour energy into what matters. Creative expression as sacred practice."
  },
  {
    day: 9,
    theme: "Integration",
    type: "Real-world Action",
    anchoring: "Energetic alignment",
    icon: Target,
    description: "Take aligned action. Bridge the inner work with outer manifestation."
  },
  {
    day: 10,
    theme: "Return to Self",
    type: "Reflective Journaling",
    anchoring: "Recognize growth",
    icon: RotateCcw,
    description: "Come home to yourself. Acknowledge how far you've traveled."
  },
  {
    day: 11,
    theme: "Future Forecast",
    type: "Visioning or Dreamwork",
    anchoring: "Begin to release",
    icon: Telescope,
    description: "Gaze forward. What visions emerge as you prepare to release?"
  },
  {
    day: 12,
    theme: "Gratitude & Closure",
    type: "Letter or Altar Tending",
    anchoring: "Close ritual arc",
    icon: Gift,
    description: "Honor what this cycle has given. Close the ritual arc with gratitude."
  },
  {
    day: 13,
    theme: "Rest",
    type: "Bonus Audio or Rest Day",
    anchoring: "Recovery",
    icon: Pause,
    description: "Permission to pause. Let integration happen in stillness."
  },
  {
    day: 14,
    theme: "Open Page",
    type: "Freewriting or Collage",
    anchoring: "Catch-up day",
    icon: FileText,
    description: "Your space to create, catch up, or simply be. No structure required."
  }
];

export function JourneyPreview() {
  const [activeDay, setActiveDay] = useState(0);
  const activeJourney = journeyDays[activeDay];
  const ActiveIcon = activeJourney.icon;

  return (
    <section className="py-24 lg:py-32 bg-card/20 border-y border-border/30">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="system-label block mb-6">The 14-Day Arc</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground mb-6 leading-[1.1]">
            Every Workbook. <br />
            <span className="italic">One Complete Journey.</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Each workbook follows a 14-day structure designed to carry you from intention to integration.
          </p>
        </div>

        {/* Timeline Navigation */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="flex items-center justify-between gap-1 overflow-x-auto pb-4">
            {journeyDays.map((day, index) => (
              <button
                key={day.day}
                onClick={() => setActiveDay(index)}
                className={`flex-shrink-0 w-10 h-10 rounded-full border transition-all duration-300 flex items-center justify-center text-sm font-medium
                  ${activeDay === index 
                    ? "bg-accent text-accent-foreground border-accent scale-110" 
                    : "bg-card/50 border-border/50 text-muted-foreground hover:border-accent/50 hover:text-foreground"
                  }`}
              >
                {day.day}
              </button>
            ))}
          </div>
          
          {/* Progress bar */}
          <div className="h-1 bg-border/30 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-accent to-accent/60"
              initial={{ width: 0 }}
              animate={{ width: `${((activeDay + 1) / 14) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Active Day Display */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="node-card text-center"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="system-label text-accent">Day {activeJourney.day}</span>
                <div className="w-1 h-1 rounded-full bg-border" />
                <span className="system-label">{activeJourney.type}</span>
              </div>
              
              <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-8">
                <ActiveIcon className="w-10 h-10 text-accent" />
              </div>
              
              <h3 className="font-serif text-3xl lg:text-4xl text-foreground mb-4">
                {activeJourney.theme}
              </h3>
              
              <p className="text-muted-foreground text-lg leading-relaxed mb-6 max-w-xl mx-auto">
                {activeJourney.description}
              </p>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/50 border border-border/50 rounded-full">
                <Moon className="w-4 h-4 text-accent" />
                <span className="text-sm text-muted-foreground">{activeJourney.anchoring}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* All Days Quick Reference */}
        <div className="max-w-5xl mx-auto mt-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {journeyDays.map((day, index) => {
              const DayIcon = day.icon;
              return (
                <button
                  key={day.day}
                  onClick={() => setActiveDay(index)}
                  className={`p-4 rounded-xl border transition-all duration-300 text-left
                    ${activeDay === index 
                      ? "bg-accent/10 border-accent/50" 
                      : "bg-card/30 border-border/30 hover:border-border/50"
                    }`}
                >
                  <DayIcon className={`w-5 h-5 mb-2 ${activeDay === index ? "text-accent" : "text-muted-foreground"}`} />
                  <div className="text-xs text-muted-foreground mb-1">Day {day.day}</div>
                  <div className={`text-sm font-medium truncate ${activeDay === index ? "text-foreground" : "text-muted-foreground"}`}>
                    {day.theme}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
