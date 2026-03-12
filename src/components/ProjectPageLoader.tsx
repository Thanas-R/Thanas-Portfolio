import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface ProjectPageLoaderProps {
  ready: boolean;
  /** Minimum display time in ms (default 1500) */
  minDuration?: number;
}

const ProjectPageLoader = ({ ready, minDuration = 1500 }: ProjectPageLoaderProps) => {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const startTime = useRef(Date.now());
  const minElapsed = useRef(false);

  // Track minimum duration
  useEffect(() => {
    const t = setTimeout(() => {
      minElapsed.current = true;
      // If assets already ready, dismiss
      if (ready) {
        setProgress(100);
        setTimeout(() => setShow(false), 350);
      }
    }, minDuration);
    return () => clearTimeout(t);
  }, [minDuration, ready]);

  // When assets are ready AND min duration passed, dismiss
  useEffect(() => {
    if (!ready) return;
    if (minElapsed.current) {
      setProgress(100);
      const t = setTimeout(() => setShow(false), 350);
      return () => clearTimeout(t);
    }
    // If not yet elapsed, the timer above will handle it
  }, [ready]);

  // Simulate progress while loading
  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime.current;
      const duration = minDuration;
      // Linear ramp to ~90% over minDuration, then slow crawl
      let p: number;
      if (elapsed < duration) {
        p = (elapsed / duration) * 88;
      } else {
        p = Math.min(95, 88 + (Math.log((elapsed - duration) / 500 + 1) / Math.log(20)) * 7);
      }
      if (ready && minElapsed.current) p = 100;
      setProgress(Math.round(p));
    }, 50);
    return () => clearInterval(interval);
  }, [show, ready, minDuration]);

  // Fallback: never block more than 6s
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 6000);
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
                transition={{ duration: 0.15, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectPageLoader;
