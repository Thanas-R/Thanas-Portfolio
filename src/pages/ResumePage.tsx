import { motion } from 'framer-motion';
import { Download, ZoomIn, ZoomOut } from 'lucide-react';
import { useState } from 'react';
import LightRays from '@/components/LightRays';
import Navbar from '@/components/Navbar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ResumePage = () => {
  const resumePath = '/resume.pdf';
  const minScale = 1;
  const [scale, setScale] = useState(1);

  const zoomIn = () => setScale((s) => Math.min(s + 0.15, 2));
  const zoomOut = () => setScale((s) => Math.max(s - 0.15, minScale));

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
                  disabled={scale <= minScale}
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

      {/* PDF Viewer — uses img-like approach: embed the PDF as an object fitting the container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 max-w-5xl mx-auto px-6 mt-1"
        style={{ height: 'calc(100dvh - 148px)' }}
      >
        <div
          className="h-full rounded-2xl overflow-auto border border-border bg-card resume-shell"
          style={{
            boxShadow: '0 8px 40px hsl(var(--foreground) / 0.06)',
            scrollbarWidth: 'none',
          }}
        >
          <style>{`
            .resume-shell::-webkit-scrollbar,
            .resume-viewer::-webkit-scrollbar {
              width: 0;
              height: 0;
              display: none;
            }
            .resume-shell,
            .resume-viewer {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            @media (max-width: 768px) {
              .resume-viewer { border-radius: 12px; }
            }
          `}</style>
          <div
            className="resume-viewer"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
              width: '100%',
              height: `${Math.max(scale, minScale) * 100}%`,
            }}
          >
            <iframe
              src={`${resumePath}#toolbar=0&navpanes=0&pagemode=none&view=Fit&zoom=page-fit`}
              title="Resume PDF"
              className="block border-none w-full h-full"
              style={{ minHeight: '100%' }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResumePage;
