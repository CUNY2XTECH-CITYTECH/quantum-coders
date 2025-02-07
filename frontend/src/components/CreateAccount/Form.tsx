import { useState, /*useNavigate*/ } from "react";
import "./Style.css";
import { RiLockPasswordLine, RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import { MdOutlineAccountCircle, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { IoSend } from "react-icons/io5";

//something
export const FormSignUp = () => {
    //negate 
    //const navigate = useNavigate();

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

    //Status request new account, be fail or sucess
    /*const [successMsg, setSucessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");*/
    
    // Password visibility
    const [showPassword, setShowPassword] = useState(false);

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validatePassword = (password: string) =>
        /^(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%&*~?]).{6,}$/.test(password);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");

        if (!validateEmail(email)) {
            setEmailError("Invalid email format.");
            return;
        }

        if (!validatePassword(password)) {
            setPasswordError("Password must be at least 6 characters, include at least 2 numbers, 1 uppercase letter, and 1 special character.");
            return;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match.");
            return;
        }

        alert("Form submitted successfully!");
    };

    /*
    const goToLogin = () => {
        navigate = "/home/user/quantum-coders/frontend/src/components";
    };
    */
    return (
        <>
            <div className="test-header">
                <p>Here is the header (to go back to the main page)</p>
            </div>
            <br />
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
                                    type={showPassword ? "text" : "password"}
                                    className="input-password"
                                    placeholder="Re-enter your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
                                    {showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
                                </span>
                            </div>
                            {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
                        </div>

                        <button type="submit" className="bttn-send">
                            <IoSend />
                        </button>
                        
                        <br />
                        <button type="button" className="bttn-have-acc">Have an Account?</button>
                    </div>
                </form>
            </div>
        </>
    );
};
