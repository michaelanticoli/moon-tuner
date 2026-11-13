import { Navigation } from "@/components/Navigation";

/**
 * DuskNav used to be a separate, shorter menu for the homepage and a few
 * editorial pages, which meant visitors saw two different navigations
 * depending on where they landed. It now renders the single site-wide
 * Navigation so the four doors (Phasecraft, Lunar Chaperone, Symphony,
 * Reports) are in the same place on every page. Kept as an alias so the
 * pages that import it don't need to change.
 */
export function DuskNav() {
  return <Navigation />;
}
