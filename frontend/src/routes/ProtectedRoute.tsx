import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return <SessionAuth>{children}</SessionAuth>;
};

export default ProtectedRoute;
/*
const ProtectedRoute = () => {
    const user = null
    return user ? <Outlet/> : <Navigate to="/login"/>
}

export default ProtectedRoute
*/