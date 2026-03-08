import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import GridBackground from '@/components/GridBackground';
import TopographicBackground from '@/components/TopographicBackground';
import Navbar from '@/components/Navbar';
import { projects } from '@/components/ProjectsSection';
import { Mac } from '@/components/Mac';
import thanasOsMac from '@/assets/thanasos-mac.png';
import pesuForgeBg from '@/assets/pesuforge-bg.png';
import { AppleHelloEffect } from '@/components/AppleHelloEffect';
import { useTheme } from '@/hooks/use-theme';
import { useIsMobile } from '@/hooks/use-mobile';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: 'easeOut' },
});

const ProjectDetailPage = () => {
  const { slug } = useParams<{slug: string;}>();
  const project = projects.find((p) => p.id === slug);
  const { isDark } = useTheme();
  const isMobile = useIsMobile();

  if (!project) return <Navigate to="/projects" replace />;

  const currentIndex = projects.findIndex((p) => p.id === slug);
  const prevProject = projects[currentIndex - 1] ?? null;
  const nextProject = projects[currentIndex + 1] ?? null;
  const isThanasOS = project.id === 'thanas-os';
  const isSmartChef = project.id === 'smart-chef';
  const isAskBookie = project.id === 'askbookie';
  const isPesuForge = project.id === 'pesu-forge';
  const isContourFlow = project.id === 'contour-flow';

  const ProjectImage = ({ src, alt, className, style }: {src: string;alt: string;className?: string;style?: React.CSSProperties;}) => {
    if (project.live) {
      return (
        <a href={project.live} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
          <img src={src} alt={alt} className={className} style={style} />
        </a>);
    }
    return <img src={src} alt={alt} className={className} style={style} />;
  };

  const ab = {
    bg: isDark ? '#1a1a1a' : '#ffffff',
    dotColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)',
    text: isDark ? '#e0e0e0' : '#333333',
    textMuted: isDark ? '#999999' : '#666666',
    textHeading: isDark ? '#ffffff' : '#1a1a1a',
    cardBg: isDark ? '#222222' : '#f5f5f5',
    cardBorder: isDark ? '#333333' : '#e0e0e0',
    tagBg: isDark ? '#2a2a2a' : '#f0f0f0',
    tagBorder: isDark ? '#333333' : '#d0d0d0',
    tagText: isDark ? '#aaaaaa' : '#555555',
    linkText: isDark ? '#e0e0e0' : '#333333',
    btnBg: isDark ? '#e0e0e0' : '#1a1a1a',
    btnText: isDark ? '#1a1a1a' : '#ffffff',
    sectionLabel: isDark ? '#888888' : '#888888',
    navBorder: isDark ? '#333333' : '#e0e0e0',
    navText: isDark ? '#cccccc' : '#555555',
    navHeading: isDark ? '#e0e0e0' : '#1a1a1a',
    navLabel: isDark ? '#888888' : '#999999'
  };

  const smartChefBg = undefined;

  return (
    <>
      {!isAskBookie && !isPesuForge && !isContourFlow && <GridBackground />}
      <div className="relative z-10 min-h-screen" style={smartChefBg ? { backgroundColor: smartChefBg } : undefined}>
        {!isAskBookie && !isPesuForge && !isContourFlow && <Navbar />}

        {isAskBookie ?
        <div
          className="min-h-screen"
          style={{
            backgroundColor: ab.bg,
            backgroundImage: `radial-gradient(circle, ${ab.dotColor} 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
            color: ab.text
          }}>
          
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 pt-12 pb-24">
              <motion.div {...fadeUp(0)}>
                <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity mb-8"
                style={{ color: ab.textMuted, fontFamily: "'JetBrains Mono', monospace" }}>
                
                  <ArrowLeft className="w-4 h-4" />
                  All Projects
                </Link>
              </motion.div>

              {/* Hero title */}
              <motion.div {...fadeUp(0.08)} className="mb-10 mt-4">
                <h1
                className="text-6xl md:text-8xl leading-none tracking-tight"
                style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, color: ab.textHeading }}>
                
                  AskBookie_
                </h1>
                <p
                className="text-base mt-5 max-w-xl leading-relaxed"
                style={{ color: ab.textMuted, fontFamily: "'Roboto', sans-serif" }}>
                
                  A polished, production ready frontend for a RAG chat app that lets students query academic documents via a conversational interface.
                </p>
              </motion.div>

              {/* Links */}
              <motion.div {...fadeUp(0.15)} className="flex gap-3 mb-10">
                {project.live &&
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-85 transition-opacity"
                style={{ backgroundColor: ab.btnBg, color: ab.btnText, fontFamily: "'JetBrains Mono', monospace" }}>
                
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
              }
                {project.github &&
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg border text-sm font-semibold hover:opacity-75 transition-all"
                style={{ borderColor: ab.cardBorder, color: ab.text, fontFamily: "'JetBrains Mono', monospace" }}>
                
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
              }
              </motion.div>

              {/* Tags */}
              <motion.div {...fadeUp(0.18)} className="flex flex-wrap gap-2 mb-14">
                {project.tags.map((tag) =>
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-md font-medium uppercase tracking-wider"
                style={{
                  backgroundColor: ab.tagBg,
                  color: ab.tagText,
                  border: `1px solid ${ab.tagBorder}`,
                  fontFamily: "'JetBrains Mono', monospace"
                }}>
                
                    {tag}
                  </span>
              )}
              </motion.div>

              {/* Content */}
              <motion.div {...fadeUp(0.22)} className="space-y-12">
                {/* My Role */}
                <div
                className="p-6 rounded-xl"
                style={{ backgroundColor: ab.cardBg, border: `1px solid ${ab.cardBorder}` }}>
                
                  <h2
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: ab.sectionLabel, fontFamily: "'JetBrains Mono', monospace" }}>
                  
                    My Role
                  </h2>
                  <p
                  className="text-base leading-relaxed"
                  style={{ color: ab.text, fontFamily: "'Roboto', sans-serif" }}>
                  
                    I built the entire frontend from the chat UI, PDF upload flow, and subject selector to theming, animations, and responsive layout. The backend RAG pipeline and API architecture were designed and built by{' '}
                    <a
                    href="https://github.com/dotpmm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-70 transition-opacity font-semibold"
                    style={{ color: ab.linkText }}>
                    
                      pmmdot
                    </a>
                    , who also led the project.
                  </p>
                </div>

                {/* What I Built */}
                <div>
                  <h2
                  className="text-sm font-bold uppercase tracking-widest mb-6"
                  style={{ color: ab.sectionLabel, fontFamily: "'JetBrains Mono', monospace" }}>
                  
                    What I Built
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                  { title: 'Chat Interface', desc: 'Real time conversational UI with streaming response rendering and message history.' },
                  { title: 'PDF Upload Flow', desc: 'Client side validation, progress tracking, and retry logic for document indexing.' },
                  { title: 'Subject Selector', desc: 'Physics, Chemistry, Python organized Q&A with subject based context switching.' },
                  { title: 'Theme & Responsive', desc: 'Dark and light toggle with persisted preference. Fully mobile first responsive design.' }].
                  map((item) =>
                  <div
                    key={item.title}
                    className="p-5 rounded-xl"
                    style={{ backgroundColor: ab.cardBg, border: `1px solid ${ab.cardBorder}` }}>
                    
                        <h3
                      className="font-bold mb-2 text-base"
                      style={{ fontFamily: "'Oswald', sans-serif", color: ab.textHeading }}>
                      
                          {item.title}
                        </h3>
                        <p
                      className="leading-relaxed text-base"
                      style={{ color: ab.textMuted, fontFamily: "'Roboto', sans-serif" }}>
                      
                          {item.desc}
                        </p>
                      </div>
                  )}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <h2
                  className="text-sm font-bold uppercase tracking-widest mb-6"
                  style={{ color: ab.sectionLabel, fontFamily: "'JetBrains Mono', monospace" }}>
                  
                    Tech Stack
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                  { label: 'Framework', value: 'React 18' },
                  { label: 'Language', value: 'TypeScript' },
                  { label: 'Build', value: 'Vite' },
                  { label: 'Styling', value: 'Tailwind CSS' },
                  { label: 'Components', value: 'shadcn/ui' },
                  { label: 'Animation', value: 'Framer Motion' },
                  { label: 'Linting', value: 'ESLint + Prettier' },
                  { label: 'Hosting', value: 'Vercel' }].
                  map((item) =>
                  <div
                    key={item.label}
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: ab.cardBg, border: `1px solid ${ab.cardBorder}` }}>
                    
                        <p
                      className="text-xs uppercase tracking-wider mb-1"
                      style={{ color: ab.sectionLabel, fontFamily: "'JetBrains Mono', monospace" }}>
                      
                          {item.label}
                        </p>
                        <p
                      className="text-sm font-semibold"
                      style={{ fontFamily: "'Roboto', sans-serif", color: ab.textHeading }}>
                      
                          {item.value}
                        </p>
                      </div>
                  )}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h2
                  className="text-sm font-bold uppercase tracking-widest mb-6"
                  style={{ color: ab.sectionLabel, fontFamily: "'JetBrains Mono', monospace" }}>
                  
                    Key Features
                  </h2>
                  <div
                  className="p-6 rounded-xl space-y-3"
                  style={{ backgroundColor: ab.cardBg, border: `1px solid ${ab.cardBorder}` }}>
                  
                    {[
                  'Subject based Q&A across Physics, Chemistry, Python and more',
                  'PDF upload with client validation and progress UI',
                  'Streaming response rendering for real time feedback',
                  'Persistent local chat history',
                  'Dark and light theme with smooth transitions',
                  'Mobile first responsive layout',
                  'Keyboard navigation and ARIA labels for accessibility'].
                  map((feat) =>
                  <div key={feat} className="flex items-start gap-3">
                        <span style={{ color: ab.sectionLabel }} className="mt-0.5">▸</span>
                        <p
                      className="text-sm"
                      style={{ color: ab.text, fontFamily: "'Roboto', monospace" }}>
                      
                          {feat}
                        </p>
                      </div>
                  )}
                  </div>
                </div>

                {/* Credits */}
                <div
                className="p-6 rounded-xl"
                style={{ backgroundColor: ab.cardBg, border: `1px solid ${ab.cardBorder}` }}>
                
                  <h2
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: ab.sectionLabel, fontFamily: "'JetBrains Mono', monospace" }}>
                  
                    Credits
                  </h2>
                  <p
                  className="leading-relaxed text-base"
                  style={{ color: ab.textMuted, fontFamily: "'Roboto', monospace" }}>
                  
                    Backend, RAG pipeline, and project lead:{' '}
                    <a
                    href="https://github.com/dotpmm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-70 transition-opacity font-semibold"
                    style={{ color: ab.linkText }}>
                    
                      @pmmdot
                    </a>
                    <br />
                    Frontend development: Thanas R
                  </p>
                </div>
              </motion.div>

              {/* Screenshot at the bottom */}
              <motion.div {...fadeUp(0.3)} className="mt-14 rounded-xl overflow-hidden" style={{ border: `1px solid ${ab.cardBorder}` }}>
                <ProjectImage
                src={project.imageSrc}
                alt={`${project.title} preview`}
                className="w-full object-cover"
                style={{ maxHeight: 480 }} />
              
              </motion.div>
            </div>

            {/* Nav prev/next for AskBookie */}
            <div className="max-w-4xl mx-auto px-6 pb-24" style={{ backgroundColor: ab.bg }}>
              <motion.div
              {...fadeUp(0.4)}
              className="border-t pt-8 grid grid-cols-2 gap-4"
              style={{ borderColor: ab.navBorder }}>
              
                {prevProject ?
              <Link
                to={`/projects/${prevProject.id}`}
                className="group flex flex-col gap-1 p-5 rounded-xl border transition-colors"
                style={{ borderColor: ab.cardBorder, color: ab.navText }}>
                
                    <span
                  className="text-xs uppercase tracking-widest flex items-center gap-1"
                  style={{ color: ab.navLabel }}>
                  
                      <ArrowLeft className="w-3 h-3" /> Previous
                    </span>
                    <span
                  className="text-sm font-bold group-hover:translate-x-0.5 transition-transform"
                  style={{ color: ab.navHeading, fontFamily: "'Oswald', sans-serif" }}>
                  
                      {prevProject.title}
                    </span>
                  </Link> :
              <div />}
  
                {nextProject ?
              <Link
                to={`/projects/${nextProject.id}`}
                className="group flex flex-col gap-1 p-5 rounded-xl border transition-colors text-right ml-auto w-full"
                style={{ borderColor: ab.cardBorder, color: ab.navText }}>
                
                    <span
                  className="text-xs uppercase tracking-widest flex items-center justify-end gap-1"
                  style={{ color: ab.navLabel }}>
                  
                      Next <ArrowRight className="w-3 h-3" />
                    </span>
                    <span
                  className="text-sm font-bold group-hover:-translate-x-0.5 transition-transform"
                  style={{ color: ab.navHeading, fontFamily: "'Oswald', sans-serif" }}>
                  
                      {nextProject.title}
                    </span>
                  </Link> :
              <div />}
              </motion.div>
            </div>
          </div> :
        isThanasOS ? (
        /* ── ThanasOS ── */
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-24">
            <motion.div {...fadeUp(0)}>
              <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" />
                All Projects
              </Link>
            </motion.div>

            <motion.div {...fadeUp(0.08)} className="mb-10">
              <h1 className="text-6xl font-black text-foreground leading-none tracking-tight mb-4 uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                ThanasOS
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                A macOS inspired desktop environment built with React and TypeScript, featuring window management, animations, and a custom terminal.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.15)} className="flex gap-3 mb-10">
              {project.live &&
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-85 transition-opacity">
                
                  <ExternalLink className="w-4 h-4" />
                  Live Site
                </a>
              }
              {project.github &&
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-foreground/20 text-foreground text-sm font-semibold hover:bg-foreground hover:text-background transition-all">
                
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              }
            </motion.div>

            <motion.div {...fadeUp(0.18)} className="flex flex-wrap gap-2 mb-12">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1.5 rounded-full border border-foreground/10 text-muted-foreground font-medium uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div {...fadeUp(0.22)} className="rounded-2xl overflow-hidden mb-16 border border-foreground/10">
              <img src={thanasOsMac} alt="ThanasOS preview" className="w-full object-cover" style={{ maxHeight: 480 }} />
            </motion.div>

            <motion.div {...fadeUp(0.25)} className="mb-16">
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5">
                About this project
              </h2>
              <p className="text-xl md:text-2xl leading-relaxed text-foreground/80" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                ThanasOS is a React-based macOS-like desktop environment with draggable windows, a dock, and a custom terminal. It showcases advanced React patterns and animations.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.3)} className="mb-16 rounded-2xl overflow-hidden border border-foreground/10">
              <img src={thanasOsMac} alt="ThanasOS preview" className="w-full object-cover" style={{ maxHeight: 480 }} />
            </motion.div>

            <motion.div
              {...fadeUp(0.4)}
              className="border-t border-foreground/10 pt-8 grid grid-cols-2 gap-4"
            >
              {prevProject ? (
                <Link
                  to={`/projects/${prevProject.id}`}
                  className="group flex flex-col gap-1 p-5 rounded-xl border border-foreground/10 transition-colors"
                >
                  <span className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3" /> Previous
                  </span>
                  <span
                    className="text-sm font-bold text-foreground group-hover:translate-x-0.5 transition-transform"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
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
                  className="group flex flex-col gap-1 p-5 rounded-xl border border-foreground/10 transition-colors text-right ml-auto w-full"
                >
                  <span className="text-xs uppercase tracking-widest text-muted-foreground flex items-center justify-end gap-1">
                    Next <ArrowRight className="w-3 h-3" />
                  </span>
                  <span
                    className="text-sm font-bold text-foreground group-hover:-translate-x-0.5 transition-transform"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {nextProject.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </motion.div>
          </div>
        ) : isContourFlow ? (
        /* ── Contour Flow — live animation as full page background ── */
        <div className="relative min-h-screen">
          <TopographicBackground density={isMobile ? 'low' : 'medium'} />
          <div className="relative z-10">
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 pt-12 pb-24">
              <motion.div {...fadeUp(0)}>
                <Link to="/projects" className="inline-flex items-center gap-2 text-sm backdrop-blur-sm px-3 py-1.5 rounded-full hover:opacity-70 transition-opacity mb-8 text-foreground/70 bg-background/30 border border-foreground/5">
                  <ArrowLeft className="w-4 h-4" />
                  All Projects
                </Link>
              </motion.div>

              <motion.div {...fadeUp(0.08)} className="mb-10 mt-4">
                <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3 text-foreground/50" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Canvas Animation
                </p>
                <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-5 text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Contour Flow
                </h1>
                <p className="text-base max-w-lg leading-relaxed text-foreground/60">
                  A real-time procedural topographic map animation rendered to canvas. No images, no SVGs — pure math.
                </p>
              </motion.div>

              <motion.div {...fadeUp(0.12)} className="flex gap-3 mb-8">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold backdrop-blur-xl transition-all bg-foreground/10 border border-foreground/10 text-foreground hover:bg-foreground/20">
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                )}
              </motion.div>

              <motion.div {...fadeUp(0.15)} className="flex flex-wrap gap-2 mb-12">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1.5 rounded-full font-medium uppercase tracking-wider backdrop-blur-sm border border-foreground/10 text-foreground/50 bg-background/30">
                    {tag}
                  </span>
                ))}
              </motion.div>

              <motion.div {...fadeUp(0.18)} className="rounded-2xl p-8 md:p-10 mb-6 backdrop-blur-xl border border-foreground/8 bg-background/60">
                <h2 className="text-xs font-bold uppercase tracking-widest mb-5 text-foreground/40" style={{ fontFamily: "'JetBrains Mono', monospace" }}>About</h2>
                <p className="text-base leading-relaxed text-foreground/70">
                  Contour Flow is the procedural canvas animation powering this page's background. It generates a continuous topographic map using Simplex Noise, extracts contour lines via Marching Squares, and renders them as smooth Catmull-Rom splines — all in real time with no external assets.
                </p>
              </motion.div>

              <motion.div {...fadeUp(0.22)} className="rounded-2xl p-8 md:p-10 mb-6 backdrop-blur-xl border border-foreground/8 bg-background/60">
                <h2 className="text-xs font-bold uppercase tracking-widest mb-5 text-foreground/40" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Tech Stack</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Framework', value: 'React 18' },
                    { label: 'Language', value: 'TypeScript' },
                    { label: 'Rendering', value: 'Canvas 2D' },
                    { label: 'Build', value: 'Vite' },
                  ].map((item) => (
                    <div key={item.label} className="p-4 rounded-xl backdrop-blur-sm border border-foreground/5 bg-background/40">
                      <p className="text-xs uppercase tracking-wider mb-1 text-foreground/30">{item.label}</p>
                      <p className="text-sm font-semibold text-foreground/80" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div {...fadeUp(0.28)} className="rounded-2xl overflow-hidden mb-16 backdrop-blur-sm border border-foreground/8">
                <ProjectImage src={project.imageSrc} alt={`${project.title} preview`} className="w-full object-cover" style={{ maxHeight: 480 }} />
              </motion.div>

              <motion.div {...fadeUp(0.35)} className="border-t pt-8 mt-10 grid grid-cols-2 gap-4 border-foreground/10">
                {prevProject ? (
                  <Link to={`/projects/${prevProject.id}`} className="group flex flex-col gap-1 p-5 rounded-xl transition-colors backdrop-blur-xl border border-foreground/8 bg-background/50">
                    <span className="text-xs uppercase tracking-widest flex items-center gap-1 text-foreground/40"><ArrowLeft className="w-3 h-3" /> Previous</span>
                    <span className="text-sm font-bold group-hover:translate-x-0.5 transition-transform text-foreground/80" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{prevProject.title}</span>
                  </Link>
                ) : <div />}
                {nextProject ? (
                  <Link to={`/projects/${nextProject.id}`} className="group flex flex-col gap-1 p-5 rounded-xl transition-colors text-right ml-auto w-full backdrop-blur-xl border border-foreground/8 bg-background/50">
                    <span className="text-xs uppercase tracking-widest flex items-center justify-end gap-1 text-foreground/40">Next <ArrowRight className="w-3 h-3" /></span>
                    <span className="text-sm font-bold group-hover:-translate-x-0.5 transition-transform text-foreground/80" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{nextProject.title}</span>
                  </Link>
                ) : <div />}
              </motion.div>
            </div>
          </div>
        </div>
        ) : (

        /* ── Default layout ── */
        <>
            <div className="relative w-full overflow-hidden" style={{ height: '60vh', minHeight: 380 }}>
              {project.live ?
            <a href={project.live} target="_blank" rel="noopener noreferrer">
                  <img src={project.imageSrc} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                </a> :

            <img src={project.imageSrc} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
            }
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-transparent" />
            </div>

            <div className="max-w-4xl mx-auto px-6 pb-24 -mt-32 relative z-10">
              <motion.div {...fadeUp(0)}>
                <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
                
                  <ArrowLeft className="w-4 h-4" />
                  All Projects
                </Link>
              </motion.div>

              <motion.div {...fadeUp(0.08)} className="mb-8">
                <h1
                className="text-5xl md:text-7xl font-black text-foreground leading-none tracking-tight mb-4 uppercase"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                
                  {project.title}
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                  {project.description}
                </p>
              </motion.div>

              <motion.div {...fadeUp(0.15)} className="flex gap-3 mb-10">
                {project.live &&
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-85 transition-opacity">
                
                    <ExternalLink className="w-4 h-4" />
                    Live Site
                  </a>
              }
                {project.github &&
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-foreground/20 text-foreground text-sm font-semibold hover:bg-foreground hover:text-background transition-all">
                
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
              }
              </motion.div>

              <motion.div {...fadeUp(0.2)} className="flex flex-wrap gap-2 mb-14">
                {project.tags.map((tag) =>
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full border border-foreground/10 text-muted-foreground font-medium uppercase tracking-wider">
                
                    {tag}
                  </span>
              )}
              </motion.div>

              <motion.div {...fadeUp(0.25)} className="grid md:grid-cols-2 gap-6 border-t border-foreground/10 pt-10 mb-10">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Stack</p>
                  <p className="text-foreground/80 text-sm leading-relaxed">
                    {project.tags.join(', ')}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Type</p>
                  <p className="text-foreground/80 text-sm">Personal Project</p>
                </div>
              </motion.div>

              <motion.div {...fadeUp(0.3)} className="mb-16">
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5">
                  About this project
                </h2>
                <p
                className="text-xl md:text-2xl leading-relaxed text-foreground/80"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                
                  {project.longDescription}
                </p>
              </motion.div>

              <motion.div {...fadeUp(0.35)} className="mb-16 rounded-2xl overflow-hidden border border-foreground/10">
                <ProjectImage
                src={project.imageSrc}
                alt={`${project.title} preview`}
                className="w-full object-cover"
                style={{ maxHeight: 480 }} />
              
              </motion.div>

              {/* Nav */}
              <motion.div
              {...fadeUp(0.4)}
              className="border-t border-foreground/10 pt-8 grid grid-cols-2 gap-4">
              
                {prevProject ?
              <Link
                to={`/projects/${prevProject.id}`}
                className="group flex flex-col gap-1 p-5 rounded-xl border border-foreground/10 transition-colors">
                
                    <span className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                      <ArrowLeft className="w-3 h-3" /> Previous
                    </span>
                    <span className="text-sm font-bold text-foreground group-hover:translate-x-0.5 transition-transform" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {prevProject.title}
                    </span>
                  </Link> :
              <div />}
                {nextProject ?
              <Link
                to={`/projects/${nextProject.id}`}
                className="group flex flex-col gap-1 p-5 rounded-xl border border-foreground/10 transition-colors text-right ml-auto w-full">
                
                    <span className="text-xs uppercase tracking-widest text-muted-foreground flex items-center justify-end gap-1">
                      Next <ArrowRight className="w-3 h-3" />
                    </span>
                    <span className="text-sm font-bold text-foreground group-hover:-translate-x-0.5 transition-transform" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {nextProject.title}
                    </span>
                  </Link> :
              <div />}
              </motion.div>
            </div>
          </>
        )
        }
      </div>
    </>
  );

};

export default ProjectDetailPage;
