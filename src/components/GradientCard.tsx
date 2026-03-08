import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { GlowingEffect } from '@/components/GlowingEffect';

interface GradientCardProps {
  children: ReactNode;
  className?: string;
}

const GradientCard = ({ children, className }: GradientCardProps) => {
  return (
    <div className={cn('relative isolate [--card-radius:0.75rem] rounded-[var(--card-radius)] bg-border p-px', className)}>
      <div className="relative h-full rounded-[calc(var(--card-radius)-1px)] bg-card p-5 overflow-hidden">
        <GlowingEffect
          spread={40}
          disabled={false}
          proximity={64}
          borderWidth={1}
          blur={0}
        />
        <div className="relative z-10 h-full">{children}</div>
      </div>
    </div>
  );
};

export default GradientCard;
