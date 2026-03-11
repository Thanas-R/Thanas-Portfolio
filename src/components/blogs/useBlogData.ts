import { useState, useEffect } from 'react';

export interface BlogArticle {
  id: string;
  headline: string;
  subheadline: string;
  excerpt: string;
  column: number;
  jpLabel?: string;
}

export const blogArticles: BlogArticle[] = [
  {
    id: 'building-pesu-forge',
    headline: 'The Genesis of PESU Forge',
    subheadline: 'How a Study Tool Became My First Step Into Development',
    excerpt: 'It started with a simple idea: what if notes could teach you back? PESU Forge was the project that introduced me to building with AI, and it changed the trajectory of my development journey forever.',
    column: 1,
    jpLabel: '起源',
  },
  {
    id: 'designing-for-delight',
    headline: 'Designing for Delight',
    subheadline: 'On Crafting Interfaces That Feel Alive',
    excerpt: 'From glassmorphism to procedural animations, I explore the philosophy behind making web experiences that surprise and engage users beyond mere functionality.',
    column: 2,
    jpLabel: 'デザイン',
  },
  {
    id: 'ai-in-the-browser',
    headline: 'AI in the Browser',
    subheadline: 'Lessons from Integrating Language Models Into Web Apps',
    excerpt: 'A candid look at the challenges of bringing AI-powered features into client-side applications — from prompt engineering to managing user expectations.',
    column: 3,
    jpLabel: '人工知能',
  },
  {
    id: 'the-craft-of-maps',
    headline: 'The Craft of Maps',
    subheadline: 'Building Virdis & the World of Geospatial Data',
    excerpt: 'Satellite imagery, vegetation indices, and farm boundaries — how I built a precision agriculture platform that turns Earth observation data into actionable insights.',
    column: 1,
    jpLabel: '地図',
  },
  {
    id: 'from-thanasos-to-contour',
    headline: 'From ThanasOS to Contour Flow',
    subheadline: "The Evolution of a Developer's Portfolio",
    excerpt: "Every developer's portfolio tells a story. Mine went from a macOS desktop simulator to procedural topographic art. Here's what I learned along the way.",
    column: 2,
    jpLabel: '進化',
  },
];

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
  const monthStr = today.toLocaleDateString('en-US', { month: 'long' });
  const dateStr = `${dayName}, ${monthStr} ${today.getDate()}, ${today.getFullYear()}`;

  const publishedCount = 0;

  useEffect(() => {
    const loadWeather = async () => {
      try {
        // Use preloaded data from main.tsx
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

  return { weather, dateStr, publishedCount, blogArticles };
}
