import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2 } from "lucide-react";
import { useState } from "react";

export function SongOfTheMoon() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="moon" className="py-16 lg:py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary-foreground/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-primary-foreground/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-primary-foreground/20 rounded-full" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Left - Info */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block text-xs uppercase tracking-ultra text-accent font-medium mb-3">
              Live Stream
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium mb-4">
              Song of the Moon
            </h2>
            <p className="text-primary-foreground/70 text-sm lg:text-base max-w-md mx-auto lg:mx-0">
              A 24-hour generative lunar tone stream. 
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
                    isPlaying ? "animate-pulse" : ""
                  }`}
                  style={{
                    height: `${Math.random() * 24 + 16}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>

            {/* Play Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </button>

            {/* Volume */}
            <Volume2 className="w-5 h-5 text-primary-foreground/50" />
          </div>

          {/* Right - Current State */}
          <div className="flex-1 text-center lg:text-right">
            <p className="text-xs uppercase tracking-widest text-primary-foreground/50 mb-2">
              Now Playing
            </p>
            <p className="font-serif text-xl lg:text-2xl text-primary-foreground">
              Waxing · Emergence
            </p>
            <p className="text-primary-foreground/50 text-sm mt-1">
              396 Hz · Grounding Frequency
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
