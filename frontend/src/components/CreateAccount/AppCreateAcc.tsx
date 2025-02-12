import { FormSignUp } from "./RegisterForm";
import ReactDOM from "react-dom/client";

const container = document.getElementById("here");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<FormSignUp />);
} else {
  console.error("SignUp element not found");
}
