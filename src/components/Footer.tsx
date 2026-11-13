import { Link } from "react-router-dom";
import { FOOTER_COLUMNS, type NavItem } from "@/data/siteNav";

function FooterLink({ link }: { link: NavItem }) {
  const cls = "text-sm text-muted-foreground hover:text-foreground transition-colors";
  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {link.label}
    </a>
  ) : (
    <Link to={link.href} className={cls}>
      {link.label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="py-16 lg:py-24 border-t border-border/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <picture>
                <source srcSet="/moonkey-logo.webp" type="image/webp" />
                <img
                  src="/moonkey-logo.png"
                  alt="Moontuner logo"
                  className="w-8 h-8 rounded-sm object-contain"
                  width="32"
                  height="32"
                />
              </picture>
              <span className="font-sans text-sm font-medium tracking-[0.2em] text-foreground uppercase">
                Moontuner
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
              A timing system for people tired of forcing life out of rhythm.
            </p>
            <p className="text-xs text-muted-foreground/60">
              © {new Date().getFullYear()} Moontuner. All rights reserved.
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h4 className="system-label mb-6">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Partners */}
        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col items-center gap-6">
          <p className="text-xs text-muted-foreground/60 uppercase tracking-widest">Powered by</p>
          <a
            href="https://elevenlabs.io/startup-grants"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-border/50 bg-card/50 px-6 py-4 transition-opacity duration-500 hover:opacity-100"
          >
            <img
              src="https://eleven-public-cdn.elevenlabs.io/payloadcms/cy7rxce8uki-IIElevenLabsGrants%201.webp"
              alt="ElevenLabs Grants"
              className="w-[250px] max-w-full"
              loading="lazy"
              width="250"
              height="60"
            />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border/30">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="status-dot" />
              <span className="system-label">Photon Flux Active</span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://buymeacoffee.com/michaelantq"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Support the Work
              </a>
              <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
