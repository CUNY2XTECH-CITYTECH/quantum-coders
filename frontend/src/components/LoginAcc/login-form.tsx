//Judah Code LogIn
import React, { useState, useEffect } from "react";
import "./login-form.css";
import { MdOutlineAccountCircle, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../HomePage/header";
import { signIn } from "supertokens-auth-react/recipe/emailpassword";
import SuperTokens from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";

SuperTokens.init({
    appInfo: {
        appName: "Quantum Coders",
        apiDomain: "http://localhost:3001",
        websiteDomain: "http://localhost:5173"
    },
    recipeList: [
        EmailPassword.init(),
        Session.init()
    ]
});

export const requestOptions = {
    credentials: "include"
};

const FormLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //const [userId, setUserId] = useState<string | null>(null);
  const [msgCreateAcc, setMsgCreateAcc] = useState("");

  useEffect(() => {
    if (location.state?.signupSuccess) {
      setMsgCreateAcc("Your account has been successfully created!");
      // Clear the message after 5 seconds
      setTimeout(() => setMsgCreateAcc(""), 5000);
      // Reset the state so it doesn't reappear on refresh
      navigate(".", { replace: true, state: {} });
    }
  }, [location, navigate]);

  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateLoginForm = () => {
    const newErrors = { email: '', password: '' };
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid.";

    if (!formData.password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return newErrors.email === '' && newErrors.password === '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateLoginForm()) {
      try {
        let response = await signIn({
          formFields: [
            { id: "email", value: formData.email },
            { id: "password", value: formData.password }
          ],
          userContext: {}
        });

        if (response.status === "OK") {
          console.log("Login successful:", response.user);
          navigate("/");  // Redirect on success
        } else {
          setErrors({ email: "", password: "Invalid email or password. Try again." });
        }
      } catch (error) {
        console.error("Login Error: ", error);
        setErrors({ email: "", password: "Something went wrong. Please try again later." });
      }
    }
  };

  return (
    <>
      <div className="homepage">
        {msgCreateAcc && <div className="success-message">{msgCreateAcc}</div>}
        <Header />
      </div>
      <div className="form-container-login">
        <h2 className="h2-login">{isForgotPassword ? 'Reset Password' : 'Login Form'}</h2>

        {!isForgotPassword && (
          <form onSubmit={handleSubmit} className="form-login-login">
            <div className="form-group">
              <div className="input-icon-login">
                <label htmlFor="email" className="label-login">Email</label>
                <MdOutlineAccountCircle className="input-icon-login" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field-login"
                aria-label="Email Address"
              />
              {errors.email && <span className="error-login">{errors.email}</span>}
            </div>
            <br />
            <div className="form-group">
              <div className="input-icon-login">
                <label htmlFor="password" className="label-login">Password</label>
                <MdOutlineDriveFileRenameOutline />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field-login"
                aria-label="Password"
              />
              {errors.password && <span className="error-login">{errors.password}</span>}
            </div>
            <br />
            <button type="submit" className="btn-submit-login">Login</button>
            <p>
              <button type="button" onClick={() => setIsForgotPassword(true)} className="btn-link-login">
                Forgot Password?
              </button>
            </p>
          </form>
        )}
      </div>
    </>
  );
};

export default FormLogin;
