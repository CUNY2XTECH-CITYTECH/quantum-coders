import { useState } from "react";
import { RiLockPasswordLine, RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import { MdOutlineAccountCircle, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./Style.css";
import Header from "../HomePage/header";

import SuperTokens from "supertokens-web-js";
import Session from "supertokens-web-js/recipe/session";
import EmailPassword from "supertokens-web-js/recipe/emailpassword";

SuperTokens.init({
  appInfo: {
    apiDomain: "http://localhost:3001",
    apiBasePath: "/auth",
    appName: "Quantum-Coders",
  },
  recipeList: [Session.init(),
  EmailPassword.init()],
});

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({ email: "", password: "", confirmPassword: "" });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*~?]).{6,}$/.test(password);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ email: "", password: "", confirmPassword: "" });
    setSuccessMsg("");
    setErrorMsg("");

    let isValid = true;
    const newErrors = { email: "", password: "", confirmPassword: "" };

    if (!validateEmail(form.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!validatePassword(form.password)) {
      newErrors.password =
        "Password must be at least 6 characters, contain an uppercase letter, 1 number, and a special character";
      isValid = false;
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) return;

    try {
      console.log("📤 Sending signUp request:", {
        formFields: [
            { id: "email", value: form.email },
            { id: "password", value: form.password },
            { id: "username", value: form.username },
            { id: "fullName", value: form.fullName }
        ]
    });

    const response = await EmailPassword.signUp({
        formFields: [
            { id: "email", value: form.email },
            { id: "password", value: form.password },
            { id: "username", value: form.username },
            { id: "fullName", value: form.fullName }
        ],
    });  

      console.log("🔹 Sign-Up Response:", response);
      if (response.status === "OK") {
        setSuccessMsg("Sign-Up Successful! Redirecting...");
        setTimeout(() => navigate("/login", { state: { signupSuccess: true } }), 3000);
      } else if (response.status === "FIELD_ERROR") {
        setErrorMsg(
          response.formFields.map((field) => field.error).join(", ") || "Sign-Up failed. Try again."
        );
      } else {
        setErrorMsg("Sign-Up failed. Try again.");
      }
    } catch (error) {
      console.error("🚨 Sign-Up Error:", error);
      setErrorMsg("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="homepage">
        <Header />{/*userId={userId}*/}
      </div>
      <div>
        <div className="form-container-Signup">
          <div className="header-Signup">
            <div className="text-Signup">Create Account</div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="inputs-Signup">
              <div className="input-field-Signup">
                <p className="tilted-Signup">Full name</p>
                <div className="input-icon-Signup">
                  <MdOutlineDriveFileRenameOutline />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="input-field-Signup">
                <p className="tilted-Signup">Username</p>
                <div className="input-icon-Signup">
                  <MdOutlineDriveFileRenameOutline />
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="input-field-Signup">
                <p className="tilted-Signup">E-mail</p>
                <div className="input-icon-Signup">
                  <MdOutlineAccountCircle />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.email && <p className="error-message-Signup">{errors.email}</p>}
              </div>
              <div className="input-field-Signup">
                <p className="tilted-Signup">Password</p>
                <div className="input-icon-Signup">
                  <MdOutlineAccountCircle />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
                    {showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
                  </span>
                </div>
                {errors.password && <p className="error-message-Signup">{errors.password}</p>}
              </div>
              <div className="input-field-Signup">
                <p className="tilted-Signup">Confirm Password</p>
                <div className="input-icon-Signup">
                  <RiLockPasswordLine />
                  <input
                    type={showPasswordConfirm ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <span onClick={() => setShowPasswordConfirm(!showPasswordConfirm)} className="eye-icon">
                    {showPasswordConfirm ? <RiEyeLine /> : <RiEyeCloseLine />}
                  </span>
                </div>
                {errors.confirmPassword && (
                  <p className="error-message-Signup">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
            <button type="submit" className="bttn-send-Signup">
              <IoSend /> Register
            </button>
            {errorMsg && <p className="error-message-Signup">{errorMsg}</p>}
            {successMsg && <p className="success-message-Signup">{successMsg}</p>}
            <br />
            <br />
            <button type="button" className="bttn-have-acc-Signup" onClick={() => navigate("/login")}>
              Having Account?
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;