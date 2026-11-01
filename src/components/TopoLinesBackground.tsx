import { useMemo } from 'react';

/**
 * Hand-drawn style topographic contour lines, used behind the Virdis page.
 * Concentric wavy loops generated from layered sine perturbations.
 */
const TopoLinesBackground = ({
  stroke = 'rgba(120, 190, 155, 0.22)',
  className = '',
}: {
  stroke?: string;
  className?: string;
}) => {
  const paths = useMemo(() => {
    const out: string[] = [];
    const cx = 500;
    const cy = 350;
    const rings = 14;
    for (let k = 1; k <= rings; k++) {
      const base = 30 + k * 34;
      const pts: string[] = [];
      const steps = 64;
      for (let i = 0; i <= steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        const wob =
          Math.sin(a * 3 + k * 0.7) * 26 +
          Math.sin(a * 7 + k * 1.3) * 12 +
          Math.sin(a * 11 - k * 0.5) * 6;
        const wobY =
          Math.cos(a * 4 + k * 0.9) * 22 +
          Math.cos(a * 9 + k * 1.1) * 10;
        const rx = base + wob;
        const ry = (base + wobY) * 0.62;
        const x = cx + Math.cos(a) * rx;
        const y = cy + Math.sin(a) * ry;
        pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`);
      }
      out.push(pts.join(' ') + ' Z');
    }
    return out;
  }, []);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
      style={{
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 100%)',
      }}
    >
      <svg className="w-full h-full" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" fill="none">
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke={stroke}
            strokeWidth={i % 4 === 0 ? 1.4 : 0.8}
            strokeLinecap="round"
            strokeDasharray={i % 7 === 0 ? '5 6' : undefined}
          />
        ))}
      </svg>
    </div>
  );
};

export default TopoLinesBackground;
