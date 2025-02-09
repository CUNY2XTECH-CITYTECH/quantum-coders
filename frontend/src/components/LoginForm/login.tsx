// src/App.tsx
import React from "react";
import LoginForm from "./login-form";

const Login: React.FC = () => {
  return (
    <div className="App">
      <h1>React Login Form</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
