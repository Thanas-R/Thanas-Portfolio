import { motion } from 'framer-motion';
import { Download, ZoomIn, ZoomOut } from 'lucide-react';
import { useState } from 'react';
import LightRays from '@/components/LightRays';
import Navbar from '@/components/Navbar';

const ResumePage = () => {
  const resumePath = '/resume.pdf';
  const [zoomLevel, setZoomLevel] = useState(100);

  const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 15, 200));
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 15, 100)); // min 100 to avoid negative space

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <LightRays className="opacity-60" />

      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Page title + controls */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative z-10 max-w-5xl mx-auto pb-3 flex items-end justify-between px-6"
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
            disabled={zoomLevel <= 100}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Zoom out"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={zoomIn}
            disabled={zoomLevel >= 200}
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
        className="relative z-10 max-w-5xl mx-auto px-6 pb-8"
      >
        <style>{`
          .resume-frame-wrap {
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid hsl(var(--border));
            background: hsl(var(--card));
            box-shadow: 0 8px 40px hsl(var(--foreground) / 0.06);
            /* A4 aspect ratio container */
            width: 100%;
            aspect-ratio: 210 / 297;
            max-height: calc(100vh - 200px);
          }
          @media (max-width: 768px) {
            .resume-frame-wrap {
              aspect-ratio: auto;
              height: calc(100vh - 180px);
            }
          }
          /* Custom thin scrollbar */
          .resume-frame-wrap::-webkit-scrollbar { width: 4px; }
          .resume-frame-wrap::-webkit-scrollbar-track { background: transparent; }
          .resume-frame-wrap::-webkit-scrollbar-thumb { background: hsl(var(--muted-foreground) / 0.3); border-radius: 999px; }
          .resume-frame-wrap iframe::-webkit-scrollbar { width: 4px; }
          .resume-frame-wrap iframe::-webkit-scrollbar-track { background: transparent; }
          .resume-frame-wrap iframe::-webkit-scrollbar-thumb { background: hsl(var(--muted-foreground) / 0.3); border-radius: 999px; }
        `}</style>

        <div className="resume-frame-wrap">
          <iframe
            src={`${resumePath}#toolbar=0&navpanes=0&view=FitH&zoom=${zoomLevel}`}
            title="Resume PDF"
            className="block w-full h-full border-none"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ResumePage;
