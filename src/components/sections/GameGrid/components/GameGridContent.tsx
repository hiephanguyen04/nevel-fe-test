import GameCard from "@/components/ui/GameCard";
import { Game } from "@/types";
import { RefObject } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import ScrollButton from "./ScrollButton";

interface GameGridContentProps {
  games: Game[];
  scrollContainerRef: RefObject<HTMLDivElement>;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  scrollLeft: () => void;
  scrollRight: () => void;
  showScrollIndicators?: boolean;
}

const GameGridContent: React.FC<GameGridContentProps> = ({
  games,
  scrollContainerRef,
  canScrollLeft,
  canScrollRight,
  scrollLeft,
  scrollRight,
  showScrollIndicators = true,
}) => {
  return (
    <div className="relative">
      {showScrollIndicators && canScrollLeft && (
        <ScrollButton
          direction="left"
          onClick={scrollLeft}
          icon={<IoChevronBack className="text-xl" />}
        />
      )}

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide scroll-smooth snap-x"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {games.map((game) => (
          <GameCardWrapper key={game.id} game={game} />
        ))}
      </div>

      {showScrollIndicators && canScrollRight && (
        <ScrollButton
          direction="right"
          onClick={scrollRight}
          icon={<IoChevronForward className="text-xl" />}
        />
      )}
    </div>
  );
};

const GameCardWrapper: React.FC<{ game: Game }> = ({ game }) => (
  <div className="flex-shrink-0 w-[120px] sm:w-[156px] snap-start">
    <GameCard game={game} aspectRatio="3/4" />
  </div>
);

export default GameGridContent;
