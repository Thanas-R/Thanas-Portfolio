import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';

const ResumeSection = () => {
  return (
    <section id="resume" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground font-['Space_Grotesk'] tracking-tight">
            Resume
          </h2>
          <div className="mt-8 border border-foreground/10 rounded-xl p-8 md:p-12 bg-background/40 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg border border-foreground/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground font-['Space_Grotesk']">
                    Thanas R — Resume
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    PDF • Updated 2025
                  </p>
                </div>
              </div>
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-foreground/20 text-foreground text-sm font-medium hover:bg-foreground hover:text-background transition-all duration-300"
                onClick={() => window.open('mailto:thanas5.rd@gmail.com?subject=Resume%20Request', '_blank')}
              >
                <Download className="w-4 h-4" />
                Request Resume
              </button>
            </div>

            <div className="mt-10 grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Strengths</h4>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li>Frontend Development</li>
                  <li>AI / ML Concepts</li>
                  <li>Full-stack Deployment</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Focus Areas</h4>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li>UI/UX Creativity</li>
                  <li>Educational Tech</li>
                  <li>Interactive Web Design</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Qualities</h4>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li>Team-oriented</li>
                  <li>Problem Solver</li>
                  <li>Community Builder</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection;
