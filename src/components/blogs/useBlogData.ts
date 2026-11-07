import { useState, useEffect } from 'react';

/**
 * Automatically bundle all images in src/assets so they work in production.
 */
const assetImages = import.meta.glob<string>(
  '/src/assets/**/*.{png,jpg,jpeg,webp,svg,gif}',
  { eager: true, import: 'default' }
);

/**
 * Resolves markdown image paths:
 * - If from src/assets (e.g. "/src/assets/thanasos-mac.webp" or "thanasos-mac.webp"), returns the bundled URL
 * - If from public (e.g. "/images/wtc.png"), returns the path directly
 * - If external (http/https), returns as-is
 */
export function resolveBlogImage(src?: string): string | undefined {
  if (!src) return undefined;
  if (src.startsWith('http://') || src.startsWith('https://')) return src;

  // Clean path for lookup
  const clean = src.replace(/^\.?\//, '').replace(/^src\//, '');

  for (const [bundledPath, url] of Object.entries(assetImages)) {
    if (bundledPath.endsWith(clean) || bundledPath.includes(clean)) {
      return url;
    }
  }

  // Fallback to public folder path (e.g. /images/wtc.png)
  return src.startsWith('/') ? src : `/${src}`;
}

const mdFiles = import.meta.glob('/src/content/blogs/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export interface BlogArticle {
  id: string;
  headline: string;
  subheadline: string;
  excerpt: string;
  image?: string;
  column: number;
  jpLabel?: string;
  date: string;
  content: string;
}

function parseMarkdown(src: string, path: string): BlogArticle | null {
  const slug = (path.split('/').pop() ?? 'post').replace(/\.md$/, '');

  const match = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return null;
  const meta: Record<string, string> = {};
  const body = src.slice(match[0].length);
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx > -1) {
      const key = line.slice(0, idx).trim();
      const value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
      if (key) meta[key] = value;
    }
  }

  return {
    id: slug,
    headline: meta.title ?? slug,
    subheadline: meta.subheadline ?? '',
    excerpt: meta.excerpt ?? '',
    column: Number.parseInt(meta.column ?? '1', 10) || 1,
    jpLabel: meta.jpLabel,
    image: resolveBlogImage(meta.image),
    date: meta.date ?? '',
    content: body.trim(),
  };
}

export const blogArticles: BlogArticle[] = Object.entries(mdFiles)
  .map(([path, src]) => parseMarkdown(src, path))
  .filter((a): a is BlogArticle => a !== null)
  .sort((a, b) => b.date.localeCompare(a.date));

export interface WeatherData {
  temp: number;
  desc: string;
  wind: number;
  humidity: number;
}

function parseWeatherCode(code: number): string {
  if (code === 0) return 'Clear';
  if (code >= 1 && code <= 3) return 'Partly Cloudy';
  if (code >= 45 && code <= 48) return 'Foggy';
  if (code >= 51 && code <= 67) return 'Light Rain';
  if (code >= 80 && code <= 82) return 'Showers';
  if (code >= 95) return 'Thunderstorms';
  return 'Clear';
}

export function useBlogData() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const today = new Date();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayName = dayNames[today.getDay()];
  const monthFull = today.toLocaleDateString('en-US', { month: 'long' });
  const monthShort = today.toLocaleDateString('en-US', { month: 'short' });
  const dateStr = `${dayName}, ${monthFull} ${today.getDate()}, ${today.getFullYear()}`;
  const dateStrMobile = `${dayName}, ${monthShort} ${today.getDate()}, ${today.getFullYear()}`;

  const publishedCount = blogArticles.length;

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const data = await (window as any).__weatherDataPromise;
        if (data?.current) {
          setWeather({
            temp: Math.round(data.current.temperature_2m),
            desc: parseWeatherCode(data.current.weather_code),
            wind: Math.round(data.current.wind_speed_10m || 7),
            humidity: Math.round(data.current.relative_humidity_2m || 80),
          });
        } else {
          setWeather({ temp: 28, desc: 'Sunny', wind: 7, humidity: 80 });
        }
      } catch {
        setWeather({ temp: 28, desc: 'Sunny', wind: 7, humidity: 80 });
      }
    };
    loadWeather();
  }, []);

  return { weather, dateStr, dateStrMobile, publishedCount, blogArticles };
}
