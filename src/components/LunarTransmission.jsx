// src/components/LunarTransmission.jsx

const LUNATIONS = [
  { date: '2026-04-17', label: 'Aries New Moon', no: 1, spotifyId: null },
  // After LANDR delivers: replace null with the track ID string
  // e.g. spotifyId: '4uLU6hMCjMI75M1A2tKUQC'
]

export default function LunarTransmission() {
  const today = new Date().toISOString().slice(0, 10)
  const match = LUNATIONS.find(l => l.date === today && l.spotifyId)
  if (!match) return null

  return (
    <section className="px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-card border border-accent/25 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
          <p className="text-[10px] tracking-[0.22em] uppercase text-accent mb-1">
            Lunar Transmission No. {String(match.no).padStart(2, '0')}
          </p>
          <h3 className="font-serif text-lg font-light mb-4 text-foreground">
            {match.label}
          </h3>
          <iframe
            style={{ borderRadius: '8px' }}
            src={`https://open.spotify.com/embed/track/${match.spotifyId}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title={`Lunar Transmission — ${match.label}`}
          />
        </div>
      </div>
    </section>
  )
}