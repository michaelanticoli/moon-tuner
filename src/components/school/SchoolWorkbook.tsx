import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { workbookExercises } from "./schoolData";
import { toast } from "@/hooks/use-toast";

export function SchoolWorkbook() {
  const [responses, setResponses] = useState<Record<number, string>>({});

  const handleSave = () => {
    // In a real app, this would save to database
    localStorage.setItem('moontuner-workbook', JSON.stringify(responses));
    toast({
      title: "Progress Saved",
      description: "Your workbook responses have been saved locally.",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl lg:text-4xl font-light text-foreground mb-4">
          Practical Application
        </h2>
        <p className="text-muted-foreground">
          Deepen understanding through structured reflective exercises and systematic practice.
        </p>
      </div>

      <div className="space-y-8">
        {workbookExercises.map((exercise) => (
          <div 
            key={exercise.id}
            className="bg-card border-l-2 border-l-foreground border-t border-r border-b border-border p-8"
          >
            <h3 className="font-serif text-xl text-foreground mb-2">
              Exercise {exercise.id} — {exercise.title}
            </h3>
            <p className="text-muted-foreground mb-6">
              {exercise.prompt}
            </p>
            <Textarea
              placeholder="Write your reflection here..."
              className="min-h-[120px] bg-muted/50 border-border focus:bg-background transition-colors"
              value={responses[exercise.id] || ""}
              onChange={(e) => setResponses(prev => ({
                ...prev,
                [exercise.id]: e.target.value
              }))}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button onClick={handleSave} size="lg">
          <Save className="w-4 h-4 mr-2" />
          Save Progress
        </Button>
      </div>
    </div>
  );
}
