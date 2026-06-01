import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import Navbar from '@/components/Navbar';
import GridBackground from '@/components/GridBackground';
import { Project } from '@/components/ProjectsSection';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: 'easeOut' as const },
});

interface Props {
  project: Project;
  /** Headline color theme — visualised distinctly for each project */
  accent: string;
  /** Title font family */
  titleFont: string;
  /** Big title HTML (allows italics, etc.) */
  titleNode: React.ReactNode;
  /** Tagline under the title */
  tagline: string;
  /** Long-form first paragraph */
  about: string;
  /** Optional second paragraph */
  aboutMore?: string;
  features: { title: string; desc: string }[];
  techStack: { l: string; v: string }[];
}

/**
 * Shared themed detail page used by smaller projects (OdinTree, AskPESU)
 * so they look consistent with the rest of the portfolio without bespoke
 * artwork.
 */
const SimpleProjectDetail = ({
  project,
  accent,
  titleFont,
  titleNode,
  tagline,
  about,
  aboutMore,
  features,
  techStack,
}: Props) => {
  const { isDark } = useTheme();
  const textColor = isDark ? 'hsl(0 0% 65%)' : 'hsl(0 0% 40%)';
  const headingColor = isDark ? 'hsl(0 0% 96%)' : 'hsl(0 0% 10%)';
  const cardBg = isDark ? 'hsl(0 0% 6%)' : 'hsl(0 0% 97%)';
  const cardBorder = isDark ? 'hsl(0 0% 15%)' : 'hsl(0 0% 88%)';
  const labelColor = isDark ? 'hsl(0 0% 45%)' : 'hsl(0 0% 55%)';
  const font = "'Inter', sans-serif";

  return (
    <>
      <GridBackground />
      <div className="relative z-10 min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 pt-12 pb-24">
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

          <motion.div {...fadeUp(0.08)} className="mb-3">
            <h1
              className="text-6xl md:text-8xl leading-none tracking-tight"
              style={{ fontFamily: titleFont, fontWeight: 700, color: headingColor }}
            >
              {titleNode}
            </h1>
          </motion.div>

          <motion.div {...fadeUp(0.12)} className="mb-8">
            <p
              className="text-base leading-relaxed max-w-2xl"
              style={{ color: textColor, fontFamily: font }}
            >
              {tagline}
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.16)} className="flex flex-wrap gap-3 mb-12">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-85"
                style={{
                  backgroundColor: accent,
                  color: '#fff',
                  fontFamily: font,
                }}
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
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
            )}
          </motion.div>

          {/* Tags */}
          <motion.div {...fadeUp(0.18)} className="flex flex-wrap gap-2 mb-14">
            {(project.detailTags ?? project.tags).map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full font-medium uppercase tracking-wider border"
                style={{
                  borderColor: cardBorder,
                  color: textColor,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Screenshot */}
          <motion.div
            {...fadeUp(0.22)}
            className="mb-14 rounded-xl overflow-hidden border"
            style={{ borderColor: cardBorder }}
          >
            {project.live ? (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="block">
                <img src={project.imageSrc} alt={project.title} className="w-full object-cover" />
              </a>
            ) : (
              <img src={project.imageSrc} alt={project.title} className="w-full object-cover" />
            )}
          </motion.div>

          {/* About */}
          <motion.div {...fadeUp(0.24)} className="mb-14">
            <h2
              className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-4"
              style={{ color: labelColor, fontFamily: font }}
            >
              About
            </h2>
            <p
              className="text-base leading-relaxed mb-4"
              style={{ color: textColor, fontFamily: font }}
            >
              {about}
            </p>
            {aboutMore && (
              <p
                className="text-base leading-relaxed"
                style={{ color: textColor, fontFamily: font }}
              >
                {aboutMore}
              </p>
            )}
          </motion.div>

          {/* Key Features */}
          <motion.div {...fadeUp(0.28)} className="mb-14">
            <h2
              className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-5"
              style={{ color: labelColor, fontFamily: font }}
            >
              Key Features
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="p-5 rounded-xl"
                  style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}
                >
                  <h3
                    className="text-base font-semibold mb-2"
                    style={{ color: headingColor, fontFamily: font }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: textColor, fontFamily: font }}
                  >
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div {...fadeUp(0.32)}>
            <h2
              className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-5"
              style={{ color: labelColor, fontFamily: font }}
            >
              Tech Stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {techStack.map((item) => (
                <div
                  key={item.l}
                  className="p-3.5 rounded-lg"
                  style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}
                >
                  <p
                    className="text-[10px] uppercase tracking-wider mb-1"
                    style={{ color: labelColor, fontFamily: font }}
                  >
                    {item.l}
                  </p>
                  <p
                    className="text-[13px] font-medium leading-snug"
                    style={{ color: headingColor, fontFamily: font }}
                  >
                    {item.v}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SimpleProjectDetail;
