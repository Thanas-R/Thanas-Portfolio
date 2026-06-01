import { useTheme } from '@/hooks/use-theme';

/**
 * Decorative side rails (desktop only) between hero and tech sections.
 * Refined minimalist: layered dot mosaic + hairline rule + corner crosshairs.
 * No text. Theme-aware. Subtle, no color.
 */
const HomeSideOrnament = () => {
  const { isDark } = useTheme();
  const line = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const dot = isDark ? 'rgba(255,255,255,0.13)' : 'rgba(0,0,0,0.13)';
  const mark = isDark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.22)';

  const Rail = ({ side }: { side: 'left' | 'right' }) => (
    <div
      className={`absolute top-[120px] bottom-[80px] ${side === 'left' ? 'left-0' : 'right-0'} w-[72px]`}
    >
      {/* dotted column */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${dot} 1px, transparent 1.4px)`,
          backgroundSize: '14px 14px',
          maskImage:
            'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
        }}
      />
      {/* hairline rule */}
      <div
        className={`absolute top-[6%] bottom-[6%] ${side === 'left' ? 'right-3' : 'left-3'} w-px`}
        style={{
          background: `linear-gradient(to bottom, transparent, ${line} 18%, ${line} 82%, transparent)`,
        }}
      />
      {/* corner crosshair top */}
      <svg
        className={`absolute top-[6%] ${side === 'left' ? 'right-1.5' : 'left-1.5'}`}
        width="11"
        height="11"
        viewBox="0 0 11 11"
        aria-hidden
      >
        <path d="M5.5 0v11M0 5.5h11" stroke={mark} strokeWidth="1" />
      </svg>
      {/* corner dot middle */}
      <span
        className={`absolute top-1/2 -translate-y-1/2 ${side === 'left' ? 'right-2.5' : 'left-2.5'} w-1.5 h-1.5 rounded-full`}
        style={{ background: mark }}
      />
      {/* corner crosshair bottom */}
      <svg
        className={`absolute bottom-[6%] ${side === 'left' ? 'right-1.5' : 'left-1.5'}`}
        width="11"
        height="11"
        viewBox="0 0 11 11"
        aria-hidden
      >
        <circle cx="5.5" cy="5.5" r="3" stroke={mark} strokeWidth="1" fill="none" />
      </svg>
    </div>
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-0 hidden xl:block" aria-hidden>
      <Rail side="left" />
      <Rail side="right" />
    </div>
  );
};

export default HomeSideOrnament;
