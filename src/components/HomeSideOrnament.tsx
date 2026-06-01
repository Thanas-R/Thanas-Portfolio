import { useTheme } from '@/hooks/use-theme';

/**
 * Decorative side rails shown on desktop only, anchored between hero start
 * and tech-carousel end (covers About + Experience zone). Minimal, theme-aware,
 * no color. Pattern is a mix: hairline diagonals (left rail) and dot-grid mosaic
 * (right rail), echoing the project pages.
 */
const HomeSideOrnament = () => {
  const { isDark } = useTheme();
  const stroke = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)';
  const dot = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.14)';
  const label = isDark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.30)';

  return (
    <div className="pointer-events-none absolute inset-0 z-0 hidden xl:block" aria-hidden>
      {/* LEFT rail: diagonal hairlines + vertical marker */}
      <div
        className="absolute top-[120px] bottom-[80px] left-0 w-[70px]"
        style={{
          backgroundImage: `repeating-linear-gradient(135deg, ${stroke} 0 1px, transparent 1px 12px)`,
          maskImage: 'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)',
        }}
      />
      <div className="absolute top-[180px] left-[40px] flex flex-col items-center gap-3">
        <span className="h-12 w-px" style={{ backgroundColor: stroke }} />
        <span
          className="text-[9px] uppercase tracking-[0.35em] [writing-mode:vertical-rl] rotate-180"
          style={{ color: label, fontFamily: "'JetBrains Mono', monospace" }}
        >
          // index / 001
        </span>
        <span className="h-24 w-px" style={{ backgroundColor: stroke }} />
      </div>

      {/* RIGHT rail: dot mosaic + crosshair markers */}
      <div
        className="absolute top-[120px] bottom-[80px] right-0 w-[70px]"
        style={{
          backgroundImage: `radial-gradient(circle, ${dot} 1px, transparent 1.4px)`,
          backgroundSize: '12px 12px',
          maskImage: 'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)',
        }}
      />
      <div className="absolute top-[200px] right-[36px] flex flex-col items-center gap-4">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M7 0v14M0 7h14" stroke={stroke} strokeWidth="1" />
        </svg>
        <span
          className="text-[9px] uppercase tracking-[0.35em] [writing-mode:vertical-rl]"
          style={{ color: label, fontFamily: "'JetBrains Mono', monospace" }}
        >
          thanas-R // portfolio
        </span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <circle cx="7" cy="7" r="3" stroke={stroke} strokeWidth="1" fill="none" />
        </svg>
      </div>
    </div>
  );
};

export default HomeSideOrnament;
