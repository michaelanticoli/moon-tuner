/**
 * QuantumMelodic Tone.js Player + Offline Renderer
 */
import * as Tone from 'tone';
import type { Score, ScoreTrack } from './chartToScore';

export async function renderScoreToAudioUrl(score: Score): Promise<string> {
  const duration = score.totalDuration;

  const buffer = await Tone.Offline(async ({ transport }) => {
    transport.bpm.value = score.bpm;
    const players = buildTonePlayers(score.tracks);

    for (const { track, synth } of players) {
      for (const note of track.notes) {
        const freq = Tone.Frequency(note.pitch, 'midi').toFrequency();
        const vel = note.velocity / 127;
        transport.schedule((time) => {
          try { (synth as Tone.PolySynth).triggerAttackRelease(freq, note.duration, time, vel); } catch {}
        }, note.time);
      }
    }

    transport.start();
  }, duration);

  const wav = audioBufferToWav(buffer.get()!);
  const blob = new Blob([wav], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
}

interface TonePlayer {
  track: ScoreTrack;
  synth: Tone.PolySynth;
  reverb: Tone.Reverb;
  chorus: Tone.Chorus;
}

function buildTonePlayers(tracks: ScoreTrack[]): TonePlayer[] {
  const players: TonePlayer[] = [];

  for (const track of tracks) {
    const p = track.synthParams;

    const reverb = new Tone.Reverb({ decay: 3 + p.reverbWet * 4, wet: p.reverbWet }).toDestination();
    const chorus = new Tone.Chorus({ frequency: 1.5, delayTime: 3.5, depth: 0.5, wet: p.chorusWet }).connect(reverb);
    chorus.start();

    const oscType = mapOscType(p.oscillatorType);
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: oscType },
      envelope: { attack: p.attackTime, decay: p.decayTime, sustain: p.sustainLevel, release: p.releaseTime },
      volume: Tone.gainToDb(p.weight * 0.5),
    }).connect(chorus);

    players.push({ track, synth, reverb, chorus });
  }

  return players;
}

function mapOscType(type: string): OscillatorType {
  switch (type) {
    case 'fmsine': return 'fmsine' as OscillatorType;
    case 'amsine': return 'amsine' as OscillatorType;
    case 'fmsawtooth': return 'fmsawtooth' as OscillatorType;
    default: return type as OscillatorType;
  }
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
