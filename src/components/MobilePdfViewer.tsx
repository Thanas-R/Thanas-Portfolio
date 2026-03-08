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

  // Zoom & pan state
  const scaleRef = useRef(1);
  const translateRef = useRef({ x: 0, y: 0 });
  const pinchStartDistRef = useRef(0);
  const pinchStartScaleRef = useRef(1);
  const panStartRef = useRef({ x: 0, y: 0 });
  const lastTouchRef = useRef({ x: 0, y: 0 });
  const isPanningRef = useRef(false);

  const applyTransform = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const s = scaleRef.current;
    const { x, y } = translateRef.current;
    el.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
  }, []);

  const clampTranslate = useCallback(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) return;

    const s = scaleRef.current;
    const wW = wrapper.clientWidth;
    const wH = wrapper.clientHeight;
    const cW = container.scrollWidth * s;
    const cH = container.scrollHeight * s;

    const t = translateRef.current;
    if (cW <= wW) {
      t.x = 0;
    } else {
      const maxX = (cW - wW) / 2;
      t.x = Math.max(-maxX, Math.min(maxX, t.x));
    }
    if (cH <= wH) {
      t.y = 0;
    } else {
      const maxY = (cH - wH) / 2;
      t.y = Math.max(-maxY, Math.min(maxY, t.y));
    }
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const getTouchDist = (e: TouchEvent) => {
      const [a, b] = [e.touches[0], e.touches[1]];
      return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        pinchStartDistRef.current = getTouchDist(e);
        pinchStartScaleRef.current = scaleRef.current;
      } else if (e.touches.length === 1 && scaleRef.current > 1) {
        isPanningRef.current = true;
        lastTouchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        panStartRef.current = { ...translateRef.current };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dist = getTouchDist(e);
        const newScale = Math.max(1, Math.min(4, pinchStartScaleRef.current * (dist / pinchStartDistRef.current)));
        scaleRef.current = newScale;
        if (newScale === 1) {
          translateRef.current = { x: 0, y: 0 };
        }
        clampTranslate();
        applyTransform();
      } else if (e.touches.length === 1 && isPanningRef.current && scaleRef.current > 1) {
        e.preventDefault();
        const dx = e.touches[0].clientX - lastTouchRef.current.x;
        const dy = e.touches[0].clientY - lastTouchRef.current.y;
        lastTouchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        translateRef.current.x += dx;
        translateRef.current.y += dy;
        clampTranslate();
        applyTransform();
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        isPanningRef.current = false;
      }
      if (e.touches.length === 0 && scaleRef.current <= 1.05) {
        scaleRef.current = 1;
        translateRef.current = { x: 0, y: 0 };
        applyTransform();
      }
    };

    wrapper.addEventListener('touchstart', onTouchStart, { passive: false });
    wrapper.addEventListener('touchmove', onTouchMove, { passive: false });
    wrapper.addEventListener('touchend', onTouchEnd);

    return () => {
      wrapper.removeEventListener('touchstart', onTouchStart);
      wrapper.removeEventListener('touchmove', onTouchMove);
      wrapper.removeEventListener('touchend', onTouchEnd);
    };
  }, [applyTransform, clampTranslate]);

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

          const containerWidth = wrapperRef.current?.clientWidth ?? container.clientWidth;
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
    <div ref={wrapperRef} className="h-full overflow-y-auto resume-viewer" style={{ touchAction: 'pan-y' }}>
      {loading && (
        <div className="flex items-center justify-center h-32">
          <div className="w-6 h-6 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
        </div>
      )}
      <div
        ref={containerRef}
        className="w-full"
        style={{ transformOrigin: 'center top', willChange: 'transform' }}
      />
    </div>
  );
};

export default MobilePdfViewer;
