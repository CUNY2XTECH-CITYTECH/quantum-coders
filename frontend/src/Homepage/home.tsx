import React, { useEffect, useState } from "react";
import { useSessionContext, signOut } from "supertokens-auth-react/recipe/session";
import { useNavigate } from "react-router-dom";
import Services from "./Services"; // Import the Services component

const Home: React.FC = () => {
  const { loading, doesSessionExist, getUserId } = useSessionContext();
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && doesSessionExist) {
      getUserId().then(setUserId);
    }
  }, [loading, doesSessionExist, getUserId]);

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome to Our Website</h1>
      <p className="mt-4 text-lg">
        {userId ? `User ID: ${userId}` : "Fetching user details..."}
      </p>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">About Us</h2>
        <p className="mt-2">
          Welcome to the About page! We are glad to have you here.
        </p>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Contact Us</h2>
        <p className="mt-2">
          Feel free to reach out to us through this page.
        </p>
      </div>
      <div className="mt-6">
        <Services /> {/* Include the Services component */}
      </div>
      <button
        onClick={handleLogout}
        className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
