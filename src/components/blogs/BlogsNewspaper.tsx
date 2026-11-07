import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useBlogData } from './useBlogData';
import BlogReader from './BlogReader';
import type { BlogArticle } from './useBlogData';

interface Props {
  isDark: boolean;
}

/**
 * One newspaper layout for both themes.
 * Dark mode simply inverts the light palette (paper <-> ink),
 * so switching themes recolors the exact same page instantly.
 *
 * Stories flow in newspaper columns with no vertical divider rules.
 * Every post also has its own URL at /blogs/<slug>.
 */
const BlogsNewspaper = ({ isDark }: Props) => {
  const { weather, dateStr, dateStrMobile, publishedCount, blogArticles } = useBlogData();
  const navigate = useNavigate();
  const { slug } = useParams();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const weatherText = weather ? `${weather.temp}°C, ${weather.desc}` : '-';

  // The dark newspaper edition uses only the user's specified inverted pair.
  const paper = isDark ? '#2F2F2F' : '#F9F7F1';
  const ink = isDark ? '#F9F7F1' : '#2F2F2F';
  const softInk = isDark ? 'rgba(249, 247, 241, 0.55)' : 'rgba(47, 47, 47, 0.55)';

  const featuredId = blogArticles[0]?.id;
  const usedColumns = Array.from(new Set(blogArticles.map((a) => a.column))).slice(0, 3);
  const active: BlogArticle | null = (slug ? blogArticles.find((a) => a.id === slug) : undefined) ?? null;

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{ backgroundColor: paper, color: ink }}
    >
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
              color: ink,
              transition: 'color 0.5s',
            }}
          >
            Thanas Blogs
          </header>

          {/* Info row */}
          <div
            className="flex items-center justify-between py-2.5 text-xs tracking-wider"
            style={{
              borderTop: `2px solid ${ink}`,
              borderBottom: `2px solid ${ink}`,
              fontFamily: "'Playfair Display', serif",
              textTransform: 'uppercase',
              letterSpacing: '2px',
              transition: 'border-color 0.5s',
            }}
          >
            <span style={{ fontSize: '12.5px', fontWeight: 600, color: softInk }}>{weatherText}</span>
            <span style={{ fontSize: '12.5px', fontWeight: 600, color: softInk }}>{isMobile ? `BLR - ${dateStrMobile}` : `Bengaluru - ${dateStr}`}</span>
            <span style={{ fontSize: '12.5px', fontWeight: 600, color: softInk }}>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12">
          {usedColumns.map((col) => (
            <div key={col} className="flex flex-col gap-10">
              {blogArticles
                .filter((a) => a.column === col)
                .map((article, i) => {
                  const isFeatured = article.id === featuredId;
                  return (
                    <Fragment key={article.id}>
                      {i > 0 && (
                        <div
                          className="mx-auto w-3/5"
                          style={{ height: 1, backgroundColor: softInk, transition: 'background-color 0.5s' }}
                        />
                      )}
                      <article
                        onClick={() => navigate(`/blogs/${article.id}`)}
                        className="cursor-pointer group"
                      >
                        <div className="text-center mb-4">
                          <h2
                            className="leading-tight mb-1 transition-opacity group-hover:opacity-70"
                            style={{
                              fontFamily: "'Playfair Display', serif",
                              fontWeight: 700,
                              fontSize: isFeatured ? '30px' : '22px',
                              textTransform: isFeatured ? 'uppercase' : 'none',
                              color: ink,
                            }}
                          >
                            {article.headline}
                          </h2>
                          {article.subheadline && (
                            <>
                              <div className="mx-auto my-2" style={{ width: '80px', height: '1px', backgroundColor: ink, transition: 'background-color 0.5s' }} />
                              <p className="italic" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: '16px', color: ink }}>
                                {article.subheadline}
                              </p>
                              <div className="mx-auto mt-2" style={{ width: '80px', height: '1px', backgroundColor: ink, transition: 'background-color 0.5s' }} />
                            </>
                          )}
                        </div>
                        {article.image && (
                          <img
                            src={article.image}
                            alt={article.headline}
                            loading="lazy"
                            className="w-full mb-4"
                            style={{
                              border: `1px solid ${ink}`,
                              maxHeight: '280px',
                              objectFit: 'cover',
                              transition: 'border-color 0.5s',
                            }}
                          />
                        )}
                        <p
                          className="text-justify leading-[20px] transition-opacity group-hover:opacity-70"
                          style={{ fontFamily: "'Droid Serif', 'Georgia', serif", fontSize: '14px', color: ink, transition: 'color 0.5s' }}
                        >
                          {article.excerpt}
                        </p>
                        <p
                          className="mt-3 text-center text-[10px] tracking-[2px] uppercase opacity-70 group-hover:opacity-100 transition-opacity"
                          style={{ fontFamily: "'Playfair Display', serif", color: ink }}
                        >
                          Read the full story →
                        </p>
                      </article>
                    </Fragment>
                  );
                })}
            </div>
          ))}
        </div>
      </motion.div>

      {active && (
        <BlogReader article={active} isDark={isDark} onClose={() => navigate('/blogs')} />
      )}
    </div>
  );
};

export default BlogsNewspaper;
