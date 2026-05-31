import SimpleProjectDetail from '@/components/SimpleProjectDetail';
import type { Project } from '@/components/ProjectsSection';

interface Props {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

const AskPesuDetail = ({ project }: Props) => {
  return (
    <SimpleProjectDetail
      project={project}
      accent="#0EA5E9"
      titleFont="'Space Grotesk', sans-serif"
      titleNode={<>AskPESU</>}
      tagline="A Retrieval-Augmented Generation assistant that answers questions about PES University. I built the frontend; the RAG pipeline and infra are owned by the PESU Dev team."
      about="AskPESU lets students ask natural-language questions about PES University — academics, calendars, processes, clubs, the whole stack of campus knowledge — and get cited answers powered by a retrieval-augmented pipeline. The interface mirrors the design language I used for AskBookie so the two feel like a continuous family."
      aboutMore="My contribution is the frontend: chat UI, streaming responses, theming, and the responsive layout. The backend RAG pipeline, ingestion, and FastAPI service are owned and maintained by the PESU Dev organization."
      features={[
        { title: 'RAG-Backed Answers', desc: 'Citations pulled directly from the university knowledge base for trustworthy responses.' },
        { title: 'Streaming Chat UI', desc: 'Real-time token streaming with smooth message rendering for a responsive feel.' },
        { title: 'Shared Design Language', desc: 'Mirrors the AskBookie aesthetic so the PESU products read as a coherent family.' },
        { title: 'Hosted on HF Spaces', desc: 'Containerised FastAPI backend deployed on Hugging Face Spaces with Docker.' },
      ]}
      techStack={[
        { l: 'Frontend', v: 'React • TypeScript • Tailwind CSS' },
        { l: 'Backend', v: 'FastAPI (Python)' },
        { l: 'AI', v: 'RAG Pipeline' },
        { l: 'Infra', v: 'Docker • HF Spaces' },
        { l: 'Team', v: 'PESU Dev' },
        { l: 'My Role', v: 'Frontend Development' },
      ]}
    />
  );
};

export default AskPesuDetail;
