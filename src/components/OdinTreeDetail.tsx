import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft, ArrowRight, Github, Folder, FileCode, Search, Network, Shield, GitCommit, Boxes, Users, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/hooks/use-theme';
import Navbar from '@/components/Navbar';
import type { Project } from '@/components/ProjectsSection';

interface Props {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/* ── Flow graph nodes for Odin (B&W) ── */
interface GNode { id: string; label: string; x: number; y: number; w: number; h: number; kind?: 'root' | 'file' | 'overlay'; }
interface GEdge { from: string; to: string; }

const NODES: GNode[] = [
  { id: 'repo', label: 'GitHub Repo', x: 240, y: 0, w: 160, h: 56, kind: 'root' },
  { id: 'tree', label: 'File Tree', x: 60, y: 110, w: 140, h: 46, kind: 'file' },
  { id: 'graph', label: 'React Flow Graph', x: 220, y: 110, w: 180, h: 46, kind: 'file' },
  { id: 'palette', label: 'Cmd K Palette', x: 420, y: 110, w: 160, h: 46, kind: 'file' },
  { id: 'analysis', label: 'AI Deep Dive', x: 30, y: 230, w: 150, h: 46, kind: 'overlay' },
  { id: 'readme', label: 'README Gen', x: 200, y: 230, w: 150, h: 46, kind: 'overlay' },
  { id: 'timeline', label: 'Commit Timeline', x: 370, y: 230, w: 170, h: 46, kind: 'overlay' },
  { id: 'deps', label: 'Dependency Risk', x: 100, y: 320, w: 170, h: 46, kind: 'overlay' },
  { id: 'security', label: 'Security Report', x: 290, y: 320, w: 170, h: 46, kind: 'overlay' },
  { id: 'ownership', label: 'Code Ownership', x: 480, y: 320, w: 170, h: 46, kind: 'overlay' },
];

const EDGES: GEdge[] = [
  { from: 'repo', to: 'tree' }, { from: 'repo', to: 'graph' }, { from: 'repo', to: 'palette' },
  { from: 'graph', to: 'analysis' }, { from: 'graph', to: 'readme' }, { from: 'graph', to: 'timeline' },
  { from: 'tree', to: 'analysis' },
  { from: 'analysis', to: 'deps' }, { from: 'analysis', to: 'security' },
  { from: 'timeline', to: 'ownership' },
];

function edgePath(a: GNode, b: GNode) {
  const sx = a.x + a.w / 2, sy = a.y + a.h, ex = b.x + b.w / 2, ey = b.y;
  const my = (sy + ey) / 2;
  return `M ${sx} ${sy} C ${sx} ${my}, ${ex} ${my}, ${ex} ${ey}`;
}

const FlowGraph = ({ fg, bg, mut }: { fg: string; bg: string; mut: string }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const onR = () => {
      if (!wrapRef.current) return;
      setScale(Math.min(1, (wrapRef.current.offsetWidth - 8) / 680));
    };
    onR();
    window.addEventListener('resize', onR);
    return () => window.removeEventListener('resize', onR);
  }, []);

  const W = 680, H = 400;

  return (
    <div ref={wrapRef} className="w-full overflow-hidden">
      <div
        className="relative"
        style={{
          width: W, height: H * scale, transform: `scale(${scale})`,
          transformOrigin: 'top left',
          backgroundImage: `radial-gradient(${mut} 0.8px, transparent 0.8px)`,
          backgroundSize: '14px 14px',
        }}
      >
        <svg className="absolute inset-0 pointer-events-none" width={W} height={H}>
          <defs>
            <marker id="odin-arrow" markerWidth="10" markerHeight="10" viewBox="-5 -5 10 10" refX="0" refY="0" orient="auto">
              <path d="M -3 -2 L 0 0 L -3 2" fill="none" stroke={fg} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          </defs>
          {EDGES.map((e, i) => {
            const a = NODES.find(n => n.id === e.from)!;
            const b = NODES.find(n => n.id === e.to)!;
            return (
              <motion.path
                key={`${e.from}-${e.to}`}
                d={edgePath(a, b)}
                fill="none" stroke={fg} strokeWidth="1" markerEnd="url(#odin-arrow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.55 }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.06, ease: 'easeOut' }}
              />
            );
          })}
        </svg>
        {NODES.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
            className="absolute flex items-center justify-center text-center"
            style={{
              left: n.x, top: n.y, width: n.w, height: n.h,
              backgroundColor: bg,
              border: `1px solid ${fg}`,
              borderRadius: 4,
              color: fg,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: n.kind === 'root' ? 13 : 11,
              letterSpacing: n.kind === 'root' ? '0.04em' : '0.02em',
              fontWeight: n.kind === 'root' ? 600 : 400,
              boxShadow: n.kind === 'root' ? `0 0 0 3px ${bg}, 0 0 0 4px ${fg}` : 'none',
            }}
          >
            {n.label}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const FEATURES = [
  { Icon: Network, title: 'Visual Workspace', desc: 'Pair a collapsible file tree with a React Flow canvas. Selecting a node opens a glass details panel that renders the file with syntax highlighting and per-file metrics.' },
  { Icon: FileText, title: 'AI Deep Dive Analysis', desc: 'A strict tool-calling pipeline returns architecture, execution flow, components, key algorithms, language breakdown, security inspection and a glossary, validated and normalised.' },
  { Icon: Shield, title: 'Security Inspection', desc: 'Files are scanned for common risk patterns and dependency vulnerabilities, aggregated into a scorecard plus per-file detail, exportable as Markdown or PDF.' },
  { Icon: GitCommit, title: 'Commit Story Timeline', desc: 'Buckets up to 200 recent commits by month with a detected dominant theme, renders an intensity heatmap, lists biggest rewrites by line churn and surfaces release milestones.' },
  { Icon: Boxes, title: 'Dependency Risk Analyser', desc: 'Parses manifests from npm, PyPI, Cargo, Go modules and RubyGems, cross-references OSV.dev and computes a 0 to 100 risk score per dependency.' },
  { Icon: Users, title: 'Code Ownership Map', desc: 'Computes primary authorship per file from GitHub contributors and per-file commit history, then flags orphaned files and risky concentration.' },
  { Icon: FileCode, title: 'README Generation', desc: 'If the repo has a usable README it is refined from parsed source. If it is thin or boilerplate, Odin rewrites it. If absent, Odin generates a new one against a strict template.' },
  { Icon: Search, title: 'Spotlight Command Palette', desc: 'A Cmd K command palette searches across file paths and indexed source content for instant in-repo navigation.' },
];

const TECH = [
  { l: 'UI', v: 'React 18 with TypeScript 5' },
  { l: 'Build', v: 'Vite 5' },
  { l: 'Styling', v: 'Tailwind CSS v3' },
  { l: 'Primitives', v: 'shadcn/ui on Radix' },
  { l: 'Graph', v: 'React Flow (xyflow)' },
  { l: 'Markdown', v: 'react-markdown, remark-gfm' },
  { l: 'Diagrams', v: 'Mermaid' },
  { l: 'Animation', v: 'Framer Motion' },
  { l: 'Functions', v: 'Supabase Edge (Deno)' },
  { l: 'AI', v: 'AI Gateway (Gemini, GPT)' },
  { l: 'Proxy', v: 'Vercel Serverless' },
  { l: 'Vuln Data', v: 'OSV.dev' },
];

const DATA_SOURCES = [
  { src: 'GitHub REST API', purpose: 'Repo metadata, tree, file contents, commits, contributors, releases, tags' },
  { src: 'OSV.dev', purpose: 'Vulnerability batch lookup for npm, PyPI, Cargo, Go, RubyGems' },
  { src: 'npm Registry', purpose: 'Latest version and last publish date' },
  { src: 'PyPI JSON API', purpose: 'Latest version and last publish date' },
  { src: 'AI Gateway', purpose: 'Structured tool-calling for analysis, README, activity summary' },
];

const EDGE_FNS = [
  { fn: 'analyze-repo', purpose: 'Validated deep-dive analysis of the repository' },
  { fn: 'generate-readme', purpose: 'Refines or regenerates the README from parsed source files' },
  { fn: 'summarize-activity', purpose: 'Digest, changelog and README snippet for a commit window' },
];

const OdinTreeDetail = ({ project, prevProject, nextProject }: Props) => {
  const { isDark } = useTheme();

  // Pure B&W, true inversion
  const t = isDark
    ? { bg: '#0F0F0F', fg: '#F7F7F7', muted: 'rgba(247,247,247,0.55)', subtle: 'rgba(247,247,247,0.35)', card: '#161616', border: 'rgba(247,247,247,0.18)', hair: 'rgba(247,247,247,0.10)' }
    : { bg: '#F7F7F7', fg: '#0F0F0F', muted: 'rgba(15,15,15,0.62)', subtle: 'rgba(15,15,15,0.42)', card: '#FFFFFF', border: 'rgba(15,15,15,0.18)', hair: 'rgba(15,15,15,0.10)' };

  const display = "'Instrument Serif', 'Playfair Display', serif";
  const body = "'Work Sans', 'Inter', sans-serif";
  const mono = "'JetBrains Mono', monospace";

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: t.bg, color: t.fg }}>
      {/* Inverted selection per Odin spec */}
      <style>{`
        .odin-scope ::selection { background: ${t.fg}; color: ${t.bg}; }
        .odin-scope ::-moz-selection { background: ${t.fg}; color: ${t.bg}; }
        .odin-scope a, .odin-scope a:visited { color: inherit; text-decoration: none; }
      `}</style>

      <div className="odin-scope">
        <Navbar />

        <div className="max-w-4xl mx-auto px-6 pt-12 pb-24">
          {/* Back */}
          <motion.div {...fadeUp(0)}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] hover:opacity-70 transition-opacity mb-12"
              style={{ color: t.muted, fontFamily: mono }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All Projects
            </Link>
          </motion.div>

          {/* Masthead */}
          <motion.div {...fadeUp(0.04)} className="mb-2">
            <p className="text-[10px] uppercase tracking-[0.4em]" style={{ color: t.subtle, fontFamily: mono }}>
              Volume 06, Issue 10 / A visual repository explorer
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.08)} className="mb-6 flex items-end gap-3 flex-wrap">
            <h1
              className="leading-[0.85] tracking-tight"
              style={{ fontFamily: display, fontWeight: 400, fontSize: 'clamp(96px, 18vw, 220px)', color: t.fg }}
            >
              Odin
            </h1>
            <span
              className="italic mb-4 ml-2"
              style={{ fontFamily: display, fontStyle: 'italic', fontSize: 'clamp(28px, 4.5vw, 56px)', color: t.muted }}
            >
              Tree.
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.div {...fadeUp(0.12)} className="mb-10 grid md:grid-cols-[1fr_auto] gap-6 items-start">
            <p
              className="text-base md:text-lg leading-relaxed max-w-2xl"
              style={{ color: t.muted, fontFamily: body }}
            >
              Odin is a visual repository explorer that turns any public GitHub project into a navigable graph, a searchable knowledge base, and a set of AI-assisted reports. Paste a repo URL and Odin loads the file tree, builds a force-directed graph of the codebase, lets you inspect any file in a focused side panel, then layers in security inspection, dependency risk, commit history storytelling, code ownership mapping, AI deep-dive analysis, and README generation on top of the same source tree.
            </p>
            <div className="flex flex-col gap-3 md:min-w-[180px]">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs uppercase tracking-[0.2em] transition-colors"
                  style={{ backgroundColor: t.fg, color: t.bg, fontFamily: mono }}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs uppercase tracking-[0.2em] border transition-colors"
                  style={{ borderColor: t.fg, color: t.fg, fontFamily: mono }}
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </a>
              )}
            </div>
          </motion.div>

          {/* Hairline + standfirst */}
          <div className="h-px w-full mb-10" style={{ backgroundColor: t.hair }} />
          <motion.p
            {...fadeUp(0.16)}
            className="text-base md:text-lg italic leading-relaxed max-w-3xl mb-16"
            style={{ fontFamily: display, color: t.fg }}
          >
            Built for developers who need to evaluate, document, or onboard onto an unfamiliar codebase without cloning it, and for engineers who want a richer reading experience than the default GitHub web UI.
          </motion.p>

          {/* Graph */}
          <motion.div {...fadeUp(0.2)} className="mb-16">
            <p className="text-[10px] uppercase tracking-[0.3em] mb-5" style={{ color: t.subtle, fontFamily: mono }}>
              Fig. 01 / Workspace Topology
            </p>
            <div className="border" style={{ borderColor: t.border, backgroundColor: t.card }}>
              <div className="p-4 md:p-6">
                <FlowGraph fg={t.fg} bg={t.card} mut={t.hair} />
              </div>
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div {...fadeUp(0.22)} className="flex flex-wrap gap-2 mb-16">
            {(['React 18', 'TypeScript', 'React Flow', 'Vite 5', 'Tailwind', 'shadcn/ui', 'Supabase Edge', 'AI Gateway', 'OSV.dev', 'Vercel'] as const).map(tag => (
              <span
                key={tag}
                className="text-[10px] px-3 py-1.5 uppercase tracking-[0.18em] border"
                style={{ borderColor: t.border, color: t.muted, fontFamily: mono }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Key Features */}
          <motion.section {...fadeUp(0.24)} className="mb-16">
            <header className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: t.subtle, fontFamily: mono }}>
                Section II
              </p>
              <h2 className="text-3xl md:text-5xl" style={{ fontFamily: display, color: t.fg }}>
                Key Features
              </h2>
            </header>
            <div className="grid md:grid-cols-2 gap-px" style={{ backgroundColor: t.hair }}>
              {FEATURES.map(({ Icon, title, desc }) => (
                <div key={title} className="p-6" style={{ backgroundColor: t.bg }}>
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="w-4 h-4" style={{ color: t.fg }} />
                    <h3 className="text-xl" style={{ fontFamily: display, color: t.fg }}>{title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: t.muted, fontFamily: body }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Architecture */}
          <motion.section {...fadeUp(0.26)} className="mb-16">
            <header className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: t.subtle, fontFamily: mono }}>
                Section III
              </p>
              <h2 className="text-3xl md:text-5xl" style={{ fontFamily: display, color: t.fg }}>
                Architecture
              </h2>
            </header>
            <pre
              className="text-xs md:text-[13px] leading-relaxed overflow-x-auto p-5 border whitespace-pre"
              style={{ borderColor: t.border, color: t.fg, fontFamily: mono, backgroundColor: t.card }}
            >{`Browser
  -> React + Vite client (workspace, overlays, file tree, graph canvas)
  -> /api/github-proxy (Vercel function, server-side GitHub token)
      -> api.github.com (repo info, tree, contents, commits, contributors, releases)
  -> Supabase Edge Functions
      -> analyze-repo       -> AI Gateway (structured deep-dive analysis)
      -> generate-readme    -> AI Gateway (refine or regenerate README)
      -> summarize-activity -> AI Gateway (digest, changelog, snippet)
  -> public registries called directly from the browser
      -> registry.npmjs.org and pypi.org (version metadata)
      -> api.osv.dev (vulnerability batch query)`}</pre>
          </motion.section>

          {/* Tech Stack */}
          <motion.section {...fadeUp(0.28)} className="mb-16">
            <header className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: t.subtle, fontFamily: mono }}>
                Section IV
              </p>
              <h2 className="text-3xl md:text-5xl" style={{ fontFamily: display, color: t.fg }}>
                Tech Stack
              </h2>
            </header>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ backgroundColor: t.hair }}>
              {TECH.map(item => (
                <div key={item.l} className="p-4" style={{ backgroundColor: t.bg }}>
                  <p className="text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: t.subtle, fontFamily: mono }}>{item.l}</p>
                  <p className="text-sm" style={{ color: t.fg, fontFamily: body, fontWeight: 500 }}>{item.v}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Data Sources */}
          <motion.section {...fadeUp(0.3)} className="mb-16">
            <header className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: t.subtle, fontFamily: mono }}>
                Section V
              </p>
              <h2 className="text-3xl md:text-5xl" style={{ fontFamily: display, color: t.fg }}>
                Data Sources
              </h2>
            </header>
            <div className="border" style={{ borderColor: t.border }}>
              {DATA_SOURCES.map((d, i) => (
                <div
                  key={d.src}
                  className="grid grid-cols-[1fr_2fr] gap-4 p-4"
                  style={{ borderTop: i === 0 ? 'none' : `1px solid ${t.hair}` }}
                >
                  <span className="text-sm" style={{ color: t.fg, fontFamily: mono }}>{d.src}</span>
                  <span className="text-sm" style={{ color: t.muted, fontFamily: body }}>{d.purpose}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Edge Functions */}
          <motion.section {...fadeUp(0.32)} className="mb-16">
            <header className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: t.subtle, fontFamily: mono }}>
                Section VI
              </p>
              <h2 className="text-3xl md:text-5xl" style={{ fontFamily: display, color: t.fg }}>
                Edge Functions
              </h2>
            </header>
            <div className="grid md:grid-cols-3 gap-px" style={{ backgroundColor: t.hair }}>
              {EDGE_FNS.map(f => (
                <div key={f.fn} className="p-5" style={{ backgroundColor: t.bg }}>
                  <p className="text-sm mb-2" style={{ color: t.fg, fontFamily: mono }}>{f.fn}</p>
                  <p className="text-xs leading-relaxed" style={{ color: t.muted, fontFamily: body }}>{f.purpose}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Design System */}
          <motion.section {...fadeUp(0.34)} className="mb-16">
            <header className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: t.subtle, fontFamily: mono }}>
                Section VII
              </p>
              <h2 className="text-3xl md:text-5xl" style={{ fontFamily: display, color: t.fg }}>
                Design System
              </h2>
            </header>
            <p className="text-base leading-relaxed max-w-3xl mb-6" style={{ color: t.muted, fontFamily: body }}>
              Odin uses a typography-driven vintage newspaper aesthetic. Instrument Serif for display, Work Sans for body, JetBrains Mono for code. Pure black and white with light and dark as true inversions of the same token set. Text selection inverts the background and foreground. No emojis, no em dashes, no decorative dividers between major sections, just hairline borders and generous whitespace. Motion is one hero animation per overlay rather than scattered micro-interactions.
            </p>
          </motion.section>

          {/* Prev / Next */}
          <motion.div
            {...fadeUp(0.4)}
            className="pt-10 grid grid-cols-2 gap-4 border-t"
            style={{ borderColor: t.hair }}
          >
            {prevProject ? (
              <Link
                to={`/projects/${prevProject.id}`}
                className="group flex flex-col gap-1 p-5 border"
                style={{ borderColor: t.border }}
              >
                <span className="text-[10px] uppercase tracking-[0.25em] flex items-center gap-1" style={{ color: t.subtle, fontFamily: mono }}>
                  <ArrowLeft className="w-3 h-3" /> Previous
                </span>
                <span className="text-xl" style={{ fontFamily: display, color: t.fg }}>{prevProject.title}</span>
              </Link>
            ) : <div />}
            {nextProject ? (
              <Link
                to={`/projects/${nextProject.id}`}
                className="group flex flex-col gap-1 p-5 border text-right ml-auto w-full"
                style={{ borderColor: t.border }}
              >
                <span className="text-[10px] uppercase tracking-[0.25em] flex items-center justify-end gap-1" style={{ color: t.subtle, fontFamily: mono }}>
                  Next <ArrowRight className="w-3 h-3" />
                </span>
                <span className="text-xl" style={{ fontFamily: display, color: t.fg }}>{nextProject.title}</span>
              </Link>
            ) : <div />}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OdinTreeDetail;
