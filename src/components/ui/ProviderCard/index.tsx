"use client";

import Card from "@/components/common/Card";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils/classNames";
import { Provider } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes, memo, MouseEvent } from "react";

export interface ProviderCardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onClick"> {
  provider: Provider;
  className?: string;
  onClick?: (e: MouseEvent<HTMLDivElement>, provider: Provider) => void;
}

const ProviderCard = memo(function ProviderCard({
  provider,
  className,
  onClick,
  ...props
}: ProviderCardProps) {
  if (!provider) return null;

  const { id, name, logo, gamesCount } = provider;

  const logoSrc = logo || `/api/placeholder/100/60`;

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(e, provider);
    }
  };

  return (
    <Link href={ROUTES.PROVIDER_DETAILS(id)}>
      <Card
        variant="default"
        hoverable
        className={cn("provider-card w-[156px]", className)}
        onClick={handleClick}
        {...props}
      >
        <Card.Body className="flex flex-col items-center text-center py-4  bg-[#12294A]">
          <div className="relative w-30 h-10 md:w-24 md:h-12 mb-5 ">
            <Image
              src={logoSrc}
              alt={name}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 80px, 96px"
            />
          </div>
          <h3 className="text-sm font-medium mb-1">{name}</h3>
          {typeof gamesCount !== "undefined" && (
            <p className="text-xs text-gray-400">
              {gamesCount} {gamesCount === 1 ? "game" : "games"}
            </p>
          )}
        </Card.Body>
      </Card>
    </Link>
  );
});

export default ProviderCard;
