import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
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
    <motion.div animate={isDark ? 'checked' : 'unchecked'} className="flex items-center justify-center w-[18px] h-[18px]">
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

const Navbar = ({ forceDark = false, forceLight = false }: { forceDark?: boolean; forceLight?: boolean }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const location = useLocation();

  useEffect(() => setMounted(true), []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isDark = mounted && resolvedTheme === 'dark';

  // Hide theme toggle when theme is forced
  const hideThemeToggle = forceDark || forceLight;

  // When forceDark, override text colors to always appear as dark-mode (white text on dark bg)
  // When forceLight, override text colors to always appear as light-mode (dark text on light bg)
  const textPrimary = forceDark ? 'text-white' : forceLight ? 'text-[#2f2f2f]' : 'text-foreground';
  const textMuted = forceDark ? 'text-white/50 hover:text-white' : forceLight ? 'text-[#2f2f2f]/60 hover:text-[#2f2f2f]' : 'text-muted-foreground hover:text-foreground';
  const borderColor = forceDark ? 'border-white/20' : forceLight ? 'border-[#2f2f2f]/20' : 'border-border';
  const mutedIcon = forceDark ? 'text-white/60 hover:text-white' : forceLight ? 'text-[#2f2f2f]/60 hover:text-[#2f2f2f]' : 'text-muted-foreground hover:text-foreground';

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative z-50 px-6 py-4 md:px-12"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link to="/" className={`font-['Space_Grotesk'] text-xl font-semibold ${textPrimary} tracking-tight`}>
          <TextRoll>thanas.</TextRoll>
        </Link>
        <div className="hidden md:flex items-center gap-8">
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
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden w-8 h-8 flex items-center justify-center ${textPrimary}`}
          >
            <MenuToggleIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {/* Mobile menu — full overlay with blur */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
               className={`md:hidden fixed inset-0 z-40 backdrop-blur-xl ${forceDark ? 'bg-black/60' : forceLight ? 'bg-white/60' : 'bg-background/60'}`}
              onClick={() => setMobileOpen(false)}
            />
            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className={`md:hidden fixed top-20 left-4 right-4 z-50 rounded-2xl border backdrop-blur-2xl p-6 space-y-1 shadow-2xl ${forceDark ? 'border-white/15 bg-black/80' : forceLight ? 'border-[#2f2f2f]/15 bg-[#f9f7f1]/95' : 'border-border bg-card/95'}`}
            >
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-4 px-4 rounded-xl text-xl font-semibold transition-colors font-['Space_Grotesk'] ${forceDark ? 'text-white hover:bg-white/10' : forceLight ? 'text-[#2f2f2f] hover:bg-[#2f2f2f]/10' : 'text-foreground hover:bg-muted/50'}`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
