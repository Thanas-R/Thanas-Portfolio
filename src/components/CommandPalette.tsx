import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Home,
  FolderOpen,
  FileText,
  Mail,
  Sun,
  Moon,
  ArrowRight,
  Newspaper,
  Heart,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { projects } from '@/components/ProjectsSection';
import { Button } from '@/components/ui/button';

interface CommandItem {
  id: string;
  label: string;
  section: string;
  icon: React.ElementType;
  shortcut?: string;
  action: () => void;
}

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { resolvedTheme, setTheme } = useTheme();

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setActiveIndex(0);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = useCallback(
    (path: string) => {
      close();
      if (path.startsWith('http')) {
        window.open(path, '_blank');
      } else if (path.includes('#')) {
        navigate('/');
        setTimeout(() => {
          const id = path.split('#')[1];
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 400);
      } else {
        navigate(path);
      }
    },
    [close, navigate],
  );

  const commands: CommandItem[] = useMemo(() => {
    const isDark = resolvedTheme === 'dark';
    const items: CommandItem[] = [
      // Navigation
      { id: 'home', label: 'Home', section: 'Navigate', icon: Home, shortcut: 'H', action: () => go('/') },
      { id: 'projects', label: 'Projects', section: 'Navigate', icon: FolderOpen, shortcut: 'P', action: () => go('/projects') },
      { id: 'blogs', label: 'Blogs', section: 'Navigate', icon: Newspaper, shortcut: 'B', action: () => go('/blogs') },
      { id: 'resume', label: 'Resume', section: 'Navigate', icon: FileText, shortcut: 'R', action: () => go('/resume') },
      { id: 'contact', label: 'Contact', section: 'Navigate', icon: Mail, shortcut: 'C', action: () => go('/#contact') },
      { id: 'turtle', label: 'Siri (Turtle)', section: 'Navigate', icon: Heart, shortcut: 'T', action: () => go('/turtle') },
      // Theme
      {
        id: 'theme',
        label: isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode',
        section: 'Actions',
        icon: isDark ? Sun : Moon,
        action: () => {
          setTheme(isDark ? 'light' : 'dark');
          close();
        },
      },
      // Projects
      ...projects.map((p) => ({
        id: `project-${p.id}`,
        label: p.title,
        section: 'Projects',
        icon: ArrowRight,
        action: () => go(`/projects/${p.id}`),
      })),
    ];
    return items;
  }, [resolvedTheme, go, close, setTheme]);

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.section.toLowerCase().includes(q),
    );
  }, [query, commands]);

  // Group by section
  const sections = useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    filtered.forEach((item) => {
      const arr = map.get(item.section) || [];
      arr.push(item);
      map.set(item.section, arr);
    });
    return map;
  }, [filtered]);

  // Command+K / Ctrl+K toggle
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Listen for custom open event from Navbar
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-command-palette', handler);
    return () => window.removeEventListener('open-command-palette', handler);
  }, []);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Keyboard navigation inside palette
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === 'Enter' && filtered[activeIndex]) {
        e.preventDefault();
        filtered[activeIndex].action();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, close, filtered, activeIndex]);

  // Reset active index on query change
  useEffect(() => setActiveIndex(0), [query]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const active = listRef.current.querySelector('[data-active="true"]');
    active?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  let flatIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <>
{/* Backdrop */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.15 }}
className="fixed inset-0 z-[100] bg-black/25 backdrop-blur-[2px]"
  onClick={close}
/>


          {/* Palette container */}
          <div className="pointer-events-none fixed inset-0 z-[101] flex items-start justify-center overflow-y-auto px-2 pb-6 pt-[min(15vh,8rem)]">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              className="relative isolate w-[min(580px,calc(100vw-1rem))] max-h-[min(76vh,640px)] overflow-hidden rounded-2xl border border-white/25 dark:border-white/[0.09] bg-[rgba(249,249,250,0.97)] dark:bg-[rgba(25,25,25,0.97)] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.25),inset_0_1px_0_0_rgba(255,255,255,0.4)] dark:shadow-[0_28px_60px_-15px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-[20px] backdrop-saturate-[140%] pointer-events-auto"
            >
              {/* Search input */}
              <div className="relative z-10 flex items-center gap-3 border-b border-black/[0.08] dark:border-white/[0.08] px-4 py-4 sm:px-5">
                <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects, pages, actions…"
                  aria-label="Search projects, pages, and actions"
                  className="min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground/70"
                />
                <kbd className="hidden shrink-0 rounded-md border border-black/10 dark:border-white/10 bg-black/[0.04] dark:bg-white/[0.06] px-2 py-1 font-mono text-[10px] text-muted-foreground sm:inline-flex">
                  ESC
                </kbd>
              </div>

              {/* Results list with invisible scrollbar */}
              <div
                ref={listRef}
                className="relative z-10 max-h-[min(54vh,420px)] overflow-y-auto p-2 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                {filtered.length === 0 && (
                  <p className="py-10 text-center text-xl text-muted-foreground">
                    No results found.
                  </p>
                )}
                {Array.from(sections.entries()).map(([section, items]) => (
                  <div key={section} className="mb-1">
                    <p className="px-3 pb-1 pt-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70">
                      {section}
                    </p>
                    {items.map((item) => {
                      flatIndex++;
                      const isActive = flatIndex === activeIndex;
                      const idx = flatIndex;
                      return (
                        <Button
                          key={item.id}
                          type="button"
                          variant="ghost"
                          data-active={isActive}
                          aria-current={isActive ? 'true' : undefined}
                          onClick={() => item.action()}
                          onMouseEnter={() => setActiveIndex(idx)}
                          className={`h-12 w-full justify-start gap-3 rounded-xl px-3 text-left transition-all duration-150 ${
                            isActive
                              ? 'bg-black/[0.07] dark:bg-white/[0.1] text-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]'
                              : 'text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.05]'
                          }`}
                        >
                          <item.icon className="!h-5 !w-5 shrink-0 text-muted-foreground" />
                          <span className="min-w-0 flex-1 truncate text-base font-medium">
                            {item.label}
                          </span>
                          {isActive && (
                            <ArrowRight className="!h-5 !w-5 shrink-0 text-muted-foreground" />
                          )}
                        </Button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="relative z-10 flex items-center justify-between gap-3 border-t border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] px-4 py-2.5 text-[12px] text-muted-foreground sm:px-5">
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="flex items-center gap-1.5">
                    <kbd className="inline-flex h-6 min-w-[24px] items-center justify-center rounded border border-black/10 dark:border-white/10 bg-black/[0.05] dark:bg-white/[0.08] px-1.5 font-mono text-[11px]">↑↓</kbd>
                    <span className="hidden sm:inline">Navigate</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    {/* Extended width enter button icon */}
                    <kbd className="inline-flex h-6 min-w-[32px] items-center justify-center rounded border border-black/10 dark:border-white/10 bg-black/[0.05] dark:bg-white/[0.08] px-1.5 font-mono text-[12px] tracking-wider">enter</kbd>
                    <span className="hidden sm:inline">
                      {filtered[activeIndex]?.section === 'Projects' ? 'Open project' : filtered[activeIndex]?.section === 'Actions' ? 'Run action' : 'Go to page'}
                    </span>
                  </span>
                </div>
                <span className="flex shrink-0 items-center gap-1">
                  <kbd className="inline-flex h-6 min-w-[26px] items-center justify-center rounded border border-black/10 dark:border-white/10 bg-black/[0.05] dark:bg-white/[0.08] px-1.5 font-mono text-[11px]">⌘</kbd>
                  <kbd className="inline-flex h-6 min-w-[22px] items-center justify-center rounded border border-black/10 dark:border-white/10 bg-black/[0.05] dark:bg-white/[0.08] px-1.5 font-mono text-[11px]">K</kbd>
                  <span className="ml-1 hidden sm:inline">to open</span>
                </span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
