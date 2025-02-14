import React from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "supertokens-auth-react/recipe/emailpassword";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = async (email: string, password: string) => {
    try {
      await signUp({ formFields: [{ id: "email", value: email }, { id: "password", value: password }] });
      navigate("/home");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold">Register</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const email = (e.target as any).email.value;
          const password = (e.target as any).password.value;
          handleRegister(email, password);
        }}
        className="mt-4"
      >
        <input type="email" name="email" placeholder="Email" required className="mb-2 px-4 py-2 border rounded" />
        <input type="password" name="password" placeholder="Password" required className="mb-2 px-4 py-2 border rounded" />
        <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-lg">Register</button>
      </form>
    </div>
  );
};

export default Register;
