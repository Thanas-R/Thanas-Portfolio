import { motion } from 'framer-motion';
import { Calendar, Code, GraduationCap, FileText, Download, ExternalLink, Github, Linkedin, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Marquee from 'react-fast-marquee';
import {
  FaCss3Alt, FaFigma, FaHtml5, FaJs, FaNodeJs, FaPython, FaReact, FaJava,
} from 'react-icons/fa';
import {
  SiCplusplus, SiGit, SiNextdotjs, SiTailwindcss, SiTypescript, SiVercel, SiVite,
} from 'react-icons/si';
import { cn } from '@/lib/utils';

const techIcons = [
  { icon: <FaPython className="w-7 h-7 text-[#3776AB]" />, name: 'Python' },
  { icon: <SiCplusplus className="w-7 h-7 text-[#00599C]" />, name: 'C++' },
  { icon: <FaJava className="w-7 h-7 text-[#ED8B00]" />, name: 'Java' },
  { icon: <FaHtml5 className="w-7 h-7 text-[#E34F26]" />, name: 'HTML5' },
  { icon: <FaCss3Alt className="w-7 h-7 text-[#1572B6]" />, name: 'CSS3' },
  { icon: <FaJs className="w-7 h-7 text-[#F7DF1E]" />, name: 'JavaScript' },
  { icon: <SiTypescript className="w-7 h-7 text-[#3178C6]" />, name: 'TypeScript' },
  { icon: <FaReact className="w-7 h-7 text-[#61DAFB]" />, name: 'React' },
  { icon: <SiNextdotjs className="w-7 h-7 text-foreground" />, name: 'Next.js' },
  { icon: <SiTailwindcss className="w-7 h-7 text-[#06B6D4]" />, name: 'Tailwind' },
  { icon: <SiVite className="w-7 h-7 text-[#646CFF]" />, name: 'Vite' },
  { icon: <FaNodeJs className="w-7 h-7 text-[#339933]" />, name: 'Node.js' },
  { icon: <SiGit className="w-7 h-7 text-[#F05032]" />, name: 'Git' },
  { icon: <SiVercel className="w-7 h-7 text-foreground" />, name: 'Vercel' },
  { icon: <FaFigma className="w-7 h-7 text-[#F24E1E]" />, name: 'Figma' },
  { icon: <SiVite className="w-7 h-7 text-[#007ACC]" />, name: 'VS Code' },
];

const milestones = [
  {
    year: '2025',
    title: 'B.Tech & Production Projects',
    description: 'Started B.Tech in CSE (AI/ML) at PES University. Building production-ready projects.',
    icon: GraduationCap,
  },
  {
    year: '2023',
    title: 'Learning C++',
    description: 'Dove deep into C++, mastering data structures and algorithms.',
    icon: Code,
  },
  {
    year: '2021',
    title: 'Java Journey',
    description: 'Focused on OOP principles and building applications.',
    icon: Code,
  },
  {
    year: '2020',
    title: 'First Steps',
    description: 'Learned Python and created first small applications.',
    icon: Code,
  },
];

const BentoSection = () => {
  const [showResume, setShowResume] = useState(false);
  const resumePath = '/resume.pdf';

  return (
    <section id="about" className="relative px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-min">

            {/* About Me - spans 2 cols */}
            <div className="glow-card p-6 md:col-span-2">
              <h3 className="text-lg font-bold text-foreground font-['Space_Grotesk'] mb-3">About Me</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I am a passionate learner who believes in growing a little every day. I'm genuinely interested in coding and problem-solving, and I enjoy turning complex challenges into simple, effective solutions.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                While I take my work seriously, I also value creating a positive and cheerful environment. I believe a good laugh can go a long way in building strong, collaborative teams. I strive to be honest, supportive, and reliable, taking responsibility or leading when needed.
              </p>
            </div>

            {/* Stats */}
            <div className="glow-card p-6 flex flex-col justify-center">
              <div className="grid grid-cols-1 gap-4">
                <div className="text-center">
                  <span className="text-3xl font-bold text-primary font-['Space_Grotesk']">6+</span>
                  <p className="text-xs text-muted-foreground mt-1">Years Coding</p>
                </div>
                <div className="text-center">
                  <span className="text-3xl font-bold text-primary font-['Space_Grotesk']">6+</span>
                  <p className="text-xs text-muted-foreground mt-1">Projects Built</p>
                </div>
                <div className="text-center">
                  <span className="text-3xl font-bold text-primary font-['Space_Grotesk']">∞</span>
                  <p className="text-xs text-muted-foreground mt-1">Learning Goals</p>
                </div>
              </div>
            </div>

            {/* Tech Stack - full width */}
            <div className="glow-card p-6 md:col-span-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Tech Stack</h3>
              <div className="space-y-3 overflow-hidden">
                <Marquee speed={40} gradient={false} pauseOnHover>
                  {techIcons.map((t, i) => (
                    <div key={`a-${i}`} className="mx-4 flex items-center justify-center w-10 h-10 hover:scale-110 transition-transform" title={t.name}>
                      {t.icon}
                    </div>
                  ))}
                </Marquee>
                <Marquee speed={35} gradient={false} pauseOnHover direction="right">
                  {[...techIcons].reverse().map((t, i) => (
                    <div key={`b-${i}`} className="mx-4 flex items-center justify-center w-10 h-10 hover:scale-110 transition-transform" title={t.name}>
                      {t.icon}
                    </div>
                  ))}
                </Marquee>
              </div>
            </div>

            {/* Journey - spans 2 cols */}
            <div className="glow-card p-6 md:col-span-2">
              <h3 className="text-lg font-bold text-foreground font-['Space_Grotesk'] mb-4">My Journey</h3>
              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 w-px bg-border" />
                <div className="space-y-5">
                  {milestones.map((m, i) => {
                    const Icon = m.icon;
                    return (
                      <div key={i} className="relative pl-10">
                        <div className="absolute left-0 w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center">
                          <Icon className="w-3 h-3 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs font-semibold text-muted-foreground">{m.year}</span>
                          </div>
                          <h4 className="text-sm font-semibold text-foreground">{m.title}</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">{m.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Resume + Links stacked */}
            <div className="flex flex-col gap-4">
              {/* Resume */}
              <div className="glow-card p-5 flex-1" id="resume">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <h3 className="text-sm font-bold text-foreground font-['Space_Grotesk']">Resume</h3>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowResume(!showResume)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-foreground text-xs font-medium hover:bg-foreground hover:text-background transition-all duration-300"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {showResume ? 'Hide' : 'View'}
                  </button>
                  <a
                    href={resumePath}
                    download
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground text-background text-xs font-medium hover:opacity-90 transition-opacity"
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </a>
                </div>
              </div>

              {/* GitHub */}
              <a
                href="https://github.com/Thanas-R"
                target="_blank"
                rel="noopener noreferrer"
                className="glow-card p-4 flex items-center gap-3 group hover:bg-muted/30 transition-colors"
              >
                <Github className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold text-foreground">GitHub</span>
                  <p className="text-xs text-muted-foreground truncate">Thanas-R</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/thanasr/"
                target="_blank"
                rel="noopener noreferrer"
                className="glow-card p-4 flex items-center gap-3 group hover:bg-muted/30 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold text-foreground">LinkedIn</span>
                  <p className="text-xs text-muted-foreground truncate">Thanas R</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Resume Viewer (outside grid) */}
          {showResume && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="mt-4 overflow-hidden"
            >
              <div className="glow-card p-2">
                <iframe src={resumePath} className="w-full h-[600px] md:h-[800px] rounded-lg" title="Resume PDF Viewer" />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default BentoSection;
