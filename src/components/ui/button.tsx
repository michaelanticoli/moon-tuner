import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-sans",
  {
    variants: {
      variant: {
        // ── shadcn defaults ───────────────────────────────────────────────
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",

        // ── Moontuner Core theme ──────────────────────────────────────────
        /** Teal-filled primary action */
        gold: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm hover:shadow-md",
        "gold-outline": "border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground",
        /** Hero teal CTA with glow */
        hero: "bg-accent text-accent-foreground font-medium tracking-wide hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all duration-300",
        "hero-outline": "border-2 border-primary/20 text-primary bg-transparent hover:bg-primary hover:text-primary-foreground backdrop-blur-sm",
        night: "bg-primary text-primary-foreground hover:bg-primary/80 shadow-md",
        "night-outline": "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        subtle: "bg-muted text-muted-foreground hover:bg-muted/80",

        // ── Dusk / Cinematic system ───────────────────────────────────────
        /** Ivory-filled primary — Dusk design language */
        "dusk-primary":
          "rounded-full bg-[hsl(var(--dusk-ivory))] text-[hsl(var(--dusk-black))] border border-[hsl(var(--dusk-ivory))] uppercase tracking-[0.06em] text-[0.8125rem] font-medium hover:bg-[hsl(var(--dusk-gold))] hover:border-[hsl(var(--dusk-gold))] transition-all duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]",
        /** Ghost border — Dusk design language */
        "dusk-ghost":
          "rounded-full bg-transparent text-[hsl(var(--dusk-ivory))] border border-[hsl(var(--dusk-ivory)/0.25)] uppercase tracking-[0.06em] text-[0.8125rem] font-medium hover:border-[hsl(var(--dusk-ivory)/0.7)] hover:bg-[hsl(var(--dusk-ivory)/0.04)] transition-all duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]",

        // ── Digital Smudging theme ────────────────────────────────────────
        /** Warm amber ember action */
        "smudge-primary":
          "rounded-full bg-[hsl(var(--smudge-ember))] text-[hsl(var(--dusk-black))] border border-[hsl(var(--smudge-ember))] uppercase tracking-[0.06em] text-[0.8125rem] font-medium hover:opacity-90",
        /** Sage ghost outline */
        "smudge-ghost":
          "rounded-full bg-transparent text-[hsl(var(--smudge-sage))] border border-[hsl(var(--smudge-sage)/0.35)] uppercase tracking-[0.06em] text-[0.8125rem] font-medium hover:border-[hsl(var(--smudge-sage)/0.65)] hover:bg-[hsl(var(--smudge-sage)/0.05)]",

        // ── Spacetime Printer theme ───────────────────────────────────────
        /** Ink-on-paper filled action */
        "space-primary":
          "rounded-sm bg-[hsl(var(--space-ink))] text-[hsl(var(--space-paper))] border border-[hsl(var(--space-ink))] uppercase tracking-[0.08em] text-[0.8125rem] font-medium hover:opacity-90",
        /** Grid-line ghost outline */
        "space-ghost":
          "rounded-sm bg-transparent text-[hsl(var(--space-ink))] border border-[hsl(var(--space-rule))] uppercase tracking-[0.08em] text-[0.8125rem] font-medium hover:bg-[hsl(var(--space-ink)/0.05)] hover:border-[hsl(var(--space-ink)/0.4)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8 text-base",
        xl: "h-14 rounded-lg px-10 text-base tracking-wide",
        /** Pill XL — used by dusk/smudge/space themes */
        pill: "h-[3.25rem] px-6 py-[0.95rem]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
