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
      }, 300);
    };

    // Track real loading progress
    const checkProgress = () => {
      if (cancelled) return;
      const elapsed = Date.now() - startTime.current;
      
      // Check images loaded
      const images = Array.from(document.images);
      const totalImages = images.length || 1;
      const loadedImages = images.filter(img => img.complete && img.naturalHeight > 0).length;
      const imgProgress = (loadedImages / totalImages) * 100;
      
      // Blend with time-based progress (slow ramp)
      const timeProgress = Math.min(elapsed / 50, 70); // max 70% from time
      const realProgress = Math.min(Math.max(timeProgress, imgProgress * 0.9), 95);
      
      setProgress(Math.round(realProgress));
    };

    const progressInterval = setInterval(checkProgress, 100);

    // Wait for actual page load
    const onReady = () => {
      clearInterval(progressInterval);
      // Ensure minimum 600ms display
      const elapsed = Date.now() - startTime.current;
      const remaining = Math.max(0, 600 - elapsed);
      setTimeout(finish, remaining);
    };

    if (document.readyState === 'complete') {
      onReady();
    } else {
      window.addEventListener('load', onReady);
    }

    // Fallback: never block more than 5s
    const fallback = setTimeout(() => {
      clearInterval(progressInterval);
      finish();
    }, 5000);

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
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
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

export default PageLoader;
