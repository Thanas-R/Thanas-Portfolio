import { motion } from 'framer-motion';
import { Code2, Users, Rocket, Github, Linkedin, ArrowRight, FileText, Award, Briefcase } from 'lucide-react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const BentoCard = ({
  name,
  className,
  Icon,
  children,
  href,
  cta,
  isRouterLink








}: {name: string;className?: string;Icon?: any;children?: ReactNode;href?: string;cta?: string;isRouterLink?: boolean;}) =>
<div className={cn('glow-card group relative flex flex-col justify-between p-5 overflow-hidden', className)}>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-foreground/[.03]" />
    <div className="relative z-10 flex-1">
      {Icon}
      <h3 className="text-base font-semibold text-foreground font-['Space_Grotesk']">{name}</h3>
      <div className="mt-1">{children}</div>
    </div>
    {href && cta &&
  <div className="relative z-10 mt-3 opacity-0 translate-y-4 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {isRouterLink ?
    <Link to={href} className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
            {cta} <ArrowRight className="w-3 h-3" />
          </Link> :

    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
            {cta} <ArrowRight className="w-3 h-3" />
          </a>
    }
      </div>
  }
  </div>;


const projectCount = 6;

const AboutSection = () => {
  return (
    <section id="about" className="relative py-12 w-full">
      <div className="w-full px-0">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}>

          {/* Bento Grid — edge-to-edge, matching wireframe layout */}
          {/* Row 1: Journey (tall) | About Me (wide) | Certifications (tall) */}
          {/* Row 2: Currently | Resume | Stats row */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 px-4 md:px-0">

            {/* Journey — tall left, spans 2 rows */}
            <BentoCard
              name="Journey"
              Icon={Rocket}
              className="md:col-span-1 md:row-span-2 min-h-[20rem]">

              <div className="mt-2 space-y-4 text-sm text-muted-foreground">
                <div>
                  <span className="text-foreground font-semibold font-['Space_Grotesk']">2026</span>
                  <span className="text-xs ml-2 text-muted-foreground">(current)</span>
                  <p className="mt-0.5 leading-relaxed">Adopted agentic AI tools, refined UI/UX design skills, learned API integration, and elevated prompt engineering — enabling efficient vibe-coded projects.</p>
                </div>
                <div>
                  <span className="text-foreground font-semibold font-['Space_Grotesk']">2025</span>
                  <p className="mt-0.5 leading-relaxed">Began B.Tech in CSE (AI/ML) at PES University. Started building production-ready projects.</p>
                </div>
                <div>
                  <span className="text-foreground font-semibold font-['Space_Grotesk']">2023</span>
                  <p className="mt-0.5 leading-relaxed">Focused on C++ and data structures & algorithms, strengthening core CS fundamentals.</p>
                </div>
                <div>
                  <span className="text-foreground font-semibold font-['Space_Grotesk']">2021</span>
                  <p className="mt-0.5 leading-relaxed">Began learning Java, exploring object-oriented programming and application development.</p>
                </div>
                <div>
                  <span className="text-foreground font-semibold font-['Space_Grotesk']">2020</span>
                  <p className="mt-0.5 leading-relaxed">First steps in programming with Python — building small applications and scripts.</p>
                </div>
              </div>
            </BentoCard>

            {/* About Me — wide center, row 1 */}
            <BentoCard
              name="About Me"
              Icon={Users}
              className="md:col-span-3 min-h-[14rem]">

              <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                I am a passionate learner who believes in growing a little every day. I'm genuinely interested in coding and problem-solving, and I enjoy turning complex challenges into simple, effective solutions.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                While I take my work seriously, I also value creating a positive and cheerful environment. I believe a good laugh can go a long way in building strong, collaborative teams.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                I strive to be honest, supportive, and reliable — taking responsibility or leading when needed while contributing and learning with the team.
              </p>
            </BentoCard>

            {/* Certifications — tall right, spans 2 rows */}
            <BentoCard
              name="Certifications"
              Icon={Award}
              className="md:col-span-2 md:row-span-2 min-h-[20rem]">

              <p className="text-sm text-muted-foreground mt-2 italic">Coming soon...</p>
            </BentoCard>

            {/* Currently — bottom left area */}
            <BentoCard
              name="Currently"
              Icon={Briefcase}
              className="md:col-span-2 min-h-[10rem]">

              <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                Most likely working on a personal project. Pursuing B.Tech degree at PES University, 2025–2029, majoring in CSE (AI/ML).
              </p>
            </BentoCard>

            {/* Resume — small card */}
            <BentoCard
              name="Resume"
              Icon={FileText}
              className="md:col-span-1 min-h-[10rem]"
              href="/resume"
              cta="View Resume"
              isRouterLink>

              <p className="text-sm text-muted-foreground mt-1">View & download my resume.</p>
            </BentoCard>
          </div>

          {/* Stats row — bottom bar, edge-to-edge */}
          <div className="grid grid-cols-3 gap-4 mt-4 px-4 md:px-0">
            <div className="glow-card p-5 text-center">
              <p className="text-2xl md:text-3xl font-bold text-foreground font-['Space_Grotesk']">6+</p>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">Years of Coding</p>
            </div>
            <div className="glow-card p-5 text-center">
              <p className="text-2xl md:text-3xl font-bold text-foreground font-['Space_Grotesk']">{projectCount}</p>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">Projects Built</p>
            </div>
            <div className="glow-card p-5 text-center">
              <p className="text-2xl md:text-3xl font-bold text-foreground font-['Space_Grotesk']">∞</p>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">Learning Goals</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default AboutSection;