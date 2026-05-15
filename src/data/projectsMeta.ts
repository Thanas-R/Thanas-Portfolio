/**
 * Pure-data project metadata — no React/asset imports.
 * Imported by both the React app (via ProjectsSection) and build-time
 * scripts (vite.config.ts, scripts/generate-sitemap.ts).
 * Adding a new entry here automatically:
 *   - extends the prerender route list
 *   - extends sitemap.xml
 *   - gets per-page canonical / OG / JSON-LD
 */
export interface ProjectMeta {
  id: string;
  title: string;
  description: string;
  tags: string[];
  live?: string;
  github?: string;
}

export const projectsMeta: ProjectMeta[] = [
  {
    id: 'nautilus',
    title: 'Nautilus',
    description: 'AI knowledge tool with mindmaps, flowcharts & concept cards.',
    tags: ['React', 'Canvas', 'AI', 'TypeScript', 'Graph'],
    live: 'https://nautilus-build.vercel.app',
    github: 'https://github.com/Thanas-R/Nautilus',
  },
  {
    id: 'virdis',
    title: 'Virdis',
    description: 'AI-powered farm boundary mapping & crop health analysis.',
    tags: ['Mapbox', 'Earth Engine', 'TypeScript', 'React', 'Supabase', 'Gemini AI'],
    live: 'https://virdis.vercel.app',
    github: 'https://github.com/Thanas-R/Virdis',
  },
  {
    id: 'spheal',
    title: 'Spheal',
    description: 'Smart AI travel planner with interactive map visualization.',
    tags: ['React', 'Mapbox', 'Gemini AI', 'TypeScript'],
    live: 'https://spheal-worldwide.vercel.app/',
    github: 'https://github.com/Thanas-R/Spheal',
  },
  {
    id: 'pesu-mc',
    title: 'PESU Minecraft S2',
    description: 'Official website for PESU Minecraft Server – Season 2.',
    tags: ['React', 'Tailwind', 'Vercel', 'REST API'],
    live: 'https://pesu-mc.vercel.app',
    github: 'https://github.com/Thanas-R/PESU-MC-S2-Website',
  },
  {
    id: 'askbookie',
    title: 'AskBookie_',
    description: 'Production-ready RAG API frontend for document Q&A.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'RAG', 'Vite'],
    live: 'https://ask-bookie.vercel.app',
    github: 'https://github.com/dotpmm/askbookie-frontend',
  },
  {
    id: 'contour-flow',
    title: 'Contour Flow',
    description: 'Real-time procedural topographic map generator rendered to canvas.',
    tags: ['React', 'Canvas', 'TypeScript', 'Simplex Noise'],
    live: 'https://contour-flow.vercel.app/',
    github: 'https://github.com/Thanas-R/contour-flow',
  },
  {
    id: 'smart-chef',
    title: 'Smart Chef',
    description: 'In-memory recipe recommender using TF-IDF and cosine similarity.',
    tags: ['Python', 'TF-IDF', 'VSM'],
    live: 'https://smart-chef-pesu.vercel.app/',
    github: 'https://github.com/Thanas-R/Smart-Chef',
  },
  {
    id: 'thanas-os',
    title: 'ThanasOS',
    description: 'macOS-themed interactive portfolio.',
    tags: ['React', 'CSS', 'Framer Motion', 'Zustand'],
    live: 'https://thanas-os.vercel.app/',
    github: 'https://github.com/Thanas-R/thanas-OS',
  },
  {
    id: 'pesu-forge',
    title: 'PESU Forge',
    description: 'AI-powered study tool that turns notes into flashcards, quizzes and mind maps.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Gemini AI', 'Zustand'],
    live: 'https://pesuforge.vercel.app',
    github: 'https://github.com/Thanas-R/PESU-Forge',
  },
];

export const projectIds = projectsMeta.map((p) => p.id);
