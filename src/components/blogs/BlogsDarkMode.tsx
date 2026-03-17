import { motion } from 'framer-motion';
import { useLanyard } from 'react-use-lanyard';
import { useBlogData } from './useBlogData';

const DISCORD_USER_ID = '677174403859087378';

/* ── Scanline overlay ── */
const Scanlines = () => (
  <div
    className="pointer-events-none fixed inset-0 z-[60]"
    style={{
      background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)',
      mixBlendMode: 'overlay',
    }}
  />
);

/* ── Glitch text with animated clip-path ── */
const GlitchText = ({ children, className = '', large = false }: { children: string; className?: string; large?: boolean }) => (
  <span className={`glitch-cyber relative inline-block ${className}`} data-text={children}>
    <span className="relative z-10">{children}</span>
    <span
      aria-hidden
      className="glitch-cyber-before absolute top-0 left-0 z-0"
      style={{ color: '#fff' }}
    >
      {children}
    </span>
    <span
      aria-hidden
      className="glitch-cyber-after absolute top-0 left-0 z-0"
      style={{ color: '#fff' }}
    >
      {children}
    </span>
  </span>
);

/* ── Decorative corner brackets ── */
const CornerBrackets = ({ className = '' }: { className?: string }) => (
  <div className={`absolute ${className}`}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="1.5">
      <path d="M0 16 V0 H16" />
    </svg>
  </div>
);

/* ── HUD-style info row ── */
const HudRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center gap-3">
    <span className="text-[10px] tracking-[4px] uppercase opacity-40" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      {label}
    </span>
    <span className="text-[11px] tracking-[2px] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      {value}
    </span>
  </div>
);

const BlogsDarkMode = () => {
  const { weather, dateStr, dateStrMobile, publishedCount, blogArticles } = useBlogData();
  const { status: lanyard } = useLanyard({ userId: DISCORD_USER_ID, socket: true });
  const discordStatus = lanyard?.discord_status || 'offline';
  const isOnline = discordStatus !== 'offline';

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#0a0a0a', color: '#e0e0e0' }}>
      <Scanlines />

      {/* Subtle neon ambient glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,255,255,0.025) 0%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 30% 50% at 0% 50%, rgba(200,220,255,0.015) 0%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 30% 50% at 100% 60%, rgba(200,220,255,0.015) 0%, transparent 70%)',
        }}
      />

      {/* Grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Top HUD bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <HudRow label="SYS" value={isOnline ? 'ONLINE' : 'OFFLINE'} />
            <HudRow label="LOC 位置" value="BENGALURU" />
          </div>
          <div className="hidden md:flex items-center gap-6">
            <HudRow label="DATE 日付" value={dateStr.toUpperCase()} />
            {weather && <HudRow label="ENV 環境" value={`${weather.temp}°C ${weather.desc.toUpperCase()}`} />}
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${isOnline ? 'animate-pulse' : ''}`}
              style={{
                backgroundColor: isOnline ? '#fff' : 'rgba(255,255,255,0.3)',
                boxShadow: isOnline ? '0 0 6px rgba(255,255,255,0.4), 0 0 12px rgba(255,255,255,0.15)' : 'none',
              }}
            />
            <span className="text-[10px] tracking-[3px] uppercase opacity-50" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {isOnline ? 'LIVE' : 'AWAY'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Main header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 pt-16 pb-8 px-6"
      >
        <div className="max-w-6xl mx-auto">
          {/* Japanese accent label */}
          <p
            className="text-[11px] tracking-[8px] uppercase mb-4 opacity-30"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            ブログ - TRANSMISSION LOG
          </p>

          {/* Main title with glitch + subtle neon glow on text */}
          <div className="flex items-end gap-6 mb-6 pl-2 md:pl-4">
            <h1
              className="leading-[0.85]"
              style={{
                fontFamily: "'Bebas Neue', 'League Gothic', sans-serif",
                fontSize: 'clamp(48px, 9vw, 100px)',
                fontWeight: 400,
                letterSpacing: '6px',
                textTransform: 'uppercase',
                color: '#fff',
                textShadow: '0 0 20px rgba(255,255,255,0.06), 0 0 40px rgba(255,255,255,0.03)',
              }}
            >
              <GlitchText large>THANAS</GlitchText>
            </h1>
            <p
              className="pb-2 opacity-30"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px',
                letterSpacing: '3px',
              }}
            >
              記録 / ARCHIVES
            </p>
          </div>

          {/* Subtitle line with subtle glow on dividers */}
          <div className="flex items-center gap-4 mb-8">
            <div
              className="h-px flex-1"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), rgba(255,255,255,0.08))',
              }}
            />
            <span
              className="text-[10px] tracking-[6px] uppercase opacity-40"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {publishedCount} ENTRIES LOGGED - エントリー
            </span>
            <div
              className="h-px flex-1"
              style={{
                background: 'linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.15), transparent)',
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Articles grid - cyberpunk style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="relative z-10 max-w-6xl mx-auto px-6 pb-20"
      >
        <div className="relative">
          {/* Coming Soon overlay */}
          <div className="absolute inset-0 z-20 flex items-start justify-center pt-12 md:pt-20">
            <div
              className="relative px-10 py-8 md:px-14 md:py-10 text-center border border-white/20 bg-[#0a0a0a]/95 backdrop-blur-sm"
              style={{
                boxShadow: '0 0 30px rgba(255,255,255,0.03), inset 0 0 20px rgba(255,255,255,0.02)',
              }}
            >
              <CornerBrackets className="top-0 left-0" />
              <CornerBrackets className="top-0 right-0 rotate-90" />
              <CornerBrackets className="bottom-0 right-0 rotate-180" />
              <CornerBrackets className="bottom-0 left-0 -rotate-90" />

              <p
                className="text-[10px] tracking-[6px] uppercase mb-4 opacity-40"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                ステータス / STATUS
              </p>
              <p
                className="text-4xl md:text-5xl lg:text-7xl font-normal mb-3"
                style={{
                  fontFamily: "'Bebas Neue', 'League Gothic', sans-serif",
                  letterSpacing: '8px',
                  color: '#fff',
                  textShadow: '0 0 25px rgba(255,255,255,0.08), 0 0 50px rgba(255,255,255,0.03)',
                }}
              >
                <GlitchText large>INCOMING</GlitchText>
              </p>
              <p
                className="text-xs opacity-40"
                style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '2px' }}
              >
                データ転送中 - Transmissions pending
              </p>
            </div>
          </div>

          {/* Articles preview - greyed out */}
          <div className="opacity-20 pointer-events-none select-none">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
              {blogArticles.map((article, i) => (
                <article
                  key={article.id}
                  className="p-5 relative"
                  style={{
                    borderLeft: i % 3 !== 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {/* Index number */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[10px] tracking-[4px] opacity-40"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {article.jpLabel && (
                      <span className="text-[11px] opacity-25">{article.jpLabel}</span>
                    )}
                  </div>

                  {/* Headline */}
                  <h2
                    className="mb-2"
                    style={{
                      fontFamily: "'Bebas Neue', 'League Gothic', sans-serif",
                      fontSize: i === 0 ? '28px' : '22px',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      lineHeight: 1.1,
                      color: '#fff',
                    }}
                  >
                    {article.headline}
                  </h2>

                  {/* Subheadline */}
                  {article.subheadline && (
                    <p
                      className="mb-3 opacity-50"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '11px',
                        letterSpacing: '1px',
                        lineHeight: 1.4,
                      }}
                    >
                      {article.subheadline}
                    </p>
                  )}

                  {/* Divider */}
                  <div className="w-8 h-px bg-white/20 mb-3" />

                  {/* Excerpt */}
                  <p
                    className="leading-relaxed opacity-60"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      lineHeight: '18px',
                    }}
                  >
                    {article.excerpt}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogsDarkMode;
