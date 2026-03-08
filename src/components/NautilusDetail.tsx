import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft, ArrowRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import Navbar from '@/components/Navbar';
import GridBackground from '@/components/GridBackground';
import { Project } from '@/components/ProjectsSection';
import NautilusFlowchart from '@/components/NautilusFlowchart';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: 'easeOut' as const },
});

interface NautilusDetailProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

const NautilusDetail = ({ project, prevProject, nextProject }: NautilusDetailProps) => {
  const { isDark } = useTheme();

  const textColor = isDark ? 'hsl(0 0% 65%)' : 'hsl(0 0% 40%)';
  const headingColor = isDark ? 'hsl(0 0% 96%)' : 'hsl(0 0% 10%)';
  const cardBg = isDark ? 'hsl(0 0% 6%)' : 'hsl(0 0% 97%)';
  const cardBorder = isDark ? 'hsl(0 0% 15%)' : 'hsl(0 0% 88%)';

  const font = "'Inter', sans-serif";

  return (
    <>
      <GridBackground />
      <div className="relative z-10 min-h-screen">
        <Navbar />
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-24">
          {/* Back link */}
          <motion.div {...fadeUp(0)}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity mb-10"
              style={{ color: textColor, fontFamily: font }}
            >
              <ArrowLeft className="w-4 h-4" />
              All Projects
            </Link>
          </motion.div>

          {/* Title — Caveat font */}
          <motion.div {...fadeUp(0.08)} className="mb-3">
            <h1
              className="text-6xl md:text-8xl leading-none"
              style={{ fontFamily: "'Caveat', cursive", fontWeight: 700, color: headingColor }}
            >
              Nautilus
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div {...fadeUp(0.12)} className="mb-8">
            <p
              className="text-sm md:text-base leading-relaxed max-w-2xl"
              style={{ color: textColor, fontFamily: font }}
            >
              An AI-powered canvas-based knowledge management and visual thinking platform.
              Nautilus generates interconnected knowledge maps, flowcharts, and concept cards
              from a simple prompt, all rendered on an infinite zoomable canvas.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div {...fadeUp(0.16)} className="flex gap-3 mb-14">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-85"
                style={{
                  backgroundColor: headingColor,
                  color: isDark ? 'hsl(0 0% 4%)' : 'hsl(0 0% 100%)',
                  fontFamily: font,
                }}
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            <a
              href={project.github || 'https://github.com/thanasR'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-semibold transition-opacity hover:opacity-75"
              style={{
                borderColor: cardBorder,
                color: headingColor,
                fontFamily: font,
              }}
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </motion.div>

          {/* React Flow Flowchart */}
          <motion.div {...fadeUp(0.2)}>
            <NautilusFlowchart isDark={isDark} />
          </motion.div>

          {/* Screenshot */}
          <motion.div {...fadeUp(0.34)} className="mt-14">
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${cardBorder}` }}>
              {project.live ? (
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  <img src={project.imageSrc} alt={`${project.title} preview`} className="w-full object-cover" style={{ maxHeight: 480 }} />
                </a>
              ) : (
                <img src={project.imageSrc} alt={`${project.title} preview`} className="w-full object-cover" style={{ maxHeight: 480 }} />
              )}
            </div>
          </motion.div>

          {/* Nav prev/next */}
          <motion.div
            {...fadeUp(0.4)}
            className="pt-8 mt-8 grid grid-cols-2 gap-4"
            style={{ borderTop: `1px solid ${cardBorder}` }}
          >
            {prevProject ? (
              <Link
                to={`/projects/${prevProject.id}`}
                className="group flex flex-col gap-1 p-5 rounded-xl transition-colors"
                style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}
              >
                <span className="text-[11px] uppercase tracking-widest flex items-center gap-1" style={{ color: textColor, fontFamily: font }}>
                  <ArrowLeft className="w-3 h-3" /> Previous
                </span>
                <span className="text-sm font-semibold group-hover:translate-x-0.5 transition-transform" style={{ color: headingColor, fontFamily: font }}>
                  {prevProject.title}
                </span>
              </Link>
            ) : <div />}
            {nextProject ? (
              <Link
                to={`/projects/${nextProject.id}`}
                className="group flex flex-col gap-1 p-5 rounded-xl transition-colors text-right ml-auto w-full"
                style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}
              >
                <span className="text-[11px] uppercase tracking-widest flex items-center justify-end gap-1" style={{ color: textColor, fontFamily: font }}>
                  Next <ArrowRight className="w-3 h-3" />
                </span>
                <span className="text-sm font-semibold group-hover:-translate-x-0.5 transition-transform" style={{ color: headingColor, fontFamily: font }}>
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

export default NautilusDetail;
