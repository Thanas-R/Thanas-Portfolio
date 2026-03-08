import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react';
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

  // Theme palette
  const c = {
    pageBg: isDark ? '#1D2A23' : '#ffffff',
    panelBg: isDark ? '#21382D' : '#FFFBEB',
    panelBorder: isDark ? '#3a5a48' : '#d4c9a8',
    text: isDark ? '#e8e4dc' : '#1D2A23',
    textMuted: isDark ? '#a8b5a0' : '#5a6b58',
    heading: isDark ? '#f0ece4' : '#1D2A23',
    gold: '#EAB947',
    label: isDark ? '#7a8d74' : '#8a9a7e',
    cardBg: isDark ? 'rgba(29,42,35,0.7)' : 'rgba(255,251,235,0.6)',
    cardBorder: isDark ? '#2e4a3a' : '#d4c9a8',
    tagBg: isDark ? 'rgba(234,185,71,0.1)' : 'rgba(234,185,71,0.08)',
    tagBorder: isDark ? 'rgba(234,185,71,0.25)' : 'rgba(234,185,71,0.3)',
    tagText: isDark ? '#d4b84a' : '#8a7030',
    navBg: isDark ? 'rgba(29,42,35,0.5)' : 'rgba(255,251,235,0.5)',
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: c.pageBg }}>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 pt-12 pb-24">
        {/* Back link */}
        <motion.div {...fadeUp(0)}>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity mb-10"
            style={{ color: c.textMuted, fontFamily: "'Space Grotesk', sans-serif" }}
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
          {/* Title */}
          <h1
            className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-2"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: c.heading }}
          >
            Virdis
          </h1>
          <p
            className="text-sm uppercase tracking-widest font-medium mb-6"
            style={{ color: c.gold, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Precision Agriculture Platform
          </p>
          <p
            className="text-base md:text-lg leading-relaxed max-w-2xl mb-8"
            style={{ color: c.textMuted }}
          >
            A modern precision-agriculture platform that lets farmers and agronomists map fields,
            monitor crop health via satellite imagery, analyze NDVI vegetation indices,
            and receive AI-powered recommendations from a single interactive dashboard.
          </p>

          {/* Links */}
          <div className="flex gap-3 mb-10">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-85 transition-opacity"
                style={{
                  backgroundColor: c.gold,
                  color: '#1D2A23',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-12">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-md font-medium uppercase tracking-wider"
                style={{
                  backgroundColor: c.tagBg,
                  border: `1px solid ${c.tagBorder}`,
                  color: c.tagText,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px mb-10" style={{ backgroundColor: c.cardBorder }} />

          {/* Core Capabilities */}
          <div className="mb-12">
            <h2
              className="text-xs font-bold uppercase tracking-widest mb-6"
              style={{ color: c.label, fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Core Capabilities
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Interactive Satellite Map',
                  desc: 'High-resolution Mapbox basemap with polygon drawing, field editing, fly-to animations, and layer toggles.',
                },
                {
                  title: 'NDVI Vegetation Analysis',
                  desc: 'Sentinel-2 satellite imagery processed through Google Earth Engine to calculate vegetation health indices in real time.',
                },
                {
                  title: 'Auto Field Detection',
                  desc: 'Single-click field detection using NDVI-based region-growing segmentation, returning boundaries, area, and health scores.',
                },
                {
                  title: 'AI Agronomic Insights',
                  desc: 'AI-generated crop health assessments, irrigation recommendations, pest risk analysis, and scouting suggestions.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-xl"
                  style={{
                    backgroundColor: c.cardBg,
                    border: `1px solid ${c.cardBorder}`,
                  }}
                >
                  <h3
                    className="font-bold text-sm mb-2"
                    style={{ color: c.heading, fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: c.textMuted }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* How Detection Works */}
          <div className="mb-12">
            <h2
              className="text-xs font-bold uppercase tracking-widest mb-6"
              style={{ color: c.label, fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Detection Flow
            </h2>
            <div
              className="p-6 rounded-xl font-mono text-sm leading-loose"
              style={{
                backgroundColor: c.cardBg,
                border: `1px solid ${c.cardBorder}`,
                color: c.textMuted,
              }}
            >
              <span style={{ color: c.heading, fontWeight: 600 }}>User Click</span>{' '}
              <span style={{ color: c.gold }}>→</span> Capture lat/lon
              <br />
              <span style={{ color: c.gold }}>→</span> Edge Function queries Sentinel-2
              <br />
              <span style={{ color: c.gold }}>→</span> NDVI calculation (NIR − Red) / (NIR + Red)
              <br />
              <span style={{ color: c.gold }}>→</span> Region-growing segmentation
              <br />
              <span style={{ color: c.gold }}>→</span>{' '}
              <span style={{ color: c.heading, fontWeight: 600 }}>GeoJSON polygon + stats returned</span>
            </div>
          </div>

          {/* NDVI Scale */}
          <div className="mb-12">
            <h2
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: c.label, fontFamily: "'Space Grotesk', sans-serif" }}
            >
              NDVI Scale
            </h2>
            <div className="flex gap-3">
              {[
                { color: '#d73027', label: 'Stressed' },
                { color: '#fee08b', label: 'Moderate' },
                { color: '#2e7d32', label: 'Healthy' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs" style={{ color: c.textMuted }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-12">
            <h2
              className="text-xs font-bold uppercase tracking-widest mb-6"
              style={{ color: c.label, fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Tech Stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Frontend', value: 'React 18' },
                { label: 'Language', value: 'TypeScript' },
                { label: 'Mapping', value: 'Mapbox GL JS' },
                { label: 'Satellite', value: 'Google Earth Engine' },
                { label: 'Styling', value: 'Tailwind + shadcn' },
                { label: 'Charts', value: 'Recharts' },
                { label: 'AI', value: 'Lovable AI' },
                { label: 'Weather', value: 'Open-Meteo API' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-lg"
                  style={{
                    backgroundColor: c.cardBg,
                    border: `1px solid ${c.cardBorder}`,
                  }}
                >
                  <p
                    className="text-xs uppercase tracking-wider mb-1"
                    style={{ color: c.label, fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: c.heading, fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture */}
          <div className="mb-12">
            <h2
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: c.label, fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Architecture
            </h2>
            <div
              className="p-6 rounded-xl font-mono text-sm leading-loose"
              style={{
                backgroundColor: c.cardBg,
                border: `1px solid ${c.cardBorder}`,
                color: c.textMuted,
              }}
            >
              <span style={{ color: c.heading, fontWeight: 600 }}>Frontend</span> (React + Mapbox)
              <br />
              &nbsp;&nbsp;&nbsp;|
              <br />
              &nbsp;&nbsp;&nbsp;v
              <br />
              <span style={{ color: c.heading, fontWeight: 600 }}>Backend Functions</span>
              <br />
              &nbsp;&nbsp;&nbsp;|
              <br />
              &nbsp;&nbsp;
              <span style={{ color: c.gold }}>NDVI Tiles</span> &nbsp;|&nbsp;{' '}
              <span style={{ color: c.gold }}>Field Detection</span> &nbsp;|&nbsp;{' '}
              <span style={{ color: c.gold }}>AI Analysis</span>
              <br />
              &nbsp;&nbsp;&nbsp;|
              <br />
              <span style={{ color: c.heading, fontWeight: 600 }}>Google Earth Engine</span> (Sentinel-2)
            </div>
          </div>

          {/* Key Features list */}
          <div className="mb-12">
            <h2
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: c.label, fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Key Features
            </h2>
            <div
              className="p-6 rounded-xl space-y-2.5"
              style={{
                backgroundColor: c.cardBg,
                border: `1px solid ${c.cardBorder}`,
              }}
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
                  <span className="mt-0.5 text-xs" style={{ color: c.gold }}>
                    ▸
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: c.text }}>
                    {feat}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Screenshot */}
          <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${c.cardBorder}` }}>
            {project.live ? (
              <a href={project.live} target="_blank" rel="noopener noreferrer">
                <img
                  src={project.imageSrc}
                  alt={`${project.title} preview`}
                  className="w-full object-cover"
                  style={{ maxHeight: 480 }}
                />
              </a>
            ) : (
              <img
                src={project.imageSrc}
                alt={`${project.title} preview`}
                className="w-full object-cover"
                style={{ maxHeight: 480 }}
              />
            )}
          </div>
        </motion.div>

        {/* Nav prev/next */}
        <motion.div
          {...fadeUp(0.4)}
          className="pt-8 mt-8 grid grid-cols-2 gap-4"
          style={{ borderTop: `1px solid ${c.cardBorder}` }}
        >
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.id}`}
              className="group flex flex-col gap-1 p-5 rounded-xl transition-colors"
              style={{ backgroundColor: c.navBg, border: `1px solid ${c.cardBorder}` }}
            >
              <span
                className="text-xs uppercase tracking-widest flex items-center gap-1"
                style={{ color: c.label }}
              >
                <ArrowLeft className="w-3 h-3" /> Previous
              </span>
              <span
                className="text-sm font-bold group-hover:translate-x-0.5 transition-transform"
                style={{ color: c.heading, fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Link
              to={`/projects/${nextProject.id}`}
              className="group flex flex-col gap-1 p-5 rounded-xl transition-colors text-right ml-auto w-full"
              style={{ backgroundColor: c.navBg, border: `1px solid ${c.cardBorder}` }}
            >
              <span
                className="text-xs uppercase tracking-widest flex items-center justify-end gap-1"
                style={{ color: c.label }}
              >
                Next <ArrowRight className="w-3 h-3" />
              </span>
              <span
                className="text-sm font-bold group-hover:-translate-x-0.5 transition-transform"
                style={{ color: c.heading, fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {nextProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default VirdisDetail;
