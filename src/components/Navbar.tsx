import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import TextRoll from '@/components/TextRoll';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '/projects', isRoute: true },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

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
      if (!localStorage.getItem('theme')) {
        applyTheme(event.matches);
      }
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

  const isProjectsPage = location.pathname === '/projects';

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12"
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
                href={isProjectsPage ? `/${item.href}` : item.href}
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
            className="w-8 h-8 flex items-center justify-center rounded-full border border-foreground/15 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {/* Half-moon / half-sun icon like reference */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isDark ? (
                <>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </>
              ) : (
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              )}
            </svg>
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center text-foreground"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-4 mx-auto max-w-5xl border border-foreground/10 rounded-xl bg-background/90 backdrop-blur-md p-4 space-y-3"
        >
          {navItems.map((item) =>
            item.isRoute ? (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
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
