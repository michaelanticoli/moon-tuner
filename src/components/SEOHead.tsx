import { useEffect } from "react";

const BASE_URL = "https://moontuner.xyz";
const DEFAULT_OG_IMAGE = `${BASE_URL}/moonkey-logo.png`;

interface ArticleMeta {
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  author?: string;
}

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  article?: ArticleMeta;
  jsonLd?: object;
  keywords?: string[];
}

/** Set or update a <meta> tag by name or property attribute. */
function setMeta(
  key: string,
  content: string,
  attribute: "name" | "property" = "name"
) {
  let el = document.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribute, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Resolve a path-or-absolute URL to an absolute URL. */
function toAbsolute(url: string) {
  return url.startsWith("http") ? url : `${BASE_URL}${url}`;
}

/**
 * SEOHead — per-page SEO management for the Moontuner SPA.
 *
 * Imperatively updates document.title, meta description, Open Graph,
 * Twitter Card, canonical link, and optional JSON-LD structured data on
 * every render.  Works in any SPA where pages are client-side rendered.
 */
export function SEOHead({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  article,
  jsonLd,
  keywords,
}: SEOHeadProps) {
  useEffect(() => {
    // ── Title ────────────────────────────────────────────────────────────
    document.title = title;

    // ── Core meta ────────────────────────────────────────────────────────
    setMeta("description", description);
    if (keywords?.length) setMeta("keywords", keywords.join(", "));

    // ── Canonical ────────────────────────────────────────────────────────
    const canonicalHref = canonical ? toAbsolute(canonical) : BASE_URL;
    let linkEl = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (!linkEl) {
      linkEl = document.createElement("link");
      linkEl.rel = "canonical";
      document.head.appendChild(linkEl);
    }
    linkEl.href = canonicalHref;

    // ── Open Graph ───────────────────────────────────────────────────────
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:image", toAbsolute(ogImage), "property");
    setMeta("og:type", ogType, "property");
    setMeta("og:url", canonicalHref, "property");
    setMeta("og:site_name", "Moontuner", "property");

    // ── Twitter Card ─────────────────────────────────────────────────────
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", toAbsolute(ogImage));

    // ── Article meta (for journal entries / essays) ───────────────────────
    if (article) {
      if (article.publishedTime)
        setMeta("article:published_time", article.publishedTime, "property");
      if (article.modifiedTime)
        setMeta("article:modified_time", article.modifiedTime, "property");
      if (article.author)
        setMeta("article:author", article.author, "property");
      if (article.tags) {
        // Remove old tag metas then add fresh ones
        document
          .querySelectorAll('meta[property="article:tag"]')
          .forEach((el) => el.remove());
        article.tags.forEach((tag) => {
          const m = document.createElement("meta");
          m.setAttribute("property", "article:tag");
          m.setAttribute("content", tag);
          document.head.appendChild(m);
        });
      }
    }

    // ── JSON-LD ───────────────────────────────────────────────────────────
    const LD_ID = "moontuner-jsonld";
    let ldScript = document.getElementById(LD_ID) as HTMLScriptElement | null;
    if (jsonLd) {
      if (!ldScript) {
        ldScript = document.createElement("script");
        ldScript.id = LD_ID;
        ldScript.type = "application/ld+json";
        document.head.appendChild(ldScript);
      }
      ldScript.textContent = JSON.stringify(jsonLd);
    } else if (ldScript) {
      ldScript.remove();
    }
  }, [title, description, canonical, ogImage, ogType, article, jsonLd, keywords]);

  return null;
}

// ─── Pre-built JSON-LD helpers ─────────────────────────────────────────────────

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Moontuner",
    url: BASE_URL,
    description:
      "A reflective operating system for emotionally intelligent people navigating modern life.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/journal?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function articleSchema({
  title,
  description,
  url,
  publishedTime,
  modifiedTime,
  tags,
  image = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description: string;
  url: string;
  publishedTime: string;
  modifiedTime?: string;
  tags?: string[];
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: toAbsolute(image),
    url: toAbsolute(url),
    datePublished: publishedTime,
    ...(modifiedTime ? { dateModified: modifiedTime } : {}),
    author: {
      "@type": "Organization",
      name: "Moontuner",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Moontuner",
      url: BASE_URL,
    },
    ...(tags?.length ? { keywords: tags.join(", ") } : {}),
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: toAbsolute(item.url),
    })),
  };
}
