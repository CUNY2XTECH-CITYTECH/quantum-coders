import React, { useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./home.css";

const Homepage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { signupSuccess?: boolean } | null;
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (state?.signupSuccess) {
      setMessage("Your account has been successfully created");
      setTimeout(() => setMessage(""), 5000);
    }
  }, [state]);

  return (
    <div className="homepage">
      {message && <div className="success-message">{message}</div>}
      <header className="header">
        <div className="left-buttons">
          <button onClick={() => navigate("/")}>Home</button>
          <button>About Us</button>
        </div>
        <h1 className="title">Quantum Coders</h1>
        <div className="right-buttons">
          <button onClick={() => navigate("/register")}>Sign Up</button>
          <button onClick={() => navigate("/login")}>Log In</button>
        </div>
      </header>
      <main className="content">
        <h2>Welcome to Quantum Coders</h2>
        <p>Welcome to your webpost</p>
      </main>
    </div>
  );
};

export default Homepage;
