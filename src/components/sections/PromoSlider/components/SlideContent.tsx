/**
 * SlideContent Component
 *
 * Responsible for rendering the content of each individual slide.
 */

import Image from "next/image";
import Button from "@/components/common/Button";
import { PromoSlide } from "@/types";
import InfoButton from "./InfoButton";

interface SlideContentProps {
  slide: PromoSlide;
  showInfoIcon?: boolean;
}

const SlideContent: React.FC<SlideContentProps> = ({
  slide,
  showInfoIcon = true,
}) => {
  return (
    <div className="promo-banner bg-gradient-to-br from-[#147261] to-[#082C25] pb-15 pt-8">
      {showInfoIcon && <InfoButton />}

      <div className="flex flex-wrap-reverse mt-40 lg:mt-0 lg:flex-nowrap justify-center items-center px-10">
        <TextContent
          label={slide.label}
          title={slide.title}
          subtitle={slide.subtitle}
          buttonText={slide.buttonText}
          buttonLink={slide.buttonLink}
        />

        <ImageContent image={slide.image} alt={slide.title} />
      </div>
    </div>
  );
};

interface TextContentProps {
  label?: string;
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonLink?: string;
}

const TextContent: React.FC<TextContentProps> = ({
  label,
  title,
  subtitle,
  buttonText,
  buttonLink,
}) => (
  <div className="flex flex-col gap-4 justify-center items-center">
    {label && (
      <span className="text-white text-xl bg-[#FFFFFF1A] bg-opacity-40 px-3 py-1 rounded-full">
        {label}
      </span>
    )}

    <div className="text-center lg:text-[42px] text-2xl font-medium lg:font-extrabold mb-2">
      <h3>{title}</h3>
      {subtitle && <h3>{subtitle}</h3>}
    </div>

    <Button
      variant="primary"
      size="lg"
      className="px-14"
      href={buttonLink || "#"}
    >
      {buttonText}
    </Button>
  </div>
);

interface ImageContentProps {
  image: string;
  alt: string;
}

const ImageContent: React.FC<ImageContentProps> = ({ image, alt }) => (
  <div className="w-2/3 md:w-2/5 absolute -top-20 lg:top-0 lg:relative h-48 lg:h-64">
    <Image
      src={image}
      alt={alt}
      width={585}
      height={485}
      className="object-cover"
      priority
    />
  </div>
);

export default SlideContent;
