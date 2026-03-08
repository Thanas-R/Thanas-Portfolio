import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft, ArrowRight, Github, Brain, Layout, PenTool, GitBranch, Save, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import Navbar from '@/components/Navbar';
import GridBackground from '@/components/GridBackground';
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
    x: 15, y: 10, width: 250, height: 105,
  },
  {
    id: 'ai-gen',
    title: 'AI-Generated Cards',
    content: 'Topic cards, concept cards, and flowcharts generated from a simple prompt using AI.',
    highlights: [{ text: 'AI', color: '#8B5CF6' }],
    x: 330, y: 40, width: 240, height: 105,
  },
  {
    id: 'nodes',
    title: 'Multiple Node Types',
    content: 'Content cards, topic nodes, and flowchart shapes with full markdown rendering support.',
    highlights: [{ text: 'markdown', color: '#10B981' }],
    x: 140, y: 155, width: 255, height: 105,
  },
  {
    id: 'edges',
    title: 'Smart Labeled Edges',
    content: 'Automatic layout with labeled connections between nodes using the Dagre algorithm.',
    highlights: [{ text: 'Dagre', color: '#F59E0B' }],
    x: 0, y: 300, width: 240, height: 105,
  },
  {
    id: 'explain',
    title: 'AI Chain Explanations',
    content: 'Select connected nodes and get AI-generated explanations for the entire chain of concepts.',
    highlights: [{ text: 'chain', color: '#8B5CF6' }],
    x: 320, y: 280, width: 250, height: 105,
  },
  {
    id: 'save',
    title: 'Auto-save & Undo/Redo',
    content: 'Session management with persistent auto-save, full undo/redo history, and state recovery.',
    highlights: [{ text: 'auto-save', color: '#EC4899' }],
    x: 150, y: 430, width: 260, height: 105,
  },
];

const EDGES: FlowEdge[] = [
  { from: 'canvas', to: 'ai-gen' },
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

/* ── SVG edge path helper ── */
function getEdgePath(from: FlowNode, to: FlowNode): { path: string; labelX: number; labelY: number } {
  const fx = from.x + from.width / 2;
  const fy = from.y + from.height / 2;
  const tx = to.x + to.width / 2;
  const ty = to.y + to.height / 2;

  // Determine exit/entry points
  let sx = fx, sy = fy, ex = tx, ey = ty;

  if (Math.abs(tx - fx) > Math.abs(ty - fy)) {
    // Horizontal dominant
    sx = tx > fx ? from.x + from.width : from.x;
    ex = tx > fx ? to.x : to.x + to.width;
    sy = fy;
    ey = ty;
  } else {
    // Vertical dominant
    sy = ty > fy ? from.y + from.height : from.y;
    ey = ty > fy ? to.y : to.y + to.height;
    sx = fx;
    ex = tx;
  }

  const mx = (sx + ex) / 2;
  const my = (sy + ey) / 2;

  const path = `M ${sx} ${sy} C ${mx} ${sy}, ${mx} ${ey}, ${ex} ${ey}`;
  return { path, labelX: mx, labelY: my };
}

/* ── Flowchart Canvas Component ── */
const FlowchartCanvas = ({ isDark }: { isDark: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const cardBg = isDark ? 'hsl(0 0% 8%)' : 'hsl(0 0% 99%)';
  const cardBorder = isDark ? 'hsl(0 0% 18%)' : 'hsl(0 0% 88%)';
  const edgeColor = isDark ? 'hsl(0 0% 30%)' : 'hsl(0 0% 75%)';
  const labelBg = isDark ? 'hsl(0 0% 6%)' : 'hsl(0 0% 96%)';
  const labelColor = isDark ? 'hsl(0 0% 55%)' : 'hsl(0 0% 50%)';
  const titleColor = isDark ? 'hsl(0 0% 92%)' : 'hsl(0 0% 12%)';
  const contentColor = isDark ? 'hsl(0 0% 60%)' : 'hsl(0 0% 45%)';
  const dotColor = isDark ? 'hsl(0 0% 20%)' : 'hsl(0 0% 85%)';

  // Responsive scaling
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        // Canvas is 700 wide, scale to fit
        const s = Math.min(1, (w - 16) / 580);
        setScale(s);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const canvasW = 580;
  const canvasH = 555;

  const highlightText = (text: string, highlights?: { text: string; color: string }[]) => {
    if (!highlights?.length) return text;
    let result = text;
    highlights.forEach(h => {
      result = result.replace(new RegExp(`(${h.text})`, 'gi'), `%%${h.color}%%$1%%END%%`);
    });
    const parts = result.split(/(%%[^%]+%%)/g);
    return parts.map((part, i) => {
      if (part.startsWith('%%') && part.endsWith('%%END%%')) {
        // Never happens with this split, handle differently
        return part;
      }
      return part;
    });
  };

  return (
    <div ref={containerRef} className="w-full overflow-hidden flex justify-center">
      <div
        style={{
          width: canvasW,
          height: canvasH * scale,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
        }}
        className="relative"
      >
        {/* Edges SVG */}
        <svg className="absolute inset-0 pointer-events-none" width={canvasW} height={canvasH}>
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill={edgeColor} />
            </marker>
          </defs>
          {EDGES.map((edge, edgeIdx) => {
            const fromNode = FEATURES.find(n => n.id === edge.from)!;
            const toNode = FEATURES.find(n => n.id === edge.to)!;
            const { path } = getEdgePath(fromNode, toNode);
            return (
              <motion.path
                key={`${edge.from}-${edge.to}`}
                d={path}
                fill="none"
                stroke={edgeColor}
                strokeWidth="1.5"
                markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + edgeIdx * 0.12, ease: 'easeOut' }}
              />
            );
          })}
        </svg>

        {/* Cards */}
        {FEATURES.map((node, i) => {
          const Icon = ICON_MAP[node.id];
          const highlightColor = node.highlights?.[0]?.color || '#8B5CF6';
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
              className="absolute rounded-xl p-4"
              style={{
                left: node.x,
                top: node.y,
                width: node.width,
                height: node.height,
                backgroundColor: cardBg,
                border: `1px solid ${cardBorder}`,
                boxShadow: isDark
                  ? '0 4px 24px -4px rgba(0,0,0,0.4)'
                  : '0 4px 24px -4px rgba(0,0,0,0.08)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: highlightColor }}
                />
                <Icon className="w-3.5 h-3.5" style={{ color: highlightColor }} />
                <h3
                  className="text-base font-semibold leading-tight"
                  style={{ color: titleColor, fontFamily: "'Inter', sans-serif" }}
                >
                  {node.title}
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
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
    C --> D["KnowledgeCanvas\n(React Flow)"]
    C --> E["LeftSidebar\n(Chat Sessions)"]
    C --> F["SettingsPanel\n(Theme, Layout)"]
    C --> G["CommandPalette\n(Ctrl+K)"]
    D --> H["10 Node Types\n(TopicCard, ConceptBlock,\nBuildingCard, KnowledgeNode,\nTextNode, ImageNode...)"]
    D --> I["Custom Edge Types\n(BezierLabeledEdge)"]
    D --> J["FloatingChatInput\n(AI Prompt Bar)"]
    D --> K["Toolbar +\nDrawingToolbar +\nDrawingCanvas"]
    D --> L["CanvasControls\n(Zoom, Undo/Redo)"]
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

const NautilusDetail = ({ project, prevProject, nextProject }: NautilusDetailProps) => {
  const { isDark } = useTheme();

  const textColor = isDark ? 'hsl(0 0% 65%)' : 'hsl(0 0% 40%)';
  const headingColor = isDark ? 'hsl(0 0% 96%)' : 'hsl(0 0% 10%)';
  const cardBg = isDark ? 'hsl(0 0% 6%)' : 'hsl(0 0% 97%)';
  const cardBorder = isDark ? 'hsl(0 0% 15%)' : 'hsl(0 0% 88%)';
  const labelColor = isDark ? 'hsl(0 0% 45%)' : 'hsl(0 0% 55%)';

  const font = "'Inter', sans-serif";

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
      <GridBackground />
      <div className="relative z-10 min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 pt-12 pb-24">
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

          {/* Title — Caveat font */}
          <motion.div {...fadeUp(0.08)} className="mb-3">
            <h1
              className="text-6xl md:text-8xl leading-none"
              style={{ fontFamily: "'Caveat', cursive", fontWeight: 700, color: headingColor }}
            >
              Nautilus
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div {...fadeUp(0.12)} className="mb-8">
            <p
              className="text-sm md:text-base leading-relaxed max-w-2xl"
              style={{ color: textColor, fontFamily: font }}
            >
              An AI-powered canvas-based knowledge management and visual thinking platform.
              Nautilus generates interconnected knowledge maps, flowcharts, and concept cards
              from a simple prompt, all rendered on an infinite zoomable canvas.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div {...fadeUp(0.16)} className="flex gap-3 mb-12">
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

          {/* Flowchart — Key Features */}
          <motion.div {...fadeUp(0.2)}>
            <h2
              className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-5"
              style={{ color: labelColor, fontFamily: font }}
            >
              Key Features
            </h2>
            <div
              className="mb-12 overflow-hidden"
            >
              <FlowchartCanvas isDark={isDark} />
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

          {/* Architecture Diagram */}
          <motion.div {...fadeUp(0.32)}>
            <h2
              className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-5"
              style={{ color: labelColor, fontFamily: font }}
            >
              Architecture
            </h2>
            <div
              className="rounded-xl p-6 mb-12 overflow-x-auto"
              style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}
            >
              <MermaidDiagram isDark={isDark} />
            </div>
          </motion.div>

          {/* Screenshot */}
          <motion.div {...fadeUp(0.34)}>
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

export default NautilusDetail;
