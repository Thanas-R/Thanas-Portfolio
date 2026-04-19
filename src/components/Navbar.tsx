import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { Command } from 'lucide-react';
import TextRoll from '@/components/TextRoll';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/#contact' },
];

const MenuToggleIcon = ({ open, className }: { open: boolean; className?: string }) => (
  <svg
    strokeWidth={2.5}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 32 32"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('transition-transform ease-in-out w-5 h-5', open && '-rotate-45', className)}
    style={{ transitionDuration: '500ms' }}
  >
    <path
      className={cn(
        'transition-all ease-in-out',
        open
          ? '[stroke-dasharray:20_300] [stroke-dashoffset:-32.42px]'
          : '[stroke-dasharray:12_63]',
      )}
      style={{ transitionDuration: '500ms' }}
      d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
    />
    <path d="M7 16 27 16" />
  </svg>
);

const SolarSwitch = ({ isDark }: { isDark: boolean }) => {
  const duration = 0.7;
  const moonVariants = { checked: { scale: 1 }, unchecked: { scale: 0 } };
  const sunVariants = { checked: { scale: 0 }, unchecked: { scale: 1 } };
  const scaleMoon = useMotionValue(isDark ? 1 : 0);
  const scaleSun = useMotionValue(isDark ? 0 : 1);
  const pathLengthMoon = useTransform(scaleMoon, [0.6, 1], [0, 1]);
  const pathLengthSun = useTransform(scaleSun, [0.6, 1], [0, 1]);

  useEffect(() => {
    scaleMoon.set(isDark ? 1 : 0);
    scaleSun.set(isDark ? 0 : 1);
  }, [isDark, scaleMoon, scaleSun]);

  return (
    <motion.div animate={isDark ? 'checked' : 'unchecked'} className="flex items-center justify-center w-[18px] h-[18px] translate-x-[0.5px]">
      <motion.svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="block">
        <motion.path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" variants={sunVariants} transition={{ duration }} style={{ pathLength: pathLengthSun, scale: scaleSun, transformOrigin: '50% 50%' }} />
        <motion.path d="M12 3v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" variants={sunVariants} transition={{ duration }} style={{ pathLength: pathLengthSun, scale: scaleSun, transformOrigin: '50% 50%' }} />
        <motion.path d="M12 20v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" variants={sunVariants} transition={{ duration }} style={{ pathLength: pathLengthSun, scale: scaleSun, transformOrigin: '50% 50%' }} />
        <motion.path d="M3 12h1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" variants={sunVariants} transition={{ duration }} style={{ pathLength: pathLengthSun, scale: scaleSun, transformOrigin: '50% 50%' }} />
        <motion.path d="M20 12h1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" variants={sunVariants} transition={{ duration }} style={{ pathLength: pathLengthSun, scale: scaleSun, transformOrigin: '50% 50%' }} />
        <motion.path d="m18.364 5.636-.707.707" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" variants={sunVariants} transition={{ duration }} style={{ pathLength: pathLengthSun, scale: scaleSun, transformOrigin: '50% 50%' }} />
        <motion.path d="m6.343 17.657-.707.707" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" variants={sunVariants} transition={{ duration }} style={{ pathLength: pathLengthSun, scale: scaleSun, transformOrigin: '50% 50%' }} />
        <motion.path d="m5.636 5.636.707.707" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" variants={sunVariants} transition={{ duration }} style={{ pathLength: pathLengthSun, scale: scaleSun, transformOrigin: '50% 50%' }} />
        <motion.path d="m17.657 17.657.707.707" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" variants={sunVariants} transition={{ duration }} style={{ pathLength: pathLengthSun, scale: scaleSun, transformOrigin: '50% 50%' }} />
        <motion.path d="M12 3a6.364 6.364 0 0 0 9 9 9 9 0 1 1-9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transition={{ duration }} variants={moonVariants} style={{ pathLength: pathLengthMoon, scale: scaleMoon, transformOrigin: '50% 50%' }} />
      </motion.svg>
    </motion.div>
  );
};

const Navbar = ({ forceDark = false, forceLight = false, hideThemeToggle: hideThemeToggleProp }: { forceDark?: boolean; forceLight?: boolean; hideThemeToggle?: boolean }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const location = useLocation();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 8);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
  if (mobileOpen) {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  return () => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  };
}, [mobileOpen]);

  const isDark = mounted && resolvedTheme === 'dark';
  const hideThemeToggle = hideThemeToggleProp !== undefined ? hideThemeToggleProp : (forceDark || forceLight);

  const textPrimary = forceDark ? 'text-white' : forceLight ? 'text-[#2f2f2f]' : 'text-foreground';
  const textMuted = forceDark ? 'text-white/50 hover:text-white' : forceLight ? 'text-[#2f2f2f]/60 hover:text-[#2f2f2f]' : 'text-muted-foreground hover:text-foreground';
  const borderColor = forceDark ? 'border-white/20' : forceLight ? 'border-[#2f2f2f]/20' : 'border-border';
  const mutedIcon = forceDark ? 'text-white/60 hover:text-white' : forceLight ? 'text-[#2f2f2f]/60 hover:text-[#2f2f2f]' : 'text-muted-foreground hover:text-foreground';

  const scrolledBg = forceDark
    ? 'bg-black/70 backdrop-blur-2xl'
    : forceLight
      ? 'bg-[#f9f7f1]/70 backdrop-blur-2xl'
      : 'bg-card/70 backdrop-blur-2xl';

  const scrolledBorder = forceDark
    ? 'border-white/10'
    : forceLight
      ? 'border-[#2f2f2f]/10'
      : 'border-border/50';

  const mobileBg = forceDark ? 'bg-black/95' : forceLight ? 'bg-[#f9f7f1]/95' : 'bg-background/95';

  return (
    <>
      {/* Fixed wrapper */}
      <div
        className={cn(
          'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)]',
          isScrolled ? 'px-4 md:px-8 pt-3' : 'px-0 pt-0'
        )}
      >
        {/* Desktop navbar */}
        <nav
          className={cn(
            'hidden md:flex w-full max-w-5xl mx-auto items-center justify-between transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)]',
            isScrolled
              ? `${scrolledBg} border ${scrolledBorder} rounded-2xl shadow-lg shadow-black/5 px-5 h-[52px]`
              : 'bg-transparent border border-transparent rounded-none px-6 md:px-12 h-16'
          )}
        >
          <Link to="/" className={`font-['Space_Grotesk'] text-xl font-semibold ${textPrimary} tracking-tight`}>
            <TextRoll>thanas.</TextRoll>
          </Link>

          <div className="flex items-center gap-8">
            <button
              onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
              className={`text-base font-medium ${textMuted} transition-colors duration-200`}
              aria-label="Search"
            >
              <Command className="w-4 h-4" />
            </button>
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`text-base font-medium ${textMuted} transition-colors duration-200`}
              >
                <TextRoll>{item.label}</TextRoll>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {!hideThemeToggle && (
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className={`w-8 h-8 flex items-center justify-center rounded-full border ${borderColor} ${mutedIcon} transition-colors`}
                aria-label="Toggle theme"
              >
                <SolarSwitch isDark={isDark} />
              </button>
            )}
          </div>
        </nav>

        {/* Mobile: single container that expands */}
        <motion.div
          className={cn(
            'md:hidden flex flex-col overflow-hidden backdrop-blur-3xl transition-[padding,border-radius,border-color,background-color,box-shadow] duration-300 ease-[cubic-bezier(.4,0,.2,1)]',
            isScrolled && !mobileOpen
              ? `${scrolledBg} border ${scrolledBorder} rounded-2xl shadow-lg shadow-black/5 mx-auto max-w-[95%]`
              : isScrolled && mobileOpen
                ? `${mobileBg} border ${scrolledBorder} rounded-2xl shadow-lg shadow-black/5 mx-auto max-w-[95%]`
                : !isScrolled && mobileOpen
                  ? `${mobileBg} border border-transparent`
                  : 'bg-transparent border border-transparent'
          )}
          animate={{
            height: mobileOpen
              ? (isScrolled ? 'calc(100dvh - 24px)' : '100dvh')
              : (isScrolled ? 48 : 56),
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Header row — always visible */}
          <div className={cn(
            'flex items-center justify-between shrink-0',
            isScrolled ? 'px-4 h-[48px]' : 'px-6 h-14'
          )}>
            <Link to="/" onClick={() => setMobileOpen(false)} className={`font-['Space_Grotesk'] text-lg font-semibold ${textPrimary} tracking-tight`}>
              <TextRoll>thanas.</TextRoll>
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`w-9 h-9 flex items-center justify-center rounded-full ${textPrimary} z-[60] transition-colors`}
            >
              <MenuToggleIcon open={mobileOpen} />
            </button>
          </div>

          {/* Menu content — revealed by height animation */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.15 }}
                className="flex-1 flex flex-col px-6 pt-6 gap-1 overflow-y-auto overscroll-contain"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 + 0.2, ease: [0.4, 0, 0.2, 1], duration: 0.3 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'block py-4 px-4 rounded-xl text-[2rem] font-bold transition-colors font-[Inter,sans-serif]',
                        forceDark
                          ? 'text-white/80 hover:text-white hover:bg-white/10'
                          : forceLight
                            ? 'text-[#2f2f2f]/70 hover:text-[#2f2f2f] hover:bg-[#2f2f2f]/10'
                            : 'text-foreground/70 hover:text-foreground hover:bg-muted/50'
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Search button */}
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.05 + 0.2, ease: [0.4, 0, 0.2, 1], duration: 0.3 }}
                  className="mt-4"
                >
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setTimeout(() => window.dispatchEvent(new Event('open-command-palette')), 100);
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 py-4 px-4 rounded-xl text-lg font-semibold transition-colors font-[Inter,sans-serif]',
                      forceDark
                        ? 'text-white/50 hover:text-white hover:bg-white/10'
                        : forceLight
                          ? 'text-[#2f2f2f]/50 hover:text-[#2f2f2f] hover:bg-[#2f2f2f]/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    )}
                  >
                    <Command className="w-5 h-5" />
                    Search...
                  </button>
                </motion.div>

                {/* Theme toggle */}
                {!hideThemeToggle && (
                  <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (navItems.length + 1) * 0.05 + 0.2, ease: [0.4, 0, 0.2, 1], duration: 0.3 }}
                    className="mt-2"
                  >
                    <button
                      onClick={() => setTheme(isDark ? 'light' : 'dark')}
                      className={cn(
                        'w-full flex items-center gap-3 py-4 px-4 rounded-xl text-lg font-semibold transition-colors font-[Inter,sans-serif]',
                        forceDark
                          ? 'text-white/50 hover:text-white hover:bg-white/10'
                          : forceLight
                            ? 'text-[#2f2f2f]/50 hover:text-[#2f2f2f] hover:bg-[#2f2f2f]/10'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      )}
                    >
                      <SolarSwitch isDark={isDark} />
                      {isDark ? 'Light Mode' : 'Dark Mode'}
                    </button>
                  </motion.div>
                )}

                {/* Social links */}
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (navItems.length + 2) * 0.05 + 0.2, ease: [0.4, 0, 0.2, 1], duration: 0.3 }}
                  className="mt-auto pt-6 pb-6"
                >
                  <div className={cn(
                    'flex items-center justify-center gap-5 pt-4 border-t',
                    forceDark ? 'border-white/10' : forceLight ? 'border-[#2f2f2f]/10' : 'border-border/50'
                  )}>
                    {[
                      { label: 'GitHub', href: 'https://github.com/Thanas-R', icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
                      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/thanasr/', icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><circle cx="4.983" cy="5.009" r="2.188" /><path d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z" /></svg> },
                      { label: 'Email', href: 'mailto:thanas5.rd@gmail.com', icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="m18.73 5.41-1.28 1L12 10.46 6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64z" /></svg> },
                      { label: 'Discord', href: 'https://discord.com/users/677174403859087378', icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z" /></svg> },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target={social.href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        className={cn(
                          'p-2 rounded-full transition-colors',
                          forceDark
                            ? 'text-white/40 hover:text-white hover:bg-white/10'
                            : forceLight
                              ? 'text-[#2f2f2f]/40 hover:text-[#2f2f2f] hover:bg-[#2f2f2f]/10'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        )}
                        aria-label={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Spacer */}
      <div className="h-16 md:h-16" />
    </>
  );
};

export default Navbar;
