import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "next-themes";

// Eagerly preload all project images so they're cached before navigation
const imageModules = import.meta.glob('./assets/project-*.png', { eager: true, import: 'default' }) as Record<string, string>;
Object.values(imageModules).forEach((src) => {
  const img = new Image();
  img.src = src;
});

// Preload other key assets
const otherAssets = import.meta.glob('./assets/{avatar,thanasos-mac,contour-dark,contour-light,pesumc-hero,pesumc-backdrop,pesumc-icon,pesuforge-bg,hero-bg}.png', { eager: true, import: 'default' }) as Record<string, string>;
Object.values(otherAssets).forEach((src) => {
  const img = new Image();
  img.src = src;
});

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <App />
  </ThemeProvider>,
);
