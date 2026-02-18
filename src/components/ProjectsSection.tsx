import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

import projectPesuMC from '@/assets/project-pesumc.png';
import projectContour from '@/assets/project-contour.png';
import projectAskbookie from '@/assets/project-askbookie.png';
import projectSmartchef from '@/assets/project-smartchef.png';
import projectThanasOS from '@/assets/project-thanasOS.png';
import projectPesuforge from '@/assets/project-pesuforge.png';

interface CardItem {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  href?: string;
}

const projects: CardItem[] = [
  { id: 1, title: 'PESU Minecraft S2', description: 'Official website for PESU Minecraft Server – Season 2', imageSrc: projectPesuMC, href: 'https://pesu-mc.vercel.app' },
  { id: 2, title: 'Contour Flow Demo', description: 'Lightweight animated topographic background', imageSrc: projectContour, href: 'https://contour-flow-test.vercel.app/' },
  { id: 3, title: 'AskBookie_', description: 'Production-ready RAG API frontend for document Q&A', imageSrc: projectAskbookie, href: 'https://askbookie.vercel.app' },
  { id: 4, title: 'Smart Chef', description: 'In-memory Vector Space Model using TF-IDF', imageSrc: projectSmartchef, href: 'https://github.com/Thanas-R/Smart-Chef' },
  { id: 5, title: 'ThanasOS', description: 'macOS-themed interactive portfolio', imageSrc: projectThanasOS, href: 'https://thanasr-old.vercel.app' },
  { id: 6, title: 'PESU Forge', description: 'AI-powered study platform for interactive quizzes', imageSrc: projectPesuforge, href: 'https://pesu-forge.vercel.app/' },
];

// Preload all project images
projects.forEach((p) => {
  const img = new Image();
  img.src = p.imageSrc;
});

const ProjectsSection = () => {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const maxOffset = 2;

  const next = useCallback(() => setActive((a) => (a + 1) % projects.length), []);

  // Auto-advance every 3.5s, pause on hover
  useEffect(() => {
    if (hovering) return;
    const id = setInterval(next, 3500);
    return () => clearInterval(id);
  }, [hovering, next]);

  const prev = () => setActive((a) => (a - 1 + projects.length) % projects.length);

  return (
    <section id="projects" className="relative px-6 py-12 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground font-['Space_Grotesk'] tracking-tight">
              Projects
            </h2>
          </div>

          {/* Card Stack */}
          <div
            className="relative w-full flex items-end justify-center h-[220px] sm:h-[280px] md:h-[320px]"
            style={{ perspective: 1100 }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <AnimatePresence initial={false}>
              {projects.map((item, i) => {
                const raw = i - active;
                const alt = raw > 0 ? raw - projects.length : raw + projects.length;
                const off = Math.abs(alt) < Math.abs(raw) ? alt : raw;
                const abs = Math.abs(off);
                if (abs > maxOffset) return null;

                const isActive = off === 0;
                const isMobile = window.innerWidth < 640;
                const isTablet = window.innerWidth < 1024 && !isMobile;
                const cardWidth = isMobile ? 240 : isTablet ? 320 : 400;
                const spacing = cardWidth * 0.48;
                const x = off * spacing;
                const rotateZ = off * 18;
                const y = abs * 10;
                const scale = isActive ? 1.03 : 0.92;

                return (
                  <motion.div
                    key={item.id}
                    className={`absolute bottom-0 rounded-2xl border border-foreground/10 overflow-hidden shadow-xl cursor-pointer select-none ${isActive ? 'z-30' : abs === 1 ? 'z-20' : 'z-10'}`}
                    style={{ width: cardWidth, height: isMobile ? 170 : isTablet ? 210 : 250, transformStyle: 'preserve-3d' }}
                    animate={{ x, y: y + (isActive ? -20 : 0), rotateZ, scale, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                    onClick={() => {
                      if (isActive && item.href) {
                        window.open(item.href, '_blank');
                      } else {
                        setActive(i);
                      }
                    }}
                  >
                    <div className="relative h-full w-full">
                      <img src={item.imageSrc} alt={item.title} className="h-full w-full object-cover" draggable={false} loading="eager" />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold text-white truncate">{item.title}</span>
                          {isActive && item.href && <ExternalLink className="w-3.5 h-3.5 text-white/70" />}
                        </div>
                        <p className="mt-1 text-sm text-white/80 line-clamp-1">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <button onClick={prev} className="text-muted-foreground hover:text-foreground transition-colors p-1">
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                className={`h-2 w-2 rounded-full transition ${idx === active ? 'bg-foreground' : 'bg-foreground/30 hover:bg-foreground/50'}`}
              />
            ))}
            <button onClick={() => next()} className="text-muted-foreground hover:text-foreground transition-colors p-1">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-foreground/20 text-foreground text-sm font-medium hover:bg-foreground hover:text-background transition-all duration-300"
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
