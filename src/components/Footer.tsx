const footerLinks = {
  explore: [
    { label: "The Moon", href: "#moon" },
    { label: "Method", href: "#method" },
    { label: "Workbooks", href: "#workbooks" },
    { label: "Pocket Guide", href: "#pocket-guide" },
    { label: "App", href: "#app" },
  ],
  resources: [
    { label: "Journal", href: "#journal" },
    { label: "Tools", href: "#tools" },
    { label: "Related Journeys", href: "#journeys" },
  ],
  connect: [
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
    { label: "Newsletter", href: "#newsletter" },
  ],
};

export function Footer() {
  return (
    <footer className="py-16 lg:py-24 border-t border-border/50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
              MOONTUNER
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
              A lunar alignment system for living in phase. 
              The moon is not telling you what to do—it is helping you hear yourself more clearly.
            </p>
            <p className="text-xs text-muted-foreground/60">
              © {new Date().getFullYear()} Moontuner. All rights reserved.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs uppercase tracking-ultra text-foreground font-medium mb-4">
              Explore
            </h4>
            <ul className="space-y-3">
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
            <h4 className="text-xs uppercase tracking-ultra text-foreground font-medium mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
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
            <h4 className="text-xs uppercase tracking-ultra text-foreground font-medium mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
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

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/30">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground/60">
              Alignment is practiced, not achieved.
            </p>
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
