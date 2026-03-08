import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { GlowingEffect } from '@/components/GlowingEffect';

interface GradientCardProps {
  children: ReactNode;
  className?: string;
}

const GradientCard = ({ children, className }: GradientCardProps) => {
  return (
    <div className={cn('relative rounded-xl border border-border bg-card overflow-hidden p-5', className)}>
      <GlowingEffect
        spread={40}
        disabled={false}
        proximity={64}
        borderWidth={1}
        blur={0}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default GradientCard;
