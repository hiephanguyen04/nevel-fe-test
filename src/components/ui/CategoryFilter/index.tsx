"use client";

import DiamondIcon from "@/assets/icons/diamond";
import GameIcon from "@/assets/icons/game";
import HotMatchIcon from "@/assets/icons/hot-match";
import PromotionIcon from "@/assets/icons/promotion";
import ProvideIcon from "@/assets/icons/provide";
import TransactionIcon from "@/assets/icons/transaction";
import VipIcon from "@/assets/icons/vip";
import Container from "@/components/layout/Container";
import { cn } from "@/lib/utils/classNames";
import { CategoryItem } from "@/types";
import { HTMLAttributes, useEffect, useRef, useState } from "react";

const DEFAULT_CATEGORIES: CategoryItem[] = [
  {
    id: "diamond-mine",
    name: "Diamond mine",
    icon: <DiamondIcon />,
  },
  {
    id: "vip",
    name: "VIP",
    icon: <VipIcon />,
  },
  {
    id: "promotion",
    name: "Promotion",
    icon: <PromotionIcon />,
  },
  {
    id: "hot-match",
    name: "Hot Match",
    icon: <HotMatchIcon />,
  },
  {
    id: "p2p-transaction",
    name: "P2P Transaction",
    icon: <TransactionIcon />,
  },
  {
    id: "games",
    name: "Games",
    icon: <GameIcon />,
  },
  {
    id: "providers",
    name: "Providers",
    icon: <ProvideIcon />,
  },
];

export interface CategoryFilterProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  categories?: CategoryItem[];
  activeCategory?: string | null;
  onChange?: (categoryId: string | null) => void;
  showScrollIndicators?: boolean;
}

const CategoryFilter = ({
  categories = DEFAULT_CATEGORIES,
  activeCategory = null,
  onChange,
  showScrollIndicators = true,
  className,
  ...props
}: CategoryFilterProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    activeCategory
  );
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeCategory !== null && activeCategory !== selectedCategory) {
      setSelectedCategory(activeCategory);
    }
  }, [activeCategory, selectedCategory]);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5); // 5px buffer
      }
    };

    checkScroll();

    window.addEventListener("resize", checkScroll);

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScroll);
    }

    return () => {
      window.removeEventListener("resize", checkScroll);
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", checkScroll);
      }
    };
  }, [categories]);

  const handleCategoryClick = (categoryId: string) => {
    const newValue = categoryId === selectedCategory ? null : categoryId;
    setSelectedCategory(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className={cn("relative py-6", className)} {...props}>
      <Container size="xl">
        {/* Left scroll indicator */}
        {showScrollIndicators && canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 flex items-center justify-center bg-secondary/80 rounded-full shadow-lg"
            aria-label="Scroll left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}

        {/* Scroll container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-3 justify-around overflow-x-auto scrollbar-hide py-1 px-2 -mx-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              className={cn(
                "flex items-center w-full gap-3 py-4 px-7 rounded-xl text-sm border whitespace-nowrap transition-all",
                selectedCategory === category.id
                  ? "bg-accent border-accent text-white"
                  : "bg-secondary border-gray-700 text-white hover:border-accent"
              )}
              onClick={() => handleCategoryClick(category.id)}
              aria-pressed={selectedCategory === category.id}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>

        {/* Right scroll indicator */}
        {showScrollIndicators && canScrollRight && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 flex items-center justify-center bg-secondary/80 rounded-full shadow-lg"
            aria-label="Scroll right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </Container>
    </div>
  );
};

export default CategoryFilter;
