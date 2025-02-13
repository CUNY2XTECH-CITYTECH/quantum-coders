import { useState, /*useNavigate*/ } from "react";
import "./Style.css";
import { RiLockPasswordLine, RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import { MdOutlineAccountCircle, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import EmailPassword from "supertokens-web-js/recipe/emailpassword";

import SuperTokens from "supertokens-web-js";
import Session from "supertokens-web-js/recipe/session";
//import EmailPassword from "supertokens-web-js/recipe/emailpassword";

SuperTokens.init({
    appInfo: {
        apiDomain: "http://localhost:3001",
        apiBasePath: "/auth",
        appName: "Quantum-Coders",
    },
    recipeList: [
        Session.init(),
        EmailPassword.init(),
    ],
});

export const FormSignUp = () => {
    // Form states
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Error states
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    // Status messages
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    // Password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    // Validation functions
    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password: string) =>
        /^(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%&*~?]).{6,}$/.test(password);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");
        setSuccessMsg("");
        setErrorMsg("");

        // Form validation
        if (!validateEmail(email)) {
            setEmailError("     Invalid email format        ");
            setErrorMsg("       Form submission failed. Please check your inputs        ");
            return;
        }

        if (!validatePassword(password)) {
            const errorMessage = "Password requirement 6 characters, 1 number, 1 uppercase letter & 1 special character";
            setPasswordError(errorMessage);
            
            
            setErrorMsg("       Form submission failed. Please check your inputs        ");
            return;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError("       Passwords do not match     ");
            setErrorMsg("       Form submission failed. Please check your inputs        ");
            return;
        }

        // supertokens check
        try {
            const response = await EmailPassword.signUp({
                formFields: [
                    { id: "email", value: email },
                    { id: "password", value: password },
                    { id: "fullName", value: fullName },
                    { id: "username", value: username },
                ],
            });

            if (response.status === "OK") {
                setSuccessMsg("     Sign-Up Successful! You can now log in      ");
                console.log("User ID:", response.user.id);
            } else {
                setErrorMsg("Sign-Up failed. Email might already be in use.");
            }
        } catch (error) {
            console.error("Sign-Up Error:", error);
            setErrorMsg("      Sign-Up failed due to a network error       ");
        }
    }
    /*
    const goToLogin = () => {
        navigate = "/home/user/quantum-coders/frontend/src/components";
    };
    */
    return (
        <>
            <div className="form-container">
                <div className="header">
                    <div className="text">Create Account</div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="inputs">
                        <div className="input-field">
                            <p className="tilted">Full name</p>
                            <div className="input-icon">
                                <MdOutlineDriveFileRenameOutline />
                                <input
                                    type="text"
                                    className="input-fullname"
                                    placeholder="Enter your full name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-field">
                            <p className="tilted">Username</p>
                            <div className="input-icon">
                                <MdOutlineDriveFileRenameOutline />
                                <input
                                    type="text"
                                    className="input-username"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-field">
                            <p className="tilted">E-mail</p>
                            <div className="input-icon">
                                <MdOutlineAccountCircle />
                                <input
                                    type="email"
                                    className="input-email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            {emailError && <p className="error-message">{emailError}</p>}
                        </div>

                        <div className="input-field">
                            <p className="tilted">Password</p>
                            <div className="input-icon">
                                <RiLockPasswordLine />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="input-password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
                                    {showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
                                </span>
                            </div>
                            {passwordError && <p className="error-message">{passwordError}</p>}
                        </div>

                        <div className="input-field">
                            <p className="tilted">Confirm Password</p>
                            <div className="input-icon">
                                <RiLockPasswordLine />
                                <input
                                    type={showPasswordConfirm ? "text" : "password"}
                                    className="input-password"
                                    placeholder="Re-enter your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <span onClick={() => setShowPasswordConfirm(!showPasswordConfirm)} className="eye-icon">
                                    {showPasswordConfirm ? <RiEyeLine /> : <RiEyeCloseLine />}
                                </span>
                            </div>
                            {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
                        </div>

                        <button type="submit" className="bttn-send">
                            <IoSend />
                        </button>
                        {errorMsg && <p style={{ color: "red", marginTop: "5px" }}>{errorMsg}</p>}
                        {successMsg && <p style={{ color: "green", marginTop: "5px" }}>{successMsg}</p>}

                        <button type="button" className="bttn-have-acc">Having Account?</button>
                    </div>
                </form>
            </div>
        </>
    );
};
