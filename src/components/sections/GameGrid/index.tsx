"use client";

import EmptyState from "@/components/common/EmptyState";
import Container from "@/components/layout/Container";
import GameCard from "@/components/ui/GameCard";
import { cn } from "@/lib/utils/classNames";
import { Game } from "@/types";
import { HTMLAttributes, memo, useEffect, useRef, useState } from "react";
import {
  IoChevronBack,
  IoChevronForward,
  IoGridOutline,
} from "react-icons/io5";
import Heading from "../Heading";
import ViewAllLink from "../ViewAllLink";

export interface GameGridProps extends HTMLAttributes<HTMLElement> {
  title: string;
  subtitle?: string;
  games?: Game[];
  loading?: boolean;
  error?: string | null;
  viewAllUrl?: string;
  showViewAll?: boolean;
  maxItems?: number;
  emptyStateMessage?: string;
  showScrollIndicators?: boolean;
  className?: string;
}

const GameGrid = memo(function GameGrid({
  title,
  games = [],
  loading = false,
  error = null,
  viewAllUrl = "/games",
  showViewAll = true,
  maxItems,
  emptyStateMessage = "No games found",
  showScrollIndicators = true,
  className,
  ...props
}: GameGridProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      checkScroll();

      scrollContainer.addEventListener("scroll", checkScroll);

      window.addEventListener("resize", checkScroll);

      return () => {
        scrollContainer.removeEventListener("scroll", checkScroll);
        window.addEventListener("resize", checkScroll);
      };
    }
  }, [games]);

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

  if (loading) {
    return (
      <Container className={className}>
        <div className="flex justify-between items-center mb-2 lg:mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-4">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[180px] h-[240px] bg-secondary animate-pulse rounded-lg"
              ></div>
            ))}
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className={className}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 text-center">
          <p>Error loading games: {error}</p>
        </div>
      </Container>
    );
  }

  if (!games.length) {
    return (
      <Container className={className}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <EmptyState
          title="No Games Found"
          description={emptyStateMessage}
          icon={<IoGridOutline className="w-12 h-12" />}
        />
      </Container>
    );
  }

  const displayGames = maxItems ? games.slice(0, maxItems) : games;

  return (
    <section className={cn("py-2 lg:py-8", className)} {...props}>
      <Container size="xl">
        <div className="flex justify-between items-center mb-6">
          <Heading title={title} />

          {showViewAll && viewAllUrl && <ViewAllLink href={viewAllUrl} />}
        </div>

        <div className="relative">
          {showScrollIndicators && canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 flex items-center justify-center bg-secondary/80 hover:bg-accent/80 rounded-full shadow-lg transition-colors"
              aria-label="Scroll left"
            >
              <IoChevronBack className="text-xl" />
            </button>
          )}

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide scroll-smooth snap-x"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {displayGames.map((game) => (
              <div
                key={game.id}
                className="flex-shrink-0 w-[120px] sm:w-[156px] snap-start"
              >
                <GameCard game={game} aspectRatio="3/4" />
              </div>
            ))}
          </div>

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

      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
});

export default GameGrid;
