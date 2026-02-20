import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import GridBackground from '@/components/GridBackground';
import Navbar from '@/components/Navbar';
import { projects } from '@/components/ProjectsSection';

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.id === slug);

  if (!project) return <Navigate to="/projects" replace />;

  const currentIndex = projects.findIndex((p) => p.id === slug);
  const prevProject = projects[currentIndex - 1] ?? null;
  const nextProject = projects[currentIndex + 1] ?? null;

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
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              All Projects
            </Link>

            {/* Hero image */}
            <div className="rounded-2xl overflow-hidden border border-foreground/10 mb-10 aspect-video">
              <img
                src={project.imageSrc}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  {project.year} {project.role ? `· ${project.role}` : ''}
                </p>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground font-['Space_Grotesk'] tracking-tight">
                  {project.title}
                </h1>
                <p className="mt-3 text-lg text-muted-foreground">{project.description}</p>
              </div>
              <div className="flex gap-3 flex-shrink-0 pt-1">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-foreground/20 text-foreground text-sm font-medium hover:bg-foreground hover:text-background transition-all"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 rounded-full border border-foreground/10 text-muted-foreground font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="border-t border-foreground/10 pt-8 mb-16">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                About this project
              </h2>
              <p className="text-base text-foreground/80 leading-relaxed text-lg">
                {project.longDescription}
              </p>
            </div>

            {/* Prev / Next navigation */}
            <div className="border-t border-foreground/10 pt-8 grid grid-cols-2 gap-4">
              {prevProject ? (
                <Link
                  to={`/projects/${prevProject.id}`}
                  className="group flex flex-col gap-1 p-4 rounded-xl border border-foreground/10 hover:border-foreground/25 transition-colors"
                >
                  <span className="text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3" /> Previous
                  </span>
                  <span className="text-sm font-semibold text-foreground font-['Space_Grotesk'] group-hover:translate-x-1 transition-transform">
                    {prevProject.title}
                  </span>
                </Link>
              ) : <div />}

              {nextProject ? (
                <Link
                  to={`/projects/${nextProject.id}`}
                  className="group flex flex-col gap-1 p-4 rounded-xl border border-foreground/10 hover:border-foreground/25 transition-colors text-right ml-auto w-full"
                >
                  <span className="text-xs text-muted-foreground uppercase tracking-widest flex items-center justify-end gap-1">
                    Next <ArrowLeft className="w-3 h-3 rotate-180" />
                  </span>
                  <span className="text-sm font-semibold text-foreground font-['Space_Grotesk'] group-hover:-translate-x-1 transition-transform">
                    {nextProject.title}
                  </span>
                </Link>
              ) : <div />}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailPage;
