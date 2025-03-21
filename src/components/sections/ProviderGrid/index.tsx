/**
 * ProviderGrid Component
 *
 * Displays a horizontally scrollable row of provider cards with title and optional "See All" link.
 *
 * @component
 * @example
 * ```tsx
 * <ProviderGrid
 *   title="All Providers"
 *   providers={providersArray}
 *   viewAllUrl="/providers"
 * />
 * ```
 */

"use client";

import { memo, useRef, useState, useEffect, HTMLAttributes } from "react";
import {
  IoGridOutline,
  IoChevronForward,
  IoChevronBack,
} from "react-icons/io5";
import { cn } from "@/lib/utils/classNames";
import ProviderCard from "@/components/ui/ProviderCard";
import Container from "@/components/layout/Container";
import EmptyState from "@/components/common/EmptyState";
import { Provider } from "@/types";
import ViewAllLink from "../ViewAllLink";
import Heading from "../Heading";

/**
 * ProviderGrid props
 */
export interface ProviderGridProps extends HTMLAttributes<HTMLElement> {
  /** Section title */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Array of provider objects */
  providers?: Provider[];
  /** Loading state */
  loading?: boolean;
  /** Error message */
  error?: string | null;
  /** URL for "View All" link */
  viewAllUrl?: string;
  /** Whether to show the "View All" link */
  showViewAll?: boolean;
  /** Maximum number of items to display */
  maxItems?: number;
  /** Message to display when there are no providers */
  emptyStateMessage?: string;
  /** Whether to show scroll indicators */
  showScrollIndicators?: boolean;
  /** Additional class names */
  className?: string;
}

/**
 * ProviderGrid displays a horizontally scrollable row of provider cards
 */
const ProviderGrid = memo(function ProviderGrid({
  title,
  providers = [],
  loading = false,
  error = null,
  viewAllUrl = "/providers",
  showViewAll = true,
  maxItems,
  emptyStateMessage = "No providers found",
  showScrollIndicators = true,
  className,
  ...props
}: ProviderGridProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  // Handle scrolling checks
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      // Add a small buffer (5px) to account for rounding errors
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  // Set up scroll event listeners
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      // Check on mount
      checkScroll();

      // Add scroll event listener
      scrollContainer.addEventListener("scroll", checkScroll);

      // Add resize event listener
      window.addEventListener("resize", checkScroll);

      return () => {
        scrollContainer.removeEventListener("scroll", checkScroll);
        window.addEventListener("resize", checkScroll);
      };
    }
  }, [providers]);

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({
        left: -containerWidth / 2,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({
        left: containerWidth / 2,
        behavior: "smooth",
      });
    }
  };

  // Handle loading and error states
  if (loading) {
    return (
      <Container size="xl" className={className}>
        <div className="flex justify-between items-center mb-2 lg:mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-4">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[150px] h-[100px] bg-secondary animate-pulse rounded-lg"
              ></div>
            ))}
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="xl" className={className}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 text-center">
          <p>Error loading providers: {error}</p>
        </div>
      </Container>
    );
  }

  // Show empty state when no providers
  if (!providers.length) {
    return (
      <Container size="xl" className={className}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <EmptyState
          title="No Providers Found"
          description={emptyStateMessage}
          icon={<IoGridOutline className="w-12 h-12" />}
        />
      </Container>
    );
  }

  // Limit providers to maxItems if specified
  const displayProviders = maxItems ? providers.slice(0, maxItems) : providers;

  return (
    <section className={cn("py-8", className)} {...props}>
      <Container size="xl">
        <div className="flex justify-between items-center mb-4">
          <Heading title={title} />

          {showViewAll && viewAllUrl && <ViewAllLink href={viewAllUrl} />}
        </div>

        <div className="relative">
          {/* Left scroll button */}
          {showScrollIndicators && canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 flex items-center justify-center bg-secondary/80 hover:bg-accent/80 rounded-full shadow-lg transition-colors"
              aria-label="Scroll left"
            >
              <IoChevronBack className="text-xl" />
            </button>
          )}

          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto lg:justify-center gap-4 pb-4 scrollbar-hide scroll-smooth snap-x"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {displayProviders.map((provider) => (
              <div
                key={provider.id}
                className="flex-shrink-0 w-[150px] snap-start"
              >
                <ProviderCard provider={provider} />
              </div>
            ))}
          </div>

          {/* Right scroll button */}
          {showScrollIndicators && canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 flex items-center justify-center bg-secondary/80 hover:bg-accent/80 rounded-full shadow-lg transition-colors"
              aria-label="Scroll right"
            >
              <IoChevronForward className="text-xl" />
            </button>
          )}
        </div>
      </Container>

      {/* Hide scrollbar */}
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
});

export default ProviderGrid;
