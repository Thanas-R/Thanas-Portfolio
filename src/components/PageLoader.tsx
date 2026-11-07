import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { AsciiWordmark } from './AsciiWordmark';

const INTRO_VISITED_KEY = 'thanas-intro-visited';
const FIRST_LOAD_TARGET = 1.6;
const RELOAD_TARGET = 1.25;
const FRAME_WIDTH = 320;
const FRAME_HEIGHT = 290;
const FRAME_COUNT = 117;
const FRAME_COLUMNS = 10;
const BASE_FPS = 24;

const spriteImg = new Image();
spriteImg.src = '/loading-sprite.webp';

const PageLoader = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [isReadyToPlay, setIsReadyToPlay] = useState(false);
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
    } catch {}

    let animId = 0;
    let isCancelled = false;
    let startTime: number | null = null;
    let lastRenderTime: number | null = null;
    let frameAccumulator = 0;
    let lastDrawnFrame = -1;

    const targetSpeed = FRAME_COUNT / (BASE_FPS * targetDuration);

    const drawFrame = (ctx: CanvasRenderingContext2D, frameIndex: number) => {
      const col = frameIndex % FRAME_COLUMNS;
      const row = Math.floor(frameIndex / FRAME_COLUMNS);

      ctx.clearRect(0, 0, FRAME_WIDTH, FRAME_HEIGHT);
      ctx.drawImage(
        spriteImg,
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

    const start = async () => {
      // Decode off-thread before drawing to avoid initial freeze
      try {
        if ('decode' in spriteImg) {
          await spriteImg.decode();
        }
      } catch {}

      if (isCancelled) return;
      setIsReadyToPlay(true);

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      drawFrame(ctx, 0);
      lastDrawnFrame = 0;

      const render = (timestamp: number) => {
        if (startTime === null) startTime = timestamp;
        if (lastRenderTime === null) lastRenderTime = timestamp;

        const delta = Math.min((timestamp - lastRenderTime) / 1000, 0.05);
        lastRenderTime = timestamp;

        const elapsed = (timestamp - startTime) / 1000;

        frameAccumulator += BASE_FPS * targetSpeed * delta;
        const currentFrame = Math.floor(frameAccumulator) % FRAME_COUNT;

        if (currentFrame !== lastDrawnFrame) {
          drawFrame(ctx, currentFrame);
          lastDrawnFrame = currentFrame;
        }

        // Complete when target duration met and at least 1 cycle played
        if (!exitingRef.current && elapsed >= targetDuration && frameAccumulator >= FRAME_COUNT) {
          exitingRef.current = true;
          setShowIntro(false);
        }

        animId = requestAnimationFrame(render);
      };

      animId = requestAnimationFrame(render);
    };

    if (spriteImg.complete && spriteImg.naturalWidth > 0) {
      void start();
    } else {
      spriteImg.onload = () => void start();
    }

    return () => {
      isCancelled = true;
      cancelAnimationFrame(animId);
    };
  }, [targetDuration]);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          key="intro-loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background pointer-events-auto"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          aria-label="Loading portfolio"
          role="status"
          onContextMenu={(e) => e.preventDefault()}
        >
          <canvas
            ref={canvasRef}
            width={FRAME_WIDTH}
            height={FRAME_HEIGHT}
            className={`w-[160px] h-[145px] sm:w-[192px] sm:h-[174px] transition-opacity duration-150 ${
              isReadyToPlay ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden="true"
          />
          <AsciiWordmark className="absolute bottom-10 left-5 sm:bottom-6 sm:left-6 text-[9px] leading-[1.15] text-foreground/70" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
