import { useTheme } from '@/hooks/use-theme';

/**
 * Decorative side rails (desktop only) between hero and tech sections.
 * Both rails are mirror-identical: stacked vignettes of dot mosaic, diagonal
 * slashes, micro-grid, then dot mosaic again. No vertical line running across.
 */
const HomeSideOrnament = () => {
  const { isDark } = useTheme();
  const dot = isDark ? 'rgba(255,255,255,0.13)' : 'rgba(0,0,0,0.13)';
  const slash = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)';
  const grid = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const mark = isDark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.22)';

  const dotsBg = {
    backgroundImage: `radial-gradient(circle, ${dot} 1px, transparent 1.4px)`,
    backgroundSize: '14px 14px',
  } as const;

  const slashBg = {
    backgroundImage: `repeating-linear-gradient(45deg, ${slash} 0 1px, transparent 1px 8px)`,
  } as const;

  const gridBg = {
    backgroundImage: `linear-gradient(${grid} 1px, transparent 1px), linear-gradient(90deg, ${grid} 1px, transparent 1px)`,
    backgroundSize: '12px 12px',
  } as const;

  const Cross = ({ className = '' }: { className?: string }) => (
    <svg className={className} width="11" height="11" viewBox="0 0 11 11" aria-hidden>
      <path d="M5.5 0v11M0 5.5h11" stroke={mark} strokeWidth="1" />
    </svg>
  );

  const Ring = ({ className = '' }: { className?: string }) => (
    <svg className={className} width="11" height="11" viewBox="0 0 11 11" aria-hidden>
      <circle cx="5.5" cy="5.5" r="3" stroke={mark} strokeWidth="1" fill="none" />
    </svg>
  );

  const Rail = () => {
    const fade =
      'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)';
    return (
      <div className="relative h-full w-full">
        {/* Top: dot mosaic */}
        <div
          className="absolute left-0 right-0 top-0 h-[28%]"
          style={{ ...dotsBg, maskImage: fade, WebkitMaskImage: fade }}
        />
        {/* Top divider mark */}
        <Cross className="absolute left-1/2 -translate-x-1/2 top-[29%]" />

        {/* Middle: diagonal slashes */}
        <div
          className="absolute left-0 right-0 top-[32%] h-[16%] opacity-90"
          style={slashBg}
        />
        <Ring className="absolute left-1/2 -translate-x-1/2 top-[49%]" />

        {/* Center: micro-grid window */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[52%] w-[60%] h-[10%]"
          style={gridBg}
        />
        <Cross className="absolute left-1/2 -translate-x-1/2 top-[63%]" />

        {/* Lower: slashes again (mirrored) */}
        <div
          className="absolute left-0 right-0 top-[66%] h-[12%] opacity-90"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, ${slash} 0 1px, transparent 1px 8px)`,
          }}
        />

        {/* Bottom: dot mosaic */}
        <div
          className="absolute left-0 right-0 bottom-0 h-[20%]"
          style={{ ...dotsBg, maskImage: fade, WebkitMaskImage: fade }}
        />
        {/* center small dot */}
        <span
          className="absolute left-1/2 -translate-x-1/2 bottom-[7%] w-1.5 h-1.5 rounded-full"
          style={{ background: mark }}
        />
      </div>
    );
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-0 hidden xl:block" aria-hidden>
      <div className="absolute top-[120px] bottom-[80px] left-0 w-[72px]">
        <Rail />
      </div>
      <div className="absolute top-[120px] bottom-[80px] right-0 w-[72px]">
        <Rail />
      </div>
    </div>
  );
};

export default HomeSideOrnament;
