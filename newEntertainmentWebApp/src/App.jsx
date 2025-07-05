import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TVSeries from "./pages/TVSeries";

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-[#10141E] text-white">
        <Sidebar />
        <div className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tvseries" element={<TVSeries />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
