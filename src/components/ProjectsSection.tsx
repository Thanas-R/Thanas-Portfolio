import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
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

// Preload
projects.forEach((p) => { const img = new Image(); img.src = p.imageSrc; });

const ProjectsSection = () => {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  const next = useCallback(() => setActive((a) => (a + 1) % projects.length), []);

  useEffect(() => {
    if (hovering) return;
    const id = setInterval(next, 3500);
    return () => clearInterval(id);
  }, [hovering, next]);

  // Fan-out card positions like the Pallet Ross reference
  const getCardStyle = (index: number) => {
    const total = projects.length;
    const mid = (total - 1) / 2;
    const offset = index - mid;
    const isActive = index === active;

    // Spread cards in a fan from center
    const rotate = offset * 8;
    const x = offset * 85;
    const y = Math.abs(offset) * 18;
    const scale = isActive ? 1.08 : 0.95 - Math.abs(offset) * 0.02;
    const zIndex = total - Math.abs(Math.round(offset));

    return {
      transform: `translateX(${x}px) translateY(${y}px) rotate(${rotate}deg) scale(${scale})`,
      zIndex: isActive ? 50 : zIndex,
      transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0, 1)',
    };
  };

  return (
    <section id="projects" className="relative px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground font-['Space_Grotesk'] tracking-tight text-center mb-4">
            Projects
          </h2>
          <p className="text-center text-muted-foreground text-sm mb-12 max-w-md mx-auto">
            A collection of things I've built and shipped.
          </p>

          {/* Fan-out card stack */}
          <div
            className="relative w-full flex items-center justify-center mx-auto"
            style={{ height: 340, perspective: 1200 }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {projects.map((item, i) => (
              <div
                key={item.id}
                className="absolute cursor-pointer rounded-2xl overflow-hidden shadow-lg border border-border/50 hover:shadow-2xl"
                style={{
                  width: 220,
                  height: 280,
                  ...getCardStyle(i),
                }}
                onClick={() => {
                  if (i === active && item.href) {
                    window.open(item.href, '_blank');
                  } else {
                    setActive(i);
                  }
                }}
              >
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  draggable={false}
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-sm font-semibold text-white truncate block">{item.title}</span>
                  <p className="text-xs text-white/70 line-clamp-1 mt-0.5">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === active ? 'w-6 bg-foreground' : 'w-1.5 bg-foreground/25 hover:bg-foreground/40'
                }`}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
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
