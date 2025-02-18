
import React from "react";

const Services: React.FC = () => {
  const mystyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial"
  };
  return (
    <div style={mystyle}>
      <h1>Our Services</h1>
      <p>Learn more about the services we offer.</p>
    </div>
  );
};

export default Services;
