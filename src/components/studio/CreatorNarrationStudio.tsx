import { useState } from "react";
import { Mic, Loader2, Play, Pause, Download, Sparkles, Trash2, Gift, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Clip {
  id: string;
  label: string;
  url: string;
  text: string;
}

export function CreatorNarrationStudio() {
  const [label, setLabel] = useState("");
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [clips, setClips] = useState<Clip[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);

  const charCount = text.length;
  const tooLong = charCount > 5000;

  const generate = async () => {
    if (!text.trim()) {
      toast.error("Add some text to narrate.");
      return;
    }
    if (tooLong) {
      toast.error("Text exceeds 5000 character limit.");
      return;
    }
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("creator-narration", {
        body: { text, label: label || "bit" },
      });
      if (error) throw error;
      if (!data?.audioUrl) throw new Error("No audio URL returned");
      const clip: Clip = {
        id: crypto.randomUUID(),
        label: label || "Untitled bit",
        url: data.audioUrl,
        text,
      };
      setClips((c) => [clip, ...c]);
      toast.success("Narration ready.");
    } catch (e) {
      console.error(e);
      const msg = e instanceof Error ? e.message : "Generation failed";
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  };

  const togglePlay = (clip: Clip) => {
    if (playingId === clip.id && audioEl) {
      audioEl.pause();
      setPlayingId(null);
      return;
    }
    if (audioEl) audioEl.pause();
    const a = new Audio(clip.url);
    a.onended = () => setPlayingId(null);
    a.play();
    setAudioEl(a);
    setPlayingId(clip.id);
  };

  const removeClip = (id: string) => {
    if (playingId === id && audioEl) {
      audioEl.pause();
      setPlayingId(null);
    }
    setClips((c) => c.filter((x) => x.id !== id));
  };

  return (
    <section className="mb-10 border border-gold/30 rounded-lg p-6 bg-gradient-to-br from-gold/[0.04] to-transparent">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full border border-gold/60 flex items-center justify-center">
            <Mic className="w-3.5 h-3.5 text-gold" />
          </span>
          <h2 className="text-lg font-light tracking-wide flex items-center gap-2">
            Creator narration bits
            <span className="text-[9px] uppercase tracking-[0.3em] text-gold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Creator only
            </span>
          </h2>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
        Generate audio bits in Michael Moon's cloned voice. Use for intros, social
        clips, episode tags, or report previews. No payment, no checkout — direct
        ElevenLabs synthesis routed to your studio.
      </p>

      <div className="grid gap-4 mb-4">
        <div>
          <Label htmlFor="bit-label" className="text-xs uppercase tracking-wider text-muted-foreground">
            Label (optional)
          </Label>
          <Input
            id="bit-label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g. ig-reel-intro, full-moon-tag"
            className="mt-1.5 bg-background"
            disabled={busy}
          />
        </div>
        <div>
          <Label htmlFor="bit-text" className="text-xs uppercase tracking-wider text-muted-foreground flex justify-between">
            <span>Script</span>
            <span className={tooLong ? "text-destructive" : "text-muted-foreground/60"}>
              {charCount} / 5000
            </span>
          </Label>
          <Textarea
            id="bit-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste the words to be spoken in Michael's voice…"
            className="mt-1.5 bg-background min-h-[140px] font-sans"
            disabled={busy}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={generate} disabled={busy || tooLong || !text.trim()} variant="gold" size="sm">
          {busy ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating…
            </>
          ) : (
            <>
              <Mic className="w-3.5 h-3.5" /> Generate bit
            </>
          )}
        </Button>
        {text && !busy && (
          <Button onClick={() => setText("")} variant="ghost" size="sm">
            Clear script
          </Button>
        )}
      </div>

      {clips.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border/40">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
            Session bits ({clips.length})
          </p>
          <div className="space-y-2">
            {clips.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-3 p-3 border border-border/40 rounded-md bg-background/40"
              >
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => togglePlay(c)}
                  className="h-8 w-8 flex-shrink-0"
                >
                  {playingId === c.id ? (
                    <Pause className="w-4 h-4 text-gold" />
                  ) : (
                    <Play className="w-4 h-4 text-gold" />
                  )}
                </Button>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-light truncate">{c.label}</p>
                  <p className="text-xs text-muted-foreground truncate">{c.text}</p>
                </div>
                <Button asChild size="icon" variant="ghost" className="h-8 w-8 flex-shrink-0">
                  <a href={c.url} download={`${c.label}.mp3`} title="Download MP3">
                    <Download className="w-4 h-4" />
                  </a>
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeClip(c.id)}
                  className="h-8 w-8 flex-shrink-0"
                  title="Remove from session"
                >
                  <Trash2 className="w-4 h-4 text-muted-foreground" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <GuestCouponPanel />
    </section>
  );
}

// ─── Guest Coupon Panel ───────────────────────────────────────────────────

function GuestCouponPanel() {
  const [coupon, setCoupon] = useState("MOON-GUEST");
  const [reportPath, setReportPath] = useState("/lunar-reports");

  const url = typeof window !== "undefined"
    ? `${window.location.origin}${reportPath}${reportPath.includes("?") ? "&" : "?"}coupon=${encodeURIComponent(coupon)}`
    : "";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Guest link copied.");
    } catch {
      toast.error("Couldn't copy — select and copy manually.");
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-border/40">
      <div className="flex items-center gap-2 mb-3">
        <Gift className="w-4 h-4 text-gold" />
        <h3 className="text-sm font-light tracking-wide">
          Guest coupon link
          <span className="ml-2 text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
            Free narration for anyone with the URL
          </span>
        </h3>
      </div>
      <p className="text-xs text-muted-foreground mb-4 max-w-2xl">
        Share this URL with a guest. When they open the report, the narration
        add-on auto-claims via the coupon — no checkout. Default code{" "}
        <code className="px-1 py-0.5 bg-muted/40 rounded text-[10px]">MOON-GUEST</code>{" "}
        is built in. Add more in the <code>NARRATION_COUPONS</code> server secret
        (comma-separated).
      </p>

      <div className="grid md:grid-cols-2 gap-3 mb-3">
        <div>
          <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Coupon code
          </Label>
          <Input
            value={coupon}
            onChange={(e) => setCoupon(e.target.value.toUpperCase())}
            className="mt-1.5 bg-background"
          />
        </div>
        <div>
          <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Report path
          </Label>
          <Input
            value={reportPath}
            onChange={(e) => setReportPath(e.target.value)}
            placeholder="/lunar-reports, /quantumelodic, /cazimi…"
            className="mt-1.5 bg-background"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Input value={url} readOnly className="bg-background text-xs font-mono" />
        <Button onClick={copy} variant="outline" size="sm" className="flex-shrink-0">
          <Copy className="w-3.5 h-3.5" /> Copy
        </Button>
      </div>
    </div>
  );
}
