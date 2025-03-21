/**
 * PromoSlider
 *
 * Main component that coordinates the promotional slider experience.
 * Acts as a container for slider functionality with responsive behavior.
 */

"use client";

import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/classNames";
import { PromoSlide } from "@/types";
import SliderContainer from "./components/SliderContainer";
import { useSlider } from "@/hooks/useSlider";
import { SLIDER_BREAKPOINTS } from "./constants";

export interface PromoSliderProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of promotional slides to display */
  slides?: PromoSlide[];
  /** Whether the slider should auto-advance */
  autoplay?: boolean;
  /** Time in ms between auto-advances */
  interval?: number;
  /** Whether to show navigation arrows */
  showControls?: boolean;
  /** Whether to show pagination dots */
  showPagination?: boolean;
  /** Whether to show the info icon */
  showInfoIcon?: boolean;
}

/**
 * PromoSlider displays promotional content in a slideshow format
 * with responsive behavior for different screen sizes
 */
const PromoSlider = ({
  slides = [],
  autoplay = false,
  interval = 5000,
  showControls = false,
  showPagination = false,
  showInfoIcon = true,
  className,
  ...props
}: PromoSliderProps) => {
  // Use the custom slider hook to handle Swiper functionality
  const { swiperRef, finalSlides } = useSlider({ slides, autoplay });

  // If no slides, don't render
  if (!finalSlides.length) return null;

  return (
    <div className={cn("relative my-6 lg:my-2", className)} {...props}>
      <SliderContainer
        swiperRef={swiperRef}
        slides={finalSlides}
        autoplay={autoplay}
        interval={interval}
        showControls={showControls}
        showPagination={showPagination}
        showInfoIcon={showInfoIcon}
        breakpoints={SLIDER_BREAKPOINTS}
      />
    </div>
  );
};

export default PromoSlider;
