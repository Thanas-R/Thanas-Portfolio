import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

interface Props {
  src: string;
}

const MobilePdfViewer = ({ src }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      const container = containerRef.current;
      if (!container) return;

      try {
        const pdf = await pdfjsLib.getDocument(src).promise;
        if (cancelled) return;

        // Clear previous renders
        container.innerHTML = '';

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          if (cancelled) return;

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;

          // Use container width for scaling
          const containerWidth = container.clientWidth;
          const unscaledViewport = page.getViewport({ scale: 1 });
          const scale = (containerWidth * window.devicePixelRatio) / unscaledViewport.width;
          const viewport = page.getViewport({ scale });

          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = '100%';
          canvas.style.height = 'auto';
          canvas.style.display = 'block';

          if (i > 1) {
            canvas.style.marginTop = '8px';
          }

          container.appendChild(canvas);

          await page.render({ canvasContext: ctx, viewport }).promise;
        }
      } catch (err) {
        console.error('PDF render error:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    render();
    return () => { cancelled = true; };
  }, [src]);

  return (
    <div className="h-full overflow-y-auto resume-viewer">
      {loading && (
        <div className="flex items-center justify-center h-32">
          <div className="w-6 h-6 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
        </div>
      )}
      <div ref={containerRef} className="w-full" />
    </div>
  );
};

export default MobilePdfViewer;
