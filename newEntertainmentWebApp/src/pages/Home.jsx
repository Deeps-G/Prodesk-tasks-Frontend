import React, { useEffect, useState } from 'react';
import data from '../data/movies.json';
import Trending from '../components/Trending';
import Recommended from '../components/Recommended';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState(data);

  useEffect(() => {
    if (searchTerm === '') {
      setFiltered(data);
    } else {
      const filteredData = data.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFiltered(filteredData);
    }
  }, [searchTerm]);

  const trending = filtered.filter(item => item.isTrending);
  const recommended = filtered.filter(item => !item.isTrending);

  return (
    <div className="p-4 text-white bg-black min-h-screen">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Trending items={trending} />
      <Recommended items={recommended} />
    </div>
  );
};

export default Home;
