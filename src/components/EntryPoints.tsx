import { Button } from "@/components/ui/button";
import { BookOpen, Smartphone, FileText } from "lucide-react";

interface EntryPoint {
  icon: typeof BookOpen;
  title: string;
  description: string;
  cta: string;
  href: string;
  featured: boolean;
  download?: boolean;
}

const entryPoints: EntryPoint[] = [
  {
    icon: BookOpen,
    title: "26-Workbook Evergreen Series",
    description: "Stop chasing peaks. Start walking the path. Complete lunar chaperone support for every archetypal journey—with you every single day.",
    cta: "Explore the Series",
    href: "/workbooks",
    featured: true,
  },
  {
    icon: FileText,
    title: "The Lunar Chaperone Campaign",
    description: "Integration over inspiration. Never walk alone again. Learn why path walkers transform while peak chasers stagnate.",
    cta: "Learn the Philosophy",
    href: "/lunar-chaperone",
    featured: false,
  },
  {
    icon: Smartphone,
    title: "The Moon You Move With",
    description: "Goal tracking synced to lunar phases. Energy check-ins, reflection loops, and phase-aware nudges—no streaks.",
    cta: "Join Waitlist",
    href: "/app",
    featured: false,
  },
];

export function EntryPoints() {
  return (
    <section id="workbooks" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 lg:mb-24">
          <span className="inline-block text-xs uppercase tracking-ultra text-accent font-medium mb-4">
            Begin Your Practice
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground mb-6">
            Soft entry points
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Choose your path into lunar alignment. Each tool designed to meet you where you are.
          </p>
        </div>

        {/* Entry Points Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {entryPoints.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`group relative rounded-xl p-8 lg:p-10 transition-all duration-500 ${
                  item.featured
                    ? "bg-primary text-primary-foreground lg:scale-105 shadow-xl"
                    : "bg-card border border-border/50 hover:border-accent/50 hover:shadow-lg"
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${
                    item.featured
                      ? "bg-primary-foreground/10"
                      : "bg-accent/10"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      item.featured ? "text-primary-foreground" : "text-accent"
                    }`}
                  />
                </div>

                {/* Content */}
                <h3
                  className={`font-serif text-xl lg:text-2xl font-medium mb-3 ${
                    item.featured ? "text-primary-foreground" : "text-foreground"
                  }`}
                >
                  {item.title}
                </h3>

                <p
                  className={`text-sm leading-relaxed mb-8 ${
                    item.featured
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.description}
                </p>

                {/* CTA */}
                {item.download ? (
                  <a 
                    href={item.href} 
                    download
                    className="block w-full"
                  >
                    <Button
                      variant={item.featured ? "secondary" : "gold-outline"}
                      size="lg"
                      className="w-full"
                    >
                      {item.cta}
                    </Button>
                  </a>
                ) : (
                  <Button
                    variant={item.featured ? "secondary" : "gold-outline"}
                    size="lg"
                    className="w-full"
                    onClick={() => window.location.href = item.href}
                  >
                    {item.cta}
                  </Button>
                )}

                {/* Featured Badge */}
                {item.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-block bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
