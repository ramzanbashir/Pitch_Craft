import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white py-3 px-6 flex justify-between items-center">
      <h1 className="text-lg font-bold">🚀 PitchCraft</h1>
      <div className="flex gap-4">
        <Link to="/create" className="hover:underline">Create</Link>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/export" className="hover:underline">Export</Link>
      </div>
    </nav>
  );
};

export default Navbar;
