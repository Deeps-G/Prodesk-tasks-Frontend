import React from 'react';

const Recommended = ({ items }) => {
  return (
    <div>
      <h2 className="text-xl mb-2">Recommended for you</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, idx) => (
          <div key={idx} className="bg-gray-800 rounded p-2">
            <img src={item.thumbnail} alt={item.title} className="w-full h-40 object-cover rounded" />
            <p className="mt-2 text-white font-bold">{item.title}</p>
            <p className="text-sm text-gray-400">{item.year} • {item.category} • {item.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommended;
