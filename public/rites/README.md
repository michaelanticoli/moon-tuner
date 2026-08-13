# The Rites — MOONtuner Press

Launched, self-contained working documents. Each file here is a complete
standalone HTML build (embedded styles, no build step, no app dependency) and is
served directly at `/rites/<file>`.

| File | Volume | Route |
|---|---|---|
| `the-lens-rite.html` | Volume I — The Lens Rite | `/rites/the-lens-rite.html` |
| `the-arrival-rite.html` | Volume II — The Arrival Rite (standalone, embedded fonts) | `/rites/the-arrival-rite.html` |

The index page for the series lives in the app at `/rites` (`src/pages/Rites.tsx`).

## `_archive/`

Kept for comparison and as source material for future volumes — not linked as
launched pages:

- `the-arrival-rite-webfonts.html` — earlier build using Google Fonts links instead of embedded fonts. Lighter file, requires network at render time.
- `the-lens-rite.pdf` — dark-PDF export of Volume I (Playwright → Chromium, `print_background`, zero-margin `@page`).
- `moontuner-rite-roadmap.md` — the series framework: shared chassis, what must be reinvented per volume, and candidate volumes.

## Building a new volume

1. Copy the closest existing standalone HTML as the chassis.
2. Keep: `#080808` shell, gold/bronze/ink palette, Cormorant Garamond /
   Barlow Condensed / Karla, the station-cycle JS array with live "where do I
   start" phase calculation, autosaving worksheet fields, and one restrained
   plum/bruise accent on the station doing the real work.
3. Reinvent: station glyph, connecting spine texture, numbering convention,
   card texture, and entry-point framing — drawn from that volume's subject.
4. Embed fonts for the launched build; keep the webfont build in `_archive/`.
5. Drop the file in this folder and add an entry to the `rites` array in
   `src/pages/Rites.tsx`.
