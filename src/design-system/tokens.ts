/**
 * Moontuner Design Token System
 *
 * Single source of truth for all design decisions.
 * Tokens map to CSS custom properties defined in index.css.
 * Use these in JS/TS contexts (e.g. Framer Motion inline styles).
 */

// ─── Typography Scale ───────────────────────────────────────────────────────

export const fontFamily = {
  serif: '"Playfair Display", Georgia, serif',
  sans: '"DM Sans", system-ui, sans-serif',
  editorial: '"Instrument Serif", "Playfair Display", Georgia, serif',
  ui: '"Work Sans", system-ui, -apple-system, sans-serif',
  display: '"Inter", system-ui, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
} as const;

export const fontSize = {
  /** 0.6875rem / 11px — eyebrow labels */
  eyebrow: "0.6875rem",
  /** 0.75rem / 12px — captions, meta */
  xs: "0.75rem",
  /** 0.875rem / 14px — small body */
  sm: "0.875rem",
  /** 1rem / 16px — body */
  base: "1rem",
  /** 1.0625rem / 17px — comfortable body */
  md: "1.0625rem",
  /** 1.125rem / 18px — lead text */
  lg: "1.125rem",
  /** 1.25rem / 20px */
  xl: "1.25rem",
  /** 1.5rem / 24px */
  "2xl": "1.5rem",
  /** 1.875rem / 30px */
  "3xl": "1.875rem",
  /** 2.25rem / 36px */
  "4xl": "2.25rem",
  /** clamp(2.6rem, 5vw, 4rem) — section headline */
  display: "clamp(2.6rem, 5vw, 4rem)",
  /** clamp(3rem, 6.5vw, 5.6rem) — hero headline */
  hero: "clamp(3rem, 6.5vw, 5.6rem)",
} as const;

export const fontWeight = {
  thin: 100,
  extralight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const lineHeight = {
  tight: 1.05,
  snug: 1.25,
  normal: 1.5,
  relaxed: 1.7,
  loose: 1.9,
} as const;

export const letterSpacing = {
  /** -0.03em — display/hero headings */
  tight: "-0.03em",
  /** -0.015em — serif headings */
  snug: "-0.015em",
  /** 0 — default body */
  normal: "0",
  /** 0.01em — UI text */
  ui: "0.01em",
  /** 0.06em — buttons */
  button: "0.06em",
  /** 0.2em — eyebrow labels */
  wide: "0.2em",
  /** 0.28em — meta / status labels */
  wider: "0.28em",
  /** 0.32em — uppercase system labels */
  widest: "0.32em",
} as const;

// ─── Spacing Scale ───────────────────────────────────────────────────────────

/**
 * Base-8 spacing scale (px reference, use rem in practice).
 * Maps to Tailwind spacing with `spacing-[value]` or predefined classes.
 */
export const spacing = {
  0: "0",
  1: "0.25rem",   // 4px
  2: "0.5rem",    // 8px
  3: "0.75rem",   // 12px
  4: "1rem",      // 16px
  5: "1.25rem",   // 20px
  6: "1.5rem",    // 24px
  8: "2rem",      // 32px
  10: "2.5rem",   // 40px
  12: "3rem",     // 48px
  16: "4rem",     // 64px
  20: "5rem",     // 80px
  24: "6rem",     // 96px
  32: "8rem",     // 128px
  40: "10rem",    // 160px
  48: "12rem",    // 192px
} as const;

/** Section vertical padding presets (mobile → desktop) */
export const sectionPadding = {
  sm: { mobile: "3rem", desktop: "4rem" },
  md: { mobile: "4rem", desktop: "6rem" },
  lg: { mobile: "5rem", desktop: "8rem" },
  xl: { mobile: "6rem", desktop: "10rem" },
  "2xl": { mobile: "8rem", desktop: "14rem" },
} as const;

// ─── Color Tokens (CSS var references) ────────────────────────────────────

/**
 * Raw CSS variable names without `hsl()` wrapper.
 * Use: `hsl(var(colorTokens.gold))`
 */
export const colorTokens = {
  // Backgrounds
  background: "--background",
  card: "--card",
  popover: "--popover",
  muted: "--muted",

  // Foregrounds
  foreground: "--foreground",
  cardForeground: "--card-foreground",
  mutedForeground: "--muted-foreground",

  // Brand / accent
  primary: "--primary",
  primaryForeground: "--primary-foreground",
  secondary: "--secondary",
  secondaryForeground: "--secondary-foreground",
  accent: "--accent",
  accentForeground: "--accent-foreground",
  gold: "--gold",
  goldForeground: "--gold-foreground",

  // Semantic
  destructive: "--destructive",
  border: "--border",
  input: "--input",
  ring: "--ring",

  // Moontuner core palette
  lunarIvory: "--lunar-ivory",
  nightSlate: "--night-slate",
  nightSlateLight: "--night-slate-light",
  softGold: "--soft-gold",
  softGoldLight: "--soft-gold-light",
  teal: "--teal",
  tealLight: "--teal-light",
  clay: "--clay",
  taupe: "--taupe",

  // Dusk token set
  duskBlack: "--dusk-black",
  duskIvory: "--dusk-ivory",
  duskSilver: "--dusk-silver",
  duskGold: "--dusk-gold",
  duskLine: "--dusk-line",
  duskMute: "--dusk-mute",

  // Digital Smudging theme
  smudgeDusk: "--smudge-dusk",
  smudgeEmber: "--smudge-ember",
  smudgeAsh: "--smudge-ash",
  smudgeSage: "--smudge-sage",
  smudgeSageLight: "--smudge-sage-light",
  smudgeWarm: "--smudge-warm",

  // Spacetime Printer theme
  spacePaper: "--space-paper",
  spaceInk: "--space-ink",
  spaceRule: "--space-rule",
  spaceGrid: "--space-grid",
  spaceSignal: "--space-signal",
  spaceMid: "--space-mid",
} as const;

// ─── Shadow Tokens ────────────────────────────────────────────────────────

export const shadows = {
  /** Barely-there elevation */
  none: "none",
  /** 0 1px 3px — hairline separation */
  hairline: "0 1px 3px hsl(0 0% 0% / 0.25)",
  /** Soft card depth */
  soft: "0 4px 20px -4px hsl(0 0% 0% / 0.4)",
  /** Medium modal/panel depth */
  medium: "0 8px 32px -8px hsl(0 0% 0% / 0.5)",
  /** Strong focus/overlay depth */
  strong: "0 20px 60px -12px hsl(0 0% 0% / 0.6)",
  /** Teal ambient glow */
  glowTeal: "0 0 40px hsl(168 75% 45% / 0.15)",
  /** Gold ambient glow */
  glowGold: "0 0 30px hsl(42 50% 58% / 0.2)",
  /** Crisp inner highlight */
  innerHighlight: "inset 0 1px 0 hsl(0 100% 100% / 0.05)",
} as const;

// ─── Border Radius ────────────────────────────────────────────────────────

export const radius = {
  none: "0",
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.25rem",
  "3xl": "1.5rem",
  full: "9999px",
} as const;

// ─── Z-Index Scale ────────────────────────────────────────────────────────

export const zIndex = {
  base: 0,
  raised: 10,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  notification: 500,
  tooltip: 600,
} as const;

// ─── Breakpoints ──────────────────────────────────────────────────────────

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1400px",
} as const;

// ─── Container Widths ─────────────────────────────────────────────────────

export const containers = {
  narrow: "640px",
  prose: "760px",
  default: "1024px",
  wide: "1280px",
  full: "1400px",
} as const;
