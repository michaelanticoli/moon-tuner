import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Activity, Sparkles, Music, Waves, Zap, Globe, Eye } from "lucide-react";
import { useCosmicReading } from "@/hooks/useCosmicReading";
import { useQuantumMelodicData } from "@/hooks/useQuantumMelodicData";
import type { BirthData } from "@/types/astrology";
import type { QuantumMelodicReading } from "@/types/quantumMelodic";
import {
  elementInfo, aspectMusicalData, houseWisdom,
  calculateHarmonicAnalysis, getResolutionGuidance, getOrbPrecision,
} from "@/utils/harmonicWisdom";

const QuantumMelodic = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isPaid = searchParams.get("paid") === "true";

  useEffect(() => {
    if (!isPaid) navigate("/#report", { replace: true });
  }, [isPaid, navigate]);

  const { loading, error, reading, audioUrl, progress, stage, generateReading, reset } = useCosmicReading();
  const { fetchData, dataReady, buildReading, loading: qmLoading } = useQuantumMelodicData();
  const [step, setStep] = useState<"input" | "generating" | "result">("input");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [qmReading, setQmReading] = useState<QuantumMelodicReading | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    date: "1990-01-01",
    time: "12:00",
    location: "",
  });

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("qm_birth_data");
      if (raw) setFormData(prev => ({ ...prev, ...JSON.parse(raw) }));
    } catch {}
  }, []);

  // Fetch QM harmonic data once
  useEffect(() => {
    if (isPaid) fetchData();
  }, [isPaid, fetchData]);

  const handleGenerate = async () => {
    if (!formData.date || !formData.location) return;
    setStep("generating");

    try {
      const birthData: BirthData = {
        name: formData.name || "Cosmic Traveler",
        date: formData.date,
        time: formData.time,
        location: formData.location,
      };

      const result = await generateReading(birthData);

      // Build QM enriched reading if harmonic data is available
      if (result?.chartData?.planets) {
        const enriched = buildReading(result.chartData.planets);
        setQmReading(enriched);
      }

      setStep("result");
    } catch {
      setStep("input");
    }
  };

  // Audio setup
  useEffect(() => {
    if (!audioUrl) return;
    const audio = new Audio();
    audio.src = audioUrl;
    audioRef.current = audio;
    const onMeta = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrentTime(audio.currentTime || 0);
    const onEnd = () => { setIsPlaying(false); setCurrentTime(0); };
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    return () => { audio.pause(); audio.removeEventListener("loadedmetadata", onMeta); audio.removeEventListener("timeupdate", onTime); audio.removeEventListener("ended", onEnd); audioRef.current = null; };
  }, [audioUrl]);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else { await audioRef.current.play(); setIsPlaying(true); }
  };

  const formatTime = (t: number) => `${Math.floor(t / 60)}:${Math.floor(t % 60).toString().padStart(2, "0")}`;

  // Harmonic analysis
  const harmonicAnalysis = useMemo(() => {
    if (!qmReading) return null;
    return calculateHarmonicAnalysis(qmReading.aspects, qmReading.planets);
  }, [qmReading]);

  const guidance = useMemo(() => {
    if (!harmonicAnalysis) return [];
    return getResolutionGuidance(harmonicAnalysis);
  }, [harmonicAnalysis]);

  const degreeFmt = (deg: number) => {
    const d = Math.floor(deg % 30);
    const m = Math.round((deg % 1) * 60);
    return `${d}\u00B0${m.toString().padStart(2, '0')}\u2032`;
  };

  if (!isPaid) return null;

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-accent-foreground">
        <Navigation />

        <main className="pt-32">
          <section className="min-h-[80vh] flex items-center py-20">
            <div className="max-w-7xl mx-auto px-8 w-full">
              <AnimatePresence mode="wait">

                {/* ── INPUT STEP ── */}
                {step === "input" && (
                  <motion.div key="input" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                    <div className="flex flex-col md:flex-row gap-12 items-start mb-16">
                      <div className="w-32 h-32 rounded-[2rem] shadow-2xl shadow-accent/20 border border-border bg-card flex items-center justify-center">
                        <Music className="w-16 h-16 text-accent" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-[0.8em] text-accent mb-6 block">
                          QUANTUMELODIC SYMPHONY
                        </span>
                        <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-display font-extralight leading-[0.9] tracking-tight mb-6">
                          Your Birth Chart <br />
                          <span className="text-gradient-silver italic font-light">Translated Into Sound.</span>
                        </h1>
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                      <div className="space-y-8">
                        <p className="max-w-md text-xl text-muted-foreground font-light leading-relaxed">
                          Every planetary position carries a frequency. Every aspect creates an interval.
                          Your chart is already a composition — we just make it audible.
                        </p>
                        <div className="space-y-4 text-sm text-muted-foreground/80">
                          <div className="flex items-center gap-3"><Waves className="w-4 h-4 text-accent shrink-0" /><span>10 planetary voices synthesized from your exact positions</span></div>
                          <div className="flex items-center gap-3"><Sparkles className="w-4 h-4 text-accent shrink-0" /><span>Deterministic — same chart always produces the same composition</span></div>
                          <div className="flex items-center gap-3"><Music className="w-4 h-4 text-accent shrink-0" /><span>Key, tempo, and mode derived from your Sun and Moon signs</span></div>
                        </div>
                      </div>

                      <div className="p-12 bg-card border border-border rounded-[3rem] backdrop-blur-xl">
                        <h4 className="text-foreground font-serif text-2xl mb-8">Enter Birth Data</h4>
                        <div className="space-y-6">
                          <div>
                            <label className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold block mb-2">Your Name</label>
                            <Input type="text" placeholder="What should we call you?" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-transparent border-0 border-b border-border rounded-none py-4 focus-visible:ring-0 focus-visible:border-accent placeholder:text-muted-foreground/50" />
                          </div>
                          <div>
                            <label className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold block mb-2">Birth Date</label>
                            <Input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="bg-transparent border-0 border-b border-border rounded-none py-4 focus-visible:ring-0 focus-visible:border-accent" />
                          </div>
                          <div className="grid grid-cols-2 gap-8">
                            <div>
                              <label className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold block mb-2">Birth Time</label>
                              <Input type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className="bg-transparent border-0 border-b border-border rounded-none py-4 focus-visible:ring-0 focus-visible:border-accent" />
                            </div>
                            <div>
                              <label className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold block mb-2">Location</label>
                              <Input type="text" placeholder="City, Country" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="bg-transparent border-0 border-b border-border rounded-none py-4 focus-visible:ring-0 focus-visible:border-accent placeholder:text-muted-foreground/50" />
                            </div>
                          </div>
                          <Button onClick={handleGenerate} disabled={loading || !formData.date || !formData.location} className="w-full py-6 h-auto bg-foreground text-background font-bold text-[11px] uppercase tracking-[0.3em] rounded-full hover:bg-accent hover:text-accent-foreground transition-all duration-500">
                            Generate My Symphony
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── GENERATING STEP ── */}
                {step === "generating" && (
                  <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-20 min-h-[50vh] flex flex-col items-center justify-center">
                    <div className="w-32 h-32 border-2 border-accent/20 rounded-full mx-auto mb-12 flex items-center justify-center relative">
                      <div className="absolute inset-0 border-t-2 border-accent rounded-full animate-spin" />
                      <Activity className="text-accent w-8 h-8 animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-serif text-foreground mb-4">
                      {stage === "geocoding" && "Locating coordinates..."}
                      {stage === "calculating" && "Computing planetary positions..."}
                      {stage === "generating" && "Synthesizing your composition..."}
                      {(stage === "idle" || stage === "complete") && "Preparing..."}
                    </h3>
                    <p className="text-muted-foreground text-[10px] uppercase tracking-[0.5em] animate-pulse mb-8">
                      Moshier DE404 Ephemeris · Tone.js Synthesis
                    </p>
                    <div className="w-64 h-1 bg-border rounded-full overflow-hidden">
                      <motion.div className="h-full bg-accent rounded-full" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-2">{progress}%</span>
                    {error && (
                      <div className="mt-8">
                        <p className="text-destructive text-sm mb-4">{error}</p>
                        <Button variant="outline" onClick={() => { reset(); setStep("input"); }}>Try Again</Button>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* ── RESULT STEP ── */}
                {step === "result" && reading && (
                  <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-16">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-end border-b border-border pb-12">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-accent mb-4 block flex items-center gap-2">
                          <Sparkles className="w-4 h-4" /> Composition Complete
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-3">
                          {reading.birthData.name ? `${reading.birthData.name}\u2019s Symphony` : 'Your Symphony'}
                        </h2>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                          <span><span className="text-muted-foreground">Sun</span> <span className="text-foreground font-semibold">{reading.chartData.sunSign}</span></span>
                          <span><span className="text-muted-foreground">Moon</span> <span className="text-foreground font-semibold">{reading.chartData.moonSign}</span></span>
                          <span><span className="text-muted-foreground">Rising</span> <span className="text-foreground font-semibold">{reading.chartData.ascendant}</span></span>
                          <span><span className="text-muted-foreground">Mode</span> <span className="text-accent font-semibold">{reading.musicalMode}</span></span>
                        </div>
                        {reading.chartData.source === 'approximate-fallback' && (
                          <p className="text-[10px] text-muted-foreground/60 mt-2 italic">Approximate positions — ephemeris service was briefly unavailable</p>
                        )}
                      </div>
                      <div className="mt-8 md:mt-0">
                        <Button variant="outline" onClick={() => { reset(); setQmReading(null); setStep("input"); }} className="px-6 py-6 h-auto rounded-full text-[9px] uppercase tracking-widest font-bold">
                          New Reading
                        </Button>
                      </div>
                    </div>

                    {/* Audio Player */}
                    {audioUrl && (
                      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-8 bg-card border border-border rounded-[2rem]">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h3 className="text-foreground font-serif text-xl">Your Cosmic Composition</h3>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                              {reading.chartData.planets.filter(p => p.name !== 'Ascendant').length} planetary voices · Tone.js synthesis
                            </p>
                          </div>
                          <button onClick={togglePlay} className="w-14 h-14 rounded-full border border-accent/30 flex items-center justify-center hover:bg-accent/10 transition-colors">
                            {isPlaying ? (
                              <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" /></svg>
                            ) : (
                              <svg className="w-5 h-5 text-accent ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            )}
                          </button>
                        </div>
                        <div className="w-full h-1 bg-border rounded-full overflow-hidden mb-2 cursor-pointer"
                          onClick={(e) => { if (!audioRef.current || !duration) return; const rect = (e.target as HTMLElement).getBoundingClientRect(); audioRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * duration; }}>
                          <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }} />
                        </div>
                        <div className="flex justify-between text-[10px] text-muted-foreground">
                          <span>{formatTime(currentTime)}</span>
                          <span>-{formatTime(Math.max(0, duration - currentTime))}</span>
                        </div>
                      </motion.div>
                    )}

                    {/* Harmonic Signature Overview */}
                    {qmReading && (
                      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                        <h3 className="text-[10px] uppercase font-bold tracking-[0.5em] text-accent mb-6">Harmonic Signature</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="p-6 bg-card border border-border rounded-2xl text-center">
                            <span className="text-[9px] uppercase tracking-widest text-muted-foreground block mb-2">Key</span>
                            <span className="text-2xl font-serif text-foreground">{qmReading.overallKey}</span>
                          </div>
                          <div className="p-6 bg-card border border-border rounded-2xl text-center">
                            <span className="text-[9px] uppercase tracking-widest text-muted-foreground block mb-2">Tempo</span>
                            <span className="text-2xl font-serif text-foreground">{qmReading.overallTempo} <span className="text-sm text-muted-foreground">BPM</span></span>
                          </div>
                          <div className="p-6 bg-card border border-border rounded-2xl text-center">
                            <span className="text-[9px] uppercase tracking-widest text-muted-foreground block mb-2">Element</span>
                            <span className="text-2xl font-serif text-foreground">{qmReading.dominantElement}</span>
                            {elementInfo[qmReading.dominantElement] && (
                              <span className="text-[10px] text-muted-foreground block mt-1">{elementInfo[qmReading.dominantElement].symbol}</span>
                            )}
                          </div>
                          <div className="p-6 bg-card border border-border rounded-2xl text-center">
                            <span className="text-[9px] uppercase tracking-widest text-muted-foreground block mb-2">Modality</span>
                            <span className="text-2xl font-serif text-foreground">{qmReading.dominantModality}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Harmonic Analysis Meters */}
                    {harmonicAnalysis && (
                      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <h3 className="text-[10px] uppercase font-bold tracking-[0.5em] text-accent mb-6">Harmonic Analysis</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                          {[
                            { label: 'Consonance', value: harmonicAnalysis.consonance, desc: 'Harmonic flow and natural ease' },
                            { label: 'Tension', value: harmonicAnalysis.tension, desc: 'Creative friction and evolutionary pressure' },
                            { label: 'Complexity', value: harmonicAnalysis.complexity, desc: 'Richness and orchestral density' },
                          ].map((meter) => (
                            <div key={meter.label} className="p-6 bg-card border border-border rounded-2xl">
                              <div className="flex justify-between items-baseline mb-3">
                                <span className="text-foreground font-medium text-sm">{meter.label}</span>
                                <span className="text-accent font-bold text-lg">{Math.round(meter.value)}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-border rounded-full overflow-hidden mb-3">
                                <motion.div className="h-full bg-accent rounded-full" initial={{ width: 0 }} animate={{ width: `${meter.value}%` }} transition={{ duration: 1, delay: 0.3 }} />
                              </div>
                              <p className="text-[10px] text-muted-foreground">{meter.desc}</p>
                            </div>
                          ))}
                        </div>
                        {guidance.length > 0 && (
                          <div className="mt-6 p-6 bg-card border border-border rounded-2xl">
                            <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold block mb-4">Resolution Guidance</span>
                            <div className="space-y-3">
                              {guidance.map((g, i) => (
                                <p key={i} className="text-sm text-foreground/80 leading-relaxed flex gap-3">
                                  <Zap className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                                  {g}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Planetary Positions */}
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                      <h3 className="text-[10px] uppercase font-bold tracking-[0.5em] text-accent mb-6">Planetary Positions</h3>
                      <div className="grid gap-3">
                        {reading.chartData.planets.map((planet) => {
                          const qmPlanet = qmReading?.planets.find(p => p.position.name === planet.name);
                          const house = qmPlanet?.houseNumber;
                          const hw = house ? houseWisdom[house] : null;

                          return (
                            <div key={planet.name} className="p-5 bg-card border border-border rounded-2xl">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <span className="text-2xl w-8 text-center">{planet.symbol}</span>
                                  <div>
                                    <span className="text-foreground font-medium">{planet.name}</span>
                                    {planet.isRetrograde && <span className="text-accent text-xs ml-2 font-bold">Rx</span>}
                                    {qmPlanet?.qmData?.instrument && (
                                      <span className="text-[10px] text-muted-foreground block">{qmPlanet.qmData.instrument}</span>
                                    )}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className="text-foreground font-medium">{planet.sign}</span>
                                  <span className="text-muted-foreground text-sm ml-2">{degreeFmt(planet.degree)}</span>
                                  {house && (
                                    <span className="text-[10px] text-muted-foreground block">House {house}{hw ? ` \u2022 ${hw.area}` : ''}</span>
                                  )}
                                </div>
                              </div>
                              {qmPlanet?.qmData?.sonic_character && (
                                <p className="text-[11px] text-muted-foreground/70 mt-2 pl-12 italic">{qmPlanet.qmData.sonic_character}</p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>

                    {/* Aspects */}
                    {qmReading && qmReading.aspects.length > 0 && (
                      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <h3 className="text-[10px] uppercase font-bold tracking-[0.5em] text-accent mb-6">Aspects — Harmonic Intervals</h3>
                        <div className="grid gap-3">
                          {qmReading.aspects.map((aspect, i) => {
                            const orbInfo = getOrbPrecision(aspect.orb);
                            const musicData = aspectMusicalData[aspect.aspectType.name];
                            return (
                              <div key={i} className="p-5 bg-card border border-border rounded-2xl">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-3">
                                    <span className="text-lg" style={{ color: aspect.aspectType.color }}>{aspect.aspectType.symbol}</span>
                                    <span className="text-foreground text-sm font-medium">
                                      {aspect.planet1} {aspect.aspectType.name} {aspect.planet2}
                                    </span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-[10px] text-muted-foreground">{orbInfo.label} ({aspect.orb.toFixed(1)}{'\u00B0'})</span>
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-x-6 gap-y-1 text-[10px] text-muted-foreground pl-8">
                                  <span>{aspect.aspectType.harmonic_interval}</span>
                                  <span>{aspect.aspectType.consonance}</span>
                                  {musicData && <span className="italic">{musicData.energy}</span>}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* Elemental Balance */}
                    {harmonicAnalysis && (
                      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                        <h3 className="text-[10px] uppercase font-bold tracking-[0.5em] text-accent mb-6">Elemental Balance</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {Object.entries(harmonicAnalysis.elements).map(([element, count]) => {
                            const info = elementInfo[element];
                            const total = Object.values(harmonicAnalysis.elements).reduce((a, b) => a + b, 0);
                            const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                            return (
                              <div key={element} className="p-5 bg-card border border-border rounded-2xl text-center">
                                <span className="text-2xl block mb-1">{info?.symbol || element[0]}</span>
                                <span className="text-foreground font-medium text-sm">{element}</span>
                                <div className="w-full h-1 bg-border rounded-full overflow-hidden mt-3 mb-1">
                                  <motion.div className="h-full bg-accent rounded-full" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.4 }} />
                                </div>
                                <span className="text-[10px] text-muted-foreground">{pct}% ({count})</span>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* Closing */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-center py-16 border-t border-border">
                      <p className="text-muted-foreground italic font-serif text-lg max-w-lg mx-auto leading-relaxed">
                        Every chart is a score waiting to be heard. Yours has been playing since the moment you arrived.
                      </p>
                      <p className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground/50 mt-6">
                        MOONtuner {'\u00D7'} QuantumMelodic
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default QuantumMelodic;
