import React from "react";
import Header from "./HomePage/header";

const About: React.FC = () => {
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
      <Header/>
      <h1>About Us</h1>
      <p>Welcome to the About page!</p>
    </div>
  );
};

export default About;