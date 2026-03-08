import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft, ArrowRight, Leaf, BarChart3, Crosshair, Cpu, Satellite } from 'lucide-react';
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

  const pageBg = isDark ? 'hsl(0 0% 1.5%)' : '#FFFFFF';
  const outsideText = isDark ? 'hsl(0 0% 70%)' : 'hsl(0 0% 40%)';
  const outsideHeading = isDark ? 'hsl(0 0% 96%)' : 'hsl(0 0% 10%)';
  const outsideBorder = isDark ? 'hsl(0 0% 15%)' : 'hsl(0 0% 90%)';
  const outsideCardBg = isDark ? 'hsl(0 0% 6%)' : 'hsl(0 0% 97%)';

  const panelBorder = isDark ? '#FFFBEB' : '#041009';
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
          className="rounded-2xl p-8 md:p-12"
          style={{
            backgroundColor: panelBg,
            border: `4px solid ${panelBorder}`,
          }}
        >
          {/* Header */}
          <h1
            className="text-4xl md:text-6xl font-bold leading-none tracking-tight mb-2"
            style={{ fontFamily: font, color: heading }}
          >
            Virdis
          </h1>
          <div className="flex items-center gap-4 mb-6">
            <p
              className="text-xs uppercase tracking-[0.2em] font-medium"
              style={{ color: accent, fontFamily: font }}
            >
              Precision Agriculture Platform
            </p>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold hover:opacity-85 transition-opacity"
                style={{ backgroundColor: text, color: panelBg, fontFamily: font }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </a>
            )}
          </div>
          <p
            className="text-sm md:text-base leading-relaxed max-w-2xl mb-8"
            style={{ color: textMuted, fontFamily: font }}
          >
            Map fields, monitor crop health via satellite imagery, analyze NDVI indices,
            and receive AI-powered recommendations — all from a single dashboard.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            {project.tags.filter(tag => tag.toLowerCase() !== 'deno').map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-3 py-1 rounded-md font-medium uppercase tracking-wider"
                style={{
                  backgroundColor: 'rgba(255,251,235,0.06)',
                  border: '1px solid rgba(255,251,235,0.15)',
                  color: text,
                  fontFamily: font,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="w-full h-px mb-10" style={{ backgroundColor: divider }} />

          {/* Core Capabilities */}
          <SectionLabel label="Core Capabilities" color={label} font={font} />
          <div className="grid md:grid-cols-2 gap-3 mb-10">
            {[
              { icon: Satellite, title: 'Satellite Map', desc: 'Mapbox basemap with polygon drawing, field editing, and NDVI layer overlays.' },
              { icon: BarChart3, title: 'NDVI Analysis', desc: 'Sentinel-2 imagery via Google Earth Engine to calculate vegetation health indices.' },
              { icon: Crosshair, title: 'Auto Detection', desc: 'One-click field detection using region-growing segmentation via GEE computePixels.' },
              { icon: Cpu, title: 'AI Insights', desc: 'Gemini 2.5 Flash powered crop health assessments and irrigation recommendations.' },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl flex gap-4"
                style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}
              >
                <item.icon className="w-5 h-5 mt-0.5 shrink-0" style={{ color: green }} />
                <div>
                  <h3 className="font-semibold text-sm mb-1" style={{ color: heading, fontFamily: font }}>{item.title}</h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: textMuted, fontFamily: font }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Architecture */}
          <SectionLabel label="Architecture" color={label} font={font} />
          <div
            className="p-5 rounded-xl text-[13px] leading-[2] mb-10"
            style={{ backgroundColor: codeBg, border: `1px solid ${cardBorder}`, fontFamily: monoFont, color: textMuted }}
          >
            <span style={{ color: heading, fontWeight: 600 }}>Frontend</span> (React + Mapbox GL JS)
            <br />
            &nbsp;&nbsp;│
            <br />
            <span style={{ color: heading, fontWeight: 600 }}>Edge Functions</span> (Deno/TypeScript)
            <br />
            &nbsp;&nbsp;├── <span style={{ color: green }}>gee-detect-field</span> → Earth Engine REST API
            <br />
            &nbsp;&nbsp;├── <span style={{ color: green }}>gee-ndvi-tiles</span> → Earth Engine REST API
            <br />
            &nbsp;&nbsp;├── <span style={{ color: green }}>analyze-field</span> → Gemini 2.5 Flash
            <br />
            &nbsp;&nbsp;└── <span style={{ color: green }}>get-mapbox-token</span> → Mapbox API
          </div>

          {/* Tech Stack */}
          <SectionLabel label="Tech Stack" color={label} font={font} />
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-10">
            {[
              { l: 'Frontend', v: 'React 18' },
              { l: 'Language', v: 'TypeScript' },
              { l: 'Backend', v: 'Supabase Edge Fn' },
              { l: 'Runtime', v: 'Deno' },
              { l: 'Mapping', v: 'Mapbox GL JS' },
              { l: 'Satellite', v: 'Earth Engine' },
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

          {/* NDVI Scale */}
          <SectionLabel label="NDVI Scale" color={label} font={font} />
          <div className="flex gap-4 mb-10">
            {[
              { color: '#d73027', lbl: 'Stressed', range: '< 0.2' },
              { color: '#fee08b', lbl: 'Moderate', range: '0.2 – 0.5' },
              { color: '#2e7d32', lbl: 'Healthy', range: '> 0.5' },
            ].map((item) => (
              <div key={item.lbl} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs" style={{ color: textMuted, fontFamily: font }}>
                  {item.lbl} <span className="opacity-60">({item.range})</span>
                </span>
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
