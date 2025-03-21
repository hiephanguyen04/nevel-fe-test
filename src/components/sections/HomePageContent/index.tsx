import { Suspense } from "react";
import PromoSlider from "@/components/sections/PromoSlider";
import CategoryFilter from "@/components/ui/CategoryFilter";
import GameGrid from "@/components/sections/GameGrid";
import ProviderGrid from "@/components/sections/ProviderGrid";
import { promoSlides } from "@/data/promo-slides";
import { games } from "@/data/games";
import { providers } from "@/data/providers";
import { SectionFallback } from "@/components/ui/Fallbacks";

export default function HomePageContent() {
  return (
    <>
      <PromoSlider slides={promoSlides} />

      <CategoryFilter />

      <Suspense fallback={<SectionFallback height="400px" />}>
        <GameGrid
          title="Exclusive Games"
          games={games}
          viewAllUrl="/games"
          maxItems={10}
        />
      </Suspense>

      <Suspense fallback={<SectionFallback height="200px" />}>
        <ProviderGrid
          title="All Providers"
          providers={providers}
          viewAllUrl="/providers"
          maxItems={8}
        />
      </Suspense>
    </>
  );
}
