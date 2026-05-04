// Light natal overlay strip for the Cipher day-detail modal. Shows natal
// luminaries (Sun/Moon/ASC) + active transit aspects on the selected date.
// Falls back to a soft prompt when birth data isn't present yet.
import { useEffect, useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { useSharedBirth } from "@/hooks/useSharedBirth";
import {
  computeNatalLuminaries,
  computeTransitsForDate,
  readCachedLuminaries,
  type AspectHit,
  type NatalLuminaries,
} from "@/lib/natalOverlay";

interface Props {
  date: Date;
  onPromptBirth?: () => void;
}

export function NatalOverlayBadges({ date, onPromptBirth }: Props) {
  const { birth } = useSharedBirth();
  const [natal, setNatal] = useState<NatalLuminaries | null>(() => readCachedLuminaries());
  const [loading, setLoading] = useState(false);

  const hasBirth = Boolean(birth.date && birth.time && birth.location);

  useEffect(() => {
    if (!hasBirth) return;
    if (natal) return;
    setLoading(true);
    computeNatalLuminaries(birth)
      .then((data) => setNatal(data))
      .finally(() => setLoading(false));
  }, [hasBirth, birth, natal]);

  if (!hasBirth) {
    return (
      <div className="mt-6 border-t border-border pt-4">
        <button
          onClick={onPromptBirth}
          className="w-full text-left bg-accent/5 hover:bg-accent/10 border border-accent/20 rounded-2xl p-4 transition-colors group"
        >
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-[9px] uppercase tracking-widest text-accent font-bold">
              Personalize this reading
            </span>
          </div>
          <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
            Add your birth details to see how today's Sun & Moon contact your natal chart.
          </p>
        </button>
      </div>
    );
  }

  if (loading || !natal) {
    return (
      <div className="mt-6 border-t border-border pt-4 flex items-center gap-2 text-[10px] text-muted-foreground">
        <Loader2 className="w-3 h-3 animate-spin" />
        Computing natal overlay…
      </div>
    );
  }

  const hits = computeTransitsForDate(date, natal);

  return (
    <div className="mt-6 border-t border-border pt-4">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-3.5 h-3.5 text-accent" />
        <h4 className="text-[9px] uppercase tracking-widest text-accent font-bold">
          Your Natal Overlay
        </h4>
      </div>

      {/* Natal luminaries strip */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <NatalChip label="Sun" glyph="☉" sign={natal.sunSign} />
        <NatalChip label="Moon" glyph="☽" sign={natal.moonSign} />
        <NatalChip label="ASC" glyph="AC" sign={natal.ascSign} />
      </div>

      {/* Transit aspects today */}
      {hits.length === 0 ? (
        <p className="text-[11px] text-muted-foreground italic">
          No tight Sun/Moon contacts to your natal luminaries today.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {hits.map((h, i) => (
            <AspectBadge key={i} hit={h} />
          ))}
        </div>
      )}
    </div>
  );
}

function NatalChip({ label, glyph, sign }: { label: string; glyph: string; sign: string }) {
  return (
    <div className="bg-muted/30 border border-border rounded-xl p-2.5">
      <span className="text-[8px] uppercase tracking-widest text-muted-foreground block">
        Natal {label}
      </span>
      <span className="text-xs font-bold text-foreground">
        {glyph} {sign}
      </span>
    </div>
  );
}

function AspectBadge({ hit }: { hit: AspectHit }) {
  const tone =
    hit.aspect === "conjunction" || hit.aspect === "trine"
      ? "border-accent/40 bg-accent/5 text-accent"
      : hit.aspect === "square" || hit.aspect === "opposition"
        ? "border-amber-400/40 bg-amber-400/5 text-amber-300"
        : "border-border bg-muted/20 text-foreground";
  return (
    <span
      className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full border ${tone}`}
      title={`${hit.transit} ${hit.aspect} natal ${hit.natal} (orb ${hit.orb}°)`}
    >
      {hit.label} <span className="opacity-60 normal-case ml-1">{hit.orb}°</span>
    </span>
  );
}
