
import Container from "@/components/layout/Container";

interface LoadingStateProps {
  title: string;
  itemCount?: number;
  className?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  title,
  itemCount = 8,
  className,
}) => {
  return (
    <Container className={className}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="flex overflow-x-auto gap-4 pb-4">
        {Array(itemCount)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[120px] sm:w-[156px] h-[200px] sm:h-[240px] bg-secondary animate-pulse rounded-lg"
            />
          ))}
      </div>
    </Container>
  );
};

export default LoadingState;
