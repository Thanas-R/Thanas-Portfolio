import { motion } from 'framer-motion';
import { Code2, Users, Lightbulb, Rocket } from 'lucide-react';

const cards = [
  {
    Icon: Code2,
    name: 'Developer',
    description: 'Building thoughtful digital experiences with React, TypeScript, and modern web technologies.',
  },
  {
    Icon: Lightbulb,
    name: 'Problem Solver',
    description: 'Enjoy simplifying complex challenges and finding elegant solutions.',
  },
  {
    Icon: Users,
    name: 'Team Player',
    description: 'Team-oriented, honest, and always willing to lead when needed.',
  },
  {
    Icon: Rocket,
    name: 'Always Learning',
    description: 'Passionate about daily growth and exploring new technologies.',
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground font-['Space_Grotesk'] tracking-tight mb-8">
            About
          </h2>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <motion.div
                key={card.name}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glow-card p-6 group hover:border-foreground/20 transition-colors"
              >
                <card.Icon className="w-6 h-6 text-muted-foreground mb-3 group-hover:text-foreground transition-colors" />
                <h3 className="text-lg font-semibold text-foreground font-['Space_Grotesk'] mb-1">
                  {card.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-muted-foreground leading-relaxed max-w-2xl"
          >
            I value positive & cheerful environments. Open to collaborations, interesting projects, or just a good conversation.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
