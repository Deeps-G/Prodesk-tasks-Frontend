import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded hover:bg-gray-800 text-white block ${
      isActive ? "bg-blue-600" : "text-gray-300"
    }`;

  return (
    <div className="w-48 bg-[#161D2F] p-4 h-screen sticky top-0">
      <h2 className="text-xl font-bold mb-6">🎬 Deeps</h2>
      <nav className="flex flex-col gap-3">
        <NavLink to="/" className={linkClass}>
          🏠 Home
        </NavLink>
        <NavLink to="/movies" className={linkClass}>
          🎥 Movies
        </NavLink>
        <NavLink to="/TVSeries" className={linkClass}>
          📺 TV Series
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
