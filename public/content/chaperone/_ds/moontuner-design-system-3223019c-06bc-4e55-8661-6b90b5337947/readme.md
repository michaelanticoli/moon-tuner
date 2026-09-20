# Moontuner Design System

> _Astrology with agency. Less woo, more you._

The product-ready design language for **Moontuner** and its sibling ecosystem — a mystical-but-usable system for turning astrology, lunar timing, resonance, and symbolic frameworks into tools people can actually use for reflection, rhythm, and momentum.

This system is built to carry a whole family of related products under one voice: **Moontuner, Quantumelodies, Phasecraft, Lunar Cipher, Cazimi, Ikigai, Harmonic Arcana**, and future symbolic tools. It supports both **editorial / educational** experiences (essays, workbooks, reports, calendars) and **interactive product interfaces** (dashboards, live status, learning systems, paid tools).

---

## The brand in one breath

Moontuner is a lunar alignment system for tracking intention, energy, and momentum through the Moon's cycles. It is **reflective, not deterministic** — "we don't predict your fate, we help you align your frequency." The framework is built on the **8 lunar phases × 12 zodiac signs (96 configurations)**, paired with an astronomical engine (live phase, sign, void-of-course) and reflective tooling: daily directives, the 14-day Phasecraft arc, the Chaperone workbooks, and the Lunar Cipher ephemeris.

Feeling target: **mystical but usable, celestial but not cliché, poetic but product-ready — calm, luminous, ritualistic, precise, and trustworthy enough to monetize.**

---

## Sources (for whoever maintains this)

You may not have access to all of these, but they are the ground truth this system was built from:

- **GitHub — primary app:** [`michaelanticoli/moon-tuner`](https://github.com/michaelanticoli/moon-tuner) (Vite + React + TypeScript + Tailwind + shadcn-ui, deployed at [moontuner.xyz](https://moontuner.xyz)). Real token values were lifted verbatim from `src/index.css`, `src/design-system/tokens.ts`, and `src/design-system/themes.ts`. Explore this repo to build higher-fidelity Moontuner interfaces.
- **Related repos worth exploring** for the wider ecosystem: `quantumelodic-web-app`, `harmonic-arcana`, `lunar-workbook-generator`, `quant-cal2026` (Astroquantum Calendar), `moontuner-calendar`, `simple-lunatic`. All under the same owner.
- **Uploaded brand assets:** the MoonKey logo + icon, the manifesto poster ("Where self-awareness finds its rhythm"), a motif collage, and ~24 riso-print lunar illustrations. Copied into `assets/`.

> Reader: explore `michaelanticoli/moon-tuner` (and the sibling repos above) directly to design with more fidelity than this snapshot captures.

---

## CONTENT FUNDAMENTALS — how Moontuner writes

The voice is **declarative, grounded, and quietly confident** — an anti-woo counterweight to typical astrology copy. It respects the reader's intelligence and their skepticism.

- **Person / address:** Speaks to **"you"**, acts as **"we"**. Direct and second-person ("live your chart, not hide behind it"). Rarely first-person-singular.
- **Casing:** Sentence case for reading copy. **UPPERCASE with wide tracking** for eyebrows, system labels, and buttons (`PHASE-BASED LIVING SYSTEM`, `SYNC WITH THE CYCLE`). Headlines are sentence case, often with an *italic accent clause*.
- **Rhythm:** Short declarative lines. Em-dashes and deliberate line breaks. Antithesis is the signature move — "**Less fortune-telling. More frequency-tuning.**" / "**Less woo, more you.**" / "A system, not a vibe."
- **Register:** Confident, a little wry, never saccharine. Cosmic vocabulary (frequency, resonance, phase, tuning, alignment) used as *precise* metaphor, not decoration.
- **Signatures:** "Don't blame the moon. Change your tune." · "Astrology with agency." · "What key is your chart in?" · "Print your position in time."
- **Emoji:** **None.** Zodiac and moon-phase glyphs stand in for symbols where needed.
- **What to avoid:** Fortune-telling determinism, generic horoscope filler, hedge-y mysticism, exclamation-mark hype.

Example (from the manifesto): _"This is astrology for people who want to live their chart, not hide behind it. Accountable, embodied and resonant."_

---

## VISUAL FOUNDATIONS

Moontuner runs on **one anchor theme plus three named environments**. The anchor and app default is **Core**.

### Palette
- **Core (default / app):** _"A silent observatory at 2am."_ Near-black night (`0 0% 4%`), warm **lunar ivory** text (`40 20% 92%`), **teal signal** accent (`168 75% 45%`) reserved for live/interactive/status, **soft gold** secondary (`42 50% 58%`) for editorial warmth. Neutrals are warm (clay, taupe).
- **Digital Smudging:** warm charcoal + **amber ember** + sage. Candlelight and ritual clearing; used for breathwork / emotional-regulation tools.
- **Spacetime Printer:** **paper white + ink + signal blue**. A printed ephemeris; used for reports, charts, downloads, and print (see the Lunar Report template).
- **Riso brand accents:** the printmaking palette sampled from the illustration set — red, orange, gold, olive, teal, blue, magenta, violet on cream stock (`#efe7d3`). Used for editorial surfaces and **phase color-coding** (each of the 8 phases maps to a hue).

### Type
Six families, each with a job: **Inter** (display/hero, extralight 200, tracking −0.03em), **Playfair Display** (serif section headlines + italic accents), **Instrument Serif** (editorial pull-quotes & ritual numerals, italic), **DM Sans** (body), **Work Sans** (UI/buttons/eyebrows), **IBM Plex Mono** (data, coordinates, system readouts). The core headline gesture: extralight sans display **with an italic serif accent clause** in gold.

### Space, radius, elevation
Base-8 spacing. Radii run `sm 4px → md 8px (base) → lg 12px → xl 16px → 2xl 20px → full`. Cards use `xl`/`2xl`; buttons and pills are `full`. Shadows are soft and dark-field tuned; the signature elevation is a **teal or gold ambient glow** (`--glow-teal`, `--glow-gold`) rather than a hard drop shadow.

### Backgrounds & texture
Dark surfaces carry a very low-opacity **fractal grain** overlay (~0.02) and **phase-keyed radial "orb" glows** drifting slowly in a corner. Editorial/marketing surfaces use the **riso illustrations full-bleed or in tiled bands** on cream. No purple-blue AI gradients.

### Motion
Calm and contemplative. Fades and gentle rises (`translateY(14–20px)` + opacity) on `cubic-bezier(0.2,0.8,0.2,1)`, 0.6–1.1s. Ambient loops (orb breathe, drift) run 18–24s. Live indicators use a **ping pulse**. Nothing bounces; nothing is fast.

### Interaction states
- **Hover:** primary buttons shift ivory→gold; outline buttons invert (fill with foreground); cards light their **border teal** and add a faint teal glow.
- **Press:** subtle `scale(0.97)`.
- **Focus:** teal border + 3px teal ring at 12% alpha.
- **Touch targets:** minimum 44×44px.

### Cards, borders, transparency
Cards = `hsl(var(--card))` surface, 1px `--border` hairline, `xl` radius, generous 2rem padding, optional left **teal accent rule**. Nav and overlays use `backdrop-filter: blur(12–16px)` over a translucent night. Imagery skews **cool-to-warm duotone with visible grain** (teal/navy shadows, cream/orange highlights).

---

## ICONOGRAPHY

- **Logo — the MoonKey:** a crescent moon fused with a tuning-fork stem and radiating resonance arcs, resolving into a face/key mark. Full lockup `MOON [mark] TUNER` and standalone icon. On night it is inverted to ivory; on ivory it stays ink. Files in `assets/logos/`.
- **Moon-phase glyphs:** the primary icon system. Geometric SVG marks for all 8 phases, drawn from the source app (`MoonPhaseGlyph` component). Inherit `currentColor`; add a teal glow for "live". Unicode fallbacks exist (`☽ ◐ ○ ◑ ☾`) for inline text.
- **Zodiac glyphs:** the 12 sign symbols, color-coded by element (Fire/Earth/Air/Water) — see `Badge` elemental tones.
- **UI icons:** the source app uses **Lucide** (`Activity`, `MapPin`, `Zap`, `Clock`, `Sparkles`, `ArrowRight`). For new UI, use **Lucide from CDN** (`https://unpkg.com/lucide-static`) to match stroke weight — _substitution flagged: Lucide is linked from CDN, not vendored._
- **No emoji.** Symbolic meaning is carried by moon/zodiac glyphs and the riso motifs (atom, oscilloscope, zodiac wheel, Saturn, treble clef).

---

## Index / manifest

**Foundations**
- `styles.css` — the single entry point consumers link. `@import`s only.
- `tokens/fonts.css` · `tokens/colors.css` · `tokens/typography.css` · `tokens/spacing.css`
- `guidelines/*.card.html` — 17 foundation specimen cards (Colors, Type, Spacing, Brand).

**Components** (`window.MoontunerDesignSystem_322301.*`)
- `actions/` — **Button**, **IconButton**
- `forms/` — **Input**, **EmailCapture**
- `feedback/` — **Badge**, **LivePill**
- `layout/` — **Eyebrow**, **SectionHeading**, **Card**, **StatBlock**
- `lunar/` — **MoonPhaseGlyph**, **PhaseStrip**, **LunarStatusCard**

**UI Kit**
- `ui_kits/moontuner-web/` — interactive Core-theme recreation: Home → Today → The Lunar System → Method.

**Templates** (`.dc.html` starting points; each carries a `riso-paper` ⇄ `core-dark` toggle)
- `templates/lunar-report/` — printable one-page **Lunar Signature Report** (Spacetime Printer theme).
- `templates/lunar-calendar/` — printable **2026 Lunar Calendar**: a monthly spread driven by a real astronomical engine, with phase-coded principal days, that month's key lunations (real 2026 data), and the eight-phase legend.
- `templates/lunar-workbook/` — multi-page **Lunar Cycle Workbook** (Phasecraft): cover, new-moon intention spread with ruled prompts, the 14-day waxing arc checklist, and full-moon reflection.
- `templates/today-app/` — Moontuner mobile **Today** screen (Core dark): live `LunarStatusCard`, void-of-course readout, the day's directive, the 14-day `PhaseStrip`, next lunation, and quick actions.

**Assets**
- `assets/logos/` — MoonKey logo + icon. `assets/brand/` — manifesto poster, motif collage. `assets/illustrations/` — 24 riso lunar illustrations.

---

## Notes & substitutions

- **Fonts** load from **Google Fonts** via `tokens/fonts.css` (the source app vendored the same families via `@fontsource`). Consumers need network access; no font binaries are vendored. If you want offline/self-hosted fonts, drop the `.woff2` files in and swap `fonts.css` to `@font-face`.
- **Lucide** icons are referenced from CDN rather than vendored.
