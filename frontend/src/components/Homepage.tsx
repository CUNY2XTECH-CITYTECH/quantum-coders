
import React, { useEffect, useState } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { signOut } from "supertokens-auth-react/recipe/session";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const session = useSessionContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (session.loading === false && session.doesSessionExist) {
      session.getUserId().then((userId) => {
        // Fetch user email (replace this with actual API call if needed)
        setEmail(`User ID: ${userId}`);
      });
    }
  }, [session]);

  const handleLogout = async () => {
    await signOut();
    navigate("/login"); // Redirect to login page after logout
  };

  if (session.loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome</h1>
      <p className="mt-4 text-lg">{email ? email : "Fetching user details..."}</p>
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