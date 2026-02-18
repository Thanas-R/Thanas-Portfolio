import { motion } from 'framer-motion';
import { Download, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import GridBackground from '@/components/GridBackground';
import Navbar from '@/components/Navbar';

const ResumePage = () => {
  const resumePath = '/resume.pdf';
  const [loading, setLoading] = useState(true);

  return (
    <>
      <GridBackground />
      <div className="relative z-10 min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>

            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-foreground font-['Space_Grotesk'] tracking-tight">
                  Thanas's Resume
                </h1>
                <p className="text-sm text-muted-foreground mt-2">PDF • Updated 2025</p>
              </div>
              <a
                href={resumePath}
                download
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>

            {/* PDF Viewer */}
            <div className="glow-card rounded-xl overflow-hidden" style={{ height: '80vh' }}>
              {loading && (
                <div className="flex items-center justify-center h-full">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
                    <span className="text-sm text-muted-foreground">Loading resume…</span>
                  </div>
                </div>
              )}
              <iframe
                src={resumePath}
                className={`w-full h-full ${loading ? 'invisible absolute' : ''}`}
                title="Resume PDF Viewer"
                onLoad={() => setLoading(false)}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ResumePage;
