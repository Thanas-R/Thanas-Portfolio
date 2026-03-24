import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { GlowingEffect } from '@/components/GlowingEffect';

interface GradientCardProps {
  children: ReactNode;
  className?: string;
}

const GradientCard = ({ children, className }: GradientCardProps) => {
  return (
    <div
      className={cn('relative rounded-xl overflow-hidden p-5', className)}
      style={{
        border: '1.5px solid var(--gradient-card-border)',
        backgroundColor: 'var(--gradient-card-bg)',
      }}
    >
      <GlowingEffect
        spread={80}
        disabled={false}
        proximity={120}
        borderWidth={1.5}
        blur={12}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default GradientCard;
