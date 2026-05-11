import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Mic, Loader2, Play, Pause, Download, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { isCreator } from "@/lib/creatorAccess";

interface NarrationUpsellProps {
  reportType: "lunar-arc" | "cazimi" | "natal";
  reportLabel: string;
  sourceText: string;
  returnPath: string;
}

type Status = "idle" | "checkout" | "generating" | "ready" | "error";

export function NarrationUpsell({
  reportType,
  reportLabel,
  sourceText,
  returnPath,
}: NarrationUpsellProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const creator = isCreator(user?.email);
  const [status, setStatus] = useState<Status>("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // On mount: handle Stripe return OR a coupon code (?coupon=CODE).
  useEffect(() => {
    const narrationId = searchParams.get("narration_id");
    const narrationStatus = searchParams.get("narration_status");
    const sessionId = searchParams.get("session_id");
    const narrationAddon = searchParams.get("narration_addon");
    const coupon = searchParams.get("coupon");

    const claimViaSession = sessionId && narrationAddon === "1";
    const claimViaNarrationId = narrationId && narrationStatus === "success";
    const claimViaCoupon = !!coupon;

    if (!claimViaSession && !claimViaNarrationId && !claimViaCoupon) return;

    setStatus("generating");
    (async () => {
      try {
        let data: { audioUrl?: string } | null = null;
        if (claimViaCoupon) {
          const r = await supabase.functions.invoke("redeem-narration-coupon", {
            body: { coupon, text: sourceText, label: reportLabel },
          });
          if (r.error) throw r.error;
          data = r.data;
        } else {
          const invokeBody = claimViaSession
            ? { stripeSessionId: sessionId, reportType, reportLabel, sourceText, returnPath }
            : { narrationId };
          const r = await supabase.functions.invoke("generate-narration", { body: invokeBody });
          if (r.error) throw r.error;
          data = r.data;
        }
        if (data?.audioUrl) {
          setAudioUrl(data.audioUrl);
          setStatus("ready");
        } else throw new Error("No audio URL returned");
      } catch (e) {
        console.error(e);
        setError(e instanceof Error ? e.message : "Generation failed");
        setStatus("error");
      } finally {
        searchParams.delete("narration_id");
        searchParams.delete("narration_status");
        searchParams.delete("narration_addon");
        searchParams.delete("session_id");
        searchParams.delete("coupon");
        setSearchParams(searchParams, { replace: true });
      }
    })();
  }, []); // eslint-disable-line

  const handlePurchase = async () => {
    setStatus("checkout");
    setError(null);
    try {
      const { data, error } = await supabase.functions.invoke(
        "create-narration-checkout",
        {
          body: {
            reportType,
            reportLabel,
            sourceText,
            returnPath,
          },
        },
      );
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      } else throw new Error("No checkout URL");
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Checkout failed");
      setStatus("error");
    }
  };

  const handleCreatorGenerate = async () => {
    setStatus("generating");
    setError(null);
    try {
      // Try authenticated creator endpoint, fall back to public coupon
      let url: string | undefined;
      const c = await supabase.functions.invoke("creator-narration", {
        body: { text: sourceText, label: reportLabel },
      });
      if (!c.error && (c.data?.audioUrl || c.data?.url)) {
        url = c.data.audioUrl || c.data.url;
      } else {
        console.warn("creator-narration unavailable, falling back to coupon:", c.error);
        const fb = await supabase.functions.invoke("redeem-narration-coupon", {
          body: { coupon: "MOON-GUEST", text: sourceText, label: reportLabel },
        });
        if (fb.error) throw fb.error;
        url = fb.data?.audioUrl;
      }
      if (!url) throw new Error("No audio URL returned");
      setAudioUrl(url);
      setStatus("ready");
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Generation failed");
      setStatus("error");
    }
  };

  const togglePlay = () => {
    if (!audioUrl) return;
    if (!audio) {
      const a = new Audio(audioUrl);
      a.onended = () => setIsPlaying(false);
      setAudio(a);
      a.play();
      setIsPlaying(true);
      return;
    }
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-16 p-10 rounded-[2rem] border border-gold/30 bg-gradient-to-br from-gold/5 via-card to-card relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="relative flex flex-col md:flex-row gap-8 items-start">
        <div className="w-16 h-16 rounded-2xl border border-gold/40 bg-gold/10 flex items-center justify-center flex-shrink-0">
          <Mic className="w-7 h-7 text-gold" />
        </div>

        <div className="flex-1">
          <span className="text-[9px] uppercase font-bold tracking-[0.5em] text-gold mb-3 block flex items-center gap-2">
            <Sparkles className="w-3 h-3" />
            Voice Narration Add-On · $5
          </span>
          <h3 className="text-3xl font-serif text-foreground mb-3">
            Hear it in Michael's voice.
          </h3>
          <p className="text-muted-foreground font-light leading-relaxed max-w-2xl mb-6">
            Add a studio-grade narration of this report, read in Michael Moon's own
            cloned voice. Listen on any walk, commute, or ritual — your timing
            spoken aloud, in tune with the lunar arc.
          </p>

          {status === "idle" && (
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handlePurchase}
                className="px-8 py-6 h-auto rounded-full text-[10px] uppercase tracking-[0.3em] font-bold bg-gold text-gold-foreground hover:bg-gold/90"
              >
                <Mic className="w-4 h-4 mr-2" />
                Add Narration · $5
              </Button>
              <Button
                onClick={handleCreatorGenerate}
                variant="outline"
                className="px-8 py-6 h-auto rounded-full text-[10px] uppercase tracking-[0.3em] font-bold border-gold/40 text-gold hover:bg-gold/10"
              >
                <Zap className="w-4 h-4 mr-2" />
                {creator ? "Generate Free (Admin)" : "Generate Free (Guest)"}
              </Button>
            </div>
          )}

          {status === "checkout" && (
            <div className="flex items-center gap-3 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Redirecting to checkout…</span>
            </div>
          )}

          {status === "generating" && (
            <div className="flex items-center gap-3 text-gold">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm uppercase tracking-widest">
                Generating your narration…
              </span>
            </div>
          )}

          {status === "ready" && audioUrl && (
            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={togglePlay}
                className="px-6 py-6 h-auto rounded-full text-[10px] uppercase tracking-[0.3em] font-bold bg-gold text-gold-foreground hover:bg-gold/90"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause Narration
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Play Narration
                  </>
                )}
              </Button>
              <Button
                asChild
                variant="outline"
                className="px-6 py-6 h-auto rounded-full text-[10px] uppercase tracking-[0.3em] font-bold"
              >
                <a href={audioUrl} download={`${reportLabel}-narration.mp3`}>
                  <Download className="w-4 h-4 mr-2" />
                  Download MP3
                </a>
              </Button>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-3">
              <p className="text-sm text-destructive">{error}</p>
              <Button onClick={handlePurchase} variant="outline">
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
