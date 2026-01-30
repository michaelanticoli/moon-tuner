import { moonPhases, zodiacSigns } from "./schoolData";
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

export function SchoolFoundations() {
  return (
    <div className="space-y-16">
      {/* Moon Phases Section */}
      <section>
        <h2 className="font-serif text-3xl lg:text-4xl font-light text-foreground mb-4">
          Foundation Knowledge
        </h2>
        <h3 className="font-serif text-xl text-foreground mb-2">The Eight Moon Phases</h3>
        <p className="text-muted-foreground mb-8">
          Each lunar phase represents a distinct developmental stage within the complete cycle, 
          carrying specific energetic qualities and optimal applications.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {moonPhases.map((phase) => (
            <div 
              key={phase.name}
              className="bg-card border border-border p-6 hover:border-foreground/30 transition-colors group"
            >
              <MoonPhaseGlyph 
                phase={phaseToGlyph[phase.name]} 
                size={48}
                className="mb-4"
              />
              <h4 className="font-medium text-foreground mb-2">{phase.name}</h4>
              <p className="text-sm text-muted-foreground mb-3">{phase.energy}</p>
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground/80">Action:</strong> {phase.action}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Zodiac Signs Section */}
      <section>
        <h3 className="font-serif text-xl text-foreground mb-2">The Twelve Zodiac Signs</h3>
        <p className="text-muted-foreground mb-8">
          Zodiac signs provide elemental and archetypal context through which lunar energy manifests and expresses itself.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {zodiacSigns.map((sign) => (
            <div 
              key={sign.name}
              className="bg-card border border-border p-6 hover:border-foreground/30 transition-colors"
            >
              <ZodiacGlyph 
                sign={signToGlyph[sign.name]} 
                size="xl"
                className="mb-4"
              />
              <h4 className="font-medium text-foreground mb-2">{sign.name}</h4>
              <div className="flex gap-2 mb-3">
                <span className="text-xs bg-muted px-2 py-1 text-muted-foreground">
                  {sign.element}
                </span>
                <span className="text-xs bg-muted px-2 py-1 text-muted-foreground">
                  {sign.modality}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground/80">Body:</strong> {sign.bodyPart}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
