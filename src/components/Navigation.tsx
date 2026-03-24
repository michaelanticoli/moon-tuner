import { useState } from "react";
import { X } from "lucide-react";
import moontunerLogo from "@/assets/moontuner-logo.png";

const navLinks = [
  { label: "LUNAR SYSTEM", href: "/lunar-system" },
  { label: "SCHOOL", href: "/school" },
  { label: "SESSIONS", href: "/sessions" },
  { label: "CHAPERONE", href: "/workbooks" },
  { label: "PHASECRAFT", href: "/method" },
  { label: "CIPHER", href: "/lunar-cipher" },
  { label: "LUNAR REPORTS", href: "/lunar-reports" },
  { label: "MANIFESTO", href: "/manifesto" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo with Moontuner Icon */}
          <a href="/" className="flex items-center gap-3">
            <img 
              src={moontunerLogo} 
              alt="Moontuner" 
              className="w-8 h-8 lg:w-10 lg:h-10 object-contain"
            />
            <span className="font-sans text-sm lg:text-base font-medium tracking-[0.2em] text-foreground uppercase">
              Moontuner
            </span>
          </a>

          {/* Desktop Navigation - pushed right */}
          <div className="hidden lg:flex items-center gap-8">
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

          {/* Hamburger Menu (mobile only) */}
          <div className="flex items-center">
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}