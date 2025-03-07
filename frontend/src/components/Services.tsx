
import React from "react";
import Header from "./HomePage/header";
const Services: React.FC = () => {
  const mystyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial",
    flex: 1, 
    justifyContent: 'center', 
    alignItems:"center"
  };
  return (
    <div style={mystyle}>
      <Header />
      <h1>Our Services</h1>
      <p>Learn more about the services we offer.</p>
    </div>
  );
};

export default Services;
