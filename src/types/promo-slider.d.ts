/**
 * Type definitions for the PromoSlider components and related functionality
 */

/**
 * Promo slide data structure
 */
export interface PromoSlide {
  /** Unique identifier for the slide */
  id: number | string;
  /** Main title text */
  title: string;
  /** Optional subtitle text */
  subtitle?: string;
  /** Text for the CTA button */
  buttonText: string;
  /** URL for the CTA button */
  buttonLink?: string;
  /** Category or type label */
  label?: string;
  /** Path to the slide image */
  image: string;
  /** Optional background color class */
  bgColor?: string;
}

/**
 * Configuration for slider breakpoints
 */
export interface SliderBreakpoint {
  /** Number of slides per view */
  slidesPerView: number | "auto";
  /** Space between slides in pixels */
  spaceBetween: number;
  /** Whether slides should be centered */
  centeredSlides: boolean;
  /** Transition effect to use */
  effect: "slide" | "fade" | "cube" | "coverflow" | "flip";
}

/**
 * Type for breakpoints configuration object
 */
export type BreakpointsConfig = Record<number, SliderBreakpoint>;

/**
 * Configuration for the coverflow effect
 */
export interface CoverflowEffectConfig {
  /** Slide rotate in degrees */
  rotate: number;
  /** Slide stretch in pixels */
  stretch: number;
  /** Slide depth in pixels */
  depth: number;
  /** Effect multiplier */
  modifier: number;
  /** Whether to use slide shadows */
  slideShadows: boolean;
}

/**
 * Configuration for accessibility features
 */
export interface A11yConfig {
  /** Message for screen readers when navigating to previous slide */
  prevSlideMessage: string;
  /** Message for screen readers when navigating to next slide */
  nextSlideMessage: string;
  /** Message for screen readers when navigating via pagination */
  paginationBulletMessage: string;
}
