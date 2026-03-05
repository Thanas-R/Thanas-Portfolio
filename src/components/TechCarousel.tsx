import { cn } from '@/lib/utils';
import {
  SiC, SiCplusplus, SiPython, SiJavascript, SiTypescript,
  SiHtml5, SiReact, SiGit, SiPycharm,
} from 'react-icons/si';
import { BiLogoVisualStudio } from 'react-icons/bi';
import { FaJava, FaFigma } from 'react-icons/fa';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TechItem {
  name: string;
  icon: React.ReactNode;
}

const techStack: TechItem[] = [
  { name: 'C', icon: <SiC /> },
  { name: 'C++', icon: <SiCplusplus /> },
  { name: 'Python', icon: <SiPython /> },
  { name: 'Java', icon: <FaJava /> },
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'JavaScript', icon: <SiJavascript /> },
  { name: 'HTML', icon: <SiHtml5 /> },

  // Framework / Library
  { name: 'React', icon: <SiReact /> },

  // Development Tools / IDEs & Tools
  { name: 'VS Code', icon: <BiLogoVisualStudio /> },
  { name: 'PyCharm', icon: <SiPycharm /> },
  { name: 'Git', icon: <SiGit /> },
  { name: 'Figma', icon: <FaFigma /> },
];

function Ribbon({ items, reverse, speed }: { items: TechItem[]; reverse: boolean; speed: number }) {
  const tripled = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden w-full">
      <div
        className={cn('flex w-max')}
        style={{
          animation: `auto-scroll-ribbon ${speed}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {tripled.map((tech, i) => (
          <TooltipProvider key={`${tech.name}-${i}`} delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex-shrink-0 px-7 flex items-center transition-transform duration-300 hover:scale-110 text-foreground/70 hover:text-foreground text-[38px]">
                  {tech.icon}
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
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
  return (
    <section className="relative px-6 py-6 mb-4">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4 text-center">
          Tech Stack
        </h3>
        <div className="space-y-3 overflow-hidden">
          <Ribbon items={techStack} reverse={false} speed={25} />
          <Ribbon items={reversed} reverse={true} speed={30} />
        </div>
      </div>
    </section>
  );
};

export default TechCarousel;
