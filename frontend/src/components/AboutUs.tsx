import React /*, {useState}*/ from "react";
import Header from "./HomePage/header";

const About: React.FC = () => {
  //const [userId, setUserId] = useState<string | null>(null);
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
      <Header />{/*userId={userId}*/}
      <h1>About Us</h1>
      <p>This is our project!, Quantum Coder, a simple social media website. We are CUNY CityTech students</p>
      
    </div>
  );
};

export default About;