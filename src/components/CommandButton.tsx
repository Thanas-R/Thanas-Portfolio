import { Command } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const CommandButton = () => {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <button
      onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
      aria-label="Open command palette"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-xl border border-border bg-card/80 backdrop-blur-lg shadow-lg hover:bg-muted/80 transition-colors duration-200 cursor-pointer group"
    >
      <Command className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
    </button>
  );
};

export default CommandButton;
