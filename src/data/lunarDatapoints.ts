import { supabase } from "@/integrations/supabase/client";
import {
  Eclipse, Repeat, Moon, Sparkles, Link2, MoonStar, ScrollText, Telescope,
  type LucideIcon,
} from "lucide-react";

export const DATAPOINT_CATEGORIES: Record<string, { label: string; description: string; icon: LucideIcon }> = {
  saros: { label: "Saros Cycles", description: "The 18-year eclipse return pattern", icon: Eclipse },
  metonic: { label: "Metonic Cycles", description: "The 19-year lunar-solar harmony", icon: Repeat },
  synodic: { label: "Synodic Month", description: "The 29.53-day lunation cycle", icon: Moon },
  planetary: { label: "Planetary Returns", description: "Venus, Mars, Mercury & Jupiter synodic periods", icon: Sparkles },
  nodal: { label: "Nodal Cycles", description: "Draconic months & eclipse nodes", icon: Link2 },
  eclipse: { label: "Eclipse Patterns", description: "Periodicity, Inex cycles & umbral geometry", icon: MoonStar },
  historical: { label: "Historical Astronomy", description: "Babylonian, Greek & Mayan observations", icon: ScrollText },
  general: { label: "General", description: "Other astronomical facts", icon: Telescope },
} as const;

export type DatapointCategory = keyof typeof DATAPOINT_CATEGORIES;

export interface LunarDatapoint {
  id: string;
  datapoint: string;
  category: string;
  cardinal_values: string | null;
  relevance: number;
  source_url: string | null;
  tags: string[];
  created_at: string;
}

export async function fetchDatapoints(options?: {
  category?: string;
  limit?: number;
  minRelevance?: number;
}): Promise<LunarDatapoint[]> {
  let query = supabase
    .from("lunar_datapoints")
    .select("*")
    .order("relevance", { ascending: false })
    .limit(options?.limit || 50);

  if (options?.category) {
    query = query.eq("category", options.category);
  }
  if (options?.minRelevance) {
    query = query.gte("relevance", options.minRelevance);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching datapoints:", error);
    return [];
  }
  return (data || []) as LunarDatapoint[];
}

export async function fetchDatapointsByCategories(): Promise<Record<string, LunarDatapoint[]>> {
  const { data, error } = await supabase
    .from("lunar_datapoints")
    .select("*")
    .order("relevance", { ascending: false })
    .limit(500);

  if (error || !data) return {};

  const grouped: Record<string, LunarDatapoint[]> = {};
  for (const dp of data as LunarDatapoint[]) {
    if (!grouped[dp.category]) grouped[dp.category] = [];
    grouped[dp.category].push(dp);
  }
  return grouped;
}

export async function generateCycleInsight(category?: string, contextHint?: string): Promise<{
  insight: string;
  sources: string[];
}> {
  const { data, error } = await supabase.functions.invoke("generate-cycle-insight", {
    body: { category, context_hint: contextHint },
  });

  if (error) {
    console.error("Error generating insight:", error);
    return { insight: "Unable to generate cycle insight at this time.", sources: [] };
  }
  return { insight: data.insight, sources: data.sources || [] };
}
