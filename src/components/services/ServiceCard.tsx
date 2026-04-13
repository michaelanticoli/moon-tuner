interface ServiceCardProps {
  tier?: string;
  title: string;
  titleItalic?: string;
  price: string;
  priceNote?: string;
  description: string;
  includes?: string[];
  accentColor?: string;
  children?: React.ReactNode;
  badge?: string;
  gradient?: string;
}

export function ServiceCard({
  tier,
  title,
  titleItalic,
  price,
  priceNote,
  description,
  includes,
  accentColor = "accent",
  children,
  badge,
  gradient,
}: ServiceCardProps) {
  const borderHover = `hover:border-${accentColor}/35`;
  const dotColor = `bg-${accentColor}`;

  return (
    <article
      className={`bg-card border border-border rounded-sm overflow-hidden group transition-colors duration-400 animate-fade-in ${borderHover}`}
      style={gradient ? { background: gradient } : undefined}
    >
      <div
        className="h-0.5 w-full"
        style={{
          background: `linear-gradient(to right, hsl(var(--${accentColor})), transparent)`,
        }}
      />
      <div className="p-8 sm:p-10 lg:px-11 lg:py-10 relative">
        {badge && (
          <div className="inline-flex items-center gap-[7px] text-[10px] font-normal tracking-[0.15em] uppercase text-muted-foreground mb-5">
            <span className="w-[5px] h-[5px] rounded-full bg-gold animate-pulse" />
            {badge}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-6 mb-7">
          <div>
            {tier && (
              <p className="text-[9px] font-medium tracking-[0.4em] uppercase text-muted-foreground/50 mb-2">
                {tier}
              </p>
            )}
            <h2 className="font-serif text-[22px] sm:text-[28px] font-normal text-foreground leading-[1.2]">
              {title}
              {titleItalic && (
                <>
                  <br />
                  <em className="italic">{titleItalic}</em>
                </>
              )}
            </h2>
          </div>
          <div className="sm:text-right flex-shrink-0">
            <span className="font-serif text-[28px] font-normal text-gold leading-none block">
              {price}
            </span>
            {priceNote && (
              <span className="text-[10px] text-muted-foreground tracking-[0.1em] block mt-1">
                {priceNote}
              </span>
            )}
          </div>
        </div>

        <div className="w-full h-px bg-border my-6" />

        <p className="text-[14.5px] text-muted-foreground leading-[1.8] mb-7">
          {description}
        </p>

        {includes && includes.length > 0 && (
          <>
            <p className="text-[9px] font-medium tracking-[0.35em] uppercase text-muted-foreground/50 mb-3.5">
              What's included
            </p>
            <ul className="list-none mb-9 flex flex-col gap-2.5">
              {includes.map((item) => (
                <li
                  key={item}
                  className="text-[13.5px] text-muted-foreground flex items-start gap-3"
                >
                  <span
                    className={`w-1 h-1 rounded-full ${dotColor} flex-shrink-0 mt-[7px]`}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}

        {children}
      </div>
    </article>
  );
}
