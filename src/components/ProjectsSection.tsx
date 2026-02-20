import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
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
  year: string;
  role?: string;
  live?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    id: 'pesu-mc',
    title: 'PESU Minecraft S2',
    description: 'Official website for PESU Minecraft Server – Season 2',
    longDescription: 'A fully responsive website built to showcase and manage the PESU Minecraft Server Season 2 community. Features a live server status widget, player leaderboards, season recap, and event announcements. Designed with a dark blocky aesthetic to match the Minecraft theme.',
    imageSrc: projectPesuMC,
    tags: ['React', 'Tailwind', 'Vercel', 'REST API'],
    year: '2024',
    role: 'Lead Developer',
    live: 'https://pesu-mc.vercel.app',
  },
  {
    id: 'contour-flow',
    title: 'Contour Flow Demo',
    description: 'Lightweight animated topographic background',
    longDescription: 'An open-source WebGL-powered topographic contour background component built for modern React apps. Uses a custom GLSL shader to render smooth, looping contour lines with configurable speed, density, and color. Zero dependencies beyond OGL.',
    imageSrc: projectContour,
    tags: ['WebGL', 'GLSL', 'React', 'OGL'],
    year: '2024',
    role: 'Creator',
    live: 'https://contour-flow-test.vercel.app/',
  },
  {
    id: 'askbookie',
    title: 'AskBookie_',
    description: 'Production-ready RAG API frontend for document Q&A',
    longDescription: 'A production-grade frontend for a Retrieval-Augmented Generation (RAG) pipeline. Users upload documents and interact with them via a conversational interface powered by a custom backend API. Features streaming responses, citation highlighting, and multi-document support.',
    imageSrc: projectAskbookie,
    tags: ['Next.js', 'RAG', 'AI', 'TypeScript', 'FastAPI'],
    year: '2024',
    role: 'Full-Stack Developer',
    live: 'https://askbookie.vercel.app',
  },
  {
    id: 'smart-chef',
    title: 'Smart Chef',
    description: 'In-memory Vector Space Model using TF-IDF',
    longDescription: 'A recipe recommendation engine built entirely in-memory using a Vector Space Model and TF-IDF scoring. Enter ingredients you have on hand and the system ranks recipes by relevance using cosine similarity — no external APIs or databases required.',
    imageSrc: projectSmartchef,
    tags: ['Python', 'TF-IDF', 'NLP', 'VSM'],
    year: '2023',
    role: 'ML Engineer',
    github: 'https://github.com/Thanas-R/Smart-Chef',
  },
  {
    id: 'thanas-os',
    title: 'ThanasOS',
    description: 'macOS-themed interactive portfolio',
    longDescription: 'An earlier iteration of my portfolio, styled as a full macOS desktop environment in the browser. Features a working dock, draggable windows, a simulated Finder, and interactive apps including a code editor, terminal, and photo viewer.',
    imageSrc: projectThanasOS,
    tags: ['React', 'CSS', 'Framer Motion', 'Zustand'],
    year: '2023',
    role: 'Designer & Developer',
    live: 'https://thanasr-old.vercel.app',
  },
  {
    id: 'pesu-forge',
    title: 'PESU Forge',
    description: 'AI-powered study platform for interactive quizzes',
    longDescription: 'An AI-powered study platform built for PESU students. Upload notes or select a subject and generate dynamic multiple-choice quizzes, flashcards, and summaries. The backend uses GPT-4 to parse and contextualise academic content with PESU-specific syllabi.',
    imageSrc: projectPesuforge,
    tags: ['React', 'GPT-4', 'Supabase', 'AI', 'Education'],
    year: '2024',
    role: 'Full-Stack Developer',
    live: 'https://pesu-forge.vercel.app/',
  },
];

// Preload all project images immediately
const preloadedImages: HTMLImageElement[] = projects.map((p) => {
  const img = new Image();
  img.src = p.imageSrc;
  return img;
});

// Keep reference so GC doesn't collect them
void preloadedImages;

const ProjectsSection = () => {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const maxOffset = 2;
  const len = projects.length;

  const next = useCallback(() => setActive((a) => (a + 1) % len), [len]);
  const prev = () => setActive((a) => (a - 1 + len) % len);

  useEffect(() => {
    if (hovering || reduceMotion) return;
    const id = setInterval(next, 3500);
    return () => clearInterval(id);
  }, [hovering, next, reduceMotion]);

  const cardWidth = 400;
  const cardHeight = 250;
  const spacing = cardWidth * 0.48;

  return (
    <section id="projects" className="relative px-6 py-12 overflow-hidden pt-[64px]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground font-['Space_Grotesk'] tracking-tight">
              Projects
            </h2>
          </div>

          {/* Card Stack */}
          <div
            className="relative w-full flex items-end justify-center"
            style={{ height: 320, perspective: 1100 }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <AnimatePresence initial={false}>
              {projects.map((item, i) => {
                const raw = i - active;
                const alt = raw > 0 ? raw - len : raw + len;
                const off = Math.abs(alt) < Math.abs(raw) ? alt : raw;
                const abs = Math.abs(off);
                if (abs > maxOffset) return null;

                const isActive = off === 0;
                const x = off * spacing;
                const rotateZ = off * 18;
                const y = abs * 10;
                const scale = isActive ? 1.03 : 0.92;

                return (
                  <motion.div
                    key={item.id}
                    className={`absolute bottom-0 rounded-2xl border border-foreground/10 overflow-hidden shadow-xl cursor-pointer select-none ${
                      isActive ? 'z-30' : abs === 1 ? 'z-20' : 'z-10'
                    }`}
                    style={{ width: cardWidth, height: cardHeight, transformStyle: 'preserve-3d' }}
                    animate={{ x, y: y + (isActive ? -20 : 0), rotateZ, scale, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                    onClick={() => {
                      if (!isActive) setActive(i);
                    }}
                  >
                    <div className="relative h-full w-full">
                      <img
                        src={item.imageSrc}
                        alt={item.title}
                        className="h-full w-full object-cover"
                        draggable={false}
                        loading="eager"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                        <span className="text-lg font-semibold text-white truncate block">{item.title}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <button onClick={prev} className="text-muted-foreground hover:text-foreground transition-colors p-1">
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                className={`h-2 w-2 rounded-full transition ${
                  idx === active ? 'bg-foreground' : 'bg-foreground/30 hover:bg-foreground/50'
                }`}
              />
            ))}
            <button onClick={next} className="text-muted-foreground hover:text-foreground transition-colors p-1">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-foreground/20 text-foreground text-sm font-medium hover:bg-foreground hover:text-background transition-all duration-300"
            >
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
