import { useEffect, useRef } from 'react';

const TopographicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    class SimplexNoise {
      private perm: number[] = [];
      private gradP: { x: number; y: number }[] = [];

      constructor(seed: number = 42) {
        const grad3 = [
          { x: 1, y: 1 }, { x: -1, y: 1 }, { x: 1, y: -1 }, { x: -1, y: -1 },
          { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }
        ];

        const p: number[] = [];
        for (let i = 0; i < 256; i++) p[i] = i;

        let n = 256;
        let s = seed;
        while (n > 1) {
          s = (s * 16807) % 2147483647;
          const k = Math.floor((s / 2147483647) * n);
          n--;
          [p[n], p[k]] = [p[k], p[n]];
        }

        for (let i = 0; i < 512; i++) {
          this.perm[i] = p[i & 255];
          this.gradP[i] = grad3[this.perm[i] % 8];
        }
      }

      noise(x: number, y: number): number {
        const F2 = 0.5 * (Math.sqrt(3) - 1);
        const G2 = (3 - Math.sqrt(3)) / 6;
        const s = (x + y) * F2;
        const i = Math.floor(x + s);
        const j = Math.floor(y + s);
        const t = (i + j) * G2;
        const x0 = x - (i - t);
        const y0 = y - (j - t);
        const i1 = x0 > y0 ? 1 : 0;
        const j1 = x0 > y0 ? 0 : 1;
        const x1 = x0 - i1 + G2;
        const y1 = y0 - j1 + G2;
        const x2 = x0 - 1 + 2 * G2;
        const y2 = y0 - 1 + 2 * G2;
        const ii = i & 255;
        const jj = j & 255;
        const g0 = this.gradP[ii + this.perm[jj]];
        const g1 = this.gradP[ii + i1 + this.perm[jj + j1]];
        const g2 = this.gradP[ii + 1 + this.perm[jj + 1]];

        let n0 = 0, n1 = 0, n2 = 0;
        let t0 = 0.5 - x0 * x0 - y0 * y0;
        if (t0 >= 0) { t0 *= t0; n0 = t0 * t0 * (g0.x * x0 + g0.y * y0); }
        let t1 = 0.5 - x1 * x1 - y1 * y1;
        if (t1 >= 0) { t1 *= t1; n1 = t1 * t1 * (g1.x * x1 + g1.y * y1); }
        let t2 = 0.5 - x2 * x2 - y2 * y2;
        if (t2 >= 0) { t2 *= t2; n2 = t2 * t2 * (g2.x * x2 + g2.y * y2); }
        return 70 * (n0 + n1 + n2);
      }
    }

    const simplex = new SimplexNoise(42);

    const drawSmoothCurve = (points: { x: number; y: number }[], alpha: number) => {
      if (points.length < 3) return;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      const tension = 0.5;
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[Math.max(0, i - 1)];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[Math.min(points.length - 1, i + 2)];
        const cp1x = p1.x + (p2.x - p0.x) * tension / 3;
        const cp1y = p1.y + (p2.y - p0.y) * tension / 3;
        const cp2x = p2.x - (p3.x - p1.x) * tension / 3;
        const cp2y = p2.y - (p3.y - p1.y) * tension / 3;
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const drawContours = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isDark = document.documentElement.classList.contains('dark');

      ctx.fillStyle = isDark ? '#0e0e0e' : '#F5F5F5';
      ctx.fillRect(0, 0, width, height);

      const isMobile = width < 768;
      const scale = isMobile ? 0.0011 : 0.0006;
      const levels = isMobile ? 8 : 6;
      const cellSize = isMobile ? 4 : 8;
      const cols = Math.ceil(width / cellSize) + 1;
      const rows = Math.ceil(height / cellSize) + 1;
      const heightMap: number[][] = [];

      const flowX = time * 0.10;
      const flowY = time * 0.07;
      const breathe = Math.sin(time * 0.15) * 0.2;

      for (let y = 0; y < rows; y++) {
        heightMap[y] = [];
        for (let x = 0; x < cols; x++) {
          const nx = x * cellSize * scale;
          const ny = y * cellSize * scale;
          let value = 0;
          value += simplex.noise(nx + flowX + breathe, ny + flowY) * 1.0;
          value += simplex.noise(nx * 1.5 - flowX * 0.4, ny * 1.5 + flowY * 0.3) * 0.35;
          value += simplex.noise(
            nx * 2.2 + Math.sin(time * 0.2) * 0.15,
            ny * 2.2 + Math.cos(time * 0.18) * 0.15
          ) * 0.12;
          heightMap[y][x] = value;
        }
      }

      ctx.strokeStyle = isDark ? 'rgba(245, 245, 245, 0.20)' : 'rgba(180, 175, 165, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let level = 0; level < levels; level++) {
        const threshold = -0.8 + (level / levels) * 1.6;
        const levelAlpha = 0.6 + (level % 2) * 0.4;
        const segments: { x: number; y: number }[][] = [];

        for (let y = 0; y < rows - 1; y++) {
          for (let x = 0; x < cols - 1; x++) {
            const tl = heightMap[y][x];
            const tr = heightMap[y][x + 1];
            const br = heightMap[y + 1][x + 1];
            const bl = heightMap[y + 1][x];
            let caseIndex = 0;
            if (tl > threshold) caseIndex |= 8;
            if (tr > threshold) caseIndex |= 4;
            if (br > threshold) caseIndex |= 2;
            if (bl > threshold) caseIndex |= 1;
            if (caseIndex === 0 || caseIndex === 15) continue;

            const px = x * cellSize;
            const py = y * cellSize;
            const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
            const getT = (v1: number, v2: number) => {
              if (Math.abs(v2 - v1) < 0.0001) return 0.5;
              return Math.max(0, Math.min(1, (threshold - v1) / (v2 - v1)));
            };

            const top = { x: lerp(px, px + cellSize, getT(tl, tr)), y: py };
            const right = { x: px + cellSize, y: lerp(py, py + cellSize, getT(tr, br)) };
            const bottom = { x: lerp(px, px + cellSize, getT(bl, br)), y: py + cellSize };
            const left = { x: px, y: lerp(py, py + cellSize, getT(tl, bl)) };

            const addSeg = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
              segments.push([p1, p2]);
            };

            switch (caseIndex) {
              case 1: case 14: addSeg(left, bottom); break;
              case 2: case 13: addSeg(bottom, right); break;
              case 3: case 12: addSeg(left, right); break;
              case 4: case 11: addSeg(top, right); break;
              case 5: addSeg(left, top); addSeg(bottom, right); break;
              case 6: case 9: addSeg(top, bottom); break;
              case 7: case 8: addSeg(left, top); break;
              case 10: addSeg(top, right); addSeg(left, bottom); break;
            }
          }
        }

        // Connect segments into continuous paths
        const paths: { x: number; y: number }[][] = [];
        const used = new Set<number>();
        const tolerance = cellSize * 0.6;
        const dist = (a: { x: number; y: number }, b: { x: number; y: number }) =>
          Math.hypot(a.x - b.x, a.y - b.y);

        const findNearest = (point: { x: number; y: number }): { idx: number; end: 'start' | 'end' } | null => {
          let nearest: { idx: number; end: 'start' | 'end'; dist: number } | null = null;
          for (let i = 0; i < segments.length; i++) {
            if (used.has(i)) continue;
            const seg = segments[i];
            const ds = dist(seg[0], point);
            const de = dist(seg[1], point);
            if (ds < tolerance && (!nearest || ds < nearest.dist)) nearest = { idx: i, end: 'start', dist: ds };
            if (de < tolerance && (!nearest || de < nearest.dist)) nearest = { idx: i, end: 'end', dist: de };
          }
          return nearest;
        };

        for (let i = 0; i < segments.length; i++) {
          if (used.has(i)) continue;
          used.add(i);
          const path = [...segments[i]];

          let iter = 0;
          let next = findNearest(path[path.length - 1]);
          while (next && iter < 500) {
            used.add(next.idx);
            const seg = segments[next.idx];
            path.push(next.end === 'start' ? seg[1] : seg[0]);
            next = findNearest(path[path.length - 1]);
            iter++;
          }

          iter = 0;
          let prev = findNearest(path[0]);
          while (prev && iter < 500) {
            used.add(prev.idx);
            const seg = segments[prev.idx];
            path.unshift(prev.end === 'start' ? seg[1] : seg[0]);
            prev = findNearest(path[0]);
            iter++;
          }

          if (path.length >= 4) paths.push(path);
        }

        for (const path of paths) {
          drawSmoothCurve(path, levelAlpha);
        }
      }

      time += 0.016;
      animationId = requestAnimationFrame(drawContours);
    };

    drawContours();

    const observer = new MutationObserver(() => {
      // Theme changed — colors will update on next frame automatically
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};

export default TopographicBackground;
