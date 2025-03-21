"use client";

import { memo, HTMLAttributes, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/classNames";
import { Game } from "@/types";
import { ROUTES } from "@/lib/constants";

export interface GameCardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onClick"> {
  game: Game;
  className?: string;
  aspectRatio?: "1/1" | "3/4" | "4/3" | "16/9";
  showTitle?: boolean;
  showProvider?: boolean;
  onClick?: (e: MouseEvent<HTMLDivElement>, game: Game) => void;
}

const GameCard = memo(function GameCard({
  game,
  className,
  aspectRatio = "3/4",
  showTitle = false,
  showProvider = false,
  onClick,
  ...props
}: GameCardProps) {
  if (!game) return null;

  const { id, title, provider, image, isHot, isNew } = game;
  // Handle placeholder images for development
  const imageSrc = image || `/api/placeholder/230/310`;

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(e, game);
    }
  };

  return (
    <div className={cn("game-card-container", className)} {...props}>
      <Link
        href={ROUTES.GAME_DETAILS(id)}
        className="block h-full w-full"
        onClick={(e) => handleClick(e as unknown as MouseEvent<HTMLDivElement>)}
      >
        <div className="game-card relative overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1">
          <div
            className={cn(
              "relative",
              aspectRatio === "3/4"
                ? "aspect-[3/4]"
                : aspectRatio === "4/3"
                ? "aspect-[4/3]"
                : aspectRatio === "1/1"
                ? "aspect-square"
                : aspectRatio
            )}
          >
            <Image
              src={imageSrc}
              alt={title}
              width={156}
              height={210}
              className="object-cover w-full h-full rounded-lg transition-transform duration-300 hover:scale-105"
            />

            <div className="absolute top-2 left-2 flex flex-col gap-1.5">
              {isHot && (
                <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-sm font-medium">
                  HOT
                </span>
              )}
              {isNew && (
                <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-sm font-medium">
                  NEW
                </span>
              )}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100">
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-sm font-medium text-white line-clamp-1">
                    {title}
                  </h3>

                  {provider && (
                    <p className="text-xs text-gray-300">{provider}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {(showTitle || showProvider) && (
        <div className="mt-2">
          {showTitle && (
            <h3 className="text-sm font-medium text-white truncate">{title}</h3>
          )}

          {showProvider && provider && (
            <p className="text-xs text-gray-400 truncate">{provider}</p>
          )}
        </div>
      )}
    </div>
  );
});

export default GameCard;
