import React from 'react';

import { useTranslation } from "react-i18next";

type SearchClipProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const SearchClip: React.FC<SearchClipProps> = ({ searchTerm, setSearchTerm }) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="flex justify-end">
      <input
        type="text"
        placeholder={t('history.search')}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-40 sm:w-52 p-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
    </div>
  );
};

export default SearchClip;
