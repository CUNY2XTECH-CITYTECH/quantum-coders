import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import Home from "./components/HomePage/Home";
import Login from "./components/LoginAcc/login-form";
import Register from "./components/CreateAccount/RegisterForm";
import Services from "./components/Services";
import AboutUs from "./components/AboutUs";
import PostPage from "./components/PostPage";
import ErrorPage from "./components/error-page";
import Profile from "./components/pages/ProfilePage";

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
        element: <SessionAuth><Profile /></SessionAuth>, // ✅ Protect this route
    },
    {
        path: "/services",
        element: <Services />,
    },
    {
        path: "/about",
        element: <AboutUs />,
    },
    {
        path: "/post",
        element: <PostPage />,
    },
    {
        path: "/auth/*",  // ✅ Catch-all for SuperTokens auth-related routes (prevents 404)
        element: <div>Authenticating...</div>,
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
