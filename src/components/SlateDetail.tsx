import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Github, Sigma, Waves, Activity, Grid3x3, Scan, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import slate1 from '@/assets/slate1.webp';
import slate2 from '@/assets/slate2.webp';
import slate3 from '@/assets/slate3.webp';
import slate4 from '@/assets/slate4.webp';
import slate5 from '@/assets/slate5.webp';
import slate6 from '@/assets/slate6.webp';
import type { Project } from '@/components/ProjectsSection';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: 'easeOut' as const },
});

interface Props {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

const C = {
  bg: '#0B0B10',
  panel: '#12121A',
  panelSoft: '#16161F',
  border: 'rgba(240,234,220,0.09)',
  borderStrong: 'rgba(240,234,220,0.18)',
  text: '#F2EEE3',
  muted: 'rgba(242,238,227,0.6)',
  faint: 'rgba(242,238,227,0.38)',
  accent: '#D8C9A3',
  accentDim: 'rgba(216,201,163,0.55)',
  good: '#7FBF8E',
};

const TABS = [
  { label: '01 3D SPACE', src: slate1, alt: 'SLATE dashboard: 3D state space constellation with metrics panel' },
  { label: '02 2D MAP', src: slate2, alt: 'SLATE 2D orthonormal phase map with cluster annotations' },
  { label: '03 STABILITY', src: slate3, alt: 'SLATE spectral eigenvalue plane inside the unit circle' },
  { label: '04 SURROGATE', src: slate4, alt: 'SLATE surrogate model one step residual error waveform' },
  { label: '05 RREF', src: slate5, alt: 'SLATE reduced row echelon form analysis of the latent matrix' },
  { label: '06 PREDICTION', src: slate6, alt: 'SLATE prediction view tracking forecast against real PM2.5 observations' },
];

const MODULES = [
  { icon: Grid3x3, title: '3D Constellation', desc: 'The eight dimensional hidden state of the RNN rendered as an orbiting constellation you can rotate in space.' },
  { icon: Scan, title: '2D Phase Portrait', desc: 'Orthonormal QR bases project the dynamics onto a 2D map that preserves geometry.' },
  { icon: Activity, title: 'Spectral Plane', desc: 'Eigenvalues of the surrogate recurrence plotted against the unit circle for a stability read.' },
  { icon: Waves, title: 'Surrogate Residuals', desc: 'A least squares linear model of the recurrence and its one step residual errors.' },
  { icon: Sigma, title: 'RREF Analysis', desc: 'SymPy reduced row echelon form probes latent coordinates for redundancy.' },
  { icon: TrendingUp, title: 'Prediction Tracking', desc: 'Forecast output traced against real air quality observations over time.' },
];

const FACTS = [
  { k: 'Data', v: '720 hrs air quality' },
  { k: 'Hidden state', v: '8 dimensions' },
  { k: 'Basis', v: 'QR orthonormal' },
  { k: 'Stack', v: 'NumPy, SciPy, SymPy' },
];

const SlateDetail = ({ project, prevProject, nextProject }: Props) => {
  const [tab, setTab] = useState(0);
  const mono = "'JetBrains Mono', monospace";
  const display = "'Space Grotesk', sans-serif";

  // Preload every tab image so tab changes are instant
  useEffect(() => {
    TABS.forEach((t) => {
      if (!t.src) return;
      const img = new Image();
      img.decoding = 'async';
      img.src = t.src;
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = t.src;
      document.head.appendChild(link);
    });
  }, []);

  const activeTab = TABS[tab];

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: C.bg }}>
      {/* faint blueprint grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(240,234,220,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(240,234,220,0.035) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10">
        <Navbar forceDark />

        <div className="max-w-5xl mx-auto px-6 pt-12 pb-24">
          <motion.div {...fadeUp(0)}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity mb-10"
              style={{ color: C.muted, fontFamily: mono }}
            >
              <ArrowLeft className="w-4 h-4" />
              All Projects
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div {...fadeUp(0.06)} className="mb-10">
            <p className="text-[11px] uppercase tracking-[0.25em] mb-3" style={{ color: C.accentDim, fontFamily: mono }}>
              MFADS Mini Project · Semester 3 Mathematics
            </p>
            <h1
              className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-3"
              style={{ fontFamily: display, color: C.text }}
            >
              SLATE
            </h1>
            <p className="text-lg md:text-xl mb-4" style={{ color: C.muted, fontFamily: mono }}>
              Spectral Latent Analysis & Trajectory Exploration
            </p>
            <p className="text-base leading-relaxed max-w-2xl mb-6" style={{ color: C.muted }}>
              An interactive mathematical research framework that investigates the internal state space of
              recurrent neural networks using linear algebra, discrete dynamical systems and spectral theory.
              Built for a semester 3 mathematics course, it turns hidden states into things you can orbit,
              project and decompose.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                  style={{ backgroundColor: C.panel, border: `1px solid ${C.borderStrong}`, color: C.text }}
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
              <span
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs"
                style={{ border: `1px dashed ${C.borderStrong}`, color: C.faint, fontFamily: mono }}
              >
                Not hosted · runs locally
              </span>
            </div>
          </motion.div>

          {/* Terminal window with clickable tab strip */}
          <motion.div {...fadeUp(0.12)} className="mb-14">
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${C.borderStrong}`, backgroundColor: C.panel, boxShadow: '0 30px 80px -30px rgba(0,0,0,0.7)' }}
            >
              {/* macOS traffic lights + tab strip in one titlebar row */}
              <div
                className="flex items-center px-4 py-2.5 overflow-x-auto"
                style={{ borderBottom: `1px solid ${C.border}`, backgroundColor: C.panelSoft }}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full mr-1 shrink-0 transition-transform hover:scale-110 cursor-default"
                  style={{ backgroundColor: '#FF5F57', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.12)' }}
                  aria-hidden
                />
                <span
                  className="w-3.5 h-3.5 rounded-full mr-1 shrink-0 transition-transform hover:scale-110 cursor-default"
                  style={{ backgroundColor: '#FEBC2E', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.12)' }}
                  aria-hidden
                />
                <span
                  className="w-3.5 h-3.5 rounded-full mr-4 shrink-0 transition-transform hover:scale-110 cursor-default"
                  style={{ backgroundColor: '#28C840', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.12)' }}
                  aria-hidden
                />
                {TABS.map((t, i) => (
                  <button
                    key={t.label}
                    onClick={() => setTab(i)}
                    className="px-3 py-1.5 rounded-md text-[10px] whitespace-nowrap tracking-wider transition-colors"
                    style={{
                      fontFamily: mono,
                      color: i === tab ? C.bg : C.faint,
                      backgroundColor: i === tab ? C.accent : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <img
                src={activeTab.src}
                alt={activeTab.alt}
                className="w-full block"
                draggable={false}
              />
            </div>
            <p className="mt-2 text-[10px] text-center" style={{ color: C.faint, fontFamily: mono }}>
              click a tab above to switch views
            </p>
          </motion.div>

          {/* Six modules */}
          <motion.div {...fadeUp(0.16)} className="mb-14">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: C.faint, fontFamily: mono }}>
              What it does
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {MODULES.map((m) => (
                <div
                  key={m.title}
                  className="rounded-xl p-5 transition-colors"
                  style={{ backgroundColor: C.panel, border: `1px solid ${C.border}` }}
                >
                  <m.icon className="w-5 h-5 mb-3" style={{ color: C.accent }} />
                  <h3 className="font-bold mb-1.5" style={{ fontFamily: display, color: C.text }}>{m.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* The math */}
          <motion.div
            {...fadeUp(0.2)}
            className="rounded-2xl p-6 md:p-10 mb-10"
            style={{ backgroundColor: C.panel, border: `1px solid ${C.border}` }}
          >
            <h2 className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: C.faint, fontFamily: mono }}>
              The math
            </h2>
            <div
              className="rounded-xl p-5 mb-6 overflow-x-auto"
              style={{ backgroundColor: C.bg, border: `1px dashed ${C.borderStrong}`, fontFamily: mono }}
            >
              <p className="text-lg md:text-xl" style={{ color: C.accent }}>
                h(t+1) = tanh(W·h(t) + U·x(t) + b)
              </p>
              <p className="text-xs mt-2" style={{ color: C.faint }}>
                {'λ = eig(W surrogate) · ρ = max|λ| · stability ⇔ ρ < 1'}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-sm leading-relaxed" style={{ color: C.muted }}>
              <div>
                <p className="font-semibold mb-1.5" style={{ color: C.text }}>Spectral analysis</p>
                Eigenvalues of the linearised recurrence are plotted on the complex plane. A spectral radius
                inside the unit circle means the hidden dynamics settle instead of exploding.
              </div>
              <div>
                <p className="font-semibold mb-1.5" style={{ color: C.text }}>Orthonormal projection</p>
                QR decomposition builds orthonormal bases so the 3D and 2D views are honest projections of the
                full state space, not squashed ones.
              </div>
              <div>
                <p className="font-semibold mb-1.5" style={{ color: C.text }}>RREF redundancy</p>
                Reduced row echelon form on the latent coordinate matrix reveals which hidden dimensions carry
                independent information.
              </div>
            </div>
          </motion.div>

          {/* Facts + stack */}
          <motion.div {...fadeUp(0.24)} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {FACTS.map((f) => (
              <div
                key={f.k}
                className="rounded-xl p-5"
                style={{ backgroundColor: C.panel, border: `1px solid ${C.border}` }}
              >
                <p className="text-[10px] uppercase tracking-widest mb-1.5" style={{ color: C.faint, fontFamily: mono }}>{f.k}</p>
                <p className="font-semibold" style={{ fontFamily: display, color: C.text }}>{f.v}</p>
              </div>
            ))}
          </motion.div>

          <motion.div {...fadeUp(0.28)} className="mb-14">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: C.faint, fontFamily: mono }}>
              Built with
            </h2>
            <div className="flex flex-wrap gap-2">
              {['Python', 'NumPy', 'SciPy', 'SymPy', 'pandas', 'FastAPI', 'Three.js', 'Streamlit', 'Matplotlib'].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-full text-xs"
                  style={{ border: `1px solid ${C.borderStrong}`, color: C.muted, fontFamily: mono }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Credits */}
          <motion.div
            {...fadeUp(0.3)}
            className="rounded-2xl p-6 md:p-8 mb-16"
            style={{ backgroundColor: C.panel, border: `1px solid ${C.border}` }}
          >
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.faint, fontFamily: mono }}>
              Credits
            </h2>
            <div className="space-y-2 text-sm" style={{ color: C.muted }}>
              <p>
                <span style={{ color: C.faint }}>Dev:</span>{' '}
                <span style={{ color: C.text, fontWeight: 600 }}>Thanas R</span>
              </p>
              <p>
                <span style={{ color: C.faint }}>Team:</span>{' '}
                <span style={{ color: C.text, fontWeight: 600 }}>Sumant Shastri · Sudhanva Y K · Sourabh B K</span>
              </p>
            </div>
          </motion.div>

          {/* Prev / next */}
          <motion.div
            {...fadeUp(0.32)}
            className="border-t pt-8 grid grid-cols-2 gap-4"
            style={{ borderColor: C.border }}
          >
            {prevProject ? (
              <Link
                to={`/projects/${prevProject.id}`}
                className="group flex flex-col gap-1 p-5 rounded-xl transition-colors"
                style={{ backgroundColor: C.panel, border: `1px solid ${C.border}` }}
              >
                <span className="text-xs uppercase tracking-widest flex items-center gap-1" style={{ color: C.faint, fontFamily: mono }}>
                  <ArrowLeft className="w-3 h-3" /> Previous
                </span>
                <span className="text-sm font-bold group-hover:translate-x-0.5 transition-transform" style={{ color: C.muted, fontFamily: display }}>
                  {prevProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link
                to={`/projects/${nextProject.id}`}
                className="group flex flex-col gap-1 p-5 rounded-xl transition-colors text-right ml-auto w-full"
                style={{ backgroundColor: C.panel, border: `1px solid ${C.border}` }}
              >
                <span className="text-xs uppercase tracking-widest flex items-center justify-end gap-1" style={{ color: C.faint, fontFamily: mono }}>
                  Next <ArrowRight className="w-3 h-3" />
                </span>
                <span className="text-sm font-bold group-hover:-translate-x-0.5 transition-transform" style={{ color: C.muted, fontFamily: display }}>
                  {nextProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SlateDetail;
