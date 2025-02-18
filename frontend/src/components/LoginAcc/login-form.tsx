//Judah Code LogIn
import React, { useState } from "react";
import "./login-form.css";
import { MdOutlineAccountCircle, MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import Header from "../HomePage/header";
import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import EmailPassword from 'supertokens-web-js/recipe/emailpassword'

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

// Interfaces for types
interface FormData {
  email: string;
  password: string;
}

interface ResetPasswordData {
  email: string;
}

const FormLogin = () => {
  const navigate = useNavigate();

  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [resetPasswordData, setResetPasswordData] = useState<ResetPasswordData>({ email: '' });
  const [errors, setErrors] = useState<{ email: string, password: string }>({ email: '', password: '' });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateLoginForm()) {
      // Proceed with login logic
      console.log("Login successful", formData);
      console.log("User signed up:", formData);
      navigate("/", { state: { signupSuccess: true } });
    }
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
  };

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetPasswordData.email) {
      alert("Please enter an email address.");
    } else {
      // Handle reset password logic
      console.log("Reset password request sent", resetPasswordData.email);
    }
  };

  const handleResetPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setResetPasswordData((prevData) => ({
      ...prevData,
      email: value,
    }));
  };

  return (
    <>
    <div className="homepage">
      <Header/>
    </div>
    <div className="form-container-login">
      <h2 className="h2-login">{isForgotPassword ? 'Reset Password' : 'Login Form'}</h2>

      {/* Login Form */}
      {!isForgotPassword && (
        <form onSubmit={handleSubmit} className="form-login-login">
          <div className="form-group">
            <div className="input-icon-login">
            <label htmlFor="email" className="label-login">Email</label>
              <MdOutlineAccountCircle className="input-icon-login"/>
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
          <br></br>
          <div className="form-group">
            <div className="input-icon-login"> 
              <label htmlFor="password" className="label-login">Password</label> 
              <MdOutlineDriveFileRenameOutline/>
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
          <br></br>
          <button type="submit" className="btn-submit-login">Login</button>
          <p>
            <button type="button" onClick={handleForgotPassword} className="btn-link-login">
              Forgot Password?
            </button>
          </p>
        </form>
      )}

      {/* Forgot Password Form */}
      {isForgotPassword && (
        <form onSubmit={handleResetPasswordSubmit} className="form-reset-login">
          <div className="form-group-login">
            <div className="input-icon-login"> 
            <label htmlFor="resetEmail">Enter your email to reset password:</label>
            <br></br>
            </div>
            <div className="input-icon-login"> 
            <input
              type="email"
              id="resetEmail"
              value={resetPasswordData.email}
              onChange={handleResetPasswordChange}
              className="input-field-login"
              aria-label="Reset Email Address"
            />
          </div>
          </div>
          <button type="submit" className="btn-submit-login">Reset Password</button>
          <p>
            <button type="button" onClick={() => setIsForgotPassword(false)} className="btn-link-login">
              Back to Login
            </button>
          </p>
        </form>
      )}
    </div>
    </>
  );
};

export default FormLogin;