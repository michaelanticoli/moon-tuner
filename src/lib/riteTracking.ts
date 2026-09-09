import { supabase } from "@/integrations/supabase/client";

export type RiteAction = "download" | "view";

/**
 * Fire-and-forget log of a rite PDF view/download. Never throws and never
 * blocks the download itself.
 */
export function logRiteAction(slug: string, asset: string, action: RiteAction) {
  void (async () => {
    try {
      const { data } = await supabase.auth.getSession();
      await supabase.from("rite_downloads").insert({
        slug: slug.slice(0, 120),
        asset: asset.slice(0, 300),
        action,
        user_id: data.session?.user?.id ?? null,
      });
    } catch {
      /* logging must never interrupt the user */
    }
  })();
}

export interface RiteDownloadStat {
  slug: string;
  total: number;
  last30: number;
  downloads: number;
  views: number;
}

export async function fetchRiteStats(): Promise<RiteDownloadStat[]> {
  const { data, error } = await supabase
    .from("rite_downloads")
    .select("slug, action, created_at")
    .order("created_at", { ascending: false })
    .limit(5000);

  if (error || !data) return [];

  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const map = new Map<string, RiteDownloadStat>();

  for (const row of data as { slug: string; action: string; created_at: string }[]) {
    const stat =
      map.get(row.slug) ??
      { slug: row.slug, total: 0, last30: 0, downloads: 0, views: 0 };
    stat.total += 1;
    if (new Date(row.created_at).getTime() >= cutoff) stat.last30 += 1;
    if (row.action === "view") stat.views += 1;
    else stat.downloads += 1;
    map.set(row.slug, stat);
  }

  return [...map.values()].sort((a, b) => b.total - a.total);
}
