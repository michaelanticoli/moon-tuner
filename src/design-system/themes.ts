/**
 * Moontuner Theme Architecture
 *
 * Three distinct emotional environments, each with its own:
 * - Palette identity
 * - Typography personality
 * - Motion character
 * - Spatial feeling
 *
 * Themes are applied via CSS class on a root element, activating
 * the corresponding CSS custom property overrides defined in index.css.
 */

// ─── Theme Identifiers ───────────────────────────────────────────────────

export type ThemeId = "core" | "smudging" | "spacetime";

// ─── Theme Metadata ───────────────────────────────────────────────────────

export interface ThemeConfig {
  /** CSS class to apply to activate this theme */
  cssClass: string;
  /** Human-readable name */
  name: string;
  /** Short positioning statement */
  tagline: string;
  /** Emotional quality description */
  feeling: string;
  /** Palette summary */
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
  };
  /** Typography personality */
  typography: {
    headlineFont: string;
    bodyFont: string;
    headlineWeight: number;
    headlineTracking: string;
  };
  /** Motion character */
  motion: {
    pace: "glacial" | "slow" | "standard";
    style: "drift" | "rise" | "appear";
    ambientDuration: number;
  };
}

// ─── Theme Definitions ────────────────────────────────────────────────────

export const themes: Record<ThemeId, ThemeConfig> = {
  /**
   * Moontuner Core
   *
   * The anchor theme. Deep night, ivory warmth, teal precision.
   * Feels like: a silent observatory at 2am.
   * Used for: main app, homepage, reflection tools.
   */
  core: {
    cssClass: "theme-core",
    name: "Moontuner Core",
    tagline: "Timing your life with the intelligence of natural cycles.",
    feeling: "Quiet authority. Infinite depth. Emotionally steady.",
    palette: {
      primary: "hsl(40 20% 92%)",       // lunar ivory
      secondary: "hsl(0 0% 10%)",       // night slate light
      accent: "hsl(168 75% 45%)",       // teal
      background: "hsl(0 0% 4%)",       // night black
      surface: "hsl(0 0% 7%)",          // card surface
    },
    typography: {
      headlineFont: '"Inter", system-ui, sans-serif',
      bodyFont: '"DM Sans", system-ui, sans-serif',
      headlineWeight: 200,
      headlineTracking: "-0.03em",
    },
    motion: {
      pace: "slow",
      style: "rise",
      ambientDuration: 18,
    },
  },

  /**
   * Digital Smudging
   *
   * Warm charcoal, amber ember, sage release.
   * Feels like: candlelight, ritual clearing, held breath exhaled.
   * Used for: emotional regulation tools, clearing sessions, breathwork.
   */
  smudging: {
    cssClass: "theme-smudging",
    name: "Digital Smudging",
    tagline: "Clear what no longer serves. Begin again.",
    feeling: "Warmth. Release. Ancient in a digital form.",
    palette: {
      primary: "hsl(38 30% 88%)",       // warm parchment
      secondary: "hsl(20 15% 18%)",     // dark charcoal
      accent: "hsl(25 65% 55%)",        // amber ember
      background: "hsl(20 12% 8%)",     // dusk charcoal
      surface: "hsl(22 12% 12%)",       // warm surface
    },
    typography: {
      headlineFont: '"Instrument Serif", "Playfair Display", Georgia, serif',
      bodyFont: '"Work Sans", system-ui, sans-serif',
      headlineWeight: 400,
      headlineTracking: "-0.015em",
    },
    motion: {
      pace: "glacial",
      style: "drift",
      ambientDuration: 24,
    },
  },

  /**
   * Spacetime Printer
   *
   * Paper-white field, ink precision, grid signal.
   * Feels like: scientific notation made beautiful, a printed ephemeris.
   * Used for: chart printing, data visualizations, reports, downloads.
   */
  spacetime: {
    cssClass: "theme-spacetime",
    name: "Spacetime Printer",
    tagline: "Print your position in time. Own your coordinates.",
    feeling: "Clinical clarity. Precision as aesthetic. Data as poetry.",
    palette: {
      primary: "hsl(220 25% 12%)",      // deep ink
      secondary: "hsl(220 15% 96%)",    // paper white
      accent: "hsl(210 90% 50%)",       // signal blue
      background: "hsl(40 20% 97%)",    // off-white paper
      surface: "hsl(220 15% 99%)",      // pure surface
    },
    typography: {
      headlineFont: '"Inter", system-ui, sans-serif',
      bodyFont: '"Work Sans", system-ui, sans-serif',
      headlineWeight: 300,
      headlineTracking: "-0.02em",
    },
    motion: {
      pace: "standard",
      style: "appear",
      ambientDuration: 12,
    },
  },
};

// ─── Theme Utilities ──────────────────────────────────────────────────────

/** Get the CSS class for a given theme */
export function getThemeClass(themeId: ThemeId): string {
  return themes[themeId].cssClass;
}

/** Get all available theme IDs */
export const themeIds: ThemeId[] = ["core", "smudging", "spacetime"];

/** Default theme */
export const defaultTheme: ThemeId = "core";
