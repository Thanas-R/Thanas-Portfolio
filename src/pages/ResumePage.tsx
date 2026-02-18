import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Plus, Minus, Maximize } from 'lucide-react';
import { useState, useRef } from 'react';
import TopographicBackground from '@/components/TopographicBackground';

const ResumeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="m19.94 7.68-.03-.09a.8.8 0 0 0-.2-.29l-5-5c-.09-.09-.19-.15-.29-.2l-.09-.03a.8.8 0 0 0-.26-.05c-.02 0-.04-.01-.06-.01H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-12s-.01-.04-.01-.06c0-.09-.02-.17-.05-.26ZM6 20V4h7v4c0 .55.45 1 1 1h4v11z" />
    <path d="M8 11h8v2H8zm0 4h8v2H8zm0-8h3v2H8z" />
  </svg>
);

const ResumePage = () => {
  const resumePath = '/resume.pdf';
  const [zoom, setZoom] = useState(100);
  const containerRef = useRef<HTMLDivElement>(null);

  const zoomIn = () => setZoom((z) => Math.min(z + 20, 300));
  const zoomOut = () => setZoom((z) => Math.max(z, 100)); // Don't go below 100
  const zoomOutAction = () => setZoom((z) => Math.max(z - 20, 100));

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  return (
    <>
      <TopographicBackground />
      <div className="relative z-10 min-h-screen flex flex-col overflow-hidden">
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border"
        >
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>
              <div className="w-px h-5 bg-border" />
              <div className="flex items-center gap-2 text-foreground">
                <ResumeIcon />
                <span className="font-semibold font-['Space_Grotesk']">Thanas's Resume</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Zoom controls */}
              <div className="hidden sm:flex items-center gap-1 mr-2">
                <button
                  onClick={zoomOutAction}
                  disabled={zoom <= 100}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-xs text-muted-foreground w-10 text-center font-mono">{zoom}%</span>
                <button
                  onClick={zoomIn}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors ml-1"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
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

        {/* PDF Viewer — show full PDF, no iframe scrollbar */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 max-w-4xl w-full mx-auto px-6 py-8 overflow-auto"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style>{`.resume-scroll::-webkit-scrollbar { display: none; }`}</style>
          <div
            className="resume-scroll w-full rounded-2xl border border-border overflow-auto bg-card shadow-sm"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <iframe
              src={`${resumePath}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
              className="w-full border-none"
              title="Resume PDF"
              style={{
                height: `${Math.max(zoom, 100)}vh`,
                minHeight: '100vh',
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top center',
                border: 'none',
              }}
            />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ResumePage;
