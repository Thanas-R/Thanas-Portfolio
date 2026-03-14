import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const PageLoader = () => {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const startTime = useRef(Date.now());

  useEffect(() => {
    let cancelled = false;

    const finish = () => {
      if (cancelled) return;
      setProgress(100);
      setTimeout(() => {
        if (!cancelled) setDone(true);
      }, 150);
    };

    const checkProgress = () => {
      if (cancelled) return;
      const elapsed = Date.now() - startTime.current;
      // Fast ramp: reach 80% by 300ms, 95% by 600ms
      const timeProgress = Math.min((elapsed / 300) * 80, 95);
      const images = Array.from(document.images);
      const totalImages = images.length || 1;
      const loadedImages = images.filter(img => img.complete && img.naturalHeight > 0).length;
      const imgProgress = (loadedImages / totalImages) * 100;
      const realProgress = Math.min(Math.max(timeProgress, imgProgress * 0.9), 95);
      setProgress(Math.round(realProgress));
    };

    const progressInterval = setInterval(checkProgress, 30);

    const onReady = () => {
      clearInterval(progressInterval);
      const elapsed = Date.now() - startTime.current;
      const remaining = Math.max(0, 250 - elapsed);
      setTimeout(finish, remaining);
    };

    if (document.readyState === 'complete') {
      onReady();
    } else {
      window.addEventListener('load', onReady);
    }

    // Fallback: never block more than 1.5s
    const fallback = setTimeout(() => {
      clearInterval(progressInterval);
      finish();
    }, 1500);

    return () => {
      cancelled = true;
      clearInterval(progressInterval);
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
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
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
                transition={{ duration: 0.1, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
