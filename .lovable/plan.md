## Ship the "Spiral" landing page

Drop in your uploaded `SpiralLanding-2.tsx` as the new homepage, add a Dusk-palette variant of the live lunar status, and keep the current landing accessible at `/classic`.

### Files

**Create `src/pages/SpiralLanding.tsx`**
- Ported from `user-uploads://SpiralLanding-2.tsx` (no changes).
- Replaces the imported `LunarLiveStatus` with the new Dusk-palette `DuskLiveStatus` so the "Sky, Right Now" section blends into the dusk surfaces around it.

**Create `src/components/dusk/DuskLiveStatus.tsx`**
- New, self-contained component. Reads the exact same fields from `useMoonPhase()` as `LunarLiveStatus` (`astrological.phaseName / energy / theme / quality / frequencyHz`, `astronomical.moonSign / hoursInSign`).
- Renders in the Dusk palette: `dusk-surface` shell, hairline dividers, ivory/gold typography, `dusk-serif` headings, mono eyebrow labels, `ZodiacGlyph` tinted with a subtle gold accent. Same live "pulse" dot in gold instead of teal.
- Preserves the four-stat grid (Phase / Transit / Energy / Time Remaining) and three-panel detail row (Phase Theme + Hz / Zodiac Influence / Body Activation), matched to the surrounding sections' rhythm.
- The shared `LunarLiveStatus` used elsewhere is left untouched.

**Edit `src/App.tsx`**
- Add `const SpiralLanding = lazy(() => import("./pages/SpiralLanding"));` next to the other lazy imports.
- Change route `/` to render `<SpiralLanding />`.
- Add a new route `/classic` rendering the existing `<Index />` so the previous homepage is still reachable.

### SEO
`SpiralLanding` already sets `<SEOHead title="Moontuner — You're Not Behind. You're On a Spiral." … canonical="/" jsonLd={websiteSchema()} />`, so canonical + title/description update automatically when it becomes `/`.

### Not doing (unless you ask)
- No edits to the shared `LunarLiveStatus` (still used on other pages).
- No changes to `DuskHero` / `TodaysDirective` / `HarmonicProfileTeaser` (still rendered by `/classic`).
- No new dependencies.

### Verify after build
- `/` shows the spiral hero, then the Dusk-styled "Sky, Right Now" card with live phase/sign/Hz.
- `/classic` still renders the previous homepage.
- Nav links to `/method`, `/phasecraft`, `/lunar-cipher`, etc. still work.
