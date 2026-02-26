import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

const TopographicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const isDark = resolvedTheme === 'dark';
    const strokeColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)';

    // Simplex-like noise via sine combinations
    const noise = (x: number, y: number, t: number) => {
      return (
        Math.sin(x * 0.012 + t * 0.3) * 0.5 +
        Math.sin(y * 0.015 + t * 0.2) * 0.5 +
        Math.sin((x + y) * 0.008 + t * 0.15) * 0.4 +
        Math.sin(Math.sqrt(x * x + y * y) * 0.005 + t * 0.1) * 0.3
      );
    };

    let t = 0;
    const draw = () => {
      t += 0.003;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 0.8;

      const step = 6;
      const levels = 12;

      // Build a grid of noise values
      const cols = Math.ceil(w / step) + 1;
      const rows = Math.ceil(h / step) + 1;
      const grid: number[][] = [];
      for (let j = 0; j < rows; j++) {
        grid[j] = [];
        for (let i = 0; i < cols; i++) {
          grid[j][i] = noise(i * step, j * step, t);
        }
      }

      // Marching squares contour lines
      for (let level = 0; level < levels; level++) {
        const threshold = -1.2 + (level / levels) * 3.0;
        ctx.beginPath();

        for (let j = 0; j < rows - 1; j++) {
          for (let i = 0; i < cols - 1; i++) {
            const tl = grid[j][i];
            const tr = grid[j][i + 1];
            const br = grid[j + 1][i + 1];
            const bl = grid[j + 1][i];

            const config =
              (tl >= threshold ? 8 : 0) |
              (tr >= threshold ? 4 : 0) |
              (br >= threshold ? 2 : 0) |
              (bl >= threshold ? 1 : 0);

            if (config === 0 || config === 15) continue;

            const x = i * step;
            const y = j * step;

            const lerp = (a: number, b: number) => {
              const d = b - a;
              if (Math.abs(d) < 0.0001) return 0.5;
              return (threshold - a) / d;
            };

            const top = x + lerp(tl, tr) * step;
            const right = y + lerp(tr, br) * step;
            const bottom = x + lerp(bl, br) * step;
            const left = y + lerp(tl, bl) * step;

            const segments: [number, number, number, number][] = [];

            switch (config) {
              case 1: case 14: segments.push([x, left, bottom, y + step]); break;
              case 2: case 13: segments.push([bottom, y + step, x + step, right]); break;
              case 3: case 12: segments.push([x, left, x + step, right]); break;
              case 4: case 11: segments.push([top, y, x + step, right]); break;
              case 5: segments.push([top, y, x, left]); segments.push([bottom, y + step, x + step, right]); break;
              case 6: case 9: segments.push([top, y, bottom, y + step]); break;
              case 7: case 8: segments.push([top, y, x, left]); break;
              case 10: segments.push([top, y, x + step, right]); segments.push([x, left, bottom, y + step]); break;
            }

            for (const [sx, sy, ex, ey] of segments) {
              ctx.moveTo(sx, sy);
              ctx.lineTo(ex, ey);
            }
          }
        }
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [resolvedTheme]);

  return (
    <div className="fixed inset-0 w-full h-full bg-background" style={{ zIndex: 0 }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default TopographicBackground;
