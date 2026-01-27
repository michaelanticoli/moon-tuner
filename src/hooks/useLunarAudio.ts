import { useRef, useCallback, useState, useEffect } from 'react';
import { useMoonPhase } from './useMoonPhase';

// Phase-specific audio configurations
const PHASE_AUDIO_CONFIG = {
  'New Moon': {
    frequency: 396, // Grounding
    waveform: 'sine' as OscillatorType,
    lfoRate: 0.05, // Very slow modulation
    reverbMix: 0.7, // Heavy reverb for void-like quality
    filterFreq: 400, // Dark, muffled
    character: 'void',
  },
  'Waxing Crescent': {
    frequency: 417, // Liberation
    waveform: 'sine' as OscillatorType,
    lfoRate: 0.08,
    reverbMix: 0.5,
    filterFreq: 800,
    character: 'emerging',
  },
  'First Quarter': {
    frequency: 528, // Transformation
    waveform: 'triangle' as OscillatorType,
    lfoRate: 0.12,
    reverbMix: 0.4,
    filterFreq: 1200,
    character: 'active',
  },
  'Waxing Gibbous': {
    frequency: 639, // Connection
    waveform: 'sine' as OscillatorType,
    lfoRate: 0.1,
    reverbMix: 0.45,
    filterFreq: 1500,
    character: 'building',
  },
  'Full Moon': {
    frequency: 741, // Awakening
    waveform: 'sine' as OscillatorType,
    lfoRate: 0.15,
    reverbMix: 0.6,
    filterFreq: 2000, // Bright, illuminated
    character: 'peak',
  },
  'Waning Gibbous': {
    frequency: 852, // Intuition
    waveform: 'sine' as OscillatorType,
    lfoRate: 0.1,
    reverbMix: 0.55,
    filterFreq: 1400,
    character: 'sharing',
  },
  'Last Quarter': {
    frequency: 963, // Spirit
    waveform: 'triangle' as OscillatorType,
    lfoRate: 0.08,
    reverbMix: 0.5,
    filterFreq: 1000,
    character: 'releasing',
  },
  'Waning Crescent': {
    frequency: 174, // Return (sub-bass)
    waveform: 'sine' as OscillatorType,
    lfoRate: 0.04, // Very slow, dreamy
    reverbMix: 0.8, // Maximum reverb for ethereal quality
    filterFreq: 300, // Very dark
    character: 'surrender',
  },
};

interface AudioNodes {
  oscillators: OscillatorNode[];
  gains: GainNode[];
  masterGain: GainNode | null;
  lfo: OscillatorNode | null;
  filter: BiquadFilterNode | null;
  convolver: ConvolverNode | null;
}

export function useLunarAudio() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<AudioNodes>({
    oscillators: [],
    gains: [],
    masterGain: null,
    lfo: null,
    filter: null,
    convolver: null,
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [currentPhase, setCurrentPhase] = useState<string | null>(null);

  const moonData = useMoonPhase();

  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    return audioContextRef.current;
  }, []);

  // Create impulse response for reverb
  const createReverbImpulse = useCallback((ctx: AudioContext, duration: number, decay: number) => {
    const sampleRate = ctx.sampleRate;
    const length = sampleRate * duration;
    const impulse = ctx.createBuffer(2, length, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
      }
    }

    return impulse;
  }, []);

  const startPhaseAudio = useCallback((phaseName?: string) => {
    const ctx = initAudio();

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Stop existing audio
    stopAudio();

    const phase = phaseName || moonData.astronomical.phaseName;
    const config = PHASE_AUDIO_CONFIG[phase as keyof typeof PHASE_AUDIO_CONFIG] ||
                   PHASE_AUDIO_CONFIG['New Moon'];

    setCurrentPhase(phase);

    // Create convolver (reverb)
    const convolver = ctx.createConvolver();
    convolver.buffer = createReverbImpulse(ctx, 3, 2);
    nodesRef.current.convolver = convolver;

    // Create filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(config.filterFreq, ctx.currentTime);
    filter.Q.setValueAtTime(0.7, ctx.currentTime);
    nodesRef.current.filter = filter;

    // Create master gain
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 3);
    nodesRef.current.masterGain = masterGain;

    // Create dry/wet mix for reverb
    const dryGain = ctx.createGain();
    const wetGain = ctx.createGain();
    dryGain.gain.setValueAtTime(1 - config.reverbMix, ctx.currentTime);
    wetGain.gain.setValueAtTime(config.reverbMix, ctx.currentTime);

    // Create LFO
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(config.lfoRate, ctx.currentTime);
    lfoGain.gain.setValueAtTime(2, ctx.currentTime);
    lfo.connect(lfoGain);
    lfo.start();
    nodesRef.current.lfo = lfo;

    // Create layered oscillators
    const baseFreq = config.frequency;
    const frequencies = [
      baseFreq,
      baseFreq * 1.5,      // Perfect fifth
      baseFreq * 2,        // Octave
      baseFreq * 0.5,      // Sub-octave
      baseFreq * 1.25,     // Major third
    ];

    const waveforms: OscillatorType[] = [
      config.waveform,
      'sine',
      'triangle',
      'sine',
      'sine',
    ];

    const gains = [0.35, 0.15, 0.1, 0.25, 0.08];

    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = waveforms[i];
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.detune.setValueAtTime(Math.random() * 8 - 4, ctx.currentTime);

      // Connect LFO for subtle modulation
      lfoGain.connect(osc.frequency);

      gain.gain.setValueAtTime(gains[i], ctx.currentTime);

      osc.connect(gain);
      gain.connect(filter);

      osc.start();

      nodesRef.current.oscillators.push(osc);
      nodesRef.current.gains.push(gain);
    });

    // Connect audio graph
    // Filter -> Dry + Wet paths -> Master
    filter.connect(dryGain);
    filter.connect(convolver);
    convolver.connect(wetGain);

    dryGain.connect(masterGain);
    wetGain.connect(masterGain);
    masterGain.connect(ctx.destination);

    setIsPlaying(true);
  }, [initAudio, moonData, volume, createReverbImpulse]);

  const stopAudio = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    const nodes = nodesRef.current;

    // Fade out
    if (nodes.masterGain) {
      nodes.masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
    }

    // Stop after fade
    setTimeout(() => {
      nodes.oscillators.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // Already stopped
        }
      });

      if (nodes.lfo) {
        try {
          nodes.lfo.stop();
          nodes.lfo.disconnect();
        } catch {
          // Already stopped
        }
      }

      nodes.gains.forEach(g => g.disconnect());
      nodes.filter?.disconnect();
      nodes.convolver?.disconnect();
      nodes.masterGain?.disconnect();

      nodesRef.current = {
        oscillators: [],
        gains: [],
        masterGain: null,
        lfo: null,
        filter: null,
        convolver: null,
      };
    }, 1500);

    setIsPlaying(false);
    setCurrentPhase(null);
  }, []);

  const updateVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (nodesRef.current.masterGain && audioContextRef.current) {
      nodesRef.current.masterGain.gain.linearRampToValueAtTime(
        newVolume,
        audioContextRef.current.currentTime + 0.1
      );
    }
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      stopAudio();
    } else {
      startPhaseAudio();
    }
  }, [isPlaying, startPhaseAudio, stopAudio]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAudio();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stopAudio]);

  return {
    isPlaying,
    volume,
    currentPhase,
    phaseConfig: currentPhase ? PHASE_AUDIO_CONFIG[currentPhase as keyof typeof PHASE_AUDIO_CONFIG] : null,
    moonData,
    startPhaseAudio,
    stopAudio,
    updateVolume,
    toggle,
  };
}

// Export phase configs for UI display
export { PHASE_AUDIO_CONFIG };
