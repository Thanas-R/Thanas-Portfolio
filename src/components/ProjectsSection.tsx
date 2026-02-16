import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'PESU Forge',
    description: 'AI-powered study platform that converts course notes into interactive quizzes and mini-games.',
    live: 'https://pesu-forge.vercel.app/',
    github: 'https://github.com/Thanas-R/PESU-Forge',
    tags: ['React', 'AI', 'EdTech'],
  },
  {
    title: 'AskBookie_',
    description: 'Production-ready RAG API frontend for document Q&A over PES University slides.',
    live: 'https://askbookie.vercel.app',
    github: 'https://github.com/dotpmm/askbookie-frontend',
    tags: ['React', 'RAG', 'Frontend'],
    role: 'Frontend Developer',
  },
  {
    title: 'PESU Minecraft S2',
    description: 'Official website for PESU Minecraft Server – Season 2 with events, server info, and community updates.',
    live: 'https://pesu-mc.vercel.app',
    github: 'https://github.com/Thanas-R/PESU-MC-S2-Website',
    tags: ['React', 'Community'],
  },
  {
    title: 'ThanasOS',
    description: 'macOS-themed interactive portfolio that mimics desktop interactions and showcases projects.',
    live: 'https://thanasr-old.vercel.app',
    github: 'https://github.com/Thanas-R',
    tags: ['React', 'Creative'],
  },
  {
    title: 'Smart Chef',
    description: 'In-memory Vector Space Model using TF-IDF and cosine similarity for recipe-based search.',
    github: 'https://github.com/Thanas-R/Smart-Chef',
    tags: ['Python', 'ML', 'NLP'],
  },
  {
    title: 'Contour Flow Demo',
    description: 'Lightweight animated topographic background designed for modern portfolio websites.',
    live: 'https://contour-flow-test.vercel.app/',
    github: 'https://github.com/Thanas-R/contour-flow-test',
    tags: ['Canvas', 'Animation'],
  },
];

const upcomingProjects = [
  {
    title: 'Mega Project',
    description: 'Under active development. Demo, write-up and source code coming soon.',
  },
  {
    title: 'Spheal',
    description: 'Agentic AI trip planner. Under active development.',
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground font-['Space_Grotesk'] tracking-tight">
            Projects
          </h2>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative border border-foreground/8 rounded-xl p-6 bg-background/40 backdrop-blur-sm hover:border-foreground/20 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground font-['Space_Grotesk']">
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
              {project.role && (
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">{project.role}</p>
              )}
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full border border-foreground/10 text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upcoming */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">Coming Soon</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {upcomingProjects.map((project) => (
              <div
                key={project.title}
                className="border border-dashed border-foreground/10 rounded-xl p-5 bg-background/20"
              >
                <h4 className="text-base font-semibold text-foreground/70 font-['Space_Grotesk']">{project.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
