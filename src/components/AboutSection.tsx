import React from 'react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { GlowingEffect } from '@/components/GlowingEffect';

const BentoCard = ({ className, children }: {className?: string;children?: ReactNode;}) =>
<div className={cn('relative group rounded-xl border border-border bg-card overflow-hidden p-5', className)}>
    <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={2} disabled={false} />
    <div className="relative z-10 h-full">{children}</div>
  </div>;


const AboutSection = () => {
  return (
    <section id="about" className="relative py-12 w-full pt-0">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">

            {/* Journey — timeline, spans 2 rows */}
            <BentoCard className="md:col-span-2 md:row-span-2 min-h-[22rem]">
              <div className="relative pl-6 space-y-5">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

                <div className="relative">
                  <div className="absolute left-[-22px] top-1.5 w-3 h-3 rounded-full bg-foreground ring-4 ring-card" />
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">2026 <span className="text-foreground/40 normal-case">· Present</span></p>
                  <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                    Adopted agentic AI tools, refined <strong className="text-foreground">UI/UX design</strong> skills, and elevated prompt engineering for efficient project delivery.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute left-[-22px] top-1.5 w-2.5 h-2.5 rounded-full bg-muted-foreground/50 ring-4 ring-card" />
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">2025</p>
                  <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                    Began <strong className="text-foreground">B.Tech in CSE (AI/ML)</strong> at PES University. Started building production-ready projects.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute left-[-22px] top-1.5 w-2.5 h-2.5 rounded-full bg-muted-foreground/40 ring-4 ring-card" />
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">2023</p>
                  <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                    Focused on <strong className="text-foreground">C++</strong> and data structures & algorithms, strengthening core CS fundamentals.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute left-[-22px] top-1.5 w-2.5 h-2.5 rounded-full bg-muted-foreground/30 ring-4 ring-card" />
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">2021</p>
                  <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                    Started learning <strong className="text-foreground">Java</strong>, focusing on OOP principles and application development.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute left-[-22px] top-1.5 w-2.5 h-2.5 rounded-full bg-muted-foreground/20 ring-4 ring-card" />
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">2020</p>
                  <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                    First steps in programming with <strong className="text-foreground">Python</strong>, building small applications and scripts.
                  </p>
                </div>
              </div>
            </BentoCard>

            {/* About Me — wide center */}
            <BentoCard className="md:col-span-4 min-h-[10rem]">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground font-['Space_Grotesk'] tracking-tight">About Me</h3>
              <p className="text-muted-foreground leading-relaxed mt-3 text-base">
                I am a passionate learner who believes in growing a little every day. I'm genuinely interested in coding and problem-solving, and I enjoy turning complex challenges into simple, effective solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3 text-base">
                While I take my work seriously, I also value creating a positive and cheerful environment. I believe a good laugh can go a long way in building strong, collaborative teams.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3 text-base">
                I strive to be honest, supportive, and reliable, taking responsibility or leading when needed while contributing and learning with the team.
              </p>
            </BentoCard>

            {/* Currently */}
            <BentoCard className="md:col-span-2 min-h-[10rem]">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Currently</p>
              <p className="text-xl font-bold text-foreground font-['Space_Grotesk'] mt-2">Building & Learning</p>
              <p className="text-muted-foreground leading-relaxed mt-2 text-lg">
                Most likely working on a personal project. Pursuing <strong className="text-foreground">B.Tech</strong> at PES University, 2025–2029, majoring in CSE (AI/ML).
              </p>
            </BentoCard>

            {/* Connect — seamless icon row */}
            <BentoCard className="md:col-span-2 min-h-[10rem]">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Connect</p>
              <p className="text-xl font-bold text-foreground font-['Space_Grotesk'] mt-2">Find Me Online</p>
              <div className="mt-4 flex items-center gap-3 flex-wrap">
                <a href="https://github.com/Thanas-R" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background transition-all duration-200">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6.1-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.2.9 2.4v3.5c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" /></svg>
                </a>
                <a href="https://www.linkedin.com/in/thanasr/" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background transition-all duration-200">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><circle cx="4.983" cy="5.009" r="2.188" /><path d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z" /></svg>
                </a>
                <a href="mailto:thanas5.rd@gmail.com"
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background transition-all duration-200">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="m18.73 5.41-1.28 1L12 10.46 6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64z" /></svg>
                </a>
                <a href="tel:+919141944808"
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background transition-all duration-200">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
                </a>
                <Link to="/resume"
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background transition-all duration-200">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" /></svg>
                </Link>
              </div>
            </BentoCard>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default AboutSection;