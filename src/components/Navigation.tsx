import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { NAV_GROUPS, currentGroupKey, activeHref, type NavGroup, type NavItem } from '@/data/siteNav';
import './Navigation.css';

/**
 * Site-wide navigation. Every page renders this (DuskNav is a thin alias),
 * so the four doors — Phasecraft, Lunar Chaperone, Symphony, Reports — sit in
 * the same place everywhere. Menu contents live in src/data/siteNav.ts.
 *
 * Desktop: hover opens a group for mouse users; click/tap/Enter toggles it for
 * touch and keyboard users. Mobile: full-screen accordion.
 */

function Chevron({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2 3.5 L5 6.5 L8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ItemLink({
  item,
  className,
  active,
  onNavigate,
  children,
}: {
  item: NavItem;
  className: string;
  active: boolean;
  onNavigate?: () => void;
  children: React.ReactNode;
}) {
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onNavigate}>
        {children}
      </a>
    );
  }
  return (
    <Link
      to={item.href}
      className={`${className}${active ? ' is-active' : ''}`}
      aria-current={active ? 'page' : undefined}
      onClick={onNavigate}
    >
      {children}
    </Link>
  );
}

// ─── NavGroup (desktop) ────────────────────────────────────────────────────

function DesktopGroup({
  group,
  isOpen,
  isCurrent,
  pathname,
  onOpen,
  onClose,
  onToggle,
}: {
  group: NavGroup;
  isOpen: boolean;
  isCurrent: boolean;
  pathname: string;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}) {
  const lastPointer = useRef<string>('');
  const dropId = `mn-drop-${group.key}`;
  const current = activeHref(group.items, pathname);

  return (
    <div
      className={`mn-group${isOpen ? ' is-open' : ''}${isCurrent ? ' is-current' : ''}`}
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') onOpen();
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') onClose();
      }}
      onBlur={(e) => {
        // Close when keyboard focus leaves the group entirely.
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onClose();
      }}
    >
      <button
        type="button"
        className="mn-trigger"
        aria-expanded={isOpen}
        aria-controls={dropId}
        onPointerDown={(e) => {
          lastPointer.current = e.pointerType;
        }}
        onClick={(e) => {
          // A mouse already opened this on hover; a click shouldn't slam it shut.
          if (e.detail > 0 && lastPointer.current === 'mouse') {
            onOpen();
            return;
          }
          onToggle();
        }}
      >
        {group.label}
        <Chevron className="mn-chevron" />
      </button>

      <div className="mn-drop" id={dropId}>
        {group.items.map((item) => (
          <ItemLink key={item.href} item={item} className="mn-drop-link" active={item.href === current} onNavigate={onClose}>
            <span className="mn-drop-label">{item.label}</span>
            <span className="mn-drop-desc">{item.desc}</span>
          </ItemLink>
        ))}
      </div>
    </div>
  );
}

// ─── MobileGroup (accordion) ──────────────────────────────────────────────

function MobileGroup({
  group,
  isOpen,
  isCurrent,
  pathname,
  onToggle,
  onNavigate,
}: {
  group: NavGroup;
  isOpen: boolean;
  isCurrent: boolean;
  pathname: string;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const panelId = `mn-mob-${group.key}`;
  const current = activeHref(group.items, pathname);
  return (
    <div className={`mn-mob-group${isOpen ? ' is-open' : ''}${isCurrent ? ' is-current' : ''}`}>
      <button
        type="button"
        className="mn-mob-header"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        {group.label}
        <Chevron className="mn-mob-chevron" />
      </button>

      <div className="mn-mob-items" id={panelId} hidden={!isOpen}>
        {group.items.map((item) => (
          <ItemLink key={item.href} item={item} className="mn-mob-link" active={item.href === current} onNavigate={onNavigate}>
            <span className="mn-mob-link-label">{item.label}</span>
            <span className="mn-mob-link-desc">{item.desc}</span>
          </ItemLink>
        ))}
      </div>
    </div>
  );
}

// ─── Navigation (main export) ──────────────────────────────────────────────

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const current = currentGroupKey(pathname);
  const [openMobGroup, setOpenMobGroup] = useState<string | null>(current);
  const { user, loading } = useAuth();
  const navRef = useRef<HTMLElement>(null);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close everything on route change.
  useEffect(() => {
    setOpenGroup(null);
    setMobileOpen(false);
    setOpenMobGroup(currentGroupKey(pathname));
  }, [pathname]);

  // Click/tap outside closes desktop dropdowns
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
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
  };

  const signedIn = !loading && !!user;
  const ctaLabel = signedIn ? 'Dashboard' : 'Start Here';
  const ctaHref = signedIn ? '/dashboard' : '/start';

  return (
    <>
      <header ref={navRef}>
        <nav className={`mn-nav${scrolled || mobileOpen ? ' is-scrolled' : ''}`} aria-label="Main navigation">
          {/* Logo */}
          <Link to="/" className="mn-logo" aria-label="Moontuner home">
            <picture>
              <source srcSet="/moonkey-logo.webp" type="image/webp" />
              <img src="/moonkey-logo.png" alt="" className="mn-logo-mark" width="42" height="42" />
            </picture>
            <span className="mn-wordmark">Moontuner</span>
          </Link>

          {/* Desktop groups */}
          <div className="mn-items">
            {NAV_GROUPS.map((group) => (
              <DesktopGroup
                key={group.key}
                group={group}
                isOpen={openGroup === group.key}
                isCurrent={current === group.key}
                pathname={pathname}
                onOpen={() => setOpenGroup(group.key)}
                onClose={() => setOpenGroup((v) => (v === group.key ? null : v))}
                onToggle={() => setOpenGroup((v) => (v === group.key ? null : group.key))}
              />
            ))}
          </div>

          {/* Account + persistent CTA */}
          {!signedIn && (
            <Link to="/auth" className="mn-signin">
              Sign in
            </Link>
          )}
          <Link to={ctaHref} className="mn-cta">
            {ctaLabel}
          </Link>

          {/* Hamburger */}
          <button
            type="button"
            className={`mn-burger${mobileOpen ? ' is-open' : ''}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mn-mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
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
        aria-label="Site menu"
      >
        {NAV_GROUPS.map((group) => (
          <MobileGroup
            key={group.key}
            group={group}
            isOpen={openMobGroup === group.key}
            isCurrent={current === group.key}
            pathname={pathname}
            onToggle={() => setOpenMobGroup((v) => (v === group.key ? null : group.key))}
            onNavigate={closeMobile}
          />
        ))}

        <Link to={ctaHref} className="mn-mob-cta" onClick={closeMobile}>
          {ctaLabel}
        </Link>
        {!signedIn && (
          <Link to="/auth" className="mn-mob-signin" onClick={closeMobile}>
            Sign in
          </Link>
        )}
      </div>
    </>
  );
}
