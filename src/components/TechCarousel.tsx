import { cn } from '@/lib/utils';
import {
  SiC,
  SiCplusplus,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiReact,
  SiGit,
  SiPycharm,
  SiVercel,
  SiVite,
  SiTailwindcss,
  SiNextdotjs,
  SiNodedotjs,
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';
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
  { name: 'HTML5', icon: <SiHtml5 /> },
  { name: 'CSS3', icon: <SiCss3 /> },

  { name: 'React', icon: <SiReact /> },
  { name: 'Node.js', icon: <SiNodedotjs /> },
  { name: 'Next.js', icon: <SiNextdotjs /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss /> },

  { name: 'Git', icon: <SiGit /> },
  { name: 'Vite', icon: <SiVite /> },
  { name: 'Vercel', icon: <SiVercel /> },

  { name: 'VS Code', icon: <VscCode /> },
  { name: 'PyCharm', icon: <SiPycharm /> },
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
                <div
                  className="flex-shrink-0 px-7 flex items-center transition-transform duration-300 hover:scale-110 text-foreground/70 hover:text-foreground text-[38px]"
                  aria-label={tech.name}
                >
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
