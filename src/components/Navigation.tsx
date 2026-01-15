import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "LUNAR SYSTEM", href: "/lunar-system" },
  { label: "CHAPERONE", href: "/workbooks" },
  { label: "PHASECRAFT", href: "/method" },
  { label: "MANIFESTO", href: "/manifesto" },
  { label: "PHILOSOPHY", href: "/philosophy" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo with Moon Icon */}
          <a href="/" className="flex items-center gap-3">
            <div className="relative">
              <svg
                className="w-6 h-6 text-foreground"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </div>
            <span className="font-sans text-sm lg:text-base font-medium tracking-[0.2em] text-foreground uppercase">
              Moontuner
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-[0.15em]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Status Badge & Hamburger */}
          <div className="flex items-center gap-4">
            {/* Status Badge */}
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50">
              <span className="status-dot animate-status-pulse" />
              <span className="font-sans text-xs uppercase tracking-[0.15em] text-foreground">
                System Active
              </span>
            </div>

            {/* Hamburger Menu */}
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <div className="flex flex-col gap-1.5">
                  <span className="w-5 h-px bg-foreground" />
                  <span className="w-5 h-px bg-foreground" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-8 border-t border-border/30 animate-fade-in">
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-sans text-sm font-medium text-muted-foreground hover:text-foreground transition-colors tracking-[0.15em]"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-2 pt-4">
                <span className="status-dot animate-status-pulse" />
                <span className="font-sans text-xs uppercase tracking-[0.15em] text-foreground">
                  System Active
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}