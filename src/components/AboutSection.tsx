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
  return;














































































};

export default AboutSection;