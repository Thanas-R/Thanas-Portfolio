import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
interface ProjectPageLoaderProps {
  /** Set to true once all critical assets are loaded */
  ready: boolean;
}
const ProjectPageLoader = ({ ready }: ProjectPageLoaderProps) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (ready) {
      // Small delay so exit animation plays smoothly
      const t = setTimeout(() => setShow(false), 100);
      return () => clearTimeout(t);
    }
  }, [ready]);
  // Fallback: never block more than 4s
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 4000);
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
            <motion.div
              className="h-0.5 bg-foreground/20 rounded-full overflow-hidden"
              style={{ width: 80 }}
            >
              <motion.div
                className="h-full bg-foreground rounded-full"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default ProjectPageLoader;
