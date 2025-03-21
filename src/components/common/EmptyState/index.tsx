/**
 * EmptyState Component
 *
 * Displays a message when no data is available.
 *
 * @component
 * @example
 * ```tsx
 * <EmptyState
 *   title="No Results Found"
 *   description="Try adjusting your search or filter to find what you're looking for."
 *   icon={<IoSearchOutline className="w-12 h-12" />}
 *   action={<Button>Clear Filters</Button>}
 * />
 * ```
 */

import { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils/classNames";

/**
 * EmptyState component props
 */
export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  /** Title of the empty state */
  title?: string;
  /** Description explaining why there is no data or what actions to take */
  description?: string;
  /** Icon to display above the title */
  icon?: ReactNode;
  /** Call to action element */
  action?: ReactNode;
  /** Additional class names */
  className?: string;
}

/**
 * EmptyState displays a message when no data is available
 */
const EmptyState = ({
  title = "No Data Available",
  description,
  icon,
  action,
  className,
  ...props
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-4 py-12 text-center",
        "bg-secondary/50 rounded-lg border border-gray-800",
        className
      )}
      {...props}
    >
      {icon && <div className="text-gray-400 mb-4">{icon}</div>}

      <h3 className="text-xl font-semibold mb-2">{title}</h3>

      {description && (
        <p className="text-gray-400 max-w-md mb-6">{description}</p>
      )}

      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
