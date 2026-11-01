import { useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/use-theme';

// 4x4 Bayer matrix for ordered dithering
const BAYER = [
  [15, 135, 45, 165],
  [195, 75, 225, 105],
  [55, 175, 25, 145],
  [235, 95, 205, 115],
];

/**
 * Ordered-dither gradient band used behind the experience section.
 * A soft vertical light gradient rendered as a coarse dot matrix,
 * fading out at the top and bottom so it sits quietly behind content.
 */
const DitherWaveBackground = ({ className = '' }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const SCALE = 4; // one dither cell = SCALE px
    const render = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const w = Math.ceil(rect.width / SCALE);
      const h = Math.ceil(rect.height / SCALE);
      const img = ctx.createImageData(w, h);

      const fg = isDark ? [255, 255, 255] : [30, 30, 30];
      const maxStrength = isDark ? 0.16 : 0.13;

      for (let y = 0; y < h; y++) {
        const ny = y / h;
        // Gradient strength peaks around the middle, fades at both edges
        const envelope = Math.sin(Math.PI * ny) ** 1.5;
        // Gentle horizontal wave so the band feels alive
        const wave = 0.5 + 0.22 * Math.sin(ny * 14 + 1.3) * Math.sin(2.1);
        for (let x = 0; x < w; x++) {
          const bayer = BAYER[y % 4][x % 4] / 255;
          const strength = Math.max(0, Math.min(1, (envelope * wave - 0.05) * 1.6));
          const on = strength > bayer;
          const i = (y * w + x) * 4;
          if (on) {
            img.data[i] = fg[0];
            img.data[i + 1] = fg[1];
            img.data[i + 2] = fg[2];
            img.data[i + 3] = Math.round(255 * maxStrength * Math.min(1, strength * 1.8));
          } else {
            img.data[i + 3] = 0;
          }
        }
      }

      const off = document.createElement('canvas');
      off.width = w;
      off.height = h;
      off.getContext('2d')?.putImageData(img, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(off, 0, 0, rect.width, rect.height);
    };

    render();
    const ro = new ResizeObserver(render);
    ro.observe(canvas);

    return () => ro.disconnect();
  }, [isDark]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)',
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default DitherWaveBackground;
