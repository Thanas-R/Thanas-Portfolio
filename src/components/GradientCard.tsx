import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { GlowingEffect } from '@/components/GlowingEffect';

interface GradientCardProps {
  children: ReactNode;
  className?: string;
}

const GradientCard = ({ children, className }: GradientCardProps) => {
  return (
    <div className={cn('relative isolate rounded-xl border border-border bg-card p-5 overflow-hidden', className)}>
      <GlowingEffect
        spread={36}
        disabled={false}
        proximity={72}
        borderWidth={1}
        blur={0}
        innerGlow={false}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default GradientCard;
