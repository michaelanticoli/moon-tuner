# Digital Smudging × Life Gyre integration

This package inserts the interactive Life Gyre into the existing Moontuner Digital Smudging ritual.

## Revised ritual architecture

0. Threshold — `SmudgingHero`
1. Name the noise — `SageScan`
2. Move the noise — `LifeGyreChamber`
3. Release attachment — `CordCutting`
4. Rest without input — `TheVoid`
5. Establish boundaries — `Wards`
6. Re-enter intentionally — `LunarSync`

The key change is conceptual as much as technical: the user-selected items from `SageScan` become the language circulating inside the gyre. The user must create and sustain a meaningful amount of open space before proceeding.

## Files

- `DigitalSmudging.tsx` — revised page orchestration with six active chambers.
- `components/smudging/LifeGyre.tsx` — Three.js particle engine with a clarity callback.
- `components/smudging/LifeGyreChamber.tsx` — ritual wrapper, threshold logic, copy, and completion state.
- `components/smudging/life-gyre.css` — particle-field styling.
- `components/smudging/life-gyre-chamber.css` — chamber layout and transition styling.

## Install

```bash
npm install three framer-motion
npm install -D @types/three
```

Copy the files into the matching paths in your project. The supplied imports assume the same `@/components/...` alias already used in the original page.

## Completion rule

The next chamber does not unlock from a single swipe. The user must:

- reach at least 68% Open Space; and
- sustain it for approximately 1.8 seconds.

Change `CLEAR_THRESHOLD` and `HOLD_DURATION_MS` in `LifeGyreChamber.tsx` to tune this.

## Important product choice

The Life Gyre does not permanently delete the selected burdens. Cleared space gradually closes again. This preserves the framework's central truth: the practice is not erasure, but changing the conditions under which attention meets obligation.

## Recommended next build

Add a lightweight Web Audio bowl layer whose tone responds to press duration and cursor velocity. Keep it opt-in and initialize audio only after a direct user gesture.
