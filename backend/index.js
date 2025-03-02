import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import ThirdParty from "supertokens-node/recipe/thirdparty";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import { middleware, errorHandler } from "supertokens-node/framework/express";
import dotenv from "dotenv";

// Import Drizzle ORM connection and schema
import { db } from "./db.js"; // ensure your db file is correctly referenced
import * as schema from "./src/drizzle/schema.js";

dotenv.config();

// Initialize SuperTokens
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

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());
app.use(middleware()); // SuperTokens middleware

// Health check endpoint
app.get("/", (req, res) => {
    res.send("🚀 Server is running!");
});

// Example route to fetch users from the database using Drizzle ORM
app.get("/users", async (req, res) => {
    try {
        const users = await db.select().from(schema.users);
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// SuperTokens error handling
app.use(errorHandler());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}/auth`)
);
