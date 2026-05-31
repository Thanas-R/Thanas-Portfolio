import SimpleProjectDetail from '@/components/SimpleProjectDetail';
import type { Project } from '@/components/ProjectsSection';

interface Props {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

const OdinTreeDetail = ({ project }: Props) => {
  return (
    <SimpleProjectDetail
      project={project}
      accent="#3B82F6"
      titleFont="'Space Grotesk', sans-serif"
      titleNode={<>Odin Tree</>}
      tagline="Explore any GitHub repository as an interactive, node-based flowchart. Files, functions, classes and modules become draggable, zoomable nodes connected by their real import relationships."
      about="Odin Tree turns codebases into living maps. Paste any GitHub repo URL and Odin parses the AST, extracts imports, classes and functions, and renders the whole thing as a navigable graph. It is built for developers who want to onboard onto unfamiliar code quickly, spot architectural bottlenecks at a glance, or simply learn how good projects are organised."
      aboutMore="It is intentionally lightweight in the browser and does the heavy work via Tree-sitter parsing — everything stays interactive even on large repositories."
      features={[
        { title: 'AST Graph Builder', desc: 'Parses real source files with Tree-sitter and lifts modules into graph nodes.' },
        { title: 'Real Import Edges', desc: 'Edges reflect actual import relationships, not just folder structure.' },
        { title: 'Zoomable Canvas', desc: 'Pan, zoom and drag through repositories of any size with smooth interactions.' },
        { title: 'Repo by URL', desc: 'Drop in any public GitHub URL and explore — no clone, no setup, no install.' },
      ]}
      techStack={[
        { l: 'Frontend', v: 'React • TypeScript • Tailwind CSS' },
        { l: 'Graph', v: 'React Flow • Dagre' },
        { l: 'Parsing', v: 'Tree-sitter • AST' },
        { l: 'Data', v: 'GitHub API' },
        { l: 'Animation', v: 'Framer Motion' },
        { l: 'Hosting', v: 'Vercel' },
      ]}
    />
  );
};

export default OdinTreeDetail;
