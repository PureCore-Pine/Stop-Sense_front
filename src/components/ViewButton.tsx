import React from 'react';
import { MdOutlineRemoveRedEye } from "react-icons/md";

type ViewButtonProps = {
  onClick: () => void;
};

const ViewButton: React.FC<ViewButtonProps> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className="p-2 rounded-full hover:bg-gray-300 transition"
    >
      <MdOutlineRemoveRedEye className="w-6 h-6 text-gray-700" />
    </button>
  );
};

export default ViewButton;
