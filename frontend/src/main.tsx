import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RegisterForm from "./components/CreateAccount/RegisterForm";
//import logIn from "./LoginAcc/logIn"
import Homepage from "./components/HomePage/homepage"
import ErrorPage from "./components/error-page";

const routerSignUp = createBrowserRouter([
  {
    path: "/",
    element: <RegisterForm/>,
    errorElement: <ErrorPage />,
  },
]);

const RouterHomepage = createBrowserRouter([
  {
    path: "/",
    element: <Homepage/>,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={RouterHomepage} />
  </React.StrictMode>
);
