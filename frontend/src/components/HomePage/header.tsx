import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import "./home.css";
import { signOut } from "supertokens-auth-react/recipe/session";

const Header = () => {
    const navigate = useNavigate();
    const session = useSessionContext(); // ✅ Get session context

    //declare to logOut
    const [userId, setUserId] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    if (session.loading) {
        return null; // ✅ Prevents errors while session is loading
    }

    // Logout function
    const handleLogout = async () => {
        await signOut();
        setUsername(null); // Clear username on logout
        setUserId(null);   // Clear userId
        navigate("/login"); // Redirect to login page
    };

    return (
        <header className="header">
            <div className="left-buttons">
                <button onClick={() => navigate("/")} className="header-button">Home</button>
            </div>
            <h1 className="title">Quantum Coders</h1>
            <div className="right-buttons">
                {!session.doesSessionExist ? (
                    <>
                        <button onClick={() => navigate("/register")} className="header-button">Sign Up</button>
                        <button onClick={() => navigate("/login")} className="header-button">Log In</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => navigate("/profile")} className="header-button">Profile</button>
                        <button onClick={handleLogout} className="header-button">Logout</button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
