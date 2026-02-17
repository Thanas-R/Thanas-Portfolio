import { motion } from 'framer-motion';

const ContactSection = () => {
  return (
    <section id="contact" className="relative py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground font-['Space_Grotesk'] tracking-tight">
            Let's connect
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            Open to collaborations, interesting projects, or just a good conversation.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:thanas5.rd@gmail.com"
              className="px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
            >
              thanas5.rd@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/thanasr/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-foreground/20 text-foreground text-sm font-medium hover:bg-foreground hover:text-background transition-all duration-300"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Thanas-R"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-foreground/20 text-foreground text-sm font-medium hover:bg-foreground hover:text-background transition-all duration-300"
            >
              GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
