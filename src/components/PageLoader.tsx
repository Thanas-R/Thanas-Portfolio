import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const INTRO_VISITED_KEY = 'thanas-intro-visited';
const FIRST_LOAD_TARGET = 1.8; // Target ~1.8s on initial visit
const RELOAD_TARGET = 1.2;     // Target ~1.2s on reload
const FRAME_WIDTH = 320;
const FRAME_HEIGHT = 290;
const FRAME_COUNT = 117;
const FRAME_COLUMNS = 10;
const BASE_FPS = 24;

const PageLoader = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [animationDone, setAnimationDone] = useState(false);
  const exitingRef = useRef(false);

  const isFirstLoad = useRef(() => {
    try {
      return window.sessionStorage.getItem(INTRO_VISITED_KEY) !== 'true';
    } catch {
      return true;
    }
  }).current();

  const targetDuration = isFirstLoad ? FIRST_LOAD_TARGET : RELOAD_TARGET;

  useEffect(() => {
    try {
      window.sessionStorage.setItem(INTRO_VISITED_KEY, 'true');
    } catch {
      // Storage fallback
    }

    // Consider DOM interactive as ready so we don't stall waiting on background analytics/fonts
    let isPageLoaded =
      document.readyState === 'complete' || document.readyState === 'interactive';

    const onReady = () => {
      isPageLoaded = true;
    };

    if (!isPageLoaded) {
      window.addEventListener('DOMContentLoaded', onReady, { once: true });
      window.addEventListener('load', onReady, { once: true });
    }

    const fallbackTimer = window.setTimeout(() => {
      isPageLoaded = true;
    }, 2000);

    const img = new Image();
    img.src = '/loading-sprite.webp';

    let animId = 0;
    let isCancelled = false;
    let startTime: number | null = null;
    let lastRenderTime: number | null = null;
    let frameAccumulator = 0;
    let lastDrawnFrame = -1;

    // Fixed ideal speed so 117 frames complete smoothly without erratic jumping:
    // ~2.7x on first load (1.8s), ~4.0x on reload (1.2s)
    const targetSpeed = FRAME_COUNT / (BASE_FPS * targetDuration);

    const drawFrame = (ctx: CanvasRenderingContext2D, frameIndex: number) => {
      const col = frameIndex % FRAME_COLUMNS;
      const row = Math.floor(frameIndex / FRAME_COLUMNS);

      ctx.clearRect(0, 0, FRAME_WIDTH, FRAME_HEIGHT);
      ctx.drawImage(
        img,
        col * FRAME_WIDTH,
        row * FRAME_HEIGHT,
        FRAME_WIDTH,
        FRAME_HEIGHT,
        0,
        0,
        FRAME_WIDTH,
        FRAME_HEIGHT
      );
    };

    const startLoop = async () => {
      // Decompress 3200x3480 texture off the main thread to prevent the initial frame stall
      try {
        if ('decode' in img) {
          await img.decode();
        }
      } catch {
        // Fallback if decode interrupted
      }

      if (isCancelled) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const render = (timestamp: number) => {
        if (startTime === null) startTime = timestamp;
        if (lastRenderTime === null) lastRenderTime = timestamp;

        const delta = Math.min((timestamp - lastRenderTime) / 1000, 0.05);
        lastRenderTime = timestamp;

        const elapsed = (timestamp - startTime) / 1000;

        // Smooth continuous playback: target speed once ready, steady 1.2x if network is slow
        const speed = isPageLoaded ? targetSpeed : 1.2;

        frameAccumulator += BASE_FPS * speed * delta;
        const currentFrame = Math.floor(frameAccumulator) % FRAME_COUNT;

        if (currentFrame !== lastDrawnFrame) {
          drawFrame(ctx, currentFrame);
          lastDrawnFrame = currentFrame;
        }

        // Trigger exit when duration target is met and loop completes
        const hasCompletedCycle = frameAccumulator >= FRAME_COUNT;
        if (
          !exitingRef.current &&
          isPageLoaded &&
          elapsed >= targetDuration &&
          hasCompletedCycle
        ) {
          exitingRef.current = true;
          setAnimationDone(true);
          // Do NOT return here: keep rAF running so the fish keeps swimming seamlessly during the fade-out!
        }

        animId = requestAnimationFrame(render);
      };

      animId = requestAnimationFrame(render);
    };

    if (img.complete && img.naturalWidth > 0) {
      void startLoop();
    } else {
      img.onload = () => void startLoop();
    }

    return () => {
      isCancelled = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('DOMContentLoaded', onReady);
      window.removeEventListener('load', onReady);
      window.clearTimeout(fallbackTimer);
    };
  }, [targetDuration]);

  useEffect(() => {
    if (animationDone) {
      setShowIntro(false);
    }
  }, [animationDone]);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          key="intro-loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background pointer-events-auto"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          aria-label="Loading portfolio"
          role="status"
          onContextMenu={(e) => e.preventDefault()}
        >
          <canvas
            ref={canvasRef}
            width={FRAME_WIDTH}
            height={FRAME_HEIGHT}
            className="w-[160px] h-[145px] sm:w-[192px] sm:h-[174px]"
            aria-hidden="true"
          />
          <span className="absolute bottom-6 left-6 font-mono text-sm text-foreground/70 select-none">
            thanas.
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
