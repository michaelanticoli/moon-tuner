import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import ViteSitemap from "vite-plugin-sitemap";
import fs from "fs";

/**
 * Pin the Supabase project to the one committed in `.env`.
 *
 * The site is built by more than one host (Hostinger serves moontuner.xyz,
 * Netlify and Lovable keep mirrors). Vite lets a host's own environment
 * variables override `.env`, and hosts were left pointing at old projects
 * (one deleted, one with no edge functions), which broke chart and symphony
 * generation with "Failed to send a request" / "Requested function not found".
 * Every edge function, the database and auth live in the `.env` project, so
 * the build always uses it. The anon/publishable key is public by design.
 * The optional secondary project is cleared so it falls back to the primary.
 */
function pinnedSupabaseEnv(): Record<string, string> {
  const file = path.resolve(__dirname, ".env");
  if (!fs.existsSync(file)) return {};
  const values: Record<string, string> = {};
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*(VITE_SUPABASE_[A-Z_]+)\s*=\s*"?([^"\r\n]*)"?\s*$/);
    if (match) values[match[1]] = match[2];
  }
  if (!values.VITE_SUPABASE_URL) return {};
  const define: Record<string, string> = {};
  for (const [key, value] of Object.entries(values)) {
    define[`import.meta.env.${key}`] = JSON.stringify(value);
  }
  for (const key of [
    "VITE_SECONDARY_SUPABASE_URL",
    "VITE_SECONDARY_SUPABASE_PUBLISHABLE_KEY",
  ]) {
    define[`import.meta.env.${key}`] = JSON.stringify("");
  }
  return define;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  define: pinnedSupabaseEnv(),
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    ViteSitemap({
      hostname: "https://moontuner.xyz",
      dynamicRoutes: [
        // "/" is added by the plugin automatically
        "/classic",
        "/v3",
        "/today",
        "/about",
        "/philosophy",
        "/lunar-system",
        "/moon-phase-today",
        "/workbooks",
        "/lunar-chaperone",
        "/lunar-cipher",
        "/lunar-reports",
        "/free-guide",
        "/links",
        "/offerings",
        "/journal",
        "/studio",
        "/harmonic-profile",
        "/quantumelodic",
        "/digital-smudging",
        "/phasecraft",
        "/rites",
        "/school",
        "/school/curriculum",
        "/membership",
        "/terms",
        "/privacy",
      ],
    }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
