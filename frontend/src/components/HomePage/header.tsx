import { useNavigate } from "react-router-dom";
import "./home.css";

const Header = () => {
      const navigate = useNavigate();
    return (
          <header className="header">
            <div className="left-buttons">
              <button onClick={() => navigate("/")} className="header-button">Home</button>
            </div>
            <h1 className="title">Quantum Coders</h1>
            <div className="right-buttons">
              <button onClick={() => navigate("/register")} className="header-button">Sign Up</button>
              <button onClick={() => navigate("/login")} className="header-button">Log In</button>
            </div>
          </header>
      );
}

export default Header;