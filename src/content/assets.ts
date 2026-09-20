export type ContentAssetType = "pdf" | "html" | "image";

export interface ContentAsset {
  slug: string;
  title: string;
  type: ContentAssetType;
  href: string;
  description?: string;
  category?: string;
}

export const contentAssets: ContentAsset[] = [
  {
    slug: "lunar-workbook",
    title: "Lunar Workbook",
    type: "pdf",
    href: "/content/lunar-workbook.pdf",
    description: "Printable lunar workbook for cycle tracking and reflection.",
    category: "workbooks",
  },
  {
    slug: "lunar-workbook-print",
    title: "Lunar Workbook (Print Edition)",
    type: "html",
    href: "/content/lunar-workbook-print.html",
    description: "Print-optimised HTML edition of the Lunar Workbook.",
    category: "workbooks",
  },
  {
    slug: "lunar-chaperone-book",
    title: "Moontuner's Lunar Chaperone",
    type: "html",
    href: "/content/chaperone/lunar-chaperone-book.html",
    description:
      "The five-page Chaperone edition: a companion, not a forecast — twenty-six half-cycles.",
    category: "chaperone",
  },
  {
    slug: "lunar-chaperone-book-pdf",
    title: "Moontuner's Lunar Chaperone (PDF)",
    type: "pdf",
    href: "/content/chaperone/lunar-chaperone-book.pdf",
    description: "Print-ready PDF of the Lunar Chaperone edition.",
    category: "chaperone",
  },
  {
    slug: "lunar-calendar-2026",
    title: "2026 Lunar Calendar",
    type: "html",
    href: "/content/chaperone/lunar-calendar-2026.html",
    description:
      "Monthly calendar with real 2026 moon-phase data and key lunations.",
    category: "workbooks",
  },
  {
    slug: "lunar-calendar-2026-print",
    title: "2026 Lunar Calendar (Print Edition)",
    type: "html",
    href: "/content/chaperone/lunar-calendar-2026-print.html",
    description: "Print-optimised layout of the 2026 Lunar Calendar.",
    category: "workbooks",
  },
  {
    slug: "lunar-chaperone-archive",
    title: "Lunar Chaperone Archive",
    type: "html",
    href: "/content/lunar-chaperone-archive.html",
    description: "Full-length Lunar Chaperone reference document.",
    category: "chaperone",
  },
  {
    slug: "lunar-chaperone-social-selection",
    title: "Lunar Chaperone — Social Selection",
    type: "image",
    href: "/content/lunar-chaperone-social-selection.png",
    description: "Social-share graphic for the Lunar Chaperone programme.",
    category: "chaperone",
  },
];
