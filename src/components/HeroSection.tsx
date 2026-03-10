import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useLanyard } from 'react-use-lanyard';
import avatar from '@/assets/avatar.png';
import { TbBrandGithubFilled } from "react-icons/tb";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
  icon:
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="4.983" cy="5.009" r="2.188" />
        <path d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z" />
      </svg>

},
{
  label: 'Email',
  href: 'mailto:thanas5.rd@gmail.com',
  tooltip: 'thanas5.rd@gmail.com',
  icon:
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="m18.73 5.41-1.28 1L12 10.46 6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64z" />
      </svg>

},
{
  label: 'Spotify',
  href: 'https://open.spotify.com/user/1ruu5bmall8721u0hsnedbbxh',
  tooltip: 'Spotify',
  icon:
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.01 2.019c-5.495 0-9.991 4.496-9.991 9.991 0 5.494 4.496 9.99 9.991 9.99 5.494 0 9.99-4.496 9.99-9.99 0-5.495-4.446-9.991-9.99-9.991zm4.595 14.436c-.199.299-.549.4-.85.201-2.349-1.45-5.296-1.75-8.793-.951-.348.102-.648-.148-.748-.449-.101-.35.149-.648.45-.749 3.795-.85 7.093-.499 9.69 1.1.35.149.4.548.251.848zm1.2-2.747c-.251.349-.7.499-1.051.249-2.697-1.646-6.792-2.148-9.939-1.148-.398.101-.85-.1-.949-.498-.101-.402.1-.852.499-.952 3.646-1.098 8.143-.548 11.239 1.351.3.149.45.648.201.998zm.099-2.799c-3.197-1.897-8.542-2.097-11.59-1.146a.938.938 0 0 1-1.148-.6.937.937 0 0 1 .599-1.151c3.547-1.049 9.392-.85 13.089 1.351.449.249.599.849.349 1.298-.25.35-.849.498-1.299.248z" />
      </svg>

},
{
  label: 'Discord',
  href: '#',
  tooltip: 'darkspacepirate',
  icon:
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z" />
      </svg>

}];


const HeroSection = () => {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const boundingRef = useRef<DOMRect | null>(null);

  const { status: lanyard } = useLanyard({
    userId: USER_ID,
    socket: true
  });

  const discordStatus = lanyard?.discord_status || 'offline';
  const statusColor = statusColors[discordStatus] || statusColors.offline;
  const statusLabel = statusLabels[discordStatus] || statusLabels.offline;

  return (
    <section className="relative min-h-[42vh] flex items-center justify-center px-6 pt-[86px] xl:pt-[120px] 2xl:pt-[150px] pb-[86px]">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 items-center px-0 mx-0">
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[0.9] tracking-tight font-['Space_Grotesk']">
            Thanas{' '}
            <span className="relative inline-block">
              R
              <TooltipProvider delayDuration={150} skipDelayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                     <span
                      className={`absolute bottom-[-3px] right-[-10px] w-3 h-3 md:bottom-[0.12em] md:-right-[0.15em] md:w-4 md:h-4 rounded-full ring-[5px] ring-background ${statusColor} cursor-pointer transition-colors duration-300`}
                      aria-label={statusLabel} />
                    
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
            {socials.map((s) =>
            <div key={s.label} className="relative group">
                <a
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                aria-label={s.label}
                onMouseEnter={() => setHoveredSocial(s.label)}
                onMouseLeave={() => setHoveredSocial(null)}>
                
                  {s.icon}
                </a>
                <AnimatePresence>
                  {hoveredSocial === s.label &&
                <motion.div
                  initial={{ x: '-50%', y: 8, opacity: 0, scale: 0 }}
                  animate={{ x: '-50%', y: 0, opacity: 1, scale: 1 }}
                  exit={{ x: '-50%', y: 8, opacity: 0, scale: 0 }}
                  transition={{ duration: 0.1 }}
                  className="absolute bottom-full left-1/2 mb-2 px-3 py-1.5 rounded-md border border-border bg-background/80 backdrop-blur-md text-sm font-medium text-foreground whitespace-nowrap z-50 shadow-md font-['Inter'] origin-bottom">
                  
                      {s.tooltip}
                    </motion.div>
                }
                </AnimatePresence>
              </div>
            )}
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
              className="relative w-56 h-56 md:w-72 md:h-72 glow-card rounded-2xl transition-transform ease-out hover:[transform:rotateX(var(--xRotation))_rotateY(var(--yRotation))_scale(1.05)] overflow-hidden">
              
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
    </section>);

};

export default HeroSection;