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
