/*import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import Home from "./components/HomePage/Home";
import Login from "./components/LoginAcc/login-form";
import Register from "./components/CreateAccount/RegisterForm";

const App = () => {
  return (
    <Router>
      <SessionAuth> 
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
*/
/*import { Routes, Route } from "react-router-dom";
import Home from "./components/HomePage/Home";
import Login from "./components/LoginAcc/login-form";
import Register from "./components/CreateAccount/RegisterForm";
import ErrorPage from "./components/error-page";
import Services from "./components/HomePage/Services";
import About from "./components/HomePage/AboutUs";
import Contact from "./components/HomePage/Contact";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

const Routers = () => {
  return (
    <SessionAuth>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </SessionAuth>
  );
};

export default Routers;*/
