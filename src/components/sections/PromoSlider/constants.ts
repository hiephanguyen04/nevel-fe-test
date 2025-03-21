/**
 * PromoSlider Constants
 *
 * Centralized configuration values for the PromoSlider component.
 */

/**
 * Responsive breakpoints configuration for Swiper
 */
export const SLIDER_BREAKPOINTS = {
  // Mobile: single slide view (100% width)
  0: {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
    effect: "slide",
  },
  // Desktop: centered view with side slides
  768: {
    slidesPerView: "auto",
    spaceBetween: 20,
    centeredSlides: true,
    effect: "slide",
  },
};

/**
 * Coverflow effect configuration
 */
export const COVERFLOW_EFFECT_CONFIG = {
  rotate: 0,
  stretch: 0,
  depth: 100,
  modifier: 1,
  slideShadows: false,
};

/**
 * Accessibility configuration for Swiper
 */
export const A11Y_CONFIG = {
  prevSlideMessage: "Previous promotion",
  nextSlideMessage: "Next promotion",
  paginationBulletMessage: "Go to promotion {{index}}",
};

/**
 * CSS class names for pagination bullets
 */
export const PAGINATION_CLASSES = {
  bulletClass: "swiper-bullet",
  bulletActiveClass: "swiper-bullet-active",
};
