import { useNavigate } from "react-router-dom";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import "./home.css";

const Header = () => {
    const navigate = useNavigate();
    const session = useSessionContext(); // ✅ Get session context

    if (session.loading) {
        return null; // ✅ Prevents errors while session is loading
    }

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
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
