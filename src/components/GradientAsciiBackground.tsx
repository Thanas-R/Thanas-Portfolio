import { useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/use-theme';

const CHARSET = ' .:-=+*#%@';

/**
 * ASCII-art gradient backdrop, hero only.
 * Renders a slow moving light field as ASCII glyphs on a canvas.
 */
const GradientAsciiBackground = ({ className = '' }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let cols = 0;
    let rows = 0;
    const CELL = 13; // px per character cell

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(rect.width / CELL);
      rows = Math.ceil(rect.height / CELL);
    };
    resize();
    window.addEventListener('resize', resize);

    const start = performance.now();

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const base = isDark ? 'rgba(255,255,255,' : 'rgba(20,20,20,';
      ctx.font = `${CELL - 2}px "JetBrains Mono", monospace`;
      ctx.textBaseline = 'top';

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = x * CELL;
          const py = y * CELL;
          const nx = x / cols;
          const ny = y / rows;

          // Slow moving light blobs
          const b1 = Math.sin(nx * 5.1 + t * 0.22 + Math.sin(ny * 3.3 - t * 0.13) * 1.4);
          const b2 = Math.cos(ny * 6.4 - t * 0.18 + Math.sin(nx * 4.2 + t * 0.09) * 1.2);
          let v = (b1 * 0.6 + b2 * 0.5 + 1.05) / 2.1; // ~0..1
          v = Math.max(0, Math.min(1, v));
          v = Math.pow(v, 1.35); // keep most of the field quiet

          if (v < 0.045) continue;
          const idx = Math.min(CHARSET.length - 1, Math.floor(v * CHARSET.length));
          const ch = CHARSET[idx];
          const alpha = v * (isDark ? 0.34 : 0.30);
          ctx.fillStyle = `${base}${alpha.toFixed(3)})`;
          ctx.fillText(ch, px, py);
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [isDark]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
      style={{
        maskImage: 'linear-gradient(to bottom, black 0%, black 62%, transparent 96%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 62%, transparent 96%)',
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default GradientAsciiBackground;
