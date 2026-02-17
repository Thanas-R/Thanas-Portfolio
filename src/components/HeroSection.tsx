import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import avatar from '@/assets/avatar.png';

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/Thanas-R',
    tooltip: 'Thanas-R',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/thanasr/',
    tooltip: 'Thanas R',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:thanas5.rd@gmail.com',
    tooltip: 'thanas5.rd@gmail.com',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: 'Spotify',
    href: 'https://open.spotify.com/user/1ruu5bmall8721u0hsnedbbxh',
    tooltip: 'Spotify',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 15s2-.5 4-.5 4 .5 4 .5" />
        <path d="M7 12.5s2.5-1 5-1 5 1 5 1" />
        <path d="M6.5 10s3-1 5.5-1 5.5 1 5.5 1" />
      </svg>
    ),
  },
  {
    label: 'Discord',
    href: '#',
    tooltip: 'darkspacepirate',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.12 5.32C9.37 4.8 10.7 4.42 12.08 4.2c.17.3.37.72.5 1.04a16.7 16.7 0 0 1 4.93 0c.14-.32.34-.74.51-1.04 1.38.22 2.7.6 3.96 1.12 2.5 3.72 3.15 7.35 2.82 10.92a17.1 17.1 0 0 1-5.23 2.64c-.42-.57-.8-1.18-1.12-1.83.62-.23 1.2-.51 1.76-.84l-.42-.33a12.2 12.2 0 0 1-10.58 0l-.42.33c.55.33 1.14.61 1.76.84-.33.65-.7 1.26-1.12 1.83a17.1 17.1 0 0 1-5.23-2.64C2.77 12.67 3.42 9.04 5.92 5.32Z" />
        <circle cx="9.5" cy="13" r="1.25" />
        <circle cx="14.5" cy="13" r="1.25" />
      </svg>
    ),
  },
];

const HeroSection = () => {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    fetch('https://api.lanyard.rest/v1/users/677174403859087378')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const status = data.data.discord_status;
          setIsOnline(status !== 'offline');
        }
      })
      .catch(() => setIsOnline(false));
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-6">
      <div className="max-w-5xl w-full mx-auto grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[0.9] tracking-tight font-['Space_Grotesk']">
            Thanas{' '}
            <span className="text-muted-foreground inline-flex items-baseline">
              R
              <span
                className="inline-block w-3 h-3 md:w-4 md:h-4 rounded-full ml-0.5 mb-1 md:mb-1.5 transition-colors duration-500"
                style={{ backgroundColor: isOnline ? '#45A366' : '#888' }}
              />
            </span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
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
                  aria-label={s.label}
                  onMouseEnter={() => setHoveredSocial(s.label)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  {s.icon}
                </a>
                <AnimatePresence>
                  {hoveredSocial === s.label && (
                    <motion.div
                      initial={{ y: 8, opacity: 0, filter: 'blur(4px)' }}
                      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                      exit={{ y: 8, opacity: 0, filter: 'blur(4px)' }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 rounded-lg bg-foreground text-background text-xs font-medium whitespace-nowrap z-50"
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
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0, 1] }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative w-48 h-48 md:w-64 md:h-64 glow-card rounded-2xl">
            <img
              src={avatar}
              alt="Thanas R"
              className="w-full h-full object-cover rounded-2xl"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
