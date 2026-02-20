import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Maximize, Minimize } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import TopographicBackground from '@/components/TopographicBackground';

const ResumePage = () => {
  const resumePath = '/resume.pdf';
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  return (
    <>
      <TopographicBackground />
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border"
        >
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>
              <div className="w-px h-5 bg-border" />
              <span className="font-semibold font-['Space_Grotesk'] text-foreground">Thanas's Resume</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleFullscreen}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors"
                title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>
              <a
                href={resumePath}
                download
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>
          </div>
        </motion.header>

        {/* PDF Viewer */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 flex flex-col bg-background"
        >
          <style>{`
            /* Custom thin scrollbar for the PDF container */
            .resume-scroll::-webkit-scrollbar {
              width: 6px;
              height: 6px;
            }
            .resume-scroll::-webkit-scrollbar-track {
              background: transparent;
            }
            .resume-scroll::-webkit-scrollbar-thumb {
              background: hsl(var(--border));
              border-radius: 999px;
            }
            .resume-scroll::-webkit-scrollbar-thumb:hover {
              background: hsl(var(--muted-foreground) / 0.5);
            }
            .resume-scroll {
              scrollbar-width: thin;
              scrollbar-color: hsl(var(--border)) transparent;
            }

            /* Fullscreen styles */
            :fullscreen {
              background: hsl(var(--background));
              display: flex;
              flex-direction: column;
            }
            :fullscreen .resume-scroll {
              flex: 1;
              overflow-y: auto;
            }
            :fullscreen iframe {
              min-height: 100%;
              height: auto !important;
            }
          `}</style>

          <div className="resume-scroll flex-1 overflow-y-auto px-4 py-6 md:px-8">
            <div className="max-w-4xl mx-auto w-full rounded-2xl border border-border overflow-hidden bg-card shadow-sm">
              {/*
                Use FitV to fit the full page height visible at once.
                When in fullscreen the height:100vh will fill the screen fully.
              */}
              <iframe
                src={`${resumePath}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                className="w-full border-none block"
                title="Resume PDF"
                style={{ height: '85vh', minHeight: 600 }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ResumePage;
