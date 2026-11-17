# Moontuner — Editorial Edition (`/editorial`)

A monochrome, single-page edition of moontuner.xyz in a stark Swedish
editorial style. It started as a "Moontuner Press" concept and was then
re-cut to carry Moontuner's real content and link to its real tools.

- **Path:** `/editorial` (`/press` redirects here)
- **Status:** Draft, a candidate to replace `/`

## Sections and where their words come from

| Section | Content | Source of truth |
| --- | --- | --- |
| Nav | "Moontuner", **live Moon** (phase · sign), Index | `src/phasecraft/lib/moon.ts` |
| Hero | Wordmark, "Lunar Alignment System", 8 / 12 / 96, live link to tonight's signature | `llms.txt`, live engine |
| The System (black) | Positioning and six principles | `public/llms.txt`, `src/pages/Manifesto.tsx` |
| Four Doors | Learn / Practice / Hear / Time | `DOORS` in `src/data/siteNav.ts` |
| Seven Declarations | Titles and essences | `src/pages/Manifesto.tsx` |
| Index of Tools | 18 entries, filterable by door, each linking to its tool | `NAV_GROUPS` in `src/data/siteNav.ts` |
| Footer | Start Here, Manifesto, About, Privacy, Terms, Contact | — |

All copy for this page is in **`src/components/editorial/editorialData.ts`**.
It is a curated copy of the sources above, so if a door's description or a
manifesto line changes, update it there too.

## Files

- `src/pages/Editorial.tsx`: composes the page, SEO, skip link, white body
- `src/components/editorial/Ed*.tsx`: one component per section
- `src/components/editorial/useLiveMoon.ts`: phase, sign and signature number (1–96), refreshed every 10 min
- `src/components/editorial/editorial.css`: scoped `.ed` styles
- `src/components/editorial/Reveal.tsx`: scroll reveal, off under reduced motion

## Common edits

- **Add a tool:** add a row to `ED_TOOLS` with a route that exists in `src/App.tsx`.
- **Make it the homepage:** in `src/App.tsx`, change `<Route path="/" …>` to
  `element={<Editorial />}`, and keep the current landing reachable at
  another path.

## Gotchas (already handled)

1. The global `h2`–`h6` serif and `tracking-tight` are reset inside `.ed`.
   Label headings carry explicit `text-[…]` and `tracking-[…]` utilities.
2. `.ed-label` and `.ed-display` use `:where()` (zero specificity), so
   Tailwind utilities always win.
3. Framer's `scale` overrides Tailwind translate, so the hero circles are
   centred by a wrapper element.
4. The global `scroll-padding-top` is cleared via `html:has(.ed)`.
5. The floating Report Launcher is hidden on `/editorial`.

## QA (2026-11-17)

- [x] 1440, 820 and 390 px widths: no horizontal scroll, no console errors
- [x] All 24 internal links open live pages (none 404 or "coming soon")
- [x] `/press` redirects to `/editorial`
- [x] Live Moon reads correctly (First Quarter · Aquarius, signature 83/96)
- [x] Index filters work, with a live count announced to screen readers
- [x] Door tiles invert on hover and keyboard focus, with no layout shift
- [x] Build and lint pass on the new files
