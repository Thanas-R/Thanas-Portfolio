import { motion } from 'framer-motion';
import { Code2, Users, Rocket, Github, Linkedin, ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

const BentoGrid = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn('grid w-full auto-rows-[12rem] grid-cols-3 gap-4', className)}>
    {children}
  </div>
);

const BentoCard = ({
  name,
  className,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className?: string;
  Icon?: any;
  description: string;
  href?: string;
  cta?: string;
}) => (
  <div
    className={cn(
      'glow-card group relative flex flex-col justify-end p-5 overflow-hidden',
      className
    )}
  >
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-foreground/[.03]" />
    <div className="relative z-10">
      {Icon && <Icon className="h-8 w-8 text-muted-foreground mb-3 origin-left transition-all duration-300 ease-in-out group-hover:scale-75" />}
      <h3 className="text-base font-semibold text-foreground font-['Space_Grotesk']">{name}</h3>
      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
    {href && cta && (
      <div className="absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
          {cta} <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    )}
  </div>
);

const projects = 6; // live project count

const AboutSection = () => {
  return (
    <section id="about" className="relative px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground font-['Space_Grotesk'] tracking-tight mb-8">
            About
          </h2>

          {/* Bento Grid — 5 cards matching reference image layout */}
          <BentoGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[14rem]">
            {/* Card 1 — About Me (tall, spans 2 rows on desktop) */}
            <BentoCard
              name="About Me"
              Icon={Users}
              description="I'm a passionate learner who believes in growing a little every day. I enjoy turning complex challenges into simple, effective solutions. I value creating a positive, cheerful environment — a good laugh goes a long way in building strong teams."
              className="lg:row-span-2"
            />

            {/* Card 2 — empty/spacer on desktop, visible on mobile */}
            <BentoCard
              name="Coding Stats"
              Icon={Code2}
              description={`6+ years of coding experience. ${projects} live projects deployed. Infinite goals ahead.`}
            />

            {/* Card 3 — Journey */}
            <BentoCard
              name="Journey"
              Icon={Rocket}
              description="Python (2020) → Java (2021) → C++ & DSA (2023) → B.Tech CSE AI/ML at PES University (2025). Always building, always learning."
            />

            {/* Card 4 — GitHub */}
            <BentoCard
              name="GitHub"
              Icon={Github}
              description="Open-source contributions and project repositories."
              href="https://github.com/Thanas-R"
              cta="View profile"
            />

            {/* Card 5 — LinkedIn */}
            <BentoCard
              name="LinkedIn"
              Icon={Linkedin}
              description="Professional network and career updates."
              href="https://www.linkedin.com/in/thanasr/"
              cta="Connect"
            />
          </BentoGrid>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
