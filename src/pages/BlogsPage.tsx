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
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(8px)' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {isDark ? <BlogsDarkMode /> : <BlogsLightMode />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogsPage;
