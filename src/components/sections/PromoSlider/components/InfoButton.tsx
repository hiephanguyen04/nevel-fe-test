/**
 * InfoButton Component
 *
 * A simple information button that appears in the slider.
 * Extracted for reusability and cleaner code.
 */

import { IoInformationCircleOutline } from "react-icons/io5";

interface InfoButtonProps {
  /** Click handler for the info button */
  onClick?: () => void;
}

/**
 * Information button component
 */
const InfoButton: React.FC<InfoButtonProps> = ({ onClick }) => {
  return (
    <div className="absolute top-2 right-2 z-10">
      <button
        className="bg-opacity-30 rounded-full p-1 transition-colors hover:bg-black/50"
        aria-label="More information"
        onClick={onClick}
      >
        <IoInformationCircleOutline className="text-white text-xl" />
      </button>
    </div>
  );
};

export default InfoButton;
