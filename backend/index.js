import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import ThirdParty from "supertokens-node/recipe/thirdparty";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import { middleware, errorHandler } from "supertokens-node/framework/express";
import dotenv from "dotenv";

dotenv.config();

// ✅ Initialize Supertokens
supertokens.init({
    framework: "express",
    supertokens: {
        connectionURI: "https://try.supertokens.io",
        apiKey: process.env.SUPERTOKENS_API_KEY,
    },
    appInfo: {
        appName: "Quantum Coders",
        apiDomain: "http://localhost:3001",
        websiteDomain: "http://localhost:5173",
        apiBasePath: "/auth",
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
app.use(middleware()); // ✅ SuperTokens middleware

// ✅ Health check endpoint
app.get("/", (req, res) => {
    res.send("🚀 Server is running!");
});

// ✅ Error handling for SuperTokens
app.use(errorHandler());

// ✅ Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}/auth`));
