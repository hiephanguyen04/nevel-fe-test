interface SectionFallbackProps {
  height?: string;
  className?: string;
}

export const SectionFallback = ({
  height = "400px",
  className,
}: SectionFallbackProps) => (
  <div
    className={`h-[${height}] bg-secondary/50 animate-pulse rounded-lg ${
      className || ""
    }`}
    aria-hidden="true"
  ></div>
);

export const GameGridFallback = () => <SectionFallback height="400px" />;

export const ProviderGridFallback = () => <SectionFallback height="200px" />;
