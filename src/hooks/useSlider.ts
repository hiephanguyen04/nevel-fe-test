/**
 * useSlider Hook
 *
 * Custom hook for managing Swiper functionality and slide processing.
 */

import { useRef, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";
import { PromoSlide } from "@/types";

interface UseSliderProps {
  /** Array of slides to display */
  slides: PromoSlide[];
  /** Whether the slider should auto-advance */
  autoplay?: boolean;
}

/**
 * Hook for managing the slider functionality
 */
export const useSlider = ({ slides, autoplay = false }: UseSliderProps) => {
  // References to Swiper instance
  const swiperRef = useRef<SwiperType | null>(null);

  // Handle slides preparation
  const displaySlides = slides.length > 0 ? slides : [];

  // Add duplicate slides if only one slide to ensure proper display
  const finalSlides =
    displaySlides.length === 1
      ? [...displaySlides, ...displaySlides]
      : displaySlides;

  // Handle autoplay pause/resume when component mounts
  useEffect(() => {
    const swiper = swiperRef.current;

    // Handle pause/resume on visibility change (when user switches tabs)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        swiper?.autoplay?.stop();
      } else if (autoplay) {
        swiper?.autoplay?.start();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [autoplay]);

  return {
    swiperRef,
    finalSlides,
  };
};
