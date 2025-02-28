import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import Home from "./components/HomePage/Home";
import Login from "./components/LoginAcc/login-form";
import Register from "./components/CreateAccount/RegisterForm";

const App = () => {
  return (
    <Router>
      <SessionAuth> {/* Ensure all routes are inside SessionAuth */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </SessionAuth>
    </Router>
  );
};

export default App;
