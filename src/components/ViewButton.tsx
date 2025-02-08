import React from 'react';

type ViewButtonProps = {
  onClick: () => void;
};

const ViewButton: React.FC<ViewButtonProps> = ({ onClick }) => {
  return <button onClick={onClick}>View</button>;
};

export default ViewButton;
