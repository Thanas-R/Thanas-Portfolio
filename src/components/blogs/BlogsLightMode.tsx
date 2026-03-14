import { motion } from 'framer-motion';
import { useBlogData } from './useBlogData';

const BlogsLightMode = () => {
  const { weather, dateStr, dateStrMobile, publishedCount, blogArticles } = useBlogData();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const weatherText = weather ? `${weather.temp}°C, ${weather.desc}` : '—';

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9f7f1', color: '#2f2f2f' }}>
      {/* Newspaper Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center pt-6 px-6"
      >
        <div className="max-w-5xl mx-auto">
          <header
            className="inline-block leading-[0.9] mb-5"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: 'clamp(48px, 10vw, 80px)',
              textTransform: 'uppercase',
              color: '#2f2f2f',
            }}
          >
            Thanas Blogs
          </header>

          {/* Info row */}
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
            <span style={{ fontSize: '12.5px', fontWeight: 600 }}>{weatherText}</span>
            <span style={{ fontSize: '12.5px', fontWeight: 600 }}>{isMobile ? `BLR - ${dateStrMobile}` : `Bengaluru - ${dateStr}`}</span>
            <span style={{ fontSize: '12.5px', fontWeight: 600 }}>
              {publishedCount} {publishedCount === 1 ? 'Blog' : 'Blogs'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Articles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-5xl mx-auto px-6 py-10"
      >
        <div className="relative">
          {/* Coming Soon overlay */}
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
                  style={{ borderLeft: colIdx > 0 ? '1px solid #2f2f2f' : 'none' }}
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
                              textTransform: i === 0 ? 'uppercase' : 'none',
                            }}
                          >
                            {article.headline}
                          </h2>
                          {article.subheadline && (
                            <>
                              <div className="mx-auto my-2" style={{ width: '80px', height: '1px', backgroundColor: '#2f2f2f' }} />
                              <p className="italic" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: '16px' }}>
                                {article.subheadline}
                              </p>
                              <div className="mx-auto mt-2" style={{ width: '80px', height: '1px', backgroundColor: '#2f2f2f' }} />
                            </>
                          )}
                        </div>
                        <p className="text-justify leading-[20px]" style={{ fontFamily: "'Droid Serif', 'Georgia', serif", fontSize: '14px' }}>
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

export default BlogsLightMode;
