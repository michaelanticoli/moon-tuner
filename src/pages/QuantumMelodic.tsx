import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Activity, Sparkles, Music, Waves } from "lucide-react";
import { useCosmicReading } from "@/hooks/useCosmicReading";
import { useQuantumMelodicData } from "@/hooks/useQuantumMelodicData";
import type { BirthData } from "@/types/astrology";

const QuantumMelodic = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isPaid = searchParams.get("paid") === "true";

  // Gate: redirect unpaid visitors
  useEffect(() => {
    if (!isPaid) {
      navigate("/#report", { replace: true });
    }
  }, [isPaid, navigate]);

  const { loading, error, reading, audioUrl, progress, stage, generateReading, reset } = useCosmicReading();
  const { fetchData, dataReady, buildReading } = useQuantumMelodicData();
  const [step, setStep] = useState<"input" | "generating" | "result">("input");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    date: "1990-01-01",
    time: "12:00",
    location: "",
  });

  // Pre-fill from sessionStorage
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("qm_birth_data");
      if (raw) {
        const saved = JSON.parse(raw);
        setFormData(prev => ({ ...prev, ...saved }));
      }
    } catch {}
  }, []);

  // Load QM harmonic data
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

      await generateReading(birthData);
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

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
      audioRef.current = null;
    };
  }, [audioUrl]);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else { await audioRef.current.play(); setIsPlaying(true); }
  };

  const formatTime = (t: number) => `${Math.floor(t / 60)}:${Math.floor(t % 60).toString().padStart(2, "0")}`;

  if (!isPaid) return null;

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground selection:bg-gold selection:text-gold-foreground">
        <Navigation />

        <main className="pt-32">
          <section className="min-h-[80vh] flex items-center py-20">
            <div className="max-w-7xl mx-auto px-8 w-full">
              <AnimatePresence mode="wait">
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
                          <div className="flex items-center gap-3">
                            <Waves className="w-4 h-4 text-accent" />
                            <span>10 planetary voices synthesized from your exact positions</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Sparkles className="w-4 h-4 text-accent" />
                            <span>Deterministic — same chart always produces the same composition</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Music className="w-4 h-4 text-accent" />
                            <span>Key, tempo, and mode derived from your Sun and Moon signs</span>
                          </div>
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
                          <Button onClick={handleGenerate} disabled={loading} className="w-full py-6 h-auto bg-foreground text-background font-bold text-[11px] uppercase tracking-[0.3em] rounded-full hover:bg-accent hover:text-accent-foreground transition-all duration-500">
                            Generate My Symphony
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

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
                      <motion.div
                        className="h-full bg-accent rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
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

                {step === "result" && reading && (
                  <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    {/* Result Header */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-border pb-12">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-accent mb-4 block flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Composition Complete
                        </span>
                        <h2 className="text-5xl font-serif text-foreground mb-2">{reading.birthData.name}'s Symphony</h2>
                        <p className="text-muted-foreground">
                          <span className="text-foreground font-bold">☉ {reading.chartData.sunSign}</span> · <span className="text-foreground font-bold">☽ {reading.chartData.moonSign}</span> · <span className="text-accent">{reading.musicalMode}</span>
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-4 mt-8 md:mt-0">
                        <Button variant="outline" onClick={() => { reset(); setStep("input"); }} className="px-6 py-6 h-auto rounded-full text-[9px] uppercase tracking-widest font-bold">
                          New Reading
                        </Button>
                      </div>
                    </div>

                    {/* Audio Player */}
                    {audioUrl && (
                      <div className="mb-16 p-8 bg-card border border-border rounded-[2rem]">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h3 className="text-foreground font-serif text-xl">Your Cosmic Composition</h3>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                              Tone.js synthesis · {reading.chartData.planets.filter(p => p.name !== 'Ascendant').length} planetary voices
                            </p>
                          </div>
                          <button
                            onClick={togglePlay}
                            className="w-14 h-14 rounded-full border border-accent/30 flex items-center justify-center hover:bg-accent/10 transition-colors"
                          >
                            {isPlaying ? (
                              <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" /></svg>
                            ) : (
                              <svg className="w-5 h-5 text-accent ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            )}
                          </button>
                        </div>
                        <div className="w-full h-1 bg-border rounded-full overflow-hidden mb-2 cursor-pointer"
                          onClick={(e) => {
                            if (!audioRef.current || !duration) return;
                            const rect = (e.target as HTMLElement).getBoundingClientRect();
                            audioRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
                          }}
                        >
                          <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }} />
                        </div>
                        <div className="flex justify-between text-[10px] text-muted-foreground">
                          <span>{formatTime(currentTime)}</span>
                          <span>-{formatTime(Math.max(0, duration - currentTime))}</span>
                        </div>
                      </div>
                    )}

                    {/* Planetary Positions Table */}
                    <div className="mb-16">
                      <h3 className="text-[10px] uppercase font-bold tracking-[0.5em] text-accent mb-8">Planetary Positions</h3>
                      <div className="grid gap-3">
                        {reading.chartData.planets.map((planet) => (
                          <div key={planet.name} className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl">
                            <div className="flex items-center gap-4">
                              <span className="text-xl">{planet.symbol}</span>
                              <div>
                                <span className="text-foreground font-medium">{planet.name}</span>
                                {planet.isRetrograde && <span className="text-accent text-xs ml-2">℞</span>}
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-foreground">{planet.sign}</span>
                              <span className="text-muted-foreground text-sm ml-2">{Math.floor(planet.degree)}°{Math.round((planet.degree - Math.floor(planet.degree)) * 60).toString().padStart(2, '0')}'</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Closing */}
                    <div className="text-center py-16 border-t border-border">
                      <p className="text-muted-foreground italic font-serif text-lg max-w-lg mx-auto">
                        "Every chart is a score waiting to be heard. Yours has been playing since the moment you arrived."
                      </p>
                      <p className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground/50 mt-6">
                        MOONtuner × QuantumMelodic
                      </p>
                    </div>
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
