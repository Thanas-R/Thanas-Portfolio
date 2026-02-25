import { motion } from 'framer-motion';
import { Download, Maximize, Minimize, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import LightRays from '@/components/LightRays';
import Navbar from '@/components/Navbar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ResumePage = () => {
  const resumePath = '/resume.pdf';

  // Zoom is expressed as percent (100 = 1x). Adjust increment/min/max to taste.
  const [zoomPercent, setZoomPercent] = useState(100);
  const minZoom = 60;
  const maxZoom = 200;
  const zoomStep = 15;

  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenTargetRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const zoomIn = () => setZoomPercent((z) => Math.min(z + zoomStep, maxZoom));
  const zoomOut = () => setZoomPercent((z) => Math.max(z - zoomStep, minZoom));

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }
      await fullscreenTargetRef.current?.requestFullscreen();
    } catch (e) {
      // ignore silently; full screen may be blocked by browser or user gesture rules
      // you could add a toast here if desired
    }
  };

  useEffect(() => {
    const handler = () => {
      setIsFullscreen(document.fullscreenElement === fullscreenTargetRef.current);
    };

    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const scale = zoomPercent / 100;

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
                  disabled={zoomPercent <= minZoom}
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
                  disabled={zoomPercent >= maxZoom}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Zoom in</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleFullscreen}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors"
                  title={isFullscreen ? 'Exit PDF fullscreen' : 'PDF fullscreen'}
                  aria-label={isFullscreen ? 'Exit PDF fullscreen' : 'PDF fullscreen'}
                >
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </button>
              </TooltipTrigger>
              <TooltipContent>{isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}</TooltipContent>
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

      {/* PDF Viewer (upgraded loader/wrapper, preserves current layout feel) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 max-w-5xl mx-auto px-6 mt-1"
        style={{ height: 'calc(100dvh - 148px)' }}
      >
        <style>{`
          /* frame wrapper styles (supports fullscreen) */
          .resume-frame-wrap {
            position: relative;
            width: 100%;
            max-width: 980px;
            margin: 0 auto;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid hsl(var(--border));
            background: hsl(var(--card));
            box-shadow: 0 8px 40px hsl(var(--foreground) / 0.06);
            aspect-ratio: 1 / 1.414; /* approximate A4-ish */
            display: block;
          }

          .resume-frame-wrap iframe {
            width: 100%;
            height: 100%;
            border: none;
            display: block;
          }

          /* fullscreen styles for the wrapper */
          .resume-frame-wrap:fullscreen {
            width: 100vw;
            height: 100vh;
            max-width: 100vw;
            margin: 0;
            border-radius: 0;
            border: 0;
            aspect-ratio: auto;
            background: hsl(var(--background));
            box-shadow: none;
          }

          .resume-frame-wrap:fullscreen iframe {
            width: 100%;
            height: 100%;
          }

          /* inner viewer that we scale */
          .resume-viewer {
            width: 100%;
            height: 100%;
            transform-origin: top center;
            will-change: transform;
          }

          /* custom scrollbars (works in modern browsers) */
          .resume-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
          .resume-scroll::-webkit-scrollbar-track { background: transparent; }
          .resume-scroll::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 999px; }
          @media (max-width: 768px) {
            .resume-frame-wrap { border-radius: 12px; }
          }
        `}</style>

        <div
          ref={containerRef}
          className="h-full rounded-2xl overflow-auto resume-scroll"
          style={{
            boxShadow: '0 8px 40px hsl(var(--foreground) / 0.06)',
            scrollbarWidth: 'thin',
            scrollbarColor: 'hsl(var(--border)) transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            ref={fullscreenTargetRef}
            className="resume-frame-wrap"
            aria-hidden={false}
            /* keep a sensible minHeight so scaling works nicely */
            style={{ minHeight: 640 }}
          >
            {/* When in fullscreen we show an explicit exit button for clarity */}
            {isFullscreen && (
              <button
                onClick={toggleFullscreen}
                className="absolute top-4 left-4 z-30 flex items-center gap-2 rounded-full bg-black/70 text-white px-3 py-1 text-sm hover:bg-black/80 transition-colors"
                aria-label="Exit PDF fullscreen"
              >
                <X className="w-4 h-4" />
                Exit
              </button>
            )}

            {/* The scaled viewer wraps the iframe to allow smooth UI-level zooming */}
            <div
              className="resume-viewer"
              style={{
                transform: `scale(${scale})`,
                width: '100%',
                height: scale > 1 ? `${scale * 100}%` : '100%',
                transformOrigin: 'top center',
              }}
            >
              {/* embed PDF — toolbar hidden for cleaner UI */}
              <iframe
                src={`${resumePath}#toolbar=0&navpanes=0&view=FitH`}
                title="Resume PDF"
                loading="lazy"
                aria-label="Resume PDF"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResumePage;
