import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Image } from "lucide-react";
import { contentAssets, type ContentAsset } from "@/content/assets";

function assetIcon(type: ContentAsset["type"]) {
  if (type === "image") return <Image className="w-5 h-5" />;
  if (type === "pdf") return <Download className="w-5 h-5" />;
  return <ExternalLink className="w-5 h-5" />;
}

function AssetCard({ asset }: { asset: ContentAsset }) {
  return (
    <div className="border border-white/10 rounded-xl p-6 flex flex-col gap-4 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 text-white/40">{assetIcon(asset.type)}</span>
        <div>
          <h3 className="text-base font-medium text-white/90 leading-snug">
            {asset.title}
          </h3>
          {asset.description && (
            <p className="mt-1 text-sm text-white/50">{asset.description}</p>
          )}
        </div>
      </div>

      <div className="flex gap-2 mt-auto">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="border-white/20 text-white/70 hover:text-white hover:border-white/40"
        >
          <a href={asset.href} target="_blank" rel="noopener noreferrer">
            {asset.type === "image" ? (
              <>
                <Image className="w-4 h-4 mr-1.5" />
                View
              </>
            ) : (
              <>
                <ExternalLink className="w-4 h-4 mr-1.5" />
                Open
              </>
            )}
          </a>
        </Button>

        {asset.type === "pdf" && (
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-white/50 hover:text-white"
          >
            <a href={asset.href} download>
              <Download className="w-4 h-4 mr-1.5" />
              Download
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}

const categories: { key: string; label: string }[] = [
  { key: "workbooks", label: "Workbooks" },
  { key: "chaperone", label: "Lunar Chaperone" },
];

const Resources = () => {
  return (
    <PageTransition>
      <Navigation />
      <main className="min-h-screen bg-background pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-serif text-white/90 mb-3">
              Resources
            </h1>
            <p className="text-white/50 max-w-xl mx-auto">
              Downloadable guides, workbooks, and reference materials for your
              lunar practice.
            </p>
          </header>

          {categories.map(({ key, label }) => {
            const items = contentAssets.filter((a) => a.category === key);
            if (items.length === 0) return null;
            return (
              <section key={key} className="mb-10">
                <h2 className="text-sm uppercase tracking-widest text-white/40 mb-4">
                  {label}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {items.map((asset) => (
                    <AssetCard key={asset.slug} asset={asset} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Resources;
