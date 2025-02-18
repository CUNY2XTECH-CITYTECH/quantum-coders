import React from "react";

const About: React.FC = () => {
    const mystyle = {
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "10px",
        fontFamily: "Arial"
      };
  return (
    <div style={mystyle}>
      <h1>About Us</h1>
      <p>Welcome to the About page!</p>
    </div>
  );
};

export default About;