import React, { useEffect, useState } from "react";
import { useSessionContext, /*signOut,*/ SessionContextType } from "supertokens-auth-react/recipe/session";
import { useNavigate, useLocation } from "react-router-dom";
import "./home.css";
import Header from "./header";

const Home: React.FC = () => {
  //const session: SessionContextType = useSessionContext(); // Explicitly define session type
  const navigate = useNavigate();
  const location = useLocation();
  //const [username, setUsername] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  // Extract session details safely
  /*
  const doesSessionExist = session?.doesSessionExist ?? false;
  const userId = session?.userId ?? null;
  */

  // Show login success message if redirected from login
  useEffect(() => {
    if (location.state?.loginSuccess) {
      setMessage("You have successfully logged in!");
      setTimeout(() => setMessage(""), 5000);
      navigate(".", { replace: true, state: {} }); // Clear message after redirect
    }
  }, [location, navigate]);

  /*
  // Redirect if no session exists
  useEffect(() => {
    if (!session.loading && !doesSessionExist) {
      navigate("/login");
    }
  }, [session.loading, doesSessionExist, navigate]);
  */
  // Fetch username using userId
  /*
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
*/
/*
  // Show loading spinner while session is being checked
  if (session.loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  */
  /*
  // Logout function
  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };
  */

  return (
    <div className="homepage">
      {/* Success Message */}
      {message && <div className="success-message">{message}</div>}

      <Header />

      {/* Main Content */}
      <main className="content">
        {/*<h2>Welcome {username ? username : "Guest"}!</h2>*/}
        <nav className="mt-6 space-x-4">
          <button onClick={() => navigate("/about")} className="home-button">About Us</button>
          <button onClick={() => navigate("/contact")} className="home-button">Contact</button>
          <button onClick={() => navigate("/services")} className="home-button">Services</button>
        </nav>

        {/* Logout button appears only if the user is logged in */}
        {/*{doesSessionExist && (
          <button 
            onClick={handleLogout} 
            className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        )}*/}
      </main>
    </div>
  );
};

export default Home;
