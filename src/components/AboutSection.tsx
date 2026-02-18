import React from 'react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { GlowingEffect } from '@/components/GlowingEffect';
import { Github, Linkedin, Mail, FileText, Phone, Globe } from 'lucide-react';

const BentoCard = ({
  className,
  children



}: {className?: string;children?: ReactNode;}) =>
<div className={cn('relative group rounded-xl border border-border bg-card overflow-hidden p-5', className)}>
    <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={2} disabled={false} />
    <div className="relative z-10 h-full">{children}</div>
  </div>;


const projectCount = 6;

const AboutSection = () => {
  return (
    <section id="about" className="relative py-12 w-full">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">

            {/* Journey — tall left, spans 2 rows */}
            <BentoCard className="md:col-span-2 md:row-span-2 min-h-[22rem]">
              <div className="space-y-5">
                {/* Timeline */}
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
              </div>
            </BentoCard>

            {/* About Me — wide center, row 1 */}
            <BentoCard className="md:col-span-4 min-h-[10rem]">
              <h3 className="text-xl md:text-2xl font-bold text-foreground font-['Space_Grotesk'] tracking-tight">About Me</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                I am a passionate learner who believes in growing a little every day. I'm genuinely interested in coding and problem-solving, and I enjoy turning complex challenges into simple, effective solutions.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                While I take my work seriously, I also value creating a positive and cheerful environment. I believe a good laugh can go a long way in building strong, collaborative teams.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                I strive to be honest, supportive, and reliable, taking responsibility or leading when needed while contributing and learning with the team.
              </p>
            </BentoCard>

            {/* Currently */}
            <BentoCard className="md:col-span-2 min-h-[10rem]">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Currently</p>
              <p className="text-lg font-bold text-foreground font-['Space_Grotesk'] mt-2">Building & Learning</p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                Most likely working on a personal project. Pursuing <strong className="text-foreground">B.Tech</strong> at PES University, 2025–2029, majoring in CSE (AI/ML).
              </p>
            </BentoCard>

            {/* Connect — social links card (replaces Resume card) */}
            <BentoCard className="md:col-span-2 min-h-[10rem]">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Connect</p>
              <p className="text-lg font-bold text-foreground font-['Space_Grotesk'] mt-2">Find Me Online</p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <a href="https://github.com/Thanas-R" target="_blank" rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 p-3 rounded-lg border border-border hover:bg-foreground hover:text-background transition-all duration-300 group/icon">
                  <Github className="w-5 h-5" />
                  <span className="text-[10px] font-medium text-muted-foreground group-hover/icon:text-background">GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/thanasr/" target="_blank" rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 p-3 rounded-lg border border-border hover:bg-foreground hover:text-background transition-all duration-300 group/icon">
                  <Linkedin className="w-5 h-5" />
                  <span className="text-[10px] font-medium text-muted-foreground group-hover/icon:text-background">LinkedIn</span>
                </a>
                <a href="mailto:thanas5.rd@gmail.com"
                className="flex flex-col items-center gap-1.5 p-3 rounded-lg border border-border hover:bg-foreground hover:text-background transition-all duration-300 group/icon">
                  <Mail className="w-5 h-5" />
                  <span className="text-[10px] font-medium text-muted-foreground group-hover/icon:text-background">Email</span>
                </a>
                <a href="tel:+919141944808"
                className="flex flex-col items-center gap-1.5 p-3 rounded-lg border border-border hover:bg-foreground hover:text-background transition-all duration-300 group/icon">
                  <Phone className="w-5 h-5" />
                  <span className="text-[10px] font-medium text-muted-foreground group-hover/icon:text-background">Phone</span>
                </a>
                <Link to="/resume"
                className="flex flex-col items-center gap-1.5 p-3 rounded-lg border border-border hover:bg-foreground hover:text-background transition-all duration-300 group/icon">
                  <FileText className="w-5 h-5" />
                  <span className="text-[10px] font-medium text-muted-foreground group-hover/icon:text-background">Resume</span>
                </Link>
                <a href="https://thanas.vercel.app" target="_blank" rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 p-3 rounded-lg border border-border hover:bg-foreground hover:text-background transition-all duration-300 group/icon">
                  <Globe className="w-5 h-5" />
                  <span className="text-[10px] font-medium text-muted-foreground group-hover/icon:text-background">Website</span>
                </a>
              </div>
            </BentoCard>
          </div>

          {/* Stats row */}
          













        </motion.div>
      </div>
    </section>);

};

export default AboutSection;