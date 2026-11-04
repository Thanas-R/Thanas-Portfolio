import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import SymmetricWave from '@/components/ui/symmetric-wave';

const PageLoader = () => {
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  useEffect(() => {
    let cancelled = false;

    const finish = () => {
      if (!cancelled) setDone(true);
    };

    const onReady = () => {
      const elapsed = Date.now() - startTime.current;
      // Give the wave a moment to be seen, but never stall on it
      const remaining = Math.max(0, 500 - elapsed);
      setTimeout(finish, remaining);
    };

    if (document.readyState === 'complete') {
      onReady();
    } else {
      window.addEventListener('load', onReady);
    }

    // Fallback: never block more than 1.8s
    const fallback = setTimeout(finish, 1800);

    return () => {
      cancelled = true;
      clearTimeout(fallback);
      window.removeEventListener('load', onReady);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center gap-6"
          >
            <span
              className="text-4xl font-bold text-foreground tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              thanas.
            </span>
            <SymmetricWave />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
