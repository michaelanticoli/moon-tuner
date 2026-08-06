# Digital Smudging × Life Gyre integration

The interactive Life Gyre is integrated into the Moontuner Digital Smudging ritual at `src/pages/DigitalSmudging.tsx`.

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

- `../pages/DigitalSmudging.tsx` — page orchestration with six active chambers.
- `components/smudging/LifeGyre.tsx` — Three.js particle engine with a clarity callback.
- `components/smudging/LifeGyreChamber.tsx` — ritual wrapper, threshold logic, copy, and completion state.
- `components/smudging/life-gyre.css` — particle-field styling.
- `components/smudging/life-gyre-chamber.css` — chamber layout and transition styling.

Three.js and its TypeScript definitions are declared in the root package manifest.

## Completion rule

The next chamber does not unlock from a single swipe. The user must:

- reach at least 68% Open Space; and
- sustain it for approximately 1.8 seconds.

Change `CLEAR_THRESHOLD` and `HOLD_DURATION_MS` in `LifeGyreChamber.tsx` to tune this.

## Important product choice

The Life Gyre does not permanently delete the selected burdens. Cleared space gradually closes again. This preserves the framework's central truth: the practice is not erasure, but changing the conditions under which attention meets obligation.

## Accessibility and resilience

- Pointer, touch, Enter, and Space input are supported.
- Reduced-motion devices render a smaller field.
- Low-power and coarse-pointer devices use fewer particles.
- If WebGL is unavailable, the chamber presents an explicit continuation path.
