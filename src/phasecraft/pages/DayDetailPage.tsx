import { Link, Navigate, useParams } from 'react-router-dom';
import { DayCard } from '@/phasecraft/components/DayCard';
import { useAppStore } from '@/phasecraft/store/useAppStore';
import { getSignature, getSignatureByCode, signaturePath } from '@/phasecraft/data/signatures';
import { SEOHead } from '@/components/SEOHead';

/** /phasecraft/signature/:code — one signature by its matrix number, e.g. 10-2. */
export default function DayDetailPage() {
  const { code = '' } = useParams<{ code: string }>();
  const { favorites, notes, toggleFavorite, setNote } = useAppStore();
  const sig = getSignatureByCode(code);

  if (!sig) {
    return (
      <div className="space-y-4 py-16 text-center">
        <p className="text-muted-foreground">
          There is no signature {code}. Matrix numbers run from 1-1 (New Moon in Aries) to 12-8 (Waning Crescent in
          Pisces).
        </p>
        <Link to="/phasecraft/matrix" className="text-accent underline underline-offset-4">
          Open the 96 matrix
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${sig.code} · ${sig.name} — Phasecraft Signature | Moontuner`}
        description={`${sig.sensory}. ${sig.figure}`}
        canonical={signaturePath(sig)}
        keywords={['phasecraft', sig.phase.name.toLowerCase(), `moon in ${sig.sign.name.toLowerCase()}`, sig.name.toLowerCase()]}
      />
      <DayCard
        sig={sig}
        isFavorite={!!favorites[sig.day]}
        act={notes[sig.day] || ''}
        onToggleFavorite={() => toggleFavorite(sig.day)}
        onActChange={(n) => setNote(sig.day, n)}
      />
    </>
  );
}

/** Old links (/phasecraft/effect/74) keep working by redirecting to the matrix number. */
export function LegacyEffectRedirect() {
  const { day = '' } = useParams<{ day: string }>();
  const sig = getSignature(Number(day));
  return <Navigate to={sig ? signaturePath(sig) : '/phasecraft'} replace />;
}
