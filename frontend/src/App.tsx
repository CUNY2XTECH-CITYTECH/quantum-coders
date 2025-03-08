import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import Home from "./components/HomePage/Home";
import Login from "./components/LoginAcc/login-form";
import Register from "./components/CreateAccount/RegisterForm";
import Services from "./components/Services";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import ErrorPage from "./components/error-page";
import Profile from "./components/profile/Profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />, // ✅ Enables `useRouteError()`
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/profile",
        element: <Profile />,
    },
    {
        path: "/services",
        element: <SessionAuth><Services /></SessionAuth>,
    },
    {
        path: "/about",
        element: <SessionAuth><AboutUs /></SessionAuth>,
    },
    {
        path: "/contact",
        element: <SessionAuth><Contact /></SessionAuth>,
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
