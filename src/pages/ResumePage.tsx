import { motion } from 'framer-motion';
import { Download, Maximize, Minimize } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import LightRays from '@/components/LightRays';
import Navbar from '@/components/Navbar';

const ResumePage = () => {
  const resumePath = '/resume.pdf';
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current?.requestFullscreen();
    }
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden" ref={containerRef}>
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
        className="relative z-10 max-w-5xl mx-auto px-6 pb-3 flex items-end justify-between">

        <div>
          
          <h1
            className="text-4xl md:text-5xl font-black text-foreground uppercase leading-none"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

            Resume
          </h1>
        </div>
        <div className="flex items-center gap-2 pb-1">
          <button
            onClick={toggleFullscreen}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors"
            title={isFullscreen ? 'Exit fit-to-page' : 'Fit to page'}>

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

      {/* PDF Viewer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 max-w-5xl mx-auto px-6 pb-[2px]">

        <style>{`
          .resume-frame-wrap {
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid hsl(var(--border));
            background: hsl(var(--card));
            box-shadow: 0 8px 40px hsl(var(--foreground) / 0.06);
          }

          /* Fit-to-page fullscreen mode */
          :fullscreen {
            background: hsl(var(--background));
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 24px;
          }
          :fullscreen .resume-frame-wrap {
            width: auto;
            height: 100%;
            max-height: 100%;
            aspect-ratio: 210 / 297;
          }
          :fullscreen .resume-frame-wrap iframe {
            width: 100%;
            height: 100%;
          }

          /* Custom thin scrollbar */
          .resume-frame-wrap::-webkit-scrollbar { width: 4px; }
          .resume-frame-wrap::-webkit-scrollbar-track { background: transparent; }
          .resume-frame-wrap::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 999px; }
        `}</style>

        <div className="resume-frame-wrap">
          {/*
              view=Fit makes the PDF zoom to fit the full page in view.
              We size the iframe to match A4 aspect ratio (210:297) so the whole PDF is visible without scrolling.
             */}
          <iframe
            src={`${resumePath}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
            title="Resume PDF"
            className="block w-full border-none"
            style={{
              /* A4 aspect ratio so the whole page is visible */
              height: isFullscreen ? '100%' : 'min(90vh, calc(100vw * 1.414 * 0.7))',
              minHeight: 500
            }} />

        </div>
      </motion.div>
    </div>);

};

export default ResumePage;