import { useState } from "react";
import { RiLockPasswordLine, RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import { MdOutlineAccountCircle, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { signUp } from "supertokens-auth-react/recipe/emailpassword";
import "./Style.css";

export const RegisterForm = () => {
    const [form, setForm] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({ email: "", password: "", confirmPassword: "" });
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password: string) =>
        /^(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%&*~?]).{6,}$/.test(password);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({ email: "", password: "", confirmPassword: "" });
        setSuccessMsg("");
        setErrorMsg("");

        if (!validateEmail(form.email)) {
            setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
            return;
        }

        if (!validatePassword(form.password)) {
            setErrors((prev) => ({ ...prev, password: "Password must be at least 6 characters, contain an uppercase letter, 2 numbers, and a special character" }));
            return;
        }

        if (form.password !== form.confirmPassword) {
            setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }));
            return;
        }

        try {
            let response = await signUp({
                formFields: [
                    { id: "email", value: form.email },
                    { id: "password", value: form.password },
                    { id: "username", value: form.username },
                    { id: "fullName", value: form.fullName }
                ]
            });

            if (response.status === "OK") {
                setSuccessMsg("Sign-Up Successful! You can now log in.");
            } else {
                setErrorMsg("Sign-Up failed. Try again."); //response.formFields[0]?.error ||
            }
        } catch (error) {
            console.error("Sign-Up Error:", error);
            setErrorMsg("An error occurred. Please try again.");
        }
    };

    return (
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
                                name="fullName"
                                placeholder="Full Name"
                                value={form.fullName}
                                onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="input-field">
                        <p className="tilted">Username</p>
                        <div className="input-icon">
                            <MdOutlineDriveFileRenameOutline />
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={form.username}
                                onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="input-field">
                        <p className="tilted">E-mail</p>
                        <div className="input-icon">
                            <MdOutlineAccountCircle />
                            <input type="email" 
                            name="email" placeholder="Email" 
                            value={form.email} 
                            onChange={handleChange} required />
                            {errors.email && <p className="error-message">{errors.email}</p>}
                        </div>
                    </div>
                    <div className="input-field">
                        <p className="tilted">Password</p>
                        <div className="input-icon">
                            <MdOutlineAccountCircle />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password" placeholder="Password"
                                value={form.password}
                                onChange={handleChange} required />
                            <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
                                {showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
                            </span>
                            {errors.password && <p className="error-message">{errors.password}</p>}
                        </div>
                    </div>
                    <div className="input-field">
                        <p className="tilted">Enter again the password</p>
                        <div className="input-icon">
                            <RiLockPasswordLine />
                            <input
                                type={showPasswordConfirm ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={form.confirmPassword}
                                onChange={handleChange} required />
                            <span onClick={() => setShowPasswordConfirm(!showPasswordConfirm)} className="eye-icon">
                                {showPasswordConfirm ? <RiEyeLine /> : <RiEyeCloseLine />}
                            </span>
                            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                        </div>
                    </div>
                </div>
                <button type="submit" className="bttn-send">
                    <IoSend /> Sign Up
                </button>
                {errorMsg && <p className="error-message">{errorMsg}</p>}
                {successMsg && <p className="success-message">{successMsg}</p>}
                <br></br>
                <button type="button" className="bttn-have-acc">Having Account?</button>

            </form>
        </div>
    );
};

export default RegisterForm;
