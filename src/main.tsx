import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initNative } from "./lib/native";

// Recover from stale chunk references after a new deploy.
// When the bundle hashes change, cached HTML/JS may try to preload
// CSS/JS files that no longer exist — reload once to grab fresh assets.
const RELOAD_FLAG = "__mt_chunk_reload_at";
const RELOAD_COOLDOWN_MS = 10_000;
function handleChunkError(message: string) {
  if (!/Unable to preload (CSS|JS)|Failed to fetch dynamically imported module|Loading chunk \S+ failed|error loading dynamically imported module/i.test(message)) {
    return;
  }
  const last = Number(sessionStorage.getItem(RELOAD_FLAG) || 0);
  if (Date.now() - last < RELOAD_COOLDOWN_MS) return;
  sessionStorage.setItem(RELOAD_FLAG, String(Date.now()));
  window.location.reload();
}
window.addEventListener("error", (e) => handleChunkError(e.message || ""));
window.addEventListener("unhandledrejection", (e) => {
  const msg = e.reason?.message || String(e.reason || "");
  handleChunkError(msg);
});

createRoot(document.getElementById("root")!).render(<App />);

initNative();

// Register the service worker after the page is loaded so it never competes
// with the critical render path. Only runs in production builds.
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .catch((err) => console.warn("[sw] registration failed", err));
  });
}

