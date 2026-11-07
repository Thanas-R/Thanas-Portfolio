import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
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
    <span className="inline-flex items-center rounded-md border border-border bg-muted/70 px-2 py-0.5 text-[0.78em] font-medium text-foreground/80 align-middle whitespace-nowrap">
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
        Started by working with Agentic AI and developed a deeper interest in research, now exploring more into Neural Networks and Deep Learning
      </>
    )
  },
  {
    year: '2025',
    description: (
      <>
        Began my B.Tech in CSE (AI/ML) at PES University & started building fun and useful full-stack projects
      </>
    )
  },
  {
    year: '2023',
    description: (
      <>
        Learned C++ and worked on improving my problem solving skills by implementing it in real-world
      </>
    )
  },
  {
    year: '2021',
    description: (
      <>
        Started learning Java, focusing on basic OOP principles and exploring
      </>
    )
  },
  {
    year: '2020',
    description: (
      <>
        Began my programming journey with Python, building hobby applications and scripts for fun 
      </>
    )
  },
];

const educationData = [
  { institution: 'PES University', detail: 'B.Tech CSE (AIML)', years: '2025 - 2029' },
  { institution: 'Allen Career Institute', detail: '11th - 12th Grade', years: '2023 - 2025' },
  { institution: 'Sri Vani Education Centre', detail: '1st - 10th Grade', years: '2013 - 2023' },
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
  <div className="flex items-stretch gap-3 flex-1">
    <div className="flex flex-col items-center">
      {/* Circle dot aligned directly to the center of the year text */}
      <div className="h-4 flex items-center justify-center shrink-0">
        <div
          className={cn(
            'rounded-full',
            isFirst
              ? 'w-2.5 h-2.5 bg-foreground ring-4 ring-card'
              : 'w-2.5 h-2.5 border-[1.5px] border-muted-foreground/50 bg-card'
          )}
        />
      </div>
      {/* Vertical dotted connector line */}
      {!isLast && (
        <div className="w-0 flex-1 border-l-2 border-dotted border-muted-foreground/40 my-1" />
      )}
    </div>
    <div className={cn("flex-1", !isLast ? "pb-4" : "pb-1")}>
      <div className="h-4 flex items-center">
        <p className="text-sm font-bold text-foreground font-['Inter'] leading-none">
          {year}
          {suffix && (
            <span className="ml-1.5 text-sm font-medium italic text-muted-foreground/80 font-['Averia_Serif_Libre']">
              {suffix}
            </span>
          )}
        </p>
      </div>
      <p className="mt-1.5 text-sm text-foreground/80 leading-relaxed font-['Inter']">
        {description}
      </p>
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
              I am a curious developer and student who enjoys building things and solving problems. My interests lie in Machine Learning, Deep Learning, and Full-Stack development. I am always keen to learn, build cool stuff & contribute to OSS
            </p>

            <p className="text-muted-foreground leading-relaxed mt-3 text-base font-['Inter']">
               While I tend to keep my work professional, I always try to create a positive environment. I strive to be honest, supportive, & reliable while also stepping upto lead or take action when needed
            </p>

            <p className="text-muted-foreground leading-relaxed mt-3 text-base font-['Inter']">
               I enjoy meeting new people, having conversations, and picking up something new every day. I also love spending my time playing with my pet turtle  <Link to="/turtle" className="text-emerald-500 hover:text-emerald-400 font-medium underline underline-offset-4 transition-colors">Siri</Link> alot
            </p>
          </BentoCard>

          <BentoCard className="md:col-span-2 md:row-span-2 order-2 md:order-1 flex flex-col justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-['Inter'] mb-4 shrink-0">
              Journey
            </p>
            <div className="flex flex-col justify-between flex-1">
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
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-['Inter'] mb-3">
              Education
            </p>
            <div className="space-y-3">
              {educationData.map((edu, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="font-['Averia_Serif_Libre'] font-bold text-foreground text-base tracking-tight">
                    {edu.institution}
                  </p>

                  <div className="flex items-center justify-between gap-2">
                    <p className="font-['Inter'] text-sm text-muted-foreground">
                      {edu.detail}
                    </p>

                    <span className="inline-flex items-center rounded-md border border-border bg-muted/70 px-2 py-0.5 text-xs font-medium text-foreground/80 font-['JetBrains_Mono'] tabular-nums shrink-0">
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
