import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, X, Copy, Check } from "lucide-react";
import { MoonPhaseGlyph } from "@/components/MoonPhaseGlyph";

interface DirectiveShareCardProps {
  phaseName: string;
  phaseKey:
    | "new"
    | "waxing-crescent"
    | "first-quarter"
    | "waxing-gibbous"
    | "full"
    | "waning-gibbous"
    | "last-quarter"
    | "waning-crescent";
  directiveState: string;
  emotionalWeather: string;
  guidance: string;
  date: string;
}

// ─── Share card visual ─────────────────────────────────────────────────────────
// Rendered in the modal so users can screenshot it.

function ShareCard({
  phaseName,
  phaseKey,
  directiveState,
  emotionalWeather,
  guidance,
  date,
  cardRef,
}: DirectiveShareCardProps & { cardRef: React.RefObject<HTMLDivElement> }) {
  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-2xl"
      style={{
        background: "hsl(22 12% 7%)",
        border: "1px solid hsl(22 12% 16%)",
        width: "100%",
        maxWidth: 480,
        padding: "40px",
        fontFamily: "var(--font-serif, Georgia, serif)",
      }}
    >
      {/* Ambient orb */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "240px",
          height: "240px",
          borderRadius: "50%",
          background: "hsl(38 90% 58% / 0.07)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Moon glyph watermark */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-20px",
          right: "-20px",
          opacity: 0.04,
          pointerEvents: "none",
        }}
      >
        <MoonPhaseGlyph phase={phaseKey} size="lg" className="w-40 h-40" />
      </div>

      <div style={{ position: "relative" }}>
        {/* Wordmark */}
        <p
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "hsl(38 90% 58% / 0.5)",
            marginBottom: "28px",
            fontFamily: "var(--font-sans, system-ui, sans-serif)",
          }}
        >
          Moontuner · moontuner.xyz
        </p>

        {/* Phase + date */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "24px",
          }}
        >
          <MoonPhaseGlyph phase={phaseKey} size="sm" className="w-6 h-6" />
          <p
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "hsl(40 12% 44%)",
              fontFamily: "var(--font-sans, system-ui, sans-serif)",
            }}
          >
            {phaseName} · {date}
          </p>
        </div>

        {/* Directive state */}
        <p
          style={{
            fontSize: "clamp(3rem, 8vw, 4.5rem)",
            lineHeight: "0.95",
            color: "hsl(38 90% 62%)",
            marginBottom: "8px",
          }}
        >
          {directiveState}
          <span style={{ color: "hsl(38 90% 58%)" }}>.</span>
        </p>

        {/* Emotional weather */}
        <p
          style={{
            fontSize: "0.85rem",
            fontStyle: "italic",
            color: "hsl(40 14% 60%)",
            marginBottom: "24px",
          }}
        >
          {emotionalWeather}
        </p>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "hsl(22 12% 18%)",
            marginBottom: "24px",
            maxWidth: "80px",
          }}
        />

        {/* Guidance */}
        <p
          style={{
            fontSize: "1rem",
            lineHeight: "1.55",
            color: "hsl(40 18% 76%)",
            fontStyle: "italic",
            maxWidth: "360px",
          }}
        >
          &ldquo;{guidance}&rdquo;
        </p>
      </div>
    </div>
  );
}

// ─── Share modal ───────────────────────────────────────────────────────────────

function ShareModal({
  onClose,
  ...props
}: DirectiveShareCardProps & { onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const shareText = `Today's Directive: ${props.directiveState}. ${props.guidance} — moontuner.xyz`;

  const handleCopyText = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  }, [shareText]);

  const handleNativeShare = useCallback(async () => {
    if (!navigator.share) return;
    try {
      await navigator.share({
        title: `Today's Directive: ${props.directiveState}`,
        text: props.guidance,
        url: "https://moontuner.xyz",
      });
    } catch {
      // User cancelled or share failed
    }
  }, [props.directiveState, props.guidance]);

  const hasNativeShare =
    typeof navigator !== "undefined" && !!navigator.share;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "hsl(22 12% 4% / 0.92)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        className="w-full max-w-[520px] rounded-2xl p-7"
        style={{
          background: "hsl(22 12% 8%)",
          border: "1px solid hsl(22 12% 18%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between mb-6">
          <p
            className="text-[0.6rem] tracking-[0.28em] uppercase"
            style={{ color: "hsl(40 12% 40%)" }}
          >
            Share Today&rsquo;s Directive
          </p>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded transition-colors duration-200"
            style={{ color: "hsl(40 12% 44%)" }}
            aria-label="Close share modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Card preview */}
        <div className="mb-6 flex justify-center">
          <ShareCard {...props} cardRef={cardRef} />
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleCopyText}
            className="flex items-center gap-3 px-4 py-3 rounded-lg border text-sm transition-all duration-200 font-sans text-left"
            style={{
              background: "hsl(22 12% 11%)",
              borderColor: "hsl(22 12% 20%)",
              color: "hsl(40 18% 72%)",
            }}
          >
            {copied ? (
              <Check
                className="w-4 h-4 shrink-0"
                style={{ color: "hsl(38 90% 58%)" }}
              />
            ) : (
              <Copy
                className="w-4 h-4 shrink-0"
                style={{ color: "hsl(40 12% 44%)" }}
              />
            )}
            <span>
              {copied ? "Copied to clipboard" : "Copy directive text"}
            </span>
          </button>

          {hasNativeShare && (
            <button
              onClick={handleNativeShare}
              className="flex items-center gap-3 px-4 py-3 rounded-lg border text-sm transition-all duration-200 font-sans text-left"
              style={{
                background: "hsl(22 12% 11%)",
                borderColor: "hsl(22 12% 20%)",
                color: "hsl(40 18% 72%)",
              }}
            >
              <Share2
                className="w-4 h-4 shrink-0"
                style={{ color: "hsl(40 12% 44%)" }}
              />
              <span>Share via&hellip;</span>
            </button>
          )}
        </div>

        <p
          className="mt-5 text-[0.6rem] leading-relaxed text-center"
          style={{ color: "hsl(40 12% 30%)" }}
        >
          Sharing today&rsquo;s directive at moontuner.xyz
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── Public trigger button ────────────────────────────────────────────────────

export function DirectiveShareCard(props: DirectiveShareCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.18em] uppercase px-4 py-2.5 rounded-sm border transition-all duration-200 font-sans"
        style={{
          color: "hsl(40 12% 48%)",
          borderColor: "hsl(22 12% 20%)",
          background: "transparent",
        }}
        aria-label="Share today's directive"
      >
        <Share2 className="w-3.5 h-3.5" />
        Share
      </button>

      <AnimatePresence>
        {open && (
          <ShareModal {...props} onClose={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
