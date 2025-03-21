/**
 * ScrollButton Component
 *
 * Button for controlling horizontal scrolling.
 */

import { ReactNode } from "react";
import { cn } from "@/lib/utils/classNames";

interface ScrollButtonProps {
  /** Direction of scrolling (left or right) */
  direction: "left" | "right";
  /** Click handler */
  onClick: () => void;
  /** Icon to display in the button */
  icon: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Button component for horizontal scrolling controls
 */
const ScrollButton: React.FC<ScrollButtonProps> = ({
  direction,
  onClick,
  icon,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 z-10 h-10 w-10",
        "flex items-center justify-center",
        "bg-secondary/80 hover:bg-accent/80",
        "rounded-full shadow-lg transition-colors",
        direction === "left" ? "left-0" : "right-0",
        className
      )}
      aria-label={`Scroll ${direction}`}
    >
      {icon}
    </button>
  );
};

export default ScrollButton;
