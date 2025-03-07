/*
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SuperTokensWrapper } from "supertokens-auth-react"; 
import App from "./routers";
import "./config/supertokensConfig";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SuperTokensWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SuperTokensWrapper>
  </React.StrictMode>
);
*/
import { Routes, Route } from "react-router-dom";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import Home from "./components/HomePage/Home";
import Login from "./components/LoginAcc/login-form";
import Register from "./components/CreateAccount/RegisterForm";
import Services from "./components/Services";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import ErrorPage from "./components/error-page";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/services"
        element={
          <SessionAuth>
            <Services />
          </SessionAuth>
        }
      />
      <Route
        path="/about"
        element={
          <SessionAuth>
            <AboutUs />
          </SessionAuth>
        }
      />
      <Route
        path="/contact"
        element={
          <SessionAuth>
            <Contact />
          </SessionAuth>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
