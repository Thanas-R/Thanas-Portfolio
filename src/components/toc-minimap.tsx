import { useEffect, useState } from 'react';

export interface TOCItemType {
  title: string;
  url: string; // hash like "#about"
  depth: number; // 2 or 3
}

interface Props {
  items: TOCItemType[];
}

/**
 * Minimal TOC minimap, fixed to the right edge on desktop.
 * Shows section dashes scaled by depth, highlights the active one
 * via IntersectionObserver, and reveals the title on hover.
 */
export const TOCMinimap = ({ items }: Props) => {
  const [active, setActive] = useState<string | null>(items[0]?.url ?? null);

  useEffect(() => {
    const targets = items
      .map(i => document.querySelector(i.url))
      .filter((el): el is Element => Boolean(el));
    if (!targets.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive('#' + visible[0].target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] }
    );
    targets.forEach(t => obs.observe(t));
    return () => obs.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Page sections"
      className="fixed top-1/2 -translate-y-1/2 right-4 z-30 hidden lg:flex flex-col items-end gap-2 group/minimap"
    >
      {items.map((item) => {
        const isActive = active === item.url;
        const width = item.depth === 2 ? 22 : 14;
        return (
          <a
            key={item.url}
            href={item.url}
            className="flex items-center gap-2 py-1 transition-opacity"
            aria-current={isActive ? 'true' : undefined}
          >
            <span
              className="text-[10px] uppercase tracking-[0.18em] opacity-0 group-hover/minimap:opacity-100 transition-opacity text-foreground/70"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {item.title}
            </span>
            <span
              className="block h-px transition-all duration-300"
              style={{
                width,
                backgroundColor: isActive ? 'hsl(var(--foreground))' : 'hsl(var(--foreground) / 0.35)',
                transform: isActive ? 'scaleX(1.6)' : 'scaleX(1)',
                transformOrigin: 'right',
              }}
            />
          </a>
        );
      })}
    </nav>
  );
};

export default TOCMinimap;
