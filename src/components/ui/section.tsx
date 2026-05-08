/**
 * Section Layout System
 *
 * Reusable primitives for consistent page structure.
 *
 * Usage:
 *   <Section size="lg">
 *     <Container>
 *       <Grid cols={2}>...</Grid>
 *     </Container>
 *   </Section>
 */

import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Section ─────────────────────────────────────────────────────────────

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Vertical padding scale */
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  /** Removes top padding — useful for stacked sections */
  flushTop?: boolean;
  /** Removes bottom padding */
  flushBottom?: boolean;
  /** Full-bleed background color or gradient class */
  fill?: string;
  as?: React.ElementType;
}

const sectionSizeMap: Record<NonNullable<SectionProps["size"]>, string> = {
  // Values intentionally expressed as Tailwind classes rather than
  // referencing design-system/tokens.sectionPadding directly, since
  // Tailwind needs static strings at build time. Keep in sync with
  // tokens.sectionPadding when updating either.
  sm: "py-12 lg:py-16",
  md: "py-16 lg:py-24",
  lg: "py-20 lg:py-32",
  xl: "py-24 lg:py-40",
  "2xl": "py-32 lg:py-56",
};

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      size = "lg",
      flushTop = false,
      flushBottom = false,
      fill,
      as: Tag = "section",
      ...props
    },
    ref,
  ) => {
    const padding = sectionSizeMap[size];
    const [pt, pb] = padding.split(" ");

    return (
      <Tag
        ref={ref as React.Ref<HTMLElement>}
        className={cn(
          flushTop ? "" : pt,
          flushBottom ? "" : pb,
          fill,
          className,
        )}
        {...props}
      />
    );
  },
);
Section.displayName = "Section";

// ─── Container ───────────────────────────────────────────────────────────

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max-width variant */
  size?: "narrow" | "prose" | "default" | "wide" | "full";
  /** Horizontal padding */
  gutter?: "none" | "sm" | "md" | "lg";
}

const containerSizeMap: Record<NonNullable<ContainerProps["size"]>, string> = {
  narrow: "max-w-[640px]",
  prose: "max-w-[760px]",
  default: "max-w-5xl",
  wide: "max-w-[1280px]",
  full: "max-w-[1400px]",
};

const containerGutterMap: Record<NonNullable<ContainerProps["gutter"]>, string> = {
  none: "px-0",
  sm: "px-4 lg:px-6",
  md: "px-6 lg:px-10",
  lg: "px-6 lg:px-12",
};

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "full", gutter = "lg", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mx-auto w-full",
        containerSizeMap[size],
        containerGutterMap[gutter],
        className,
      )}
      {...props}
    />
  ),
);
Container.displayName = "Container";

// ─── Grid ─────────────────────────────────────────────────────────────────

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns at desktop */
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  /** Gap between cells */
  gap?: "sm" | "md" | "lg" | "xl";
  /** Align items */
  align?: "start" | "center" | "end" | "stretch";
}

const gridColsMap: Record<NonNullable<GridProps["cols"]>, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  12: "grid-cols-12",
};

const gridGapMap: Record<NonNullable<GridProps["gap"]>, string> = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8 lg:gap-12",
  xl: "gap-10 lg:gap-16",
};

const gridAlignMap: Record<NonNullable<GridProps["align"]>, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 2, gap = "md", align = "stretch", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "grid",
        gridColsMap[cols],
        gridGapMap[gap],
        gridAlignMap[align],
        className,
      )}
      {...props}
    />
  ),
);
Grid.displayName = "Grid";

// ─── Stack ────────────────────────────────────────────────────────────────

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Spacing between children */
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Direction */
  direction?: "vertical" | "horizontal";
  /** Alignment */
  align?: "start" | "center" | "end" | "stretch";
  /** Justification (horizontal direction only) */
  justify?: "start" | "center" | "end" | "between" | "around";
  /** Wrap children (horizontal direction only) */
  wrap?: boolean;
}

const stackGapMap: Record<NonNullable<StackProps["gap"]>, string> = {
  xs: "gap-2",
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      gap = "md",
      direction = "vertical",
      align = "stretch",
      justify = "start",
      wrap = false,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "flex",
        direction === "vertical" ? "flex-col" : "flex-row",
        wrap && "flex-wrap",
        stackGapMap[gap],
        {
          "items-start": align === "start",
          "items-center": align === "center",
          "items-end": align === "end",
          "items-stretch": align === "stretch",
          "justify-start": justify === "start",
          "justify-center": justify === "center",
          "justify-end": justify === "end",
          "justify-between": justify === "between",
          "justify-around": justify === "around",
        },
        className,
      )}
      {...props}
    />
  ),
);
Stack.displayName = "Stack";

// ─── Divider ──────────────────────────────────────────────────────────────

interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  /** Visual weight */
  weight?: "hairline" | "subtle" | "standard";
  /** Orientation */
  orientation?: "horizontal" | "vertical";
}

const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ className, weight = "subtle", orientation = "horizontal", ...props }, ref) => (
    <hr
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "border-0",
        orientation === "horizontal" ? "w-full" : "h-full",
        {
          "h-px": orientation === "horizontal",
          "w-px": orientation === "vertical",
        },
        {
          "bg-border/30": weight === "hairline",
          "bg-border/60": weight === "subtle",
          "bg-border": weight === "standard",
        },
        className,
      )}
      {...props}
    />
  ),
);
Divider.displayName = "Divider";

// ─── Eyebrow ──────────────────────────────────────────────────────────────

interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Decorative rule before the label */
  withRule?: boolean;
}

const Eyebrow = React.forwardRef<HTMLParagraphElement, EyebrowProps>(
  ({ className, withRule = false, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "dusk-eyebrow flex items-center gap-3",
        className,
      )}
      {...props}
    >
      {withRule && (
        <span className="inline-block w-6 h-px bg-[hsl(var(--dusk-gold))] shrink-0" />
      )}
      {children}
    </p>
  ),
);
Eyebrow.displayName = "Eyebrow";

export { Section, Container, Grid, Stack, Divider, Eyebrow };
export type { SectionProps, ContainerProps, GridProps, StackProps, DividerProps, EyebrowProps };
