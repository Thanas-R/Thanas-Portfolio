import React, { ReactNode, useRef, useEffect } from "react";
import clsx from "clsx";

interface GradientCardProps {
  children?: ReactNode;
  className?: string;
}

export default function GradientCard({ children, className }: GradientCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      cardRef.current.style.setProperty("--mouse-x", `${x}px`);
      cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    const throttledMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => handleMouseMove(e));
    };

    document.body.addEventListener("mousemove", throttledMouseMove);

    return () => {
      document.body.removeEventListener("mousemove", throttledMouseMove);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={clsx(
        "relative flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-b from-black/70 to-black/30 text-white backdrop-blur-sm",
        className
      )}
      style={{
        "--mouse-x": "0px",
        "--mouse-y": "0px",
      } as React.CSSProperties}
    >
      {/* Glow / border layer */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 transition-opacity duration-500 bg-[radial-gradient(400px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.6),transparent_40%)] hover:opacity-100"
      ></div>

      {/* Inner content slightly smaller */}
      <div className="relative z-10 h-[calc(100%-2px)] w-[calc(100%-2px)] m-[1px] rounded-[inherit] bg-black/95 px-4 py-3">
        {children}
      </div>
    </div>
  );
}
