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

// Preload other key assets including PESU MC and PESU Forge backgrounds
const otherAssets = import.meta.glob('./assets/{avatar,thanasos-mac,contour-dark,contour-light,pesumc-hero,pesumc-backdrop,pesumc-icon,pesumc-features,pesuforge-bg,hero-bg,resume-preview,dark-clouds}.png', { eager: true, import: 'default' }) as Record<string, string>;
Object.values(otherAssets).forEach((src) => {
  const img = new Image();
  img.src = src;
});

// Preload globe GeoJSON data for Spheal page and cache it globally
const globeDataPromise = fetch('https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json')
  .then(res => res.json())
  .catch(() => null);

// Store on window so SphealDetail can use the cached data
(window as any).__globeDataPromise = globeDataPromise;

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <App />
  </ThemeProvider>,
);
