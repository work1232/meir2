import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { AuthProvider } from "@/auth/AuthProvider";

// Build stamp for diagnosing stale caches ("which version am I running?").
console.info("site build:", __BUILD_ID__);
(window as unknown as Record<string, unknown>).__BUILD_ID__ = __BUILD_ID__;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LanguageProvider>
  </StrictMode>
);
