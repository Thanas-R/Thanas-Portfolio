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
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { projects } from '@/components/ProjectsSection';

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
      { id: 'resume', label: 'Resume', section: 'Navigate', icon: FileText, shortcut: 'R', action: () => go('/resume') },
      { id: 'contact', label: 'Contact', section: 'Navigate', icon: Mail, shortcut: 'C', action: () => go('/#contact') },
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

  // ⌘K / Ctrl+K toggle
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
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md"
            onClick={close}
          />

          {/* Centering wrapper */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
              className="w-[90vw] max-w-[560px] rounded-2xl border border-border bg-card/95 backdrop-blur-2xl shadow-2xl overflow-hidden pointer-events-auto"
            >
            {/* Search input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-foreground text-sm placeholder:text-muted-foreground/60 outline-none"
              />
              <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-[11px] font-mono border border-border">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[320px] overflow-y-auto py-2">
              {filtered.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No results found.
                </p>
              )}
              {Array.from(sections.entries()).map(([section, items]) => (
                <div key={section}>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50 px-5 pt-3 pb-1.5">
                    {section}
                  </p>
                  {items.map((item) => {
                    flatIndex++;
                    const isActive = flatIndex === activeIndex;
                    const idx = flatIndex;
                    return (
                      <button
                        key={item.id}
                        data-active={isActive}
                        onClick={() => item.action()}
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors duration-75 ${
                          isActive ? 'bg-muted/70' : 'hover:bg-muted/40'
                        }`}
                      >
                        <item.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                        <span className="flex-1 text-sm font-medium text-foreground truncate">
                          {item.label}
                        </span>
                        {item.shortcut && (
                          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-muted text-muted-foreground text-[11px] font-mono border border-border">
                            {item.shortcut}
                          </kbd>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-2.5 border-t border-border text-[11px] text-muted-foreground/50">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-muted border border-border font-mono">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-muted border border-border font-mono">↵</kbd>
                  Select
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded bg-muted border border-border font-mono">⌘</kbd>
                <kbd className="px-1 py-0.5 rounded bg-muted border border-border font-mono">K</kbd>
                to open
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
