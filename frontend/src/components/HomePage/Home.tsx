import React, { useEffect, useState } from "react";
import { useSessionContext, signOut } from "supertokens-auth-react/recipe/session";
import { useNavigate, useLocation } from "react-router-dom";
import "./home.css";
import Header from "./header";
const Home: React.FC = () => {
  //const { loading, userId, doesSessionExist } = useSessionContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  /*
  // Check for success messages (Signup/Login)
  useEffect(() => {
    if (location.state?.signupSuccess) {
      setMessage("Your account has been successfully created");
      setTimeout(() => setMessage(""), 5000);
    } else if (location.state?.loginSuccess) {
      setMessage("You have successfully logged in");
      setTimeout(() => setMessage(""), 5000);
    }
  }, [location.state]);
  
  
  // Redirect if no session exists
  useEffect(() => {
    if (!loading && !doesSessionExist) {
      navigate("/login");
    }
  }, [loading, doesSessionExist, navigate]);

  
  // Fetch username using userId
  useEffect(() => {
    const fetchUsername = async () => {
      if (userId) {
        try {
          const response = await fetch(`/api/users/${userId}`);
          if (response.ok) {
            const data = await response.json();
            setUsername(data.username);
          } else {
            console.error("Failed to fetch username");
          }
        } catch (error) {
          console.error("Error fetching username:", error);
        }
      }
    };
    fetchUsername();
  }, [userId]);

  
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }*/

  /*// need a if there is a user, appear the button log out
    // Logout function
  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };
    <button onClick={handleLogout} className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">
      Logout
    </button>
  */
  const WelcomeMsg = ` ${username || ""}`;//if on top work, add before ${}, this 'Welcome'
  return (
    <div className="homepage">
      {/* Success Message Display */}
      {message && <div className="success-message">{message}</div>}

      <Header/>

      {/* Main Content */}
      <main className="content">
        <h2> {WelcomeMsg}</h2>
        {/*<p>Your User ID: {userId}</p>*/}
        <nav className="mt-6 space-x-4">
          <button onClick={() => navigate("/about")} className="home-button">About Us</button>
          <button onClick={() => navigate("/contact")} className="home-button">Contact</button>
          <button onClick={() => navigate("/services")} className="home-button">Services</button>
        </nav>

      </main>
    </div>
  );
};

export default Home;