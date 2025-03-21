import { PromoSlide } from "@/types";
import { MutableRefObject, useEffect, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import {
  A11y,
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  A11Y_CONFIG,
  COVERFLOW_EFFECT_CONFIG,
  PAGINATION_CLASSES,
} from "../constants";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SlideContent from "./SlideContent";

interface SliderContainerProps {
  swiperRef: MutableRefObject<SwiperType | null>;
  slides: PromoSlide[];
  autoplay?: boolean;
  interval?: number;
  showControls?: boolean;
  showPagination?: boolean;
  showInfoIcon?: boolean;
  breakpoints?: Record<number, any>;
}

const SliderContainer: React.FC<SliderContainerProps> = ({
  swiperRef,
  slides,
  autoplay = false,
  interval = 5000,
  showControls = false,
  showPagination = false,
  showInfoIcon = true,
  breakpoints,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth < 768); 
    };

    updateScreenSize(); 
    window.addEventListener("resize", updateScreenSize);

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  return (
    <div className="promo-slider-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow, A11y]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        centeredSlides={true}
        initialSlide={1}
        loop={true}
        loopAdditionalSlides={1}
        grabCursor={true}
        breakpoints={breakpoints}
        coverflowEffect={COVERFLOW_EFFECT_CONFIG}
        autoplay={
          autoplay
            ? {
                delay: interval,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        navigation={showControls}
        pagination={
          isMobile || showPagination
            ? { clickable: true, ...PAGINATION_CLASSES }
            : false
        }
        a11y={A11Y_CONFIG}
        className="promo-slider"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="promo-slide">
            <SlideContent slide={slide} showInfoIcon={showInfoIcon} />
          </SwiperSlide>
        ))}
      </Swiper>

      <SliderStyles />
    </div>
  );
};

const SliderStyles = () => (
  <style jsx global>{`
    .promo-slider-container {
      position: relative;
      padding: 20px 0;
    }

    .promo-slider {
      --swiper-navigation-color: #fff;
      --swiper-pagination-color: var(--accent-color, #ff2e8e);
      --swiper-navigation-size: 24px;
      overflow: visible;
    }

    /* Default (mobile) styling */
    .promo-slide {
      width: 100%;
      transform: scale(1);
      opacity: 1;
      transition: all 0.5s ease;
    }

    /* Desktop styling for side slides effect */
    @media (min-width: 768px) {
      .promo-slide {
        width: 80%;
        max-width: 1000px;
        opacity: 0.4;
        transform: scale(0.9);
      }

      .promo-slide.swiper-slide-active {
        opacity: 1;
        transform: scale(1);
        z-index: 10;
      }
    }

    .promo-banner {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      border-radius: 12px;
    }

    .promo-slider .swiper-button-prev,
    .promo-slider .swiper-button-next {
      background-color: rgba(0, 0, 0, 0.3);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      transition: background-color 0.3s;
      z-index: 20;
    }

    .promo-slider .swiper-button-prev:hover,
    .promo-slider .swiper-button-next:hover {
      background-color: var(--accent-color, #ff2e8e);
    }

    .promo-slider .swiper-pagination {
      position: relative;
      margin-top: 20px;
      bottom: auto;
      z-index: 10;
    }

    .swiper-bullet {
      width: 8px;
      height: 8px;
      display: inline-block;
      border-radius: 50%;
      background: #666;
      margin: 0 5px;
      cursor: pointer;
      transition: all 0.3s;
      opacity: 0.6;
    }

    .swiper-bullet-active {
      background: var(--accent-color, #ff2e8e);
      width: 16px;
      border-radius: 4px;
      opacity: 1;
    }
  `}</style>
);

export default SliderContainer;
