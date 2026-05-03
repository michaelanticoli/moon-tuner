import { useRef, useCallback, useState, useEffect } from 'react';

interface LunarToneOptions {
  baseFrequency: number;
  volume?: number;
}

interface ToneSession {
  oscillators: OscillatorNode[];
  gains: GainNode[];
  masterGain: GainNode;
  lfo: OscillatorNode;
}

export function useLunarTone() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<ToneSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);

  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      const Ctx = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
      audioContextRef.current = new Ctx();
    }
    return audioContextRef.current;
  }, []);

  // Tear down a specific session (captured locally — never affects the *current* one).
  const teardownSession = useCallback((session: ToneSession, ctx: AudioContext) => {
    try {
      session.masterGain.gain.cancelScheduledValues(ctx.currentTime);
      session.masterGain.gain.setValueAtTime(session.masterGain.gain.value, ctx.currentTime);
      session.masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
    } catch {
      /* noop */
    }
    setTimeout(() => {
      session.oscillators.forEach((osc) => {
        try { osc.stop(); osc.disconnect(); } catch { /* noop */ }
      });
      try { session.lfo.stop(); session.lfo.disconnect(); } catch { /* noop */ }
      session.gains.forEach((g) => { try { g.disconnect(); } catch { /* noop */ } });
      try { session.masterGain.disconnect(); } catch { /* noop */ }
    }, 900);
  }, []);

  const stopTone = useCallback(() => {
    const ctx = audioContextRef.current;
    const session = sessionRef.current;
    sessionRef.current = null;
    setIsPlaying(false);
    if (ctx && session) teardownSession(session, ctx);
  }, [teardownSession]);

  const startTone = useCallback(({ baseFrequency, volume: initialVolume = 0.3 }: LunarToneOptions) => {
    const ctx = initAudio();
    if (ctx.state === 'suspended') ctx.resume();

    // Tear down any previous session (captured locally so the new one is safe)
    const previous = sessionRef.current;
    sessionRef.current = null;
    if (previous) teardownSession(previous, ctx);

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(initialVolume, ctx.currentTime + 2);
    masterGain.connect(ctx.destination);

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.1, ctx.currentTime);
    lfoGain.gain.setValueAtTime(0.5, ctx.currentTime);
    lfo.connect(lfoGain);
    lfo.start();

    const frequencies = [baseFrequency, baseFrequency * 1.5, baseFrequency * 2, baseFrequency * 0.5];
    const oscTypes: OscillatorType[] = ['sine', 'sine', 'triangle', 'sine'];
    const gainVals = [0.4, 0.2, 0.15, 0.25];

    const oscillators: OscillatorNode[] = [];
    const gains: GainNode[] = [];

    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = oscTypes[i];
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.detune.setValueAtTime(Math.random() * 10 - 5, ctx.currentTime);
      lfoGain.connect(osc.frequency);
      gain.gain.setValueAtTime(gainVals[i], ctx.currentTime);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      oscillators.push(osc);
      gains.push(gain);
    });

    sessionRef.current = { oscillators, gains, masterGain, lfo };
    setIsPlaying(true);
  }, [initAudio, teardownSession]);

  const updateVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
    const ctx = audioContextRef.current;
    const session = sessionRef.current;
    if (session && ctx) {
      session.masterGain.gain.linearRampToValueAtTime(newVolume, ctx.currentTime + 0.1);
    }
  }, []);

  useEffect(() => {
    return () => {
      const ctx = audioContextRef.current;
      const session = sessionRef.current;
      sessionRef.current = null;
      if (ctx && session) teardownSession(session, ctx);
      if (ctx) {
        try { ctx.close(); } catch { /* noop */ }
      }
    };
  }, [teardownSession]);

  return { isPlaying, volume, startTone, stopTone, updateVolume };
}
