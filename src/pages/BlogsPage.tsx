import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

const blogArticles = [
  {
    id: 'building-pesu-forge',
    headline: 'The Genesis of PESU Forge',
    subheadline: 'How a Study Tool Became My First Step Into Development',
    excerpt: 'It started with a simple idea: what if notes could teach you back? PESU Forge was the project that introduced me to building with AI, and it changed the trajectory of my development journey forever.',
    column: 1
  },
  {
    id: 'designing-for-delight',
    headline: 'Designing for Delight',
    subheadline: 'On Crafting Interfaces That Feel Alive',
    excerpt: 'From glassmorphism to procedural animations, I explore the philosophy behind making web experiences that surprise and engage users beyond mere functionality.',
    column: 2
  },
  {
    id: 'ai-in-the-browser',
    headline: 'AI in the Browser',
    subheadline: 'Lessons from Integrating Language Models Into Web Apps',
    excerpt: 'A candid look at the challenges of bringing AI-powered features into client-side applications — from prompt engineering to managing user expectations.',
    column: 3
  },
  {
    id: 'the-craft-of-maps',
    headline: 'The Craft of Maps',
    subheadline: 'Building Virdis & the World of Geospatial Data',
    excerpt: 'Satellite imagery, vegetation indices, and farm boundaries — how I built a precision agriculture platform that turns Earth observation data into actionable insights.',
    column: 1
  },
  {
    id: 'from-thanasos-to-contour',
    headline: 'From ThanasOS to Contour Flow',
    subheadline: "The Evolution of a Developer's Portfolio",
    excerpt: "Every developer's portfolio tells a story. Mine went from a macOS desktop simulator to procedural topographic art. Here's what I learned along the way.",
    column: 2
  }
];

interface WeatherData {
  temp: number;
  humidity: number;
  windSpeed: number;
  windDir: string;
  description: string;
}

const BlogsPage = () => {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const blogCount = blogArticles.length;

  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    // Fetch Bengaluru weather from Open-Meteo
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=12.9716&longitude=77.5946&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code&timezone=Asia/Kolkata'
        );
        const data = await res.json();
        const current = data.current;
        const windDeg = current.wind_direction_10m;
        const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        const dirIndex = Math.round(windDeg / 22.5) % 16;

        // Simple weather code to description
        const code = current.weather_code;
        let desc = 'Clear Skies';
        if (code >= 1 && code <= 3) desc = 'Partly Cloudy';
        if (code >= 45 && code <= 48) desc = 'Foggy';
        if (code >= 51 && code <= 67) desc = 'Light Rain';
        if (code >= 71 && code <= 77) desc = 'Snowy';
        if (code >= 80 && code <= 82) desc = 'Rain Showers';
        if (code >= 95) desc = 'Thunderstorms';

        setWeather({
          temp: Math.round(current.temperature_2m),
          humidity: current.relative_humidity_2m,
          windSpeed: Math.round(current.wind_speed_10m),
          windDir: dirs[dirIndex],
          description: desc,
        });
      } catch {
        setWeather({
          temp: 28,
          humidity: 65,
          windSpeed: 12,
          windDir: 'SSE',
          description: 'Plenty of Sunshine',
        });
      }
    };
    fetchWeather();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9f7f1', color: '#2f2f2f' }}>
      {/* Navbar — forced dark (white text) for visibility on light newspaper bg */}
      <div className="relative z-50">
        <Navbar forceDark={false} />
      </div>

      {/* Newspaper Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center pt-6 px-6 relative"
      >
        <div className="max-w-5xl mx-auto relative">
          {/* Weather forecast box — desktop only, positioned at left */}
          {weather && (
            <div
              className="hidden lg:block absolute left-0 top-0 -translate-x-4"
              style={{
                border: '3px double #2f2f2f',
                padding: '10px 15px',
                lineHeight: '20px',
                fontFamily: "'Droid Serif', 'Georgia', serif",
                fontSize: '12px',
                fontStyle: 'italic',
                maxWidth: '220px',
                backgroundColor: '#f9f7f1',
                zIndex: 10,
              }}
            >
              <span style={{ fontStyle: 'italic' }}>
                Weatherforecast for the next 24 hours: {weather.description}
              </span>
              <br />
              <span style={{ fontStyle: 'normal' }}>
                Wind: {weather.windSpeed}km/h {weather.windDir}; Ther: {weather.temp}°C; Hum: {weather.humidity}%
              </span>
            </div>
          )}

          <header
            className="inline-block leading-[0.9] mb-3"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: 'clamp(48px, 10vw, 80px)',
              textTransform: 'uppercase',
              color: '#2f2f2f'
            }}
          >
            Thanas Blogs
          </header>
        </div>

        {/* Subhead — full width borders with small gap at edges */}
        <div
          className="py-3 px-4 mx-4"
          style={{
            borderTop: '2px solid #2f2f2f',
            borderBottom: '2px solid #2f2f2f',
            textTransform: 'uppercase',
            fontFamily: "'Playfair Display', serif",
            fontSize: '12px',
            letterSpacing: '2px'
          }}
        >
          Bengaluru, India — {dateStr} — {blogCount} {blogCount === 1 ? 'Blog' : 'Blogs'}
        </div>
      </motion.div>

      {/* Articles in newspaper columns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-5xl mx-auto px-6 py-10"
      >
        {/* Coming Soon overlay */}
        <div className="relative">
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div
              className="px-10 py-6 text-center"
              style={{
                backgroundColor: '#f9f7f1',
                border: '3px double #2f2f2f',
                fontFamily: "'Playfair Display', serif"
              }}
            >
              <p className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#2f2f2f' }}>
                Coming Soon
              </p>
              <p className="text-sm italic" style={{ color: '#666', fontFamily: "'Droid Serif', 'Georgia', serif" }}>
                The press is warming up. Articles are being drafted.
              </p>
            </div>
          </div>

          {/* Greyed out articles preview */}
          <div className="opacity-30 pointer-events-none select-none">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {[0, 1, 2].map((colIdx) => (
                <div
                  key={colIdx}
                  className="px-4"
                  style={{
                    borderLeft: colIdx > 0 ? '1px solid #2f2f2f' : 'none'
                  }}
                >
                  {blogArticles
                    .filter((a) => a.column === colIdx + 1)
                    .map((article, i) => (
                      <article key={article.id} className="mb-10">
                        {/* Headline */}
                        <div className="text-center mb-4">
                          <h2
                            className="leading-tight mb-1"
                            style={{
                              fontFamily: "'Playfair Display', serif",
                              fontWeight: 700,
                              fontSize: i === 0 && colIdx === 0 ? '28px' : '22px',
                              textTransform: i === 0 ? 'uppercase' : 'none'
                            }}
                          >
                            {article.headline}
                          </h2>
                          {article.subheadline && (
                            <>
                              <div
                                className="mx-auto my-2"
                                style={{
                                  width: '80px',
                                  height: '1px',
                                  backgroundColor: '#2f2f2f'
                                }}
                              />
                              <p
                                className="italic"
                                style={{
                                  fontFamily: "'Playfair Display', serif",
                                  fontWeight: 400,
                                  fontSize: '16px'
                                }}
                              >
                                {article.subheadline}
                              </p>
                              <div
                                className="mx-auto mt-2"
                                style={{
                                  width: '80px',
                                  height: '1px',
                                  backgroundColor: '#2f2f2f'
                                }}
                              />
                            </>
                          )}
                        </div>

                        {/* Body */}
                        <p
                          className="text-justify leading-[20px]"
                          style={{
                            fontFamily: "'Droid Serif', 'Georgia', serif",
                            fontSize: '14px'
                          }}
                        >
                          {article.excerpt}
                        </p>
                      </article>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogsPage;
