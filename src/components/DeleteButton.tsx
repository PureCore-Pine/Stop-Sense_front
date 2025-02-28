import React from 'react';
import { BsTrash } from "react-icons/bs";

type DeleteButtonProps = {
  onClick: () => void;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return <button 
  onClick={onClick}
  className="p-2 rounded-full hover:bg-gray-300 transition">
    <BsTrash className='w-6 h-6 text-gray-700'/>
  </button>;
};

export default DeleteButton;
