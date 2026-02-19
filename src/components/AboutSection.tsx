import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { GlowingEffect } from '@/components/GlowingEffect';

const BentoCard = ({ className, children, delay = 0 }: {className?: string;children?: ReactNode;delay?: number;}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], [30 + delay * 10, -20]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={cn("relative group rounded-xl border border-border bg-card overflow-hidden p-4 py-[20px]", className)}>

      <GlowingEffect spread={40} glow proximity={64} borderWidth={2} disabled={false} />
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </motion.div>);

};

const AboutSection = () => {
  return (
    <section id="about" className="relative py-8 w-full pt-0">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">

          {/* Journey — timeline, spans 2 rows */}
          <BentoCard className="md:col-span-2 md:row-span-2" delay={0}>
            <div className="relative pl-6 space-y-4">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

              <div className="relative">
                <div className="absolute left-[-22px] top-1.5 w-3 h-3 rounded-full bg-foreground ring-4 ring-card" />
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">2026 <span className="text-foreground/40 normal-case">· Present</span></p>
                <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                  Adopted agentic AI tools, refined <strong className="text-foreground">UI/UX design</strong> skills, and elevated prompt engineering.
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
                  Focused on <strong className="text-foreground">C++</strong> and data structures & algorithms.
                </p>
              </div>

              <div className="relative">
                <div className="absolute left-[-22px] top-1.5 w-2.5 h-2.5 rounded-full bg-muted-foreground/30 ring-4 ring-card" />
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">2021</p>
                <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                  Started learning <strong className="text-foreground">Java</strong>, focusing on OOP principles.
                </p>
              </div>

              <div className="relative">
                <div className="absolute left-[-22px] top-1.5 w-2.5 h-2.5 rounded-full bg-muted-foreground/20 ring-4 ring-card" />
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">2020</p>
                <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                  First steps in programming with <strong className="text-foreground">Python</strong>.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* About Me */}
          <BentoCard className="md:col-span-4" delay={1}>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground font-['Space_Grotesk'] tracking-tight">About Me</h3>
            <p className="text-base text-muted-foreground leading-relaxed mt-3">
              I am a passionate learner who believes in growing a little every day. I'm genuinely interested in coding and problem-solving, and I enjoy turning complex challenges into simple, effective solutions.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mt-2">
              While I take my work seriously, I also value creating a positive and cheerful environment. I believe a good laugh can go a long way in building strong, collaborative teams.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mt-2">
              I strive to be honest, supportive, and reliable, taking responsibility or leading when needed while contributing and learning with the team.
            </p>
          </BentoCard>

          {/* Currently */}
          <BentoCard className="md:col-span-2" delay={2}>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Currently</p>
            <p className="text-2xl md:text-3xl font-bold text-foreground font-['Space_Grotesk'] mt-2 leading-tight">Building & Learning</p>
            <p className="text-base text-muted-foreground leading-relaxed mt-2 flex-1">
              Most likely working on a personal project. Pursuing <strong className="text-foreground">B.Tech</strong> at PES University, 2025–2029, majoring in CSE (AI/ML).
            </p>
          </BentoCard>

          {/* Connect */}
          <BentoCard className="md:col-span-2" delay={3}>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Connect</p>
            
            <div className="mt-3 flex-1 grid grid-cols-3 gap-2">
              <a href="https://github.com/Thanas-R" target="_blank" rel="noopener noreferrer"
              className="aspect-square rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background transition-all duration-200">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6.1-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.2.9 2.4v3.5c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/thanasr/" target="_blank" rel="noopener noreferrer"
              className="aspect-square rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background transition-all duration-200">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><circle cx="4.983" cy="5.009" r="2.188" /><path d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z" /></svg>
              </a>
              <a href="mailto:thanas5.rd@gmail.com"
              className="aspect-square rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background transition-all duration-200">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="m18.73 5.41-1.28 1L12 10.46 6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64z" /></svg>
              </a>
              <Link to="/resume"
              className="aspect-square rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background transition-all duration-200">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" /></svg>
              </Link>
              <a href="https://open.spotify.com/user/1ruu5bmall8721u0hsnedbbxh" target="_blank" rel="noopener noreferrer"
              className="aspect-square rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background transition-all duration-200">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M12.01 2.019c-5.495 0-9.991 4.496-9.991 9.991 0 5.494 4.496 9.99 9.991 9.99 5.494 0 9.99-4.496 9.99-9.99 0-5.495-4.446-9.991-9.99-9.991zm4.595 14.436c-.199.299-.549.4-.85.201-2.349-1.45-5.296-1.75-8.793-.951-.348.102-.648-.148-.748-.449-.101-.35.149-.648.45-.749 3.795-.85 7.093-.499 9.69 1.1.35.149.4.548.251.848zm1.2-2.747c-.251.349-.7.499-1.051.249-2.697-1.646-6.792-2.148-9.939-1.148-.398.101-.85-.1-.949-.498-.101-.402.1-.852.499-.952 3.646-1.098 8.143-.548 11.239 1.351.3.149.45.648.201.998zm.099-2.799c-3.197-1.897-8.542-2.097-11.59-1.146a.938.938 0 0 1-1.148-.6.937.937 0 0 1 .599-1.151c3.547-1.049 9.392-.85 13.089 1.351.449.249.599.849.349 1.298-.25.35-.849.498-1.299.248z" /></svg>
              </a>
              <a href="#"
              className="aspect-square rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background transition-all duration-200">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z" /></svg>
              </a>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>);

};

export default AboutSection;