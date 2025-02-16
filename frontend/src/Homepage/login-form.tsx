import React from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "supertokens-auth-react/recipe/emailpassword";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      await signIn({ formFields: [{ id: "email", value: email }, { id: "password", value: password }] });
      navigate("/home");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold">Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const email = (e.target as any).email.value;
          const password = (e.target as any).password.value;
          handleLogin(email, password);
        }}
        className="mt-4"
      >
        <input type="email" name="email" placeholder="Email" required className="mb-2 px-4 py-2 border rounded" />
        <input type="password" name="password" placeholder="Password" required className="mb-2 px-4 py-2 border rounded" />
        <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-lg">Login</button>
      </form>
    </div>
  );
};

export default Login;
