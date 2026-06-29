import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DotGridSpotlight } from '@/components/dot-grid-spotlight';
import { useTheme } from '@/hooks/use-theme';


import projectPesuMC from '@/assets/project-pesumc.png';
import projectAskbookie from '@/assets/project-askbookie.png';
import projectSmartchef from '@/assets/project-smartchef.png';
import projectThanasOS from '@/assets/project-thanasOS.png';
import projectNautilus from '@/assets/project-nautilus.png';
import projectVirdis from '@/assets/project-virdis.png';
import projectSpheal from '@/assets/project-spheal.png';
import projectPesuForge from '@/assets/project-pesuforge.png';
import projectContour from '@/assets/project-contour.png';
import projectOdinTree from '@/assets/project-odintree.png';
import projectAskPesu from '@/assets/project-askpesu-ui.png';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageSrc: string;
  tags: string[];
  /** Optional override: tags shown only on the project detail page */
  detailTags?: string[];
  live?: string;
  github?: string;
}

/**
 * `projects` is ordered for the HOMEPAGE preview (filtered to 6).
 * The Projects PAGE uses `projectsPageList` below for a different order.
 */
export const projects: Project[] = [
  {
    id: 'nautilus',
    title: 'Nautilus',
    description: 'Neural-network knowledge graph with bi-encoder retrieval and cross-encoder re-ranking',
    longDescription:
      'Nautilus replaces linear chat with a node-based knowledge interface built on neural networking. Each prompt becomes a concept Card, vectorised through bi-encoders for retrieval and re-ranked by a cross-encoder to surface the most relevant links across multiple databases. Work in progress.',
    imageSrc: projectNautilus,
    tags: ['React', 'Canvas', 'Neural Networking', 'Vector Search', 'TypeScript', 'Graph'],
    detailTags: ['Neural Networking', 'Encoder'],
    live: 'https://nautilus-build.vercel.app',
    github: 'https://github.com/Thanas-R/Nautilus',
  },
  {
    id: 'virdis',
    title: 'Virdis',
    description: 'AI-powered farm boundary mapping & crop health analysis',
    longDescription:
      'An AI-powered platform that automatically maps farm boundaries and analyzes crop health using satellite timeseries data. Virdis processes multispectral imagery to calculate vegetation indices, detect anomalies, and provide actionable insights for precision agriculture.',
    imageSrc: projectVirdis,
    tags: ['Mapbox', 'Earth Engine', 'TypeScript', 'React', 'Supabase', 'Gemini AI', 'shadcn/ui'],
    detailTags: ['Satellite', 'Earth Engine'],
    live: 'https://virdis.vercel.app',
    github: 'https://github.com/Thanas-R/Virdis',
  },
  {
    id: 'spheal',
    title: 'Spheal',
    description: 'Smart AI travel planner with interactive map visualization',
    longDescription:
      'A smart travel planner that generates personalized, day-by-day itineraries with routes and hotel suggestions, visualized on an interactive Mapbox map. Users select their destination, trip duration, and travel preferences then the AI designs the full itinerary.',
    imageSrc: projectSpheal,
    tags: ['React', 'Mapbox', 'Gemini AI', 'TypeScript'],
    detailTags: ['Planner', 'Gemini'],
    live: 'https://spheal-worldwide.vercel.app/',
    github: 'https://github.com/Thanas-R/Spheal',
  },
  {
    id: 'pesu-mc',
    title: 'PESU Minecraft S2',
    description: 'Official website for PESU Minecraft Server – Season 2',
    longDescription:
      'A fully responsive website built to showcase and manage the PESU Minecraft Server Season 2 community. Features a live server status widget, player leaderboards, season recap, and event announcements.',
    imageSrc: projectPesuMC,
    tags: ['React', 'Tailwind', 'Vercel', 'REST API'],
    detailTags: ['Data'],
    live: 'https://pesu-mc.vercel.app',
    github: 'https://github.com/Thanas-R/PESU-MC-S2-Website',
  },
  {
    id: 'askbookie',
    title: 'AskBookie_',
    description: 'Production-ready RAG API frontend for document Q&A',
    longDescription:
      'A production-grade frontend for a Retrieval-Augmented Generation (RAG) pipeline. Users upload documents and interact with them via a conversational interface powered by a custom backend API.',
    imageSrc: projectAskbookie,
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'RAG', 'Vite'],
    detailTags: ['RAG', 'TypeScript'],
    live: 'https://ask-bookie.vercel.app',
    github: 'https://github.com/dotpmm/askbookie-frontend',
  },
  {
    id: 'contour-flow',
    title: 'Contour Flow',
    description: 'Real-time procedural topographic map generator rendered to canvas',
    longDescription:
      'A procedural topographic map animation rendered in real time on canvas using Simplex Noise and Marching Squares. No images, no SVGs, pure math.',
    imageSrc: projectContour,
    tags: ['React', 'Canvas', 'TypeScript', 'Simplex Noise', 'Creative Coding'],
    live: 'https://contour-flow.vercel.app/',
    github: 'https://github.com/Thanas-R/contour-flow',
  },
  {
    id: 'smart-chef',
    title: 'Smart Chef',
    description: 'In-memory Vector Space Model using TF-IDF',
    longDescription:
      'A recipe recommendation engine built entirely in-memory using a Vector Space Model and TF-IDF scoring. Enter ingredients you have on hand and the system ranks recipes by relevance using cosine similarity.',
    imageSrc: projectSmartchef,
    tags: ['Python', 'TF-IDF', 'VSM'],
    detailTags: ['Python', 'Vector'],
    live: 'https://smart-chef-pesu.vercel.app/',
    github: 'https://github.com/Thanas-R/Smart-Chef',
  },
  {
    id: 'thanas-os',
    title: 'ThanasOS',
    description: 'macOS-themed interactive portfolio',
    longDescription:
      'An earlier iteration of my portfolio, styled as a full macOS desktop environment in the browser. Features a working dock, draggable windows, a simulated Finder, and interactive apps.',
    imageSrc: projectThanasOS,
    tags: ['React', 'CSS', 'Framer Motion', 'ZustaYnd'],
    detailTags: ['macOS', 'Web'],
    live: 'https://thanas-os.vercel.app/',
    github: 'https://github.com/Thanas-R/thanas-OS',
  },
  {
    id: 'odin-tree',
    title: 'Odin Tree',
    description: 'Explore any GitHub repository as an interactive node-based flowchart',
    longDescription:
      'Odin Tree turns any GitHub repository into an interactive node-based flowchart. Files, functions, classes and modules become draggable, zoomable nodes connected by their real import relationships. It is built to help developers visually traverse architecture, spot bottlenecks, and learn how good codebases are organised.',
    imageSrc: projectOdinTree,
    tags: ['React', 'TypeScript', 'AST', 'Graph', 'Tree-sitter', 'GitHub API'],
    detailTags: ['GitHub', 'Analysis'],
    live: 'https://odintree.vercel.app/',
    github: 'https://github.com/Thanas-R/OdinTree',
  },
  {
    id: 'askpesu',
    title: 'AskPESU',
    description: 'RAG-powered assistant that answers questions about PES University',
    longDescription:
      'AskPESU is a RAG pipeline for question answering about PES University, built by the PESU Dev team. It works as a continuously updated knowledge base sourced from r/PESU discussions, FAQs and verified posts, helping current and prospective students get instant verified answers. I built the frontend and design.',
    imageSrc: projectAskPesu,
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'RAG', 'Python', 'FastAPI', 'Docker'],
    detailTags: ['Docker', 'Design'],
    live: 'https://huggingface.co/spaces/pesu-dev-org/askpesu',
    github: 'https://github.com/pesu-dev/ask-pesu',
  },
  {
    id: 'pesu-forge',
    title: 'PESU Forge',
    description: 'AI-powered study tool that transforms notes into interactive learning experiences',
    longDescription:
      'PESU Forge is an AI-powered study tool that transforms notes into interactive learning experiences such as flashcards, quizzes, memory games, and visual mind maps. This was my first ever project and the one that introduced me to building with AI.',
    imageSrc: projectPesuForge,
    tags: ['First Project Ever', 'React', 'TypeScript', 'Tailwind CSS', 'Gemini AI', 'Zustand'],
    live: 'https://pesuforge.vercel.app',
    github: 'https://github.com/Thanas-R/PESU-Forge',
  },
];

/** Re-ordered list used by the Projects PAGE and prev/next nav.
 *  Homepage uses the order defined in `projects` above. */
const PAGE_ORDER = [
  'nautilus',
  'virdis',
  'thanas-os',
  'askpesu',
  'odin-tree',
  'askbookie',
  'pesu-mc',
  'smart-chef',
  'contour-flow',
  'spheal',
  'pesu-forge',
];

export const projectsPageList: Project[] = PAGE_ORDER
  .map((id) => projects.find((p) => p.id === id))
  .filter((p): p is Project => Boolean(p));

// 6 projects on homepage - scattered overlapping layout like the reference
const homeProjects = projects.filter((p) =>
  ['nautilus', 'virdis', 'pesu-mc', 'askbookie', 'thanas-os', 'smart-chef'].includes(p.id)
);

// Absolute positions for scattered overlapping 2-col, 3-row layout
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
  const { isDark } = useTheme();
  return (
    <section id="projects" className="relative py-20 overflow-hidden">

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-end justify-between mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground font-['Space_Grotesk'] tracking-tight flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" className="fill-foreground"><path d="M2.165 19.551c.186.28.499.449.835.449h15c.4 0 .762-.238.919-.606l3-7A.998.998 0 0 0 21 11h-1V8c0-1.103-.897-2-2-2h-6.655L8.789 4H4c-1.103 0-2 .897-2 2v13h.007a1 1 0 0 0 .158.551zM18 8v3H6c-.4 0-.762.238-.919.606L4 14.129V8h14z"></path></svg>
              Projects
            </h2>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-base text-muted-foreground hover:text-foreground transition-colors"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="w-full relative">
        <DotGridSpotlight
          className="absolute inset-0 z-0"
          dotColor={isDark ? '#272727' : '#DCDCDC'}
          activeDotColor={isDark ? 'rgba(255,255,255,0.23)' : 'rgba(0,0,0,0.24)'}
          spacing={10}
          baseRadius={1}
          activeRadius={2}
          interactionRadius={140}
        />
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
                    <div className="p-4">
                      <p className="text-sm font-medium text-foreground font-['Quicksand']">
                        {project.title}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* DESKTOP: scattered overlapping layout */}
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
