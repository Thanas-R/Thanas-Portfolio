import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import LightRays from '@/components/LightRays';
import Navbar from '@/components/Navbar';
import resumePreview from '@/assets/resume-preview.png';
import SEOHead from '@/components/SEOHead';

const ResumePage = () => {
  const resumePath = '/Thanas-Resume.pdf';

  return (
    <div className="relative min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Resume - Thanas R"
        description="View and download the resume of Thanas R - developer, creative problem-solver, and full-stack builder."
        path="/resume"
      />
      <LightRays className="opacity-60" />

      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Header row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative z-10 max-w-5xl mx-auto w-full pb-4 flex items-center justify-between px-4 md:px-5 gap-3"
      >
        <h1
          className="text-3xl md:text-5xl font-black text-foreground uppercase leading-none shrink-0"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Resume
        </h1>
        <div className="flex items-center gap-2">
          <a
            href={resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/20 text-foreground text-sm font-semibold hover:bg-foreground hover:text-background transition-all duration-300"
            aria-label="Open resume in new tab"
          >
            <FileText className="w-4 h-4" />
            Open as PDF
          </a>
          <a
            href={resumePath}
            download="Thanas-Resume.pdf"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity"
            aria-label="Download resume"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
        </div>
      </motion.div>

      {/* Resume as image — bigger on desktop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 w-full flex-1 pb-8"
      >
        <div
          className="rounded-2xl overflow-hidden border border-border bg-card"
          style={{
            boxShadow: '0 8px 40px hsl(var(--foreground) / 0.06)',
          }}
        >
          <img
            src={resumePreview}
            alt="Thanas R - Resume"
            className="w-full h-auto block"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ResumePage;
