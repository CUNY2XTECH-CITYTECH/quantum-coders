import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSessionContext, getAccessToken } from "supertokens-auth-react/recipe/session"; // Correct imports

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const SessionAuth: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { loading } = useSessionContext(); // Session loading state
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function checkSession() {
      // Use getAccessToken to get the current access token
      const token = await getAccessToken();
      if (token) {
        try {
          const decodedToken: any = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
          setUserId(decodedToken?.userId || null); // Set the userId if present in the token payload
        } catch (err) {
          console.error("Error decoding token", err);
          setUserId(null);
        }
      }
    }

    if (!loading) {
      checkSession();
    }
  }, [loading]); // Depend on loading to fetch session once it's done loading

  if (loading) {
    return <div>Loading...</div>; // Show loading while session is being loaded
  }

  if (!userId) {
    return <Navigate to="/login" />; // Redirect to login if no userId (not authenticated)
  }

  return <>{children}</>;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return <SessionAuth>{children}</SessionAuth>;
};

export default ProtectedRoute;
