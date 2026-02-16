import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
{ title: 'PESU Forge', tags: ['React', 'AI', 'EdTech'] },
{ title: 'AskBookie_', tags: ['React', 'RAG', 'Frontend'] },
{ title: 'PESU Minecraft S2', tags: ['React', 'Community'] },
{ title: 'ThanasOS', tags: ['React', 'Creative'] },
{ title: 'Smart Chef', tags: ['Python', 'ML', 'NLP'] },
{ title: 'Contour Flow Demo', tags: ['Canvas', 'Animation'] }];


const ProjectsSection = () => {
  return (
    <section id="projects" className="relative px-6 py-[90px]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}>

          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground font-['Space_Grotesk'] tracking-tight">
              Projects
            </h2>
            <Link
              to="/projects"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">

              View all
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-0 border-t border-foreground/10">
            {projects.map((project, i) =>
            <motion.div
              key={project.title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}>

                <Link
                to="/projects"
                className="flex items-center justify-between py-4 border-b border-foreground/10 group hover:pl-2 transition-all duration-300">

                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground font-mono w-6">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-base md:text-lg font-semibold text-foreground font-['Space_Grotesk'] group-hover:text-muted-foreground transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="hidden md:flex gap-2">
                      {project.tags.map((tag) =>
                    <span key={tag} className="text-xs text-muted-foreground">
                          {tag}
                        </span>
                    )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>);

};

export default ProjectsSection;