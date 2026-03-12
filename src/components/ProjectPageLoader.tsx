import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface ProjectPageLoaderProps {
  ready: boolean;
  minDuration?: number;
}

const ProjectPageLoader = ({ ready, minDuration = 800 }: ProjectPageLoaderProps) => {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const startTime = useRef(Date.now());
  const minElapsed = useRef(false);
  const dismissed = useRef(false);

  const dismiss = () => {
    if (dismissed.current) return;
    dismissed.current = true;
    setProgress(100);
    setTimeout(() => setShow(false), 200);
  };

  // Min duration timer
  useEffect(() => {
    const t = setTimeout(() => {
      minElapsed.current = true;
      if (ready) dismiss();
    }, minDuration);
    return () => clearTimeout(t);
  }, [minDuration, ready]);

  // Ready + min elapsed
  useEffect(() => {
    if (ready && minElapsed.current) dismiss();
  }, [ready]);

  // Progress simulation
  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => {
      if (dismissed.current) return;
      const elapsed = Date.now() - startTime.current;
      const p = Math.min(90, (elapsed / minDuration) * 85);
      setProgress(Math.round(p));
    }, 50);
    return () => clearInterval(interval);
  }, [show, minDuration]);

  // Hard fallback
  useEffect(() => {
    const t = setTimeout(() => dismiss(), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="project-loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: 'hsl(var(--background))' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex flex-col items-center gap-4">
            <span
              className="text-4xl font-bold tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'hsl(var(--foreground))' }}
            >
              thanas.
            </span>
            <div
              className="rounded-full overflow-hidden"
              style={{ width: 80, height: 2, backgroundColor: 'hsl(var(--foreground) / 0.2)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-100 ease-out"
                style={{
                  width: `${progress}%`,
                  backgroundColor: 'hsl(var(--foreground))',
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectPageLoader;
