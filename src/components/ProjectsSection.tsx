import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useRef } from 'react';

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

// 2-col scattered layout: [left, top, rotate, zIndex]
// Row 3 (smart-chef, thanas-os) moved up to overlap more
const cardLayout = [
  { left: '1%',  top: '0px',   rotate: -5,  z: 3 },
  { left: '50%', top: '40px',  rotate: 4,   z: 2 },
  { left: '2%',  top: '280px', rotate: 4,   z: 4 },
  { left: '48%', top: '260px', rotate: -3,  z: 5 },
  { left: '1%',  top: '500px', rotate: -4,  z: 2 },
  { left: '51%', top: '480px', rotate: 5,   z: 3 },
];

const ProjectsSection = () => {
  const isMobile = useIsMobile();

  return (
    <section id="projects" className="relative pt-10 pb-16 overflow-visible">
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-6"
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

        {/* Cards area with dotted bg */}
        <div className="relative">
          {/* Dotted background — full width, only behind cards */}
          <div
            className="dotted-bg absolute pointer-events-none"
            style={{
              top: '-12px',
              bottom: '-12px',
              left: 'calc(-50vw + 50%)',
              right: 'calc(-50vw + 50%)',
            }}
          />

          {isMobile ? (
            /* MOBILE: simple 2-col grid tiles */
            <motion.div
              className="relative z-10 grid grid-cols-2 gap-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {homeProjects.map((project) => (
                <Link key={project.id} to={`/projects/${project.id}`} className="block">
                  <div className="rounded-xl overflow-hidden bg-card border border-foreground/10 shadow-md">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={project.imageSrc}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        loading="eager"
                        draggable={false}
                      />
                    </div>
                    <p className="px-2.5 py-2 text-xs font-semibold text-foreground font-['Quicksand']">
                      {project.title}
                    </p>
                  </div>
                </Link>
              ))}
            </motion.div>
          ) : (
            /* DESKTOP: scattered overlapping album */
            <motion.div
              className="relative z-10"
              style={{ height: '760px' }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
            >
              {homeProjects.map((project, i) => {
                const pos = cardLayout[i];
                return (
                  <TiltCard
                    key={project.id}
                    project={project}
                    left={pos.left}
                    top={pos.top}
                    rotate={pos.rotate}
                    z={pos.z}
                  />
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

/* ── Desktop card with 3D tilt on hover ── */
const TiltCard = ({
  project,
  left,
  top,
  rotate,
  z,
}: {
  project: Project;
  left: string;
  top: string;
  rotate: number;
  z: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className="absolute cursor-pointer"
      style={{
        left,
        top,
        width: '48%',
        zIndex: z,
        perspective: 800,
        rotate,
      }}
      whileHover={{ zIndex: 50 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        <Link to={`/projects/${project.id}`} className="block group">
          <div className="rounded-2xl overflow-hidden bg-card border border-foreground/10 shadow-2xl group-hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)] transition-shadow duration-300">
            <div className="aspect-[16/10] overflow-hidden relative">
              <img
                src={project.imageSrc}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="eager"
                draggable={false}
              />
              {/* Title overlay inside image */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-4 pb-3 pt-10">
                <p className="text-white text-sm font-bold font-['Quicksand'] drop-shadow-lg">
                  {project.title}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default ProjectsSection;
