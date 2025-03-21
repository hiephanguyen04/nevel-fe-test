import Container from "@/components/layout/Container";

function LoadingSpinner() {
  return (
    <div className="flex justify-center">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-gray-700"></div>
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-accent animate-spin"></div>
      </div>
    </div>
  );
}

function GameSkeleton() {
  return (
    <div className="aspect-[3/4] rounded-lg bg-secondary animate-pulse"></div>
  );
}

function GameGridSkeleton() {
  return (
    <div className="mb-16">
      <div className="h-8 bg-secondary w-64 mb-8 rounded animate-pulse"></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <GameSkeleton key={i} />
          ))}
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <Container>
      <div className="py-16">
        <div className="mb-16">
          <LoadingSpinner />
          <p className="text-center text-gray-400 mt-4">Loading content...</p>
        </div>

        <GameGridSkeleton />
      </div>
    </Container>
  );
}
