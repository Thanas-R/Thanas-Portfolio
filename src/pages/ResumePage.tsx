import { motion } from 'framer-motion';
import { Download, ZoomIn, ZoomOut } from 'lucide-react';
import { useState, useRef } from 'react';
import LightRays from '@/components/LightRays';
import Navbar from '@/components/Navbar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ResumePage = () => {
  const resumePath = '/resume.pdf';
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const zoomIn = () => setScale((s) => Math.min(s + 0.15, 2));
  const zoomOut = () => setScale((s) => Math.max(s - 0.15, 0.5));

  return (
    <div className="relative h-screen bg-background overflow-hidden">
      <LightRays className="opacity-60" />

      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Header row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative z-10 max-w-5xl mx-auto pb-3 flex items-end justify-between px-[20px]"
      >
        <h1
          className="text-4xl md:text-5xl font-black text-foreground uppercase leading-none"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Resume
        </h1>
        <div className="flex items-center gap-2 pb-1">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={zoomOut}
                  disabled={scale <= 0.5}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Zoom out</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={zoomIn}
                  disabled={scale >= 2}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Zoom in</TooltipContent>
            </Tooltip>
          </TooltipProvider>
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

      {/* PDF Viewer — full-page visible on load (no scrolling) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 max-w-5xl mx-auto px-6 mt-1"
        style={{ height: 'calc(100dvh - 148px)' }}
      >
        <div
          ref={containerRef}
          className="h-full rounded-2xl border border-border bg-card"
          style={{
            boxShadow: '0 8px 40px hsl(var(--foreground) / 0.06)',
            // hide scrollbars and prevent inner scrolling; we want the PDF fit into this area
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <style>{`
            @media (max-width: 768px) {
              .resume-embed { border-radius: 12px; }
            }
          `}</style>

          {/* 
            Use <embed type="application/pdf"> here:
            - height: 100% ensures the PDF page height fills the container,
            - width: auto + maxWidth: 100% keeps aspect ratio and prevents horizontal overflow.
            - the `#view=Fit` hash requests a full-page fit from the browser viewer.
          */}
          <div
            // wrapper allows us to apply zoom via CSS transform while keeping center alignment
            className="w-full h-full flex items-center justify-center"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
            }}
          >
            <embed
              className="resume-embed"
              src={`${resumePath}#toolbar=0&navpanes=0&view=Fit`}
              type="application/pdf"
              aria-label="Resume PDF"
              style={{
                height: '100%',
                width: 'auto',
                maxWidth: '100%',
                border: 'none',
                display: 'block',
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResumePage;
