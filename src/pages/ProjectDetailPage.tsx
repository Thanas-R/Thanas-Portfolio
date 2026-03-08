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
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: 'easeOut' as const }
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

  const ProjectImage = ({ src, alt, className, style }: {src: string;alt: string;className?: string;style?: React.CSSProperties;}) => {
    if (project.live) {
      return (
        <a href={project.live} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
          <img src={src} alt={alt} className={className} style={style} />
        </a>);

    }
    return <img src={src} alt={alt} className={className} style={style} />;
  };

  // AskBookie theme colors based on mode
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

  // Smart Chef background removed per user request
  const smartChefBg = undefined;

  return (
    <>
      {!isAskBookie && !isPesuForge && <GridBackground />}
      <div className="relative z-10 min-h-screen" style={smartChefBg ? { backgroundColor: smartChefBg } : undefined}>
        {!isAskBookie && !isPesuForge && <Navbar />}

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
                      style={{ color: ab.text, fontFamily: "'Roboto', sans-serif" }}>
                      
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
                  style={{ color: ab.textMuted, fontFamily: "'Roboto', sans-serif" }}>
                  
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

            {/* Two-column: text left, Mac right */}
            <div className="flex flex-col md:flex-row md:items-start md:gap-12 mt-4">
              {/* Left: text content */}
              <motion.div {...fadeUp(0.08)} className="md:w-[45%] shrink-0">
                <h1 className="text-5xl md:text-7xl font-black text-foreground leading-none tracking-tight mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {project.title}
                </h1>
                <div className="flex items-center gap-16 mb-4">
                  <AppleHelloEffect className="h-8 md:h-12 text-foreground" speed={0.7} />
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-85 transition-opacity shrink-0">
                      <ExternalLink className="w-4 h-4" />
                      Live Site
                    </a>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  macOS-themed interactive portfolio
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => <span key={tag} className="text-xs px-3 py-1.5 rounded-full border border-foreground/10 text-muted-foreground font-medium uppercase tracking-wider">{tag}</span>)}
                </div>
                <div className="mb-8">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">About this project</h2>
                  <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                    A browser-based portfolio designed to recreate the macOS desktop experience. Visitors interact with a desktop-like interface &amp; opening apps, moving windows, and exploring sections like About, Projects, and Journey.
                  </p>
                  <p className="text-sm text-muted-foreground/80 leading-relaxed mt-4">
                    This was one of my first serious web projects where I experimented with UI design and interactions. The goal was to make a portfolio that feels more immersive and memorable than a standard webpage.
                  </p>
                </div>
              </motion.div>

              {/* Right: Mac mockup */}
              <motion.div {...fadeUp(0.15)} className="md:w-[55%] flex items-start justify-center mt-8 md:mt-0">
                <Mac src={thanasOsMac} className="w-full max-w-[650px] h-auto text-background" />
              </motion.div>
            </div>

            <motion.div {...fadeUp(0.4)} className="border-t border-foreground/10 pt-8 grid grid-cols-2 gap-4 mt-12">
              {prevProject ? <Link to={`/projects/${prevProject.id}`} className="group flex flex-col gap-1 p-5 rounded-xl border border-foreground/10 transition-colors"><span className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-1"><ArrowLeft className="w-3 h-3" /> Previous</span><span className="text-sm font-bold text-foreground group-hover:translate-x-0.5 transition-transform" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{prevProject.title}</span></Link> : <div />}
              {nextProject ? <Link to={`/projects/${nextProject.id}`} className="group flex flex-col gap-1 p-5 rounded-xl border border-foreground/10 transition-colors text-right ml-auto w-full"><span className="text-xs uppercase tracking-widest text-muted-foreground flex items-center justify-end gap-1">Next <ArrowRight className="w-3 h-3" /></span><span className="text-sm font-bold text-foreground group-hover:-translate-x-0.5 transition-transform" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{nextProject.title}</span></Link> : <div />}
            </motion.div>
          </div>) :
        isSmartChef ? (
        /* ── Smart Chef ── */
        <div className="max-w-4xl mx-auto px-6 pt-12 pb-24">
            <motion.div {...fadeUp(0)}>
              <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
              
                <ArrowLeft className="w-4 h-4" />
                All Projects
              </Link>
            </motion.div>

            <motion.div {...fadeUp(0.08)} className="mb-10 mt-4">
              <h1
              className="text-5xl md:text-7xl font-bold text-foreground leading-[1.05]"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              
                Smart{' '}
                <span className="italic" style={{ color: '#FA8638' }}>
                  Chef
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mt-5 max-w-xl leading-relaxed">
                A full-stack recipe matching system powered by TF-IDF vectors, fuzzy ingredient mapping, and AI-generated cooking steps.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.15)} className="flex gap-3 mb-12">
              {project.live &&
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-85 transition-opacity text-white"
              style={{ backgroundColor: '#FA8638' }}>
              
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
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

            <motion.div {...fadeUp(0.18)} className="flex flex-wrap gap-2 mb-14">
              {project.tags.map((tag) =>
            <span
              key={tag}
              className="text-xs px-3 py-1.5 rounded-full border border-foreground/10 text-muted-foreground font-medium uppercase tracking-wider">
              
                  {tag}
                </span>
            )}
            </motion.div>

            <motion.div {...fadeUp(0.22)} className="space-y-14">
              <div>
                <h2
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif", color: '#FA8638' }}>
                
                  Overview
                </h2>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  SmartChef combines a lightweight frontend with a FastAPI backend to deliver intelligent recipe suggestions.
                  Enter the ingredients you have on hand, and the system ranks recipes by relevance using cosine similarity
                  over TF-IDF vectors then generates step by step cooking instructions with Google Gemini AI.
                </p>
              </div>

              <div>
                <h2
                className="text-2xl md:text-3xl font-bold mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                
                  How It{' '}
                  <span className="italic" style={{ color: '#FA8638' }}>
                    Works
                  </span>
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                { num: '01', title: 'Enter Ingredients', desc: 'Input what you have on hand. The system normalizes and maps them using fuzzy matching.' },
                { num: '02', title: 'Match Recipes', desc: 'TF-IDF vectorization and cosine similarity rank the best recipe matches instantly.' },
                { num: '03', title: 'Get Instructions', desc: 'Google Gemini generates tailored cooking steps based on the matched recipe and your ingredients.' }].
                map((step) =>
                <div key={step.num} className="p-6 rounded-2xl border border-foreground/10 bg-card">
                      <span
                    className="text-3xl font-bold"
                    style={{ fontFamily: "'Playfair Display', serif", color: '#FA8638' }}>
                    
                        {step.num}
                      </span>
                      <h3 className="font-bold text-foreground mt-3 mb-2 font-['Space_Grotesk']">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                )}
                </div>
              </div>

              <div>
                <h2
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                
                  Architecture
                </h2>
                <div className="p-6 rounded-2xl border border-foreground/10 bg-card font-mono text-sm text-foreground/70 leading-loose">
                  <span className="text-foreground font-semibold">User Input</span> → Frontend (HTML + CSS + JS)<br />
                  → <span style={{ color: '#FA8638' }} className="font-semibold">FastAPI Backend</span> (TF-IDF + Cosine Similarity)<br />
                  → Recipe Matches + <span style={{ color: '#FA8638' }} className="font-semibold">AI Cooking Instructions</span>
                </div>
              </div>

              <div>
                <h2
                className="text-2xl md:text-3xl font-bold mb-6"
                style={{ fontFamily: "'Playfair Display', serif", color: '#FA8638' }}>
                
                  Tech Stack
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                { label: 'Framework', value: 'FastAPI' },
                { label: 'Vectorization', value: 'TF-IDF' },
                { label: 'Similarity', value: 'Cosine' },
                { label: 'AI Model', value: 'Gemini 2.5 Flash' },
                { label: 'Frontend', value: 'HTML / CSS / JS' },
                { label: 'API', value: 'Fetch API' },
                { label: 'Server', value: 'Uvicorn' },
                { label: 'Hosting', value: 'Render + Vercel' }].
                map((item) =>
                <div key={item.label} className="p-4 rounded-xl border border-foreground/10 bg-card">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="text-sm font-semibold text-foreground font-['Space_Grotesk']">{item.value}</p>
                    </div>
                )}
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.3)} className="mt-14 rounded-2xl overflow-hidden border border-foreground/10">
              <ProjectImage
              src={project.imageSrc}
              alt={`${project.title} preview`}
              className="w-full object-cover"
              style={{ maxHeight: 480 }} />
            
            </motion.div>

            {/* Nav */}
            <motion.div
            {...fadeUp(0.4)}
            className="border-t border-foreground/10 pt-8 mt-16 grid grid-cols-2 gap-4">
            
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
          </div>) : isPesuForge ? (
        /* ── PESU Forge — backdrop landscape with floating cards ── */
        <div className="min-h-screen relative">
          {/* Fixed backdrop image */}
          <div className="fixed inset-0 z-0">
            <img
              src={pesuForgeBg}
              alt=""
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10">
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 pt-12 pb-24">
              <motion.div {...fadeUp(0)}>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8"
                >
                  <ArrowLeft className="w-4 h-4" />
                  All Projects
                </Link>
              </motion.div>

              {/* Hero card */}
              <motion.div
                {...fadeUp(0.08)}
                className="rounded-2xl p-8 md:p-10 mb-8 backdrop-blur-xl"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.55)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <h1
                  className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight mb-5 uppercase"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {project.title}
                </h1>
                <p className="text-lg text-white/60 max-w-xl leading-relaxed">
                  {project.description}
                </p>

                {/* Links */}
                <div className="flex gap-3 mt-6">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:opacity-85 transition-opacity"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Site
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white hover:text-black transition-all"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Tags between hero and about */}
              <motion.div {...fadeUp(0.12)} className="flex flex-wrap gap-2 mb-8 justify-center">
                {project.tags.map((tag, i) => (
                  <span
                    key={tag}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium uppercase tracking-wider ${
                      i === 0
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-white/5 text-white/50 border border-white/10'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* About card */}
              <motion.div
                {...fadeUp(0.15)}
                className="rounded-2xl p-8 md:p-10 mb-6 backdrop-blur-xl"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.55)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">
                  About this project
                </h2>
                <p className="text-base md:text-lg leading-relaxed text-white/70">
                  PESU Forge is an AI-powered study tool that transforms notes into interactive learning experiences such as flashcards, quizzes, memory games, and visual mind maps.
                </p>
                <p className="text-base md:text-lg leading-relaxed text-white/70 mt-4">
                  This was my first ever project and the one that introduced me to building with AI. Working on it exposed me to how modern AI systems can be integrated into applications, which eventually pushed me to explore and build more projects afterwards. It became the starting point of my development journey.
                </p>
                <p className="text-base md:text-lg leading-relaxed text-white/70 mt-4">
                  The idea was to make studying more interactive by turning static notes into dynamic learning formats that help with recall, understanding, and engagement.
                </p>
              </motion.div>

              {/* Features grid */}
              <motion.div {...fadeUp(0.22)} className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                  { title: 'Flashcards', desc: 'AI-generated question and answer cards with flip animations' },
                  { title: 'Quiz', desc: 'Multiple-choice quizzes generated from notes with explanations' },
                  { title: 'Memory Match', desc: 'Concept matching card game with scoring and timer' },
                  { title: 'Thoughtscape', desc: 'Visual mind maps generated from study material' },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl p-6 backdrop-blur-xl"
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <h3 className="font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </motion.div>

              {/* Tech Stack card */}
              <motion.div
                {...fadeUp(0.28)}
                className="rounded-2xl p-8 md:p-10 mb-6 backdrop-blur-xl"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.55)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">
                  Tech Stack
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Frontend', value: 'React' },
                    { label: 'Language', value: 'TypeScript' },
                    { label: 'Build', value: 'Vite' },
                    { label: 'Styling', value: 'Tailwind CSS' },
                    { label: 'Components', value: 'shadcn/ui' },
                    { label: 'Animation', value: 'Framer Motion' },
                    { label: 'AI', value: 'Gemini 2.5 Flash' },
                    { label: 'State', value: 'Zustand' },
                  ].map((item) => (
                    <div key={item.label} className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <p className="text-xs text-white/30 uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="text-sm font-semibold text-white/80" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Screenshot */}
              <motion.div {...fadeUp(0.32)} className="rounded-2xl overflow-hidden mb-16" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                <ProjectImage
                  src={project.imageSrc}
                  alt={`${project.title} preview`}
                  className="w-full object-cover"
                  style={{ maxHeight: 480 }}
                />
              </motion.div>

              {/* Nav */}
              <motion.div
                {...fadeUp(0.38)}
                className="border-t pt-8 grid grid-cols-2 gap-4"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}
              >
                {prevProject ? (
                  <Link
                    to={`/projects/${prevProject.id}`}
                    className="group flex flex-col gap-1 p-5 rounded-xl transition-colors backdrop-blur-xl"
                    style={{ backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <span className="text-xs uppercase tracking-widest text-white/40 flex items-center gap-1">
                      <ArrowLeft className="w-3 h-3" /> Previous
                    </span>
                    <span className="text-sm font-bold text-white/80 group-hover:translate-x-0.5 transition-transform" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {prevProject.title}
                    </span>
                  </Link>
                ) : <div />}
                {nextProject ? (
                  <Link
                    to={`/projects/${nextProject.id}`}
                    className="group flex flex-col gap-1 p-5 rounded-xl transition-colors text-right ml-auto w-full backdrop-blur-xl"
                    style={{ backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <span className="text-xs uppercase tracking-widest text-white/40 flex items-center justify-end gap-1">
                      Next <ArrowRight className="w-3 h-3" />
                    </span>
                    <span className="text-sm font-bold text-white/80 group-hover:-translate-x-0.5 transition-transform" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {nextProject.title}
                    </span>
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
          </>)
        }
      </div>
    </>);

};

export default ProjectDetailPage;
