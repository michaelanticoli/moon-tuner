/**
 * Procedural audio generator using Web Audio API.
 * Produces ambient tones derived from a birth chart's planetary positions.
 */
import type { ChartData } from '@/types/astrology';

const signFrequencies: Record<string, number> = {
  Aries: 440, Taurus: 349.23, Gemini: 392, Cancer: 220,
  Leo: 293.66, Virgo: 293.66, Libra: 466.16, Scorpio: 493.88,
  Sagittarius: 329.63, Capricorn: 261.63, Aquarius: 369.99, Pisces: 329.63,
};

const planetMultipliers: Record<string, number> = {
  Sun: 1, Moon: 0.5, Mercury: 2, Venus: 1.5, Mars: 0.75,
  Jupiter: 0.25, Saturn: 0.375, Uranus: 3, Neptune: 0.1875, Pluto: 0.125,
};

export async function generateProceduralAudio(chart: ChartData): Promise<string> {
  const ctx = new OfflineAudioContext(2, 44100 * 15, 44100);
  const duration = 15;

  const master = ctx.createGain();
  master.gain.setValueAtTime(0.15, 0);
  master.connect(ctx.destination);

  const delay = ctx.createDelay(1);
  delay.delayTime.setValueAtTime(0.4, 0);
  const feedback = ctx.createGain();
  feedback.gain.setValueAtTime(0.3, 0);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(master);

  const baseFreq = signFrequencies[chart.sunSign] || 261.63;

  chart.planets.forEach((planet) => {
    const mult = planetMultipliers[planet.name] || 1;
    const freq = baseFreq * mult;
    if (freq < 20 || freq > 8000) return;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, 0);
    osc.detune.setValueAtTime((planet.degree % 30) - 15, 0);

    const env = ctx.createGain();
    const attackTime = 2 + (planet.degree % 3);
    env.gain.setValueAtTime(0, 0);
    env.gain.linearRampToValueAtTime(0.08, attackTime);
    env.gain.setValueAtTime(0.08, duration - 3);
    env.gain.linearRampToValueAtTime(0, duration);

    osc.connect(env);
    env.connect(master);
    env.connect(delay);
    osc.start(0);
    osc.stop(duration);

    if (['Sun', 'Moon', 'Venus'].includes(planet.name)) {
      const harmonic = ctx.createOscillator();
      harmonic.type = 'triangle';
      harmonic.frequency.setValueAtTime(freq * 1.5, 0);
      const hEnv = ctx.createGain();
      hEnv.gain.setValueAtTime(0, 0);
      hEnv.gain.linearRampToValueAtTime(0.03, attackTime + 1);
      hEnv.gain.setValueAtTime(0.03, duration - 4);
      hEnv.gain.linearRampToValueAtTime(0, duration);
      harmonic.connect(hEnv);
      hEnv.connect(master);
      harmonic.start(0);
      harmonic.stop(duration);
    }

    if (planet.isRetrograde) {
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.3, 0);
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(0.02, 0);
      lfo.connect(lfoGain);
      lfoGain.connect(env.gain);
      lfo.start(0);
      lfo.stop(duration);
    }
  });

  const moonFreq = signFrequencies[chart.moonSign] || 220;
  const sub = ctx.createOscillator();
  sub.type = 'sine';
  sub.frequency.setValueAtTime(moonFreq * 0.25, 0);
  const subEnv = ctx.createGain();
  subEnv.gain.setValueAtTime(0, 0);
  subEnv.gain.linearRampToValueAtTime(0.06, 4);
  subEnv.gain.setValueAtTime(0.06, duration - 4);
  subEnv.gain.linearRampToValueAtTime(0, duration);
  sub.connect(subEnv);
  subEnv.connect(master);
  sub.start(0);
  sub.stop(duration);

  const rendered = await ctx.startRendering();
  const wav = audioBufferToWav(rendered);
  const blob = new Blob([wav], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
}

function audioBufferToWav(buffer: AudioBuffer): ArrayBuffer {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const length = buffer.length;
  const bytesPerSample = 2;
  const dataLength = length * numChannels * bytesPerSample;
  const ab = new ArrayBuffer(44 + dataLength);
  const view = new DataView(ab);

  const ws = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };

  ws(0, 'RIFF'); view.setUint32(4, 36 + dataLength, true);
  ws(8, 'WAVE'); ws(12, 'fmt ');
  view.setUint32(16, 16, true); view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true); view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * bytesPerSample, true);
  view.setUint16(32, numChannels * bytesPerSample, true); view.setUint16(34, 16, true);
  ws(36, 'data'); view.setUint32(40, dataLength, true);

  const channels: Float32Array[] = [];
  for (let ch = 0; ch < numChannels; ch++) channels.push(buffer.getChannelData(ch));

  let offset = 44;
  for (let i = 0; i < length; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      const s = Math.max(-1, Math.min(1, channels[ch][i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      offset += 2;
    }
  }
  return ab;
}
