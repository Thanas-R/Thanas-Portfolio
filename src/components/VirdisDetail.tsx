import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft, ArrowRight, Map, BarChart3, Cpu, Cloud, Github, Satellite, LineChart, Layers } from 'lucide-react';
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

  // theme-aware grid color: subtle white on dark, greyish on light
  const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(120,120,120,0.18)';

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: pageBg }}>
      {/* Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${gridColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10">
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
                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg hover:scale-[1.03] active:scale-[0.98] transition-all"
                    style={{
                      backgroundColor: 'rgba(255,251,235,0.08)',
                      border: '1px solid rgba(255,251,235,0.15)',
                    }}
                  >
                    <Github className="w-4 h-4" style={{ color: text }} />
                  </a>
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
              </div>

              {/* Description */}
              <p
                className="text-sm md:text-base leading-relaxed max-w-2xl mb-8"
                style={{ color: textMuted, fontFamily: font }}
              >
                A precision agriculture web platform that helps farmers and agronomists map fields, monitor crop health from satellite imagery, and receive AI-driven agronomic insights through an interactive geospatial dashboard.
              </p>

              <div className="w-full h-px mb-10" style={{ backgroundColor: divider }} />

              {/* Core Capabilities */}
              <SectionLabel label="Key Features" color={label} font={font} />
              <div className="grid md:grid-cols-2 gap-3 mb-10">
                {[
                  { icon: Map, title: 'Interactive Field Mapping', desc: 'Satellite map powered by Mapbox where users can draw and manage field polygons, switch map styles, and navigate fields with smooth fly-to interactions.' },
                  { icon: BarChart3, title: 'NDVI Crop Health Monitoring', desc: 'Sentinel-2 imagery processed through Google Earth Engine to calculate NDVI (Normalized Difference Vegetation Index) and visualize crop health directly on the map.' },
                  { icon: Cpu, title: 'AI Agronomic Insights', desc: 'Field data and vegetation metrics are analyzed using Gemini 2.5 Flash to generate crop health assessments, irrigation guidance, pest risk indicators, and crop recommendations.' },
                  { icon: Cloud, title: 'Weather Integration', desc: 'Per-field weather data including temperature, rainfall, humidity, and wind sourced from Open-Meteo.' },
                  { icon: LineChart, title: 'NDVI Time-Series Analysis', desc: 'Historical vegetation tracking used to estimate growth rate, canopy cover, and biomass trends over time.' },
                  { icon: Layers, title: 'Geospatial Analytics', desc: 'Additional environmental layers derived from satellite data including land cover classification, elevation, slope, rainfall, and soil carbon.' },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-5 rounded-xl flex gap-4 backdrop-blur-md"
                    style={{ backgroundColor: 'rgba(0,0,0,0.7)', border: `1px solid rgba(255,255,255,0.1)` }}
                  >
                    <item.icon className="w-5 h-5 mt-0.5 shrink-0" style={{ color: green }} />
                    <div>
                      <h3 className="font-semibold text-sm mb-1" style={{ color: heading, fontFamily: font }}>{item.title}</h3>
                      <p className="text-[13px] leading-relaxed" style={{ color: textMuted, fontFamily: font }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Architecture — Flowchart */}
              <SectionLabel label="Architecture" color={label} font={font} />
              <div className="mb-10 flex justify-center">
                <div
                  className="p-6 md:p-8 rounded-xl w-full max-w-2xl"
                  style={{ backgroundColor: codeBg, border: `1px solid ${cardBorder}` }}
                >
                  {/* Flowchart boxes */}
                  <div className="flex flex-col items-center gap-0" style={{ fontFamily: monoFont, fontSize: '13px' }}>
                    {/* User */}
                    <div className="px-5 py-2.5 rounded-lg text-center font-semibold" style={{ backgroundColor: 'rgba(255,251,235,0.08)', border: '1px solid rgba(255,251,235,0.15)', color: heading }}>
                      User / Browser
                    </div>
                    <div className="w-px h-6" style={{ backgroundColor: divider }} />
                    <span style={{ color: green, fontSize: '16px' }}>▼</span>
                    <div className="w-px h-2" style={{ backgroundColor: divider }} />

                    {/* Frontend */}
                    <div className="px-5 py-2.5 rounded-lg text-center" style={{ backgroundColor: 'rgba(74,140,111,0.15)', border: `1px solid ${green}`, color: heading }}>
                      <span className="font-semibold">Frontend</span>
                      <span className="block text-[11px] mt-0.5" style={{ color: textMuted }}>React + Mapbox GL JS + Tailwind</span>
                    </div>
                    <div className="w-px h-6" style={{ backgroundColor: divider }} />
                    <span style={{ color: green, fontSize: '16px' }}>▼</span>
                    <div className="w-px h-2" style={{ backgroundColor: divider }} />

                    {/* Edge Functions */}
                    <div className="px-5 py-3 rounded-lg text-center" style={{ backgroundColor: 'rgba(74,140,111,0.1)', border: `1px solid ${cardBorder}`, color: heading }}>
                      <span className="font-semibold">Edge Functions</span>
                      <span className="block text-[11px] mt-0.5" style={{ color: textMuted }}>Deno / TypeScript</span>
                    </div>
                    <div className="w-px h-4" style={{ backgroundColor: divider }} />

                    {/* Branches */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full mt-2">
                      {[
                        { name: 'gee-ndvi-tiles', target: 'Earth Engine API' },
                        { name: 'gee-detect-field', target: 'Earth Engine API' },
                        { name: 'analyze-field', target: 'Gemini 2.5 Flash' },
                        { name: 'get-mapbox-token', target: 'Mapbox API' },
                      ].map((fn) => (
                        <div key={fn.name} className="flex flex-col items-center gap-1">
                          <span style={{ color: green, fontSize: '12px' }}>▼</span>
                          <div className="px-3 py-2 rounded-md text-center w-full" style={{ backgroundColor: 'rgba(255,251,235,0.05)', border: `1px solid ${cardBorder}` }}>
                            <span className="block text-[11px] font-semibold" style={{ color: green }}>{fn.name}</span>
                            <span className="block text-[10px] mt-1" style={{ color: textMuted }}>→ {fn.target}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Database at bottom */}
                    <div className="w-px h-6 mt-3" style={{ backgroundColor: divider }} />
                    <span style={{ color: accent, fontSize: '16px' }}>▼</span>
                    <div className="w-px h-2" style={{ backgroundColor: divider }} />
                    <div className="px-5 py-2.5 rounded-lg text-center" style={{ backgroundColor: 'rgba(234,185,71,0.1)', border: `1px solid ${accent}`, color: heading }}>
                      <span className="font-semibold">Supabase</span>
                      <span className="block text-[11px] mt-0.5" style={{ color: textMuted }}>PostgreSQL + Auth + Storage</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <SectionLabel label="Tech Stack" color={label} font={font} />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
                {[
                  { l: 'Frontend', v: 'React • TypeScript • Vite • Tailwind CSS • shadcn/ui • Mapbox GL JS' },
                  { l: 'Data Visualization', v: 'Recharts' },
                  { l: 'State & Routing', v: 'TanStack Query • React Router' },
                  { l: 'Backend', v: 'Supabase Edge Functions (Deno)' },
                  { l: 'Database', v: 'Supabase PostgreSQL' },
                  { l: 'Satellite Data', v: 'Google Earth Engine (Sentinel-2)' },
                  { l: 'AI', v: 'Gemini 2.5 Flash' },
                  { l: 'Weather', v: 'Open-Meteo API' },
                ].map((item) => (
                  <div
                    key={item.l}
                    className="p-3.5 rounded-lg backdrop-blur-md"
                    style={{ backgroundColor: 'rgba(0,0,0,0.7)', border: `1px solid rgba(255,255,255,0.1)` }}
                  >
                    <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: label, fontFamily: font }}>{item.l}</p>
                    <p className="text-[13px] font-medium leading-snug" style={{ color: heading, fontFamily: font }}>{item.v}</p>
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
