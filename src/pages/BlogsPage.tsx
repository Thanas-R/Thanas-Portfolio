import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/use-theme';
import Navbar from '@/components/Navbar';
import BlogsNewspaper from '@/components/blogs/BlogsNewspaper';
import SEOHead from '@/components/SEOHead';

const BlogsPage = () => {
  const { isDark } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const paper = isDark ? '#2F2F2F' : '#F9F7F1';

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{ backgroundColor: paper }}
    >
      <SEOHead
        title="Blogs | Thanas R"
        description="Read articles and blog posts by Thanas R on development, AI, design, and creative problem-solving."
        path="/blogs"
      />
      <div className="relative z-50">
        <Navbar />
      </div>

      {mounted && <BlogsNewspaper isDark={isDark} />}
    </div>
  );
};

export default BlogsPage;
