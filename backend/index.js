const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { middleware, errorHandler } = require("supertokens-node/framework/express");
const supertokens = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const ThirdParty = require("supertokens-node/recipe/thirdparty");
const EmailPassword = require("supertokens-node/recipe/emailpassword");
require("dotenv").config();

// ✅ Initialize Supertokens properly
supertokens.init({
    framework: "express",
    supertokens: {
        connectionURI: "https://try.supertokens.io", // Change this if self-hosting
        apiKey: process.env.SUPERTOKENS_API_KEY, 
    },
    appInfo: {
        appName: "Quantum Coders",
        apiDomain: "http://localhost:3001",
        websiteDomain: "http://localhost:5173",
        apiBasePath: "/auth",  // ✅ SuperTokens' authentication routes
        websiteBasePath: "/auth",
    },
    recipeList: [
        EmailPassword.init(),
        ThirdParty.init(),
        Session.init(),
    ],
});

// ✅ Express server setup
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());
app.use(middleware());  // ✅ Automatically adds SuperTokens authentication routes

// ✅ Use SuperTokens' built-in auth routes
app.use(errorHandler());

app.listen(3001, () => console.log("🚀 Server running on http://localhost:3001/auth"));
