import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Homepage/Navbar";
import Hero from "./Homepage/Hero";
import Home from "./pages/Home";
import About from "./Homepage/About"; // Import the new About page
import Contact from "./Homepage/Contact"; // Import the new Contact page
import Services from "./Homepage/Services"; // Import the new Services page
import Login from "./pages/Login"; // Import the new Login page
import Register from "./Homepage/Register"; // Import the new Register page
import { SessionAuth } from "supertokens-auth-react/recipe/session";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route
          path="/home"
          element={
            <SessionAuth>
              <Home />
            </SessionAuth>
          }
        />
        <Route path="/about" element={<About />} /> {/* Add the new About route */}
        <Route path="/contact" element={<Contact />} /> {/* Add the new Contact route */}
        <Route path="/services" element={<Services />} /> {/* Add the new Services route */}
        <Route path="/login" element={<Login />} /> {/* Add the new Login route */}
        <Route path="/register" element={<Register />} /> {/* Add the new Register route */}
      </Routes>
      <p>
        <a
          className="App-link"
          href="https://vitejs.dev/guide/features.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vite Documentation
        </a>
        {" | "}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          React Documentation
        </a>
      </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </Router>
  );
};

export default App;