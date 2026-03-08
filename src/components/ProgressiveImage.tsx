import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

/**
 * Renders an image with a blur-up effect.
 * Shows a tiny blurred version immediately (via CSS blur on the same src),
 * then removes blur once the full image has loaded.
 */
const ProgressiveImage = ({ src, alt, className, containerClassName, ...props }: ProgressiveImageProps) => {
  const [loaded, setLoaded] = useState(false);

  const onLoad = useCallback(() => setLoaded(true), []);

  return (
    <div className={cn('overflow-hidden relative', containerClassName)}>
      <img
        src={src}
        alt={alt}
        onLoad={onLoad}
        className={cn(
          'transition-[filter] duration-500 ease-out',
          loaded ? 'blur-0' : 'blur-md scale-105',
          className
        )}
        {...props}
      />
    </div>
  );
};

export default ProgressiveImage;
