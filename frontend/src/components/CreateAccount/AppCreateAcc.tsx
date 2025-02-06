import { FormSignUp } from "../../components/CreateAccount/Form";
import ReactDOM from "react-dom/client";

const container = document.getElementById("root");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<FormSignUp />);
} else {
  console.error("SignUp element not found");
}
