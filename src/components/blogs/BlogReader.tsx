import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { BlogArticle } from './useBlogData';

interface Props {
  article: BlogArticle;
  isDark: boolean;
  onClose: () => void;
}

const formatDate = (iso: string) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
};

const BlogReader = ({ article, isDark, onClose }: Props) => {
  const paper = isDark ? '#2F2F2F' : '#F9F7F1';
  const ink = isDark ? '#F9F7F1' : '#2F2F2F';

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    // Lock both html and body so the background page's scrollbar is completely hidden
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, [onClose]);


  return (
    <div
      className="fixed inset-0 z-[60] overflow-y-auto"
      style={{
        backgroundColor: paper,
        color: ink,
        colorScheme: isDark ? 'dark' : 'light',
        transition: 'background-color 0.5s',
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close article"
        className="fixed top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full border-2 hover:opacity-70 transition-opacity"
        style={{ borderColor: ink, color: ink }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <div className="max-w-2xl mx-auto px-6 py-16">
        <p
          className="text-center text-xs tracking-[3px] uppercase mb-6"
          style={{ fontFamily: "'Playfair Display', serif", color: ink, opacity: 0.7 }}
        >
          {formatDate(article.date)}
        </p>

        <h1
          className="text-center leading-tight mb-3"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(34px, 6vw, 52px)', color: ink }}
        >
          {article.headline}
        </h1>

        {article.subheadline && (
          <>
            <div className="mx-auto my-3" style={{ width: '90px', height: '1px', backgroundColor: ink }} />
            <p
              className="text-center italic mb-3"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: '18px', color: ink, opacity: 0.85 }}
            >
              {article.subheadline}
            </p>
            <div className="mx-auto my-3" style={{ width: '90px', height: '1px', backgroundColor: ink }} />
          </>
        )}

        <div className="newspaper-md mt-10">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
        </div>

        <div className="mt-14 text-center">
          <button
            onClick={onClose}
            className="text-xs tracking-[3px] uppercase hover:opacity-70 transition-opacity"
            style={{ fontFamily: "'Playfair Display', serif", color: ink }}
          >
            Back to the paper
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogReader;
