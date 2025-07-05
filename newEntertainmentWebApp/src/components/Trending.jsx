import React from 'react';

const Trending = ({ items }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl mb-2">Trending</h2>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {items.map((item, idx) => (
          <div key={idx} className="min-w-[200px] bg-gray-800 rounded p-2">
            <img src={item.thumbnail} alt={item.title} className="w-full h-32 object-cover rounded" />
            <p className="mt-2 text-white font-bold">{item.title}</p>
            <p className="text-sm text-gray-400">{item.year} • {item.category} • {item.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;