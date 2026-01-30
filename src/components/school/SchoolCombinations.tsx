import { useState } from "react";
import { Button } from "@/components/ui/button";
import { generateCombinations, moonPhases } from "./schoolData";
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

export function SchoolCombinations() {
  const [filter, setFilter] = useState<string>("all");

  const filteredCombinations = filter === "all" 
    ? combinations 
    : combinations.filter(c => c.phase.name === filter);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl lg:text-4xl font-light text-foreground mb-4">
          The Complete Matrix
        </h2>
        <p className="text-muted-foreground">
          All 96 lunar-zodiac combinations. Filter by phase to explore specific categories.
        </p>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mr-2">
          Filter by Phase
        </span>
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        {moonPhases.map((phase) => (
          <Button
            key={phase.name}
            variant={filter === phase.name ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(phase.name)}
          >
            {phase.name}
          </Button>
        ))}
      </div>

      {/* Combinations grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCombinations.map((combo, index) => (
          <div 
            key={index}
            className="bg-card border border-border p-6 hover:border-foreground/30 transition-colors"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <MoonPhaseGlyph phase={phaseToGlyph[combo.phase.name]} size="md" />
                <ZodiacGlyph sign={signToGlyph[combo.sign.name]} size="md" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1">
                {combo.sign.element}
              </span>
            </div>
            <h4 className="font-medium text-foreground mb-2">
              {combo.phase.name} in {combo.sign.name}
            </h4>
            <p className="text-sm text-muted-foreground">
              {combo.phase.energy} meets {combo.sign.modality.toLowerCase()} {combo.sign.element.toLowerCase()} energy through {combo.sign.bodyPart.toLowerCase()}.
            </p>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Showing {filteredCombinations.length} of {combinations.length} combinations
      </p>
    </div>
  );
}
