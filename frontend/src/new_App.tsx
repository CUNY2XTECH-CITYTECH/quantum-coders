/*
//import React from "react";
import SuperTokens from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import FormLogin from "./components/LoginAcc/login-form";
import RegisterForm from "./components/CreateAccount/RegisterForm";
import Home from "./components/HomePage/Home";

SuperTokens.init({
  appInfo: {
    appName: "Quantum Coders",
    apiDomain: "http://localhost:3001",
    websiteDomain: "http://localhost:5173",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    EmailPassword.init(),
    Session.init(),
  ],
});

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<FormLogin />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<Home/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;*/
