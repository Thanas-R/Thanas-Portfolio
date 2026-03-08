import { useRef, ReactNode } from "react";
import styles from "./GradientCard.module.css";
import { cn } from "@/lib/utils";

interface GradientCardProps {
  children: ReactNode;
  className?: string;
}

const GradientCard = ({ children, className }: GradientCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current?.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current?.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(styles.card, "border-[0.9px] border-border bg-card p-5", className)}
    >
      <div className={styles.cardBorder} />
      <div className={cn(styles.cardContent, "h-full")}>
        {children}
      </div>
    </div>
  );
};

export default GradientCard;
