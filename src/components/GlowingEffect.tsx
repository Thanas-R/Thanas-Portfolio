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

    // pointer move handler (unchanged)
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

    // Effect to set up pointer listeners
    useEffect(() => {
      if (disabled) return;
      document.body.addEventListener("pointermove", handleMove, { passive: true });
      document.body.addEventListener("pointerleave", handleLeave);
      return () => {
        document.body.removeEventListener("pointermove", handleMove);
        document.body.removeEventListener("pointerleave", handleLeave);
      };
    }, [handleMove, handleLeave, disabled]);

    // Theme detection + watcher: sets --glow-color on the overlay element.
    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      const getIsDark = () => {
        // Tailwind uses a 'dark' class on documentElement; also respect prefers-color-scheme
        const hasDarkClass =
          typeof document !== "undefined" &&
          document.documentElement.classList.contains("dark");
        const prefersDark =
          typeof window !== "undefined" &&
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
        return hasDarkClass || prefersDark;
      };

      const applyColor = () => {
        const isDark = getIsDark();
        // We keep the alpha in the color so the gradient uses the correct translucency.
        const color = isDark ? "rgba(255,255,255,0.15)" : "rgba(67,181,129,0.15)"; // #43B581 -> rgba(67,181,129)
        el.style.setProperty("--glow-color", color);
      };

      applyColor();

      // Listen for prefers-color-scheme changes
      let mql: MediaQueryList | null = null;
      if (typeof window !== "undefined" && window.matchMedia) {
        mql = window.matchMedia("(prefers-color-scheme: dark)");
        const mqlHandler = (ev: MediaQueryListEvent) => applyColor();
        // older browsers use addListener
        if (mql.addEventListener) mql.addEventListener("change", mqlHandler);
        else if ((mql as any).addListener) (mql as any).addListener(mqlHandler);
      }

      // Also observe class attribute changes on <html> (useful for Tailwind's 'dark' class toggles)
      const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
          if (m.type === "attributes" && (m as MutationRecord).attributeName === "class") {
            applyColor();
            break;
          }
        }
      });
      observer.observe(document.documentElement, { attributes: true });

      return () => {
        if (mql) {
          if (mql.removeEventListener) mql.removeEventListener("change", applyColor);
          else if ((mql as any).removeListener) (mql as any).removeListener(applyColor);
        }
        observer.disconnect();
      };
    }, []);

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
            // default color (will be overridden by effect once mounted)
            "--glow-color": "rgba(255,255,255,0.15)",
          } as React.CSSProperties
        }
      >
        {/* Edge glow overlay */}
        <div
          className="absolute inset-0 rounded-[inherit] opacity-[var(--glow-opacity)] transition-opacity duration-300"
          style={{
            // use the CSS variable for the color so theme switching works
            background: `radial-gradient(${spread * 4}px circle at var(--glow-x) var(--glow-y), var(--glow-color), transparent 70%)`,
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
