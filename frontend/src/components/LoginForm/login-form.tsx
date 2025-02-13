import React, { useState } from "react";
import "./login-form.css";
import { MdOutlineAccountCircle, MdOutlineDriveFileRenameOutline } from 'react-icons/md';

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
    <div className="form-container">
      <h2>{isForgotPassword ? 'Reset Password' : 'Login Form'}</h2>

      {/* Login Form */}
      {!isForgotPassword && (
        <form onSubmit={handleSubmit} className="form-login">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <MdOutlineAccountCircle />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              aria-label="Email Address"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <MdOutlineDriveFileRenameOutline />
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              aria-label="Password"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <button type="submit" className="btn-submit">Login</button>
          <p>
            <button type="button" onClick={handleForgotPassword} className="btn-link">
              Forgot Password?
            </button>
          </p>
        </form>
      )}

      {/* Forgot Password Form */}
      {isForgotPassword && (
        <form onSubmit={handleResetPasswordSubmit} className="form-reset">
          <div className="form-group">
            <label htmlFor="resetEmail">Enter your email to reset password:</label>
            <MdOutlineDriveFileRenameOutline />
            <input
              type="email"
              id="resetEmail"
              value={resetPasswordData.email}
              onChange={handleResetPasswordChange}
              className="input-field"
              aria-label="Reset Email Address"
            />
          </div>
          <button type="submit" className="btn-submit">Reset Password</button>
          <p>
            <button type="button" onClick={() => setIsForgotPassword(false)} className="btn-link">
              Back to Login
            </button>
          </p>
        </form>
      )}
    </div>
  );
};

export default FormLogin;
