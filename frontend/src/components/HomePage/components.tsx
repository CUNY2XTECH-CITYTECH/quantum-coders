import React, { useEffect, useState } from "react";
import { useSessionContext, signOut } from "supertokens-auth-react/recipe/session";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const session = useSessionContext();
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      if (!session.loading && session.doesSessionExist) {
        try {
          const id = await session.getUserId();
          setUserId(id);
        } catch (err) {
          setError("Failed to fetch user details.");
          console.error("Error fetching user ID:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserId();
  }, [session]);

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome</h1>
      {error ? (
        <p className="text-red-500 mt-4">{error}</p>
      ) : (
        <p className="mt-4 text-lg">{userId ? `User ID: ${userId}` : "No user data available."}</p>
      )}
      <button
        onClick={handleLogout}
        className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
