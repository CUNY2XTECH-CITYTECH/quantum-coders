import React /*, {useState}*/ from "react";
import Header from "./HomePage/header";
import "./public.css"; // Import the CSS file for general styling
import logoCollege from "./img-pages/logoCityTech.png";
const About: React.FC = () => {
  return (
    <>
      <Header />
      <div className="general-page">
        <div className="left-info">
        <div className="about-us-section">
        <h1>About Us</h1>
        <p>This is our project!, Quantum Coder, a simple social media website. We are CUNY CityTech students</p>
        <img src={logoCollege} alt="City Tech Logo" style={{ width: "200px", height: "auto" }} />
        </div>
        <div className="mission-statement">
        <h1>Our goal</h1>
        <p>People can find new people with same passion</p>
        </div>
        </div>
        <div className="right-trend-posts">
          Last trend post
        </div>
      </div>
    </>
  );
};

export default About;