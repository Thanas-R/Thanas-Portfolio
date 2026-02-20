import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import GridBackground from '@/components/GridBackground';
import Navbar from '@/components/Navbar';
import { projects } from '@/components/ProjectsSection';

const upcoming = [
  { title: 'Nautilus', description: 'Under active development.' },
  { title: 'Virdis', description: 'Under active development.' },
];

const ProjectsPage = () => {
  return (
    <>
      <GridBackground />
      <div className="relative z-10 min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
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
              <span className="text-2xl md:text-4xl font-bold text-muted-foreground/40 font-['Space_Grotesk']">
                {projects.length}
              </span>
            </div>
          </motion.div>

          {/* Project list */}
          <div className="border-t border-foreground/10">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="border-b border-foreground/10"
              >
                <div className="grid md:grid-cols-[1fr_300px] gap-6 items-start py-6 group">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <Link
                        to={`/projects/${project.id}`}
                        className="text-xl md:text-2xl font-bold text-foreground font-['Space_Grotesk'] hover:translate-x-1 transition-transform inline-block"
                      >
                        → {project.title}
                      </Link>
                      <div className="flex gap-3 mt-1 ml-4 flex-shrink-0">
                        {project.live && (
                          <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    {project.role && (
                      <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">{project.role}</p>
                    )}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {project.longDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 items-center">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full border border-foreground/10 text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                      <span className="ml-auto text-xs text-muted-foreground/40 font-mono">{project.year}</span>
                    </div>
                    <div className="mt-4">
                      <Link
                        to={`/projects/${project.id}`}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        View details <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <Link to={`/projects/${project.id}`}>
                      <div className="rounded-xl overflow-hidden border border-foreground/10 aspect-video hover:border-foreground/25 transition-colors">
                        <img
                          src={project.imageSrc}
                          alt={`${project.title} preview`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          loading="eager"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Upcoming — moved to bottom */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16"
          >
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">Coming Soon</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {upcoming.map((project) => (
                <div key={project.title} className="border border-dashed border-foreground/10 rounded-xl p-5">
                  <h4 className="text-base font-semibold text-foreground/50 font-['Space_Grotesk']">{project.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
