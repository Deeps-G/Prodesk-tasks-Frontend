import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      className="w-full p-2 rounded bg-gray-800 text-white mb-4"
      type="text"
      placeholder="Search for movies or TV series"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchBar;
