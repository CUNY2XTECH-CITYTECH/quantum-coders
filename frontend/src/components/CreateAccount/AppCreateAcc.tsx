//Yuzhen's Code
import  FormSignUp  from "./RegisterForm";
import ReactDOM from "react-dom/client";

const container = document.getElementById("root");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<FormSignUp />);
} else {
  console.error("SignUp element not found");
}

/*
//go backhome
import { FormSignUp } from "./RegisterForm";

const routerAcc = createHomeRouter([
  {
    path: "../src/components/",
    element: <FormSignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routerAcc} />
  </React.StrictMode>
);
*/