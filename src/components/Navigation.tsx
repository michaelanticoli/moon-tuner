import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import './Navigation.css';

// ─── Nav data ──────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href: string;
  desc: string;
  external?: boolean;
}

interface NavGroupData {
  label: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroupData[] = [
  {
    label: 'The Method',
    items: [
      { label: 'Lunar System', href: '/lunar-system', desc: 'The full framework' },
      { label: 'The Method', href: '/method', desc: 'How the system works' },
      { label: 'Philosophy', href: '/philosophy', desc: 'The thinking behind it' },
      { label: 'The Moon', href: '/the-moon', desc: 'Lunar fundamentals' },
    ],
  },
  {
    label: 'Learn',
    items: [
      { label: 'School', href: '/school', desc: 'Structured learning' },
      { label: 'Quantumelodic', href: '/quantumelodic', desc: 'Sound + lunar theory' },
      { label: 'Blog', href: 'https://moontuner.ghost.io', desc: 'Articles & essays', external: true },
    ],
  },
  {
    label: 'Tools',
    items: [
      { label: 'Moon Phase Today', href: '/moon-phase-today', desc: 'Live lunar tracker' },
      { label: 'Lunar Cipher', href: '/lunar-cipher', desc: 'Decode your chart' },
      { label: 'App', href: '/app', desc: 'Full lunar toolkit' },
    ],
  },
  {
    label: 'Products',
    items: [
      { label: 'Workbooks', href: '/workbooks', desc: 'Guided practice' },
      { label: 'Lunar Reports', href: '/lunar-reports', desc: 'Personal readings' },
      { label: 'Lunar Chaperone', href: '/lunar-chaperone', desc: 'Monthly guidance' },
    ],
  },
  {
    label: 'Work with Me',
    items: [
      { label: 'Services', href: '/services', desc: 'What I offer' },
      { label: 'Sessions', href: '/sessions', desc: '1:1 consultations' },
    ],
  },
];

function Chevron({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2 3.5 L5 6.5 L8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── NavGroup (desktop) ────────────────────────────────────────────────────

function NavGroup({
  group,
  isOpen,
  onEnter,
  onLeave,
}: {
  group: NavGroupData;
  isOpen: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      className={`mn-group${isOpen ? ' is-open' : ''}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <button className="mn-trigger" aria-expanded={isOpen} aria-haspopup="menu">
        {group.label}
        <Chevron className="mn-chevron" />
      </button>

      <div className="mn-drop" role="menu">
        {group.items.map((item) =>
          item.external ? (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mn-drop-link"
              role="menuitem"
            >
              <span className="mn-drop-label">{item.label}</span>
              <span className="mn-drop-desc">{item.desc}</span>
            </a>
          ) : (
            <Link key={item.href} to={item.href} className="mn-drop-link" role="menuitem">
              <span className="mn-drop-label">{item.label}</span>
              <span className="mn-drop-desc">{item.desc}</span>
            </Link>
          )
        )}
      </div>
    </div>
  );
}

// ─── MobileGroup (accordion) ──────────────────────────────────────────────

function MobileGroup({
  group,
  isOpen,
  onToggle,
  onNavigate,
}: {
  group: NavGroupData;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <div className={`mn-mob-group${isOpen ? ' is-open' : ''}`}>
      <button className="mn-mob-header" onClick={onToggle}>
        {group.label}
        <Chevron className="mn-mob-chevron" />
      </button>

      <div className="mn-mob-items">
        {group.items.map((item) =>
          item.external ? (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mn-mob-link"
              onClick={onNavigate}
            >
              <span className="mn-mob-link-label">{item.label}</span>
              <span className="mn-mob-link-desc">{item.desc}</span>
            </a>
          ) : (
            <Link key={item.href} to={item.href} className="mn-mob-link" onClick={onNavigate}>
              <span className="mn-mob-link-label">{item.label}</span>
              <span className="mn-mob-link-desc">{item.desc}</span>
            </Link>
          )
        )}
      </div>
    </div>
  );
}

// ─── Navigation (main export) ──────────────────────────────────────────────

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobGroup, setOpenMobGroup] = useState<string | null>(null);
  const { user, loading } = useAuth();
  const navRef = useRef<HTMLElement>(null);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Click-outside to close desktop dropdowns
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Escape closes everything
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenMobGroup(null);
  };

  const ctaLabel = !loading && user ? 'Dashboard' : 'Services';
  const ctaHref = !loading && user ? '/dashboard' : '/services';

  return (
    <>
      <header ref={navRef} role="banner">
        <nav className={`mn-nav${scrolled ? ' is-scrolled' : ''}`} aria-label="Main navigation">
          {/* Logo */}
          <Link to="/" className="mn-logo" aria-label="Moontuner home">
            <span className="mn-logo-word">MOON</span>
            <img src="/moontuner-logo.svg" alt="" className="mn-logo-mark" aria-hidden="true" />
            <span className="mn-logo-word">TUNER</span>
          </Link>

          {/* Desktop groups */}
          <div className="mn-items" role="menubar">
            {NAV_GROUPS.map((group) => (
              <NavGroup
                key={group.label}
                group={group}
                isOpen={openGroup === group.label}
                onEnter={() => setOpenGroup(group.label)}
                onLeave={() => setOpenGroup(null)}
              />
            ))}
          </div>

          {/* Persistent CTA */}
          <Link to={ctaHref} className="mn-cta">
            {ctaLabel} ↗
          </Link>

          {/* Hamburger */}
          <button
            className={`mn-burger${mobileOpen ? ' is-open' : ''}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mn-mobile-menu"
            aria-label="Toggle navigation menu"
          >
            <span className="mn-burger-line" />
            <span className="mn-burger-line" />
            <span className="mn-burger-line" />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        id="mn-mobile-menu"
        className={`mn-mobile${mobileOpen ? ' is-open' : ''}`}
        aria-hidden={!mobileOpen}
        role="dialog"
        aria-label="Mobile navigation"
      >
        {NAV_GROUPS.map((group) => (
          <MobileGroup
            key={group.label}
            group={group}
            isOpen={openMobGroup === group.label}
            onToggle={() =>
              setOpenMobGroup((v) => (v === group.label ? null : group.label))
            }
            onNavigate={closeMobile}
          />
        ))}

        <Link to={ctaHref} className="mn-mob-cta" onClick={closeMobile}>
          {ctaLabel} ↗
        </Link>
      </div>
    </>
  );
}
