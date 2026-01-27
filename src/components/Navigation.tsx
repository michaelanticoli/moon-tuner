import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import moontunerLogo from "@/assets/moontuner-logo.png";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { label: "LUNAR SYSTEM", href: "/lunar-system" },
  { label: "CHAPERONE", href: "/workbooks" },
  { label: "PHASECRAFT", href: "/method" },
  { label: "CIPHER", href: "/lunar-cipher" },
  { label: "REPORTS", href: "/lunar-reports" },
  { label: "MANIFESTO", href: "/manifesto" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useAuth();

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

          {/* Auth & Status Badge */}
          <div className="flex items-center gap-4">
            {/* Auth Button - Desktop */}
            {!loading && (
              <div className="hidden lg:block">
                {user ? (
                  <Link to="/dashboard">
                    <Button variant="outline" size="sm" className="gap-2">
                      <User className="w-4 h-4" />
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link to="/auth">
                    <Button variant="gold" size="sm" className="gap-2">
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            )}

            {/* Illumination Status */}
            <div className="hidden xl:flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50">
              <span className="status-dot animate-status-pulse" />
              <span className="font-sans text-xs uppercase tracking-[0.15em] text-foreground">
                Receiving Light
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

              {/* Auth Link - Mobile */}
              {!loading && (
                <div className="pt-4 border-t border-border/30">
                  {user ? (
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 font-sans text-sm font-medium text-accent hover:text-foreground transition-colors tracking-[0.15em]"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      DASHBOARD
                    </Link>
                  ) : (
                    <Link
                      to="/auth"
                      className="flex items-center gap-2 font-sans text-sm font-medium text-accent hover:text-foreground transition-colors tracking-[0.15em]"
                      onClick={() => setIsOpen(false)}
                    >
                      <LogIn className="w-4 h-4" />
                      SIGN IN
                    </Link>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2 pt-4">
                <span className="status-dot animate-status-pulse" />
                <span className="font-sans text-xs uppercase tracking-[0.15em] text-foreground">
                  Receiving Light
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}