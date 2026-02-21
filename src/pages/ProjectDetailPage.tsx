import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import GridBackground from '@/components/GridBackground';
import Navbar from '@/components/Navbar';
import { projects } from '@/components/ProjectsSection';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: 'easeOut' as const },
});

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

        {/* Hero */}
        <div className="relative w-full overflow-hidden" style={{ height: '60vh', minHeight: 380 }}>
          <img
            src={project.imageSrc}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-6 pb-24 -mt-32 relative z-10">
          <motion.div {...fadeUp(0)}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              All Projects
            </Link>
          </motion.div>

          <motion.div {...fadeUp(0.08)} className="mb-8">
            <h1
              className="text-5xl md:text-7xl font-black text-foreground leading-none tracking-tight mb-4 uppercase"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {project.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              {project.description}
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.15)} className="flex gap-3 mb-10">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-85 transition-opacity"
              >
                <ExternalLink className="w-4 h-4" />
                Live Site
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-foreground/20 text-foreground text-sm font-semibold hover:bg-foreground hover:text-background transition-all"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="flex flex-wrap gap-2 mb-14">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full border border-foreground/10 text-muted-foreground font-medium uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div {...fadeUp(0.25)} className="grid md:grid-cols-2 gap-6 border-t border-foreground/10 pt-10 mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Stack</p>
              <p className="text-foreground/80 text-sm leading-relaxed">
                {project.tags.join(', ')}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Type</p>
              <p className="text-foreground/80 text-sm">Personal Project</p>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.3)} className="mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5">
              About this project
            </h2>
            <p
              className="text-xl md:text-2xl leading-relaxed text-foreground/80"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              {project.longDescription}
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.35)} className="mb-16 rounded-2xl overflow-hidden border border-foreground/10">
            <img
              src={project.imageSrc}
              alt={`${project.title} preview`}
              className="w-full object-cover"
              style={{ maxHeight: 480 }}
            />
          </motion.div>

          <motion.div {...fadeUp(0.4)} className="border-t border-foreground/10 pt-8 grid grid-cols-2 gap-4">
            {prevProject ? (
              <Link
                to={`/projects/${prevProject.id}`}
                className="group flex flex-col gap-1 p-5 rounded-xl border border-foreground/10 hover:border-foreground/25 transition-colors"
              >
                <span className="text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" /> Previous
                </span>
                <span className="text-sm font-bold text-foreground font-['Space_Grotesk'] group-hover:translate-x-0.5 transition-transform">
                  {prevProject.title}
                </span>
              </Link>
            ) : <div />}

            {nextProject ? (
              <Link
                to={`/projects/${nextProject.id}`}
                className="group flex flex-col gap-1 p-5 rounded-xl border border-foreground/10 hover:border-foreground/25 transition-colors text-right ml-auto w-full"
              >
                <span className="text-xs text-muted-foreground uppercase tracking-widest flex items-center justify-end gap-1">
                  Next <ArrowRight className="w-3 h-3" />
                </span>
                <span className="text-sm font-bold text-foreground font-['Space_Grotesk'] group-hover:-translate-x-0.5 transition-transform">
                  {nextProject.title}
                </span>
              </Link>
            ) : <div />}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailPage;
