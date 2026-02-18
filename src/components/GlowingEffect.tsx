import { memo, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { animate } from "motion/react";

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    movementDuration = 2,
    borderWidth = 1,
    disabled = true,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);

    const handleMove = useCallback(
      (e?: MouseEvent | { x: number; y: number }) => {
        if (!containerRef.current) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(
            mouseX - center[0],
            mouseY - center[1]
          );
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0");

          if (!isActive) return;

          const currentAngle =
            parseFloat(element.style.getPropertyValue("--start")) || 0;
          let targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
              Math.PI +
            90;

          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => {
              element.style.setProperty("--start", String(value));
            },
          });
        });
      },
      [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
      if (disabled) return;

      const handleScroll = () => handleMove();
      const handlePointerMove = (e: PointerEvent) => handleMove(e);

      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove, disabled]);

    return (
      <div
        ref={containerRef}
        style={
          {
            "--blur": `${blur}px`,
            "--spread": spread,
            "--start": "0",
            "--active": "0",
            "--glowing-border-width": `${borderWidth}px`,
            "--repeating-conic-gradient-times": "5",
            "--gradient": variant === "white"
              ? `repeating-conic-gradient(
                  from calc(var(--start) * 1deg),
                  hsl(0 0% 100% / 0.15) 0%,
                  hsl(0 0% 100% / 0.15) calc(100% / var(--repeating-conic-gradient-times)),
                  transparent calc(100% / var(--repeating-conic-gradient-times)),
                  transparent calc(200% / var(--repeating-conic-gradient-times))
                )`
              : `repeating-conic-gradient(
                  from calc(var(--start) * 1deg),
                  hsl(var(--glow-color) / calc(0.5 * var(--active))) 0%,
                  hsl(var(--glow-color) / calc(0.3 * var(--active))) calc(100% / var(--repeating-conic-gradient-times)),
                  transparent calc(100% / var(--repeating-conic-gradient-times)),
                  transparent calc(200% / var(--repeating-conic-gradient-times))
                )`,
          } as React.CSSProperties
        }
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit]",
          "after:content-[''] after:absolute after:inset-[var(--glowing-border-width)] after:rounded-[inherit] after:border after:border-transparent",
          "after:[background:var(--gradient)] after:[background-attachment:fixed] after:[background-size:100%_100%]",
          glow && "after:opacity-[var(--active)]",
          blur > 0 && "after:blur-[var(--blur)]",
          className,
          disabled && "!hidden"
        )}
      />
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };
