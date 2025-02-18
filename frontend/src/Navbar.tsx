import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#000000] text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">CMS</h1>
      <ul className="flex gap-4">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/home">Dashboard</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
