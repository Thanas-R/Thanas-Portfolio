import { motion } from 'framer-motion';
import { Code2, Users, Lightbulb, Rocket, Github, Linkedin, Calendar, Briefcase } from 'lucide-react';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/* ── Bento primitives ───────────────────────────── */

const BentoGrid = ({ children, className }: {children: ReactNode;className?: string;}) =>
<div className={cn('grid w-full auto-rows-[12rem] grid-cols-3 gap-4', className)}>
    {children}
  </div>;


const BentoCard = ({
  name,
  className,
  Icon,
  description





}: {name: string;className?: string;Icon?: any;description: string;}) =>
<div className={cn('glow-card group relative flex flex-col justify-end p-5 overflow-hidden', className)}>
    




  </div>;


/* ── Timeline data ──────────────────────────────── */

const milestones = [
{ year: '2025', title: 'B.Tech & Production Projects', icon: Calendar },
{ year: '2023', title: 'Mastered C++ & DSA', icon: Code2 },
{ year: '2021', title: 'Java & OOP Journey', icon: Code2 },
{ year: '2020', title: 'First Steps — Python', icon: Code2 }];


const AboutSection = () => {
  return (
    <section id="about" className="relative px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}>

          <h2 className="text-3xl md:text-5xl font-bold text-foreground font-['Space_Grotesk'] tracking-tight mb-8">
            About
          </h2>

          <BentoGrid className="md:auto-rows-[14rem]">
            {/* Top-left: About me — spans 2 cols */}
            <BentoCard
              className="col-span-3 md:col-span-2 row-span-2"
              Icon={Users}
              name="About Me"
              description="I am a passionate learner who believes in growing a little every day. I'm genuinely interested in coding and problem-solving, and I enjoy turning complex challenges into simple, effective solutions. While I take my work seriously, I also value creating a positive and cheerful environment. I believe a good laugh can go a long way in building strong, collaborative teams. I strive to be honest, supportive, and reliable, taking responsibility or leading when needed while contributing and learning with the team." />


            {/* Top-right: Stats */}
            <BentoCard
              className="col-span-3 md:col-span-1"
              Icon={Briefcase}
              name="6+ Years of Coding"
              description="6 live projects and counting. Infinite goals ahead." />


            {/* Right: Journey mini-timeline */}
            <div className="glow-card col-span-3 md:col-span-1 p-5 flex flex-col justify-start overflow-hidden">
              <h3 className="text-base font-semibold text-foreground font-['Space_Grotesk'] mb-3">My Journey</h3>
              <div className="space-y-2 relative">
                <div className="absolute left-[5px] top-2 bottom-2 w-[1px] bg-border" />
                {milestones.map((m) =>
                <div key={m.year} className="flex items-start gap-3 relative">
                    <div className="w-[11px] h-[11px] rounded-full bg-foreground/30 mt-1 flex-shrink-0 z-10" />
                    <div>
                      <span className="text-xs text-muted-foreground">{m.year}</span>
                      <p className="text-xs text-foreground/80 leading-tight">{m.title}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom row: 3 cards */}
            <BentoCard
              className="col-span-3 md:col-span-1"
              Icon={Lightbulb}
              name="Problem Solver"
              description="Enjoy simplifying complex challenges and finding elegant solutions." />


            <BentoCard
              className="col-span-3 md:col-span-1"
              Icon={Rocket}
              name="Always Learning"
              description="Passionate about daily growth and exploring new technologies." />


            {/* Links card */}
            <div className="glow-card col-span-3 md:col-span-1 p-5 flex flex-col justify-end overflow-hidden">
              <h3 className="text-base font-semibold text-foreground font-['Space_Grotesk'] mb-3">Connect</h3>
              <div className="flex gap-4">
                <a href="https://github.com/Thanas-R" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/thanasr/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </BentoGrid>
        </motion.div>
      </div>
    </section>);

};

export default AboutSection;