import { useRef, useCallback, useEffect, memo } from "react";
import { cn } from "@/lib/utils";

interface GlowingEffectProps {
  blur?: number;
  proximity?: number;
  spread?: number;
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  borderWidth?: number;
  inactiveZone?: number;
  variant?: "default" | "white";
  movementDuration?: number;
}

const GlowingEffect = memo(
  ({
    proximity = 64,
    spread = 40,
    blur = 0,
    glow = false,
    className,
    disabled = false,
    borderWidth = 2,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

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
      document.body.addEventListener("pointermove", handleMove, { passive: true });
      document.body.addEventListener("pointerleave", handleLeave);
      return () => {
        document.body.removeEventListener("pointermove", handleMove);
        document.body.removeEventListener("pointerleave", handleLeave);
      };
    }, [handleMove, handleLeave, disabled]);

    if (disabled) return null;

    return (
      <div
        ref={containerRef}
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300",
          className
        )}
        style={
          {
            "--glow-x": "0px",
            "--glow-y": "0px",
            "--glow-opacity": "0",
            "--glow-spread": `${spread}px`,
            "--glow-blur": `${blur}px`,
            "--glow-border-width": `${borderWidth}px`,
          } as React.CSSProperties
        }
      >
        {/* Edge glow overlay */}
        <div
          className="absolute inset-0 rounded-[inherit] opacity-[var(--glow-opacity)] transition-opacity duration-300"
          style={{
            background: `radial-gradient(${spread * 4}px circle at var(--glow-x) var(--glow-y), rgba(255,255,255,0.15), transparent 70%)`,
            mask: `linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)`,
            WebkitMask: `linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)`,
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: `${borderWidth}px`,
          }}
        />
      </div>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };
