import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import LightRays from '@/components/LightRays';
import Navbar from '@/components/Navbar';

const ResumePage = () => {
  const resumePath = '/resume.pdf';

  return (
    <div className="relative h-screen bg-background overflow-hidden flex flex-col">
      <LightRays className="opacity-60" />

      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Header row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative z-10 max-w-5xl mx-auto w-full pb-3 flex items-end justify-between px-[20px]"
      >
        <h1
          className="text-4xl md:text-5xl font-black text-foreground uppercase leading-none"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Resume
        </h1>
        <div className="flex items-center gap-2 pb-1">
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

      {/* PDF Viewer — takes all remaining space */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 max-w-5xl mx-auto px-6 w-full flex-1 min-h-0 pb-4"
      >
        <div
          className="h-full rounded-2xl overflow-hidden border border-border bg-card"
          style={{
            boxShadow: '0 8px 40px hsl(var(--foreground) / 0.06)',
          }}
        >
          <object
            data={`${resumePath}#toolbar=0&navpanes=0&view=FitH`}
            type="application/pdf"
            className="block w-full h-full"
          >
            <iframe
              src={`https://docs.google.com/gview?url=${window.location.origin}${resumePath}&embedded=true`}
              title="Resume PDF"
              className="block border-none w-full h-full"
            />
          </object>
        </div>
      </motion.div>
    </div>
  );
};

export default ResumePage;
