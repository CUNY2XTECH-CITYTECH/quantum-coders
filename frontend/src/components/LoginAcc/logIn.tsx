import React, { useState } from "react";
import { signIn } from "supertokens-auth-react/recipe/emailpassword";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response = await signIn({
        formFields: [
          { id: "email", value: form.email },
          { id: "password", value: form.password },
        ],
      });
      if (response.status === "WRONG_CREDENTIALS_ERROR") {
        setError("Incorrect email or password");
      } else {
        window.location.href = "/dashboard"; // Redirect after login
      }
    } catch (err) {
      setError("An error occurred, try again");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
