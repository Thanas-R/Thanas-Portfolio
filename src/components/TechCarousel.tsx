import { cn } from '@/lib/utils';

interface TechItem {
  name: string;
  icon: string;
}

const techStack: TechItem[] = [
  { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
  { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
];

// Preload tech icons
techStack.forEach((t) => {
  const img = new Image();
  img.src = t.icon;
});

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
          <div
            key={`${tech.name}-${i}`}
            className="flex-shrink-0 pl-8 flex items-center gap-3 transition-transform duration-300 hover:scale-105"
            style={{ filter: 'grayscale(1)', transition: 'filter 0.3s, transform 0.3s' }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = 'grayscale(0)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = 'grayscale(1)'; }}
          >
            <img src={tech.icon} alt={tech.name} className="w-8 h-8" loading="eager" />
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const TechCarousel = () => {
  const reversed = [...techStack].reverse();
  return (
    <section className="relative px-6 py-4">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4 text-center">
          Tech Stack
        </h3>
        <div className="space-y-4 overflow-hidden">
          <Ribbon items={techStack} reverse={false} speed={30} />
          <Ribbon items={reversed} reverse={true} speed={35} />
        </div>
      </div>
    </section>
  );
};

export default TechCarousel;
