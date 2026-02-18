import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import TextRoll from '@/components/TextRoll';
import { cn } from '@/lib/utils';
import { useMotionValue, useTransform } from 'framer-motion';

const navItems = [
  { label: 'Home', href: '/', isRoute: true },
  { label: 'Projects', href: '/projects', isRoute: true },
  { label: 'Resume', href: '/resume', isRoute: true },
  { label: 'Contact', href: '#contact' },
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
    <motion.div animate={isDark ? 'checked' : 'unchecked'}>
      <motion.svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path d="M12.4058 17.7625C15.1672 17.7625 17.4058 15.5239 17.4058 12.7625C17.4058 10.0011 15.1672 7.76251 12.4058 7.76251C9.64434 7.76251 7.40576 10.0011 7.40576 12.7625C7.40576 15.5239 9.64434 17.7625 12.4058 17.7625Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" variants={sunVariants} transition={{ duration }} style={{ pathLength: pathLengthSun, scale: scaleSun }} />
        <motion.path d="M12.4058 1.76251V3.76251" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" variants={sunVariants} transition={{ duration }} style={{ pathLength: pathLengthSun, scale: scaleSun }} />
        <motion.path d="M12.4058 21.7625V23.7625" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" variants={sunVariants} transition={{ duration }} style={{ pathLength: pathLengthSun, scale: scaleSun }} />
        <motion.path d="M4.62598 4.98248L6.04598 6.40248" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" variants={sunVariants} transition={{ duration }} style={{ pathLength: pathLengthSun, scale: scaleSun }} />
        <motion.path d="M18.7656 17.1225L20.1856 18.5425" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" variants={sunVariants} transition={{ duration }} style={{ pathLength: pathLengthSun, scale: scaleSun }} />
        <motion.path d="M1.40576 12.7625H3.40576" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" variants={sunVariants} transition={{ duration }} style={{ pathLength: pathLengthSun, scale: scaleSun }} />
        <motion.path d="M21.4058 12.7625H23.4058" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" variants={sunVariants} transition={{ duration }} style={{ pathLength: pathLengthSun, scale: scaleSun }} />
        <motion.path d="M4.62598 20.5425L6.04598 19.1225" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" variants={sunVariants} transition={{ duration }} style={{ pathLength: pathLengthSun, scale: scaleSun }} />
        <motion.path d="M18.7656 6.40248L20.1856 4.98248" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" variants={sunVariants} transition={{ duration }} style={{ pathLength: pathLengthSun, scale: scaleSun }} />
        <motion.path d="M21.1918 13.2013C21.0345 14.9035 20.3957 16.5257 19.35 17.8781C18.3044 19.2305 16.8953 20.2571 15.2875 20.8379C13.6797 21.4186 11.9398 21.5294 10.2713 21.1574C8.60281 20.7854 7.07479 19.9459 5.86602 18.7371C4.65725 17.5283 3.81774 16.0003 3.4457 14.3318C3.07367 12.6633 3.18451 10.9234 3.76526 9.31561C4.346 7.70783 5.37263 6.29868 6.72501 5.25307C8.07739 4.20746 9.69959 3.56862 11.4018 3.41132C10.4052 4.75958 9.92564 6.42077 10.0503 8.09273C10.175 9.76469 10.8957 11.3364 12.0812 12.5219C13.2667 13.7075 14.8384 14.4281 16.5104 14.5528C18.1823 14.6775 19.8435 14.1979 21.1918 13.2013Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transition={{ duration }} variants={moonVariants} style={{ pathLength: pathLengthMoon, scale: scaleMoon }} />
      </motion.svg>
    </motion.div>
  );
};

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const stored = localStorage.getItem('theme');
    const applyTheme = (darkMode: boolean) => {
      document.documentElement.classList.toggle('dark', darkMode);
      setIsDark(darkMode);
    };
    if (stored === 'dark' || stored === 'light') {
      applyTheme(stored === 'dark');
    } else {
      applyTheme(mediaQuery.matches);
    }
    const syncWithSystem = (event: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) applyTheme(event.matches);
    };
    mediaQuery.addEventListener('change', syncWithSystem);
    return () => mediaQuery.removeEventListener('change', syncWithSystem);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const isSubPage = location.pathname !== '/';

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative z-50 px-6 py-4 md:px-12"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link to="/" className="font-['Space_Grotesk'] text-lg font-semibold text-foreground tracking-tight">
          <TextRoll>thanas.</TextRoll>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) =>
            item.isRoute ? (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <TextRoll>{item.label}</TextRoll>
              </Link>
            ) : (
              <a
                key={item.label}
                href={isSubPage ? `/${item.href}` : item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <TextRoll>{item.label}</TextRoll>
              </a>
            )
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            <SolarSwitch isDark={isDark} />
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center text-foreground"
          >
            <MenuToggleIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-4 mx-auto max-w-5xl border border-border rounded-xl bg-background/90 backdrop-blur-md p-6 space-y-4"
        >
          {navItems.map((item) =>
            item.isRoute ? (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className="block text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            )
          )}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
