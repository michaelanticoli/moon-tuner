import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useMoonPhase } from "@/hooks/useMoonPhase";
import { useLunarTone } from "@/hooks/useLunarTone";
import { Slider } from "@/components/ui/slider";

export function SongOfTheMoon() {
  const moonData = useMoonPhase();
  const { isPlaying, volume, startTone, stopTone, updateVolume } = useLunarTone();

  const handlePlayPause = () => {
    if (isPlaying) {
      stopTone();
    } else {
      startTone({ 
        baseFrequency: moonData.astrological.frequencyHz,
        volume: volume 
      });
    }
  };

  return (
    <section id="moon" className="py-16 lg:py-24 bg-card border-y border-border/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-accent/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-accent/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-accent/20 rounded-full" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Left - Info */}
          <div className="flex-1 text-center lg:text-left">
            <span className="system-label text-accent block mb-3">
              Live Stream
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground mb-4">
              Song of the Moon
            </h2>
            <p className="text-muted-foreground text-sm lg:text-base max-w-md mx-auto lg:mx-0">
              A generative lunar tone stream. 
              The frequency shifts with the phase—waxing, waning, stillness, emergence.
            </p>
          </div>

          {/* Center - Player */}
          <div className="flex items-center gap-6">
            {/* Waveform Visualization */}
            <div className="flex items-end gap-1 h-12">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 bg-accent rounded-full transition-all duration-300 ${
                    isPlaying ? "animate-waveform" : ""
                  }`}
                  style={{
                    height: isPlaying ? `${Math.sin(Date.now() / 200 + i) * 12 + 24}px` : '16px',
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
              ))}
            </div>

            {/* Play Button */}
            <button
              onClick={handlePlayPause}
              className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              aria-label={isPlaying ? "Pause" : "Play"}
              style={{ boxShadow: '0 0 30px hsl(168 75% 45% / 0.3)' }}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateVolume(volume === 0 ? 0.3 : 0)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={volume === 0 ? "Unmute" : "Mute"}
              >
                {volume === 0 ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <Slider
                value={[volume * 100]}
                onValueChange={([val]) => updateVolume(val / 100)}
                max={100}
                step={1}
                className="w-20"
              />
            </div>
          </div>

          {/* Right - Current State */}
          <div className="flex-1 text-center lg:text-right">
            <p className="system-label mb-2">
              Now Playing
            </p>
            <p className="font-serif text-xl lg:text-2xl text-foreground">
              {moonData.astrological.energy} · {moonData.astrological.theme}
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              {moonData.astrological.frequencyHz} Hz · {moonData.astrological.frequency}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}