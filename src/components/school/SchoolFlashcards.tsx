import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { generateCombinations } from "./schoolData";
import { MoonPhaseGlyph } from "@/components/MoonPhaseGlyph";
import { ZodiacGlyph } from "@/components/ZodiacGlyph";

const phaseToGlyph: Record<string, "new" | "waxing-crescent" | "first-quarter" | "waxing-gibbous" | "full" | "waning-gibbous" | "last-quarter" | "waning-crescent"> = {
  "New Moon": "new",
  "Waxing Crescent": "waxing-crescent",
  "First Quarter": "first-quarter",
  "Waxing Gibbous": "waxing-gibbous",
  "Full Moon": "full",
  "Waning Gibbous": "waning-gibbous",
  "Last Quarter": "last-quarter",
  "Waning Crescent": "waning-crescent",
};

const signToGlyph: Record<string, "aries" | "taurus" | "gemini" | "cancer" | "leo" | "virgo" | "libra" | "scorpio" | "sagittarius" | "capricorn" | "aquarius" | "pisces"> = {
  "Aries": "aries",
  "Taurus": "taurus",
  "Gemini": "gemini",
  "Cancer": "cancer",
  "Leo": "leo",
  "Virgo": "virgo",
  "Libra": "libra",
  "Scorpio": "scorpio",
  "Sagittarius": "sagittarius",
  "Capricorn": "capricorn",
  "Aquarius": "aquarius",
  "Pisces": "pisces",
};

const combinations = generateCombinations();

export function SchoolFlashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mastered, setMastered] = useState<Set<number>>(new Set());

  const current = combinations[currentIndex];
  const progress = ((currentIndex + 1) / combinations.length) * 100;

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % combinations.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + combinations.length) % combinations.length);
  };

  const handleMaster = () => {
    setMastered((prev) => new Set([...prev, currentIndex]));
    handleNext();
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl lg:text-4xl font-light text-foreground mb-4">
          Interactive Flashcards
        </h2>
        <p className="text-muted-foreground">
          Master the 96 combinations through active recall. Click to reveal information.
        </p>
      </div>

      {/* Progress bar */}
      <div className="relative h-0.5 bg-border rounded-full overflow-hidden">
        <div 
          className="absolute left-0 top-0 h-full bg-foreground transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
        <span className="absolute right-0 -top-6 text-sm text-muted-foreground">
          {currentIndex + 1} / {combinations.length}
        </span>
      </div>

      {/* Flashcard */}
      <div 
        className="mx-auto max-w-2xl cursor-pointer"
        style={{ perspective: '1000px' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div 
          className="relative w-full h-[400px] transition-transform duration-500"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front */}
          <div 
            className="absolute inset-0 bg-card border border-border flex flex-col items-center justify-center p-12 rounded-2xl"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="flex items-center gap-6 mb-8">
              <MoonPhaseGlyph phase={phaseToGlyph[current.phase.name]} size="xl" />
              <span className="text-2xl text-muted-foreground">×</span>
              <ZodiacGlyph sign={signToGlyph[current.sign.name]} size="xl" />
            </div>
            <h3 className="font-serif text-2xl lg:text-3xl text-center text-foreground mb-6">
              {current.phase.name} in {current.sign.name}
            </h3>
            <p className="text-sm text-muted-foreground uppercase tracking-widest">
              Click to reveal
            </p>
          </div>

          {/* Back */}
          <div 
            className="absolute inset-0 bg-background border border-border flex flex-col items-center justify-center p-12 rounded-2xl"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <h3 className="font-serif text-xl text-center text-foreground mb-6">
              {current.phase.name} in {current.sign.name}
            </h3>
            <p className="text-center text-muted-foreground mb-4">
              <strong className="text-foreground">Phase Energy:</strong> {current.phase.energy}
            </p>
            <p className="text-center text-muted-foreground mb-4">
              <strong className="text-foreground">Sign Quality:</strong> {current.sign.element} • {current.sign.modality}
            </p>
            <p className="text-center text-muted-foreground">
              <strong className="text-foreground">Body Region:</strong> {current.sign.bodyPart}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={handlePrev}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button 
          variant={mastered.has(currentIndex) ? "secondary" : "default"}
          onClick={handleMaster}
        >
          <Check className="w-4 h-4 mr-2" />
          {mastered.has(currentIndex) ? "Mastered" : "Mark Mastered"}
        </Button>
        <Button variant="outline" onClick={handleNext}>
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        {mastered.size} of {combinations.length} mastered
      </p>
    </div>
  );
}
