import { useState } from "react";
import { useLunarAudio, PHASE_AUDIO_CONFIG } from "@/hooks/useLunarAudio";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2, VolumeX, Radio } from "lucide-react";
import { MoonPhaseGlyph, phaseNameToKey } from "./MoonPhaseGlyph";

interface LunarAudioPlayerProps {
  compact?: boolean;
  showPhaseInfo?: boolean;
}

export function LunarAudioPlayer({ compact = false, showPhaseInfo = true }: LunarAudioPlayerProps) {
  const {
    isPlaying,
    volume,
    currentPhase,
    moonData,
    toggle,
    updateVolume,
  } = useLunarAudio();

  const [showVolume, setShowVolume] = useState(false);

  const phaseName = moonData.astronomical.phaseName;
  const phaseConfig = PHASE_AUDIO_CONFIG[phaseName as keyof typeof PHASE_AUDIO_CONFIG];

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            isPlaying
              ? "bg-accent text-accent-foreground"
              : "bg-card border border-border hover:border-accent/50"
          }`}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4 ml-0.5" />
          )}
        </button>
        {isPlaying && (
          <div className="flex items-center gap-2">
            <Radio className="w-3 h-3 text-accent animate-pulse" />
            <span className="text-xs text-muted-foreground">
              {phaseConfig?.frequency}Hz
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="node-card">
      <div className="flex items-center gap-3 mb-4">
        <Radio className="w-5 h-5 text-accent" />
        <span className="system-label text-accent">Lunar Frequency</span>
      </div>

      {showPhaseInfo && (
        <div className="flex items-center gap-4 mb-6">
          <MoonPhaseGlyph
            phase={phaseNameToKey[phaseName] || 'full'}
            size={48}
            className="text-foreground"
          />
          <div>
            <h3 className="font-serif text-xl text-foreground">
              {phaseName}
            </h3>
            <p className="text-muted-foreground text-sm">
              {moonData.astrological.frequency} ({phaseConfig?.frequency}Hz)
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <Button
          variant={isPlaying ? "gold" : "outline"}
          size="lg"
          onClick={toggle}
          className="flex-1"
        >
          {isPlaying ? (
            <>
              <Pause className="w-5 h-5 mr-2" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              Play Tone
            </>
          )}
        </Button>

        <div className="relative">
          <button
            onClick={() => setShowVolume(!showVolume)}
            className="p-3 rounded-lg border border-border hover:border-accent/50 transition-colors"
          >
            {volume > 0 ? (
              <Volume2 className="w-5 h-5 text-foreground" />
            ) : (
              <VolumeX className="w-5 h-5 text-muted-foreground" />
            )}
          </button>

          {showVolume && (
            <div className="absolute bottom-full right-0 mb-2 p-4 bg-card border border-border rounded-lg shadow-lg">
              <div className="w-32">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Volume</span>
                  <span className="text-xs text-foreground">{Math.round(volume * 100)}%</span>
                </div>
                <Slider
                  min={0}
                  max={1}
                  step={0.01}
                  value={[volume]}
                  onValueChange={([v]) => updateVolume(v)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {isPlaying && phaseConfig && (
        <div className="mt-6 pt-6 border-t border-border/30">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <span className="text-xs text-muted-foreground block mb-1">Frequency</span>
              <span className="text-sm text-foreground font-mono">{phaseConfig.frequency}Hz</span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block mb-1">Reverb</span>
              <span className="text-sm text-foreground font-mono">{Math.round(phaseConfig.reverbMix * 100)}%</span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block mb-1">Character</span>
              <span className="text-sm text-accent capitalize">{phaseConfig.character}</span>
            </div>
          </div>

          {/* Audio visualization bars */}
          <div className="mt-4 flex items-end justify-center gap-1 h-8">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-accent/60 rounded-full animate-pulse"
                style={{
                  height: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${0.5 + Math.random() * 0.5}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
