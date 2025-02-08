import React from 'react';

type DeleteButtonProps = {
  onClick: () => void;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return <button onClick={onClick}>Delete</button>;
};

export default DeleteButton;
