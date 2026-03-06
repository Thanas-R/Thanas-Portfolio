import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import GridBackground from '@/components/GridBackground';
import Navbar from '@/components/Navbar';
import { projects } from '@/components/ProjectsSection';
import { Mac } from '@/components/Mac';
import thanasOsMac from '@/assets/thanasos-mac.png';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: 'easeOut' as const },
});

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.id === slug);

  if (!project) return <Navigate to="/projects" replace />;

  const currentIndex = projects.findIndex((p) => p.id === slug);
  const prevProject = projects[currentIndex - 1] ?? null;
  const nextProject = projects[currentIndex + 1] ?? null;
  const isThanasOS = project.id === 'thanas-os';
  const isSmartChef = project.id === 'smart-chef';
  const isAskBookie = project.id === 'askbookie';

  // Wrapper for clickable project images
  const ProjectImage = ({ src, alt, className, style }: { src: string; alt: string; className?: string; style?: React.CSSProperties }) => {
    if (project.live) {
      return (
        <a href={project.live} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
          <img src={src} alt={alt} className={className} style={style} />
        </a>
      );
    }
    return <img src={src} alt={alt} className={className} style={style} />;
  };

  return (
    <>
      {!isAskBookie && <GridBackground />}
      <div className="relative z-10 min-h-screen">
        {!isAskBookie && <Navbar />}

        {isAskBookie ? (
          /* ── AskBookie: Monospace terminal-inspired dark themed layout ── */
          <div
            className="min-h-screen"
            style={{
              backgroundColor: '#1a1a1a',
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '16px 16px',
              color: '#e0e0e0',
            }}
          >
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
              <motion.div {...fadeUp(0)}>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors mb-8"
                  style={{ color: '#999', fontFamily: "'Space Mono', 'Courier New', monospace" }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  All Projects
                </Link>
              </motion.div>

              {/* Hero title — bold condensed like AskBookie branding */}
              <motion.div {...fadeUp(0.08)} className="mb-10 mt-4">
                <h1
                  className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter uppercase"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  AskBookie<span className="text-white/40">_</span>
                </h1>
                <p
                  className="text-base mt-5 max-w-xl leading-relaxed"
                  style={{ color: '#999', fontFamily: "'Space Mono', 'Courier New', monospace" }}
                >
                  A polished, production-ready frontend for a RAG chat app that lets students query academic documents via a conversational interface.
                </p>
              </motion.div>

              {/* Links */}
              <motion.div {...fadeUp(0.15)} className="flex gap-3 mb-10">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-85 transition-opacity text-black"
                    style={{ backgroundColor: '#e0e0e0', fontFamily: "'Space Mono', monospace" }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg border text-sm font-semibold hover:bg-white/10 transition-all"
                    style={{ borderColor: '#444', color: '#ccc', fontFamily: "'Space Mono', monospace" }}
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                )}
              </motion.div>

              {/* Tags */}
              <motion.div {...fadeUp(0.18)} className="flex flex-wrap gap-2 mb-14">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1.5 rounded-md font-medium uppercase tracking-wider"
                    style={{
                      backgroundColor: '#2a2a2a',
                      color: '#aaa',
                      border: '1px solid #333',
                      fontFamily: "'Space Mono', monospace",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* Screenshot */}
              <motion.div {...fadeUp(0.2)} className="mb-14 rounded-xl overflow-hidden" style={{ border: '1px solid #333' }}>
                <ProjectImage
                  src={project.imageSrc}
                  alt={`${project.title} preview`}
                  className="w-full object-cover"
                  style={{ maxHeight: 480 }}
                />
              </motion.div>

              {/* My Role */}
              <motion.div {...fadeUp(0.22)} className="space-y-12">
                <div
                  className="p-6 rounded-xl"
                  style={{ backgroundColor: '#222', border: '1px solid #333' }}
                >
                  <h2
                    className="text-xs font-bold uppercase tracking-widest mb-4"
                    style={{ color: '#888', fontFamily: "'Space Mono', monospace" }}
                  >
                    My Role
                  </h2>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: '#ccc', fontFamily: "'Space Mono', 'Courier New', monospace" }}
                  >
                    I built the entire frontend — from the chat UI, PDF upload flow, and subject selector to theming, animations, and responsive layout. The backend RAG pipeline and API architecture were designed and built by{' '}
                    <a
                      href="https://github.com/dotpmm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-white transition-colors"
                      style={{ color: '#e0e0e0' }}
                    >
                      pmmdot
                    </a>
                    , who also led the project.
                  </p>
                </div>

                {/* What I Built */}
                <div>
                  <h2
                    className="text-sm font-bold uppercase tracking-widest mb-6"
                    style={{ color: '#888', fontFamily: "'Space Mono', monospace" }}
                  >
                    What I Built
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { title: 'Chat Interface', desc: 'Real-time conversational UI with streaming response rendering and message history.' },
                      { title: 'PDF Upload Flow', desc: 'Client-side validation, progress tracking, and retry logic for document indexing.' },
                      { title: 'Subject Selector', desc: 'Physics, Chemistry, Python — organized Q&A with subject-based context switching.' },
                      { title: 'Theme & Responsive', desc: 'Dark/light toggle with persisted preference. Fully mobile-first responsive design.' },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="p-5 rounded-xl"
                        style={{ backgroundColor: '#222', border: '1px solid #333' }}
                      >
                        <h3
                          className="font-bold text-white mb-2 text-sm"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {item.title}
                        </h3>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: '#999', fontFamily: "'Space Mono', monospace" }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <h2
                    className="text-sm font-bold uppercase tracking-widest mb-6"
                    style={{ color: '#888', fontFamily: "'Space Mono', monospace" }}
                  >
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
                      { label: 'Hosting', value: 'Vercel' },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="p-4 rounded-lg"
                        style={{ backgroundColor: '#222', border: '1px solid #333' }}
                      >
                        <p
                          className="text-xs uppercase tracking-wider mb-1"
                          style={{ color: '#666', fontFamily: "'Space Mono', monospace" }}
                        >
                          {item.label}
                        </p>
                        <p
                          className="text-sm font-semibold text-white"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h2
                    className="text-sm font-bold uppercase tracking-widest mb-6"
                    style={{ color: '#888', fontFamily: "'Space Mono', monospace" }}
                  >
                    Key Features
                  </h2>
                  <div
                    className="p-6 rounded-xl space-y-3"
                    style={{ backgroundColor: '#222', border: '1px solid #333' }}
                  >
                    {[
                      'Subject-based Q&A (Physics, Chemistry, Python, …)',
                      'PDF upload with client validation & progress UI',
                      'Streaming-like response rendering',
                      'Persistent local chat history',
                      'Dark / Light theme with smooth transitions',
                      'Mobile-first responsive layout',
                      'Keyboard navigation & ARIA labels',
                    ].map((feat) => (
                      <div key={feat} className="flex items-start gap-3">
                        <span style={{ color: '#555' }} className="mt-0.5">▸</span>
                        <p
                          className="text-sm"
                          style={{ color: '#bbb', fontFamily: "'Space Mono', monospace" }}
                        >
                          {feat}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Credits */}
                <div
                  className="p-6 rounded-xl"
                  style={{ backgroundColor: '#222', border: '1px solid #333' }}
                >
                  <h2
                    className="text-xs font-bold uppercase tracking-widest mb-3"
                    style={{ color: '#888', fontFamily: "'Space Mono', monospace" }}
                  >
                    Credits
                  </h2>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: '#999', fontFamily: "'Space Mono', monospace" }}
                  >
                    Backend, RAG pipeline, and project lead:{' '}
                    <a
                      href="https://github.com/dotpmm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-white transition-colors"
                      style={{ color: '#e0e0e0' }}
                    >
                      @pmmdot
                    </a>
                    <br />
                    Frontend development: Thanas R
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        ) : isThanasOS ? (
          /* ── ThanasOS: unique layout with Mac SVG ── */
          <div className="max-w-6xl mx-auto px-6 pt-28 pb-24">
            <motion.div {...fadeUp(0)}>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                All Projects
              </Link>
            </motion.div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16 mb-16">
              <div className="flex-1 min-w-0">
                <motion.div {...fadeUp(0.08)} className="mb-6">
                  <h1
                    className="text-5xl md:text-7xl font-black text-foreground leading-none tracking-tight mb-4 uppercase"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {project.title}
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                    {project.description}
                  </p>
                </motion.div>

                <motion.div {...fadeUp(0.15)} className="flex gap-3 mb-8">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-85 transition-opacity"
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
                      className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-foreground/20 text-foreground text-sm font-semibold hover:bg-foreground hover:text-background transition-all"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                </motion.div>

                <motion.div {...fadeUp(0.2)} className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1.5 rounded-full border border-foreground/10 text-muted-foreground font-medium uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>

                <motion.div {...fadeUp(0.25)}>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                    About this project
                  </h2>
                  <p
                    className="text-lg md:text-xl leading-relaxed text-foreground/80"
                    style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                  >
                    {project.longDescription}
                  </p>
                </motion.div>
              </div>

              <motion.div
                {...fadeUp(0.2)}
                className="flex-shrink-0 w-full md:w-auto flex justify-center"
              >
                <Mac
                  src={thanasOsMac}
                  className="w-full max-w-[520px] h-auto text-background"
                />
              </motion.div>
            </div>
          </div>
        ) : isSmartChef ? (
          /* ── Smart Chef: stylized serif typography layout ── */
          <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
            <motion.div {...fadeUp(0)}>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                All Projects
              </Link>
            </motion.div>

            <motion.div {...fadeUp(0.08)} className="mb-10 mt-4">
              <h1
                className="text-5xl md:text-7xl font-bold text-foreground leading-[1.05]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
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
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-85 transition-opacity text-white"
                  style={{ backgroundColor: '#FA8638' }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-foreground/20 text-foreground text-sm font-semibold hover:bg-foreground hover:text-background transition-all"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
            </motion.div>

            <motion.div {...fadeUp(0.18)} className="flex flex-wrap gap-2 mb-14">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 rounded-full border border-foreground/10 text-muted-foreground font-medium uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div {...fadeUp(0.22)} className="space-y-14">
              <div>
                <h2
                  className="text-2xl md:text-3xl font-bold mb-4"
                  style={{ fontFamily: "'Playfair Display', serif", color: '#FA8638' }}
                >
                  Overview
                </h2>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  SmartChef combines a lightweight frontend with a FastAPI backend to deliver intelligent recipe suggestions.
                  Enter the ingredients you have on hand, and the system ranks recipes by relevance using cosine similarity
                  over TF-IDF vectors — then generates step-by-step cooking instructions with Google Gemini AI.
                </p>
              </div>

              <div>
                <h2
                  className="text-2xl md:text-3xl font-bold mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  How It{' '}
                  <span className="italic" style={{ color: '#FA8638' }}>
                    Works
                  </span>
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { num: '01', title: 'Enter Ingredients', desc: 'Input what you have on hand — the system normalizes and maps them using fuzzy matching.' },
                    { num: '02', title: 'Match Recipes', desc: 'TF-IDF vectorization and cosine similarity rank the best recipe matches instantly.' },
                    { num: '03', title: 'Get Instructions', desc: 'Google Gemini generates tailored cooking steps based on the matched recipe and your ingredients.' },
                  ].map((step) => (
                    <div key={step.num} className="p-6 rounded-2xl border border-foreground/10 bg-card">
                      <span
                        className="text-3xl font-bold"
                        style={{ fontFamily: "'Playfair Display', serif", color: '#FA8638' }}
                      >
                        {step.num}
                      </span>
                      <h3 className="font-bold text-foreground mt-3 mb-2 font-['Space_Grotesk']">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2
                  className="text-2xl md:text-3xl font-bold mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
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
                  style={{ fontFamily: "'Playfair Display', serif", color: '#FA8638' }}
                >
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
                    { label: 'Hosting', value: 'Render + Vercel' },
                  ].map((item) => (
                    <div key={item.label} className="p-4 rounded-xl border border-foreground/10 bg-card">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="text-sm font-semibold text-foreground font-['Space_Grotesk']">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.3)} className="mt-14 rounded-2xl overflow-hidden border border-foreground/10">
              <ProjectImage
                src={project.imageSrc}
                alt={`${project.title} preview`}
                className="w-full object-cover"
                style={{ maxHeight: 480 }}
              />
            </motion.div>
          </div>
        ) : (
          /* ── Default layout for all other projects ── */
          <>
            <div className="relative w-full overflow-hidden" style={{ height: '60vh', minHeight: 380 }}>
              {project.live ? (
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  <img
                    src={project.imageSrc}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </a>
              ) : (
                <img
                  src={project.imageSrc}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-transparent" />
            </div>

            <div className="max-w-4xl mx-auto px-6 pb-24 -mt-32 relative z-10">
              <motion.div {...fadeUp(0)}>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
                >
                  <ArrowLeft className="w-4 h-4" />
                  All Projects
                </Link>
              </motion.div>

              <motion.div {...fadeUp(0.08)} className="mb-8">
                <h1
                  className="text-5xl md:text-7xl font-black text-foreground leading-none tracking-tight mb-4 uppercase"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {project.title}
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                  {project.description}
                </p>
              </motion.div>

              <motion.div {...fadeUp(0.15)} className="flex gap-3 mb-10">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-85 transition-opacity"
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
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-foreground/20 text-foreground text-sm font-semibold hover:bg-foreground hover:text-background transition-all"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                )}
              </motion.div>

              <motion.div {...fadeUp(0.2)} className="flex flex-wrap gap-2 mb-14">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1.5 rounded-full border border-foreground/10 text-muted-foreground font-medium uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
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
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  {project.longDescription}
                </p>
              </motion.div>

              <motion.div {...fadeUp(0.35)} className="mb-16 rounded-2xl overflow-hidden border border-foreground/10">
                <ProjectImage
                  src={project.imageSrc}
                  alt={`${project.title} preview`}
                  className="w-full object-cover"
                  style={{ maxHeight: 480 }}
                />
              </motion.div>
            </div>
          </>
        )}

        {/* Nav prev/next — shared */}
        <div className={`max-w-4xl mx-auto px-6 pb-24 ${isAskBookie ? '' : ''}`}>
          <motion.div
            {...fadeUp(0.4)}
            className="border-t pt-8 grid grid-cols-2 gap-4"
            style={isAskBookie ? { borderColor: '#333' } : { borderColor: 'hsl(var(--foreground) / 0.1)' }}
          >
            {prevProject ? (
              <Link
                to={`/projects/${prevProject.id}`}
                className="group flex flex-col gap-1 p-5 rounded-xl border transition-colors"
                style={isAskBookie
                  ? { borderColor: '#333', color: '#ccc' }
                  : {}
                }
              >
                <span
                  className="text-xs uppercase tracking-widest flex items-center gap-1"
                  style={isAskBookie ? { color: '#888' } : {}}
                >
                  <ArrowLeft className="w-3 h-3" /> Previous
                </span>
                <span
                  className="text-sm font-bold group-hover:translate-x-0.5 transition-transform"
                  style={isAskBookie
                    ? { color: '#e0e0e0', fontFamily: "'Space Grotesk', sans-serif" }
                    : { fontFamily: "'Space Grotesk', sans-serif" }
                  }
                >
                  {prevProject.title}
                </span>
              </Link>
            ) : <div />}

            {nextProject ? (
              <Link
                to={`/projects/${nextProject.id}`}
                className="group flex flex-col gap-1 p-5 rounded-xl border transition-colors text-right ml-auto w-full"
                style={isAskBookie
                  ? { borderColor: '#333', color: '#ccc' }
                  : {}
                }
              >
                <span
                  className="text-xs uppercase tracking-widest flex items-center justify-end gap-1"
                  style={isAskBookie ? { color: '#888' } : {}}
                >
                  Next <ArrowRight className="w-3 h-3" />
                </span>
                <span
                  className="text-sm font-bold group-hover:-translate-x-0.5 transition-transform"
                  style={isAskBookie
                    ? { color: '#e0e0e0', fontFamily: "'Space Grotesk', sans-serif" }
                    : { fontFamily: "'Space Grotesk', sans-serif" }
                  }
                >
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

export default ProjectDetailPage;
