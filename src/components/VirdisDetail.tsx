import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft, ArrowRight, Github, Map, BarChart3, Cpu, Cloud, Satellite, Layers, Droplets, Mountain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import Navbar from '@/components/Navbar';
import TopoLinesBackground from '@/components/TopoLinesBackground';
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

/* ── Field survey diagram: satellite frame with sketched farm polygons ── */
const FieldSectionDiagram = ({ isDark }: { isDark: boolean }) => {
  const line = isDark ? 'rgba(74, 140, 111, 0.85)' : 'rgba(31, 74, 53, 0.75)';
  const faint = isDark ? 'rgba(74, 140, 111, 0.35)' : 'rgba(31, 74, 53, 0.3)';
  const fillA = isDark ? 'rgba(74, 140, 111, 0.18)' : 'rgba(74, 140, 111, 0.16)';
  const fillB = isDark ? 'rgba(198, 183, 126, 0.16)' : 'rgba(198, 183, 126, 0.3)';
  const label = isDark ? '#C9D6CB' : '#22382C';
  const note = isDark ? '#8A9B8F' : '#4C6152';

  return (
    <svg viewBox="0 0 640 420" className="w-full h-auto" fill="none" style={{ fontFamily: "'Caveat', cursive" }}>
      {/* survey frame */}
      <rect x="24" y="24" width="592" height="372" rx="10" stroke={line} strokeWidth="1.6" strokeDasharray="9 7" />
      <rect x="34" y="34" width="572" height="352" rx="8" stroke={faint} strokeWidth="1" />
      {/* registration marks */}
      {[[24, 24], [616, 24], [24, 396], [616, 396]].map(([x, y], i) => (
        <g key={i} stroke={line} strokeWidth="1.4">
          <line x1={x - 10} y1={y} x2={x + 10} y2={y} />
          <line x1={x} y1={y - 10} x2={x} y2={y + 10} />
        </g>
      ))}

      {/* field polygons */}
      <path d="M70 90 L230 70 L260 180 L110 210 Z" fill={fillA} stroke={line} strokeWidth="1.4" />
      <path d="M300 60 L470 90 L450 200 L310 190 Z" fill={fillB} stroke={line} strokeWidth="1.4" />
      <path d="M80 250 L250 235 L235 350 L95 345 Z" fill={fillB} stroke={line} strokeWidth="1.4" />
      <path d="M300 230 L480 240 L500 350 L330 355 Z" fill={fillA} stroke={line} strokeWidth="1.4" />
      <path d="M520 250 L590 260 L590 350 L515 345 Z" fill={fillA} stroke={line} strokeWidth="1.4" />

      {/* cross-hatch on one field */}
      <g stroke={faint} strokeWidth="0.9">
        {[0, 1, 2, 3, 4, 5].map(i => (
          <line key={i} x1={95 + i * 24} y1={70} x2={135 + i * 24} y2={210} />
        ))}
      </g>

      {/* field labels */}
      <text x="130" y="150" fontSize="24" fill={label} fontWeight="700">Field A · NDVI 0.71</text>
      <text x="150" y="172" fontSize="18" fill={note}>groundnut · rabi</text>
      <text x="340" y="140" fontSize="24" fill={label} fontWeight="700">Field B · NDVI 0.64</text>
      <text x="360" y="162" fontSize="18" fill={note}>ragi · kharif</text>
      <text x="110" y="300" fontSize="24" fill={label} fontWeight="700">Field C · NDVI 0.38</text>
      <text x="130" y="322" fontSize="18" fill={note}>fallow · moisture low</text>
      <text x="330" y="300" fontSize="24" fill={label} fontWeight="700">Field D · NDVI 0.58</text>
      <text x="350" y="322" fontSize="18" fill={note}>coconut · mixed</text>

      {/* satellite pass */}
      <g stroke={line} strokeWidth="1.4">
        <path d="M40 40 L600 400" strokeDasharray="2 9" />
        <rect x="540" y="44" width="26" height="18" rx="4" fill={isDark ? 'rgba(74,140,111,0.2)' : 'rgba(255,255,255,0.7)'} />
        <rect x="544" y="36" width="18" height="10" rx="2" />
      </g>
      <text x="470" y="34" fontSize="18" fill={note}>Sentinel-2 pass</text>

      {/* north arrow + scale bar */}
      <g stroke={line} strokeWidth="1.4">
        <line x1="576" y1="120" x2="576" y2="96" />
        <path d="M570 104 L576 96 L582 104" fill="none" />
      </g>
      <text x="566" y="140" fontSize="17" fill={note}>N</text>
      <g stroke={line} strokeWidth="1.4">
        <line x1="480" y1="392" x2="580" y2="392" />
        <line x1="480" y1="387" x2="480" y2="397" />
        <line x1="530" y1="388" x2="530" y2="396" />
        <line x1="580" y1="387" x2="580" y2="397" />
      </g>
      <text x="492" y="386" fontSize="16" fill={note}>0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;100 m</text>
    </svg>
  );
};

const VirdisDetail = ({ project, prevProject, nextProject }: VirdisDetailProps) => {
  const { isDark } = useTheme();

  const pageBg = isDark ? '#22392E' : '#FFFFFF';
  const outsideText = isDark ? 'hsl(150 10% 65%)' : 'hsl(0 0% 40%)';
  const outsideHeading = isDark ? 'hsl(0 0% 96%)' : 'hsl(0 0% 10%)';
  const outsideBorder = isDark ? 'hsl(150 15% 22%)' : 'hsl(0 0% 90%)';
  const outsideCardBg = isDark ? 'hsl(150 18% 14%)' : 'hsl(0 0% 97%)';

  const panelBorder = '#041009';
  const panelBg = '#1D2A23';
  const cardBg = '#141F1A';

  const text = '#FFFBEB';
  const textMuted = '#8A9B8F';
  const heading = '#FFFBEB';
  const label = '#6B7D72';
  const green = '#4A8C6F';
  const codeBg = '#182420';
  const accent = '#C6B77E';

  const font = "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const hand = "'Caveat', cursive";

  const dashedGreen = isDark ? 'rgba(74, 140, 111, 0.55)' : 'rgba(31, 74, 53, 0.5)';
  const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(120,120,120,0.18)';

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: pageBg }}>
      {/* grid + hand-drawn topographic contour lines in green */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      <TopoLinesBackground
        stroke={isDark ? 'rgba(74, 140, 111, 0.35)' : 'rgba(31, 74, 53, 0.28)'}
        className="z-0"
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

          {/* Panel */}
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
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{
                background: 'radial-gradient(ellipse at 20% 0%, rgba(74,140,111,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(234,185,71,0.06) 0%, transparent 50%)',
              }}
            />

            <div className="relative z-10">
              {/* Header */}
              <h1
                className="text-4xl md:text-6xl leading-none tracking-tight mb-2"
                style={{ fontFamily: hand, fontWeight: 700, color: heading }}
              >
                Virdis
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <p
                  className="text-sm uppercase tracking-[0.2em] font-medium"
                  style={{ color: accent, fontFamily: font }}
                >
                  Satellite-Powered Land & Agriculture Analytics
                </p>

                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg hover:scale-[1.03] active:scale-[0.98] transition-all"
                    style={{ backgroundColor: 'rgba(255,251,235,0.08)', border: '1px solid rgba(255,251,235,0.15)' }}
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
                Satellite-powered land analytics platform. Draw regions on a map and get NDVI vegetation analysis, climate data, soil profiling, land use classification, suitability scoring, and AI crop recommendations, all in one dashboard.
              </p>

              <div className="w-px mb-10" style={{ borderBottom: `1.5px dashed ${dashedGreen}` }} />

              {/* Key Features */}
              <div className="flex items-baseline justify-between gap-3 mb-5">
                <SectionLabel label="Key Features" color={label} font={font} />
                <span className="text-xl shrink-0" style={{ color: green, fontFamily: hand }}>
                  fig. 01 — what it does
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-3 mb-10">
                {[
                  { icon: Map, title: 'Interactive Satellite Mapping', desc: 'Polygon drawing tools on Mapbox GL JS with satellite and dark basemaps, fly-to animations, geocoding search, and NDVI raster overlay.' },
                  { icon: Satellite, title: 'NDVI Vegetation Analysis', desc: 'Sentinel-2 imagery processed through Google Earth Engine at 10m resolution. Color-coded raster layer with time-series tracking.' },
                  { icon: Cloud, title: 'Climate & Air Quality', desc: 'Per-region weather analytics including temperature, precipitation, evapotranspiration, soil moisture, and air quality (PM2.5, AQI) via Open-Meteo.' },
                  { icon: Droplets, title: 'Soil Health Profiling', desc: 'ISRIC SoilGrids data at 250m resolution covering pH, organic carbon, nitrogen, sand/silt/clay texture, water retention, and USDA classification.' },
                  { icon: Layers, title: 'Land Use & Suitability', desc: 'ESA WorldCover 10m classification via GEE with radar chart scoring across soil quality, water access, climate, topography, drainage, and nutrients.' },
                  { icon: Cpu, title: 'AI Crop Planning', desc: 'Local scoring engine with 50+ crop profiles for instant results, plus Gemini 2.5 Pro for detailed intercropping and rotation strategies.' },
                  { icon: Mountain, title: 'Edge Case Detection', desc: 'Detects water bodies, deserts, polar regions, high altitude, and urban areas, then switches to the appropriate analytics mode.' },
                  { icon: BarChart3, title: 'Region Comparison', desc: 'Side-by-side comparison of two regions with synchronized analytics charts.' },
                ].map((item, i) => (
                  <div
                    key={item.title}
                    className="p-5 flex gap-4"
                    style={{
                      backgroundColor: cardBg,
                      border: `1.5px dashed ${dashedGreen}`,
                      borderRadius: '14px 10px 15px 9px',
                      transform: `rotate(${i % 2 === 0 ? -0.35 : 0.35}deg)`,
                    }}
                  >
                    <item.icon className="w-5 h-5 mt-0.5 shrink-0" style={{ color: green }} />
                    <div>
                      <h3 className="text-xl leading-none mb-1.5" style={{ color: heading, fontFamily: hand, fontWeight: 700 }}>{item.title}</h3>
                      <p className="text-[13px] leading-relaxed" style={{ color: textMuted, fontFamily: font }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Field section — satellite survey sheet */}
              <div className="flex items-baseline justify-between gap-3 mb-5">
                <SectionLabel label="Field Section" color={label} font={font} />
                <span className="text-xl shrink-0" style={{ color: green, fontFamily: hand }}>
                  fig. 02 — survey of the fields
                </span>
              </div>
              <div
                className="mb-10 p-4 md:p-6"
                style={{
                  border: `1.5px dashed ${dashedGreen}`,
                  borderRadius: '16px 12px 18px 10px',
                  backgroundColor: codeBg,
                }}
              >
                <FieldSectionDiagram isDark={isDark} />
                <p className="text-lg text-center mt-2" style={{ color: textMuted, fontFamily: hand }}>
                  each field is drawn on the map, then scored — vegetation, soil, climate, suitability
                </p>
              </div>

              {/* Architecture — hand-drawn survey flow */}
              <div className="flex items-baseline justify-between gap-3 mb-5">
                <SectionLabel label="Architecture" color={label} font={font} />
                <span className="text-xl shrink-0" style={{ color: green, fontFamily: hand }}>
                  fig. 03 — the wiring
                </span>
              </div>
              <div
                className="mb-10 p-6 md:p-8 w-full max-w-3xl mx-auto"
                style={{ backgroundColor: codeBg, border: `1.5px dashed ${dashedGreen}`, borderRadius: '16px 12px 18px 10px' }}
              >
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="px-5 py-2.5 text-center text-sm font-semibold"
                    style={{ color: heading, border: `1.5px dashed ${dashedGreen}`, borderRadius: '12px 9px 13px 8px', backgroundColor: 'rgba(255,251,235,0.05)' }}
                  >
                    User / Browser
                  </div>
                  <FlowArrow color={green} />
                  <div
                    className="px-5 py-2.5 text-center text-sm font-semibold"
                    style={{ color: heading, border: `1.5px solid ${green}`, borderRadius: '12px 9px 13px 8px', backgroundColor: 'rgba(74,140,111,0.15)' }}
                  >
                    Frontend
                    <span className="block text-[11px] mt-0.5 font-normal" style={{ color: textMuted }}>React + Mapbox GL JS + Tailwind</span>
                  </div>
                  <FlowArrow color={green} />
                  <div
                    className="px-5 py-2.5 text-center text-sm font-semibold"
                    style={{ color: heading, border: `1.5px dashed ${dashedGreen}`, borderRadius: '12px 9px 13px 8px', backgroundColor: 'rgba(74,140,111,0.1)' }}
                  >
                    Edge Functions
                    <span className="block text-[11px] mt-0.5 font-normal" style={{ color: textMuted }}>Supabase / Deno</span>
                  </div>

                  {/* Function branches */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full mt-2">
                    {[
                      { name: 'analyze-field', target: 'GEE + Gemini' },
                      { name: 'gee-analytics', target: 'Earth Engine' },
                      { name: 'gee-ndvi-tiles', target: 'Earth Engine' },
                      { name: 'ndvi-timeseries', target: 'Earth Engine' },
                      { name: 'crop-planning', target: 'Gemini 2.5 Pro' },
                      { name: 'soil-data', target: 'SoilGrids API' },
                      { name: 'get-mapbox-token', target: 'Mapbox API' },
                      { name: 'keepalive', target: 'Health Check' },
                    ].map((fn, i) => (
                      <div key={fn.name} className="flex flex-col items-center gap-1">
                        <FlowArrow color={green} small />
                        <div
                          className="px-3 py-2 text-center w-full"
                          style={{ backgroundColor: 'rgba(255,251,235,0.05)', border: `1px dashed ${dashedGreen}`, borderRadius: '10px 7px 11px 7px', transform: `rotate(${i % 2 === 0 ? -0.3 : 0.3}deg)` }}
                        >
                          <span className="block text-[11px] font-semibold" style={{ color: green }}>{fn.name}</span>
                          <span className="block text-[10px] mt-1" style={{ color: textMuted }}>→ {fn.target}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* External Data Sources */}
                  <div className="w-full flex flex-col items-center mt-3">
                    <FlowArrow color={accent} />
                    <div
                      className="px-5 py-3 text-center w-full max-w-md"
                      style={{ backgroundColor: 'rgba(198,183,126,0.1)', border: `1.5px dashed ${accent}`, borderRadius: '12px 9px 13px 8px', color: heading }}
                    >
                      <span className="text-sm font-semibold">External Data Sources</span>
                      <span className="block text-[11px] mt-1" style={{ color: textMuted }}>
                        Google Earth Engine · Open-Meteo · ISRIC SoilGrids · Mapbox · Sentinel-2 · ESA WorldCover · SRTM · CHIRPS
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="flex items-baseline justify-between gap-3 mb-5">
                <SectionLabel label="Tech Stack" color={label} font={font} />
                <span className="text-xl shrink-0" style={{ color: green, fontFamily: hand }}>
                  fig. 04 — the kit
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
                {[
                  { l: 'Frontend', v: 'React 18 · TypeScript 5 · Vite 5 · Tailwind CSS · shadcn/ui' },
                  { l: 'Mapping', v: 'Mapbox GL JS 3' },
                  { l: 'Charts', v: 'Recharts' },
                  { l: 'State & Routing', v: 'TanStack Query 5 · React Router 6' },
                  { l: 'Backend', v: 'Supabase Edge Functions (Deno)' },
                  { l: 'Satellite', v: 'Google Earth Engine (Sentinel-2 · ESA WorldCover · SRTM · CHIRPS)' },
                  { l: 'AI', v: 'Google Gemini 2.5 Pro' },
                  { l: 'Weather', v: 'Open-Meteo (Forecast · Archive · Air Quality)' },
                  { l: 'Soil', v: 'ISRIC SoilGrids (250m)' },
                  { l: 'PDF Export', v: 'jsPDF' },
                  { l: 'Animations', v: 'tailwindcss-animate' },
                ].map((item, i) => (
                  <div
                    key={item.l}
                    className="p-3.5"
                    style={{
                      backgroundColor: cardBg,
                      border: `1.5px dashed ${dashedGreen}`,
                      borderRadius: '12px 9px 13px 8px',
                      transform: `rotate(${(i % 3) === 0 ? -0.35 : (i % 3) === 2 ? 0.35 : 0}deg)`,
                    }}
                  >
                    <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: label, fontFamily: font }}>{item.l}</p>
                    <p className="text-[13px] font-medium leading-snug" style={{ color: heading, fontFamily: font }}>{item.v}</p>
                  </div>
                ))}
              </div>

              {/* Screenshot — sketched plate */}
              <div
                className="overflow-hidden"
                style={{
                  border: `1.5px dashed ${dashedGreen}`,
                  borderRadius: '16px 12px 18px 10px',
                  padding: '8px',
                  backgroundColor: cardBg,
                }}
              >
                <div className="overflow-hidden rounded-xl">
                  {project.live ? (
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      <img src={project.imageSrc} alt={`${project.title} preview`} className="w-full object-cover" style={{ maxHeight: 480 }} />
                    </a>
                  ) : (
                    <img src={project.imageSrc} alt={`${project.title} preview`} className="w-full object-cover" style={{ maxHeight: 480 }} />
                  )}
                </div>
                <p className="text-lg text-center mt-1.5 mb-0.5" style={{ color: green, fontFamily: hand }}>
                  the dashboard, pinned down
                </p>
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

/* hand-drawn down arrow */
const FlowArrow = ({ color, small }: { color: string; small?: boolean }) => (
  <svg width={small ? 12 : 16} height={small ? 14 : 22} viewBox="0 0 16 22" fill="none" aria-hidden>
    <path
      d={small ? 'M8 0 C 6 6, 10 8, 8 13 L8 14 M4 10 L8 14 L12 10' : 'M8 0 C 6.5 8, 9.5 12, 8 20 M3.5 15 L8 20 L12.5 15'}
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SectionLabel = ({ label, color, font }: { label: string; color: string; font: string }) => (
  <h2
    className="text-[11px] font-semibold uppercase tracking-[0.15em]"
    style={{ color, fontFamily: font }}
  >
    {label}
  </h2>
);

export default VirdisDetail;
