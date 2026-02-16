import { motion } from 'framer-motion';

const skills = [
{ category: 'Languages', items: ['C', 'C++', 'Python', 'Java', 'TypeScript', 'JavaScript'] },
{ category: 'Web', items: ['HTML', 'React', 'Tailwind CSS'] },
{ category: 'Tools', items: ['VS Code', 'PyCharm', 'Git', 'Vercel'] }];


const AboutSection = () => {
  return (
    <section id="about" className="relative px-6 py-[40px]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}>

          <h2 className="text-3xl md:text-5xl font-bold text-foreground font-['Space_Grotesk'] tracking-tight">
            About
          </h2>
          <div className="mt-8 grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Passionate about coding and problem-solving. I enjoy simplifying complex challenges and building things that matter.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Team-oriented, honest, and always willing to lead when needed. I value positive environments and believe in growing a little every day.
              </p>
            </div>
            <div className="space-y-6">
              {skills.map((group) =>
              <div key={group.category}>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) =>
                  <span
                    key={skill}
                    className="text-sm px-3 py-1 rounded-full border border-foreground/10 text-foreground/80 bg-background/50 backdrop-blur-sm">

                        {skill}
                      </span>
                  )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default AboutSection;