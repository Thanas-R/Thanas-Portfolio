import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
    longDescription: 'A canvas-based AI knowledge tool that lets users create interconnected mindmaps, flowcharts, and auto-linked concept cards forming dynamic knowledge graphs. Powered by AI, Nautilus automatically identifies relationships between concepts, generates summaries, and builds visual representations of complex topics.',
    imageSrc: projectNautilus,
    tags: ['React', 'Canvas', 'AI', 'TypeScript', 'Graph'],
    live: 'https://nautilus-build.vercel.app',
  },
  {
    id: 'virdis',
    title: 'Virdis',
    description: 'AI-powered farm boundary mapping & crop health analysis',
    longDescription: 'An AI-powered platform that automatically maps farm boundaries and analyzes crop health using satellite timeseries data. Virdis processes multispectral imagery to calculate vegetation indices, detect anomalies, and provide actionable insights for precision agriculture.',
    imageSrc: projectVirdis,
    tags: ['React', 'Mapbox', 'Python', 'Satellite', 'AI'],
    live: 'https://virdis.vercel.app',
  },
  {
    id: 'spheal',
    title: 'Spheal',
    description: 'Smart AI travel planner with interactive map visualization',
    longDescription: 'A smart travel planner that generates personalized, day-by-day itineraries with routes and hotel suggestions, visualized on an interactive Mapbox map. Users select their destination, trip duration, and travel preferences — then the AI designs the full itinerary.',
    imageSrc: projectSpheal,
    tags: ['React', 'Mapbox', 'AI', 'TypeScript'],
    live: 'https://spheal.vercel.app',
  },
  {
    id: 'pesu-mc',
    title: 'PESU Minecraft S2',
    description: 'Official website for PESU Minecraft Server – Season 2',
    longDescription: 'A fully responsive website built to showcase and manage the PESU Minecraft Server Season 2 community. Features a live server status widget, player leaderboards, season recap, and event announcements.',
    imageSrc: projectPesuMC,
    tags: ['React', 'Tailwind', 'Vercel', 'REST API'],
    live: 'https://pesu-mc.vercel.app',
  },
  {
    id: 'askbookie',
    title: 'AskBookie_',
    description: 'Production-ready RAG API frontend for document Q&A',
    longDescription: 'A production-grade frontend for a Retrieval-Augmented Generation (RAG) pipeline. Users upload documents and interact with them via a conversational interface powered by a custom backend API.',
    imageSrc: projectAskbookie,
    tags: ['Next.js', 'RAG', 'AI', 'TypeScript', 'FastAPI'],
    live: 'https://askbookie.vercel.app',
  },
  {
    id: 'contour-flow',
    title: 'Contour Flow Demo',
    description: 'Interactive animated topographic contour flow visualization',
    longDescription: 'An interactive WebGL-based animation showcasing flowing topographic contour lines. Built as a creative coding experiment exploring generative art with real-time shader effects and smooth gradient transitions.',
    imageSrc: projectContour,
    tags: ['WebGL', 'Canvas', 'Shaders', 'Creative Coding'],
  },
  {
    id: 'smart-chef',
    title: 'Smart Chef',
    description: 'In-memory Vector Space Model using TF-IDF',
    longDescription: 'A recipe recommendation engine built entirely in-memory using a Vector Space Model and TF-IDF scoring. Enter ingredients you have on hand and the system ranks recipes by relevance using cosine similarity.',
    imageSrc: projectSmartchef,
    tags: ['Python', 'TF-IDF', 'NLP', 'VSM'],
    github: 'https://github.com/Thanas-R/Smart-Chef',
  },
  {
    id: 'thanas-os',
    title: 'ThanasOS',
    description: 'macOS-themed interactive portfolio',
    longDescription: 'An earlier iteration of my portfolio, styled as a full macOS desktop environment in the browser. Features a working dock, draggable windows, a simulated Finder, and interactive apps.',
    imageSrc: projectThanasOS,
    tags: ['React', 'CSS', 'Framer Motion', 'Zustand'],
    live: 'https://thanasr-old.vercel.app',
  },
  {
    id: 'pesu-forge',
    title: 'PESU Forge',
    description: 'Collaborative academic resource platform for PES University',
    longDescription: 'A community-driven platform for sharing notes, assignments, and academic resources across PES University departments.',
    imageSrc: projectPesuForge,
    tags: ['React', 'Supabase', 'Tailwind', 'TypeScript'],
    live: 'https://pesuforge.vercel.app',
  },
];

const homeProjects = projects.filter(p =>
  ['nautilus', 'virdis', 'pesu-mc', 'askbookie', 'thanas-os', 'smart-chef'].includes(p.id)
);

// Preload images
const preloadedImages: HTMLImageElement[] = projects.map((p) => {
  const img = new Image();
  img.src = p.imageSrc;
  return img;
});
void preloadedImages;

// Scattered positions for the 6 cards in absolute layout (2 per row, 3 rows)
// Each card is ~48% wide. We offset x/y and rotate for the album overlap feel.
// Cards overlap vertically between rows.
const cardLayout = [
  // Row 1
  { left: '1%',  top: '0px',   rotate: -6,  z: 3 },
  { left: '48%', top: '30px',  rotate: 4,   z: 2 },
  // Row 2
  { left: '3%',  top: '260px', rotate: 5,   z: 4 },
  { left: '46%', top: '240px', rotate: -4,  z: 5 },
  // Row 3
  { left: '0%',  top: '490px', rotate: -3,  z: 2 },
  { left: '50%', top: '510px', rotate: 6,   z: 3 },
];

const getProjectLink = (project: Project) => project.live || project.github || `/projects/${project.id}`;
const isExternal = (project: Project) => !!(project.live || project.github);

const ProjectsSection = () => {
  const isMobile = useIsMobile();

  return (
    <section id="projects" className="relative py-16 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header — outside dotted bg */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <div className="flex items-end justify-between">
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

        {/* Cards area — dotted bg wraps only this */}
        <div className="relative">
          {/* Dotted background — only behind cards */}
          <div className="dotted-bg absolute inset-0 -mx-6 rounded-2xl" style={{ top: '-16px', bottom: '-16px' }} />

          {isMobile ? (
            /* ── MOBILE: simple single-column tiles, no effects ── */
            <div className="relative z-10 flex flex-col gap-4">
              {homeProjects.map((project, i) => {
                const link = getProjectLink(project);
                const ext = isExternal(project);
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    {ext ? (
                      <a href={link} target="_blank" rel="noopener noreferrer" className="block">
                        <MobileCard project={project} />
                      </a>
                    ) : (
                      <Link to={`/projects/${project.id}`} className="block">
                        <MobileCard project={project} />
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* ── DESKTOP: scattered overlapping album ── */
            <div className="relative z-10" style={{ height: '780px' }}>
              {homeProjects.map((project, i) => {
                const pos = cardLayout[i];
                const link = getProjectLink(project);
                const ext = isExternal(project);

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50, rotate: 0 }}
                    whileInView={{ opacity: 1, y: 0, rotate: pos.rotate }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      type: 'spring',
                      stiffness: 110,
                      damping: 14,
                      delay: i * 0.1,
                    }}
                    whileHover={{
                      rotate: 0,
                      scale: 1.05,
                      zIndex: 50,
                      transition: { type: 'spring', stiffness: 200, damping: 15 },
                    }}
                    className="absolute cursor-pointer"
                    style={{
                      left: pos.left,
                      top: pos.top,
                      width: '48%',
                      zIndex: pos.z,
                    }}
                  >
                    {ext ? (
                      <a href={link} target="_blank" rel="noopener noreferrer" className="block group">
                        <DesktopCard project={project} />
                      </a>
                    ) : (
                      <Link to={`/projects/${project.id}`} className="block group">
                        <DesktopCard project={project} />
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/* ── Desktop album card ── */
const DesktopCard = ({ project }: { project: Project }) => (
  <div className="rounded-2xl overflow-hidden bg-card border border-foreground/10 shadow-2xl group-hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.4)] transition-shadow duration-300">
    <div className="aspect-[16/10] overflow-hidden relative">
      <img
        src={project.imageSrc}
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        loading="eager"
        draggable={false}
      />
      {/* Title inside image */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent px-4 pb-3 pt-10">
        <p className="text-white text-sm font-bold font-['Space_Grotesk'] drop-shadow-lg">
          {project.title}
        </p>
      </div>
    </div>
  </div>
);

/* ── Mobile simple card ── */
const MobileCard = ({ project }: { project: Project }) => (
  <div className="rounded-xl overflow-hidden bg-card border border-foreground/10 shadow-md">
    <div className="aspect-[16/10] overflow-hidden relative">
      <img
        src={project.imageSrc}
        alt={project.title}
        className="w-full h-full object-cover"
        loading="eager"
        draggable={false}
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent px-3 pb-2.5 pt-8">
        <p className="text-white text-sm font-semibold font-['Space_Grotesk']">
          {project.title}
        </p>
      </div>
    </div>
  </div>
);

export default ProjectsSection;
