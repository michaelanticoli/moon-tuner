import { Button } from "@/components/ui/button";
import { Clock, Compass, Sparkles, Target } from "lucide-react";

interface SchoolIntroProps {
  onStartLearning: () => void;
}

export function SchoolIntro({ onStartLearning }: SchoolIntroProps) {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="font-serif text-3xl lg:text-4xl font-light text-foreground mb-4">
          The MOONtuner Method
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
          A systematic approach to temporal navigation through 96 unique lunar-zodiac combinations. 
          This precision timing methodology enables optimal alignment with natural cosmic rhythms 
          for enhanced decision-making, manifestation, and life navigation.
        </p>
      </div>

      {/* System Architecture */}
      <div className="bg-card border border-border p-8 lg:p-12">
        <h3 className="font-serif text-xl text-foreground mb-6">System Architecture</h3>
        <p className="text-muted-foreground mb-6">
          The MOONtuner matrix operates on a fundamental principle:
        </p>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-3">
            <span className="text-foreground">•</span>
            <span><strong className="text-foreground">8 Moon Phases × 12 Zodiac Signs = 96 Unique Signatures</strong></span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-foreground">•</span>
            <span>Each combination represents a distinct energetic configuration</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-foreground">•</span>
            <span>Complete lunar cycle: approximately 28 days through all zodiac signs</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-foreground">•</span>
            <span>Sign occupancy: approximately 2.5 days per cycle</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-foreground">•</span>
            <span>Precise timing enables strategic action and optimal manifestation</span>
          </li>
        </ul>
      </div>

      {/* Application Framework */}
      <div>
        <h3 className="font-serif text-xl text-foreground mb-6">Application Framework</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-border p-6 hover:border-foreground/30 transition-colors">
            <Clock className="w-10 h-10 text-foreground mb-4" />
            <h4 className="font-medium text-foreground mb-2">Precision Timing</h4>
            <p className="text-sm text-muted-foreground">
              Identify optimal moments for launches, decisions, and strategic initiatives through systematic lunar-zodiac analysis.
            </p>
          </div>
          <div className="bg-card border border-border p-6 hover:border-foreground/30 transition-colors">
            <Compass className="w-10 h-10 text-foreground mb-4" />
            <h4 className="font-medium text-foreground mb-2">Natural Rhythm Alignment</h4>
            <p className="text-sm text-muted-foreground">
              Synchronize activities with cosmic cycles rather than operating in opposition to natural energetic flow.
            </p>
          </div>
          <div className="bg-card border border-border p-6 hover:border-foreground/30 transition-colors">
            <Sparkles className="w-10 h-10 text-foreground mb-4" />
            <h4 className="font-medium text-foreground mb-2">Enhanced Manifestation</h4>
            <p className="text-sm text-muted-foreground">
              Amplify intentions through strategic timing with supportive energetic signatures for maximum efficacy.
            </p>
          </div>
          <div className="bg-card border border-border p-6 hover:border-foreground/30 transition-colors">
            <Target className="w-10 h-10 text-foreground mb-4" />
            <h4 className="font-medium text-foreground mb-2">Strategic Navigation</h4>
            <p className="text-sm text-muted-foreground">
              Develop sophisticated temporal intelligence for navigating complexity with cosmic precision and clarity.
            </p>
          </div>
        </div>
      </div>

      {/* Learning Methodology */}
      <div>
        <h3 className="font-serif text-xl text-foreground mb-6">Learning Methodology</h3>
        <ol className="space-y-3 text-muted-foreground">
          <li><strong className="text-foreground">Foundations</strong> — Master individual components: 8 phases and 12 signs</li>
          <li><strong className="text-foreground">Flashcards</strong> — Build retention through spaced repetition and active recall</li>
          <li><strong className="text-foreground">Combinations</strong> — Explore the complete 96-signature matrix systematically</li>
          <li><strong className="text-foreground">Workbook</strong> — Apply knowledge through structured reflective practice</li>
          <li><strong className="text-foreground">Assessment</strong> — Validate understanding and identify knowledge gaps</li>
          <li><strong className="text-foreground">Progress</strong> — Track mastery development over time</li>
        </ol>
      </div>

      {/* Lunar Chaperone Connection */}
      <div className="bg-muted/30 border border-border p-8 lg:p-12">
        <h3 className="font-serif text-xl text-foreground mb-4">From Theory to Practice: The Lunar Chaperone</h3>
        <p className="text-muted-foreground mb-6">
          The MOONtuner School teaches the foundational 96-combination system. The <strong className="text-foreground">Lunar Chaperone</strong> is 
          where this knowledge becomes lived practice—a 26-workbook series designed for continuous lunar companionship.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-background/50 p-4 border border-border">
            <span className="text-2xl font-serif text-foreground">12</span>
            <p className="text-muted-foreground mt-1">New Moon → Full Moon journeys</p>
          </div>
          <div className="bg-background/50 p-4 border border-border">
            <span className="text-2xl font-serif text-foreground">12</span>
            <p className="text-muted-foreground mt-1">Full Moon → New Moon journeys</p>
          </div>
          <div className="bg-background/50 p-4 border border-border">
            <span className="text-2xl font-serif text-foreground">2</span>
            <p className="text-muted-foreground mt-1">Eclipse Portal specials</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-6 italic">
          Complete the School to unlock your path to the Lunar Chaperone—where timing becomes practice.
        </p>
      </div>

      <div className="flex justify-center">
        <Button size="lg" onClick={onStartLearning}>
          Begin Learning
        </Button>
      </div>
    </div>
  );
}
