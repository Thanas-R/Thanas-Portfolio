import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft, ArrowRight, Leaf, BarChart3, Crosshair, Cpu, MapPin, Layers, Satellite, CloudRain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import Navbar from '@/components/Navbar';
import { Project } from '@/components/ProjectsSection';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: 'easeOut' as const },
});

interface VirdisDetailProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

const VirdisDetail = ({ project, prevProject, nextProject }: VirdisDetailProps) => {
  const { isDark } = useTheme();

  const c = {
    pageBg: isDark ? 'hsl(150 30% 8%)' : '#FFFBEB',
    panelBg: isDark ? 'hsl(150 25% 12%)' : 'hsl(0 0% 100%)',
    panelBorder: isDark ? 'hsl(150 15% 20%)' : 'hsl(47 30% 82%)',
    text: isDark ? 'hsl(47 100% 96%)' : 'hsl(150 30% 15%)',
    textMuted: isDark ? 'hsl(150 10% 55%)' : 'hsl(150 15% 40%)',
    heading: isDark ? 'hsl(47 100% 96%)' : 'hsl(150 30% 15%)',
    accent: '#EAB947',
    label: isDark ? 'hsl(150 10% 45%)' : 'hsl(150 10% 50%)',
    cardBg: isDark ? 'hsl(150 25% 10%)' : 'hsl(47 40% 96%)',
    cardBorder: isDark ? 'hsl(150 15% 18%)' : 'hsl(47 30% 85%)',
    tagBg: isDark ? 'rgba(234,185,71,0.08)' : 'rgba(234,185,71,0.08)',
    tagBorder: isDark ? 'rgba(234,185,71,0.2)' : 'rgba(234,185,71,0.25)',
    tagText: isDark ? '#d4b84a' : '#8a7030',
    navBg: isDark ? 'hsl(150 25% 10%)' : 'hsl(47 40% 97%)',
    btnBg: isDark ? 'hsl(47 100% 96%)' : 'hsl(150 30% 15%)',
    btnText: isDark ? 'hsl(150 30% 10%)' : 'hsl(47 100% 96%)',
    divider: isDark ? 'hsl(150 15% 16%)' : 'hsl(47 25% 88%)',
    codeBg: isDark ? 'hsl(150 30% 7%)' : 'hsl(47 30% 94%)',
    flowArrow: isDark ? 'hsl(150 30% 35%)' : 'hsl(150 25% 45%)',
  };

  const font = "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const monoFont = "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace";

  return (
    <div className="min-h-screen" style={{ backgroundColor: c.pageBg }}>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 pt-12 pb-24">
        {/* Back */}
        <motion.div {...fadeUp(0)}>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity mb-10"
            style={{ color: c.textMuted, fontFamily: font }}
          >
            <ArrowLeft className="w-4 h-4" />
            All Projects
          </Link>
        </motion.div>

        {/* Floating panel */}
        <motion.div
          {...fadeUp(0.08)}
          className="rounded-2xl p-8 md:p-12"
          style={{
            backgroundColor: c.panelBg,
            border: `2px solid ${c.panelBorder}`,
          }}
        >
          {/* Title block */}
          <div className="flex items-center gap-3 mb-1">
            <Leaf className="w-6 h-6" style={{ color: c.flowArrow }} />
            <h1
              className="text-4xl md:text-6xl font-bold leading-none tracking-tight"
              style={{ fontFamily: font, color: c.heading }}
            >
              Virdis
            </h1>
          </div>
          <p
            className="text-xs uppercase tracking-[0.2em] font-medium mb-6 ml-9"
            style={{ color: c.accent, fontFamily: font }}
          >
            Precision Agriculture Platform
          </p>
          <p
            className="text-sm md:text-base leading-relaxed max-w-2xl mb-8"
            style={{ color: c.textMuted, fontFamily: font }}
          >
            A modern precision-agriculture platform that lets farmers and agronomists map fields,
            monitor crop health via satellite imagery, analyze NDVI vegetation indices,
            and receive AI-powered recommendations from a single interactive dashboard.
          </p>

          {/* Links */}
          <div className="flex gap-3 mb-8">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-85 transition-opacity"
                style={{ backgroundColor: c.btnBg, color: c.btnText, fontFamily: font }}
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-3 py-1 rounded-md font-medium uppercase tracking-wider"
                style={{
                  backgroundColor: c.tagBg,
                  border: `1px solid ${c.tagBorder}`,
                  color: c.tagText,
                  fontFamily: font,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px mb-10" style={{ backgroundColor: c.divider }} />

          {/* Core Capabilities */}
          <SectionLabel label="Core Capabilities" color={c.label} font={font} />
          <div className="grid md:grid-cols-2 gap-3 mb-12">
            {[
              { icon: Satellite, title: 'Interactive Satellite Map', desc: 'High-resolution Mapbox basemap with polygon drawing, field editing, fly-to animations, and layer toggles.' },
              { icon: BarChart3, title: 'NDVI Vegetation Analysis', desc: 'Sentinel-2 satellite imagery processed through Google Earth Engine to calculate vegetation health indices.' },
              { icon: Crosshair, title: 'Auto Field Detection', desc: 'Single-click field detection using NDVI-based region-growing segmentation, returning boundaries, area, and health scores.' },
              { icon: Cpu, title: 'AI Agronomic Insights', desc: 'AI-generated crop health assessments, irrigation recommendations, pest risk analysis, and scouting suggestions.' },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl flex gap-4"
                style={{ backgroundColor: c.cardBg, border: `1px solid ${c.cardBorder}` }}
              >
                <item.icon className="w-5 h-5 mt-0.5 shrink-0" style={{ color: c.flowArrow }} />
                <div>
                  <h3 className="font-semibold text-sm mb-1.5" style={{ color: c.heading, fontFamily: font }}>
                    {item.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: c.textMuted, fontFamily: font }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Detection Flow */}
          <SectionLabel label="Detection Flow" color={c.label} font={font} />
          <div
            className="p-5 rounded-xl text-[13px] leading-[2] mb-12"
            style={{ backgroundColor: c.codeBg, border: `1px solid ${c.cardBorder}`, fontFamily: monoFont, color: c.textMuted }}
          >
            <span style={{ color: c.heading, fontWeight: 600 }}>User Click</span>
            <span style={{ color: c.flowArrow }}> → </span>Capture lat/lon
            <br />
            <span style={{ color: c.flowArrow }}>→ </span>Edge Function queries Sentinel-2
            <br />
            <span style={{ color: c.flowArrow }}>→ </span>NDVI calculation (NIR − Red) / (NIR + Red)
            <br />
            <span style={{ color: c.flowArrow }}>→ </span>Region-growing segmentation
            <br />
            <span style={{ color: c.flowArrow }}>→ </span>
            <span style={{ color: c.heading, fontWeight: 600 }}>GeoJSON polygon + stats returned</span>
          </div>

          {/* NDVI Scale */}
          <SectionLabel label="NDVI Scale" color={c.label} font={font} />
          <div className="flex gap-4 mb-12">
            {[
              { color: '#d73027', label: 'Stressed', range: '< 0.2' },
              { color: '#fee08b', label: 'Moderate', range: '0.2 – 0.5' },
              { color: '#2e7d32', label: 'Healthy', range: '> 0.5' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs" style={{ color: c.textMuted, fontFamily: font }}>
                  {item.label}
                  <span className="ml-1 opacity-60">({item.range})</span>
                </span>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <SectionLabel label="Tech Stack" color={c.label} font={font} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
            {[
              { label: 'Frontend', value: 'React 18' },
              { label: 'Language', value: 'TypeScript' },
              { label: 'Mapping', value: 'Mapbox GL JS' },
              { label: 'Satellite', value: 'Earth Engine' },
              { label: 'Styling', value: 'Tailwind + shadcn' },
              { label: 'Charts', value: 'Recharts' },
              { label: 'AI', value: 'Lovable AI' },
              { label: 'Weather', value: 'Open-Meteo' },
            ].map((item) => (
              <div
                key={item.label}
                className="p-3.5 rounded-lg"
                style={{ backgroundColor: c.cardBg, border: `1px solid ${c.cardBorder}` }}
              >
                <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: c.label, fontFamily: font }}>
                  {item.label}
                </p>
                <p className="text-sm font-semibold" style={{ color: c.heading, fontFamily: font }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Architecture */}
          <SectionLabel label="Architecture" color={c.label} font={font} />
          <div
            className="p-5 rounded-xl text-[13px] leading-[2] mb-12"
            style={{ backgroundColor: c.codeBg, border: `1px solid ${c.cardBorder}`, fontFamily: monoFont, color: c.textMuted }}
          >
            <span style={{ color: c.heading, fontWeight: 600 }}>Frontend</span> (React + Mapbox)
            <br />
            &nbsp;&nbsp;|
            <br />
            &nbsp;&nbsp;v
            <br />
            <span style={{ color: c.heading, fontWeight: 600 }}>Edge Functions</span>
            <br />
            &nbsp;&nbsp;|
            <br />
            &nbsp;&nbsp;
            <span style={{ color: c.flowArrow }}>NDVI Tiles</span>
            {' | '}
            <span style={{ color: c.flowArrow }}>Field Detection</span>
            {' | '}
            <span style={{ color: c.flowArrow }}>AI Analysis</span>
            <br />
            &nbsp;&nbsp;|
            <br />
            <span style={{ color: c.heading, fontWeight: 600 }}>Google Earth Engine</span> (Sentinel-2)
          </div>

          {/* Key Features */}
          <SectionLabel label="Key Features" color={c.label} font={font} />
          <div
            className="p-5 rounded-xl space-y-2 mb-12"
            style={{ backgroundColor: c.cardBg, border: `1px solid ${c.cardBorder}` }}
          >
            {[
              'Draw and manage crop fields on an interactive satellite map',
              'Automatic field detection from satellite imagery with one click',
              'Real-time NDVI vegetation health monitoring via Sentinel-2',
              'Per-field weather data including temperature, wind, humidity, and rainfall',
              'AI-generated crop health assessments and irrigation recommendations',
              'Support for over 190 crop types with field grouping and color coding',
              'Responsive design with mobile-optimized map and slide-up panels',
            ].map((feat) => (
              <div key={feat} className="flex items-start gap-3">
                <span className="mt-0.5 text-xs" style={{ color: c.flowArrow }}>▸</span>
                <p className="text-[13px] leading-relaxed" style={{ color: c.text, fontFamily: font }}>{feat}</p>
              </div>
            ))}
          </div>

          {/* Additional details row */}
          <div className="grid md:grid-cols-3 gap-3 mb-12">
            {[
              { icon: MapPin, title: 'Field Management', desc: 'Create, edit, assign crops, group fields, color code, and store location metadata for over 190 crop types.' },
              { icon: CloudRain, title: 'Weather Monitoring', desc: 'Per-field weather data powered by Open-Meteo including temperature, wind speed, humidity, and rainfall.' },
              { icon: Layers, title: 'Responsive Design', desc: 'Desktop split-panel layout with full-screen mobile map, bottom navigation, swipe gestures, and slide-up panels.' },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl"
                style={{ backgroundColor: c.cardBg, border: `1px solid ${c.cardBorder}` }}
              >
                <item.icon className="w-4 h-4 mb-2.5" style={{ color: c.flowArrow }} />
                <h3 className="font-semibold text-sm mb-1.5" style={{ color: c.heading, fontFamily: font }}>
                  {item.title}
                </h3>
                <p className="text-[13px] leading-relaxed" style={{ color: c.textMuted, fontFamily: font }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Screenshot */}
          <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${c.cardBorder}` }}>
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
          {...fadeUp(0.4)}
          className="pt-8 mt-8 grid grid-cols-2 gap-4"
          style={{ borderTop: `1px solid ${c.divider}` }}
        >
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.id}`}
              className="group flex flex-col gap-1 p-5 rounded-xl transition-colors"
              style={{ backgroundColor: c.navBg, border: `1px solid ${c.cardBorder}` }}
            >
              <span className="text-[11px] uppercase tracking-widest flex items-center gap-1" style={{ color: c.label, fontFamily: font }}>
                <ArrowLeft className="w-3 h-3" /> Previous
              </span>
              <span className="text-sm font-semibold group-hover:translate-x-0.5 transition-transform" style={{ color: c.heading, fontFamily: font }}>
                {prevProject.title}
              </span>
            </Link>
          ) : <div />}
          {nextProject ? (
            <Link
              to={`/projects/${nextProject.id}`}
              className="group flex flex-col gap-1 p-5 rounded-xl transition-colors text-right ml-auto w-full"
              style={{ backgroundColor: c.navBg, border: `1px solid ${c.cardBorder}` }}
            >
              <span className="text-[11px] uppercase tracking-widest flex items-center justify-end gap-1" style={{ color: c.label, fontFamily: font }}>
                Next <ArrowRight className="w-3 h-3" />
              </span>
              <span className="text-sm font-semibold group-hover:-translate-x-0.5 transition-transform" style={{ color: c.heading, fontFamily: font }}>
                {nextProject.title}
              </span>
            </Link>
          ) : <div />}
        </motion.div>
      </div>
    </div>
  );
};

const SectionLabel = ({ label, color, font }: { label: string; color: string; font: string }) => (
  <h2
    className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-5"
    style={{ color, fontFamily: font }}
  >
    {label}
  </h2>
);

export default VirdisDetail;
