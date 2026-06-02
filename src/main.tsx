import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initNative } from "./lib/native";

// Recover from stale chunk references after a new deploy.
// When the bundle hashes change, cached HTML/JS may try to preload
// CSS/JS files that no longer exist — reload once to grab fresh assets.
const RELOAD_FLAG = "__mt_chunk_reload";
function handleChunkError(message: string) {
  if (!/Unable to preload (CSS|JS)|Failed to fetch dynamically imported module|Loading chunk \d+ failed/i.test(message)) {
    return;
  }
  if (sessionStorage.getItem(RELOAD_FLAG)) return;
  sessionStorage.setItem(RELOAD_FLAG, "1");
  window.location.reload();
}
window.addEventListener("error", (e) => handleChunkError(e.message || ""));
window.addEventListener("unhandledrejection", (e) => {
  const msg = e.reason?.message || String(e.reason || "");
  handleChunkError(msg);
});
window.addEventListener("load", () => {
  // Clear the flag once a fresh load succeeds.
  setTimeout(() => sessionStorage.removeItem(RELOAD_FLAG), 2000);
});

createRoot(document.getElementById("root")!).render(<App />);

initNative();
