import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface ProjectPageLoaderProps {
  /** Set to true once all critical assets are loaded */
  ready: boolean;
}

const ProjectPageLoader = ({ ready }: ProjectPageLoaderProps) => {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const startTime = useRef(Date.now());

  useEffect(() => {
    if (!ready) return;
    // Animate to 100% then dismiss
    setProgress(100);
    const t = setTimeout(() => setShow(false), 350);
    return () => clearTimeout(t);
  }, [ready]);

  // Simulate progress while loading
  useEffect(() => {
    if (ready) return;
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime.current;
      // Slow logarithmic ramp capped at 85%
      const p = Math.min(85, (Math.log(elapsed / 100 + 1) / Math.log(50)) * 85);
      setProgress(Math.round(p));
    }, 100);
    return () => clearInterval(interval);
  }, [ready]);

  // Fallback: never block more than 5s
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="project-loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-4"
          >
            <span
              className="text-4xl font-bold text-foreground tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              thanas.
            </span>
            <div
              className="h-0.5 bg-foreground/20 rounded-full overflow-hidden"
              style={{ width: 80 }}
            >
              <motion.div
                className="h-full bg-foreground rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectPageLoader;
