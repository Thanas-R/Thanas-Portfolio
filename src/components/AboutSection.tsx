import { motion } from 'framer-motion';
import { Code2, Users, Lightbulb, Rocket } from 'lucide-react';

const cards = [
{
  Icon: Code2,
  name: 'Developer',
  description: 'Building thoughtful digital experiences with React, TypeScript, and modern web technologies.'
},
{
  Icon: Lightbulb,
  name: 'Problem Solver',
  description: 'Enjoy simplifying complex challenges and finding elegant solutions.'
},
{
  Icon: Users,
  name: 'Team Player',
  description: 'Team-oriented, honest, and always willing to lead when needed.'
},
{
  Icon: Rocket,
  name: 'Always Learning',
  description: 'Passionate about daily growth and exploring new technologies.'
}];


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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cards.map((card) => (
              <div
                key={card.name}
                className="glow-card p-6 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg border border-foreground/10 flex items-center justify-center shrink-0">
                  <card.Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground font-['Space_Grotesk']">
                    {card.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;