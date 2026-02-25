import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroBg from '@/assets/hero-bg.png';
import LightRays from '@/components/LightRays';

interface Props {
  children: React.ReactNode;
}

const ExpandingHeroLayout = ({ children }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const shadow = useTransform(scrollYProgress, [0, 0.8, 1], [
    '0 25px 80px -12px rgba(0,0,0,0.3)',
    '0 10px 40px -8px rgba(0,0,0,0.15)',
    'none',
  ]);

  if (!isDesktop) {
    return <>{children}</>;
  }

  return (
    <div ref={containerRef} className="relative" style={{ height: '112vh' }}>
      {/* Background image visible around the edges of the inner container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <motion.div
          style={{
            scale,
            borderRadius,
            boxShadow: shadow,
          }}
          className="absolute inset-0 bg-background overflow-hidden origin-center"
        >
          <LightRays />
          <div className="relative z-10">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExpandingHeroLayout;
