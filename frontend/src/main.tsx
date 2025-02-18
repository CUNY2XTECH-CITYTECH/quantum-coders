import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RegisterForm from "./components/CreateAccount/RegisterForm";
import FormLogin from "./components/LoginAcc/login-form";
import Home from "./components/HomePage/Home";
import ErrorPage from "./components/error-page";
import Services from "./components/HomePage/Services"
import About from "./components/HomePage/AboutUs"
import Contact from "./components/HomePage/Contact"

//here conatin all reouter for the homepage
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <FormLogin />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/services",
    element: <Services/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <About/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contact",
    element: <Contact/>,
    errorElement: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
