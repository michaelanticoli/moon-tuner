/**
 * Moontuner Card Components
 *
 * Five semantic card variants designed for different content contexts.
 * All cards share the same base emotion: quiet confidence, restrained depth.
 *
 * Variants:
 * - SurfaceCard    — glass/translucent surface, general purpose
 * - FeatureCard    — bordered, hover glow, for key features/offerings
 * - EditorialCard  — large text-led layout, for articles/philosophy content
 * - DataCard       — compact system info display, for metrics/status
 * - ModuleCard     — product/offering card with CTA area
 */

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeInUp, scrollRevealViewport } from "@/design-system/motion";

// ─── Shared Types ─────────────────────────────────────────────────────────

interface BaseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Animate on scroll into view */
  animate?: boolean;
  /** Delay before animation starts (seconds) */
  animationDelay?: number;
}

// ─── Surface Card ─────────────────────────────────────────────────────────

/**
 * SurfaceCard
 * Translucent glass surface. Use for general content panels, tooltips,
 * floating overlays, and ambient information displays.
 */
interface SurfaceCardProps extends BaseCardProps {
  /** Blur strength */
  blur?: "sm" | "md" | "lg";
  /** Inner padding size */
  padding?: "sm" | "md" | "lg" | "xl";
}

const surfaceBlurMap = {
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-xl",
};

const surfacePaddingMap = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-10 lg:p-12",
};

const SurfaceCard = React.forwardRef<HTMLDivElement, SurfaceCardProps>(
  (
    {
      className,
      blur = "md",
      padding = "lg",
      animate = false,
      animationDelay = 0,
      children,
      ...props
    },
    ref,
  ) => {
    const content = (
      <div
        ref={ref}
        className={cn(
          "dusk-surface",
          surfaceBlurMap[blur],
          surfacePaddingMap[padding],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );

    if (!animate) return content;

    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={scrollRevealViewport}
        variants={fadeInUp}
        transition={{ delay: animationDelay }}
      >
        {content}
      </motion.div>
    );
  },
);
SurfaceCard.displayName = "SurfaceCard";

// ─── Feature Card ─────────────────────────────────────────────────────────

/**
 * FeatureCard
 * Bordered card with ambient hover glow. Use for key offerings,
 * feature blocks, and product capability highlights.
 */
interface FeatureCardProps extends BaseCardProps {
  /** Glow color on hover */
  glow?: "teal" | "gold" | "none";
  /** Inner padding size */
  padding?: "sm" | "md" | "lg" | "xl";
}

const featureGlowMap = {
  teal: "hover:border-accent/50 hover:shadow-[0_0_30px_hsl(168_75%_45%/0.12)]",
  gold: "hover:border-[hsl(var(--soft-gold)/0.5)] hover:shadow-[0_0_30px_hsl(42_50%_58%/0.15)]",
  none: "",
};

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  (
    {
      className,
      glow = "teal",
      padding = "lg",
      animate = false,
      animationDelay = 0,
      children,
      ...props
    },
    ref,
  ) => {
    const content = (
      <div
        ref={ref}
        className={cn(
          "node-card transition-all duration-500",
          surfacePaddingMap[padding],
          featureGlowMap[glow],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );

    if (!animate) return content;

    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={scrollRevealViewport}
        variants={fadeInUp}
        transition={{ delay: animationDelay }}
      >
        {content}
      </motion.div>
    );
  },
);
FeatureCard.displayName = "FeatureCard";

// ─── Editorial Card ───────────────────────────────────────────────────────

/**
 * EditorialCard
 * Large, text-led layout. Use for philosophy content, articles,
 * manifesto sections, and rich long-form previews.
 */
interface EditorialCardProps extends BaseCardProps {
  /** Eyebrow label above the headline */
  eyebrow?: string;
  /** Card headline */
  headline?: React.ReactNode;
  /** Supporting body text */
  body?: React.ReactNode;
  /** Footer slot (e.g. CTA link, date) */
  footer?: React.ReactNode;
  /** Image or visual element above content */
  visual?: React.ReactNode;
  /** Layout direction */
  layout?: "stacked" | "horizontal";
}

const EditorialCard = React.forwardRef<HTMLDivElement, EditorialCardProps>(
  (
    {
      className,
      eyebrow,
      headline,
      body,
      footer,
      visual,
      layout = "stacked",
      animate = false,
      animationDelay = 0,
      children,
      ...props
    },
    ref,
  ) => {
    const content = (
      <div
        ref={ref}
        className={cn(
          "group flex gap-8 rounded-2xl border border-border/40 bg-card/40 p-8 lg:p-10",
          "transition-all duration-500 hover:border-border/60",
          layout === "horizontal" && "flex-row items-start",
          layout === "stacked" && "flex-col",
          className,
        )}
        {...props}
      >
        {visual && (
          <div className="shrink-0 overflow-hidden rounded-xl">
            {visual}
          </div>
        )}
        <div className="flex flex-col gap-4 flex-1">
          {eyebrow && (
            <p className="dusk-eyebrow">{eyebrow}</p>
          )}
          {headline && (
            <h3 className="dusk-serif text-xl lg:text-2xl dusk-ivory leading-snug">
              {headline}
            </h3>
          )}
          {body && (
            <p className="text-sm lg:text-base leading-relaxed dusk-mute">
              {body}
            </p>
          )}
          {children}
          {footer && (
            <div className="mt-auto pt-4">
              {footer}
            </div>
          )}
        </div>
      </div>
    );

    if (!animate) return content;

    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={scrollRevealViewport}
        variants={fadeInUp}
        transition={{ delay: animationDelay }}
      >
        {content}
      </motion.div>
    );
  },
);
EditorialCard.displayName = "EditorialCard";

// ─── Data Card ────────────────────────────────────────────────────────────

/**
 * DataCard
 * Compact display for metrics, live status, and system information.
 * Designed for the "operating system" feel of Moontuner's live data.
 */
interface DataCardProps extends BaseCardProps {
  /** Label above the value */
  label?: string;
  /** Primary value or reading */
  value?: React.ReactNode;
  /** Secondary detail below the value */
  detail?: React.ReactNode;
  /** Status indicator color */
  status?: "active" | "idle" | "warning" | "none";
  /** Unit label next to value */
  unit?: string;
}

const statusColorMap = {
  active: "bg-accent",
  idle: "bg-muted-foreground/40",
  warning: "bg-[hsl(42_50%_58%)]",
  none: "hidden",
};

const DataCard = React.forwardRef<HTMLDivElement, DataCardProps>(
  (
    {
      className,
      label,
      value,
      detail,
      status = "none",
      unit,
      animate = false,
      animationDelay = 0,
      children,
      ...props
    },
    ref,
  ) => {
    const content = (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-2 rounded-lg border border-border/50 bg-card/60 p-4 lg:p-5",
          "backdrop-blur-sm",
          className,
        )}
        {...props}
      >
        {(label || status !== "none") && (
          <div className="flex items-center justify-between">
            {label && (
              <span className="system-label">{label}</span>
            )}
            {status !== "none" && (
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full shrink-0",
                  statusColorMap[status],
                  status === "active" && "animate-status-pulse",
                )}
              />
            )}
          </div>
        )}
        {(value !== undefined || unit) && (
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl lg:text-2xl font-light text-foreground leading-none">
              {value}
            </span>
            {unit && (
              <span className="system-label">{unit}</span>
            )}
          </div>
        )}
        {detail && (
          <p className="text-xs text-muted-foreground leading-relaxed">
            {detail}
          </p>
        )}
        {children}
      </div>
    );

    if (!animate) return content;

    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={scrollRevealViewport}
        variants={fadeInUp}
        transition={{ delay: animationDelay }}
      >
        {content}
      </motion.div>
    );
  },
);
DataCard.displayName = "DataCard";

// ─── Module Card ──────────────────────────────────────────────────────────

/**
 * ModuleCard
 * Product/offering card. Use for service listings, program previews,
 * and any context where a CTA action follows the description.
 */
interface ModuleCardProps extends Omit<BaseCardProps, "title"> {
  /** Badge/tag in the top-right corner */
  badge?: string;
  /** Icon or symbol element */
  icon?: React.ReactNode;
  /** Card title */
  title?: React.ReactNode;
  /** Card description */
  description?: React.ReactNode;
  /** Action slot (CTA button or link) */
  action?: React.ReactNode;
  /** Highlighted state (featured/recommended) */
  featured?: boolean;
}

const ModuleCard = React.forwardRef<HTMLDivElement, ModuleCardProps>(
  (
    {
      className,
      badge,
      icon,
      title,
      description,
      action,
      featured = false,
      animate = false,
      animationDelay = 0,
      children,
      ...props
    },
    ref,
  ) => {
    const content = (
      <div
        ref={ref}
        className={cn(
          "group relative flex flex-col gap-6 rounded-2xl border p-6 lg:p-8",
          "transition-all duration-500",
          featured
            ? "border-accent/30 bg-gradient-to-b from-accent/5 to-card/80 hover:border-accent/50"
            : "border-border/50 bg-card/60 hover:border-border",
          className,
        )}
        {...props}
      >
        {badge && (
          <span className="absolute top-5 right-5 text-[0.625rem] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border border-border/50 text-muted-foreground">
            {badge}
          </span>
        )}
        {icon && (
          <div className="text-foreground/60 group-hover:text-foreground/80 transition-colors duration-300">
            {icon}
          </div>
        )}
        <div className="flex flex-col gap-3 flex-1">
          {title && (
            <h3 className="font-sans font-medium text-lg text-foreground leading-snug">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
          {children}
        </div>
        {action && (
          <div className="pt-2 border-t border-border/30">
            {action}
          </div>
        )}
      </div>
    );

    if (!animate) return content;

    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={scrollRevealViewport}
        variants={fadeInUp}
        transition={{ delay: animationDelay }}
      >
        {content}
      </motion.div>
    );
  },
);
ModuleCard.displayName = "ModuleCard";

export {
  SurfaceCard,
  FeatureCard,
  EditorialCard,
  DataCard,
  ModuleCard,
};

export type {
  SurfaceCardProps,
  FeatureCardProps,
  EditorialCardProps,
  DataCardProps,
  ModuleCardProps,
};
