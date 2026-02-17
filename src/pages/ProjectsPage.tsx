import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import GridBackground from '@/components/GridBackground';
import Navbar from '@/components/Navbar';

import projectPesuMC from '@/assets/project-pesumc.png';
import projectContour from '@/assets/project-contour.png';
import projectAskbookie from '@/assets/project-askbookie.png';
import projectSmartchef from '@/assets/project-smartchef.png';
import projectThanasOS from '@/assets/project-thanasOS.png';
import projectPesuforge from '@/assets/project-pesuforge.png';

const upcoming = [
  { title: 'Mega Project', description: 'Under active development. Demo, write-up and source code coming soon.' },
  { title: 'Spheal', description: 'Agentic AI trip planner. Under active development.' },
];

const projects = [
  {
    title: 'PESU Minecraft S2',
    description: 'Official website for PESU Minecraft Server – Season 2 with events, server info, and community updates.',
    live: 'https://pesu-mc.vercel.app',
    github: 'https://github.com/Thanas-R/PESU-MC-S2-Website',
    tags: ['React', 'Community'],
    preview: projectPesuMC,
  },
  {
    title: 'Contour Flow Demo',
    description: 'Lightweight animated topographic background designed for modern portfolio websites.',
    live: 'https://contour-flow-test.vercel.app/',
    github: 'https://github.com/Thanas-R/contour-flow-test',
    tags: ['Canvas', 'Animation'],
    preview: projectContour,
  },
  {
    title: 'AskBookie_',
    description: 'Production-ready RAG API frontend for document Q&A over PES University slides.',
    live: 'https://askbookie.vercel.app',
    github: 'https://github.com/dotpmm/askbookie-frontend',
    tags: ['React', 'RAG', 'Frontend'],
    role: 'Frontend Developer',
    preview: projectAskbookie,
  },
  {
    title: 'Smart Chef',
    description: 'In-memory Vector Space Model using TF-IDF and cosine similarity for recipe-based search.',
    github: 'https://github.com/Thanas-R/Smart-Chef',
    tags: ['Python', 'ML', 'NLP'],
    preview: projectSmartchef,
  },
  {
    title: 'ThanasOS',
    description: 'macOS-themed interactive portfolio that mimics desktop interactions and showcases projects.',
    live: 'https://thanasr-old.vercel.app',
    github: 'https://github.com/Thanas-R',
    tags: ['React', 'Creative'],
    preview: projectThanasOS,
  },
  {
    title: 'PESU Forge',
    description: 'AI-powered study platform that converts course notes into interactive quizzes and mini-games.',
    live: 'https://pesu-forge.vercel.app/',
    github: 'https://github.com/Thanas-R/PESU-Forge',
    tags: ['React', 'AI', 'EdTech'],
    preview: projectPesuforge,
  },
];

const ProjectsPage = () => {
  return (
    <>
      <GridBackground />
      <div className="relative z-10 min-h-screen">
        <Navbar />
        <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <div className="flex items-end justify-between">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground font-['Space_Grotesk'] tracking-tight">
                Projects
              </h1>
              <span className="text-2xl md:text-4xl font-bold text-muted-foreground font-['Space_Grotesk']">
                {projects.length}
              </span>
            </div>
          </motion.div>

          {/* Upcoming */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">Coming Soon</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {upcoming.map((project) => (
                <div
                  key={project.title}
                  className="glow-card border-dashed p-5"
                >
                  <h4 className="text-base font-semibold text-foreground/70 font-['Space_Grotesk']">{project.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-0 border-t border-foreground/10">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                className="border-b border-foreground/10 py-6 group"
              >
                <div className="grid md:grid-cols-[1fr_300px] gap-6 items-start">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h2 className="text-xl md:text-2xl font-bold text-foreground font-['Space_Grotesk']">
                        → {project.title}
                      </h2>
                      <div className="flex gap-3 mt-1">
                        {project.live && (
                          <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                          <Github className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                    {project.role && (
                      <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">{project.role}</p>
                    )}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full border border-foreground/10 text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="glow-card rounded-lg overflow-hidden aspect-video">
                      <img
                        src={project.preview}
                        alt={`${project.title} preview`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
