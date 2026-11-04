import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft, ArrowRight, Github, Brain, Layout, PenTool, GitBranch, Save, MessageSquare, Network, GitFork, Waves, Layers } from 'lucide-react';
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

/* ── Flowchart node data ── */
interface FlowNode {
  id: string;
  title: string;
  content: string;
  highlights?: { text: string; color: string }[];
  x: number;
  y: number;
  width: number;
  height: number;
  tilt: number; // slight hand-placed rotation, like a sketched card
}

interface FlowEdge {
  from: string;
  to: string;
  label?: string;
}

const FEATURES: FlowNode[] = [
  {
    id: 'canvas',
    title: 'Infinite Canvas',
    content: 'Pan, zoom, and freehand drawing on an infinite zoomable canvas with smooth interactions.',
    highlights: [{ text: 'infinite', color: '#3B82F6' }],
    x: 50, y: 0, width: 250, height: 105, tilt: -0.8,
  },
  {
    id: 'ai-gen',
    title: 'AI-Generated Cards',
    content: 'Topic cards, concept cards, and flowcharts generated from a simple prompt using AI.',
    highlights: [{ text: 'AI', color: '#8B5CF6' }],
    x: 390, y: 20, width: 205, height: 105, tilt: 0.6,
  },
  {
    id: 'nodes',
    title: 'Multiple Node Types',
    content: 'Content cards, topic nodes, and flowchart shapes with full markdown rendering support.',
    highlights: [{ text: 'markdown', color: '#10B981' }],
    x: 165, y: 170, width: 300, height: 85, tilt: 0.4,
  },
  {
    id: 'edges',
    title: 'Smart Labeled Edges',
    content: 'Automatic layout with labeled edges between nodes using the Dagre algorithm.',
    highlights: [{ text: 'Dagre', color: '#F59E0B' }],
    x: 80, y: 340, width: 230, height: 105, tilt: -0.5,
  },
  {
    id: 'explain',
    title: 'AI Chain Explanations',
    content: 'Select connected nodes and get AI-generated explanations for the entire chain of concepts.',
    highlights: [{ text: 'chain', color: '#8B5CF6' }],
    x: 350, y: 305, width: 210, height: 105, tilt: 0.7,
  },
  {
    id: 'save',
    title: 'Auto-save & Undo/Redo',
    content: 'Session management with persistent auto-save, full undo/redo',
    highlights: [{ text: 'auto-save', color: '#EC4899' }],
    x: 295, y: 490, width: 250, height: 85, tilt: -0.4,
  },
];

const EDGES: FlowEdge[] = [
  { from: 'canvas', to: 'nodes' },
  { from: 'ai-gen', to: 'nodes' },
  { from: 'nodes', to: 'edges' },
  { from: 'nodes', to: 'explain' },
  { from: 'edges', to: 'save' },
  { from: 'explain', to: 'save' },
];

const ICON_MAP: Record<string, React.ElementType> = {
  'ai-gen': Brain,
  'canvas': Layout,
  'nodes': PenTool,
  'edges': GitBranch,
  'save': Save,
  'explain': MessageSquare,
};

/* ── Hand-drawn SVG edge path helper (wobbly bezier, like pen strokes) ── */
function getEdgePath(from: FlowNode, to: FlowNode, seed: number): { path: string; labelX: number; labelY: number } {
  const fx = from.x + from.width / 2;
  const fy = from.y + from.height / 2;
  const tx = to.x + to.width / 2;
  const ty = to.y + to.height / 2;

  let sx = fx, sy = fy, ex = tx, ey = ty;

  if (ty > fy) {
    sy = from.y + from.height;
    ey = to.y;
  } else if (Math.abs(tx - fx) > Math.abs(ty - fy)) {
    sx = tx > fx ? from.x + from.width : from.x;
    ex = tx > fx ? to.x : to.x + to.width;
    sy = fy;
    ey = ty;
  } else {
    sy = ty > fy ? from.y + from.height : from.y;
    ey = ty > fy ? to.y : to.y + to.height;
    sx = fx;
    ex = tx;
  }

  const midY = (sy + ey) / 2;
  const midX = (sx + ex) / 2;
  // deterministic wobble so strokes look hand-drawn
  const w1 = (Math.sin(seed * 12.9898) * 43758.5453 % 1) * 22 - 11;
  const w2 = (Math.sin(seed * 78.233) * 43758.5453 % 1) * 22 - 11;
  const path =
    `M ${sx + w1 * 0.4} ${sy + w2 * 0.2} ` +
    `C ${sx + w1} ${midY + w2}, ${ex + w2} ${midY + w1}, ${ex + w1 * 0.3} ${ey}`;
  const labelX = midX + w1 * 0.5;
  const labelY = midY + w2 * 0.5;
  return { path, labelX, labelY };
}

/* ── Hand-drawn arrowhead (open V, like a pen flick) ── */
function getArrowhead(from: FlowNode, to: FlowNode, seed: number): string {
  const ex = to.x + to.width / 2;
  const ey = to.y;
  const w = (Math.sin(seed * 12.9898) * 43758.5453 % 1) * 6 - 3;
  return `M ${ex - 6 + w} ${ey - 8} L ${ex} ${ey} L ${ex + 5 - w} ${ey - 9}`;
}

/* ── Survey sheet: hand-drawn flowchart of key features ── */
const FlowchartCanvas = ({ isDark }: { isDark: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const cardBg = isDark ? 'hsl(150 8% 7%)' : 'hsl(40 33% 97%)';
  const cardBorder = isDark ? 'rgba(120, 190, 155, 0.45)' : 'rgba(40, 80, 60, 0.55)';
  const edgeColor = isDark ? 'rgba(120, 190, 155, 0.55)' : 'rgba(40, 80, 60, 0.6)';
  const titleColor = isDark ? '#EDE9DC' : '#2B2B24';
  const contentColor = isDark ? 'rgba(237,233,220,0.6)' : 'rgba(43,43,36,0.62)';
  const sheetBg = isDark ? 'transparent' : 'transparent';
  const dotColor = isDark ? 'rgba(120,190,155,0.28)' : 'rgba(40,80,60,0.25)';

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        const s = Math.min(1, (w - 16) / 580);
        setScale(s);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const canvasW = 580;
  const canvasH = 600;

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <div
        style={{
          width: canvasW,
          height: canvasH * scale,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          background: sheetBg,
        }}
        className="relative"
      >
        {/* faint survey dot grid */}
        <svg className="absolute inset-0 pointer-events-none" width={canvasW} height={canvasH}>
          <defs>
            <pattern id="nautilus-survey-dots" width="26" height="26" patternUnits="userSpaceOnUse">
              <circle cx="1.2" cy="1.2" r="1.2" fill={dotColor} />
            </pattern>
          </defs>
          <rect width={canvasW} height={canvasH} fill="url(#nautilus-survey-dots)" />
        </svg>

        {/* Hand-drawn edges + arrowheads */}
        <svg className="absolute inset-0 pointer-events-none" width={canvasW} height={canvasH}>
          {EDGES.map((edge, edgeIdx) => {
            const fromNode = FEATURES.find(n => n.id === edge.from)!;
            const toNode = FEATURES.find(n => n.id === edge.to)!;
            const { path } = getEdgePath(fromNode, toNode, edgeIdx + 1);
            const arrow = getArrowhead(fromNode, toNode, edgeIdx + 1);
            return (
              <motion.g
                key={`${edge.from}-${edge.to}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + edgeIdx * 0.12, ease: 'easeOut' }}
              >
                <motion.path
                  d={path}
                  fill="none"
                  stroke={edgeColor}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 + edgeIdx * 0.12, ease: 'easeOut' }}
                />
                <path d={arrow} fill="none" stroke={edgeColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </motion.g>
            );
          })}
        </svg>

        {/* Sketched cards */}
        {FEATURES.map((node, i) => {
          const Icon = ICON_MAP[node.id];
          const highlightColor = node.highlights?.[0]?.color || '#8B5CF6';
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.92, rotate: node.tilt * 2 }}
              animate={{ opacity: 1, scale: 1, rotate: node.tilt }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
              className="absolute p-4"
              style={{
                left: node.x,
                top: node.y,
                width: node.width,
                height: node.height,
                backgroundColor: cardBg,
                border: `1.5px dashed ${cardBorder}`,
                borderRadius: '14px 10px 15px 9px',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 shrink-0" style={{ color: highlightColor }} />
                <h3
                  className="text-xl leading-none"
                  style={{ color: titleColor, fontFamily: "'Caveat', cursive", fontWeight: 700 }}
                >
                  {node.title}
                </h3>
              </div>
              <p
                className="text-[13px] leading-relaxed"
                style={{ color: contentColor, fontFamily: "'Inter', sans-serif" }}
              >
                {node.content.split(new RegExp(`(${node.highlights?.map(h => h.text).join('|') || '$$'})`, 'gi')).map((part, pi) => {
                  const hl = node.highlights?.find(h => h.text.toLowerCase() === part.toLowerCase());
                  if (hl) return <span key={pi} style={{ color: hl.color, fontWeight: 600 }}>{part}</span>;
                  return part;
                })}
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
  const containerRef = useRef<HTMLDivElement>(null);
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
      ref={containerRef}
      className="w-full flex justify-center [&_svg]:max-w-full [&_svg]:h-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

/* ── Side-edge backdrop: image peeks in only at the far left & right ── */
const NautilusSideBg = ({ isDark }: { isDark: boolean }) => {
  const pageCover = isDark ? '#0C0F0D' : '#F4F2EE';
  return (
    <div className="fixed inset-0 z-0" aria-hidden>
      <img
        src={nautilusBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        decoding="async"
      />
      {/* cover the middle, leave only the outer edges visible */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, transparent 0%, transparent 4%, ${pageCover} 9%, ${pageCover} 91%, transparent 96%, transparent 100%)`,
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
  const draftGreen = isDark ? 'rgba(120, 190, 155, 0.75)' : 'rgba(47, 104, 74, 0.8)';

  const font = "'Inter', sans-serif";
  const hand = "'Caveat', cursive";

  const techStack = [
    { l: 'Frontend', v: 'React • TypeScript • Vite • Tailwind CSS • shadcn/ui' },
    { l: 'Canvas', v: 'React Flow (@xyflow/react) • Dagre' },
    { l: 'Animation', v: 'Framer Motion' },
    { l: 'Backend', v: 'Supabase Edge Functions (Deno)' },
    { l: 'Database', v: 'Supabase PostgreSQL' },
    { l: 'State & Routing', v: 'React Query • React Router' },
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
          {/* Description — full width from left to right */}
          <motion.div {...fadeUp(0.12)} className="mb-10">
            <p
              className="text-sm md:text-base leading-relaxed w-full"
              style={{ color: textColor, fontFamily: font }}
            >
              Nautilus replaces linear, chat-style AI with a node-based knowledge interface built on neural networking. Every prompt becomes a concept Card, and the system vectorises content through bi-encoders for fast retrieval and re-ranks the most relevant links with a cross-encoder. The result is a graph that learns the semantic structure between your ideas across multiple databases instead of treating them as isolated messages. Still very much a work in progress, this round is a content overhaul.
            </p>
          </motion.div>

          {/* Flowchart - Key Features (survey sheet) */}
          <motion.div {...fadeUp(0.2)}>
            <div className="flex items-baseline justify-between gap-3 mb-2">
              <h2
                className="text-[11px] font-semibold uppercase tracking-[0.15em]"
                style={{ color: labelColor, fontFamily: font }}
              >
                Key Features
              </h2>
              <span className="text-lg" style={{ color: draftGreen, fontFamily: hand }}>
                fig. 01 — survey of the canvas
              </span>
            </div>
            <div className="relative mb-12 overflow-hidden rounded-2xl" style={{ border: `1.5px dashed ${dashedBorder}` }}>
              <FlowchartCanvas isDark={isDark} />
            </div>
          </motion.div>

          {/* Neural Retrieval — GNNs */}
          <motion.div {...fadeUp(0.24)}>
            <div className="flex items-baseline justify-between gap-3 mb-5">
              <h2
                className="text-[11px] font-semibold uppercase tracking-[0.15em]"
                style={{ color: labelColor, fontFamily: font }}
              >
                Neural Retrieval
              </h2>
              <span className="text-lg" style={{ color: draftGreen, fontFamily: hand }}>
                fig. 02 — how it reads
              </span>
            </div>
            <div className="grid md:grid-cols-3 gap-3 mb-3">
              {[
                {
                  icon: Network,
                  title: 'GNNs',
                  desc: 'Graph Neural Networks pass messages along the edges of the knowledge graph, so every concept card\u2019s embedding is shaped by the ideas it connects to \u2014 the structure of the graph itself becomes part of the representation.',
                  tilt: -0.6,
                },
                {
                  icon: GitFork,
                  title: 'Sub-GNNs',
                  desc: 'Sub-graph neural networks reason over sampled neighbourhoods instead of the whole graph. That lets Nautilus retrieve and link local clusters of ideas efficiently, even as the canvas grows into thousands of nodes.',
                  tilt: 0.5,
                },
                {
                  icon: Waves,
                  title: 'Spatio-Temporal GNNs',
                  desc: 'Spatio-temporal GNNs model both structure and time \u2014 how the links between your concepts evolve across sessions \u2014 so retrieval can surface what you were actively building recently, not just what is statically connected.',
                  tilt: -0.4,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-5"
                  style={{
                    backgroundColor: cardBg,
                    border: `1.5px dashed ${dashedBorder}`,
                    borderRadius: '14px 10px 15px 9px',
                    transform: `rotate(${item.tilt}deg)`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2.5">
                    <item.icon className="w-4 h-4" style={{ color: draftGreen }} />
                    <h3
                      className="text-xl leading-none"
                      style={{ color: headingColor, fontFamily: hand, fontWeight: 700 }}
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
                <Layers className="w-4 h-4" style={{ color: draftGreen }} />
                <h3
                  className="text-xl leading-none"
                  style={{ color: headingColor, fontFamily: hand, fontWeight: 700 }}
                >
                  Bi-Encoders & Cross-Encoders
                </h3>
              </div>
              <p
                className="text-[13px] leading-relaxed"
                style={{ color: textColor, fontFamily: font }}
              >
                A bi-encoder embeds every card up front so vector search stays fast, then a
                cross-encoder re-ranks the top candidates against your prompt for precision.
                Together with the GNN layers this gives Nautilus retrieval that understands both
                what a card says and where it sits in your graph.
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
                    transform: `rotate(${(i % 3) - 1 === -1 ? -0.4 : (i % 3) === 1 ? 0.4 : 0}deg)`,
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
            <div className="flex items-baseline justify-between gap-3 mb-5">
              <h2
                className="text-[11px] font-semibold uppercase tracking-[0.15em]"
                style={{ color: labelColor, fontFamily: font }}
              >
                Architecture
              </h2>
              <span className="text-lg" style={{ color: draftGreen, fontFamily: hand }}>
                fig. 03 — the wiring
              </span>
            </div>
            <div
              className="rounded-2xl p-6 mb-12 overflow-x-auto"
              style={{ border: `1.5px dashed ${dashedBorder}`, backgroundColor: cardBg }}
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
              <p className="text-lg text-center mt-1.5 mb-0.5" style={{ color: draftGreen, fontFamily: hand }}>
                the interface, pinned down
              </p>
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
