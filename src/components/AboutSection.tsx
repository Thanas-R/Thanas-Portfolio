import React from 'react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { GlowingEffect } from '@/components/GlowingEffect';
import { TbBrandGithubFilled } from 'react-icons/tb';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const BentoCard = ({ className, children }: { className?: string; children?: ReactNode }) => (
  <div className={cn('relative group rounded-xl border-[0.65px] border-border bg-card overflow-hidden p-5', className)}>
    {/* reduced glow borderWidth -> 1 */}
    <GlowingEffect spread={40} proximity={64} borderWidth={1} disabled={false} />
    <div className="relative z-10 h-full">{children}</div>
  </div>
);

const socialIcons = [
  {
    label: 'GitHub',
    href: 'https://github.com/Thanas-R',
    tooltip: 'Thanas-R',
    icon: <TbBrandGithubFilled className="w-7 h-7" />,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/thanasr/',
    tooltip: 'Thanas R',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="4.983" cy="5.009" r="2.188" />
        <path d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:thanas5.rd@gmail.com',
    tooltip: 'thanas5.rd@gmail.com',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="m18.73 5.41-1.28 1L12 10.46 6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64z" />
      </svg>
    ),
  },
  {
    label: 'Spotify',
    href: 'https://open.spotify.com/user/1ruu5bmall8721u0hsnedbbxh',
    tooltip: 'Spotify',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.01 2.019c-5.495 0-9.991 4.496-9.991 9.991 0 5.494 4.496 9.99 9.991 9.99 5.494 0 9.99-4.496 9.99-9.99 0-5.495-4.446-9.991-9.99-9.991zm4.595 14.436c-.199.299-.549.4-.85.201-2.349-1.45-5.296-1.75-8.793-.951-.348.102-.648-.148-.748-.449-.101-.35.149-.648.45-.749 3.795-.85 7.093-.499 9.69 1.1.35.149.4.548.251.848zm1.2-2.747c-.251.349-.7.499-1.051.249-2.697-1.646-6.792-2.148-9.939-1.148-.398.101-.85-.1-.949-.498-.101-.402.1-.852.499-.952 3.646-1.098 8.143-.548 11.239 1.351.3.149.45.648.201.998zm.099-2.799c-3.197-1.897-8.542-2.097-11.59-1.146a.938.938 0 0 1-1.148-.6.937.937 0 0 1 .599-1.151c3.547-1.049 9.392-.85 13.089 1.351.449.249.599.849.349 1.298-.25.35-.849.498-1.299.248z" />
      </svg>
    ),
  },
  {
    label: 'Discord',
    href: '#',
    tooltip: 'darkspacepirate',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z" />
      </svg>
    ),
  },
  {
    label: 'Resume',
    href: '/resume',
    tooltip: 'View Resume',
    isInternal: true,
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
      </svg>
    ),
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative py-12 w-full pt-0">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">

            {/* Journey — timeline, spans 2 rows */}
            <BentoCard className="md:col-span-2 md:row-span-2 min-h-[22rem]">
              <div className="relative pl-6 space-y-5">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

                <div className="relative">
                  <div className="absolute left-[-22px] top-1.5 w-3 h-3 rounded-full bg-foreground ring-2 ring-card" />
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-poppins">2026 <span className="text-foreground/40 normal-case font-quicksand">· Present</span></p>
                  <p className="mt-1 text-sm text-foreground/80 leading-relaxed font-quicksand">
                    Adopted agentic AI tools, refined <strong className="text-foreground">UI/UX design</strong> skills, and elevated prompt engineering for efficient project delivery.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute left-[-22px] top-1.5 w-2.5 h-2.5 rounded-full bg-muted-foreground/50 ring-2 ring-card" />
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-poppins">2025</p>
                  <p className="mt-1 text-sm text-foreground/80 leading-relaxed font-quicksand">
                    Began <strong className="text-foreground">B.Tech in CSE (AI/ML)</strong> at PES University. Started building production-ready projects.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute left-[-22px] top-1.5 w-2.5 h-2.5 rounded-full bg-muted-foreground/40 ring-2 ring-card" />
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-poppins">2023</p>
                  <p className="mt-1 text-sm text-foreground/80 leading-relaxed font-quicksand">
                    Focused on <strong className="text-foreground">C++</strong> and data structures & algorithms, strengthening core CS fundamentals.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute left-[-22px] top-1.5 w-2.5 h-2.5 rounded-full bg-muted-foreground/30 ring-2 ring-card" />
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-poppins">2021</p>
                  <p className="mt-1 text-sm text-foreground/80 leading-relaxed font-quicksand">
                    Started learning <strong className="text-foreground">Java</strong>, focusing on OOP principles and application development.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute left-[-22px] top-1.5 w-2.5 h-2.5 rounded-full bg-muted-foreground/20 ring-2 ring-card" />
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-poppins">2020</p>
                  <p className="mt-1 text-sm text-foreground/80 leading-relaxed font-quicksand">
                    First steps in programming with <strong className="text-foreground">Python</strong>, building small applications and scripts.
                  </p>
                </div>
              </div>
            </BentoCard>

            {/* About Me — wide center */}
            <BentoCard className="md:col-span-4 min-h-[10rem]">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground font-poppins tracking-tight">About Me</h3>
              <p className="text-muted-foreground leading-relaxed mt-3 text-base font-quicksand">
                I am a passionate learner who believes in growing a little every day. I'm genuinely interested in coding and problem-solving, and I enjoy turning complex challenges into simple, effective solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3 text-base font-quicksand">
                While I take my work seriously, I also value creating a positive and cheerful environment. I believe a good laugh can go a long way in building strong, collaborative teams.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3 text-base font-quicksand">
                I strive to be honest, supportive, and reliable, taking responsibility or leading when needed while contributing and learning with the team.
              </p>
            </BentoCard>

            {/* Currently */}
            <BentoCard className="md:col-span-2 min-h-[10rem]">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-poppins">Currently</p>
              <p className="text-xl font-bold text-foreground font-quicksand mt-2">Building & Learning</p>
              <p className="text-muted-foreground leading-relaxed mt-2 text-lg font-quicksand">
                Most likely working on a personal project. Pursuing <strong className="text-foreground">B.Tech</strong> at PES University, 2025–2029, majoring in CSE (AI/ML).
              </p>
            </BentoCard>

            {/* Connect — bigger icons, no boxes, with tooltips */}
            <BentoCard className="md:col-span-2 min-h-[10rem]">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-poppins">Connect</p>
              <p className="text-xl font-bold text-foreground font-poppins mt-2">Find Me Online</p>
              <TooltipProvider delayDuration={100}>
                <div className="mt-4 flex items-center gap-4 flex-wrap">
                  {socialIcons.map((s) => (
                    <Tooltip key={s.label}>
                      <TooltipTrigger asChild>
                        {s.isInternal ? (
                          <Link
                            to={s.href}
                            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                            aria-label={s.label}
                          >
                            {s.icon}
                          </Link>
                        ) : (
                          <a
                            href={s.href}
                            target={s.href.startsWith('http') ? '_blank' : undefined}
                            rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                            aria-label={s.label}
                          >
                            {s.icon}
                          </a>
                        )}
                      </TooltipTrigger>
                      <TooltipContent side="top" className="font-poppins text-sm">
                        {s.tooltip}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            </BentoCard>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
