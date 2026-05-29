import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import GitHubActivityChart from '@/components/GitHubActivityChart';
import GradientCard from '@/components/GradientCard';

const BentoCard = ({ className, children }: { className?: string; children?: ReactNode }) => (
  <GradientCard className={className}>
    {children}
  </GradientCard>
);

function HighlightTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-muted/70 px-2.5 py-0.5 text-[0.78em] font-medium text-foreground/80 align-middle whitespace-nowrap">
      {children}
    </span>
  );
}

const journeyData = [
  {
    year: '2026',
    suffix: '· Present',
    description: (
      <>
        Adopted agentic <HighlightTag>AI</HighlightTag> tools, refined <HighlightTag>UI/UX</HighlightTag> design skills, and elevated prompt engineering for efficient project delivery.
      </>
    )
  },
  {
    year: '2025',
    description: (
      <>
        Began B.Tech in CSE (AI/ML) at PES University. Started building production-ready projects.
      </>
    )
  },
  {
    year: '2023',
    description: (
      <>
        Focused on <HighlightTag>C++</HighlightTag> and data structures & algorithms, strengthening core CS fundamentals.
      </>
    )
  },
  {
    year: '2021',
    description: (
      <>
        Started learning <HighlightTag>Java</HighlightTag>, focusing on OOP principles and application development.
      </>
    )
  },
  {
    year: '2020',
    description: (
      <>
        First steps in programming with <HighlightTag>Python</HighlightTag>, building small applications and scripts.
      </>
    )
  },
];

const educationData = [
  { institution: 'PES University', detail: 'B.Tech CSE (AIML)', years: '2025 – 2029' },
  { institution: 'Allen Career Institute', detail: '11th – 12th', years: '2023 – 2025' },
  { institution: 'Sri Vani Education Centre', detail: '1st – 10th', years: '2013 – 2023' },
];

const TimelineItem = ({
  year,
  suffix,
  description,
  isFirst,
  isLast
}: {
  year: string;
  suffix?: string;
  description: ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
}) => (
  <div className="flex items-start gap-3">
    <div className="flex flex-col items-center mt-1.5">
      <div className={cn('w-2.5 h-2.5 rounded-full ring-2 ring-card', isFirst ? 'bg-foreground' : 'bg-muted-foreground/40')} />
      {!isLast && <div className="w-px h-8 bg-border mt-1" />}
    </div>
    <div className="flex-1 -mt-0.5">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-['Inter']">
        {year}
        {suffix && <span className="text-foreground/40 normal-case font-['Averia_Serif_Libre']"> {suffix}</span>}
      </p>
      <p className="mt-1 text-sm text-foreground/80 leading-relaxed font-['Inter']">{description}</p>
    </div>
  </div>
);

const AboutSection = () => {
  return (
    <section id="about" className="relative py-12 w-full pt-0">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <BentoCard className="md:col-span-4 min-h-[10rem] order-1 md:order-2">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight font-['Averia_Serif_Libre']">
              About Me
            </h3>

            <p className="text-muted-foreground leading-relaxed mt-3 text-base font-['Inter']">
              I am a passionate learner who believes in growing a little every day. I'm genuinely interested in <HighlightTag>coding and problem-solving</HighlightTag>, and I enjoy turning <HighlightTag>complex challenges</HighlightTag> into simple, effective solutions.
            </p>

            <p className="text-muted-foreground leading-relaxed mt-3 text-base font-['Inter']">
              While I take my work seriously, I also value creating a positive and cheerful environment. I believe a good laugh can go a long way in building strong, collaborative teams.
            </p>

            <p className="text-muted-foreground leading-relaxed mt-3 text-base font-['Inter']">
              I strive to be <HighlightTag>honest</HighlightTag>, <HighlightTag>supportive</HighlightTag>, and <HighlightTag>reliable</HighlightTag>, taking responsibility or leading when needed while contributing and learning with the team.
            </p>
          </BentoCard>

          <BentoCard className="md:col-span-2 md:row-span-2 min-h-[22rem] order-2 md:order-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-['Inter'] mb-4">Journey</p>
            <div className="space-y-4">
              {journeyData.map((item, idx) => (
                <TimelineItem
                  key={item.year}
                  year={item.year}
                  suffix={item.suffix}
                  description={item.description}
                  isFirst={idx === 0}
                  isLast={idx === journeyData.length - 1}
                />
              ))}
            </div>
          </BentoCard>

          <BentoCard className="md:col-span-2 min-h-[8rem] order-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-['Inter'] mb-3">Education</p>
            <div className="space-y-3">
              {educationData.map((edu, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="font-semibold text-foreground font-['Inter'] text-base">
                    {edu.institution}
                  </p>

                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground font-['Inter'] text-sm">
                      {edu.detail}
                    </p>

                    <span className="text-muted-foreground/70 font-['JetBrains_Mono'] text-sm">
                      {edu.years}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          <BentoCard className="md:col-span-2 min-h-[8rem] order-4">
            <GitHubActivityChart />
          </BentoCard>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
