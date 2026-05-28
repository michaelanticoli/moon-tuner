import { useState, useRef, useCallback } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";
import { useCosmicReading } from "@/hooks/useCosmicReading";
import { useQuantumMelodicData } from "@/hooks/useQuantumMelodicData";
import type { BirthData } from "@/types/astrology";
import {
  buildPlanetaryPositionsMap,
  buildPersonalScale,
  buildDisplayAspects,
  buildCodexString,
  buildRitualScript,
  extractDroneFrequencies,
} from "@/lib/natalHarmonicEngine";

import { CosmicBackground } from "@/components/natal-harmonic/CosmicBackground";
import { Header } from "@/components/natal-harmonic/Header";
import { InputForm } from "@/components/natal-harmonic/InputForm";
import { TechnologyInfo } from "@/components/natal-harmonic/TechnologyInfo";
import { PlanetaryPositions } from "@/components/natal-harmonic/PlanetaryPositions";
import { PersonalScale } from "@/components/natal-harmonic/PersonalScale";
import { MajorAspects } from "@/components/natal-harmonic/MajorAspects";
import { AudioPlayer } from "@/components/natal-harmonic/AudioPlayer";
import { CodexString } from "@/components/natal-harmonic/CodexString";
import { RitualScript } from "@/components/natal-harmonic/RitualScript";
import { CopyFeedback } from "@/components/natal-harmonic/CopyFeedback";

// ─── Web Audio drone engine ──────────────────────────────────────────────────

interface DroneNode {
  ctx: AudioContext;
  oscillators: OscillatorNode[];
  gainNodes: GainNode[];
}

function startDrone(
  rootHz: number,
  comp1Hz: number,
  comp2Hz: number | null
): DroneNode {
  const ctx = new AudioContext();
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0, ctx.currentTime);
  masterGain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 2);
  masterGain.connect(ctx.destination);

  const frequencies = [rootHz, comp1Hz, comp2Hz].filter(
    (f): f is number => f !== null && f > 0
  );

  const oscillators: OscillatorNode[] = [];
  const gainNodes: GainNode[] = [];

  frequencies.forEach((freq, i) => {
    const types: OscillatorType[] = ["sine", "triangle", "sawtooth"];
    const gains = [0.6, 0.25, 0.15];

    const osc = ctx.createOscillator();
    osc.type = types[i] ?? "sine";
    osc.frequency.value = freq;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(
      gains[i] ?? 0.1,
      ctx.currentTime + 2 + i * 1.5
    );

    osc.connect(g);
    g.connect(masterGain);
    osc.start();

    oscillators.push(osc);
    gainNodes.push(g);
  });

  // Sub-bass (octave below root)
  const sub = ctx.createOscillator();
  sub.type = "sine";
  sub.frequency.value = rootHz / 2;
  const subGain = ctx.createGain();
  subGain.gain.setValueAtTime(0, ctx.currentTime);
  subGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 3);
  sub.connect(subGain);
  subGain.connect(masterGain);
  sub.start();
  oscillators.push(sub);
  gainNodes.push(subGain);

  return { ctx, oscillators, gainNodes };
}

function stopDrone(drone: DroneNode) {
  const { ctx, oscillators, gainNodes } = drone;
  gainNodes.forEach((g) => {
    g.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
  });
  window.setTimeout(() => {
    oscillators.forEach((o) => {
      try {
        o.stop();
      } catch {
        // already stopped
      }
    });
    ctx.close();
  }, 1600);
}

// ─── Component ───────────────────────────────────────────────────────────────

const NatalHarmonicGenerator = () => {
  const { loading, reading, generateReading } = useCosmicReading();
  const { fetchData, buildReading } = useQuantumMelodicData();

  const [step, setStep] = useState<"input" | "generating" | "result">("input");
  const [showTechInfo, setShowTechInfo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const droneRef = useRef<DroneNode | null>(null);

  const [formData, setFormData] = useState({
    birthDate: "",
    birthTime: "12:00",
    birthLocation: "",
    intention: "healing",
  });

  // Derived display data
  const [displayData, setDisplayData] = useState<{
    planetaryPositions: Record<string, { zodiacSign: string; frequency: number }>;
    scale: { name: string; frequency: number }[];
    mode: string;
    aspects: ReturnType<typeof buildDisplayAspects>;
    codexString: string;
    ritualScript: string;
    rootFrequency: number;
    companionFrequency: number;
    companionFrequency2: number | null;
  } | null>(null);

  const handleInputChange = useCallback(
    (field: string, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleGenerate = useCallback(async () => {
    if (!formData.birthDate || !formData.birthTime || !formData.birthLocation) return;
    setStep("generating");

    try {
      const birthData: BirthData = {
        name: "Seeker",
        date: formData.birthDate,
        time: formData.birthTime,
        location: formData.birthLocation,
      };

      await fetchData();
      const result = await generateReading(birthData);
      if (!result?.chartData?.planets) {
        setStep("input");
        return;
      }

      const qmReading = buildReading(result.chartData.planets);
      if (!qmReading) {
        setStep("input");
        return;
      }

      const { root, companion1, companion2 } = extractDroneFrequencies(qmReading);
      const { scale, mode } = buildPersonalScale(root, formData.intention);

      setDisplayData({
        planetaryPositions: buildPlanetaryPositionsMap(qmReading),
        scale,
        mode,
        aspects: buildDisplayAspects(qmReading),
        codexString: buildCodexString(result.chartData, qmReading, formData.intention),
        ritualScript: buildRitualScript(result.chartData, qmReading, formData.intention),
        rootFrequency: root,
        companionFrequency: companion1,
        companionFrequency2: companion2,
      });

      setStep("result");
    } catch {
      setStep("input");
    }
  }, [formData, fetchData, generateReading, buildReading]);

  const handleTogglePlayback = useCallback(() => {
    if (!displayData) return;
    if (isPlaying) {
      if (droneRef.current) {
        stopDrone(droneRef.current);
        droneRef.current = null;
      }
      setIsPlaying(false);
    } else {
      droneRef.current = startDrone(
        displayData.rootFrequency,
        displayData.companionFrequency,
        displayData.companionFrequency2
      );
      setIsPlaying(true);
    }
  }, [displayData, isPlaying]);

  const handleCopy = useCallback((text: string, message: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopyMessage(message);
    window.setTimeout(() => setCopyMessage(""), 2500);
  }, []);

  const handleReset = useCallback(() => {
    if (droneRef.current) {
      stopDrone(droneRef.current);
      droneRef.current = null;
    }
    setIsPlaying(false);
    setDisplayData(null);
    setStep("input");
  }, []);

  return (
    <PageTransition>
      <SEOHead
        title="Natal Harmonic Generator — Your Astrological Sound Blueprint | Moontuner"
        description="Transform your natal chart into personalized harmonic frequencies, sacred scales, and immersive sound rituals. Precision-engineered from your exact birth moment."
        canonical="/natal-harmonic"
        keywords={[
          "natal harmonic generator",
          "astrological frequencies",
          "personal scale",
          "harmonic drone",
          "birth chart sound",
          "frequency healing",
        ]}
      />

      <div className="min-h-screen bg-background relative">
        <Navigation />

        {/* Cosmic background layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <CosmicBackground />
        </div>

        <main className="relative z-10 pt-24 lg:pt-32 pb-16">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <Header
              showTechInfo={showTechInfo}
              onToggleTechInfo={() => setShowTechInfo((v) => !v)}
            />

            {showTechInfo && <TechnologyInfo />}

            {/* ── Input step ── */}
            {step === "input" && (
              <InputForm
                formData={formData}
                onInputChange={handleInputChange}
                onGenerate={handleGenerate}
                isGenerating={false}
              />
            )}

            {/* ── Generating step ── */}
            {step === "generating" && (
              <div className="text-center py-24">
                <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                <p className="text-xl text-purple-200">
                  Calculating your cosmic harmonics…
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Swiss Ephemeris · VSOP87 orbital mechanics
                </p>
              </div>
            )}

            {/* ── Result step ── */}
            {step === "result" && displayData && (
              <div className="space-y-8">
                <button
                  onClick={handleReset}
                  className="text-sm text-gray-400 hover:text-gray-200 transition-colors flex items-center gap-2"
                >
                  ← Generate Another Reading
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <PlanetaryPositions
                    chartData={{ planetaryPositions: displayData.planetaryPositions }}
                  />
                  <PersonalScale
                    scale={displayData.scale}
                    mode={displayData.mode}
                    onCopy={handleCopy}
                  />
                </div>

                <MajorAspects aspects={displayData.aspects} />

                <AudioPlayer
                  rootFrequency={displayData.rootFrequency}
                  companionFrequency={displayData.companionFrequency}
                  companionFrequency2={displayData.companionFrequency2}
                  isPlaying={isPlaying}
                  onTogglePlayback={handleTogglePlayback}
                />

                <CodexString
                  codexString={displayData.codexString}
                  onCopy={handleCopy}
                />

                <RitualScript
                  ritualScript={displayData.ritualScript}
                  onCopy={handleCopy}
                />
              </div>
            )}
          </div>
        </main>

        <Footer />
        <CopyFeedback message={copyMessage} />
      </div>
    </PageTransition>
  );
};

export default NatalHarmonicGenerator;
