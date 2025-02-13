
import ReactDOM from "react-dom/client";
import FormLogin from "./login-form";

const container = document.getElementById("root");
if (container){
  const root = ReactDOM.createRoot(container);
  root.render(<FormLogin />);
} else {
  console.error("Login info not found")
}