import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import contourDark from '@/assets/contour-dark.png';
import contourLight from '@/assets/contour-light.png';

interface Props {
  isDark: boolean;
}

const ContourThemeToggle = ({ isDark }: Props) => {
  const handleClick = useCallback(() => {
    const html = document.documentElement;
    const targetDark = !isDark;
    if (targetDark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Show opposite theme as preview hint
  const baseImg = isDark ? contourLight : contourDark;

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
              className="relative cursor-pointer overflow-hidden"
              style={{ maxHeight: 480 }}
              onClick={handleClick}
            >
              <img
                src={baseImg}
                alt={`Contour Flow - click to switch to ${isDark ? 'light' : 'dark'} theme`}
                className="w-full object-cover block"
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
