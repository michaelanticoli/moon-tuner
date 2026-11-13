# Site navigation — how it's organized and how to change it

moontuner.xyz is organized around **four doors**, in the order a reader of
*PHASECRAFT: The Moontuner Method* meets them:

| Door | What the visitor does | Main page | Also in the menu |
|---|---|---|---|
| **Phasecraft** | Learn the 96 signatures | `/phasecraft` (tonight's signature) | `/phasecraft/matrix`, `/phasecraft/calendar`, `/school`, `/school/curriculum`, `/school/portal`, `/book` |
| **Lunar Chaperone** | Practice the cycle | `/lunar-chaperone` | `/program`, `/program/persona`, `/program/portal`, `/workbooks` |
| **Symphony** | Hear the birth chart | `/quantumelodic` (Astro-Harmonic Symphony) | `/harmonic-profile`, `/natal-harmonic` |
| **Reports** | Time the year | `/lunar-reports` (Personal Lunar Map) | `/cazimi`, `/lunar-cipher`, `/total-tuner` |

Everything else (Journal, Explore, Rites, Digital Smudging, Sessions, About…)
sits under **More** and in the footer.

## Front doors

- **`/book`** — the reader's page. This is the URL to print in the book and use
  in QR codes. `/reader` and `/readers` redirect here.
- **`/start`** — the same page with a general welcome, for everyone else. The
  nav's **Start Here** button goes here (signed-in visitors see **Dashboard**).

## Where to make changes

**One file controls every menu:** `src/data/siteNav.ts`

- `NAV_GROUPS` — the top navigation (desktop dropdowns and mobile menu)
- `DOORS` — the four door cards (homepage, `/start`, `/book`, 404, and the
  "Go deeper" row at the bottom of Phasecraft)
- `FOOTER_COLUMNS` — the footer links

Rename, reorder, add or remove a link there and every page updates. There is
no second menu to keep in sync: `DuskNav` now just renders the main
`Navigation`.

## Components

- `src/components/Navigation.tsx` — the nav bar. Hover opens a menu for mouse
  users; tap or Enter toggles it for touch and keyboard; Escape closes. The
  group that owns the current page gets a gold dot.
- `src/components/PathwayDoors.tsx` — the door cards (`variant="grid"`) and the
  compact row (`variant="strip"`, with `exclude` to hide the current door).
- `src/pages/StartHere.tsx` — `/start` and `/book`.
- `src/pages/NotFound.tsx` — 404 page that shows the four doors.

## Checklist when adding a new page

1. Add its route in `src/App.tsx`.
2. Add it to the right group in `NAV_GROUPS` (and `FOOTER_COLUMNS` if it's a
   main destination).
3. Add it to `public/sitemap.xml` and, if it's a main destination,
   `public/llms.txt`.

## Phasecraft: where the signature text lives

- `src/phasecraft/data/signatures.ts` builds the ninety-six from the book:
  tones, palettes, the "Through the Signs" line for each phase, the journal
  prompts, and the decan cards. Each signature has a page at
  `/phasecraft/signature/{sign}-{phase}` (e.g. `/phasecraft/signature/10-2`).
- The sensory signatures and poetic effects are in
  `src/phasecraft/data/moontuner.ts` (`FLAVOR_FUSIONS`, `FLAVOR_PROFILES`).
  They were checked word-for-word against Appendix A of the printed book
  (Nov 2026): 96 of 96 match. If the book text changes, change it there.
- Phases follow the book (Chapter 1): each phase begins at its exact angle
  from the Sun and lasts 45°. Live Moon data everywhere on the site is
  computed with astronomy-engine, so it keeps working in 2027 and beyond.
