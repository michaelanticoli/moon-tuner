import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Moontuner Core palette
        lunar: {
          ivory: "hsl(var(--lunar-ivory))",
          night: "hsl(var(--night-slate))",
          "night-light": "hsl(var(--night-slate-light))",
          gold: "hsl(var(--soft-gold))",
          "gold-light": "hsl(var(--soft-gold-light))",
          teal: "hsl(var(--teal))",
          "teal-light": "hsl(var(--teal-light))",
          clay: "hsl(var(--clay))",
          taupe: "hsl(var(--taupe))",
        },
        gold: {
          DEFAULT: "hsl(var(--gold))",
          foreground: "hsl(var(--gold-foreground))",
        },
        // Dusk token set
        dusk: {
          black: "hsl(var(--dusk-black))",
          ivory: "hsl(var(--dusk-ivory))",
          silver: "hsl(var(--dusk-silver))",
          gold: "hsl(var(--dusk-gold))",
          line: "hsl(var(--dusk-line))",
          mute: "hsl(var(--dusk-mute))",
        },
        // Digital Smudging theme palette
        smudge: {
          dusk: "hsl(var(--smudge-dusk))",
          ember: "hsl(var(--smudge-ember))",
          ash: "hsl(var(--smudge-ash))",
          sage: "hsl(var(--smudge-sage))",
          "sage-light": "hsl(var(--smudge-sage-light))",
          warm: "hsl(var(--smudge-warm))",
        },
        // Spacetime Printer theme palette
        space: {
          paper: "hsl(var(--space-paper))",
          ink: "hsl(var(--space-ink))",
          rule: "hsl(var(--space-rule))",
          grid: "hsl(var(--space-grid))",
          signal: "hsl(var(--space-signal))",
          mid: "hsl(var(--space-mid))",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
        editorial: ["Instrument Serif", "Playfair Display", "Georgia", "serif"],
        ui: ["Work Sans", "system-ui", "-apple-system", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "SF Mono", "Menlo", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(var(--soft-gold) / 0.2)" },
          "50%": { boxShadow: "0 0 40px hsl(var(--soft-gold) / 0.4)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "slide-in-left": "slide-in-left 0.6s ease-out forwards",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
      },
      letterSpacing: {
        "widest": "0.2em",
        "ultra": "0.3em",
        "button": "0.06em",
        "eyebrow": "0.32em",
        "meta": "0.28em",
      },
      maxWidth: {
        "prose-narrow": "640px",
        "prose-md": "760px",
        "content": "1024px",
        "layout": "1280px",
        "full-bleed": "1400px",
      },
      lineHeight: {
        "tighter": "1.05",
        "snug-serif": "1.15",
        "editorial": "1.25",
        "readable": "1.7",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
