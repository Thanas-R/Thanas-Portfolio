import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import projectPesuMC from '@/assets/project-pesumc.png';
import projectAskbookie from '@/assets/project-askbookie.png';
import projectSmartchef from '@/assets/project-smartchef.png';
import projectThanasOS from '@/assets/project-thanasOS.png';
import projectNautilus from '@/assets/project-nautilus.png';
import projectVirdis from '@/assets/project-virdis.png';
import projectSpheal from '@/assets/project-spheal.png';
import projectPesuForge from '@/assets/project-pesuforge.png';
import projectContour from '@/assets/project-contour.png';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageSrc: string;
  tags: string[];
  live?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    id: 'nautilus',
    title: 'Nautilus',
    description: 'AI knowledge tool with mindmaps, flowcharts & concept cards',
    longDescription:
      'A canvas-based AI knowledge tool that lets users create interconnected mindmaps, flowcharts, and auto-linked concept cards forming dynamic knowledge graphs. Powered by AI, Nautilus automatically identifies relationships between concepts, generates summaries, and builds visual representations of complex topics.',
    imageSrc: projectNautilus,
    tags: ['React', 'Canvas', 'AI', 'TypeScript', 'Graph'],
    live: 'https://nautilus-build.vercel.app',
  },
  {
    id: 'virdis',
    title: 'Virdis',
    description: 'AI-powered farm boundary mapping & crop health analysis',
    longDescription:
      'An AI-powered platform that automatically maps farm boundaries and analyzes crop health using satellite timeseries data. Virdis processes multispectral imagery to calculate vegetation indices, detect anomalies, and provide actionable insights for precision agriculture.',
    imageSrc: projectVirdis,
    tags: ['React', 'Mapbox', 'Python', 'Satellite', 'AI'],
    live: 'https://virdis.vercel.app',
  },
  {
    id: 'spheal',
    title: 'Spheal',
    description: 'Smart AI travel planner with interactive map visualization',
    longDescription:
      'A smart travel planner that generates personalized, day-by-day itineraries with routes and hotel suggestions, visualized on an interactive Mapbox map. Users select their destination, trip duration, and travel preferences — then the AI designs the full itinerary.',
    imageSrc: projectSpheal,
    tags: ['React', 'Mapbox', 'AI', 'TypeScript'],
    live: 'https://spheal.vercel.app',
  },
  {
    id: 'pesu-mc',
    title: 'PESU Minecraft S2',
    description: 'Official website for PESU Minecraft Server – Season 2',
    longDescription:
      'A fully responsive website built to showcase and manage the PESU Minecraft Server Season 2 community. Features a live server status widget, player leaderboards, season recap, and event announcements.',
    imageSrc: projectPesuMC,
    tags: ['React', 'Tailwind', 'Vercel', 'REST API'],
    live: 'https://pesu-mc.vercel.app',
  },
  {
    id: 'askbookie',
    title: 'AskBookie_',
    description: 'Production-ready RAG API frontend for document Q&A',
    longDescription:
      'A production-grade frontend for a Retrieval-Augmented Generation (RAG) pipeline. Users upload documents and interact with them via a conversational interface powered by a custom backend API.',
    imageSrc: projectAskbookie,
    tags: ['Next.js', 'RAG', 'AI', 'TypeScript', 'FastAPI'],
    live: 'https://askbookie.vercel.app',
  },
  {
    id: 'contour-flow',
    title: 'Contour Flow Demo',
    description: 'Interactive animated topographic contour flow visualization',
    longDescription:
      'An interactive WebGL-based animation showcasing flowing topographic contour lines. Built as a creative coding experiment exploring generative art with real-time shader effects and smooth gradient transitions.',
    imageSrc: projectContour,
    tags: ['WebGL', 'Canvas', 'Shaders', 'Creative Coding'],
  },
  {
    id: 'smart-chef',
    title: 'Smart Chef',
    description: 'In-memory Vector Space Model using TF-IDF',
    longDescription:
      'A recipe recommendation engine built entirely in-memory using a Vector Space Model and TF-IDF scoring. Enter ingredients you have on hand and the system ranks recipes by relevance using cosine similarity.',
    imageSrc: projectSmartchef,
    tags: ['Python', 'TF-IDF', 'NLP', 'VSM'],
    github: 'https://github.com/Thanas-R/Smart-Chef',
  },
  {
    id: 'thanas-os',
    title: 'ThanasOS',
    description: 'macOS-themed interactive portfolio',
    longDescription:
      'An earlier iteration of my portfolio, styled as a full macOS desktop environment in the browser. Features a working dock, draggable windows, a simulated Finder, and interactive apps.',
    imageSrc: projectThanasOS,
    tags: ['React', 'CSS', 'Framer Motion', 'Zustand'],
    live: 'https://thanasr-old.vercel.app',
  },
  {
    id: 'pesu-forge',
    title: 'PESU Forge',
    description: 'Collaborative academic resource platform for PES University',
    longDescription:
      'A community-driven platform for sharing notes, assignments, and academic resources across PES University departments.',
    imageSrc: projectPesuForge,
    tags: ['React', 'Supabase', 'Tailwind', 'TypeScript'],
    live: 'https://pesuforge.vercel.app',
  },
];

// 6 projects on homepage — scattered overlapping layout like the reference
const homeProjects = projects.filter((p) =>
  ['nautilus', 'virdis', 'pesu-mc', 'askbookie', 'thanas-os', 'smart-chef'].includes(p.id)
);

// Absolute positions for scattered overlapping 2-col, 3-row layout
// Each card: top, left, width, rotate, zIndex
const cardPositions = [
  { top: '0%', left: '0%', width: '54%', rotate: -2, zIndex: 2 },
  { top: '3%', left: '46%', width: '56%', rotate: 1.5, zIndex: 3 },
  { top: '34%', left: '-2%', width: '52%', rotate: 1.2, zIndex: 1 },
  { top: '32%', left: '48%', width: '54%', rotate: -1, zIndex: 4 },
  { top: '64%', left: '2%', width: '50%', rotate: -1.5, zIndex: 2 },
  { top: '66%', left: '50%', width: '52%', rotate: 1.8, zIndex: 3 },
];

// Preload ALL project images at module load
const preloadedImages: HTMLImageElement[] = projects.map((p) => {
  const img = new Image();
  img.src = p.imageSrc;
  return img;
});
void preloadedImages;

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative py-20 overflow-hidden">
      {/* Header container (centered). Dots are intentionally NOT covering this */}
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-end justify-between mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground font-['Space_Grotesk'] tracking-tight">
              Projects
            </h2>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* FULL-WIDTH dotted area that starts AFTER the header.
          It spans edge-to-edge, but the visible cards/content will be centered inside the max-w container below.
      */}
      <div className="w-full relative">
        {/* dotted background spans full width of page but is placed in this block so it doesn't cover the header */}
        <div className="absolute inset-0 dotted-bg pointer-events-none z-0" />

        {/* content centered above dots */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-6">
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            {/* MOBILE: stacked card layout */}
            <div className="md:hidden flex flex-col gap-6">
              {homeProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="block group"
                  aria-label={`View ${project.title} project`}
                >
                  <div className="rounded-2xl overflow-hidden bg-card border border-foreground/10 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={project.imageSrc}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="eager"
                        draggable={false}
                      />
                    </div>

                    {/* Mobile "chin": only project NAME, using Quicksand */}
                    <div className="p-4">
                      <p className="text-sm font-medium text-foreground font-['Quicksand']">
                        {project.title}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* DESKTOP: scattered overlapping layout (keeps centered) */}
            <div
              className="hidden md:block relative w-full"
              style={{ height: 'clamp(680px, 90vw, 960px)' }}
            >
              {homeProjects.map((project, i) => {
                const pos = cardPositions[i];
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 40, rotate: 0 }}
                    whileInView={{ opacity: 1, y: 0, rotate: pos.rotate }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="absolute"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      width: pos.width,
                      zIndex: pos.zIndex,
                    }}
                  >
                    <Link
                      to={`/projects/${project.id}`}
                      className="block group"
                      aria-label={`View ${project.title} project`}
                    >
                      <div className="rounded-2xl overflow-hidden bg-card border border-foreground/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.03]">
                        <div className="aspect-[16/10] overflow-hidden">
                          <img
                            src={project.imageSrc}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="eager"
                            draggable={false}
                          />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
