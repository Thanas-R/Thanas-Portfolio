import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const STAGGER = 0.035;

const TextRoll = ({ children, className, center = false }: { children: string; className?: string; center?: boolean }) => {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={cn('relative inline-block overflow-hidden py-[2px]', className)}
      style={{ lineHeight: 1.0}}
    >
      <div>
        {children.split('').map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              key={i}
              variants={{ initial: { y: 0 }, hovered: { y: '-100%' } }}
              transition={{ ease: 'easeInOut', delay }}
              className="inline-block"
            >
              {l === ' ' ? '\u00A0' : l}
            </motion.span>
          );
        })}
      </div>

      <div className="absolute inset-0">
        {children.split('').map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              key={i}
              variants={{ initial: { y: '100%' }, hovered: { y: 0 } }}
              transition={{ ease: 'easeInOut', delay }}
              className="inline-block"
            >
              {l === ' ' ? '\u00A0' : l}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
};

export default TextRoll;
