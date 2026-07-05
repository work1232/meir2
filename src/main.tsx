import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { AuthProvider } from "@/auth/AuthProvider";

// Build stamp for diagnosing stale caches ("which version am I running?").
console.info("site build:", __BUILD_ID__);
(window as unknown as Record<string, unknown>).__BUILD_ID__ = __BUILD_ID__;

// Debug helper: "?motion" in the URL bypasses prefers-reduced-motion so the
// full 3D-journey effects can be verified even on machines that force
// reduced motion. Harmless in production.
if (new URLSearchParams(window.location.search).has("motion")) {
  const orig = window.matchMedia.bind(window);
  window.matchMedia = (query: string): MediaQueryList => {
    const mql = orig(query);
    if (/prefers-reduced-motion/.test(query)) {
      return {
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      } as unknown as MediaQueryList;
    }
    return mql;
  };
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LanguageProvider>
  </StrictMode>
);
