import { useRef, useCallback, useState, useEffect } from 'react';

interface LunarToneOptions {
  baseFrequency: number;
  volume?: number;
}

export function useLunarTone() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodesRef = useRef<GainNode[]>([]);
  const masterGainRef = useRef<GainNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);

  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    return audioContextRef.current;
  }, []);

  const startTone = useCallback(({ baseFrequency, volume: initialVolume = 0.3 }: LunarToneOptions) => {
    const ctx = initAudio();
    
    // Resume context if suspended
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Stop any existing tones
    stopTone();

    // Master gain
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(initialVolume, ctx.currentTime + 2);
    masterGain.connect(ctx.destination);
    masterGainRef.current = masterGain;

    // LFO for subtle modulation
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.1, ctx.currentTime);
    lfoGain.gain.setValueAtTime(0.5, ctx.currentTime);
    lfo.connect(lfoGain);
    lfo.start();
    lfoRef.current = lfo;

    // Create layered oscillators for rich ambient sound
    const frequencies = [
      baseFrequency,
      baseFrequency * 1.5, // Perfect fifth
      baseFrequency * 2,   // Octave
      baseFrequency * 0.5, // Sub-octave
    ];

    const oscillatorTypes: OscillatorType[] = ['sine', 'sine', 'triangle', 'sine'];
    const gains = [0.4, 0.2, 0.15, 0.25];

    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = oscillatorTypes[i];
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      // Add subtle detuning for warmth
      osc.detune.setValueAtTime(Math.random() * 10 - 5, ctx.currentTime);
      
      // Connect LFO to frequency for subtle wobble
      lfoGain.connect(osc.frequency);
      
      gain.gain.setValueAtTime(gains[i], ctx.currentTime);
      
      osc.connect(gain);
      gain.connect(masterGain);
      
      osc.start();
      
      oscillatorsRef.current.push(osc);
      gainNodesRef.current.push(gain);
    });

    setIsPlaying(true);
  }, [initAudio]);

  const stopTone = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    // Fade out
    if (masterGainRef.current) {
      masterGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
    }

    // Stop oscillators after fade
    setTimeout(() => {
      oscillatorsRef.current.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {
          // Already stopped
        }
      });
      
      if (lfoRef.current) {
        try {
          lfoRef.current.stop();
          lfoRef.current.disconnect();
        } catch (e) {
          // Already stopped
        }
      }

      gainNodesRef.current.forEach(gain => gain.disconnect());
      if (masterGainRef.current) masterGainRef.current.disconnect();

      oscillatorsRef.current = [];
      gainNodesRef.current = [];
      masterGainRef.current = null;
      lfoRef.current = null;
    }, 1000);

    setIsPlaying(false);
  }, []);

  const updateVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (masterGainRef.current && audioContextRef.current) {
      masterGainRef.current.gain.linearRampToValueAtTime(
        newVolume,
        audioContextRef.current.currentTime + 0.1
      );
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTone();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stopTone]);

  return {
    isPlaying,
    volume,
    startTone,
    stopTone,
    updateVolume,
  };
}
