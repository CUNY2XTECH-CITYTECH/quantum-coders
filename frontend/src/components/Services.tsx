
import React/*, {useState}*/from "react";
import Header from "./HomePage/header";
const Services: React.FC = () => {

  return (
    <div className="General-page"> {/* You can add a specific class for Services if needed */}
      <Header />
      <h1>Our Services</h1>
      <p>Learn more about the services we offer.</p>
    </div>
  );
};

export default Services;
