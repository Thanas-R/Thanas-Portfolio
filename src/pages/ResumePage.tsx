import { motion } from 'framer-motion';
import { Download, Maximize, Minimize, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import LightRays from '@/components/LightRays';
import Navbar from '@/components/Navbar';

const ResumePage = () => {
  const resumePath = '/resume.pdf';
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(120);
  const fullscreenTargetRef = useRef<HTMLDivElement>(null);

  const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 10, 250));
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 10, 60));

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await fullscreenTargetRef.current?.requestFullscreen();
  };

  useEffect(() => {
    const handler = () => {
      setIsFullscreen(document.fullscreenElement === fullscreenTargetRef.current);
    };

    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const pdfSrc = useMemo(
    () => `${resumePath}#toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=${zoomLevel}`,
    [resumePath, zoomLevel]
  );

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <LightRays className="opacity-60" />

      <div className="relative z-20">
        <Navbar />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 flex items-end justify-between gap-4 pb-[18px] pl-[45px] pr-[45px]">

        <h1
          className="text-4xl md:text-5xl font-black text-foreground uppercase leading-none"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

          Resume
        </h1>

        <div className="flex items-center gap-2 pb-1">
          <button
            onClick={zoomOut}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors"
            title="Zoom out"
            aria-label="Zoom out">

            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={zoomIn}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors"
            title="Zoom in"
            aria-label="Zoom in">

            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors"
            title={isFullscreen ? 'Exit PDF fullscreen' : 'PDF fullscreen'}
            aria-label={isFullscreen ? 'Exit PDF fullscreen' : 'PDF fullscreen'}>

            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
          <a
            href={resumePath}
            download
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity">

            <Download className="w-4 h-4" />
            Download
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 max-w-6xl mx-auto px-4 pb-6 md:px-[45px]">

        <style>{`
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
            aspect-ratio: 1 / 1.414;
          }

          .resume-frame-wrap iframe {
            width: 100%;
            height: 100%;
            border: none;
            display: block;
          }

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
        `}</style>

        <div ref={fullscreenTargetRef} className="resume-frame-wrap">
          {isFullscreen &&
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 left-4 z-30 flex items-center gap-2 rounded-full bg-black/70 text-white px-4 py-2 text-sm hover:bg-black/80 transition-colors"
            aria-label="Exit PDF fullscreen">

              <X className="w-4 h-4" />
              Exit
            </button>
          }

          <iframe
            key={zoomLevel}
            src={pdfSrc}
            title="Resume PDF"
            loading="lazy" />

        </div>
      </motion.div>
    </div>);

};

export default ResumePage;