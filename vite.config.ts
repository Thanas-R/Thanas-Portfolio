import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from "@prerenderer/rollup-plugin";
import { projectIds } from "./src/data/projectsMeta";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode !== "development" &&
    !process.env.VERCEL &&

prerender({
      routes: [
        "/",
        "/projects",
        "/blogs",
        "/resume",
        ...projectIds.map((id) => `/projects/${id}`),
      ],
      renderer: "@prerenderer/renderer-puppeteer",
      rendererOptions: {
        renderAfterTime: 2500,
        headless: true,
        maxConcurrentRoutes: 2,
        launchOptions: {
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        },
      },
      postProcess(rendered: { route: string; html: string }) {
        // Strip noscript fallback now that real prerendered markup is in place
        rendered.html = rendered.html.replace(/<noscript>[\s\S]*?<\/noscript>/g, "");
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
