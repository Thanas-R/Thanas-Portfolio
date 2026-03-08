import { useEffect, useRef, useState, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

interface Props {
  src: string;
}

const MobilePdfViewer = ({ src }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  // Zoom state
  const zoomState = useRef({
    scale: 1,
    originX: 0,
    originY: 0,
    translateX: 0,
    translateY: 0,
    initialDistance: 0,
    initialScale: 1,
    isPinching: false,
    // For pan during zoom
    lastTouchX: 0,
    lastTouchY: 0,
  });

  const MIN_SCALE = 1;
  const MAX_SCALE = 4;

  const applyTransform = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const { scale, translateX, translateY } = zoomState.current;
    container.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    container.style.transformOrigin = '0 0';
  }, []);

  const clampTranslation = useCallback(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    const { scale } = zoomState.current;
    const wrapperRect = wrapper.getBoundingClientRect();
    const contentWidth = container.scrollWidth * scale;
    const contentHeight = container.scrollHeight * scale;

    const maxX = 0;
    const minX = Math.min(0, wrapperRect.width - contentWidth);
    const maxY = 0;
    const minY = Math.min(0, wrapperRect.height - contentHeight);

    zoomState.current.translateX = Math.max(minX, Math.min(maxX, zoomState.current.translateX));
    zoomState.current.translateY = Math.max(minY, Math.min(maxY, zoomState.current.translateY));
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const getTouchDistance = (t1: Touch, t2: Touch) =>
      Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);

    const getTouchCenter = (t1: Touch, t2: Touch) => ({
      x: (t1.clientX + t2.clientX) / 2,
      y: (t1.clientY + t2.clientY) / 2,
    });

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const z = zoomState.current;
        z.isPinching = true;
        z.initialDistance = getTouchDistance(e.touches[0], e.touches[1]);
        z.initialScale = z.scale;
        const center = getTouchCenter(e.touches[0], e.touches[1]);
        z.lastTouchX = center.x;
        z.lastTouchY = center.y;
      } else if (e.touches.length === 1 && zoomState.current.scale > 1) {
        // Allow panning when zoomed
        zoomState.current.lastTouchX = e.touches[0].clientX;
        zoomState.current.lastTouchY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const z = zoomState.current;

      if (e.touches.length === 2) {
        e.preventDefault();
        const dist = getTouchDistance(e.touches[0], e.touches[1]);
        const center = getTouchCenter(e.touches[0], e.touches[1]);

        const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, z.initialScale * (dist / z.initialDistance)));

        // Adjust translation to zoom toward pinch center
        const wrapperRect = wrapper.getBoundingClientRect();
        const pinchX = center.x - wrapperRect.left;
        const pinchY = center.y - wrapperRect.top;

        const scaleRatio = newScale / z.scale;
        z.translateX = pinchX - scaleRatio * (pinchX - z.translateX);
        z.translateY = pinchY - scaleRatio * (pinchY - z.translateY);

        // Also handle pan during pinch
        const dx = center.x - z.lastTouchX;
        const dy = center.y - z.lastTouchY;
        z.translateX += dx;
        z.translateY += dy;
        z.lastTouchX = center.x;
        z.lastTouchY = center.y;

        z.scale = newScale;
        clampTranslation();
        applyTransform();
      } else if (e.touches.length === 1 && z.scale > 1) {
        // Pan when zoomed in
        e.preventDefault();
        const dx = e.touches[0].clientX - z.lastTouchX;
        const dy = e.touches[0].clientY - z.lastTouchY;
        z.translateX += dx;
        z.translateY += dy;
        z.lastTouchX = e.touches[0].clientX;
        z.lastTouchY = e.touches[0].clientY;
        clampTranslation();
        applyTransform();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const z = zoomState.current;
      if (e.touches.length < 2) {
        z.isPinching = false;
      }
      // Snap back to 1x if close
      if (z.scale < 1.05) {
        z.scale = 1;
        z.translateX = 0;
        z.translateY = 0;
        applyTransform();
      }
      // Update single-touch tracking for continued pan
      if (e.touches.length === 1) {
        z.lastTouchX = e.touches[0].clientX;
        z.lastTouchY = e.touches[0].clientY;
      }
    };

    wrapper.addEventListener('touchstart', handleTouchStart, { passive: false });
    wrapper.addEventListener('touchmove', handleTouchMove, { passive: false });
    wrapper.addEventListener('touchend', handleTouchEnd);

    return () => {
      wrapper.removeEventListener('touchstart', handleTouchStart);
      wrapper.removeEventListener('touchmove', handleTouchMove);
      wrapper.removeEventListener('touchend', handleTouchEnd);
    };
  }, [applyTransform, clampTranslation]);

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      const container = containerRef.current;
      if (!container) return;

      try {
        const pdf = await pdfjsLib.getDocument(src).promise;
        if (cancelled) return;

        container.innerHTML = '';

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          if (cancelled) return;

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;

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
    <div ref={wrapperRef} className="h-full overflow-y-auto resume-viewer touch-none" style={{ overscrollBehavior: 'contain' }}>
      {loading && (
        <div className="flex items-center justify-center h-32">
          <div className="w-6 h-6 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
        </div>
      )}
      <div ref={containerRef} className="w-full" style={{ willChange: 'transform' }} />
    </div>
  );
};

export default MobilePdfViewer;
