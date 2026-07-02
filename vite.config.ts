import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
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
