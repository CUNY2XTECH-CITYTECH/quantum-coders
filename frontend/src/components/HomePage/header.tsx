import { useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { useSessionContext, signOut } from "supertokens-auth-react/recipe/session";
import "./home.css";

const Header = () => {
    const navigate = useNavigate();
    const session = useSessionContext(); // ✅ Get SuperTokens session context

    // ✅ Logout function
    const handleLogout = async () => {
        try {
            await signOut();  // Clear SuperTokens session
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            navigate("/login"); // ✅ Redirect to login
        }
    };

    // ✅ Don't render until session is loaded
    if (session.loading) {
        return null;
    }

    return (
        <header className="header">
            <div className="left-buttons">
                <button onClick={() => navigate("/")} className="header-button"> <IoHomeOutline /> </button>
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
