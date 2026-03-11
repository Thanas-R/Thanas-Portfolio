import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
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

const BlogsPage = () => {
  const { resolvedTheme, setTheme } = useTheme();

  // Force light theme while on blogs page
  useEffect(() => {
    const previousTheme = resolvedTheme;
    setTheme('light');
    return () => {
      if (previousTheme && previousTheme !== 'light') {
        setTheme(previousTheme);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const today = new Date();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayName = dayNames[today.getDay()];
  const monthStr = today.toLocaleDateString('en-US', { month: 'long' });
  const dateStr = `${dayName}, ${monthStr} ${today.getDate()}, ${today.getFullYear()}`;
  
  const publishedCount = 0;

  const [weatherText, setWeatherText] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=12.9716&longitude=77.5946&current=temperature_2m,weather_code&timezone=Asia/Kolkata'
        );
        const data = await res.json();
        const temp = Math.round(data.current.temperature_2m);
        const code = data.current.weather_code;
        let desc = 'Clear';
        if (code >= 1 && code <= 3) desc = 'Partly Cloudy';
        if (code >= 45 && code <= 48) desc = 'Foggy';
        if (code >= 51 && code <= 67) desc = 'Light Rain';
        if (code >= 80 && code <= 82) desc = 'Showers';
        if (code >= 95) desc = 'Thunderstorms';
        setWeatherText(`${temp}°C, ${desc}`);
      } catch {
        setWeatherText('28°C, Sunny');
      }
    };
    fetchWeather();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9f7f1', color: '#2f2f2f' }}>
      <div className="relative z-50">
        <Navbar forceLight />
      </div>

      {/* Newspaper Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center pt-6 px-6"
      >
        <div className="max-w-5xl mx-auto">
          <header
            className="inline-block leading-[0.9] mb-4"
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

          {/* Info row: weather | date | blog count — single line, bounded */}
          <div
            className="flex items-center justify-between py-2.5 text-xs tracking-wider"
            style={{
              borderTop: '2px solid #2f2f2f',
              borderBottom: '2px solid #2f2f2f',
              fontFamily: "'Playfair Display', serif",
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 600 }}>
              {weatherText || '—'}
            </span>
            <span style={{ fontSize: '11px', fontWeight: 600 }}>
              Bengaluru — {dateStr}
            </span>
            <span style={{ fontSize: '11px', fontWeight: 600 }}>
              {publishedCount} {(publishedCount as number) === 1 ? 'Blog' : 'Blogs'}
            </span>
          </div>
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
          <div className="absolute inset-0 z-20 flex items-start justify-center pt-16 md:pt-24">
            <div
              className="px-12 py-8 md:px-16 md:py-10 text-center"
              style={{
                backgroundColor: '#f9f7f1',
                border: '4px double #2f2f2f',
                fontFamily: "'Playfair Display', serif",
                boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
              }}
            >
              <p className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3" style={{ color: '#2f2f2f' }}>
                Coming Soon
              </p>
              <p className="text-sm md:text-base italic" style={{ color: '#666', fontFamily: "'Droid Serif', 'Georgia', serif" }}>
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
                                style={{ width: '80px', height: '1px', backgroundColor: '#2f2f2f' }}
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
                                style={{ width: '80px', height: '1px', backgroundColor: '#2f2f2f' }}
                              />
                            </>
                          )}
                        </div>
                        <p
                          className="text-justify leading-[20px]"
                          style={{ fontFamily: "'Droid Serif', 'Georgia', serif", fontSize: '14px' }}
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
