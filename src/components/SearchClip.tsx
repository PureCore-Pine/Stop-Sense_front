import React from 'react';

type SearchClipProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const SearchClip: React.FC<SearchClipProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex justify-end">
      <input
        type="text"
        placeholder="search clip"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-40 sm:w-52 p-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
    </div>
  );
};

export default SearchClip;
