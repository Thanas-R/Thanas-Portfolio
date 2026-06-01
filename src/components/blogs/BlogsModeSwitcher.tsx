import { motion } from 'framer-motion';

interface Props {
  /** Current visible mode. The switcher previews the OPPOSITE mode. */
  currentMode: 'light' | 'dark';
  onToggle: () => void;
}

/**
 * Sticky-note-ish preview chip pinned to the bottom-left of the blogs page.
 * In light (newspaper) mode it teases the dark cyberpunk look.
 * In dark mode it teases the warm vintage newspaper look.
 */
const BlogsModeSwitcher = ({ currentMode, onToggle }: Props) => {
  const goingDark = currentMode === 'light';

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      initial={{ opacity: 0, y: 30, rotate: goingDark ? -3 : 2 }}
      animate={{ opacity: 1, y: 0, rotate: goingDark ? -3 : 2 }}
      whileHover={{ y: -4, rotate: 0, scale: 1.03 }}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="fixed bottom-6 left-6 z-[70] text-left group"
      aria-label={`Switch to ${goingDark ? 'cyberpunk dark' : 'vintage newspaper'} edition`}
    >
      {goingDark ? (
        // Dark cyberpunk teaser shown on light/newspaper page
        <div
          className="relative px-4 py-3 w-[230px] border"
          style={{
            backgroundColor: '#0a0a0a',
            borderColor: 'rgba(255,255,255,0.18)',
            color: '#e0e0e0',
            boxShadow:
              '0 10px 30px -10px rgba(0,0,0,0.45), inset 0 0 18px rgba(255,255,255,0.03)',
          }}
        >
          {/* corner brackets */}
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: 'rgba(255,255,255,0.55)' }} />
          <span className="absolute top-0 right-0 w-2 h-2 border-t border-r" style={{ borderColor: 'rgba(255,255,255,0.55)' }} />
          <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l" style={{ borderColor: 'rgba(255,255,255,0.55)' }} />
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r" style={{ borderColor: 'rgba(255,255,255,0.55)' }} />

          <p
            className="text-[9px] tracking-[5px] uppercase opacity-50 mb-1.5"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            ALT MODE / 別バージョン
          </p>
          <p
            className="leading-none mb-1.5"
            style={{
              fontFamily: "'Bebas Neue', 'League Gothic', sans-serif",
              fontSize: '24px',
              letterSpacing: '3px',
              color: '#fff',
              textShadow: '0 0 14px rgba(255,255,255,0.18)',
            }}
          >
            TRY DARK
          </p>
          <p
            className="text-[10px] opacity-60"
            style={{ fontFamily: "'JetBrains_Mono', monospace", letterSpacing: '1px' }}
          >
            Cyberpunk transmission log
          </p>
          <div className="flex items-center gap-1.5 mt-2 opacity-70 group-hover:opacity-100 transition-opacity">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span
              className="text-[9px] tracking-[3px] uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              SWITCH
            </span>
          </div>
        </div>
      ) : (
        // Vintage newspaper teaser shown on dark/cyberpunk page
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
          <p
            className="text-[9px] tracking-[3px] uppercase mb-1 text-center"
            style={{ borderBottom: '1px solid #2f2f2f', paddingBottom: '4px' }}
          >
            Special Edition
          </p>
          <p
            className="text-center leading-tight mt-2"
            style={{
              fontWeight: 900,
              fontSize: '22px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Read the Print
          </p>
          <div className="mx-auto my-1.5" style={{ width: '40px', height: '1px', backgroundColor: '#2f2f2f' }} />
          <p
            className="text-[10px] italic text-center leading-snug"
            style={{ fontFamily: "'Droid Serif', 'Georgia', serif", color: '#555' }}
          >
            Switch to the vintage newspaper edition
          </p>
          <p
            className="text-[9px] tracking-[3px] uppercase mt-2 text-center opacity-70 group-hover:opacity-100 transition-opacity"
          >
            Tap to switch
          </p>
        </div>
      )}
    </motion.button>
  );
};

export default BlogsModeSwitcher;
