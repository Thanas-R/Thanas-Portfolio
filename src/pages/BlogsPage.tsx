import { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import BlogsLightMode from '@/components/blogs/BlogsLightMode';
import BlogsDarkMode from '@/components/blogs/BlogsDarkMode';

const BlogsPage = () => {
  const { isDark } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      className="min-h-screen transition-colors duration-700"
      style={{ backgroundColor: isDark ? '#0a0a0a' : '#f9f7f1' }}
    >
      <div className="relative z-50">
        <Navbar />
      </div>
      <AnimatePresence mode="wait">
        {mounted && (
          <motion.div
            key={isDark ? 'dark' : 'light'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            {isDark ? <BlogsDarkMode /> : <BlogsLightMode />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogsPage;
