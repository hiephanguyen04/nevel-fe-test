
import CommonEmptyState from "@/components/common/EmptyState";
import Container from "@/components/layout/Container";
import { IoGridOutline } from "react-icons/io5";

interface EmptyStateProps {
  title: string;
  message: string;
  className?: string;
}
const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  className,
}) => {
  return (
    <Container className={className}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <CommonEmptyState
        title="No Games Found"
        description={message}
        icon={<IoGridOutline className="w-12 h-12" />}
      />
    </Container>
  );
};

export default EmptyState;
