import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  currentMode: 'light' | 'dark';
  onToggle: () => void;
}

const SESSION_KEY = 'blogsSwitcherDismissed';

const BlogsModeSwitcher = ({ currentMode, onToggle }: Props) => {
  const goingDark = currentMode === 'light';
  const [dismissed, setDismissed] = useState(false);
  const [scrolledPast, setScrolledPast] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(SESSION_KEY) === '1');
    } catch {}
    const mq = window.matchMedia('(max-width: 767px)');
    const onMq = () => setIsMobile(mq.matches);
    onMq();
    mq.addEventListener('change', onMq);
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setScrolledPast(max > 0 && window.scrollY / max > 0.5);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      mq.removeEventListener('change', onMq);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const close = (e: React.MouseEvent) => {
    e.stopPropagation();
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch {}
    setDismissed(true);
  };

  const visible = !dismissed && !scrolledPast && !isMobile;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: goingDark ? -3 : 2 }}
          animate={{ opacity: 1, y: 0, rotate: goingDark ? -3 : 2 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-6 left-6 z-[70]"
        >
          <button
            type="button"
            onClick={onToggle}
            className="relative text-left group block"
            aria-label={`Switch to ${goingDark ? 'cyberpunk dark' : 'vintage newspaper'} edition`}
          >
            {goingDark ? (
              <div
                className="relative px-4 py-3 w-[230px] border"
                style={{
                  backgroundColor: '#0a0a0a',
                  borderColor: 'rgba(255,255,255,0.18)',
                  color: '#e0e0e0',
                  boxShadow: '0 10px 30px -10px rgba(0,0,0,0.45), inset 0 0 18px rgba(255,255,255,0.03)',
                }}
              >
                <span className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: 'rgba(255,255,255,0.55)' }} />
                <span className="absolute top-0 right-0 w-2 h-2 border-t border-r" style={{ borderColor: 'rgba(255,255,255,0.55)' }} />
                <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l" style={{ borderColor: 'rgba(255,255,255,0.55)' }} />
                <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r" style={{ borderColor: 'rgba(255,255,255,0.55)' }} />

                <p className="text-[9px] tracking-[5px] uppercase opacity-50 mb-1.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  ALT MODE / 別バージョン
                </p>
                <p
                  className="leading-none mb-1.5"
                  style={{ fontFamily: "'Bebas Neue', 'League Gothic', sans-serif", fontSize: '24px', letterSpacing: '3px', color: '#fff', textShadow: '0 0 14px rgba(255,255,255,0.18)' }}
                >
                  TRY DARK
                </p>
                <p className="text-[10px] opacity-60" style={{ fontFamily: "'JetBrains_Mono', monospace", letterSpacing: '1px' }}>
                  Cyberpunk transmission log
                </p>
                <div className="flex items-center gap-1.5 mt-2 opacity-70 group-hover:opacity-100 transition-opacity">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-[9px] tracking-[3px] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    SWITCH
                  </span>
                </div>
              </div>
            ) : (
              <div
                className="relative px-4 py-3 w-[230px]"
                style={{
                  backgroundColor: '#f9f7f1',
                  color: '#2f2f2f',
                  border: '3px double #2f2f2f',
                  boxShadow: '0 10px 25px -8px rgba(0,0,0,0.45)',
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                <p className="text-[9px] tracking-[3px] uppercase mb-1 text-center" style={{ borderBottom: '1px solid #2f2f2f', paddingBottom: '4px' }}>
                  Special Edition
                </p>
                <p className="text-center leading-tight mt-2" style={{ fontWeight: 900, fontSize: '22px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Read the Print
                </p>
                <div className="mx-auto my-1.5" style={{ width: '40px', height: '1px', backgroundColor: '#2f2f2f' }} />
                <p className="text-[10px] italic text-center leading-snug" style={{ fontFamily: "'Droid Serif', 'Georgia', serif", color: '#555' }}>
                  Switch to the vintage newspaper edition
                </p>
                <p className="text-[9px] tracking-[3px] uppercase mt-2 text-center opacity-70 group-hover:opacity-100 transition-opacity">
                  Tap to switch
                </p>
              </div>
            )}
          </button>

          {/* Close button anchored to top-right corner */}
          <button
            type="button"
            onClick={close}
            aria-label="Hide switcher"
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center transition-transform hover:scale-110"
            style={{
              backgroundColor: goingDark ? '#0a0a0a' : '#f9f7f1',
              color: goingDark ? '#fff' : '#2f2f2f',
              border: goingDark ? '1px solid rgba(255,255,255,0.4)' : '1.5px solid #2f2f2f',
              boxShadow: '0 4px 10px -2px rgba(0,0,0,0.4)',
            }}
          >
            <X className="w-3 h-3" strokeWidth={2.5} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlogsModeSwitcher;
