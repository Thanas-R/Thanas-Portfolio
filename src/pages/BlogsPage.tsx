import { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import BlogsLightMode from '@/components/blogs/BlogsLightMode';
import BlogsDarkMode from '@/components/blogs/BlogsDarkMode';
import BlogsModeSwitcher from '@/components/blogs/BlogsModeSwitcher';
import SEOHead from '@/components/SEOHead';

const BlogsPage = () => {
  const { isDark } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [forceMode, setForceMode] = useState<'auto' | 'dark' | 'light'>('auto');
  useEffect(() => setMounted(true), []);

  const showDark =
    forceMode === 'dark' ? true :
    forceMode === 'light' ? false :
    isDark;

  const toggleMode = () => {
    if (forceMode === 'auto') {
      // Switch to opposite of current
      setForceMode(showDark ? 'light' : 'dark');
    } else {
      // Toggle between forced modes
      setForceMode(forceMode === 'dark' ? 'light' : 'dark');
    }
  };

  const modeKey = showDark ? 'dark' : 'light';

  return (
    <div
      className="min-h-screen transition-colors duration-700"
      style={{ backgroundColor: showDark ? '#0a0a0a' : '#f9f7f1' }}
    >
      <SEOHead
        title="Blogs | Thanas R"
        description="Read articles and blog posts by Thanas R on development, AI, design, and creative problem-solving."
        path="/blogs"
      />
      <div className="relative z-50">
        <Navbar forceDark={showDark && forceMode !== 'auto'} forceLight={!showDark && forceMode !== 'auto'} />
      </div>

      <AnimatePresence mode="wait">
        {mounted && (
          <motion.div
            key={modeKey}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {showDark
              ? <BlogsDarkMode />
              : <BlogsLightMode />
            }
          </motion.div>
        )}
      </AnimatePresence>

      {mounted && (
        <BlogsModeSwitcher
          currentMode={showDark ? 'dark' : 'light'}
          onToggle={toggleMode}
        />
      )}
    </div>
  );
};

export default BlogsPage;
