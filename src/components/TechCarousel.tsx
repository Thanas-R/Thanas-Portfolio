import { useCallback, useEffect, useRef, useState, memo } from 'react';

interface TechItem {
  name: string;
  icon: string;
  href?: string;
}

const techStack: TechItem[] = [
  { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', href: 'https://en.wikipedia.org/wiki/C_(programming_language)' },
  { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', href: 'https://isocpp.org/' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', href: 'https://python.org' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', href: 'https://www.java.com' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', href: 'https://typescriptlang.org' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', href: 'https://react.dev' },
  { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', href: 'https://code.visualstudio.com' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', href: 'https://git-scm.com' },
];

// Preload
techStack.forEach((t) => { const img = new Image(); img.src = t.icon; });

const SMOOTH_TAU = 0.25;
const MIN_COPIES = 2;
const COPY_HEADROOM = 2;

function LogoRibbon({ items, speed, reverse }: { items: TechItem[]; speed: number; reverse?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const [copyCount, setCopyCount] = useState(MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const targetV = reverse ? -speed : speed;

  const updateDims = useCallback(() => {
    const cw = containerRef.current?.clientWidth ?? 0;
    const sw = seqRef.current?.getBoundingClientRect().width ?? 0;
    if (sw > 0) {
      const needed = Math.ceil(cw / sw) + COPY_HEADROOM;
      setCopyCount(Math.max(MIN_COPIES, needed));
    }
  }, []);

  useEffect(() => {
    const ro = new ResizeObserver(updateDims);
    if (containerRef.current) ro.observe(containerRef.current);
    if (seqRef.current) ro.observe(seqRef.current);
    updateDims();
    return () => ro.disconnect();
  }, [updateDims]);

  // Load images then re-measure
  useEffect(() => {
    const imgs = seqRef.current?.querySelectorAll('img') ?? [];
    let remaining = imgs.length;
    if (remaining === 0) { updateDims(); return; }
    const handle = () => { remaining--; if (remaining === 0) updateDims(); };
    imgs.forEach((img) => {
      if ((img as HTMLImageElement).complete) handle();
      else {
        img.addEventListener('load', handle, { once: true });
        img.addEventListener('error', handle, { once: true });
      }
    });
  }, [updateDims]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const seqW = seqRef.current?.getBoundingClientRect().width ?? 0;

    const animate = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.max(0, ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      const target = isHovered ? 0 : targetV;
      const ease = 1 - Math.exp(-dt / SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * ease;

      if (seqW > 0) {
        let next = offsetRef.current + velocityRef.current * dt;
        next = ((next % seqW) + seqW) % seqW;
        offsetRef.current = next;
        track.style.transform = `translate3d(${-next}px, 0, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [targetV, isHovered]);

  return (
    <div ref={containerRef} className="overflow-hidden w-full">
      <div
        ref={trackRef}
        className="flex w-max"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {Array.from({ length: copyCount }, (_, ci) => (
          <div
            key={ci}
            ref={ci === 0 ? seqRef : undefined}
            className="flex shrink-0"
          >
            {items.map((tech, i) => {
              const inner = (
                <div className="flex items-center gap-3 px-5 py-2 transition-all duration-300 hover:scale-110"
                  style={{ filter: 'grayscale(1)', transition: 'filter 0.3s, transform 0.3s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.filter = 'grayscale(0)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.filter = 'grayscale(1)'; }}
                >
                  <img src={tech.icon} alt={tech.name} className="w-7 h-7" loading="eager" draggable={false} />
                  <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{tech.name}</span>
                </div>
              );

              return tech.href ? (
                <a key={`${ci}-${i}`} href={tech.href} target="_blank" rel="noopener noreferrer" className="shrink-0">
                  {inner}
                </a>
              ) : (
                <div key={`${ci}-${i}`} className="shrink-0">{inner}</div>
              );
            })}
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
        <div className="space-y-3 overflow-hidden">
          <LogoRibbon items={techStack} speed={80} />
          <LogoRibbon items={reversed} speed={90} reverse />
        </div>
      </div>
    </section>
  );
};

export default TechCarousel;
