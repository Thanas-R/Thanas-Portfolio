import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft, ArrowRight, Map, BarChart3, Cpu, Cloud, LineChart } from 'lucide-react';
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

  const pageBg = isDark ? '#22392E' : '#FFFFFF';
  const outsideText = isDark ? 'hsl(150 10% 65%)' : 'hsl(0 0% 40%)';
  const outsideHeading = isDark ? 'hsl(0 0% 96%)' : 'hsl(0 0% 10%)';
  const outsideBorder = isDark ? 'hsl(150 15% 22%)' : 'hsl(0 0% 90%)';
  const outsideCardBg = isDark ? 'hsl(150 18% 14%)' : 'hsl(0 0% 97%)';

  const panelBorder = '#041009';
  const panelBg = '#1D2A23';
  const cardBg = '#24322C';
  const cardBorder = '#2E3F37';

  const text = '#FFFBEB';
  const textMuted = '#8A9B8F';
  const heading = '#FFFBEB';
  const label = '#6B7D72';
  const green = '#4A8C6F';
  const divider = '#2E3F37';
  const codeBg = '#182420';
  const accent = '#EAB947';

  const font = "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const monoFont = "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace";

  return (
    <div className="min-h-screen" style={{ backgroundColor: pageBg }}>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 pt-12 pb-24">
        <motion.div {...fadeUp(0)}>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity mb-10"
            style={{ color: outsideText, fontFamily: font }}
          >
            <ArrowLeft className="w-4 h-4" />
            All Projects
          </Link>
        </motion.div>

        {/* Panel — 4px border */}
        <motion.div
          {...fadeUp(0.08)}
          className="rounded-2xl p-5 sm:p-8 md:p-12 relative overflow-hidden"
          style={{
            backgroundColor: panelBg,
            border: `4px solid ${panelBorder}`,
            boxShadow: isDark
              ? '0 25px 60px -12px rgba(0,0,0,0.5), 0 0 40px -10px rgba(74,140,111,0.15)'
              : '0 25px 60px -12px rgba(0,0,0,0.25), 0 0 30px -10px rgba(4,16,9,0.1)',
          }}
        >
          {/* Inner glow overlay */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: 'radial-gradient(ellipse at 20% 0%, rgba(74,140,111,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(234,185,71,0.06) 0%, transparent 50%)',
            }}
          />
          <div className="relative z-10">
          {/* Header */}
          <h1
            className="text-4xl md:text-6xl font-bold leading-none tracking-tight mb-2"
            style={{ fontFamily: font, color: heading }}
          >
            Virdis
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <p
              className="text-sm uppercase tracking-[0.2em] font-medium"
              style={{ color: accent, fontFamily: font }}
            >
              Satellite-Powered Precision Agriculture Platform
            </p>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold hover:scale-[1.03] active:scale-[0.98] transition-all shrink-0"
                style={{
                  backgroundColor: text,
                  color: panelBg,
                  fontFamily: font,
                  boxShadow: '0 4px 20px -4px rgba(255,251,235,0.3), 0 2px 8px -2px rgba(255,251,235,0.15)',
                }}
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>

          {/* Description */}
          <p
            className="text-sm md:text-base leading-relaxed max-w-3xl mb-4"
            style={{ color: textMuted, fontFamily: font }}
          >
            Virdis is a precision agriculture platform that enables farmers and agronomists to map fields, monitor crop health using satellite imagery, and receive AI-powered agronomic insights through an interactive geospatial dashboard.
          </p>
          <p
            className="text-sm md:text-base leading-relaxed max-w-3xl mb-8"
            style={{ color: textMuted, fontFamily: font }}
          >
            The platform integrates satellite remote sensing, geospatial visualization, weather analytics, and AI analysis to help detect crop stress early and support data-driven farm management.
          </p>

          {/* Key Technologies */}
          <p
            className="text-xs md:text-sm mb-10"
            style={{ color: label, fontFamily: font }}
          >
            React &middot; TypeScript &middot; Mapbox GL JS &middot; Supabase &middot; Google Earth Engine &middot; Gemini AI &middot; Tailwind &middot; shadcn/ui
          </p>

          <div className="w-full h-px mb-10" style={{ backgroundColor: divider }} />

          {/* Core Features */}
          <SectionLabel label="Core Features" color={label} font={font} />
          <div className="grid gap-4 mb-10">
            {[
              {
                icon: Map,
                title: 'Interactive Satellite Map',
                desc: 'High-resolution satellite basemap powered by Mapbox with full field management capabilities.',
                details: ['Manual polygon field drawing', 'Field editing and deletion', 'Field highlighting and color grouping', 'Layer visibility controls'],
              },
              {
                icon: LineChart,
                title: 'NDVI Crop Health Monitoring',
                desc: 'Sentinel-2 satellite imagery processed through Google Earth Engine to calculate vegetation health indices.',
                details: ['NDVI = (NIR - Red) / (NIR + Red)', 'B8 — Near Infrared, B4 — Red', 'Color-coded vegetation index layer overlay'],
              },
              {
                icon: BarChart3,
                title: 'Field-Level Analytics',
                desc: 'Per-field metrics including mean, min, and max NDVI, vegetation health score, and satellite acquisition date.',
                details: ['Identify crop stress and uneven growth', 'Track vegetation trends over time', 'Detect potential irrigation issues'],
              },
              {
                icon: Cpu,
                title: 'AI Agronomy Insights',
                desc: 'Gemini 2.5 Flash generates crop analysis based on NDVI values, weather data, and vegetation trends.',
                details: ['Crop health assessments', 'Irrigation recommendations', 'Field scouting suggestions', 'Early stress indicators'],
              },
              {
                icon: Cloud,
                title: 'Weather Monitoring',
                desc: 'Per-field weather insights via Open-Meteo API including temperature, wind speed, humidity, and rainfall.',
                details: ['Contextual weather data for each field', 'Improves AI crop analysis accuracy', 'Supports farm decision-making'],
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl flex gap-4"
                style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}
              >
                <item.icon className="w-5 h-5 mt-0.5 shrink-0" style={{ color: green }} />
                <div>
                  <h3 className="font-semibold text-sm mb-1" style={{ color: heading, fontFamily: font }}>{item.title}</h3>
                  <p className="text-[13px] leading-relaxed mb-2" style={{ color: textMuted, fontFamily: font }}>{item.desc}</p>
                  <ul className="space-y-0.5">
                    {item.details.map((d) => (
                      <li key={d} className="text-[12px] leading-relaxed" style={{ color: label, fontFamily: font }}>
                        &bull; {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Architecture */}
          <SectionLabel label="System Architecture" color={label} font={font} />
          <div
            className="p-5 rounded-xl text-[13px] leading-[2] mb-10"
            style={{ backgroundColor: codeBg, border: `1px solid ${cardBorder}`, fontFamily: monoFont, color: textMuted }}
          >
            <span style={{ color: heading, fontWeight: 600 }}>Frontend</span> (React + Mapbox GL JS)
            <br />
            &nbsp;&nbsp;│
            <br />
            <span style={{ color: heading, fontWeight: 600 }}>Supabase Edge Functions</span> (Deno / TypeScript)
            <br />
            &nbsp;&nbsp;├── <span style={{ color: green }}>NDVI Tiles</span>
            <br />
            &nbsp;&nbsp;├── <span style={{ color: green }}>Field Analytics</span>
            <br />
            &nbsp;&nbsp;├── <span style={{ color: green }}>AI Insights</span> → Gemini 2.5 Flash
            <br />
            &nbsp;&nbsp;└── <span style={{ color: green }}>Mapbox Token</span>
            <br />
            &nbsp;&nbsp;│
            <br />
            <span style={{ color: heading, fontWeight: 600 }}>Google Earth Engine</span> (Sentinel-2 Satellite Data)
          </div>

          {/* Tech Stack */}
          <SectionLabel label="Tech Stack" color={label} font={font} />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-10">
            {[
              { l: 'Frontend', v: 'React 18' },
              { l: 'Language', v: 'TypeScript' },
              { l: 'Maps', v: 'Mapbox GL JS' },
              { l: 'Styling', v: 'Tailwind + shadcn' },
              { l: 'Backend', v: 'Supabase Edge Fn' },
              { l: 'Runtime', v: 'Deno' },
              { l: 'Satellite', v: 'Earth Engine' },
              { l: 'Imagery', v: 'Sentinel-2' },
              { l: 'AI', v: 'Gemini 2.5 Flash' },
              { l: 'Weather', v: 'Open-Meteo' },
            ].map((item) => (
              <div
                key={item.l}
                className="p-3.5 rounded-lg"
                style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}
              >
                <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: label, fontFamily: font }}>{item.l}</p>
                <p className="text-sm font-semibold" style={{ color: heading, fontFamily: font }}>{item.v}</p>
              </div>
            ))}
          </div>

          {/* Screenshot */}
          <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${cardBorder}` }}>
            {project.live ? (
              <a href={project.live} target="_blank" rel="noopener noreferrer">
                <img src={project.imageSrc} alt={`${project.title} preview`} className="w-full object-cover" style={{ maxHeight: 480 }} />
              </a>
            ) : (
              <img src={project.imageSrc} alt={`${project.title} preview`} className="w-full object-cover" style={{ maxHeight: 480 }} />
            )}
          </div>
          </div>
        </motion.div>

        {/* Nav prev/next */}
        <motion.div
          {...fadeUp(0.4)}
          className="pt-8 mt-8 grid grid-cols-2 gap-4"
          style={{ borderTop: `1px solid ${outsideBorder}` }}
        >
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.id}`}
              className="group flex flex-col gap-1 p-5 rounded-xl transition-colors"
              style={{ backgroundColor: outsideCardBg, border: `1px solid ${outsideBorder}` }}
            >
              <span className="text-[11px] uppercase tracking-widest flex items-center gap-1" style={{ color: outsideText, fontFamily: font }}>
                <ArrowLeft className="w-3 h-3" /> Previous
              </span>
              <span className="text-sm font-semibold group-hover:translate-x-0.5 transition-transform" style={{ color: outsideHeading, fontFamily: font }}>
                {prevProject.title}
              </span>
            </Link>
          ) : <div />}
          {nextProject ? (
            <Link
              to={`/projects/${nextProject.id}`}
              className="group flex flex-col gap-1 p-5 rounded-xl transition-colors text-right ml-auto w-full"
              style={{ backgroundColor: outsideCardBg, border: `1px solid ${outsideBorder}` }}
            >
              <span className="text-[11px] uppercase tracking-widest flex items-center justify-end gap-1" style={{ color: outsideText, fontFamily: font }}>
                Next <ArrowRight className="w-3 h-3" />
              </span>
              <span className="text-sm font-semibold group-hover:-translate-x-0.5 transition-transform" style={{ color: outsideHeading, fontFamily: font }}>
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
