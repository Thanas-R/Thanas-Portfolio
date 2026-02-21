import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import GridBackground from '@/components/GridBackground';
import Navbar from '@/components/Navbar';
import { projects } from '@/components/ProjectsSection';
import defaultPreview from '@/assets/projects-default.png';

const ProjectsPage = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const activeProject = hoveredId ? projects.find((p) => p.id === hoveredId) : null;
  const previewImage = activeProject ? activeProject.imageSrc : defaultPreview;
  const previewLabel = activeProject ? activeProject.title : '';

  return (
    <>
      <GridBackground />
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col md:flex-row max-w-6xl mx-auto w-full px-6 gap-8 pt-4 pb-[40px]">

          {/* LEFT — sticky image preview */}
          <div className="hidden md:flex md:w-[50%] md:sticky md:top-24 md:self-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                  Thanas R
                </p>
                <h1
                  className="text-5xl font-black text-foreground uppercase leading-none"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Projects
                </h1>
                <p className="text-muted-foreground/40 font-mono text-sm mt-1">{projects.length} total</p>
              </div>

              {/* Preview image */}
              <div className="relative rounded-2xl overflow-hidden border border-foreground/10 aspect-[16/10] bg-muted">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={previewImage}
                    src={previewImage}
                    alt={previewLabel || 'Projects'}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  />
                </AnimatePresence>
                {activeProject && (
                  <motion.div
                    className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/70 to-transparent"
                    key={activeProject.id + '-label'}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                  >
                    <p className="text-white font-semibold text-lg leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{activeProject.title}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — scrollable list */}
          <div className="flex-1 md:pt-2">
            {/* Mobile header */}
            <div className="md:hidden mb-8">
              <h1 className="text-4xl font-black text-foreground uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Projects <span className="text-muted-foreground/30 font-mono text-2xl">{projects.length}</span>
              </h1>
            </div>

            <div className="border-t border-foreground/10">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="border-b border-foreground/10 group"
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <Link to={`/projects/${project.id}`} className="flex items-center justify-between py-5 gap-4">
                    <div className="flex items-baseline gap-4 min-w-0">
                      <span className="text-xs text-muted-foreground/40 font-mono w-5 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <p
                          className="text-xl md:text-2xl font-bold text-foreground group-hover:translate-x-1.5 transition-transform duration-200 truncate"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {project.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex gap-2">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="hidden sm:block text-xs px-2 py-0.5 rounded-full border border-foreground/10 text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </Link>

                  {/* Mobile preview image */}
                  <div className="md:hidden pb-4">
                    <div className="rounded-xl overflow-hidden border border-foreground/10 aspect-video">
                      <img
                        src={project.imageSrc}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Upcoming */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-16"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Coming Soon</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: 'More projects', description: 'Under active development.' },
                ].map((p) => (
                  <div key={p.title} className="rounded-xl border border-foreground/10 p-4">
                    <p className="font-bold text-foreground font-['Space_Grotesk']">{p.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{p.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
