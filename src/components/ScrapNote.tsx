import { cn } from '@/lib/utils';

/**
 * A handwritten margin note, like something scribbled on the edge of a plan.
 * Sits next to a section title. Deliberately slightly off-straight.
 */
const ScrapNote = ({
  children,
  className = '',
  tilt = -2,
  arrow = 'none',
}: {
  children: React.ReactNode;
  className?: string;
  tilt?: number;
  arrow?: 'none' | 'right' | 'down';
}) => (
  <span
    className={cn(
      'inline-flex items-center gap-1.5 font-["Caveat"] text-xl md:text-2xl leading-none text-muted-foreground/80 select-none',
      className,
    )}
    style={{ transform: `rotate(${tilt}deg)` }}
    aria-hidden
  >
    {arrow === 'down' && (
      <svg width="22" height="20" viewBox="0 0 22 20" fill="none" className="shrink-0">
        <path
          d="M4 2c3 5 6 9 9 12"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M9 11.5c1.2 1.2 2.4 2 4.5 2.4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    )}
    <span>{children}</span>
    {arrow === 'right' && (
      <svg width="26" height="14" viewBox="0 0 26 14" fill="none" className="shrink-0">
        <path
          d="M1 8c6-1 12-3 22-5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M19 1.5c1.5 1 2.6 1.7 4 1.5-.6 1.4-1 2.4-1.6 3.8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    )}
  </span>
);

/**
 * A wobbly hand-drawn underline, used under a heading.
 */
const Squiggle = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 220 10"
    preserveAspectRatio="none"
    className={cn('block h-[9px] w-full text-muted-foreground/45', className)}
    fill="none"
    aria-hidden
  >
    <path
      d="M2 6c14-4 26 3 40-1s26 4 40 0 26 3 40-1 26 4 40 0 22 2 36-1"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export { ScrapNote, Squiggle };
export default ScrapNote;
