import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import avatar from '@/assets/avatar.png';

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/Thanas-R',
    tooltip: 'Thanas-R',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/thanasr/',
    tooltip: 'Thanas R',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
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
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z" />
      </svg>
    ),
  },
  {
    label: 'Spotify',
    href: 'https://open.spotify.com/user/1ruu5bmall8721u0hsnedbbxh',
    tooltip: 'Spotify',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.01 2.019c-5.495 0-9.991 4.496-9.991 9.991 0 5.494 4.496 9.99 9.991 9.99 5.494 0 9.99-4.496 9.99-9.99 0-5.495-4.446-9.991-9.99-9.991zm4.595 14.436c-.199.299-.549.4-.85.201-2.349-1.45-5.296-1.75-8.793-.951-.348.102-.648-.148-.748-.449-.101-.35.149-.648.45-.749 3.795-.85 7.093-.499 9.69 1.1.35.149.4.548.251.848zm1.2-2.747c-.251.349-.7.499-1.051.249-2.697-1.646-6.792-2.148-9.939-1.148-.398.101-.85-.1-.949-.498-.101-.402.1-.852.499-.952 3.646-1.098 8.143-.548 11.239 1.351.3.149.45.648.201.998zm.099-2.799c-3.197-1.897-8.542-2.097-11.59-1.146a.938.938 0 0 1-1.148-.6.937.937 0 0 1 .599-1.151c3.547-1.049 9.392-.85 13.089 1.351.449.249.599.849.349 1.298-.25.35-.849.498-1.299.248z" />
      </svg>
    ),
  },
  {
    label: 'Discord',
    href: '#',
    tooltip: 'darkspacepirate',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z" />
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
            <span className="relative inline-flex items-baseline">
              R
              <span
                className="absolute bottom-[-3px] right-[-10px] w-3 h-3 md:w-4 md:h-4 rounded-full ring-[5px] ring-background transition-colors duration-500 cursor-pointer"
                style={{ backgroundColor: isOnline ? '#45A366' : '#747f8d' }}
                title={isOnline ? 'Online on Discord' : 'Offline'}
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
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 rounded-lg bg-foreground text-background text-xs font-medium whitespace-nowrap z-50 font-['Space_Grotesk']"
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
              loading="eager"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
