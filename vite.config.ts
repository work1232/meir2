import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  // Build stamp — printed to the console so we can instantly tell whether a
  // device is running the latest deploy or a stale cached bundle.
  define: {
    __BUILD_ID__: JSON.stringify(new Date().toISOString().slice(0, 16)),
  },
  // Honor a PORT assigned by the environment (falls back to Vite's default).
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Ensure a single copy of React (fixes "Invalid hook call" from
    // pre-bundled libraries such as @splinetool/react-spline).
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: ["react", "react-dom", "@splinetool/react-spline", "@splinetool/runtime"],
  },
});
