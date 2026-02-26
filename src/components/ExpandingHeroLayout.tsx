import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import heroBg from '@/assets/hero-bg.png';
import LightRays from '@/components/LightRays';

interface Props {
  children: React.ReactNode;
}

const ExpandingHeroLayout = ({ children }: Props) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fullyExpanded, setFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Reset state on mount
  useEffect(() => {
    setScrollProgress(0);
    setFullyExpanded(false);
  }, []);

  const handleProgress = useCallback((delta: number) => {
    setScrollProgress(prev => {
      const next = Math.min(Math.max(prev + delta, 0), 1);
      if (next >= 1 && !fullyExpanded) {
        setFullyExpanded(true);
      }
      if (next < 1 && fullyExpanded) {
        setFullyExpanded(false);
      }
      return next;
    });
  }, [fullyExpanded]);

  useEffect(() => {
    if (!isDesktop) return;

    const handleWheel = (e: WheelEvent) => {
      if (fullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setFullyExpanded(false);
        setScrollProgress(0.99);
        e.preventDefault();
      } else if (!fullyExpanded) {
        e.preventDefault();
        handleProgress(e.deltaY * 0.001);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (fullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setFullyExpanded(false);
        setScrollProgress(0.99);
        e.preventDefault();
      } else if (!fullyExpanded) {
        e.preventDefault();
        const factor = deltaY < 0 ? 0.008 : 0.005;
        handleProgress(deltaY * factor);
        setTouchStartY(touchY);
      }
    };

    const handleScroll = () => {
      if (!fullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDesktop, fullyExpanded, touchStartY, handleProgress]);

  if (!isDesktop) {
    return (
      <div className="dark" style={{ colorScheme: 'dark' }}>
        <div className="bg-[hsl(0,0%,1.5%)] text-[hsl(0,0%,96%)]">
          <LightRays />
          <div className="relative z-10">{children}</div>
        </div>
      </div>
    );
  }

  // Interpolated values
  const startWidth = 75; // vw
  const startHeight = 70; // vh
  const mediaWidth = startWidth + scrollProgress * (100 - startWidth);
  const mediaHeight = startHeight + scrollProgress * (100 - startHeight);
  const borderRad = 24 * (1 - scrollProgress);
  const bgOpacity = 1 - scrollProgress;
  const shadowStr = `0 ${25 * (1 - scrollProgress)}px ${80 * (1 - scrollProgress)}px -12px rgba(0,0,0,${0.3 * (1 - scrollProgress)})`;

  return (
    <div ref={sectionRef}>
      {/* Hero section with scroll-expand */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          minHeight: fullyExpanded ? 'auto' : '100dvh',
          height: fullyExpanded ? 'auto' : '100dvh',
        }}
      >
        {/* Background image behind the expanding box */}
        {!fullyExpanded && (
          <motion.div
            className="absolute inset-0 z-0"
            animate={{ opacity: bgOpacity }}
            transition={{ duration: 0.05 }}
          >
            <img
              src={heroBg}
              alt=""
              className="w-full h-full object-cover"
              loading="eager"
            />
          </motion.div>
        )}

        {/* Expanding inner container */}
        <div
          className="relative z-10 dark overflow-hidden"
          style={
            fullyExpanded
              ? {
                  width: '100vw',
                  minHeight: '100dvh',
                  borderRadius: 0,
                  colorScheme: 'dark',
                }
              : {
                  width: `${mediaWidth}vw`,
                  height: `${mediaHeight}vh`,
                  maxWidth: '100vw',
                  maxHeight: '100vh',
                  borderRadius: `${borderRad}px`,
                  boxShadow: shadowStr,
                  colorScheme: 'dark',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }
          }
        >
          <div
            className="absolute inset-0 w-full h-full"
            style={{ background: 'hsl(0 0% 1.5% / 0.92)' }}
          />
          <LightRays />
          <div className="relative z-10 text-[hsl(0,0%,96%)]">
            {children}
          </div>
        </div>
      </section>

      {/* Rest of page content only visible after fully expanded */}
      {fullyExpanded && (
        <div className="scroll-expand-hint absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          {/* Optional: scroll indicator */}
        </div>
      )}
    </div>
  );
};

export default ExpandingHeroLayout;
