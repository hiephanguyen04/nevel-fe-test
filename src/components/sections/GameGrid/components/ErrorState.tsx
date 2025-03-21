
import Container from "@/components/layout/Container";

interface ErrorStateProps {
  title: string;
  error: string;
  className?: string;
}


const ErrorState: React.FC<ErrorStateProps> = ({ title, error, className }) => {
  return (
    <Container className={className}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 text-center">
        <p>Error loading games: {error}</p>
      </div>
    </Container>
  );
};

export default ErrorState;
