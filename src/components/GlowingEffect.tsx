import { useRef, useCallback, useEffect, memo, useState } from "react";
import { cn } from "@/lib/utils";

interface GlowingEffectProps {
  blur?: number;
  proximity?: number;
  spread?: number;
  className?: string;
  disabled?: boolean;
  borderWidth?: number;
}

const GlowingEffect = memo(
  ({
    proximity = 120,
    spread = 80,
    blur = 8,
    className,
    disabled = false,
    borderWidth = 0.5,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
      const checkTheme = () => {
        const dark = document.documentElement.classList.contains("dark");
        setIsDark(dark);
      };

      checkTheme();

      const observer = new MutationObserver(checkTheme);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      return () => observer.disconnect();
    }, []);

    const handleMove = useCallback(
      (e: PointerEvent) => {
        const el = containerRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const isNear =
          e.clientX > rect.left - proximity &&
          e.clientX < rect.right + proximity &&
          e.clientY > rect.top - proximity &&
          e.clientY < rect.bottom + proximity;

        if (isNear) {
          el.style.setProperty("--glow-x", `${x}px`);
          el.style.setProperty("--glow-y", `${y}px`);
          el.style.setProperty("--glow-opacity", "1");
        } else {
          el.style.setProperty("--glow-opacity", "0");
        }
      },
      [proximity]
    );

    const handleLeave = useCallback(() => {
      const el = containerRef.current;
      if (el) el.style.setProperty("--glow-opacity", "0");
    }, []);

    useEffect(() => {
      if (disabled) return;

      document.body.addEventListener("pointermove", handleMove, {
        passive: true,
      });
      document.body.addEventListener("pointerleave", handleLeave);

      return () => {
        document.body.removeEventListener("pointermove", handleMove);
        document.body.removeEventListener("pointerleave", handleLeave);
      };
    }, [handleMove, handleLeave, disabled]);

    if (disabled) return null;

    const glowColor = isDark
      ? "rgba(255,255,255,0.35)"
      : "rgba(0,0,0,0.35)";

    return (
      <div
        ref={containerRef}
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit]",
          className
        )}
        style={
          {
            "--glow-x": "0px",
            "--glow-y": "0px",
            "--glow-opacity": "0",
          } as React.CSSProperties
        }
      >
        {/* Border glow */}
        <div
          className="absolute inset-0 rounded-[inherit] opacity-[var(--glow-opacity)] transition-opacity duration-150"
          style={{
            background: `radial-gradient(${spread * 8}px circle at var(--glow-x) var(--glow-y), ${glowColor}, transparent 70%)`,
            mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: `${borderWidth}px`,
            filter: `blur(${blur}px)`,
          }}
        />
        {/* Subtle inner glow */}
        <div
          className="absolute inset-0 rounded-[inherit] opacity-[var(--glow-opacity)] transition-opacity duration-150"
          style={{
            background: `radial-gradient(${spread * 5}px circle at var(--glow-x) var(--glow-y), ${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'}, transparent 70%)`,
          }}
        />
      </div>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };
