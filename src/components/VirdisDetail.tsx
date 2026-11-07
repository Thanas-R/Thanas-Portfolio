import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft, ArrowRight, Github, Map, BarChart3, Cpu, Cloud, Satellite, Layers, Droplets, Mountain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import TopoLinesBackground from '@/components/TopoLinesBackground';
import mermaid from 'mermaid';
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

/* ── Architecture: Mermaid flow, themed to the page's dark green palette ── */
const VIRDIS_CHART = `graph TD
    U["User / Browser"] --> FE["React 18 Frontend<br/>Mapbox GL JS · TanStack Query · Recharts"]
    FE --> EF["Supabase Edge Functions<br/>Deno Runtime"]
    EF --> F1["analyze-field"]
    EF --> F2["gee-analytics"]
    EF --> F3["gee-ndvi-tiles"]
    EF --> F4["ndvi-timeseries"]
    EF --> F5["crop-planning"]
    EF --> F6["soil-data"]
    EF --> F7["get-mapbox-token"]
    EF --> F8["keepalive<br/>health check"]
    F1 --> X2["Google Earth Engine<br/>+ Gemini 2.5 Pro"]
    F2 --> X2
    F3 --> X2
    F4 --> X2
    F5 --> X3["Gemini 2.5 Pro"]
    F6 --> X4["ISRIC SoilGrids API"]
    F7 --> X5["Mapbox API"]
`;

const ArchitectureDiagram = () => {
  const [svg, setSvg] = useState('');

  useEffect(() => {
    const id = 'virdis-arch-' + Date.now();
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      look: 'handDrawn',
      themeVariables: {
        darkMode: true,
        background: 'transparent',
        fontFamily: "'Caveat', cursive",
        fontSize: '18px',
        primaryColor: '#243830',
        primaryBorderColor: '#6FBF97',
        primaryTextColor: '#FFFBEB',
        lineColor: '#6FBF97',
        secondaryColor: '#1B2620',
        tertiaryColor: '#1B2620',
        clusterBkg: 'transparent',
        edgeLabelBackground: '#1D2A23',
      },
      flowchart: { curve: 'basis', padding: 14 },
    });
    mermaid.render(id, VIRDIS_CHART).then(({ svg: renderedSvg }) => {
      setSvg(renderedSvg);
    });
  }, []);

  return (
    <div
      className="w-full flex justify-center [&_svg]:max-w-full [&_svg]:h-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

/* ── Field survey diagram: satellite frame with sketched farm polygons ── */
const FieldSectionDiagram = () => {
  const line = 'rgba(74, 140, 111, 0.85)';
  const faint = 'rgba(74, 140, 111, 0.35)';
  const fillA = 'rgba(74, 140, 111, 0.18)';
  const fillB = 'rgba(198, 183, 126, 0.16)';
  const label = '#C9D6CB';
  const note = '#8A9B8F';

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

      {/* field labels, centred inside each polygon */}
      <g textAnchor="middle">
        <text x="165" y="140" fontSize="24" fill={label} fontWeight="700">Field A · NDVI 0.71</text>
        <text x="165" y="164" fontSize="18" fill={note}>groundnut · rabi</text>
        <text x="382" y="140" fontSize="24" fill={label} fontWeight="700">Field B · NDVI 0.64</text>
        <text x="382" y="164" fontSize="18" fill={note}>ragi · kharif</text>
        <text x="165" y="296" fontSize="24" fill={label} fontWeight="700">Field C · NDVI 0.38</text>
        <text x="165" y="320" fontSize="18" fill={note}>fallow · moisture low</text>
        <text x="402" y="296" fontSize="24" fill={label} fontWeight="700">Field D · NDVI 0.58</text>
        <text x="402" y="320" fontSize="18" fill={note}>coconut · mixed</text>
      </g>

      {/* satellite pass */}
      <g stroke={line} strokeWidth="1.4">
        <path d="M40 40 L600 400" strokeDasharray="2 9" />
        <rect x="540" y="44" width="26" height="18" rx="4" fill="rgba(74,140,111,0.2)" />
        <rect x="544" y="36" width="18" height="10" rx="2" />
      </g>
      <text x="470" y="34" fontSize="18" fill={note} textAnchor="end">Sentinel-2 pass</text>

      {/* north arrow + scale bar */}
      <g stroke={line} strokeWidth="1.4">
        <line x1="576" y1="120" x2="576" y2="96" />
        <path d="M570 104 L576 96 L582 104" fill="none" />
      </g>
      <text x="576" y="140" fontSize="17" fill={note} textAnchor="middle">N</text>
      <g stroke={line} strokeWidth="1.4">
        <line x1="480" y1="392" x2="580" y2="392" />
        <line x1="480" y1="387" x2="480" y2="397" />
        <line x1="530" y1="388" x2="530" y2="396" />
        <line x1="580" y1="387" x2="580" y2="397" />
      </g>
      <text x="530" y="384" fontSize="16" fill={note} textAnchor="middle">0 · 100 m</text>
    </svg>
  );
};

const VirdisDetail = ({ project, prevProject, nextProject }: VirdisDetailProps) => {
  /* Background fades in softly on mount, matching the backdrop pages */
  const [bgIn, setBgIn] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setBgIn(true))
    );
    return () => cancelAnimationFrame(raf);
  }, []);

  /* The page is always dark green, no theme switching. */
  const pageBg = '#22392E';
  const outsideText = 'hsl(150 10% 65%)';
  const outsideHeading = 'hsl(0 0% 96%)';
  const outsideBorder = 'hsl(150 15% 22%)';
  const outsideCardBg = 'hsl(150 18% 14%)';

  const panelBorder = '#041009';
  const panelBg = '#1D2A23';
  const cardBg = '#141F1A';

  const text = '#FFFBEB';
  const textMuted = '#8A9B8F';
  const heading = '#FFFBEB';
  const label = '#6B7D72';
  const green = '#4A8C6F';
  const accent = '#C6B77E';

  const font = "'Inter', sans-serif";
  const hand = "'Caveat', cursive";

  const dashedGreen = 'rgba(74, 140, 111, 0.55)';

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: pageBg }}>
      <div
        className="absolute inset-0 transition-opacity duration-[900ms] ease-out"
        style={{ opacity: bgIn ? 1 : 0 }}
      >
        <TopoLinesBackground stroke="rgba(74, 140, 111, 0.35)" className="z-0" />
      </div>

      <div className="relative z-10">
        <Navbar forceDark />

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
              border: `3px solid ${panelBorder}`,
              boxShadow: '0 25px 60px -12px rgba(0,0,0,0.5), 0 0 40px -10px rgba(74,140,111,0.15)',
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
                className="text-5xl md:text-7xl leading-none tracking-tight mb-2"
                style={{ fontFamily: "'Caesar Dressing', system-ui", fontWeight: 400, color: heading }}
              >
                ViRDIS
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
                className="text-base md:text-lg leading-relaxed text-justify mb-4"
                style={{ color: textMuted, fontFamily: font }}
              >
                Satellite-powered land analytics platform. Draw regions on a map and get NDVI vegetation analysis, climate data, soil profiling, land use classification, suitability scoring, and AI crop recommendations, all in one dashboard.{' '}
                <br></br>
                <strong className="font-semibold opacity-90" style={{ color: text }}>
                  [Shared this project on{' '}
                  <a
                    href="https://www.reddit.com/r/vibecoding/comments/1tg1lqy/i_vibecoded_something_that_really_might_help/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:opacity-80 transition-opacity"
                    style={{ color: accent }}
                  >
                    Reddit
                  </a>{' '}
                  and got a lot of love]
                </strong>
              </p>

              <div className="w-px mb-5" style={{ borderBottom: `1.5px dashed ${dashedGreen}` }} />

              {/* Key Features */}
              <h2 className="text-2xl md:text-3xl mb-5" style={{ fontFamily: "'Caesar Dressing', system-ui", color: heading }}>
                Key Features
              </h2>
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
                      <h3 className="text-[15px] leading-tight mb-1.5" style={{ color: heading, fontFamily: "'Chelsea Market', system-ui" }}>{item.title}</h3>
                      <p className="text-[13px] leading-relaxed" style={{ color: textMuted, fontFamily: font }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Field section — satellite survey sheet */}
              <SectionLabel label="Field Section" color={label} font={font} />
              <div
                className="mb-10 mt-5 p-4 md:p-6"
                style={{
                  border: `1.5px dashed ${dashedGreen}`,
                  borderRadius: '16px 12px 18px 10px',
                  backgroundColor: cardBg,
                }}
              >
                <FieldSectionDiagram />
                <p className="text-lg text-center mt-3" style={{ color: textMuted, fontFamily: hand }}>
                  each field is drawn on the map, then scored: vegetation, soil, climate, suitability
                </p>
              </div>

              {/* Architecture — Mermaid flow, themed dark green */}
              <SectionLabel label="Architecture" color={label} font={font} />
              <div
                className="mb-10 mt-5 p-6 md:p-8 rounded-2xl overflow-x-auto"
                style={{ backgroundColor: cardBg, border: `1px solid rgba(74, 140, 111, 0.35)` }}
              >
                <ArchitectureDiagram />
              </div>

              {/* Tech Stack */}
              <SectionLabel label="Tech Stack" color={label} font={font} />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10 mt-5">
                {[
                  { l: 'Frontend', v: 'React 18 · TypeScript 5 · Vite 5 · Tailwind CSS · shadcn/ui' },
                  { l: 'Mapping', v: 'Mapbox GL JS 3' },
                  { l: 'Charts', v: 'Recharts' },
                  { l: 'State & Routing', v: 'TanStack Query 5 · React Router 6' },
                  { l: 'Backend', v: 'Supabase Edge Functions (Deno)' },
                  { l: 'Satellite', v: 'Google Earth Engine (Sentinel-2 · ESA WorldCover · SRTM · CHIRPS)' },
                  { l: 'Weather', v: 'Open-Meteo (Forecast · Archive · Air Quality)' },
                  { l: 'Soil', v: 'ISRIC SoilGrids (250m)' },
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
                    <p className="text-[13px] font-medium leading-snug" style={{ color: heading, fontFamily: "'Chelsea Market', system-ui" }}>{item.v}</p>
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
                <span className="text-[11px] uppercase tracking-widest flex items-center gap-1" style={{ color: outsideText, fontFamily: font }}>
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
    className="text-[11px] font-semibold uppercase tracking-[0.15em]"
    style={{ color, fontFamily: font }}
  >
    {label}
  </h2>
);

export default VirdisDetail;
