import Link from "next/link";
import { IoGridOutline } from "react-icons/io5";

interface ViewAllLinkProps {
  href: string;
  text?: string;
  className?: string;
}

const ViewAllLink: React.FC<ViewAllLinkProps> = ({
  href,
  text = "SEE ALL",
  className,
}) => {
  return (
    <Link
      href={href}
      className={`flex items-center text-[15px] font-normal hover:text-accent transition-colors ${className}`}
    >
      <span className="mr-1">{text}</span>
      <IoGridOutline />
    </Link>
  );
};

export default ViewAllLink;
