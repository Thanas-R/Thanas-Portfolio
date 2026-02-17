import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useLanyard } from 'react-use-lanyard';
import avatar from '@/assets/avatar.png';
import { TbBrandGithubFilled } from "react-icons/tb";

const USER_ID = '677174403859087378';

const statusColors: Record<string, string> = {
  online: 'bg-[#43b581]',
  idle: 'bg-[#faa61a]',
  dnd: 'bg-[#f04747]',
  offline: 'bg-[#747f8d]',
};

const socials = [
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
];

const HeroSection = () => {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [hoveredStatus, setHoveredStatus] = useState(false);
  const boundingRef = useRef<DOMRect | null>(null);

  const { status: lanyard } = useLanyard({
    userId: USER_ID,
    socket: true,
  });

  const discordStatus =
    (lanyard?.discord_status as keyof typeof statusColors) || 'offline';

  const statusColor = statusColors[discordStatus];

  const statusLabel =
    discordStatus === 'dnd'
      ? 'Do Not Disturb'
      : discordStatus.charAt(0).toUpperCase() + discordStatus.slice(1);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-6">
      <div className="max-w-5xl w-full mx-auto grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight font-['Space_Grotesk']">
            Thanas{' '}
            <span className="relative inline-block">
              R

              {/* Discord Status Dot */}
              <div
                className="absolute bottom-[0.12em] -right-[0.15em]"
                onMouseEnter={() => setHoveredStatus(true)}
                onMouseLeave={() => setHoveredStatus(false)}
              >
                <span
                  className={`w-3 h-3 md:w-4 md:h-4 rounded-full ring-[5px] ring-background ${statusColor} cursor-pointer`}
                />

                <AnimatePresence>
                  {hoveredStatus && (
                    <motion.div
                      initial={{ x: '-50%', y: 8, opacity: 0, scale: 0 }}
                      animate={{ x: '-50%', y: 0, opacity: 1, scale: 1 }}
                      exit={{ x: '-50%', y: 8, opacity: 0, scale: 0 }}
                      transition={{ duration: 0.1 }}
                      className="absolute bottom-full left-1/2 mb-2 px-3 py-1.5 rounded-md border border-border bg-background/80 backdrop-blur-md text-sm font-medium whitespace-nowrap z-50 shadow-md origin-bottom"
                    >
                      {statusLabel}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-md">
            Developer & creative problem-solver. Building thoughtful digital experiences with code.
          </p>

          <div className="mt-8 flex items-center gap-5">
            {socials.map((s) => (
              <div key={s.label} className="relative">
                <a
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  onMouseEnter={() => setHoveredSocial(s.label)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  {s.icon}
                </a>

                <AnimatePresence>
                  {hoveredSocial === s.label && (
                    <motion.div
                      initial={{ x: '-50%', y: 8, opacity: 0, scale: 0 }}
                      animate={{ x: '-50%', y: 0, opacity: 1, scale: 1 }}
                      exit={{ x: '-50%', y: 8, opacity: 0, scale: 0 }}
                      transition={{ duration: 0.1 }}
                      className="absolute bottom-full left-1/2 mb-2 px-3 py-1.5 rounded-md border border-border bg-background/80 backdrop-blur-md text-sm font-medium whitespace-nowrap z-50 shadow-md origin-bottom"
                    >
                      {s.tooltip}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex justify-center md:justify-end"
        >
          <div style={{ perspective: '800px' }}>
            <div
              onMouseLeave={() => { boundingRef.current = null; }}
              onMouseEnter={(e) => { boundingRef.current = e.currentTarget.getBoundingClientRect(); }}
              onMouseMove={(e) => {
                if (!boundingRef.current) return;
                const x = e.clientX - boundingRef.current.left;
                const y = e.clientY - boundingRef.current.top;
                const xPct = x / boundingRef.current.width;
                const yPct = y / boundingRef.current.height;
                const xRot = (0.5 - yPct) * 20;
                const yRot = (xPct - 0.5) * 20;
                e.currentTarget.style.setProperty('--xRotation', `${xRot}deg`);
                e.currentTarget.style.setProperty('--yRotation', `${yRot}deg`);
              }}
              className="relative w-48 h-48 md:w-60 md:h-60 rounded-2xl transition-transform ease-out hover:[transform:rotateX(var(--xRotation))_rotateY(var(--yRotation))_scale(1.05)] overflow-hidden"
            >
              <img
                src={avatar}
                alt="Thanas R"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
