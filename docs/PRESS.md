# Moontuner Press — `/press`

A single-page, monochrome editorial site for **Moontuner Press**, built inside
the existing app as a draft route so it can be reviewed without touching the
current homepage.

- **Live path:** `https://moontuner.xyz/press` (after deploy)
- **Status:** Draft, a candidate to replace `/`

## Files

| File | Role |
| --- | --- |
| `src/pages/Press.tsx` | Composes the page, SEO/JSON-LD, skip link, paints body white |
| `src/components/press/pressData.ts` | **All copy and the Index of Works.** Edit wording here |
| `src/components/press/press.css` | Scoped styles (`.press`), Inter weights, label/display type |
| `src/components/press/Reveal.tsx` | Fade-in reveal on scroll; turned off for reduced motion |
| `PressNavbar` / `PressHero` / `PressMission` / `PressFocus` / `PressPublications` / `PressFooter` | One component per section |

Logo assets are used as supplied: `src/assets/moontuner-wordmark.png` (hero)
and `src/assets/moontuner-mark.jpeg` (footer). They are never redrawn. A
`mix-blend-mode: multiply` lets the hero geometry show through the white
background without changing the artwork.

## Common edits

- **Add or rename a work:** add a row to `PRESS_WORKS` in `pressData.ts`.
  Status must be `Proprietary`, `Restricted` or `Sealed`. Never add links or
  downloads; the catalogue is informational only.
- **Change contact email:** `PRESS_CONTACT_EMAIL` in `pressData.ts`.
- **Make it the homepage:** in `src/App.tsx`, change
  `<Route path="/" element={<SpiralLanding />} />` to `element={<Press />}`.
  Keep the old landing reachable (for example at `/home`), because
  `/start`, `/book` and app links point into it.

## Gotchas found during the build (and how they were fixed)

1. **Global serif on headings.** `index.css` gives every `h2`–`h6` the serif
   face and `tracking-tight`. Inside `.press`, the font is reset with a
   `:where()` rule. Headings that use `.press-label` also carry an explicit
   `tracking-[…]` and `text-[…]` utility.
2. **Helper classes vs Tailwind.** `.press-label` and `.press-display` are
   wrapped in `:where()`, which gives them zero specificity, so Tailwind
   utilities on the same element always win.
3. **Framer Motion overrides `transform`.** An animated `scale` wipes out
   Tailwind's `-translate-x-1/2`. Centring therefore lives on a wrapper
   `div`, and only the inner SVG animates.
4. **Global `scroll-padding-top: 76px`** (meant for the main app's nav) threw
   off the `#index` anchor. While the press is mounted, it is cleared with
   `html:has(.press)`.
5. The floating **Report Launcher** is hidden on `/press` (`HIDE_ON` in
   `ReportLauncher.tsx`).

## QA checklist (verified 2026-11-17)

- [x] 1440, 820 and 390 px widths: no horizontal scroll, no console errors
- [x] "Index" link lands the catalogue just below the nav bar
- [x] Focus tiles invert on hover without any layout shift
- [x] Index contains zero links
- [x] Imprint opens and closes, with `aria-expanded`
- [x] Reduced-motion: content shows with no movement
- [x] Single `h1` with the accessible name "Moontuner Press"; skip link present
- [x] `npm run build` and ESLint pass on the new files
