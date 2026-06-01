import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft, ArrowRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import Navbar from '@/components/Navbar';
import askPesuUi from '@/assets/project-askpesu-ui.png';
import type { Project } from '@/components/ProjectsSection';

interface Props {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: 'easeOut' as const },
});

const ACCENT = '#ED7C31';

const CORE_CONTRIBUTORS = [
  { name: 'Joshua-Raj', url: 'https://github.com/joshua-rajj' },
  { name: 'Achyuth S.S', url: 'https://github.com/achyu-dev' },
  { name: 'Aditeya Baral', url: 'https://github.com/aditeyabaral' },
];

const OTHER_CONTRIBUTORS = [
  { name: 'Arjun', url: 'https://github.com/arjun-com' },
  { name: 'Shreyas V', url: 'https://github.com/woterr' },
  { name: 'Anmol Vyas', url: 'https://github.com/TheAverageDetective' },
];

const FEATURES = [
  {
    title: 'Instant PESU Answers',
    desc: 'Get quick, verified responses on CGPA rules, ISA policies, faculty notes, admissions, and campus life without scrolling through old threads.',
  },
  {
    title: 'Subreddit-Backed Knowledge',
    desc: 'The knowledge base is sourced from r/PESU. Verified discussions, FAQs and posts feed AskPESU so answers reflect the real student community.',
  },
  {
    title: 'Reduces Redundant Posts',
    desc: 'Common questions get answered instantly, keeping r/PESU a curated, high-quality knowledge repository instead of a general chat forum.',
  },
  {
    title: 'Auto-Updating Corpus',
    desc: 'New subreddit content is continuously aggregated and refreshed into the knowledge base, so AskPESU stays current without manual retraining.',
  },
  {
    title: 'For Current and Prospective Students',
    desc: 'Supports both enrolled students and admission seekers, helping them make informed decisions about academics, life and policy at PESU.',
  },
  {
    title: 'Open Source and Community Driven',
    desc: 'Built and maintained by the PESU Dev team with contributions from students, alumni and developers across the community.',
  },
];

const TECH = [
  { l: 'Frontend', v: 'React, TypeScript, Tailwind CSS' },
  { l: 'Backend', v: 'FastAPI, Python' },
  { l: 'LLM', v: 'RAG Pipeline' },
  { l: 'Infra', v: 'Docker, Hugging Face Spaces' },
  { l: 'Source', v: 'r/PESU Subreddit' },
  { l: 'Team', v: 'PESU Dev' },
];

const AskPesuDetail = ({ project, prevProject, nextProject }: Props) => {
  const { isDark } = useTheme();

  const theme = isDark
    ? {
        pageBg: '#2A2927',
        screenBg: '#252423',
        tvBezel: '#1f1e1c',
        text: '#EEEEEC',
        textMuted: 'rgba(238,238,236,0.62)',
        textSubtle: 'rgba(238,238,236,0.42)',
        cardBg: '#2A2927',
        border: 'rgba(238,238,236,0.10)',
        borderStrong: 'rgba(238,238,236,0.18)',
        askGray: 'rgba(238,238,236,0.85)',
      }
    : {
        pageBg: '#F5F5F4',
        screenBg: '#FFFFFF',
        tvBezel: '#E5E2DC',
        text: '#2D2C2A',
        textMuted: 'rgba(45,44,42,0.65)',
        textSubtle: 'rgba(45,44,42,0.42)',
        cardBg: '#FAFAF9',
        border: 'rgba(45,44,42,0.10)',
        borderStrong: 'rgba(45,44,42,0.18)',
        askGray: 'rgba(45,44,42,0.85)',
      };

  const font = "'Inter', sans-serif";
  const display = "'Capriola', 'Inter', sans-serif";

  // Vintage TV hero - side panel on the LEFT (flipped horizontally)
  const TvFrame = () => (
    <div
      className="relative rounded-[36px] p-5 md:p-7"
      style={{
        background: `linear-gradient(180deg, ${theme.tvBezel} 0%, ${theme.pageBg} 100%)`,
        border: `1px solid ${theme.borderStrong}`,
        boxShadow: isDark
          ? '0 30px 80px -30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)'
          : '0 30px 80px -30px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.6)',
      }}
    >
      <div className="flex gap-5 md:gap-7">
        {/* Left side panel: speaker grille + knobs */}
        <div className="hidden md:flex flex-col justify-between w-20 lg:w-24 py-1">
          {/* Speaker */}
          <div
            className="flex-1 rounded-2xl p-3"
            style={{
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.border}`,
            }}
          >
            <div
              className="w-full h-full rounded-md"
              style={{
                backgroundImage: `radial-gradient(circle, ${theme.borderStrong} 1.4px, transparent 1.6px)`,
                backgroundSize: '8px 8px',
              }}
            />
          </div>
          {/* Knobs */}
          <div className="mt-4 flex flex-col gap-3 items-center">
            {[ACCENT, theme.borderStrong, theme.borderStrong].map((c, i) => (
              <div
                key={i}
                className="relative w-10 h-10 rounded-full"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${theme.cardBg}, ${theme.tvBezel})`,
                  border: `1px solid ${theme.borderStrong}`,
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.15)',
                }}
              >
                <span
                  className="absolute top-1 left-1/2 -translate-x-1/2 w-[3px] h-3 rounded-full"
                  style={{ backgroundColor: c, transform: `rotate(${i * 35}deg) translateX(-50%)` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Screen */}
        <div
          className="relative flex-1 rounded-[22px] overflow-hidden flex items-center justify-center"
          style={{
            backgroundColor: theme.screenBg,
            border: `1px solid ${theme.border}`,
            minHeight: 280,
            boxShadow: `inset 0 0 60px ${isDark ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.05)'}`,
          }}
        >
          {/* CRT scanlines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, ${theme.text} 0px, ${theme.text} 1px, transparent 1px, transparent 3px)`,
            }}
            aria-hidden
          />
          {/* Glow corner */}
          <div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none opacity-50"
            style={{ background: `radial-gradient(circle, ${ACCENT}22, transparent 70%)` }}
            aria-hidden
          />

          <div className="relative z-10 py-12 md:py-20 px-6 text-center">
            <h1
              className="leading-none tracking-tight select-none"
              style={{
                fontFamily: display,
                fontWeight: 400,
                fontSize: 'clamp(53px, 10.45vw, 125px)',
              }}
            >
              <span style={{ color: theme.askGray }}>ask</span>
              <span style={{ color: ACCENT }}>PESU</span>
            </h1>
            <p
              className="mt-4 text-xs md:text-sm uppercase tracking-[0.35em]"
              style={{ color: theme.textSubtle, fontFamily: font }}
            >
              PESU Dev
            </p>
          </div>
        </div>
      </div>

      {/* Bottom plate */}
      <div className="mt-5 flex items-center justify-between gap-4 px-2">
        <span
          className="text-[10px] uppercase tracking-[0.3em]"
          style={{ color: theme.textSubtle, fontFamily: font }}
        >
          PESU Dev / model Huggingface
        </span>
        <div className="flex gap-2">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.borderStrong }} />
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.borderStrong }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.pageBg, color: theme.text }}>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-24">
        {/* Back */}
        <motion.div {...fadeUp(0)}>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity mb-10 no-underline"
            style={{ color: theme.textMuted, fontFamily: font }}
          >
            <ArrowLeft className="w-4 h-4" />
            All Projects
          </Link>
        </motion.div>

        {/* TV Hero */}
        <motion.div {...fadeUp(0.06)} className="mb-12">
          <TvFrame />
        </motion.div>

        {/* Tagline + buttons side by side */}
        <motion.div {...fadeUp(0.12)} className="mb-10 grid md:grid-cols-[1fr_auto] gap-6 md:gap-8 items-start">
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: theme.textMuted, fontFamily: font }}
          >
            askPESU is a RAG pipeline for question answering about PES University. Built by the PESU Dev team as a continuously updated knowledge base for current and prospective students, sourced from verified r/PESU discussions, FAQs and posts. I built the frontend and design.
          </p>
          <div className="flex flex-col gap-3 md:min-w-[160px]">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 no-underline"
                style={{ backgroundColor: ACCENT, color: '#fff', fontFamily: font }}
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-semibold transition-opacity hover:opacity-75 no-underline"
                style={{ borderColor: theme.borderStrong, color: theme.text, fontFamily: font }}
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div {...fadeUp(0.18)} className="flex flex-wrap gap-2 mb-14">
          {(project.detailTags ?? project.tags).map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-3 py-1.5 rounded-full font-medium uppercase tracking-wider border"
              style={{
                borderColor: theme.borderStrong,
                color: theme.textMuted,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Screenshot (16:10 UI) */}
        <motion.div
          {...fadeUp(0.22)}
          className="mb-14 rounded-xl overflow-hidden border"
          style={{ borderColor: theme.border, aspectRatio: '16 / 10' }}
        >
          {project.live ? (
            <a href={project.live} target="_blank" rel="noopener noreferrer">
              <img src={askPesuUi} alt="AskPESU UI preview" className="w-full h-full object-cover" />
            </a>
          ) : (
            <img src={askPesuUi} alt="AskPESU UI preview" className="w-full h-full object-cover" />
          )}
        </motion.div>

        {/* About */}
        <motion.div {...fadeUp(0.24)} className="mb-14">
          <h2
            className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-4"
            style={{ color: theme.textSubtle, fontFamily: font }}
          >
            About
          </h2>
          <p
            className="text-base leading-relaxed mb-4"
            style={{ color: theme.textMuted, fontFamily: font }}
          >
            askPESU is an AI-powered chatbot developed by the PESU Dev team to provide instant, accurate and verified answers to questions related to PES University. It functions as a knowledge base and is specifically designed to assist both current and prospective students with information about academics, campus life, policies, faculty, admissions and more.
          </p>
          <p
            className="text-base leading-relaxed mb-4"
            style={{ color: theme.textMuted, fontFamily: font }}
          >
            The chatbot is powered by a large language model and its knowledge base is continuously updated from content aggregated across the r/PESU subreddit. All the discussions, FAQs and verified posts on the subreddit contribute to updating the AskPESU database, making it a real-time, searchable and reliable source of information that helps reduce repetitive or redundant posts on the subreddit.
          </p>
          <p
            className="text-base leading-relaxed"
            style={{ color: theme.textMuted, fontFamily: font }}
          >
            The team emphasises that users should first search the subreddit, read the FAQs, and use AskPESU only when necessary, so the subreddit remains a curated, high-quality knowledge repository. My contribution is the frontend and design. The backend, pipeline and infrastructure are owned by the PESU Dev team.
          </p>
        </motion.div>

        {/* Key Features */}
        <motion.div {...fadeUp(0.28)} className="mb-14">
          <h2
            className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-5"
            style={{ color: theme.textSubtle, fontFamily: font }}
          >
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="p-5 rounded-xl"
                style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}` }}
              >
                <h3
                  className="text-base font-semibold mb-2"
                  style={{ color: theme.text, fontFamily: font }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: theme.textMuted, fontFamily: font }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div {...fadeUp(0.32)} className="mb-14">
          <h2
            className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-5"
            style={{ color: theme.textSubtle, fontFamily: font }}
          >
            Tech Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {TECH.map((item) => (
              <div
                key={item.l}
                className="p-3.5 rounded-lg"
                style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}` }}
              >
                <p
                  className="text-[10px] uppercase tracking-wider mb-1"
                  style={{ color: theme.textSubtle, fontFamily: font }}
                >
                  {item.l}
                </p>
                <p
                  className="text-[13px] font-medium leading-snug"
                  style={{ color: theme.text, fontFamily: font }}
                >
                  {item.v}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contributors - tiered */}
        <motion.div {...fadeUp(0.34)} className="mb-14">
          <h2
            className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-5"
            style={{ color: theme.textSubtle, fontFamily: font }}
          >
            Contributors
          </h2>
          <div
            className="rounded-xl p-6"
            style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}` }}
          >
            {/* Tier 1: core contributors, bigger */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 mb-5">
              {CORE_CONTRIBUTORS.map((c) => (
                <a
                  key={c.name}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg md:text-xl font-semibold hover:opacity-70 transition-opacity no-underline"
                  style={{ color: ACCENT, fontFamily: font, textDecoration: 'none' }}
                >
                  {c.name}
                </a>
              ))}
            </div>
            {/* Tier 2: other contributors, smaller */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 mb-5">
              {OTHER_CONTRIBUTORS.map((c) => (
                <a
                  key={c.name}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:opacity-70 transition-opacity no-underline"
                  style={{ color: ACCENT, fontFamily: font, textDecoration: 'none' }}
                >
                  {c.name}
                </a>
              ))}
            </div>
            {/* Tier 3: me */}
            <div
              className="pt-5 border-t flex items-center gap-3 flex-wrap"
              style={{ borderColor: theme.border }}
            >
              <span
                className="text-[10px] uppercase tracking-[0.2em]"
                style={{ color: theme.textSubtle, fontFamily: font }}
              >
                And
              </span>
              <a
                href="https://github.com/Thanas-R"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold hover:opacity-70 transition-opacity no-underline"
                style={{ color: ACCENT, fontFamily: font, textDecoration: 'none' }}
              >
                Thanas-R
              </a>
              <span
                className="text-[10px] px-2 py-1 rounded-full border font-medium uppercase tracking-wider"
                style={{
                  borderColor: theme.borderStrong,
                  color: theme.textMuted,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                Frontend &amp; Design
              </span>
            </div>
          </div>
        </motion.div>

        {/* Prev / Next */}
        <motion.div
          {...fadeUp(0.4)}
          className="pt-8 grid grid-cols-2 gap-4"
          style={{ borderTop: `1px solid ${theme.border}` }}
        >
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.id}`}
              className="group flex flex-col gap-1 p-5 rounded-xl no-underline"
              style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}` }}
            >
              <span
                className="text-[11px] uppercase tracking-widest flex items-center gap-1"
                style={{ color: theme.textSubtle, fontFamily: font }}
              >
                <ArrowLeft className="w-3 h-3" /> Previous
              </span>
              <span
                className="text-sm font-semibold group-hover:translate-x-0.5 transition-transform"
                style={{ color: theme.text, fontFamily: font }}
              >
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Link
              to={`/projects/${nextProject.id}`}
              className="group flex flex-col gap-1 p-5 rounded-xl text-right ml-auto w-full no-underline"
              style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}` }}
            >
              <span
                className="text-[11px] uppercase tracking-widest flex items-center justify-end gap-1"
                style={{ color: theme.textSubtle, fontFamily: font }}
              >
                Next <ArrowRight className="w-3 h-3" />
              </span>
              <span
                className="text-sm font-semibold group-hover:-translate-x-0.5 transition-transform"
                style={{ color: theme.text, fontFamily: font }}
              >
                {nextProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AskPesuDetail;
