import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

import projectPesuMC from '@/assets/project-pesumc.png';
import projectContour from '@/assets/project-contour.png';
import projectAskbookie from '@/assets/project-askbookie.png';
import projectSmartchef from '@/assets/project-smartchef.png';
import projectThanasOS from '@/assets/project-thanasOS.png';
import projectPesuforge from '@/assets/project-pesuforge.png';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageSrc: string;
  tags: string[];
  live?: string;
  github?: string;
  role?: string;
  year: string;
}

export const projects: Project[] = [
  {
    id: 'pesu-mc',
    title: 'PESU Minecraft S2',
    description: 'Official website for PESU Minecraft Server – Season 2',
    longDescription: 'A full community website built for the PESU Minecraft Server Season 2, featuring event schedules, server info, player stats, and community updates. Designed to bring the Minecraft community together with a modern, responsive UI.',
    imageSrc: projectPesuMC,
    tags: ['React', 'Tailwind', 'Community'],
    live: 'https://pesu-mc.vercel.app',
    github: 'https://github.com/Thanas-R/PESU-MC-S2-Website',
    year: '2024',
  },
  {
    id: 'contour-flow',
    title: 'Contour Flow Demo',
    description: 'Lightweight animated topographic background',
    longDescription: 'A reusable, zero-dependency animated topographic contour background built for modern portfolio and landing pages. Smooth canvas-based animation that adapts to any theme, with fine-tuned performance for 60fps rendering.',
    imageSrc: projectContour,
    tags: ['Canvas', 'Animation', 'Open Source'],
    live: 'https://contour-flow-test.vercel.app/',
    github: 'https://github.com/Thanas-R/contour-flow-test',
    year: '2024',
  },
  {
    id: 'askbookie',
    title: 'AskBookie_',
    description: 'Production-ready RAG API frontend for document Q&A',
    longDescription: 'A sleek frontend for a production Retrieval-Augmented Generation (RAG) API that lets students query PES University lecture slides and documents. Supports multi-turn conversations, source citations, and real-time streaming responses.',
    imageSrc: projectAskbookie,
    tags: ['React', 'RAG', 'AI', 'Frontend'],
    live: 'https://askbookie.vercel.app',
    github: 'https://github.com/dotpmm/askbookie-frontend',
    role: 'Frontend Developer',
    year: '2024',
  },
  {
    id: 'smart-chef',
    title: 'Smart Chef',
    description: 'In-memory Vector Space Model using TF-IDF',
    longDescription: 'A Python-based recipe search engine using an in-memory Vector Space Model with TF-IDF weighting and cosine similarity. Allows users to find recipes by ingredients or dietary preferences without any external API or database.',
    imageSrc: projectSmartchef,
    tags: ['Python', 'ML', 'NLP', 'TF-IDF'],
    github: 'https://github.com/Thanas-R/Smart-Chef',
    year: '2023',
  },
  {
    id: 'thanasos',
    title: 'ThanasOS',
    description: 'macOS-themed interactive portfolio',
    longDescription: 'An older interactive portfolio styled as a macOS desktop environment. Features draggable windows, a dock, Finder-like navigation, and animated transitions — all built purely in React without any native APIs.',
    imageSrc: projectThanasOS,
    tags: ['React', 'Creative', 'Portfolio'],
    live: 'https://thanasr-old.vercel.app',
    github: 'https://github.com/Thanas-R',
    year: '2023',
  },
  {
    id: 'pesu-forge',
    title: 'PESU Forge',
    description: 'AI-powered study platform for interactive quizzes',
    longDescription: 'An AI-powered educational platform that converts course notes and PDFs into interactive quizzes, flashcards, and mini-games. Built for PES University students to make studying more engaging and effective using LLMs.',
    imageSrc: projectPesuforge,
    tags: ['React', 'AI', 'EdTech', 'LLM'],
    live: 'https://pesu-forge.vercel.app/',
    github: 'https://github.com/Thanas-R/PESU-Forge',
    year: '2024',
  },
];

const ProjectsSection = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const hoveredProject = projects.find((p) => p.id === hoveredId);

  return (
    <section id="projects" className="relative px-6 py-12 overflow-hidden pt-[64px]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}>

          <div className="flex items-end justify-between mb-2">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground font-['Space_Grotesk'] tracking-tight">
              Projects
            </h2>
            <span className="text-2xl md:text-4xl font-bold text-muted-foreground/40 font-['Space_Grotesk']">
              {projects.length}
            </span>
          </div>

          {/* Project list */}
          <div
            className="border-t border-foreground/10 mt-6"
            onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
          >
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="border-b border-foreground/10"
              >
                <Link
                  to={`/projects/${project.id}`}
                  className="flex items-center justify-between py-5 group cursor-pointer"
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground/30 text-sm font-mono w-6 text-right group-hover:text-muted-foreground transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg md:text-xl font-bold text-foreground font-['Space_Grotesk'] group-hover:translate-x-1 transition-transform duration-200 inline-block">
                          → {project.title}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1 md:hidden">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="hidden md:block text-sm text-muted-foreground">
                      {project.tags[0]}
                    </span>
                    <span className="hidden sm:block text-xs text-muted-foreground/50 font-mono">{project.year}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Floating preview */}
          <AnimatePresence>
            {hoveredProject && (
              <motion.div
                className="fixed pointer-events-none z-50 rounded-2xl overflow-hidden shadow-2xl border border-foreground/10"
                style={{
                  left: mousePos.x + 24,
                  top: mousePos.y - 80,
                  width: 280,
                  height: 180,
                }}
                initial={{ opacity: 0, scale: 0.88, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: 10 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                <img
                  src={hoveredProject.imageSrc}
                  alt={hoveredProject.title}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-xs font-medium">{hoveredProject.description}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-foreground/20 text-foreground text-sm font-medium hover:bg-foreground hover:text-background transition-all duration-300">
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
