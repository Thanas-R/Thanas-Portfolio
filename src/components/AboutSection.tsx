import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

/* ── Bento primitives ───────────────────────────── */

const BentoGrid = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn('grid w-full auto-rows-[14rem] grid-cols-3 gap-4', className)}>
    {children}
  </div>
);

const BentoCard = ({
  name,
  className,
  children,
}: {
  name?: string;
  className?: string;
  children?: ReactNode;
}) => (
  <div
    className={cn(
      'glow-card group relative flex flex-col justify-end p-6 overflow-hidden',
      className
    )}
  >
    {children}
    {name && (
      <h3 className="text-sm font-semibold text-foreground font-['Space_Grotesk'] mt-auto">
        {name}
      </h3>
    )}
  </div>
);

const AboutSection = () => {
  return (
    <section id="about" className="relative px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <BentoGrid className="md:auto-rows-[14rem] auto-rows-[10rem]">
            {/* Top-left — About me (spans 2 cols) */}
            <BentoCard className="col-span-3 md:col-span-2 row-span-2">
              <div className="flex flex-col h-full">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  About Me
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  I am a passionate learner who believes in growing a little every day. I'm genuinely
                  interested in coding and problem-solving, and I enjoy turning complex challenges
                  into simple, effective solutions.
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed mt-3">
                  While I take my work seriously, I also value creating a positive and cheerful
                  environment. I believe a good laugh can go a long way in building strong,
                  collaborative teams.
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed mt-3">
                  I strive to be honest, supportive, and reliable — taking responsibility or leading
                  when needed while contributing and learning with the team.
                </p>
              </div>
            </BentoCard>

            {/* Top-right — empty */}
            <BentoCard className="col-span-3 md:col-span-1" />

            {/* Bottom-right — empty */}
            <BentoCard className="col-span-3 md:col-span-1" />

            {/* Bottom row — 3 cards */}
            <BentoCard className="col-span-1" />
            <BentoCard className="col-span-1" />
            <BentoCard className="col-span-1" />
          </BentoGrid>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
