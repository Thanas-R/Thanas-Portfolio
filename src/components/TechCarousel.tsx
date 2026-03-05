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
import { FaJava, FaFigma } from 'react-icons/fa';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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

  // Framework / Library
  { name: 'React', icon: <SiReact />, url: 'https://reactjs.org/' },

  // Development Tools / IDEs & Tools
  { name: 'VS Code', icon: <BiLogoVisualStudio />, url: 'https://code.visualstudio.com/' },
  { name: 'PyCharm', icon: <SiPycharm />, url: 'https://www.jetbrains.com/pycharm/' },
  { name: 'Git', icon: <SiGit />, url: 'https://git-scm.com/' },
  { name: 'Figma', icon: <FaFigma />, url: 'https://www.figma.com/' },

  // Deployment / Platform
  { name: 'Vercel', icon: <SiVercel />, url: 'https://vercel.com/' },
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
                {/* anchor is clickable and opens the official site in a new tab */}
                <a
  href={tech.url ?? '#'}
  target="_blank"
  rel="noopener noreferrer"
  className="flex-shrink-0 px-7 flex items-center transition-filter duration-200 filter hover:brightness-125 focus:brightness-125 text-foreground/70 hover:text-foreground text-[38px] no-underline"
  aria-label={tech.name}
>
                  {tech.icon}
                </a>
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
