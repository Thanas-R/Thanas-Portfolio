import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const PageLoader = () => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
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
                transition={{ duration: 1, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
