import { useRef, useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import contourDark from '@/assets/contour-dark.png';
import contourLight from '@/assets/contour-light.png';

interface Props {
  isDark: boolean;
}

const DURATION = 1000; // slow ripple

const ContourThemeToggle = ({ isDark }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLImageElement>(null);
  const animatingRef = useRef(false);
  // Track what base layer shows — opposite of current theme (hint to user)
  const [baseDark, setBaseDark] = useState(!isDark);

  // Sync on external theme changes (navbar toggle) — instant, no ripple
  useEffect(() => {
    if (!animatingRef.current) setBaseDark(!isDark);
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

    // Base currently shows the OPPOSITE theme image.
    // Clicking means: switch theme to match what base shows → overlay reveals current theme image (the one we're leaving)
    // Actually: base = opposite. We want to ripple-reveal what will become the NEW opposite after switch.
    // Simpler: after click, theme flips. New base = !newTheme = current isDark. 
    // So overlay should show current isDark image, ripple expands, then we flip theme & base.
    
    // The overlay shows what the NEW base will be after theme switch = current theme image
    overlay.src = isDark ? contourDark : contourLight;
    overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`;
    overlay.style.transition = 'none';
    overlay.style.display = 'block';

    // Force reflow
    overlay.offsetHeight;
    overlay.style.transition = `clip-path ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;
    overlay.style.clipPath = `circle(${maxDist + 50}px at ${x}px ${y}px)`;

    setTimeout(() => {
      // Toggle theme
      const html = document.documentElement;
      const targetDark = !isDark;
      if (targetDark) {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      // New base = opposite of new theme
      setBaseDark(!targetDark);
      // Hide overlay
      overlay.style.transition = 'none';
      overlay.style.clipPath = 'circle(0px at 50% 50%)';
      overlay.style.display = 'none';
      animatingRef.current = false;
    }, DURATION);
  }, [isDark]);

  const baseImg = baseDark ? contourDark : contourLight;

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
                alt={`Contour Flow — click to switch to ${baseDark ? 'dark' : 'light'} theme`}
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
