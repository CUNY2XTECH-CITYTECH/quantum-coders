import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/home">Dashboard</Link>
        </li>
        <li>
          <Link to="/about">About</Link> {/* Add link to About page */}
        </li>
        <li>
          <Link to="/contact">Contact</Link> {/* Add link to Contact page */}
        </li>
        <li>
          <Link to="/services">Services</Link> {/* Add link to Services page */}
        </li>
        <li>
          <Link to="/login">Login</Link> {/* Add link to Login page */}
        </li>
        <li>
          <Link to="/register">Register</Link> {/* Add link to Register page */}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
