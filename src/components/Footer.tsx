import moontunerLogo from "@/assets/moontuner-logo.png";

const footerLinks = {
  explore: [
    { label: "Chaperone", href: "/workbooks" },
    { label: "Phasecraft", href: "/method" },
    { label: "Reports", href: "/app" },
    { label: "Cipher", href: "/the-moon" },
  ],
  resources: [
    { label: "Journal", href: "/#journal" },
    { label: "Tools", href: "/#tools" },
    { label: "Pocket Guide", href: "/#pocket-guide" },
  ],
  connect: [
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
    { label: "Newsletter", href: "/#newsletter" },
  ],
};

export function Footer() {
  return (
    <footer className="py-16 lg:py-24 border-t border-border/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={moontunerLogo} 
                alt="Moontuner" 
                className="w-8 h-8 object-contain"
              />
              <span className="font-sans text-sm font-medium tracking-[0.2em] text-foreground uppercase">
                Moontuner
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
              Integrated Lunar Operating System. 
              Navigate the moonlit spectrum.
            </p>
            <p className="text-xs text-muted-foreground/60">
              © {new Date().getFullYear()} Moontuner. All rights reserved.
            </p>
          </div>

          {/* Spectral Channels */}
          <div>
            <h4 className="system-label mb-6">
              Spectral Channels
            </h4>
            <ul className="space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="system-label mb-6">
              Resources
            </h4>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="system-label mb-6">
              Connect
            </h4>
            <ul className="space-y-4">
              {footerLinks.connect.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Partners */}
        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col items-center gap-6">
          <a
            href="https://elevenlabs.io/startup-grants"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-60 hover:opacity-100 transition-opacity duration-500"
          >
            <img
              src="https://eleven-public-cdn.elevenlabs.io/payloadcms/pwsc4vchsqt-ElevenLabsGrants.webp"
              alt="ElevenLabs Startup Grant"
              className="w-40 sm:w-48"
              loading="lazy"
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
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}