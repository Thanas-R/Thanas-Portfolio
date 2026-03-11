import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  SiC,
  SiCplusplus,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiReact,
  SiGit,
  SiPycharm,
  SiVercel,
} from 'react-icons/si';
import { BiLogoVisualStudio } from 'react-icons/bi';
import { FaJava } from 'react-icons/fa';
import { SiFigma } from 'react-icons/si';
import { BsStack } from 'react-icons/bs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';

interface TechItem {
  name: string;
  icon: React.ReactNode;
  url?: string;
}

const techStack: TechItem[] = [
  { name: 'C', icon: <SiC />, url: 'https://en.cppreference.com/w/c' },
  { name: 'C++', icon: <SiCplusplus />, url: 'https://en.cppreference.com/w/cpp' },
  { name: 'Python', icon: <SiPython />, url: 'https://www.python.org/' },
  { name: 'Java', icon: <FaJava />, url: 'https://www.oracle.com/java/' },
  { name: 'TypeScript', icon: <SiTypescript />, url: 'https://www.typescriptlang.org/' },
  { name: 'JavaScript', icon: <SiJavascript />, url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { name: 'HTML', icon: <SiHtml5 />, url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { name: 'React', icon: <SiReact />, url: 'https://reactjs.org/' },
  { name: 'VS Code', icon: <BiLogoVisualStudio />, url: 'https://code.visualstudio.com/' },
  { name: 'PyCharm', icon: <SiPycharm />, url: 'https://www.jetbrains.com/pycharm/' },
  { name: 'Git', icon: <SiGit />, url: 'https://git-scm.com/' },
  { name: 'Vercel', icon: <SiVercel />, url: 'https://vercel.com/' },
  { name: 'Figma', icon: <SiFigma />, url: 'https://www.figma.com/' },
];

function Ribbon({ items, reverse, speed, tooltipSide, paused }: { items: TechItem[]; reverse: boolean; speed: number; tooltipSide: 'top' | 'bottom'; paused: boolean }) {
  const isMobile = useIsMobile();
  const tripled = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden w-full">
      <div
        className={cn('flex w-max')}
        style={{
          animation: `auto-scroll-ribbon ${speed}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {tripled.map((tech, i) => (
          <TooltipProvider key={`${tech.name}-${i}`} delayDuration={isMobile ? 0 : 200}>
            <Tooltip>
              <TooltipTrigger asChild>
                {isMobile ? (
                  <button
                    className="flex-shrink-0 px-7 flex items-center transition-filter duration-200 filter hover:brightness-125 focus:brightness-125 text-foreground/70 hover:text-foreground text-[38px]"
                    aria-label={tech.name}
                    onClick={(e) => e.preventDefault()}
                  >
                    {tech.icon}
                  </button>
                ) : (
                  <a
                    href={tech.url ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 px-7 flex items-center transition-filter duration-200 filter hover:brightness-125 focus:brightness-125 text-foreground/70 hover:text-foreground text-[38px] no-underline"
                    aria-label={tech.name}
                  >
                    {tech.icon}
                  </a>
                )}
              </TooltipTrigger>
              <TooltipContent side={tooltipSide} className="text-xs">
                {tech.name}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}

const TechCarousel = () => {
  const reversed = [...techStack].reverse();
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <section className="relative px-6 py-6 mb-4">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4 text-center">
          Tech Stack
        </h3>
        <div className="space-y-3 overflow-hidden">
          <div
            onMouseEnter={() => setHoveredRow(0)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            <Ribbon items={techStack} reverse={false} speed={25} tooltipSide="top" paused={hoveredRow === 0} />
          </div>
          <div
            onMouseEnter={() => setHoveredRow(1)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            <Ribbon items={reversed} reverse={true} speed={30} tooltipSide="bottom" paused={hoveredRow === 1} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechCarousel;
