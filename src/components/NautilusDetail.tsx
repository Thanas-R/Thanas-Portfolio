import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft, ArrowRight, Github, Brain, Layout, Layers, GitBranch, Save, MessageSquare, Network, GitFork, Waves, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import Navbar from '@/components/Navbar';
import nautilusBg from '@/assets/nautilus_bg.webp';
import { Project } from '@/components/ProjectsSection';
import { useCallback, useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: 'easeOut' as const },
});

interface NautilusDetailProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

/* ── Flowchart node data (taken from the Nautilus GitHub readme) ── */
interface FlowNode {
  id: string;
  title: string;
  content: string;
  icon: React.ElementType;
  iconColor: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const FEATURES: FlowNode[] = [
  {
    id: 'canvas',
    title: 'Knowledge Canvas',
    content: 'Every prompt becomes one independent card with a short title, a summary and an explanation. Cards never extend each other.',
    icon: Layout,
    iconColor: '#7E97C9',
    x: 24, y: 26, width: 348, height: 148,
  },
  {
    id: 'fields',
    title: 'Nine Linking Fields',
    content: 'Each card is embedded on nine separate fields with all MiniLM L6 v2, and every field carries its own weight in the final score.',
    icon: Layers,
    iconColor: '#B5854F',
    x: 430, y: 48, width: 306, height: 152,
  },
  {
    id: 'scoring',
    title: 'Weighted Cosine Scoring',
    content: 'A pair of cards is scored as a weighted sum of per field cosine similarities. Pairs above 0.4 become links.',
    icon: GitBranch,
    iconColor: '#4E9A7C',
    x: 48, y: 248, width: 296, height: 140,
  },
  {
    id: 'explain',
    title: 'LLM Explained Links',
    content: 'Only linked pairs reach the LLM. It writes a short label plus a reason for why and how the two concepts connect.',
    icon: Brain,
    iconColor: '#C4704F',
    x: 420, y: 244, width: 316, height: 152,
  },
  {
    id: 'boundary',
    title: 'Boundary Band Rating',
    content: 'Links scoring between 0.4 and 0.55 are flagged as boundary links and prompt you to rate the connection.',
    icon: MessageSquare,
    iconColor: '#8E7FD1',
    x: 32, y: 460, width: 302, height: 140,
  },
  {
    id: 'nnls',
    title: 'NNLS Personalisation',
    content: 'Rate links out of 100 and non negative least squares refits the nine field weights to match your judgement.',
    icon: Network,
    iconColor: '#6FAE8C',
    x: 402, y: 478, width: 334, height: 132,
  },
];

/* ── Hand-drawn curvy connectors: each edge gets its own relaxed bezier, no two alike ── */
const EDGE_PATHS: Record<string, string> = {
  // canvas -> fields: dips low, then lifts into the side of the card
  'canvas-fields': 'M 372 96 C 400 168, 396 58, 430 118',
  // fields -> scoring: long sweeping droop across the canvas
  'fields-scoring': 'M 462 200 C 492 262, 330 208, 214 248',
  // scoring -> explain: lazy wave sideways
  'scoring-explain': 'M 344 314 C 372 356, 386 280, 420 316',
  // scoring -> boundary: gentle drop with a lean
  'scoring-boundary': 'M 152 388 C 138 430, 176 428, 178 460',
  // boundary -> nnls: rising swoop into the side
  'boundary-nnls': 'M 334 528 C 362 574, 366 506, 402 540',
};

/* ── Key features graph: relaxed hand-drawn curves, cards adapt to the theme ── */
const FlowchartCanvas = ({ isDark }: { isDark: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setScale(Math.min(1, (w - 4) / 760));
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const canvasW = 760;
  const canvasH = 640;
  const edgeColor = isDark ? 'rgba(126, 178, 152, 0.55)' : 'rgba(64, 104, 84, 0.5)';
  const cardBg = isDark ? '#161A18' : '#FFFFFF';
  const cardBorder = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const titleColor = isDark ? '#EDEDED' : '#1A1A1A';
  const bodyColor = isDark ? 'rgba(255, 255, 255, 0.55)' : 'rgba(0, 0, 0, 0.58)';
  const cardShadow = isDark
    ? '0 12px 30px -16px rgba(0, 0, 0, 0.75)'
    : '0 12px 28px -16px rgba(0, 0, 0, 0.18)';

  return (
    <div ref={containerRef} className="w-full">
      <div
        style={{
          width: canvasW,
          height: canvasH * scale,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
        className="relative"
      >
        {/* edges first, cards sit on top */}
        <svg className="absolute inset-0 pointer-events-none" width={canvasW} height={canvasH}>
          {Object.entries(EDGE_PATHS).map(([key, d], edgeIdx) => {
            return (
              <motion.path
                key={key}
                d={d}
                fill="none"
                stroke={edgeColor}
                strokeWidth="1.6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + edgeIdx * 0.12, ease: 'easeOut' }}
              />
            );
          })}
        </svg>

        {FEATURES.map((node, i) => {
          const Icon = node.icon;
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
              className="absolute p-4"
              style={{
                left: node.x,
                top: node.y,
                width: node.width,
                height: node.height,
                backgroundColor: cardBg,
                border: `1px solid ${cardBorder}`,
                borderRadius: '12px',
                boxShadow: cardShadow,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 shrink-0" style={{ color: node.iconColor }} />
                <h3
                  className="text-[15px] leading-tight text-left"
                  style={{ color: titleColor, fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                >
                  {node.title}
                </h3>
              </div>
              <p
                className="text-[13px] leading-relaxed text-left"
                style={{ color: bodyColor, fontFamily: "'Inter', sans-serif" }}
              >
                {node.content}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const MERMAID_CHART = `graph TD
    A["App.tsx"] --> B["QueryClientProvider + CanvasStoreProvider"]
    B --> C["Index.tsx"]
    C --> D["KnowledgeCanvas\\n(React Flow)"]
    C --> E["LeftSidebar\\n(Chat Sessions)"]
    C --> F["SettingsPanel\\n(Theme, Layout)"]
    C --> G["CommandPalette\\n(Ctrl+K)"]
    D --> H["10 Node Types\\n(TopicCard, ConceptBlock,\\nBuildingCard, KnowledgeNode,\\nTextNode, ImageNode...)"]
    D --> I["Custom Edge Types\\n(BezierLabeledEdge)"]
    D --> J["FloatingChatInput\\n(AI Prompt Bar)"]
    D --> K["Toolbar +\\nDrawingToolbar +\\nDrawingCanvas"]
    D --> L["CanvasControls\\n(Zoom, Undo/Redo)"]
    D --> M["PathExplainPanel"]
`;

const MermaidDiagram = ({ isDark }: { isDark: boolean }) => {
  const [svg, setSvg] = useState('');

  useEffect(() => {
    const id = 'nautilus-arch-' + Date.now();
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? 'dark' : 'default',
      themeVariables: isDark
        ? { primaryColor: '#1a1a1a', primaryBorderColor: '#333', primaryTextColor: '#e5e5e5', lineColor: '#444', secondaryColor: '#111' }
        : { primaryColor: '#f5f5f5', primaryBorderColor: '#ddd', primaryTextColor: '#1a1a1a', lineColor: '#bbb', secondaryColor: '#fafafa' },
      flowchart: { curve: 'basis', padding: 16 },
    });
    mermaid.render(id, MERMAID_CHART).then(({ svg: renderedSvg }) => {
      setSvg(renderedSvg);
    });
  }, [isDark]);

  return (
    <div
      className="w-full flex justify-center [&_svg]:max-w-full [&_svg]:h-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

/* ── Side-edge backdrop: image peeks in only at the far left & right, with a smooth fade-in ── */
const NautilusSideBg = ({ isDark }: { isDark: boolean }) => {
  const pageCover = isDark ? '#0C0F0D' : '#F4F2EE';
  const [bgLoaded, setBgLoaded] = useState(false);
  return (
    <div className="fixed inset-0 z-0" aria-hidden>
      <img
        src={nautilusBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        decoding="async"
        onLoad={() => setBgLoaded(true)}
        style={{
          filter: 'blur(6px)',
          transform: 'scale(1.03)',
          opacity: bgLoaded ? 1 : 0,
          transition: 'opacity 700ms ease-out',
        }}
      />
      {/* cover the middle with a long, smooth gradient so only narrow edge strips remain */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, transparent 0%, transparent 3%, ${pageCover} 12%, ${pageCover} 88%, transparent 97%, transparent 100%)`,
        }}
      />
      {/* soften the image behind the edge strips */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.15))'
            : 'linear-gradient(to bottom, rgba(255,255,255,0.12), rgba(255,255,255,0.28))',
          mixBlendMode: isDark ? 'multiply' : 'normal',
        }}
      />
    </div>
  );
};

const NautilusDetail = ({ project, prevProject, nextProject }: NautilusDetailProps) => {
  const { isDark } = useTheme();

  const textColor = isDark ? 'hsl(0 0% 65%)' : 'hsl(0 0% 40%)';
  const headingColor = isDark ? 'hsl(0 0% 96%)' : 'hsl(0 0% 10%)';
  const cardBg = isDark ? 'hsl(150 8% 7%)' : 'hsl(40 33% 97%)';
  const cardBorder = isDark ? 'hsl(150 10% 16%)' : 'hsl(40 15% 85%)';
  const dashedBorder = isDark ? 'rgba(120, 190, 155, 0.4)' : 'rgba(40, 80, 60, 0.45)';
  const labelColor = isDark ? 'hsl(0 0% 45%)' : 'hsl(0 0% 55%)';

  const font = "'Inter', sans-serif";
  const hand = "'Caveat', cursive";

  const techStack = [
    { l: 'Backend', v: 'Python 3.12 · FastAPI · Uvicorn · Pydantic' },
    { l: 'Database', v: 'PostgreSQL 16 · pgvector · psycopg 3' },
    { l: 'Embeddings', v: 'sentence-transformers · all-MiniLM-L6-v2 (384-d)' },
    { l: 'Personalisation', v: 'SciPy · NumPy (NNLS)' },
    { l: 'LLM', v: 'Groq · gpt-oss-20b' },
    { l: 'Frontend', v: 'React 18 · TypeScript · Vite · Tailwind CSS · @xyflow/react' },
    { l: 'Deployment', v: 'Docker Compose · Caddy 2 · Google Compute Engine' },
  ];

  return (
    <>
      <NautilusSideBg isDark={isDark} />
      <div className="relative z-10 min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 pt-12 pb-24">
          {/* Top navigation row: Back link on left, Work in Progress badge on far right */}
          <motion.div {...fadeUp(0)} className="flex items-center justify-between gap-4 mb-8">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
              style={{ color: textColor, fontFamily: font }}
            >
              <ArrowLeft className="w-4 h-4" />
              All Projects
            </Link>

            <span
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] px-3 py-1 rounded-full border shadow-sm -rotate-2 hover:rotate-0 transition-transform select-none"
              style={{
                borderColor: isDark ? 'rgba(255,241,119,0.5)' : '#e5d752',
                color: isDark ? '#FFF177' : '#8a7a14',
                backgroundColor: isDark ? 'rgba(255,241,119,0.12)' : 'rgba(255,241,119,0.22)',
                fontFamily: font,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Work in Progress
            </span>
          </motion.div>

          {/* Title Row: Nautilus on left, Live Demo & GitHub on right */}
          <motion.div {...fadeUp(0.08)} className="mb-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h1
                className="text-6xl md:text-8xl leading-none"
                style={{ fontFamily: hand, fontWeight: 700, color: headingColor }}
              >
                Nautilus
              </h1>

              <div className="flex items-center gap-2.5">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-opacity hover:opacity-85 shadow-sm"
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
                  href="https://github.com/Thanas-R/Nautilus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-opacity hover:opacity-75"
                  style={{
                    borderColor: cardBorder,
                    color: headingColor,
                    fontFamily: font,
                  }}
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
          {/* Description — taken from the Nautilus GitHub readme */}
          <motion.div {...fadeUp(0.12)} className="mb-10">
            <p
              className="text-sm md:text-base leading-relaxed w-full"
              style={{ color: textColor, fontFamily: font }}
            >
              Nautilus replaces the linear chat thread with a node based canvas. Every prompt becomes one independent card with a short title, a summary and an explanation, and the system continuously compares each new card against everything already on the canvas. Each card is embedded as nine separate field vectors with a MiniLM embedding model, and a weighted cosine score decides when two concepts are related. Above the threshold Nautilus draws a labelled link, and only then does the LLM explain why and how the ideas connect. Links can be rated out of 100, and non negative least squares refits the field weights so the graph slowly learns from your judgement. Built with FastAPI, PostgreSQL with pgvector and React Flow, and still very much a work in progress.
            </p>
          </motion.div>
        </div>

        {/* Key features graph: dotted grid sits on the page background, blending into the page */}
        <div className="w-screen relative left-1/2 -translate-x-1/2" style={{ backgroundColor: isDark ? '#0C0F0D' : '#F4F2EE' }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, ${isDark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.08)'} 1.2px, transparent 1.3px)`,
              backgroundSize: '26px 26px',
            }}
            aria-hidden
          />
          <div className="relative max-w-4xl mx-auto px-6 py-14">
            <motion.div {...fadeUp(0.2)}>
              <h2
                className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-6"
                style={{ color: isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.5)', fontFamily: font }}
              >
                Key Features
              </h2>
              <FlowchartCanvas isDark={isDark} />
            </motion.div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 pt-12 pb-24">
          {/* Neural Retrieval */}
          <motion.div {...fadeUp(0.24)}>
            <h2
              className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-5"
              style={{ color: labelColor, fontFamily: font }}
            >
              Neural Retrieval
            </h2>
            <div className="grid md:grid-cols-3 gap-3 mb-3">
              {[
                {
                  icon: Network,
                  title: 'GNNs',
                  desc: 'Graph neural networks pass messages along the edges of the knowledge graph, so every card\u2019s embedding is shaped by the ideas it connects to. The structure of the graph itself becomes part of the representation.',
                },
                {
                  icon: GitFork,
                  title: 'Sub-GNNs',
                  desc: 'Sub graph neural networks reason over sampled neighbourhoods instead of the whole graph, so local clusters of ideas can be retrieved efficiently even as the canvas grows into thousands of nodes.',
                },
                {
                  icon: Waves,
                  title: 'Spatio-Temporal GNNs',
                  desc: 'Spatio temporal GNNs model both structure and time, tracking how the links between your concepts evolve across sessions, so retrieval can surface what you were actively building recently.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-5"
                  style={{
                    backgroundColor: cardBg,
                    border: `1.5px dashed ${dashedBorder}`,
                    borderRadius: '14px 10px 15px 9px',
                  }}
                >
                  <div className="flex items-center gap-2 mb-2.5">
                    <item.icon className="w-4 h-4 shrink-0" style={{ color: isDark ? 'rgba(180, 180, 180, 0.85)' : 'rgba(70, 70, 70, 0.75)' }} />
                    <h3
                      className="text-[15px] leading-tight"
                      style={{ color: headingColor, fontFamily: font, fontWeight: 600 }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p
                    className="text-[13px] leading-relaxed"
                    style={{ color: textColor, fontFamily: font }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
            <div
              className="p-5 rounded-xl mb-12"
              style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}
            >
              <div className="flex items-center gap-2 mb-2.5">
                <Cpu className="w-4 h-4 shrink-0" style={{ color: isDark ? 'rgba(180, 180, 180, 0.85)' : 'rgba(70, 70, 70, 0.75)' }} />
                <h3
                  className="text-[15px] leading-tight"
                  style={{ color: headingColor, fontFamily: font, fontWeight: 600 }}
                >
                  Embeddings & NNLS
                </h3>
              </div>
              <p
                className="text-[13px] leading-relaxed"
                style={{ color: textColor, fontFamily: font }}
              >
                Embeddings run locally in process with all MiniLM L6 v2, one normalised 384 dimension vector per field, so scoring never waits on an external API. A single embedding blends everything, so a shared example would look the same as a shared mechanism, and the nine per field vectors keep every match explainable. After enough link ratings, non negative least squares refits the field weights, and the learned weights are blended with the defaults so a field can matter more or less but never count negatively.
              </p>
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div {...fadeUp(0.28)}>
            <h2
              className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-5"
              style={{ color: labelColor, fontFamily: font }}
            >
              Tech Stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
              {techStack.map((item, i) => (
                <div
                  key={item.l}
                  className="p-3.5"
                  style={{
                    backgroundColor: cardBg,
                    border: `1.5px dashed ${dashedBorder}`,
                    borderRadius: '12px 9px 13px 8px',
                  }}
                >
                  <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: labelColor, fontFamily: font }}>{item.l}</p>
                  <p className="text-[13px] font-medium leading-snug" style={{ color: headingColor, fontFamily: font }}>{item.v}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Architecture Diagram */}
          <motion.div {...fadeUp(0.32)}>
            <h2
              className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-5"
              style={{ color: labelColor, fontFamily: font }}
            >
              Architecture
            </h2>
            <div
              className="rounded-2xl p-6 mb-12 overflow-x-auto"
              style={{ border: `1px solid ${cardBorder}`, backgroundColor: cardBg }}
            >
              <MermaidDiagram isDark={isDark} />
            </div>
          </motion.div>

          {/* Credits */}
          <motion.div {...fadeUp(0.34)}>
            <h2
              className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-5"
              style={{ color: labelColor, fontFamily: font }}
            >
              Credits
            </h2>
            <div
              className="p-5 mb-12"
              style={{ backgroundColor: cardBg, border: `1.5px dashed ${dashedBorder}`, borderRadius: '14px 10px 15px 9px' }}
            >
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm" style={{ fontFamily: font }}>
                <p style={{ color: headingColor }}>
                  <span className="font-medium" style={{ color: isDark ? 'hsl(0 0% 55%)' : 'hsl(0 0% 50%)' }}>Full-stack development and integration:</span>{' '}
                  <span className="font-semibold">Thanas R</span>
                </p>
                <span className="hidden sm:inline text-muted-foreground/40">•</span>
                <p style={{ color: headingColor }}>
                  <span className="font-medium" style={{ color: isDark ? 'hsl(0 0% 55%)' : 'hsl(0 0% 50%)' }}>Concept and Converge mode:</span>{' '}
                  <a
                    href="https://github.com/Tanay-s5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:opacity-70 transition-opacity underline underline-offset-2"
                  >
                    @tanay-s5
                  </a>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Screenshot — presented as a sketched plate */}
          <motion.div {...fadeUp(0.38)}>
            <div
              className="relative overflow-hidden"
              style={{
                border: `1.5px dashed ${dashedBorder}`,
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
          </motion.div>

          {/* Nav prev/next */}
          <motion.div
            {...fadeUp(0.4)}
            className="pt-8 mt-8 grid grid-cols-2 gap-4"
            style={{ borderTop: `1px dashed ${dashedBorder}` }}
          >
            {prevProject ? (
              <Link
                to={`/projects/${prevProject.id}`}
                className="group flex flex-col gap-1 p-5 rounded-xl transition-colors"
                style={{ backgroundColor: cardBg, border: `1.5px dashed ${dashedBorder}` }}
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
                style={{ backgroundColor: cardBg, border: `1.5px dashed ${dashedBorder}` }}
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

export default NautilusDetail;
