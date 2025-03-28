//import React from "react";
import { signOut } from "supertokens-auth-react/recipe/session";

const Dashboard = () => {
  const handleLogout = async () => {
    await signOut();
    window.location.href = "./LoginAcc/login"; //add login form
  };

  return (
    <div>
      <h2>Dashboard [test]</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;