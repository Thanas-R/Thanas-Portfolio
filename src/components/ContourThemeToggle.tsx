import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import contourDark from '@/assets/contour-dark.png';
import contourLight from '@/assets/contour-light.png';

interface Props {
  isDark: boolean;
}

const DURATION = 600; // ms

const ContourThemeToggle = ({ isDark }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLImageElement>(null);
  const animatingRef = useRef(false);
  // showDark tracks what the *base* layer currently shows (independent of global theme during animation)
  const [showDark, setShowDark] = useState(isDark);

  // Sync when theme changes externally
  useEffect(() => {
    if (!animatingRef.current) setShowDark(isDark);
  }, [isDark]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (animatingRef.current) return;
    const rect = containerRef.current?.getBoundingClientRect();
    const overlay = overlayRef.current;
    if (!rect || !overlay) return;

    animatingRef.current = true;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const maxDist = Math.ceil(Math.max(
      Math.hypot(x, y),
      Math.hypot(rect.width - x, y),
      Math.hypot(x, rect.height - y),
      Math.hypot(rect.width - x, rect.height - y)
    ));

    const targetDark = !isDark;

    // Set overlay to the TARGET image and start clip at 0
    overlay.src = targetDark ? contourDark : contourLight;
    overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`;
    overlay.style.transition = 'none';
    overlay.style.display = 'block';

    // Force reflow then animate
    overlay.offsetHeight;
    overlay.style.transition = `clip-path ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;
    overlay.style.clipPath = `circle(${maxDist + 50}px at ${x}px ${y}px)`;

    setTimeout(() => {
      // Toggle theme
      const html = document.documentElement;
      if (targetDark) {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      // Update base layer to match new theme
      setShowDark(targetDark);
      // Hide overlay
      overlay.style.transition = 'none';
      overlay.style.clipPath = 'circle(0px at 50% 50%)';
      overlay.style.display = 'none';
      animatingRef.current = false;
    }, DURATION);
  }, [isDark]);

  // Base layer shows the CURRENT theme's opposite image (dark mode → show light img to click, etc.)
  // Actually: base = current theme look, overlay reveals the next
  // When dark → base shows dark contour, overlay reveals light (and vice versa)
  const baseImg = showDark ? contourDark : contourLight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.3, ease: 'easeOut' }}
      className="mb-16 rounded-2xl overflow-hidden border border-foreground/10 relative"
    >
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              ref={containerRef}
              className="relative cursor-pointer overflow-hidden"
              style={{ maxHeight: 480 }}
              onClick={handleClick}
            >
              <img
                src={baseImg}
                alt={`Contour Flow ${showDark ? 'dark' : 'light'} mode`}
                className="w-full object-cover block"
              />
              <img
                ref={overlayRef}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{ display: 'none', clipPath: 'circle(0px at 50% 50%)' }}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs">
            Click to switch theme
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
};

export default ContourThemeToggle;
