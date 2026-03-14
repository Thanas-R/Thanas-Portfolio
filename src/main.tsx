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
const otherAssets = import.meta.glob('./assets/{avatar,thanasos-mac,contour-dark,contour-light,pesumc-hero,pesumc-backdrop,pesumc-icon,pesuforge-bg,hero-bg,resume-preview}.png', { eager: true, import: 'default' }) as Record<string, string>;

// Preload avatar with high priority so it's ready before loader finishes
const avatarSrc = Object.entries(otherAssets).find(([k]) => k.includes('avatar'))?.[1];
if (avatarSrc) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = avatarSrc;
  document.head.appendChild(link);
}
Object.values(otherAssets).forEach((src) => {
  const img = new Image();
  img.src = src;
});

// Preload globe GeoJSON data for Spheal page and cache it globally
const globeDataPromise = fetch('https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json')
  .then((res) => (res.ok ? res.json() : null))
  .catch(() => null);

const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
  const [x, y] = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
};

const pointInFeature = (point: [number, number], feature: any): boolean => {
  const geometry = feature.geometry;

  if (geometry.type === 'Polygon') {
    if (!pointInPolygon(point, geometry.coordinates[0])) return false;
    for (let i = 1; i < geometry.coordinates.length; i++) {
      if (pointInPolygon(point, geometry.coordinates[i])) return false;
    }
    return true;
  }

  if (geometry.type === 'MultiPolygon') {
    for (const polygon of geometry.coordinates) {
      if (pointInPolygon(point, polygon[0])) {
        let inHole = false;
        for (let i = 1; i < polygon.length; i++) {
          if (pointInPolygon(point, polygon[i])) {
            inHole = true;
            break;
          }
        }
        if (!inHole) return true;
      }
    }
  }

  return false;
};

const buildSphealDots = (landFeatures: any) => {
  const dots: Array<{ lng: number; lat: number }> = [];
  const step = 16 * 0.08;

  landFeatures.features.forEach((feature: any) => {
    const coordinates = feature.geometry?.coordinates;
    if (!coordinates) return;

    let minLng = 180;
    let minLat = 90;
    let maxLng = -180;
    let maxLat = -90;

    const visitCoordinates = (coordSet: any) => {
      if (typeof coordSet[0] === 'number') {
        const [lng, lat] = coordSet as [number, number];
        minLng = Math.min(minLng, lng);
        minLat = Math.min(minLat, lat);
        maxLng = Math.max(maxLng, lng);
        maxLat = Math.max(maxLat, lat);
        return;
      }
      coordSet.forEach(visitCoordinates);
    };

    visitCoordinates(coordinates);

    for (let lng = minLng; lng <= maxLng; lng += step) {
      for (let lat = minLat; lat <= maxLat; lat += step) {
        if (pointInFeature([lng, lat], feature)) {
          dots.push({ lng, lat });
        }
      }
    }
  });

  return dots;
};

const globeDotsPromise = globeDataPromise
  .then((landFeatures) => {
    if (!landFeatures?.features) return null;

    return new Promise<Array<{ lng: number; lat: number }> | null>((resolve) => {
      const run = () => {
        try {
          resolve(buildSphealDots(landFeatures));
        } catch {
          resolve(null);
        }
      };

      const idleCallback = (window as any).requestIdleCallback as
        | ((cb: () => void, options?: { timeout?: number }) => void)
        | undefined;

      if (idleCallback) {
        idleCallback(run, { timeout: 1400 });
      } else {
        setTimeout(run, 0);
      }
    });
  })
  .catch(() => null);

// Store globally so Spheal can use fully cached globe + dot data
(window as any).__globeDataPromise = globeDataPromise;
(window as any).__sphealDotsPromise = globeDotsPromise;

// Preload Bengaluru weather data for blogs page so it's instant on navigation
const weatherDataPromise = fetch(
  'https://api.open-meteo.com/v1/forecast?latitude=12.9716&longitude=77.5946&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&timezone=Asia/Kolkata'
)
  .then(res => res.json())
  .catch(() => null);

(window as any).__weatherDataPromise = weatherDataPromise;

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <App />
  </ThemeProvider>,
);
