/* @ds-bundle: {"format":4,"namespace":"MoontunerDesignSystem_322301","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"IconButton","sourcePath":"components/actions/IconButton.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"LivePill","sourcePath":"components/feedback/LivePill.jsx"},{"name":"EmailCapture","sourcePath":"components/forms/EmailCapture.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Card","sourcePath":"components/layout/Card.jsx"},{"name":"Eyebrow","sourcePath":"components/layout/Eyebrow.jsx"},{"name":"SectionHeading","sourcePath":"components/layout/SectionHeading.jsx"},{"name":"StatBlock","sourcePath":"components/layout/StatBlock.jsx"},{"name":"LunarStatusCard","sourcePath":"components/lunar/LunarStatusCard.jsx"},{"name":"MoonPhaseGlyph","sourcePath":"components/lunar/MoonPhaseGlyph.jsx"},{"name":"MOON_PHASES","sourcePath":"components/lunar/MoonPhaseGlyph.jsx"},{"name":"PhaseStrip","sourcePath":"components/lunar/PhaseStrip.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"b7e5e0e86fe7","components/actions/IconButton.jsx":"7257806120cc","components/feedback/Badge.jsx":"d4c3a13f25cd","components/feedback/LivePill.jsx":"bd67dbd9fce0","components/forms/EmailCapture.jsx":"78161be6bd01","components/forms/Input.jsx":"96d5227150e7","components/layout/Card.jsx":"72caa8c0aa2a","components/layout/Eyebrow.jsx":"b6463ca6ab25","components/layout/SectionHeading.jsx":"2b17e8f0186e","components/layout/StatBlock.jsx":"2e3537f0f706","components/lunar/LunarStatusCard.jsx":"cad4f3474b45","components/lunar/MoonPhaseGlyph.jsx":"72f93bb45601","components/lunar/PhaseStrip.jsx":"a05d0415b637","ui_kits/moontuner-web/HomeScreen.jsx":"a1936277823c","ui_kits/moontuner-web/LunarSystemScreen.jsx":"45fa8155dec2","ui_kits/moontuner-web/MethodScreen.jsx":"5eaa04688630","ui_kits/moontuner-web/Nav.jsx":"915b87412747","ui_kits/moontuner-web/TodayScreen.jsx":"d647897c34e8"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MoontunerDesignSystem_322301 = window.MoontunerDesignSystem_322301 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: {
    padding: "0.5rem 1rem",
    fontSize: "0.6875rem"
  },
  md: {
    padding: "0.85rem 1.6rem",
    fontSize: "0.8125rem"
  },
  lg: {
    padding: "1rem 2.25rem",
    fontSize: "0.875rem"
  }
};

/**
 * Button — Moontuner's primary action control.
 * Uppercase Work Sans label, pill geometry, calm 0.4s transitions.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  as = "button",
  style = {},
  ...props
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const s = sizes[size] || sizes.md;
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.6rem",
    fontFamily: "var(--font-ui)",
    fontWeight: 500,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    borderRadius: "var(--radius-full)",
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    width: fullWidth ? "100%" : "auto",
    whiteSpace: "nowrap",
    textDecoration: "none",
    transition: "all 0.4s cubic-bezier(0.2,0.8,0.2,1)",
    transform: active && !disabled ? "scale(0.97)" : "scale(1)",
    ...s
  };
  const variants = {
    primary: {
      background: hover ? "var(--mt-gold)" : "var(--mt-ivory)",
      color: "var(--mt-night)",
      borderColor: hover ? "var(--mt-gold)" : "var(--mt-ivory)"
    },
    outline: {
      background: hover ? "hsl(var(--foreground))" : "transparent",
      color: hover ? "hsl(var(--background))" : "hsl(var(--foreground))",
      borderColor: "hsl(var(--foreground))"
    },
    ghost: {
      background: hover ? "hsl(var(--foreground) / 0.06)" : "transparent",
      color: "hsl(var(--foreground))",
      borderColor: hover ? "hsl(var(--foreground) / 0.7)" : "hsl(var(--foreground) / 0.25)"
    },
    teal: {
      background: hover ? "var(--mt-teal-light)" : "var(--mt-teal)",
      color: "var(--mt-night)",
      borderColor: hover ? "var(--mt-teal-light)" : "var(--mt-teal)"
    }
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      ...base,
      ...(variants[variant] || variants.primary),
      ...style
    },
    disabled: as === "button" ? disabled : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false)
  }, props), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * IconButton — circular icon-only control with a hairline ring.
 * Meets the 44px touch target used across the app.
 */
function IconButton({
  children,
  label,
  variant = "ring",
  size = 44,
  style = {},
  ...props
}) {
  const [hover, setHover] = React.useState(false);
  const variants = {
    ring: {
      background: hover ? "hsl(var(--foreground) / 0.06)" : "transparent",
      borderColor: hover ? "hsl(var(--foreground) / 0.5)" : "hsl(var(--border))",
      color: "hsl(var(--foreground))"
    },
    solid: {
      background: hover ? "var(--mt-teal-light)" : "var(--mt-teal)",
      borderColor: "transparent",
      color: "var(--mt-night)"
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    title: label,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      minWidth: 44,
      minHeight: 44,
      borderRadius: "var(--radius-full)",
      border: "1px solid",
      cursor: "pointer",
      transition: "all 0.3s ease",
      ...(variants[variant] || variants.ring),
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
const tones = {
  neutral: {
    bg: "hsl(var(--foreground) / 0.08)",
    fg: "hsl(var(--foreground) / 0.8)",
    bd: "hsl(var(--foreground) / 0.14)"
  },
  teal: {
    bg: "hsl(168 75% 45% / 0.12)",
    fg: "var(--mt-teal)",
    bd: "hsl(168 75% 45% / 0.3)"
  },
  gold: {
    bg: "hsl(42 50% 58% / 0.14)",
    fg: "var(--mt-gold)",
    bd: "hsl(42 50% 58% / 0.3)"
  },
  fire: {
    bg: "hsl(18 80% 55% / 0.12)",
    fg: "hsl(18 85% 63%)",
    bd: "hsl(18 80% 55% / 0.3)"
  },
  water: {
    bg: "hsl(210 80% 55% / 0.12)",
    fg: "hsl(210 80% 65%)",
    bd: "hsl(210 80% 55% / 0.3)"
  },
  earth: {
    bg: "hsl(150 40% 45% / 0.12)",
    fg: "hsl(150 45% 58%)",
    bd: "hsl(150 40% 45% / 0.3)"
  },
  air: {
    bg: "hsl(195 70% 55% / 0.12)",
    fg: "hsl(195 75% 65%)",
    bd: "hsl(195 70% 55% / 0.3)"
  }
};

/** Badge — small pill for phase / sign / element tags. */
function Badge({
  children,
  tone = "neutral",
  outline = false,
  style = {}
}) {
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.4rem",
      fontFamily: "var(--font-ui)",
      fontSize: "0.6875rem",
      fontWeight: 500,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      padding: "0.3rem 0.7rem",
      borderRadius: "var(--radius-full)",
      background: outline ? "transparent" : t.bg,
      color: t.fg,
      border: `1px solid ${t.bd}`,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/LivePill.jsx
try { (() => {
/** LivePill — pulsing status indicator ("LIVE", "VOID OF COURSE", etc.). */
function LivePill({
  children = "Live",
  color = "var(--mt-teal)",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      width: 8,
      height: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      borderRadius: "50%",
      background: color,
      opacity: 0.75,
      animation: "mt-livepill-ping 1.8s cubic-bezier(0,0,0.2,1) infinite"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: color
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.65rem",
      letterSpacing: "0.25em",
      textTransform: "uppercase",
      color
    }
  }, children), /*#__PURE__*/React.createElement("style", {
    dangerouslySetInnerHTML: {
      __html: "@keyframes mt-livepill-ping{75%,100%{transform:scale(2.2);opacity:0}}"
    }
  }));
}
Object.assign(__ds_scope, { LivePill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/LivePill.jsx", error: String((e && e.message) || e) }); }

// components/forms/EmailCapture.jsx
try { (() => {
/**
 * EmailCapture — the newsletter / lead-magnet inline form. Row on wide,
 * stacks on narrow. Fake submit shows a confirmation.
 */
function EmailCapture({
  placeholder = "you@domain.com",
  cta = "Get the guide",
  note,
  style = {}
}) {
  const [value, setValue] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  if (sent) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-editorial)",
        fontStyle: "italic",
        fontSize: "1.15rem",
        color: "var(--mt-teal)",
        ...style
      }
    }, "Tuned in. Check your inbox for the first transmission.");
  }
  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      if (value) setSent(true);
    },
    style: {
      display: "flex",
      gap: "0.6rem",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    required: true,
    value: value,
    placeholder: placeholder,
    onChange: e => setValue(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: "1 1 220px",
      fontFamily: "var(--font-sans)",
      fontSize: "0.95rem",
      color: "hsl(var(--foreground))",
      background: "hsl(var(--input))",
      border: "1px solid",
      borderColor: focus ? "var(--mt-teal)" : "hsl(var(--border))",
      borderRadius: "var(--radius-full)",
      padding: "0.85rem 1.25rem",
      outline: "none",
      boxShadow: focus ? "0 0 0 3px hsl(168 75% 45% / 0.12)" : "none",
      transition: "border-color 0.25s ease, box-shadow 0.25s ease"
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    as: "button",
    type: "submit",
    variant: "primary"
  }, cta)), note && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "0.75rem",
      color: "var(--mt-muted-fg)",
      marginTop: "0.75rem"
    }
  }, note));
}
Object.assign(__ds_scope, { EmailCapture });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/EmailCapture.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Input — bordered text field with a teal focus ring and optional label. */
function Input({
  label,
  hint,
  id,
  style = {},
  ...props
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? `mt-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      width: "100%"
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "0.6875rem",
      fontWeight: 500,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "var(--mt-muted-fg)"
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    onFocus: e => {
      setFocus(true);
      props.onFocus?.(e);
    },
    onBlur: e => {
      setFocus(false);
      props.onBlur?.(e);
    },
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "0.95rem",
      color: "hsl(var(--foreground))",
      background: "hsl(var(--input))",
      border: "1px solid",
      borderColor: focus ? "var(--mt-teal)" : "hsl(var(--border))",
      borderRadius: "var(--radius-md)",
      padding: "0.85rem 1rem",
      outline: "none",
      boxShadow: focus ? "0 0 0 3px hsl(168 75% 45% / 0.12)" : "none",
      transition: "border-color 0.25s ease, box-shadow 0.25s ease",
      width: "100%",
      boxSizing: "border-box",
      ...style
    }
  }, props)), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "0.75rem",
      color: "var(--mt-muted-fg)"
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/layout/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — the base surface. Bordered, softly elevated, with a teal-lit
 * hover border matching the app's `.node-card` pattern.
 */
function Card({
  children,
  interactive = false,
  accentRule = false,
  style = {},
  ...props
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      position: "relative",
      background: "hsl(var(--card))",
      border: "1px solid",
      borderColor: hover ? "hsl(var(--accent) / 0.5)" : "hsl(var(--border))",
      borderRadius: "var(--radius-xl)",
      padding: "2rem",
      boxShadow: hover ? "0 0 30px hsl(var(--accent) / 0.1)" : "none",
      transition: "border-color 0.5s ease, box-shadow 0.5s ease",
      paddingLeft: accentRule ? "2.5rem" : "2rem",
      ...style
    }
  }, props), accentRule && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: "1.25rem",
      top: "2rem",
      bottom: "2rem",
      width: "2px",
      background: "var(--mt-teal)",
      borderRadius: "2px"
    }
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Card.jsx", error: String((e && e.message) || e) }); }

// components/layout/Eyebrow.jsx
try { (() => {
/** Eyebrow — uppercase system label with wide tracking. Optional teal tick. */
function Eyebrow({
  children,
  tick = false,
  color,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.75rem",
      ...style
    }
  }, tick && /*#__PURE__*/React.createElement("span", {
    style: {
      width: "2rem",
      height: "1.5px",
      background: "var(--mt-teal)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "0.6875rem",
      fontWeight: 500,
      letterSpacing: "0.28em",
      textTransform: "uppercase",
      color: color || "var(--mt-muted-fg)"
    }
  }, children));
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/layout/SectionHeading.jsx
try { (() => {
/**
 * SectionHeading — eyebrow + serif/display headline with optional italic
 * accent word and supporting line. The core editorial title pattern.
 */
function SectionHeading({
  eyebrow,
  title,
  accent,
  supporting,
  align = "left",
  variant = "serif",
  style = {}
}) {
  const headFont = variant === "display" ? {
    fontFamily: "var(--font-display)",
    fontWeight: 200,
    letterSpacing: "-0.03em",
    lineHeight: 1.05
  } : {
    fontFamily: "var(--font-serif)",
    fontWeight: 400,
    letterSpacing: "-0.015em",
    lineHeight: 1.15
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: align,
      maxWidth: align === "center" ? "760px" : undefined,
      marginInline: align === "center" ? "auto" : undefined,
      ...style
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "1.25rem"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    tick: align !== "center"
  }, eyebrow)), /*#__PURE__*/React.createElement("h2", {
    style: {
      ...headFont,
      color: "hsl(var(--foreground))",
      fontSize: "clamp(2rem, 4vw, 3.25rem)",
      margin: 0
    }
  }, title, " ", accent && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-editorial)",
      fontStyle: "italic",
      color: "var(--mt-gold)"
    }
  }, accent)), supporting && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "1.0625rem",
      lineHeight: 1.7,
      color: "hsl(var(--foreground) / 0.7)",
      marginTop: "1.25rem",
      maxWidth: "560px",
      marginInline: align === "center" ? "auto" : undefined
    }
  }, supporting));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/layout/StatBlock.jsx
try { (() => {
/** StatBlock — a labelled numeric readout. Mono label, large display value. */
function StatBlock({
  label,
  value,
  unit,
  accent = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.4rem",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.65rem",
      letterSpacing: "0.25em",
      textTransform: "uppercase",
      color: "var(--mt-muted-fg)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 200,
      fontSize: "2.25rem",
      lineHeight: 1,
      letterSpacing: "-0.02em",
      color: accent ? "var(--mt-teal)" : "hsl(var(--foreground))"
    }
  }, value, unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "1rem",
      marginLeft: "0.25rem",
      color: "var(--mt-muted-fg)"
    }
  }, unit)));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/lunar/MoonPhaseGlyph.jsx
try { (() => {
/**
 * MoonPhaseGlyph — geometric lunar phase mark, rendered from source-app SVG paths.
 * Uses currentColor so it inherits text color; drop a teal glow with `glow`.
 */
function MoonPhaseGlyph({
  phase = "full",
  size = 24,
  glow = false,
  className,
  style = {}
}) {
  const wrap = {
    width: size,
    height: size,
    filter: glow ? "drop-shadow(0 0 12px hsl(168 75% 45% / 0.4))" : undefined,
    ...style
  };
  const svg = {
    width: "100%",
    height: "100%",
    display: "block"
  };
  const paths = {
    "new": /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      style: svg,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "7",
      strokeOpacity: "0.3"
    })),
    "waxing-crescent": /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      style: svg,
      fill: "currentColor"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 3a9 9 0 1 0 0 18c-4.97 0-6-4.03-6-9s1.03-9 6-9z"
    })),
    "first-quarter": /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      style: svg,
      fill: "currentColor"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 3a9 9 0 0 0 0 18V3z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1",
      strokeOpacity: "0.3"
    })),
    "waxing-gibbous": /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      style: svg,
      fill: "currentColor"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 3c-2 0-3 4.03-3 9s1 9 3 9",
      fill: "var(--mt-night)"
    })),
    "full": /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      style: svg,
      fill: "currentColor"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    })),
    "waning-gibbous": /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      style: svg,
      fill: "currentColor"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 3c2 0 3 4.03 3 9s-1 9-3 9",
      fill: "var(--mt-night)"
    })),
    "last-quarter": /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      style: svg,
      fill: "currentColor"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 3a9 9 0 0 1 0 18V3z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1",
      strokeOpacity: "0.3"
    })),
    "waning-crescent": /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      style: svg,
      fill: "currentColor"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 3a9 9 0 1 1 0 18c4.97 0 6-4.03 6-9s-1.03-9-6-9z"
    }))
  };
  return /*#__PURE__*/React.createElement("span", {
    className: className,
    style: wrap
  }, paths[phase] || paths.full);
}
const MOON_PHASES = ["new", "waxing-crescent", "first-quarter", "waxing-gibbous", "full", "waning-gibbous", "last-quarter", "waning-crescent"];
Object.assign(__ds_scope, { MoonPhaseGlyph, MOON_PHASES });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/lunar/MoonPhaseGlyph.jsx", error: String((e && e.message) || e) }); }

// components/lunar/LunarStatusCard.jsx
try { (() => {
/**
 * LunarStatusCard — the app's signature "current configuration" panel:
 * live indicator, phase name, sign, and a compact readout grid.
 */
function LunarStatusCard({
  phase = "full",
  phaseName = "Full Moon",
  sign = "Scorpio",
  element = "Water",
  energy = "Culmination",
  frequencyHz = "211.44",
  hoursRemaining = 14,
  style = {}
}) {
  const stat = (label, value) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.35rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.65rem",
      letterSpacing: "0.25em",
      textTransform: "uppercase",
      color: "var(--mt-muted-fg)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "1rem",
      color: "hsl(var(--foreground))"
    }
  }, value));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      background: "hsl(var(--card))",
      border: "1px solid hsl(var(--border))",
      borderRadius: "var(--radius-2xl)",
      padding: "2rem",
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "1.5rem",
      right: "1.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      width: 10,
      height: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      borderRadius: "50%",
      background: "var(--mt-teal)",
      opacity: 0.75,
      animation: "mt-ping 1.8s cubic-bezier(0,0,0.2,1) infinite"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: "var(--mt-teal)"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.65rem",
      letterSpacing: "0.25em",
      color: "var(--mt-teal)"
    }
  }, "LIVE")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.65rem",
      letterSpacing: "0.25em",
      textTransform: "uppercase",
      color: "var(--mt-muted-fg)"
    }
  }, "Current Lunar Configuration"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      marginTop: "0.75rem",
      marginBottom: "1.75rem"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.MoonPhaseGlyph, {
    phase: phase,
    size: 44,
    glow: true,
    style: {
      color: "var(--mt-ivory)"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "2rem",
      color: "hsl(var(--foreground))",
      margin: 0,
      lineHeight: 1.1
    }
  }, phaseName), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--mt-muted-fg)",
      margin: "0.25rem 0 0",
      fontFamily: "var(--font-sans)",
      fontSize: "0.95rem"
    }
  }, "in ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--mt-teal)",
      fontWeight: 500
    }
  }, sign), " \xB7 ", element))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
      gap: "1.25rem",
      paddingTop: "1.5rem",
      borderTop: "1px solid hsl(var(--border))"
    }
  }, stat("Energy", energy), stat("Resonance", `${frequencyHz} Hz`), stat("In Sign", `~${hoursRemaining}h left`)), /*#__PURE__*/React.createElement("style", {
    dangerouslySetInnerHTML: {
      __html: "@keyframes mt-ping{75%,100%{transform:scale(2.2);opacity:0}}"
    }
  }));
}
Object.assign(__ds_scope, { LunarStatusCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/lunar/LunarStatusCard.jsx", error: String((e && e.message) || e) }); }

// components/lunar/PhaseStrip.jsx
try { (() => {
const LABELS = {
  "new": "New",
  "waxing-crescent": "Waxing",
  "first-quarter": "First Qtr",
  "waxing-gibbous": "Gibbous",
  "full": "Full",
  "waning-gibbous": "Waning",
  "last-quarter": "Last Qtr",
  "waning-crescent": "Balsamic"
};

/**
 * PhaseStrip — the eight-phase cycle laid out horizontally, with the
 * active phase highlighted in teal. Reads as a timeline / progress row.
 */
function PhaseStrip({
  active = "full",
  showLabels = true,
  size = 26,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "0.5rem",
      ...style
    }
  }, __ds_scope.MOON_PHASES.map(p => {
    const on = p === active;
    return /*#__PURE__*/React.createElement("div", {
      key: p,
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.55rem",
        flex: 1
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.MoonPhaseGlyph, {
      phase: p,
      size: size,
      glow: on,
      style: {
        color: on ? "var(--mt-teal)" : "hsl(var(--foreground) / 0.4)"
      }
    }), showLabels && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-ui)",
        fontSize: "0.6rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        textAlign: "center",
        lineHeight: 1.3,
        color: on ? "var(--mt-teal)" : "hsl(var(--foreground) / 0.4)"
      }
    }, LABELS[p]));
  }));
}
Object.assign(__ds_scope, { PhaseStrip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/lunar/PhaseStrip.jsx", error: String((e && e.message) || e) }); }

// ui_kits/moontuner-web/HomeScreen.jsx
try { (() => {
// Moontuner web — marketing home / landing
function HomeScreen({
  setRoute
}) {
  const {
    Button,
    Eyebrow,
    SectionHeading,
    Card,
    LunarStatusCard,
    PhaseStrip,
    Badge,
    EmailCapture
  } = window.MoontunerDesignSystem_322301;
  const pillars = [["01", "Live Lunar Status", "Real-time phase, sign, void-of-course and resonance frequency — the sky, rendered as data."], ["02", "Phasecraft Workbooks", "A 14-day arc of guided reflection that moves with the cycle, not against it."], ["03", "The Lunar Cipher", "A 2026 ephemeris with phase timing you can actually plan around."]];
  const illos = [["../../assets/illustrations/lunar_frequency.png", "Lunar Frequency"], ["../../assets/illustrations/moon_conductor.png", "Moon Conductor"], ["../../assets/illustrations/tuning_forks.png", "Tuning Forks"], ["../../assets/illustrations/new_moon_ritual.png", "New Moon Ritual"]];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      padding: "clamp(4rem,10vw,8rem) 1.5rem clamp(3rem,7vw,5rem)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "-20vmax",
      right: "-12vmax",
      width: "56vmax",
      height: "56vmax",
      borderRadius: "50%",
      background: "radial-gradient(circle, hsl(168 75% 45% / 0.10) 0%, transparent 62%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      maxWidth: "1080px",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "2rem"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tick: true
  }, "Phase-Based Living System")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 200,
      letterSpacing: "-0.03em",
      lineHeight: 1.04,
      fontSize: "clamp(3rem, 7vw, 5.6rem)",
      color: "var(--mt-ivory)",
      margin: 0
    }
  }, "Don't blame the moon.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-editorial)",
      fontStyle: "italic",
      fontWeight: 400,
      color: "var(--mt-gold)"
    }
  }, "Change your tune.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "1.15rem",
      lineHeight: 1.7,
      color: "hsl(var(--foreground) / 0.72)",
      maxWidth: "540px",
      margin: "1.75rem 0 2.25rem"
    }
  }, "Astrology with agency. We don't predict your fate \u2014 we help you align your frequency. Less woo, more you."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "1rem",
      alignItems: "center",
      flexWrap: "wrap",
      marginBottom: "3.5rem"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: () => setRoute("today")
  }, "Sync with the cycle"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "lg",
    onClick: () => setRoute("method")
  }, "Read the method")), /*#__PURE__*/React.createElement(LunarStatusCard, {
    phase: "waxing-gibbous",
    phaseName: "Waxing Gibbous",
    sign: "Scorpio",
    element: "Water",
    energy: "Refinement",
    frequencyHz: "211.44",
    hoursRemaining: 9
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: "1080px",
      margin: "0 auto",
      padding: "0 1.5rem clamp(3rem,7vw,5rem)"
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "1.75rem"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "var(--mt-teal)"
  }, "The Eight Phases")), /*#__PURE__*/React.createElement(PhaseStrip, {
    active: "waxing-gibbous"
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: "1080px",
      margin: "0 auto",
      padding: "0 1.5rem clamp(3rem,7vw,5rem)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "2.5rem"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "What you get",
    title: "A system, not a",
    accent: "vibe.",
    variant: "serif"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "1.25rem"
    }
  }, pillars.map(([n, t, d]) => /*#__PURE__*/React.createElement(Card, {
    key: n,
    interactive: true
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.75rem",
      letterSpacing: "0.2em",
      color: "var(--mt-teal)"
    }
  }, n), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "1.5rem",
      color: "var(--mt-ivory)",
      margin: "1rem 0 0.75rem"
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "0.95rem",
      lineHeight: 1.65,
      color: "hsl(var(--foreground) / 0.66)",
      margin: 0
    }
  }, d))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "0 1.5rem clamp(3rem,7vw,5rem)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "1rem"
    }
  }, illos.map(([src, label]) => /*#__PURE__*/React.createElement("figure", {
    key: label,
    style: {
      margin: 0,
      borderRadius: "var(--radius-xl)",
      overflow: "hidden",
      border: "1px solid hsl(var(--border))",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: label,
    style: {
      display: "block",
      width: "100%",
      aspectRatio: "1",
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      position: "absolute",
      left: "0.85rem",
      bottom: "0.85rem",
      fontFamily: "var(--font-ui)",
      fontSize: "0.62rem",
      fontWeight: 500,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "#fff",
      textShadow: "0 1px 8px rgba(0,0,0,0.6)"
    }
  }, label))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: "760px",
      margin: "0 auto",
      padding: "0 1.5rem clamp(4rem,9vw,7rem)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "1.5rem",
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "gold"
  }, "What key is your chart in?")), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-editorial)",
      fontStyle: "italic",
      fontSize: "clamp(1.8rem,4vw,2.75rem)",
      lineHeight: 1.2,
      color: "var(--mt-ivory)",
      margin: "0 0 2rem"
    }
  }, "Get the free lunar guide."), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "460px",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(EmailCapture, {
    cta: "Send it",
    note: "A downloadable PDF + EPUB introduction to lunar timing."
  }))));
}
window.HomeScreen = HomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/moontuner-web/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/moontuner-web/LunarSystemScreen.jsx
try { (() => {
// Moontuner web — The Lunar System (96-configuration matrix) + Method
function LunarSystemScreen() {
  const {
    Eyebrow,
    SectionHeading,
    Card,
    Badge,
    MoonPhaseGlyph,
    MOON_PHASES
  } = window.MoontunerDesignSystem_322301;
  const phaseLabels = {
    "new": "New",
    "waxing-crescent": "Wax Cres",
    "first-quarter": "First Qtr",
    "waxing-gibbous": "Wax Gib",
    "full": "Full",
    "waning-gibbous": "Wan Gib",
    "last-quarter": "Last Qtr",
    "waning-crescent": "Wan Cres"
  };
  const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
  const elementOf = i => ["fire", "earth", "air", "water"][i % 4];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "1080px",
      margin: "0 auto",
      padding: "clamp(3rem,7vw,5rem) 1.5rem 6rem"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "The Lunar System",
    title: "Ninety-six",
    accent: "configurations.",
    variant: "serif",
    supporting: "Eight phases across twelve signs. Every day sits somewhere on this grid \u2014 find yours, live it, move on."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "0.75rem",
      flexWrap: "wrap",
      margin: "2.5rem 0 2rem"
    }
  }, MOON_PHASES.map(p => /*#__PURE__*/React.createElement("div", {
    key: p,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      color: "var(--mt-ivory)"
    }
  }, /*#__PURE__*/React.createElement(MoonPhaseGlyph, {
    phase: p,
    size: 20
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "0.68rem",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "hsl(var(--foreground) / 0.6)"
    }
  }, phaseLabels[p])))), /*#__PURE__*/React.createElement(Card, {
    style: {
      overflowX: "auto",
      padding: "1.25rem"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      borderCollapse: "collapse",
      width: "100%",
      minWidth: "760px"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: {
      position: "sticky",
      left: 0,
      background: "hsl(var(--card))",
      textAlign: "left",
      padding: "0.6rem 0.8rem",
      fontFamily: "var(--font-mono)",
      fontSize: "0.62rem",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: "var(--mt-muted-fg)"
    }
  }, "Sign / Phase"), MOON_PHASES.map(p => /*#__PURE__*/React.createElement("th", {
    key: p,
    style: {
      padding: "0.6rem",
      color: "var(--mt-ivory)"
    }
  }, /*#__PURE__*/React.createElement(MoonPhaseGlyph, {
    phase: p,
    size: 18
  }))))), /*#__PURE__*/React.createElement("tbody", null, signs.map((s, i) => /*#__PURE__*/React.createElement("tr", {
    key: s
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      position: "sticky",
      left: 0,
      background: "hsl(var(--card))",
      padding: "0.5rem 0.8rem",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: elementOf(i)
  }, s)), MOON_PHASES.map(p => {
    const active = s === "Scorpio" && p === "waxing-gibbous";
    return /*#__PURE__*/React.createElement("td", {
      key: p,
      style: {
        textAlign: "center",
        padding: "0.4rem"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-block",
        width: "1.5rem",
        height: "1.5rem",
        borderRadius: "var(--radius-sm)",
        background: active ? "var(--mt-teal)" : "hsl(var(--foreground) / 0.05)",
        boxShadow: active ? "0 0 14px hsl(168 75% 45% / 0.5)" : "none"
      }
    }));
  })))))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "0.75rem",
      color: "var(--mt-muted-fg)",
      marginTop: "1rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      width: "0.9rem",
      height: "0.9rem",
      borderRadius: "3px",
      background: "var(--mt-teal)"
    }
  }), " Today's configuration \u2014 Waxing Gibbous in Scorpio."));
}
window.LunarSystemScreen = LunarSystemScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/moontuner-web/LunarSystemScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/moontuner-web/MethodScreen.jsx
try { (() => {
// Moontuner web — Method (the Phasecraft framework)
function MethodScreen() {
  const {
    SectionHeading,
    Card,
    Eyebrow,
    Badge,
    Button
  } = window.MoontunerDesignSystem_322301;
  const arcs = [["Arc I", "Intention", "New → Crescent", "Name the seed. Choose one thing, in the dark, before there's proof.", "../../assets/illustrations/new_moon_ritual.png"], ["Arc II", "Momentum", "First Quarter → Gibbous", "Push through the first resistance. Refine what's almost working.", "../../assets/illustrations/waxing_moon_movement.png"], ["Arc III", "Culmination", "Full → Disseminating", "Harvest and share. See it in full light; give the surplus away.", "../../assets/illustrations/moon_conductor.png"], ["Arc IV", "Release", "Last Quarter → Balsamic", "Compost what's done. Rest is part of the method, not a lapse.", "../../assets/illustrations/shadow_work.png"]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "1080px",
      margin: "0 auto",
      padding: "clamp(3rem,7vw,5rem) 1.5rem 6rem"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "The Method",
    title: "Phasecraft, in four",
    accent: "arcs.",
    variant: "serif",
    supporting: "One cycle, four movements. The method is small enough to keep and specific enough to work."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))",
      gap: "1.25rem",
      marginTop: "2.5rem"
    }
  }, arcs.map(([arc, title, range, body, img]) => /*#__PURE__*/React.createElement(Card, {
    key: arc,
    interactive: true,
    style: {
      padding: 0,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: img,
    alt: title,
    style: {
      display: "block",
      width: "100%",
      aspectRatio: "4/3",
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "1.5rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "var(--mt-teal)"
  }, arc), /*#__PURE__*/React.createElement(Badge, {
    tone: "gold",
    outline: true
  }, range)), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "1.4rem",
      color: "var(--mt-ivory)",
      margin: "0 0 0.6rem"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "0.9rem",
      lineHeight: 1.6,
      color: "hsl(var(--foreground) / 0.66)",
      margin: 0
    }
  }, body))))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: "3rem"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg"
  }, "Start the 14-day arc")));
}
window.MethodScreen = MethodScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/moontuner-web/MethodScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/moontuner-web/Nav.jsx
try { (() => {
// Moontuner web — top navigation bar
function Nav({
  route,
  setRoute
}) {
  const {
    Button
  } = window.MoontunerDesignSystem_322301;
  const links = [["home", "Home"], ["today", "Today"], ["system", "The Lunar System"], ["method", "Method"]];
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1rem 1.5rem",
      background: "hsl(0 0% 4% / 0.6)",
      backdropFilter: "blur(16px)",
      borderBottom: "1px solid hsl(var(--border) / 0.6)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setRoute("home"),
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.7rem",
      background: "none",
      border: "none",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/moonkey-icon.png",
    alt: "Moontuner",
    style: {
      width: 30,
      height: 30,
      filter: "invert(1)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontWeight: 600,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      fontSize: "0.8rem",
      color: "var(--mt-ivory)"
    }
  }, "Moontuner")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.35rem"
    }
  }, links.map(([id, label]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => setRoute(id),
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "0.72rem",
      fontWeight: 500,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      cursor: "pointer",
      background: "none",
      border: "none",
      padding: "0.5rem 0.75rem",
      color: route === id ? "var(--mt-teal)" : "hsl(var(--foreground) / 0.6)",
      transition: "color 0.3s ease"
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "outline",
    onClick: () => setRoute("today")
  }, "Enter"))));
}
window.Nav = Nav;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/moontuner-web/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/moontuner-web/TodayScreen.jsx
try { (() => {
// Moontuner web — Today's Directive (daily home surface)
function TodayScreen() {
  const {
    Eyebrow,
    Card,
    Button,
    Badge,
    StatBlock,
    MoonPhaseGlyph,
    LivePill
  } = window.MoontunerDesignSystem_322301;
  const [done, setDone] = React.useState(false);
  const steps = [["Name it", "Write the one thing that wants refining right now. Specific beats poetic."], ["Tune it", "Play the 211 Hz Scorpio tone for four slow breaths. Let the pitch find your chest."], ["Release it", "Close the loop. One small action toward the thing, before the sign changes."]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "560px",
      margin: "0 auto",
      padding: "clamp(2.5rem,6vw,4rem) 1.5rem 6rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "2.25rem"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Tuesday \xB7 30 June"), /*#__PURE__*/React.createElement(LivePill, null, "Live")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 200,
      letterSpacing: "-0.03em",
      lineHeight: 0.95,
      fontSize: "clamp(3.5rem,14vw,5rem)",
      color: "var(--mt-ivory)",
      margin: "0 0 0.5rem"
    }
  }, "Refine."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "1.1rem",
      lineHeight: 1.5,
      color: "hsl(var(--foreground) / 0.7)",
      margin: "0 0 2rem"
    }
  }, "The Gibbous moon in Scorpio asks you to sharpen, not start. Trim what's almost-there."), /*#__PURE__*/React.createElement(Card, {
    style: {
      marginBottom: "1rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "1rem",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "3rem",
      height: "3rem",
      borderRadius: "50%",
      border: "1px solid hsl(168 75% 45% / 0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      color: "var(--mt-teal)"
    }
  }, /*#__PURE__*/React.createElement(MoonPhaseGlyph, {
    phase: "waxing-gibbous",
    size: 26,
    glow: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "0.5rem",
      marginBottom: "0.6rem",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "teal"
  }, "Waxing Gibbous"), /*#__PURE__*/React.createElement(Badge, {
    tone: "water"
  }, "Scorpio \xB7 Water")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "0.9rem",
      lineHeight: 1.6,
      color: "hsl(var(--foreground) / 0.68)",
      margin: 0
    }
  }, "Fixed water. Depth over speed. Ruled by Pluto \u2014 expect intensity, use it."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "2rem",
      marginTop: "1.5rem",
      paddingTop: "1.25rem",
      borderTop: "1px solid hsl(var(--border))"
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    label: "Illumination",
    value: "96.2",
    unit: "%",
    accent: true
  }), /*#__PURE__*/React.createElement(StatBlock, {
    label: "Next Phase",
    value: "4d 11h"
  }))), /*#__PURE__*/React.createElement(Card, {
    accentRule: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "1.5rem"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "var(--mt-gold)"
  }, "Today's Ritual \xB7 6 min")), steps.map(([t, d], i) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: "flex",
      gap: "0.9rem",
      marginBottom: "1.1rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-editorial)",
      fontStyle: "italic",
      fontSize: "1.15rem",
      color: "var(--mt-gold)",
      lineHeight: 1,
      flexShrink: 0
    }
  }, i + 1), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-ui)",
      fontWeight: 600,
      fontSize: "0.9rem",
      color: "var(--mt-ivory)",
      margin: "0 0 0.2rem"
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "0.875rem",
      lineHeight: 1.55,
      color: "hsl(var(--foreground) / 0.62)",
      margin: 0
    }
  }, d)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "1.5rem"
    }
  }, done ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-editorial)",
      fontStyle: "italic",
      fontSize: "1.1rem",
      color: "var(--mt-teal)",
      margin: 0
    }
  }, "Marked complete. Same time tomorrow.") : /*#__PURE__*/React.createElement(Button, {
    variant: "teal",
    onClick: () => setDone(true)
  }, "Mark complete"))));
}
window.TodayScreen = TodayScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/moontuner-web/TodayScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.LivePill = __ds_scope.LivePill;

__ds_ns.EmailCapture = __ds_scope.EmailCapture;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.LunarStatusCard = __ds_scope.LunarStatusCard;

__ds_ns.MoonPhaseGlyph = __ds_scope.MoonPhaseGlyph;

__ds_ns.MOON_PHASES = __ds_scope.MOON_PHASES;

__ds_ns.PhaseStrip = __ds_scope.PhaseStrip;

})();
