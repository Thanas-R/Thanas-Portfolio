import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useLanyard } from 'react-use-lanyard';
import avatar from '@/assets/avatar.png';
import { TbBrandGithubFilled } from "react-icons/tb";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import { BsTwitterX } from "react-icons/bs";
import { SiMedium } from "react-icons/si";
import { SiHuggingface } from "react-icons/si";

const USER_ID = '677174403859087378';

const statusColors: Record<string, string> = {
  online: 'bg-[#43b581]',
  idle: 'bg-[#faa61a]',
  dnd: 'bg-[#f04747]',
  offline: 'bg-[#747f8d]'
};

const statusLabels: Record<string, string> = {
  online: 'Online on Discord',
  idle: 'Idle on Discord',
  dnd: 'Do Not Disturb',
  offline: 'Offline'
};

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/Thanas-R',
    tooltip: 'Thanas-R',
    icon: <TbBrandGithubFilled className="w-8 h-8" />
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/thanasr/',
    tooltip: 'Thanas R',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="4.983" cy="5.009" r="2.188" />
        <path d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z" />
      </svg>
    )
  },
  {
    label: 'Email',
    href: 'mailto:thanas5.rd@gmail.com',
    tooltip: 'thanas5.rd@gmail.com',
    icon: (
      <svg className="w-8.2 h-8.2" viewBox="0 0 24 24" fill="currentColor">
        <path d="m18.73 5.41-1.28 1L12 10.46 6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64z" />
      </svg>
    )
  },
  {
    label: 'Spotify',
    href: 'https://open.spotify.com/user/1ruu5bmall8721u0hsnedbbxh',
    tooltip: 'Spotify',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.01 2.019c-5.495 0-9.991 4.496-9.991 9.991 0 5.494 4.496 9.99 9.991 9.99 5.494 0 9.99-4.496 9.99-9.99 0-5.495-4.446-9.991-9.99-9.991z" />
      </svg>
    )
  },
  {
    label: 'Discord',
    href: 'https://discord.com/users/677174403859087378',
    tooltip: 'darkspacepirate',
    icon: (
      <svg className="w-8.5 h-8.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59z" />
      </svg>
    )
  },
  {
    label: 'Medium',
    href: 'https://medium.com/@thanas',
    tooltip: '@thanas',
    icon: <SiMedium className="w-8 h-8" />
  },
  {
    label: 'Hugging Face',
    href: 'https://huggingface.co/Thanas-R',
    tooltip: 'Thanas-R',
    icon: <SiHuggingface className="w-8 h-8" />
  },
  {
    label: 'X',
    href: 'https://twitter.com/thanas007',
    tooltip: '@thanas007',
    icon: <BsTwitterX className="w-8.5 h-8.5" />
  }
];

const HeroSection = () => {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const boundingRef = useRef<DOMRect | null>(null);
  const isMobile = useIsMobile();

  const { status: lanyard } = useLanyard({
    userId: USER_ID,
    socket: true
  });

  const discordStatus = lanyard?.discord_status || 'offline';
  const statusColor = statusColors[discordStatus] || statusColors.offline;
  const statusLabel = statusLabels[discordStatus] || statusLabels.offline;

  return (
    <section className="relative min-h-[42vh] flex items-center justify-center px-6 pt-[86px] xl:pt-[120px] 2xl:pt-[150px] pb-[86px]">
      <div className="max-w-[61rem] w-full grid md:grid-cols-2 gap-10 items-center px-0 mx-0">
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[0.9] tracking-tight font-['Space_Grotesk']">
            Thanas{' '}
            <span className="relative inline-block">
              R
              <TooltipProvider delayDuration={isMobile ? 0 : 150} skipDelayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {isMobile ? (
                      <button
                        className={`absolute bottom-[0px] right-[-9px] w-3 h-3 md:bottom-[0.08em] md:-right-[0.12em] md:w-4 md:h-4 rounded-full ring-[3.5px] ring-background ${statusColor} cursor-pointer transition-colors duration-300 border-0 p-0`}
                        aria-label={statusLabel}
                      />
                    ) : (
                      <span
                        className={`absolute bottom-[0px] right-[-9px] w-3 h-3 md:bottom-[0.08em] md:-right-[0.12em] md:w-4 md:h-4 rounded-full ring-[3.5px] ring-background ${statusColor} cursor-pointer transition-colors duration-300`}
                        aria-label={statusLabel}
                      />
                    )}
                  </TooltipTrigger>
                  <TooltipContent side="top" className="font-['Inter'] tracking-normal">
                    {statusLabel}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
            Developer & creative problem-solver. Building thoughtful digital experiences with code.
          </p>
<div className="mt-8 flex items-center gap-5">
  {socials.map((s) => {
    return (
      <div key={s.label} className="relative group">
        {isMobile ? (
          // Mobile: just clickable link, no tooltip
          <a
            href={s.href}
            target={s.href.startsWith('http') ? '_blank' : undefined}
            rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            aria-label={s.label}
          >
            {s.icon}
          </a>
        ) : (
          // Desktop: keep existing tooltip logic
          <>
            <a
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label={s.label}
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
                  className="absolute bottom-full left-1/2 mb-2 px-3 py-1.5 rounded-md border border-border bg-background/80 backdrop-blur-md text-sm font-medium text-foreground whitespace-nowrap z-50 shadow-md font-['Inter'] origin-bottom"
                >
                  {s.tooltip}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    );
  })}
</div>
        </motion.div>

        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0, 1] }}
          className="flex justify-center md:justify-end">
          
          <div style={{ perspective: '800px' }}>
            <div
              onMouseLeave={() => {boundingRef.current = null;}}
              onMouseEnter={(e) => {boundingRef.current = e.currentTarget.getBoundingClientRect();}}
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
              className="relative w-56 h-56 md:w-72 md:h-72 rounded-2xl transition-transform ease-out hover:[transform:rotateX(var(--xRotation))_rotateY(var(--yRotation))_scale(1.05)] overflow-hidden border border-border bg-card"
              style={{
                boxShadow: '0 0 0 1px hsl(var(--border)), 0 0 15px -3px hsl(var(--foreground) / 0.08)',
              }}
            >
              <img
                src={avatar}
                alt="Thanas R"
                className="w-full h-full object-cover"
                style={{ imageRendering: 'pixelated' }}
                loading="eager" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
