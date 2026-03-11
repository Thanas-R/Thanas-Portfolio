import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft, ArrowRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import Navbar from '@/components/Navbar';
import GridBackground from '@/components/GridBackground';
import { Project } from '@/components/ProjectsSection';
import { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: 'easeOut' as const },
});

interface SphealDetailProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

/* ── Dotted Globe ── */
const DottedGlobe = ({ isDark, size = 420 }: { isDark: boolean; size?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    const w = size;
    const h = size;
    const radius = w / 2.5;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    context.scale(dpr, dpr);

    const projection = d3.geoOrthographic()
      .scale(radius)
      .translate([w / 2, h / 2])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(context);

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point;
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }
      return inside;
    };

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry;
      if (geometry.type === 'Polygon') {
        if (!pointInPolygon(point, geometry.coordinates[0])) return false;
        for (let i = 1; i < geometry.coordinates.length; i++) {
          if (pointInPolygon(point, geometry.coordinates[i])) return false;
        }
        return true;
      } else if (geometry.type === 'MultiPolygon') {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false;
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) { inHole = true; break; }
            }
            if (!inHole) return true;
          }
        }
      }
      return false;
    };

    interface DotData { lng: number; lat: number }
    const allDots: DotData[] = [];
    let landFeatures: any;

    // Theme colors
    const oceanColor = isDark ? 'hsl(0,0%,5%)' : 'hsl(0,0%,96%)';
    const strokeColor = isDark ? 'hsl(0,0%,25%)' : 'hsl(0,0%,78%)';
    const gratColor = isDark ? 'hsl(0,0%,20%)' : 'hsl(0,0%,82%)';
    const dotColor = isDark ? 'hsl(0,0%,55%)' : 'hsl(0,0%,45%)';
    const outlineColor = isDark ? 'hsl(0,0%,30%)' : 'hsl(0,0%,72%)';

    const render = () => {
      context.clearRect(0, 0, w, h);
      const currentScale = projection.scale();
      const sf = currentScale / radius;

      // Globe bg
      context.beginPath();
      context.arc(w / 2, h / 2, currentScale, 0, 2 * Math.PI);
      context.fillStyle = oceanColor;
      context.fill();
      context.strokeStyle = strokeColor;
      context.lineWidth = 1.5 * sf;
      context.stroke();

      if (landFeatures) {
        // Graticule
        const graticule = d3.geoGraticule();
        context.beginPath();
        path(graticule());
        context.strokeStyle = gratColor;
        context.lineWidth = 0.5 * sf;
        context.globalAlpha = 0.3;
        context.stroke();
        context.globalAlpha = 1;

        // Land outlines
        context.beginPath();
        landFeatures.features.forEach((f: any) => path(f));
        context.strokeStyle = outlineColor;
        context.lineWidth = 0.8 * sf;
        context.stroke();

        // Dots
        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat]);
          if (projected && projected[0] >= 0 && projected[0] <= w && projected[1] >= 0 && projected[1] <= h) {
            context.beginPath();
            context.arc(projected[0], projected[1], 1.1 * sf, 0, 2 * Math.PI);
            context.fillStyle = dotColor;
            context.fill();
          }
        });
      }
    };

    const loadData = async () => {
      try {
        // Use cached globe data from preload if available
        const cachedPromise = (window as any).__globeDataPromise;
        let data;
        if (cachedPromise) {
          data = await cachedPromise;
        }
        if (!data) {
          const res = await fetch(
            'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json'
          );
          if (!res.ok) return;
          data = await res.json();
        }
        landFeatures = data;

        landFeatures.features.forEach((feature: any) => {
          const bounds = d3.geoBounds(feature);
          const [[minLng, minLat], [maxLng, maxLat]] = bounds;
          const step = 16 * 0.08;
          for (let lng = minLng; lng <= maxLng; lng += step) {
            for (let lat = minLat; lat <= maxLat; lat += step) {
              if (pointInFeature([lng, lat], feature)) {
                allDots.push({ lng, lat });
              }
            }
          }
        });
        render();
      } catch {}
    };

    const rotation = [0, 0];
    let autoRotate = true;

    const timer = d3.timer(() => {
      if (autoRotate) {
        rotation[0] += 0.4;
        projection.rotate(rotation as [number, number]);
        render();
      }
    });

    const handleMouseDown = (e: MouseEvent) => {
      autoRotate = false;
      const startX = e.clientX;
      const startY = e.clientY;
      const startRot = [...rotation];

      const move = (me: MouseEvent) => {
        rotation[0] = startRot[0] + (me.clientX - startX) * 0.5;
        rotation[1] = Math.max(-90, Math.min(90, startRot[1] - (me.clientY - startY) * 0.5));
        projection.rotate(rotation as [number, number]);
        render();
      };
      const up = () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
        setTimeout(() => { autoRotate = true; }, 10);
      };
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      autoRotate = false;
      const startX = e.touches[0].clientX;
      const startY = e.touches[0].clientY;
      const startRot = [...rotation];

      const move = (te: TouchEvent) => {
        if (te.touches.length !== 1) return;
        te.preventDefault();
        rotation[0] = startRot[0] + (te.touches[0].clientX - startX) * 0.5;
        rotation[1] = Math.max(-90, Math.min(90, startRot[1] - (te.touches[0].clientY - startY) * 0.5));
        projection.rotate(rotation as [number, number]);
        render();
      };
      const end = () => {
        document.removeEventListener('touchmove', move);
        document.removeEventListener('touchend', end);
        setTimeout(() => { autoRotate = true; }, 10);
      };
      document.addEventListener('touchmove', move, { passive: false });
      document.addEventListener('touchend', end);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    loadData();

    return () => {
      timer.stop();
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('touchstart', handleTouchStart);
    };
  }, [isDark, size]);

  return (
    <canvas
      ref={canvasRef}
      className="cursor-grab active:cursor-grabbing"
      style={{ width: size, height: size, maxWidth: '100%' }}
    />
  );
};

/* ── Main Component ── */
const SphealDetail = ({ project, prevProject, nextProject }: SphealDetailProps) => {
  const { isDark } = useTheme();

  const textColor = isDark ? 'hsl(0 0% 65%)' : 'hsl(0 0% 40%)';
  const headingColor = isDark ? 'hsl(0 0% 96%)' : 'hsl(0 0% 10%)';
  const cardBg = isDark ? 'hsl(0 0% 6%)' : 'hsl(0 0% 97%)';
  const cardBorder = isDark ? 'hsl(0 0% 15%)' : 'hsl(0 0% 88%)';
  const labelColor = isDark ? 'hsl(0 0% 45%)' : 'hsl(0 0% 55%)';
  const font = "'Inter', sans-serif";

  const techStack = [
    { l: 'Frontend', v: 'React • TypeScript • Tailwind CSS • shadcn/ui' },
    { l: 'Maps', v: 'Mapbox GL JS' },
    { l: 'AI', v: 'Gemini AI' },
    { l: 'Build', v: 'Vite' },
  ];

  return (
    <>
      <GridBackground />
      <div className="relative z-10 min-h-screen">
        <Navbar />
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-24">
          {/* Back link */}
          <motion.div {...fadeUp(0)}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity mb-10"
              style={{ color: textColor, fontFamily: font }}
            >
              <ArrowLeft className="w-4 h-4" />
              All Projects
            </Link>
          </motion.div>

          {/* Hero: Left content + Right globe */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-14">
            {/* Left */}
            <div>
              <motion.div {...fadeUp(0.08)} className="mb-2">
                <p
                  className="text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{ color: labelColor, fontFamily: font }}
                >
                  AI Trip Planner
                </p>
              </motion.div>
              <motion.div {...fadeUp(0.12)} className="mb-4">
                <h1
                  className="text-5xl md:text-7xl font-bold leading-none"
                  style={{ color: headingColor, fontFamily: font }}
                >
                  Spheal
                </h1>
              </motion.div>
              <motion.div {...fadeUp(0.16)} className="mb-6">
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: textColor, fontFamily: font }}
                >
                  Spheal is an AI-powered web app that generates personalized travel itineraries.
                  Users enter a destination, dates, budget, and preferences, and the system creates
                  a day-by-day trip plan with recommended places, hotels, costs, and routes displayed
                  on an interactive map. Trips can be saved, shared, and exported as a PDF.
                </p>
              </motion.div>

              {/* Links */}
              <motion.div {...fadeUp(0.2)} className="flex gap-3">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-85"
                    style={{
                      backgroundColor: headingColor,
                      color: isDark ? 'hsl(0 0% 4%)' : 'hsl(0 0% 100%)',
                      fontFamily: font,
                    }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                <a
                  href={project.github || 'https://github.com/thanasR'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-semibold transition-opacity hover:opacity-75"
                  style={{
                    borderColor: cardBorder,
                    color: headingColor,
                    fontFamily: font,
                  }}
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </motion.div>
            </div>

            {/* Right: Globe */}
            <motion.div
              {...fadeUp(0.14)}
              className="flex justify-center md:justify-end"
            >
              <DottedGlobe isDark={isDark} size={380} />
            </motion.div>
          </div>

          {/* Tech Stack */}
          <motion.div {...fadeUp(0.26)}>
            <h2
              className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-5"
              style={{ color: labelColor, fontFamily: font }}
            >
              Tech Stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
              {techStack.map((item) => (
                <div
                  key={item.l}
                  className="p-3.5 rounded-lg"
                  style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}
                >
                  <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: labelColor, fontFamily: font }}>{item.l}</p>
                  <p className="text-[13px] font-medium leading-snug" style={{ color: headingColor, fontFamily: font }}>{item.v}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Screenshot */}
          <motion.div {...fadeUp(0.32)}>
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${cardBorder}` }}>
              {project.live ? (
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  <img src={project.imageSrc} alt={`${project.title} preview`} className="w-full object-cover" style={{ maxHeight: 480 }} />
                </a>
              ) : (
                <img src={project.imageSrc} alt={`${project.title} preview`} className="w-full object-cover" style={{ maxHeight: 480 }} />
              )}
            </div>
          </motion.div>

          {/* Nav prev/next */}
          <motion.div
            {...fadeUp(0.38)}
            className="pt-8 mt-8 grid grid-cols-2 gap-4"
            style={{ borderTop: `1px solid ${cardBorder}` }}
          >
            {prevProject ? (
              <Link
                to={`/projects/${prevProject.id}`}
                className="group flex flex-col gap-1 p-5 rounded-xl transition-colors"
                style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}
              >
                <span className="text-[11px] uppercase tracking-widest flex items-center gap-1" style={{ color: textColor, fontFamily: font }}>
                  <ArrowLeft className="w-3 h-3" /> Previous
                </span>
                <span className="text-sm font-semibold group-hover:translate-x-0.5 transition-transform" style={{ color: headingColor, fontFamily: font }}>
                  {prevProject.title}
                </span>
              </Link>
            ) : <div />}
            {nextProject ? (
              <Link
                to={`/projects/${nextProject.id}`}
                className="group flex flex-col gap-1 p-5 rounded-xl transition-colors text-right ml-auto w-full"
                style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}
              >
                <span className="text-[11px] uppercase tracking-widest flex items-center justify-end gap-1" style={{ color: textColor, fontFamily: font }}>
                  Next <ArrowRight className="w-3 h-3" />
                </span>
                <span className="text-sm font-semibold group-hover:-translate-x-0.5 transition-transform" style={{ color: headingColor, fontFamily: font }}>
                  {nextProject.title}
                </span>
              </Link>
            ) : <div />}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SphealDetail;
