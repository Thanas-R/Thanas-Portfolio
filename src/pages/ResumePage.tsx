import { motion } from 'framer-motion';
import { Download, ZoomIn, ZoomOut } from 'lucide-react';
import { useState, useRef, useCallback } from 'react';
import LightRays from '@/components/LightRays';
import Navbar from '@/components/Navbar';

const MIN_ZOOM = 100;
const MAX_ZOOM = 200;

const ResumePage = () => {
  const resumePath = '/resume.pdf';
  const [zoomLevel, setZoomLevel] = useState(MIN_ZOOM);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const zoomIn = useCallback(() => setZoomLevel((prev) => Math.min(prev + 15, MAX_ZOOM)), []);
  const zoomOut = useCallback(() => setZoomLevel((prev) => Math.max(prev - 15, MIN_ZOOM)), []);

  return (
    <div className="relative h-screen bg-background overflow-hidden">
      {/* WebGL light rays background */}
      <LightRays className="opacity-60" />

      {/* Navbar */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Page title */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative z-10 max-w-5xl mx-auto pb-3 flex items-end justify-between px-[20px]"
      >
        <div>
          <h1
            className="text-4xl md:text-5xl font-black text-foreground uppercase leading-none"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Resume
          </h1>
        </div>
        <div className="flex items-center gap-2 pb-1">
          <button
            onClick={zoomOut}
            disabled={zoomLevel <= MIN_ZOOM}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Zoom out"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={zoomIn}
            disabled={zoomLevel >= MAX_ZOOM}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Zoom in"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <a
            href={resumePath}
            download
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
        </div>
      </motion.div>

      {/* PDF Viewer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 max-w-5xl mx-auto px-6 mt-1"
        style={{ height: 'calc(100dvh - 148px)' }}
      >
        <style>{`
          .resume-scroll-area {
            height: 100%;
            border-radius: 16px;
            overflow: auto;
            border: 1px solid hsl(var(--border));
            background: hsl(var(--card));
            box-shadow: 0 8px 40px hsl(var(--foreground) / 0.06);
          }
          .resume-scroll-area::-webkit-scrollbar { width: 4px; height: 4px; }
          .resume-scroll-area::-webkit-scrollbar-track { background: transparent; }
          .resume-scroll-area::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 999px; }
          @media (max-width: 768px) {
            .resume-scroll-area { border-radius: 12px; }
          }
        `}</style>

        <div className="resume-scroll-area">
          <iframe
            ref={iframeRef}
            src={`${resumePath}#toolbar=0&navpanes=0&view=FitH&zoom=${zoomLevel}`}
            key={zoomLevel}
            title="Resume PDF"
            className="block border-none"
            style={{
              width: `${zoomLevel}%`,
              height: zoomLevel === MIN_ZOOM ? '100%' : `${zoomLevel}%`,
              minHeight: '100%',
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ResumePage;