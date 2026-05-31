import { useState, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import GridBackground from '@/components/GridBackground';
import Navbar from '@/components/Navbar';
import { projectsPageList as projects } from '@/components/ProjectsSection';
import defaultPreview from '@/assets/projects-default.png';
import SEOHead from '@/components/SEOHead';

const ProjectsPage = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const activeProject = hoveredId ? projects.find((p) => p.id === hoveredId) : null;
  const previewImage = activeProject ? activeProject.imageSrc : defaultPreview;
  const previewLabel = activeProject ? activeProject.title : '';

  const fadeMaskStyle: CSSProperties = {
    WebkitMaskImage:
      'linear-gradient(to bottom, transparent 0, black 48px, black calc(100% - 48px), transparent 100%)',
    maskImage:
      'linear-gradient(to bottom, transparent 0, black 48px, black calc(100% - 48px), transparent 100%)',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  };

  return (
    <>
      <SEOHead
        title="Projects | Thanas R"
        description="Explore projects built by Thanas R - from AI tools to creative web experiences and full-stack applications."
        path="/projects"
      />
      <GridBackground />

      <div className="relative z-10 md:h-screen md:overflow-hidden overflow-x-hidden flex flex-col">
        <Navbar />

        <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full px-6 gap-6 pt-4 pb-6 md:overflow-hidden">
          {/* LEFT — preview */}
          <div className="hidden md:flex md:w-[50%] md:min-w-0 md:self-start md:pt-4">
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
                  className="text-5xl font-black text-foreground leading-none"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Projects
                </h1>
                <p className="text-muted-foreground/40 font-mono text-sm mt-1">
                  {projects.length} total
                </p>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-foreground/10 aspect-[16/10] bg-muted">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={previewImage}
                    src={previewImage}
                    alt={previewLabel || 'Projects'}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, ease: 'easeInOut' }}
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
                    <p className="text-white font-semibold text-lg leading-tight font-['Space_Grotesk']">
                      {activeProject.title}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — scrollable list */}
          <div className="flex-1 md:min-w-0 md:-mt-4 md:flex md:flex-col md:self-start">
            {/* Mobile header */}
            <div className="md:hidden mb-8">
              <h1 className="text-4xl font-black text-foreground uppercase font-['Space_Grotesk']">
                Projects <span className="text-muted-foreground/30 font-mono text-2xl">{projects.length}</span>
              </h1>
            </div>

            <div
  className="md:min-h-0 md:max-h-[550px] md:overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden md:pt-8 md:pb-2 pr-2"
  style={
    typeof window !== 'undefined' && window.innerWidth >= 768
      ? fadeMaskStyle
      : undefined
  }
>
              <div className="md:border-t border-foreground/10">
                {projects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.45, delay: i * 0.05 }}
                    className="border-b border-foreground/10 group"
                    onMouseEnter={() => setHoveredId(project.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <Link
                      to={`/projects/${project.id}`}
                      className="flex items-center justify-between py-5 gap-4 min-w-0"
                    >
                      <div className="flex items-baseline gap-4 min-w-0 flex-1">
                        <span className="text-xs text-muted-foreground/40 font-mono w-5 shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>

                        <div className="min-w-0 flex-1">
                          <p className="text-xl md:text-2xl font-bold text-foreground group-hover:translate-x-1.5 transition-transform duration-200 font-['Space_Grotesk'] whitespace-normal leading-tight">
                            {project.title}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="flex gap-2">
                          {project.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="hidden sm:block text-xs px-2 py-0.5 rounded-full border border-foreground/10 text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                    </Link>

                    {/* Mobile preview image */}
                    <div className="md:hidden pb-4">
                      <Link to={`/projects/${project.id}`}>
                        <div className="rounded-xl overflow-hidden border border-foreground/10 aspect-[16/10]">
                          <img
                            src={project.imageSrc}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            loading="eager"
                          />
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
