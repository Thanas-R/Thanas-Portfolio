import { motion, type Variants } from 'framer-motion';
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

// Scattered card config for desktop (2-col overlapping album style)
// rotate, x offset %, y offset px, zIndex
const scatterConfig = [
  { rotate: -6, xOff: '-8%', yOff: 0, z: 3 },
  { rotate: 4, xOff: '8%', yOff: 20, z: 2 },
  { rotate: 3, xOff: '-4%', yOff: -10, z: 4 },
  { rotate: -5, xOff: '6%', yOff: 30, z: 1 },
  { rotate: -3, xOff: '-6%', yOff: 0, z: 5 },
  { rotate: 7, xOff: '10%', yOff: 15, z: 2 },
];

const cardVariants: Variants = {
  initial: { opacity: 0, y: 50, rotate: 0 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: scatterConfig[i].rotate,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 14,
      delay: i * 0.12,
    },
  }),
};

const getProjectLink = (project: Project) => project.live || project.github || `/projects/${project.id}`;
const isExternal = (project: Project) => !!(project.live || project.github);

const ProjectCard = ({ project, index, isMobile }: { project: Project; index: number; isMobile: boolean }) => {
  const link = getProjectLink(project);
  const external = isExternal(project);

  if (isMobile) {
    // Simple tile on mobile
    const linkProps = external
      ? { as: 'a' as const, href: link, target: '_blank', rel: 'noopener noreferrer' }
      : {};

    const Wrapper = external ? 'a' : Link;
    const wrapperProps = external
      ? { href: link, target: '_blank', rel: 'noopener noreferrer' }
      : { to: `/projects/${project.id}` };

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
      >
        {/* @ts-ignore */}
        <Wrapper {...wrapperProps} className="block group">
          <div className="rounded-xl overflow-hidden bg-card border border-foreground/10 shadow-lg">
            <div className="aspect-[16/10] overflow-hidden relative">
              <img
                src={project.imageSrc}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="eager"
                draggable={false}
              />
              {/* Title overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 pt-8">
                <p className="text-white text-sm font-semibold font-['Space_Grotesk']">
                  {project.title}
                </p>
              </div>
            </div>
          </div>
        </Wrapper>
      </motion.div>
    );
  }

  // Desktop: scattered album card
  const scatter = scatterConfig[index];

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{
        rotate: 0,
        y: -8,
        scale: 1.04,
        zIndex: 50,
        transition: { type: 'spring', stiffness: 200, damping: 15 },
      }}
      style={{
        zIndex: scatter.z,
        marginLeft: scatter.xOff,
        marginTop: scatter.yOff,
      }}
      className="cursor-pointer"
    >
      {external ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="block group">
          <CardInner project={project} />
        </a>
      ) : (
        <Link to={`/projects/${project.id}`} className="block group">
          <CardInner project={project} />
        </Link>
      )}
    </motion.div>
  );
};

const CardInner = ({ project }: { project: Project }) => (
  <div className="rounded-2xl overflow-hidden bg-card border border-foreground/10 shadow-2xl transition-shadow duration-300 group-hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.35)]">
    <div className="aspect-[16/10] overflow-hidden relative">
      <img
        src={project.imageSrc}
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        loading="eager"
        draggable={false}
      />
      {/* Title overlay on image */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent p-4 pt-10">
        <p className="text-white text-base font-semibold font-['Space_Grotesk'] drop-shadow-md">
          {project.title}
        </p>
      </div>
    </div>
  </div>
);

const ProjectsSection = () => {
  const isMobile = useIsMobile();

  return (
    <section id="projects" className="relative py-20 overflow-hidden">
      <div className="dotted-bg absolute inset-0" />
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-end justify-between mb-10">
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

          {isMobile ? (
            /* Mobile: simple 2-col grid tiles */
            <div className="grid grid-cols-2 gap-3">
              {homeProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} isMobile />
              ))}
            </div>
          ) : (
            /* Desktop: scattered album overlapping layout */
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8">
              {homeProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} isMobile={false} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
