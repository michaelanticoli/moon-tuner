import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import ViteSitemap from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    ViteSitemap({
      hostname: "https://www.moontuner.xyz",
      dynamicRoutes: [
        "/",
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
        "/offerings",
        "/journal",
        "/studio",
        "/harmonic-profile",
        "/quantumelodic",
        "/digital-smudging",
        "/phasecraft",
        "/rites",
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
