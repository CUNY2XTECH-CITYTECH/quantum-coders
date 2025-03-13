/*import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import Home from "./components/HomePage/Home";
import Login from "./components/LoginAcc/login-form";
import Register from "./components/CreateAccount/RegisterForm";
import Services from "./components/Services";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
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
        element: <SessionAuth><Profile /></SessionAuth>, // Ensure Profile is wrapped with SessionAuth if needed
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

export default App;*/
/*
import { createBrowserRouter, RouterProvider, RouteObject } from "react-router-dom";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import * as reactRouterDom from "react-router-dom"; // ✅ Import full module

// Import pages
import Home from "./components/HomePage/Home";
import Login from "./components/LoginAcc/login-form"; // ✅ Your custom login form
import Register from "./components/CreateAccount/RegisterForm"; // ✅ Your custom register form
import Services from "./components/Services";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import ErrorPage from "./components/error-page";
import Profile from "./components/pages/ProfilePage";

// ✅ Convert JSX elements to RouteObject[]
const superTokensRoutesJSX = getSuperTokensRoutesForReactRouterDom(reactRouterDom, []);

// ✅ Convert JSX to RouteObject format
const superTokensRoutes: RouteObject[] = superTokensRoutesJSX.map((element) => ({
    path: element.props.path,
    element: element.props.element,
}));

const router = createBrowserRouter([
    ...superTokensRoutes, // ✅ Spread converted routes

    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
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
        element: <SessionAuth><Profile /></SessionAuth>,
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
    return (
        <SuperTokensWrapper>
            <RouterProvider router={router} />
        </SuperTokensWrapper>
    );
};

export default App;*/


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import Home from "./components/HomePage/Home";
import Login from "./components/LoginAcc/login-form";
import Register from "./components/CreateAccount/RegisterForm";
import Services from "./components/Services";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
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
        path: "/contact",
        element: <Contact />,
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
