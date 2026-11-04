import { useEffect, useRef, useState } from 'react';

/**
 * Background image with a consistent fade-in, even when the image is already
 * cached. Waits for the image to be decodable (load event or complete on
 * mount), then reveals it over two frames so the hidden state paints first
 * and the transition always animates.
 */
const ProgressiveBgImg = ({ src }: { src: string }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setLoaded(false);
    let cancelled = false;
    const img = imgRef.current;

    const reveal = () => {
      if (cancelled) return;
      // Two frames guarantee the opacity 0 state is painted before the fade starts
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!cancelled) setLoaded(true);
        });
      });
    };

    if (img?.complete) {
      reveal();
    } else {
      img?.addEventListener('load', reveal, { once: true });
    }

    return () => {
      cancelled = true;
      img?.removeEventListener('load', reveal);
    };
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt=""
      className="w-full h-full object-cover"
      loading="eager"
      decoding="async"
      style={{
        opacity: loaded ? 1 : 0,
        transform: loaded ? 'scale(1)' : 'scale(1.02)',
        transition: 'opacity 800ms ease-out, transform 800ms ease-out',
      }}
    />
  );
};

export default ProgressiveBgImg;
