import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SuperTokensWrapper } from "supertokens-auth-react";
//import Login from "./components/LoginAcc/logIn";
import RegisterForm from "./components/CreateAccount/RegisterForm";
import Dashboard from "./components/dashboard";
//import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <SuperTokensWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/dashboard" element={/*<ProtectedRoute>*/<Dashboard />/*</ProtectedRoute>*/} />
        </Routes>
      </BrowserRouter>
    </SuperTokensWrapper>
  );
};

export default App;
