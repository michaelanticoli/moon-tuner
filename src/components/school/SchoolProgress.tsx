import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { GraduateToChaperone } from "./GraduateToChaperone";

const milestones = [
  {
    title: "Foundation Builder",
    description: "Complete the Foundations section",
    status: "complete" as const,
  },
  {
    title: "Active Recall Mastery",
    description: "Review 50+ flashcards",
    status: "in-progress" as const,
  },
  {
    title: "Knowledge Validation",
    description: "Achieve 80%+ assessment score",
    status: "not-started" as const,
  },
  {
    title: "Practical Integration",
    description: "Complete all workbook exercises",
    status: "not-started" as const,
  },
  {
    title: "Graduate to Chaperone",
    description: "Begin your Lunar Chaperone journey",
    status: "not-started" as const,
  },
];

export function SchoolProgress() {
  // In a real app, these would come from database
  const stats = {
    mastered: 12,
    minutes: 45,
    accuracy: 78,
    streak: 3,
  };

  const handleReset = () => {
    localStorage.removeItem('moontuner-workbook');
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl lg:text-4xl font-light text-foreground mb-4">
          Learning Progress
        </h2>
        <p className="text-muted-foreground">
          Track your mastery development through systematic metrics and milestone achievement.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-foreground text-background p-8 text-center">
          <div className="font-serif text-4xl lg:text-5xl font-light mb-2">
            {stats.mastered}
          </div>
          <div className="text-sm uppercase tracking-wider opacity-70">
            Mastered
          </div>
        </div>
        <div className="bg-foreground text-background p-8 text-center">
          <div className="font-serif text-4xl lg:text-5xl font-light mb-2">
            {stats.minutes}
          </div>
          <div className="text-sm uppercase tracking-wider opacity-70">
            Minutes
          </div>
        </div>
        <div className="bg-foreground text-background p-8 text-center">
          <div className="font-serif text-4xl lg:text-5xl font-light mb-2">
            {stats.accuracy}%
          </div>
          <div className="text-sm uppercase tracking-wider opacity-70">
            Accuracy
          </div>
        </div>
        <div className="bg-foreground text-background p-8 text-center">
          <div className="font-serif text-4xl lg:text-5xl font-light mb-2">
            {stats.streak}
          </div>
          <div className="text-sm uppercase tracking-wider opacity-70">
            Streak
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div>
        <h3 className="font-serif text-xl text-foreground mb-6">Milestones</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {milestones.map((milestone, index) => (
            <div 
              key={index}
              className="bg-card border border-border p-6 hover:border-foreground/30 transition-colors"
            >
              <h4 className="font-medium text-foreground mb-2">
                {milestone.title}
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                {milestone.description}
              </p>
              <span className={`text-xs font-medium uppercase tracking-wider ${
                milestone.status === 'complete' 
                  ? 'text-foreground' 
                  : milestone.status === 'in-progress'
                  ? 'text-muted-foreground'
                  : 'text-muted-foreground/50'
              }`}>
                {milestone.status === 'complete' 
                  ? '✓ Complete' 
                  : milestone.status === 'in-progress'
                  ? 'In Progress'
                  : 'Not Started'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <Button variant="outline" onClick={handleReset}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset All Progress
        </Button>
      </div>

      {/* Graduate to Chaperone CTA */}
      <div className="pt-8">
        <GraduateToChaperone />
      </div>
    </div>
  );
}
