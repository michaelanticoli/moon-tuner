import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { LunarBackground } from "@/components/LunarBackground";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Activity, Sparkles, Music, Waves, Zap, Download, FileText, ExternalLink } from "lucide-react";
import { useCosmicReading } from "@/hooks/useCosmicReading";
import { useQuantumMelodicData } from "@/hooks/useQuantumMelodicData";
import type { BirthData } from "@/types/astrology";
import type { QuantumMelodicReading } from "@/types/quantumMelodic";
import {
  elementInfo,
  aspectMusicalData,
  houseWisdom,
  calculateHarmonicAnalysis,
  getResolutionGuidance,
  getOrbPrecision,
} from "@/utils/harmonicWisdom";
import { buildSymphonyHTML } from "@/lib/generateSymphonyHTML";
import { supabase } from "@/integrations/supabase/client";
import { AstroHarmonicSample } from "@/components/AstroHarmonicSample";

const STRIPE_BUTTON_LOAD_TIMEOUT_MS = 1500;
const QM_STORAGE_KEY = "qm_paid";
const QM_BIRTH_DATA_KEY = "qm_birth_data";

const QuantumMelodic = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const stripeBuyButtonId = import.meta.env.VITE_STRIPE_QM_BUY_BUTTON_ID;
  const stripePublishableKey = import.meta.env.VITE_STRIPE_QM_PUBLISHABLE_KEY;
  const returnedFromCheckout = searchParams.get("paid") === "true" || !!searchParams.get("session_id");
  const [hasPaidAccess, setHasPaidAccess] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("qm_paid") === "true" || returnedFromCheckout;
  });
  const [checkoutUnavailable, setCheckoutUnavailable] = useState(false);
  const buyButtonRef = useRef<HTMLDivElement | null>(null);

  const {
    loading,
    error,
    reading,
    audioUrl,
    audioLoading,
    audioError,
    progress,
    stage,
    generateReading,
    generateAudio,
    reset,
  } = useCosmicReading();
  const { fetchData, error: qmError, buildReading } = useQuantumMelodicData();
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

  const persistPaidAccess = useCallback(() => {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(QM_STORAGE_KEY, "true");
  }, []);

  const saveBirthDraft = useCallback((birthData: BirthData) => {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(QM_BIRTH_DATA_KEY, JSON.stringify(birthData));
  }, []);

  const beginCheckout = useCallback(async () => {
    const birthDraft: BirthData = {
      name: formData.name || "Cosmic Traveler",
      date: formData.date,
      time: formData.time,
      location: formData.location,
    };

    saveBirthDraft(birthDraft);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("create-report-payment", {
        body: {
          product: "astro-harmonic",
          birthDate: birthDraft.date,
          birthTime: birthDraft.time,
          birthLocation: birthDraft.location,
          birthName: birthDraft.name,
          successPath: "/quantumelodic?paid=true",
          cancelPath: "/quantumelodic",
        },
      });

      if (fnError) throw fnError;
      if (!data?.url) throw new Error("Checkout link unavailable");

      window.location.href = data.url as string;
    } catch (checkoutError) {
      console.error("Astro-harmonic checkout failed:", checkoutError);
      setCheckoutUnavailable(true);
    }
  }, [formData.date, formData.location, formData.name, formData.time, saveBirthDraft]);

  useEffect(() => {
    if (!returnedFromCheckout) return;
    persistPaidAccess();
    setHasPaidAccess(true);
  }, [persistPaidAccess, returnedFromCheckout]);

  useEffect(() => {
    if (!buyButtonRef.current || hasPaidAccess) return;
    if (!stripeBuyButtonId || !stripePublishableKey) {
      setCheckoutUnavailable(true);
      return;
    }

    setCheckoutUnavailable(false);

    const mountBuyButton = () => {
      if (!buyButtonRef.current) return false;
      if (buyButtonRef.current.querySelector("stripe-buy-button")) return true;
      if (!customElements.get("stripe-buy-button")) return false;
      const button = document.createElement("stripe-buy-button");
      button.setAttribute("buy-button-id", stripeBuyButtonId);
      button.setAttribute("publishable-key", stripePublishableKey);
      button.addEventListener("click", () =>
        saveBirthDraft({
          name: formData.name || "Cosmic Traveler",
          date: formData.date,
          time: formData.time,
          location: formData.location,
        }),
      );
      buyButtonRef.current.appendChild(button);
      return true;
    };

    if (mountBuyButton()) return;

    const timer = window.setTimeout(() => {
      if (!mountBuyButton()) setCheckoutUnavailable(true);
    }, STRIPE_BUTTON_LOAD_TIMEOUT_MS);

    return () => window.clearTimeout(timer);
  }, [
    formData.date,
    formData.location,
    formData.name,
    formData.time,
    hasPaidAccess,
    saveBirthDraft,
    stripeBuyButtonId,
    stripePublishableKey,
  ]);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(QM_BIRTH_DATA_KEY);
      if (raw) setFormData((prev) => ({ ...prev, ...JSON.parse(raw) }));
    } catch {
      sessionStorage.removeItem(QM_BIRTH_DATA_KEY);
    }
  }, []);

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

      saveBirthDraft(birthData);

      await fetchData();
      const result = await generateReading(birthData);

      if (result?.chartData?.planets) {
        const enriched = buildReading(result.chartData.planets);
        setQmReading(enriched);
      }

      setStep("result");
    } catch {
      setStep("input");
    }
  };

  useEffect(() => {
    if (!audioUrl) return;
    const audio = new Audio();
    audio.src = audioUrl;
    audioRef.current = audio;
    const onMeta = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrentTime(audio.currentTime || 0);
    const onEnd = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
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
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      await audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (t: number) =>
    `${Math.floor(t / 60)}:${Math.floor(t % 60)
      .toString()
      .padStart(2, "0")}`;

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
    return `${d}\u00B0${m.toString().padStart(2, "0")}\u2032`;
  };

  if (!hasPaidAccess) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-accent-foreground">
          <Navigation />
          <main className="pt-24">
            <section className="relative min-h-[70vh] flex items-center overflow-hidden border-b border-border">
              <LunarBackground />
              <div className="relative z-10 container mx-auto px-6 lg:px-12 max-w-5xl py-16">
                <span className="system-label mb-6 block">Astro-Harmonic Natal Analysis</span>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extralight leading-[1.05] mb-6">
                  Hear a sample of your
                  <br />
                  <span className="font-serif italic font-normal">chart’s harmonic report.</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10">
                  Start with the sample structure below, then unlock the full personalized report after secure checkout.
                  No account signup is required.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-10 max-w-3xl">
                  {[
                    "Sample harmonic signature preview",
                    "Sample planetary interval map",
                    "Sample resonance guidance",
                    "Full report unlock after payment",
                  ].map((item) => (
                    <div key={item} className="node-card text-sm text-muted-foreground">
                      {item}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div ref={buyButtonRef}>
                    {checkoutUnavailable ? <Button onClick={beginCheckout}>Purchase Report</Button> : null}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  After payment, return here to enter your birth data and generate your full report instantly.
                </p>
                <p className="text-xs text-muted-foreground/70 mt-2">Find Yourself In The Frequencies</p>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-accent-foreground">
        <Navigation />

        <main className="pt-24">
          <AnimatePresence mode="wait">
            {/* ────────────────────────────────────────── */}
            {/* INPUT STEP — Full-screen hero feel         */}
            {/* ────────────────────────────────────────── */}
            {step === "input" && (
              <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}>
                {/* Hero */}
                <section className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden">
                  <LunarBackground />
                  <div className="relative z-10 container mx-auto px-6 lg:px-12 max-w-5xl">
                    {/* System label */}
                    <div className="opacity-0 animate-fade-in-up mb-8">
                      <span className="system-label">Sonic Natal Architecture</span>
                    </div>

                    {/* Headline */}
                    <div className="opacity-0 animate-fade-in-up delay-100 mb-6">
                      <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extralight text-foreground leading-[1.05]">
                        Your Birth Chart
                        <br />
                        <span className="font-serif italic font-normal">Translated Into Sound.</span>
                      </h1>
                    </div>

                    {/* Subhead */}
                    <div className="opacity-0 animate-fade-in-up delay-200 mb-12 max-w-lg">
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        Every planetary position carries a frequency. Every aspect creates an interval. Your chart is
                        already a composition — we make it audible.
                      </p>
                    </div>

                    {/* Feature bullets */}
                    <div className="opacity-0 animate-fade-in-up delay-300 flex flex-col gap-3 mb-12 max-w-md">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        10 planetary voices synthesized from your exact positions
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        Deterministic — same chart always produces the same composition
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        Key, tempo, and mode derived from your Sun and Moon signs
                      </div>
                    </div>

                    {/* Scroll prompt */}
                    <div className="opacity-0 animate-fade-in delay-500">
                      <a href="#qm-form" className="system-button text-sm">
                        Enter Birth Data
                      </a>
                    </div>
                  </div>
                </section>

                {/* Form section */}
                <section id="qm-form" className="py-24 grain-overlay relative">
                  <div className="container mx-auto px-6 lg:px-12 max-w-xl relative z-10">
                    <div className="text-center mb-12">
                      <span className="system-label mb-4 block">Birth Data Input</span>
                      <h2 className="font-serif text-3xl text-foreground italic">Compose Your Symphony</h2>
                    </div>

                    <div className="node-card space-y-8">
                      <div>
                        <label className="system-label block mb-3">Your Name</label>
                        <Input
                          type="text"
                          placeholder="What should we call you?"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="bg-transparent border-0 border-b border-border rounded-none py-4 text-foreground focus-visible:ring-0 focus-visible:border-accent placeholder:text-muted-foreground/40"
                        />
                      </div>
                      <div>
                        <label className="system-label block mb-3">Birth Date</label>
                        <Input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="bg-transparent border-0 border-b border-border rounded-none py-4 text-foreground focus-visible:ring-0 focus-visible:border-accent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <label className="system-label block mb-3">Birth Time</label>
                          <Input
                            type="time"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className="bg-transparent border-0 border-b border-border rounded-none py-4 text-foreground focus-visible:ring-0 focus-visible:border-accent"
                          />
                        </div>
                        <div>
                          <label className="system-label block mb-3">Location</label>
                          <Input
                            type="text"
                            placeholder="City, Country"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="bg-transparent border-0 border-b border-border rounded-none py-4 text-foreground focus-visible:ring-0 focus-visible:border-accent placeholder:text-muted-foreground/40"
                          />
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          onClick={handleGenerate}
                          disabled={loading || !formData.date || !formData.location}
                          className="system-button w-full justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          Generate My Symphony
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </motion.div>
            )}

            {/* ────────────────────────────────────────── */}
            {/* GENERATING STEP                            */}
            {/* ────────────────────────────────────────── */}
            {step === "generating" && (
              <motion.div
                key="generating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-[80vh] flex flex-col items-center justify-center px-6 relative"
              >
                <LunarBackground />
                <div className="relative z-10 text-center">
                  <div className="w-24 h-24 border border-border rounded-full mx-auto mb-10 flex items-center justify-center relative">
                    <div
                      className="absolute inset-0 border-t border-accent rounded-full animate-spin"
                      style={{ animationDuration: "3s" }}
                    />
                    <Activity className="text-accent w-6 h-6 animate-pulse" />
                  </div>
                  <h3 className="font-serif text-2xl text-foreground mb-3 italic">
                    {stage === "geocoding" && "Locating coordinates\u2026"}
                    {stage === "calculating" && "Computing planetary positions\u2026"}
                    {stage === "generating" && "Rendering audio layer\u2026"}
                    {(stage === "idle" || stage === "complete") && "Preparing\u2026"}
                  </h3>
                  <p className="system-label animate-pulse mb-10">Moshier DE404 Ephemeris \u00B7 Harmonic Mapping</p>
                  <div className="w-48 h-px bg-border rounded-full overflow-hidden mx-auto">
                    <motion.div
                      className="h-full bg-accent rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <span className="system-label mt-3 block">{progress}%</span>
                  {error && (
                    <div className="mt-10">
                      <p className="text-destructive text-sm mb-4">{error}</p>
                      <button
                        onClick={() => {
                          reset();
                          setStep("input");
                        }}
                        className="system-button"
                      >
                        Try Again
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ────────────────────────────────────────── */}
            {/* RESULT STEP — Report                       */}
            {/* ────────────────────────────────────────── */}
            {step === "result" && reading && (
              <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Report Header */}
                <section className="py-20 border-b border-border">
                  <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                      <div>
                        <span className="system-label mb-4 block">Composition Complete</span>
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extralight text-foreground leading-[1.05] mb-4">
                          {reading.birthData.name ? `${reading.birthData.name}\u2019s` : "Your"}
                          <br />
                          <span className="font-serif italic font-normal">Symphony</span>
                        </h1>
                        <div className="flex flex-wrap gap-x-8 gap-y-2 mt-6">
                          {[
                            { label: "Sun", value: reading.chartData.sunSign },
                            { label: "Moon", value: reading.chartData.moonSign },
                            { label: "Rising", value: reading.chartData.ascendant },
                            { label: "Mode", value: reading.musicalMode },
                          ].map((item) => (
                            <div key={item.label} className="flex items-center gap-2">
                              <span className="system-label">{item.label}</span>
                              <span className="w-4 h-px bg-border" />
                              <span className="text-foreground font-sans text-sm tracking-wide">{item.value}</span>
                            </div>
                          ))}
                        </div>
                        {reading.chartData.source === "approximate-fallback" && (
                          <p className="system-label text-muted-foreground/50 mt-4 normal-case italic tracking-normal">
                            Approximate positions — ephemeris service was briefly unavailable
                          </p>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-3 shrink-0">
                        {audioUrl ? (
                          <button
                            onClick={() => {
                              const a = document.createElement("a");
                              a.href = audioUrl;
                              a.download = `${(reading.birthData.name || "cosmic").replace(/\s+/g, "_")}_symphony.wav`;
                              document.body.appendChild(a);
                              a.click();
                              document.body.removeChild(a);
                            }}
                            className="system-button text-xs gap-2"
                          >
                            <Download className="w-3.5 h-3.5" /> Download MP3
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              generateAudio(reading.chartData);
                            }}
                            disabled={audioLoading}
                            className="system-button text-xs gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <Music className="w-3.5 h-3.5" />
                            {audioLoading ? "Rendering Audio…" : "Render Audio"}
                          </button>
                        )}
                        <button
                          onClick={() => {
                            const name = reading.birthData.name || "Cosmic Traveler";
                            const html = buildSymphonyHTML(name, reading, qmReading, harmonicAnalysis, guidance);
                            const blob = new Blob([html], { type: "text/html" });
                            const url = URL.createObjectURL(blob);
                            window.open(url, "_blank");
                            window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
                          }}
                          className="system-button text-xs gap-2"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Interactive Report
                        </button>
                        <button
                          onClick={() => {
                            reset();
                            setQmReading(null);
                            setStep("input");
                          }}
                          className="system-button text-xs shrink-0"
                        >
                          New Reading
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="container mx-auto px-6 lg:px-12 max-w-5xl space-y-0">
                  {/* Audio Player */}
                  {(audioUrl || audioLoading || audioError) && (
                    <motion.section
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="py-16 border-b border-border"
                    >
                      <span className="system-label mb-6 block">Audio Synthesis</span>
                      <div className="node-card">
                        <div className="flex items-center justify-between mb-8">
                          <div>
                            <h3 className="font-serif text-xl text-foreground italic">Your Cosmic Composition</h3>
                            <p className="system-label mt-1">
                              {reading.chartData.planets.filter((p) => p.name !== "Ascendant").length} planetary voices
                              \u00B7 Tone.js synthesis
                            </p>
                          </div>
                          {audioUrl && (
                            <button
                              onClick={togglePlay}
                              className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:border-accent/50 transition-all duration-500 group"
                            >
                              {isPlaying ? (
                                <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                </svg>
                              ) : (
                                <svg
                                  className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors ml-0.5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              )}
                            </button>
                          )}
                        </div>
                        {audioUrl ? (
                          <>
                            <div
                              className="w-full h-px bg-border overflow-hidden cursor-pointer mb-3"
                              onClick={(e) => {
                                if (!audioRef.current || !duration) return;
                                const rect = (e.target as HTMLElement).getBoundingClientRect();
                                audioRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
                              }}
                            >
                              <div
                                className="h-full bg-accent transition-all"
                                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                              />
                            </div>
                            <div className="flex justify-between system-label">
                              <span>{formatTime(currentTime)}</span>
                              <span>-{formatTime(Math.max(0, duration - currentTime))}</span>
                            </div>
                          </>
                        ) : (
                          <div className="rounded-2xl border border-border/60 bg-background/40 p-5">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {audioLoading
                                ? "Your report is ready. Audio is rendering separately so the harmonic analysis never stalls."
                                : audioError ||
                                  "Render audio on demand to keep the report fast, stable, and available even when synthesis is under load."}
                            </p>
                            {!audioLoading && (
                              <button
                                onClick={() => {
                                  generateAudio(reading.chartData);
                                }}
                                className="system-button text-xs mt-4 gap-2"
                              >
                                <Music className="w-3.5 h-3.5" /> Render Audio Now
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.section>
                  )}

                  {/* Harmonic Signature */}
                  {qmReading && (
                    <motion.section
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="py-16 border-b border-border"
                    >
                      <span className="system-label mb-8 block">Harmonic Signature</span>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden">
                        {[
                          { label: "Key", value: qmReading.overallKey },
                          { label: "Tempo", value: `${qmReading.overallTempo}`, unit: "BPM" },
                          {
                            label: "Element",
                            value: qmReading.dominantElement,
                            sub: elementInfo[qmReading.dominantElement]?.symbol,
                          },
                          { label: "Modality", value: qmReading.dominantModality },
                        ].map((item) => (
                          <div key={item.label} className="bg-card p-6 text-center">
                            <span className="system-label block mb-3">{item.label}</span>
                            <span className="font-serif text-2xl text-foreground">{item.value}</span>
                            {item.unit && <span className="text-sm text-muted-foreground ml-1">{item.unit}</span>}
                            {item.sub && <span className="block text-muted-foreground text-xs mt-1">{item.sub}</span>}
                          </div>
                        ))}
                      </div>
                    </motion.section>
                  )}

                  {/* Harmonic Analysis */}
                  {harmonicAnalysis && (
                    <motion.section
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="py-16 border-b border-border"
                    >
                      <span className="system-label mb-8 block">Harmonic Analysis</span>
                      {qmError && (
                        <div className="mb-8 rounded-2xl border border-accent/20 bg-accent/5 px-5 py-4">
                          <p className="text-sm text-foreground/80 leading-relaxed">{qmError}</p>
                        </div>
                      )}
                      <div className="grid md:grid-cols-3 gap-8">
                        {[
                          {
                            label: "Consonance",
                            value: harmonicAnalysis.consonance,
                            desc: "Harmonic flow and natural ease",
                          },
                          {
                            label: "Tension",
                            value: harmonicAnalysis.tension,
                            desc: "Creative friction and evolutionary pressure",
                          },
                          {
                            label: "Complexity",
                            value: harmonicAnalysis.complexity,
                            desc: "Richness and orchestral density",
                          },
                        ].map((meter) => (
                          <div key={meter.label} className="space-y-3">
                            <div className="flex justify-between items-baseline">
                              <span className="text-foreground text-sm font-medium">{meter.label}</span>
                              <span className="text-accent font-mono text-sm">{Math.round(meter.value)}%</span>
                            </div>
                            <div className="w-full h-px bg-border overflow-hidden">
                              <motion.div
                                className="h-full bg-accent"
                                initial={{ width: 0 }}
                                animate={{ width: `${meter.value}%` }}
                                transition={{ duration: 1.2, delay: 0.3 }}
                              />
                            </div>
                            <p className="text-muted-foreground text-xs">{meter.desc}</p>
                          </div>
                        ))}
                      </div>

                      {guidance.length > 0 && (
                        <div className="mt-10 node-card">
                          <span className="system-label block mb-4">Resolution Guidance</span>
                          <div className="space-y-4">
                            {guidance.map((g, i) => (
                              <p key={i} className="text-sm text-foreground/80 leading-relaxed flex gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                                {g}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.section>
                  )}

                  {/* Planetary Positions */}
                  <motion.section
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="py-16 border-b border-border"
                  >
                    <span className="system-label mb-8 block">Planetary Positions</span>
                    <div className="space-y-px">
                      {reading.chartData.planets.map((planet) => {
                        const qmPlanet = qmReading?.planets.find((p) => p.position.name === planet.name);
                        const house = qmPlanet?.houseNumber;
                        const hw = house ? houseWisdom[house] : null;

                        return (
                          <div
                            key={planet.name}
                            className="bg-card border-b border-border/50 p-6 first:rounded-t-lg last:rounded-b-lg last:border-b-0 hover:bg-muted/30 transition-colors duration-500"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-5">
                                <span className="text-xl w-8 text-center text-muted-foreground">{planet.symbol}</span>
                                <div>
                                  <span className="text-foreground text-sm font-medium">{planet.name}</span>
                                  {planet.isRetrograde && (
                                    <span className="text-accent text-[10px] ml-2 font-bold uppercase tracking-wider">
                                      Rx
                                    </span>
                                  )}
                                  {qmPlanet?.qmData?.instrument && (
                                    <span className="system-label block mt-0.5">{qmPlanet.qmData.instrument}</span>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-foreground text-sm">{planet.sign}</span>
                                <span className="text-muted-foreground text-xs ml-2">{degreeFmt(planet.degree)}</span>
                                {house && (
                                  <span className="system-label block mt-0.5">
                                    House {house}
                                    {hw ? ` \u2022 ${hw.area}` : ""}
                                  </span>
                                )}
                              </div>
                            </div>
                            {qmPlanet?.qmData?.sonic_character && (
                              <p className="text-xs text-muted-foreground/60 mt-3 pl-[3.25rem] italic leading-relaxed">
                                {qmPlanet.qmData.sonic_character}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.section>

                  {/* Aspects */}
                  {qmReading && qmReading.aspects.length > 0 && (
                    <motion.section
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="py-16 border-b border-border"
                    >
                      <span className="system-label mb-8 block">Aspects \u2014 Harmonic Intervals</span>
                      <div className="space-y-px">
                        {qmReading.aspects.map((aspect, i) => {
                          const orbInfo = getOrbPrecision(aspect.orb);
                          const musicData = aspectMusicalData[aspect.aspectType.name];
                          return (
                            <div
                              key={i}
                              className="bg-card border-b border-border/50 p-5 first:rounded-t-lg last:rounded-b-lg last:border-b-0"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-3">
                                  <span className="text-base" style={{ color: aspect.aspectType.color }}>
                                    {aspect.aspectType.symbol}
                                  </span>
                                  <span className="text-foreground text-sm">
                                    {aspect.planet1}{" "}
                                    <span className="text-muted-foreground">{aspect.aspectType.name}</span>{" "}
                                    {aspect.planet2}
                                  </span>
                                </div>
                                <span className="system-label">
                                  {orbInfo.label} ({aspect.orb.toFixed(1)}
                                  {"\u00B0"})
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground/60 pl-7 mt-1">
                                <span>{aspect.aspectType.harmonic_interval}</span>
                                <span>{aspect.aspectType.consonance}</span>
                                {musicData && <span className="italic">{musicData.energy}</span>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.section>
                  )}

                  {/* Elemental Balance */}
                  {harmonicAnalysis && (
                    <motion.section
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="py-16 border-b border-border"
                    >
                      <span className="system-label mb-8 block">Elemental Balance</span>
                      <div className="grid grid-cols-4 gap-px bg-border rounded-lg overflow-hidden">
                        {Object.entries(harmonicAnalysis.elements).map(([element, count]) => {
                          const info = elementInfo[element];
                          const total = Object.values(harmonicAnalysis.elements).reduce((a, b) => a + b, 0);
                          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                          return (
                            <div key={element} className="bg-card p-6 text-center">
                              <span className="text-xl block mb-2 text-muted-foreground">
                                {info?.symbol || element[0]}
                              </span>
                              <span className="text-foreground text-sm font-medium block">{element}</span>
                              <div className="w-full h-px bg-border overflow-hidden mt-4 mb-2 mx-auto max-w-[4rem]">
                                <motion.div
                                  className="h-full bg-accent"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${pct}%` }}
                                  transition={{ duration: 0.8, delay: 0.4 }}
                                />
                              </div>
                              <span className="system-label">{pct}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </motion.section>
                  )}

                  {/* Closing */}
                  <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="py-24 text-center"
                  >
                    <p className="font-serif text-xl text-foreground/70 italic max-w-md mx-auto leading-relaxed">
                      Every chart is a score waiting to be heard. Yours has been playing since the moment you arrived.
                    </p>
                    <p className="system-label mt-8 text-muted-foreground/40">MOONtuner {"\u00D7"} QuantumMelodic</p>
                  </motion.section>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default QuantumMelodic;
