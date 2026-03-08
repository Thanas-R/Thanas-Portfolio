import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import contourDark from '@/assets/contour-dark.png';
import contourLight from '@/assets/contour-light.png';

interface Props {
  isDark: boolean;
}

const ContourThemeToggle = ({ isDark }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ripple, setRipple] = useState<{ x: number; y: number; expanding: boolean; targetDark: boolean } | null>(null);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Max distance from click to any corner = radius needed
    const maxDist = Math.max(
      Math.hypot(x, y),
      Math.hypot(rect.width - x, y),
      Math.hypot(x, rect.height - y),
      Math.hypot(rect.width - x, rect.height - y)
    );

    const targetDark = !isDark;
    setRipple({ x, y, expanding: true, targetDark });

    // Use a CSS animation via clip-path. After it finishes, toggle theme.
    const el = containerRef.current?.querySelector('.ripple-overlay') as HTMLElement;
    if (el) {
      el.style.clipPath = `circle(0px at ${x}px ${y}px)`;
      // Force reflow
      el.offsetHeight;
      el.style.transition = 'clip-path 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      el.style.clipPath = `circle(${maxDist}px at ${x}px ${y}px)`;
    }

    setTimeout(() => {
      const html = document.documentElement;
      if (targetDark) {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      setRipple(null);
    }, 500);
  }, [isDark]);

  // Bottom layer = current theme image, top ripple layer = opposite theme image
  const currentImg = isDark ? contourDark : contourLight;
  const nextImg = isDark ? contourLight : contourDark;

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
              {/* Base image: current theme */}
              <img
                src={currentImg}
                alt={`Contour Flow ${isDark ? 'dark' : 'light'} mode`}
                className="w-full object-cover block"
              />
              {/* Ripple overlay: next theme image, clipped to expanding circle */}
              {ripple && (
                <img
                  src={ripple.targetDark ? contourDark : contourLight}
                  alt=""
                  className="ripple-overlay absolute inset-0 w-full h-full object-cover"
                  style={{ clipPath: 'circle(0px at 50% 50%)' }}
                />
              )}
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
