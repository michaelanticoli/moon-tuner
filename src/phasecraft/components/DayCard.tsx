import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight, CalendarDays, Grid3X3, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { FavoriteButton } from './FavoriteButton';
import { NotesEditor } from './NotesEditor';
import { MoonPhaseIcon } from './icons/MoonPhaseIcon';
import { ZodiacIcon } from './icons/ZodiacIcon';
import {
  PHASE_PRACTICE,
  SIGNATURES,
  getDecan,
  oppositeRow,
  pagePrompt,
  signColoring,
  signaturePath,
  type Signature,
} from '@/phasecraft/data/signatures';
import { ZODIAC_SIGNS } from '@/phasecraft/data/moontuner';
import { getFactsForPhase } from '@/phasecraft/data/lunarScience';

/**
 * One of the ninety-six signatures, laid out as the book teaches you to read
 * it (PHASECRAFT, Chapter 19, "How to Read a Signature"): hear the tone,
 * taste the palette, hold the anchor, meet the figure, then choose one act.
 * Everything shown here is text from the book; nothing is generated.
 */

interface SignatureCardProps {
  sig: Signature;
  isFavorite: boolean;
  act: string;
  onToggleFavorite: () => void;
  onActChange: (act: string) => void;
  /** Today's view passes the Moon's decan (1–3) so the decan card can show. */
  decan?: number;
  showNav?: boolean;
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <li className="grid grid-cols-[1.75rem,1fr] gap-3">
      <span className="font-serif text-lg leading-none text-accent pt-0.5" aria-hidden="true">
        {n}
      </span>
      <div className="space-y-1.5">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{title}</h3>
        <div className="text-sm leading-relaxed text-foreground">{children}</div>
      </div>
    </li>
  );
}

export function DayCard({
  sig,
  isFavorite,
  act,
  onToggleFavorite,
  onActChange,
  decan,
  showNav = true,
}: SignatureCardProps) {
  const practice = PHASE_PRACTICE[sig.column - 1];
  const prev = SIGNATURES[(sig.day - 2 + 96) % 96];
  const next = SIGNATURES[sig.day % 96];
  const coloring = signColoring(sig.row, sig.column);
  const prompt = pagePrompt(sig.row, sig.column);
  const decanInfo = decan ? getDecan(sig.row, decan) : null;
  const opposite = ZODIAC_SIGNS[oppositeRow(sig.row) - 1];
  const facts = getFactsForPhase(sig.column);
  const codeLabel = decanInfo ? `${sig.code}·${decanInfo.numeral}` : sig.code;

  const handleShare = async () => {
    const url = `${window.location.origin}${signaturePath(sig)}`;
    const text = `${sig.code} · ${sig.name} — ${sig.sensory}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${sig.name} · Phasecraft`, text, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast('Link copied');
    } catch {
      /* share sheet dismissed */
    }
  };

  const iconBtn =
    'inline-flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent';

  return (
    <div className="space-y-6">
      {showNav && (
        <nav className="flex items-center justify-between" aria-label="Signature navigation">
          <Link to={signaturePath(prev)} className={iconBtn} aria-label={`Previous: ${prev.code} ${prev.name}`}>
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div className="flex gap-1">
            <Link to="/phasecraft/calendar" className={iconBtn} aria-label="Lunar calendar">
              <CalendarDays className="h-4 w-4" />
            </Link>
            <Link to="/phasecraft/matrix" className={iconBtn} aria-label="The 96 matrix">
              <Grid3X3 className="h-4 w-4" />
            </Link>
            <button type="button" onClick={handleShare} className={iconBtn} aria-label="Share this signature">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
          <Link to={signaturePath(next)} className={iconBtn} aria-label={`Next: ${next.code} ${next.name}`}>
            <ChevronRight className="h-5 w-5" />
          </Link>
        </nav>
      )}

      <Card>
        <CardContent className="space-y-6 p-6 sm:p-8">
          {/* ── Name and number ─────────────────────────────── */}
          <header className="flex items-start gap-3">
            <div className="flex shrink-0 items-center gap-2 pt-1">
              <ZodiacIcon sign={sig.row} size={28} className="text-foreground" />
              <MoonPhaseIcon phase={sig.column} size={28} className="text-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-medium tracking-[0.18em] text-accent">
                <span className="uppercase">Signature</span> {codeLabel}
              </p>
              <h2 className="font-serif text-2xl leading-tight text-foreground sm:text-3xl">{sig.name}</h2>
            </div>
          </header>

          {/* ── The sensory signature, in its three movements ─ */}
          <p className="font-serif text-lg italic leading-relaxed text-foreground/90">
            <span className="text-accent">{sig.palette}</span> — {sig.tone} — {sig.anchor}
          </p>

          {/* ── The poetic effect ───────────────────────────── */}
          <blockquote className="rounded-lg border border-border/60 bg-muted/30 p-4 sm:p-5">
            <p className="text-[15px] leading-relaxed">{sig.figure}</p>
          </blockquote>

          {/* ── Reading the signature (Chapter 19) ──────────── */}
          <section aria-labelledby={`read-${sig.code}`} className="space-y-4 border-t border-border/50 pt-6">
            <h2 id={`read-${sig.code}`} className="font-serif text-xl text-foreground">
              Reading the signature
            </h2>
            <ol className="space-y-5">
              <Step n={1} title="Hear the tone">
                <p>
                  <span className="font-medium">{sig.tone}</span> — the {sig.phase.name} is a moment for{' '}
                  {practice.work}.{' '}
                  <span className="text-muted-foreground">{sig.phase.keywords.join(' · ')}</span>
                </p>
              </Step>
              <Step n={2} title="Taste the palette">
                <p>
                  <span className="font-medium">{sig.palette}</span>, the palette of {sig.sign.name}.{' '}
                  <span className="text-muted-foreground">
                    {sig.sign.element} · {sig.sign.modality} · ruled by {sig.sign.ruler} ·{' '}
                    {sig.sign.keywords.join(' · ')}
                  </span>
                </p>
                <p className="mt-2 text-muted-foreground">{coloring}</p>
              </Step>
              <Step n={3} title="Hold the anchor">
                <p className="italic">{sig.anchor}</p>
                <p className="mt-1 text-muted-foreground">
                  Close your eyes and picture it for thirty seconds. This is the image you carry through the day.
                </p>
              </Step>
              <Step n={4} title="Meet the figure">
                <p>Where is she in my life right now? What would it look like to be her today?</p>
              </Step>
              {decanInfo && (
                <Step n={5} title={`The decan · ${decanInfo.degrees} ${sig.sign.name}`}>
                  <p>
                    <span className="font-medium">{decanInfo.card}</span>, the Golden Dawn&rsquo;s Lord of{' '}
                    {decanInfo.title}, ruled by {decanInfo.ruler}.
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    Read it as the particular weather of the day within the signature: the situation, the challenge, or
                    the gift the moment brings into focus.
                  </p>
                </Step>
              )}
              <Step n={decanInfo ? 6 : 5} title="Choose one act">
                <p className="text-muted-foreground">
                  Decide on one action, however small, that answers the signature. Do it before the day ends.
                </p>
                <div className="mt-3">
                  <NotesEditor
                    value={act}
                    onChange={onActChange}
                    label={`Your act for ${sig.code}`}
                    placeholder={`One act that answers ${sig.code}. In the evening, add a line on how the day matched or did not match it.`}
                  />
                </div>
              </Step>
            </ol>
          </section>

          {/* ── The page ────────────────────────────────────── */}
          <section className="rounded-lg border border-accent/30 bg-accent/[0.04] p-4 sm:p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">For the journal</p>
            <p className="mt-2 font-serif text-lg leading-snug text-foreground">{prompt}</p>
          </section>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-5">
            <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} />
            <p className="text-xs text-muted-foreground">
              <Link to="/book" className="underline underline-offset-4 hover:text-foreground">
                PHASECRAFT
              </Link>{' '}
              · Chapter {practice.chapter} · Appendix A, {sig.code}
            </p>
          </div>

          {(facts.length > 0 || sig.column === 5) && (
            <details className="group border-t border-border/50 pt-4">
              <summary className="cursor-pointer select-none text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                The sky behind it
              </summary>
              <ul className="mt-3 space-y-2">
                {sig.column === 5 && (
                  <li className="border-l-2 border-muted pl-3 text-xs leading-relaxed text-muted-foreground">
                    The Full Moon stands opposite the Sun, so a Full Moon in {sig.sign.name} comes when the Sun is in{' '}
                    {opposite.name}.
                  </li>
                )}
                {facts.map((fact) => (
                  <li key={fact.id} className="border-l-2 border-muted pl-3 text-xs leading-relaxed text-muted-foreground">
                    {fact.text}
                  </li>
                ))}
              </ul>
            </details>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export { DayCard as SignatureCard };
