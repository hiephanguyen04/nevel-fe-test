import React from "react";

interface HeadingProps {
  title: string;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ title, className }) => {
  return (
    <h2 className={`text-sm lg:text-[32px] font-medium ${className}`}>
      {title}
    </h2>
  );
};

export default Heading;
