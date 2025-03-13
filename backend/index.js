import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import ThirdParty from "supertokens-node/recipe/thirdparty";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import { middleware, errorHandler } from "supertokens-node/framework/express";
import dotenv from "dotenv";

import { verifySession } from 'supertokens-node/recipe/session/framework/express';
//import { SessionRequest } from 'supertokens-node/framework/express';
//import supertokens from 'supertokens-node';

// Import Drizzle ORM connection and schema
import { db } from "./src/drizzle/db.js"; // ensure your db file is correctly referenced
import * as schema from "./src/drizzle/schema.js";


//Import Supermeta
import SuperTokens from "supertokens-node";
import UserMetadata from "supertokens-node/recipe/usermetadata";

//import drizzle orm
import { eq } from "drizzle-orm";

dotenv.config();

//import user meta
const UserMetadata = require("supertokens-node/recipe/usermetadata");

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
        //add UserMetaData
        UserMetadata.init(),
    ],
});

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());
app.use(middleware()); // SuperTokens middleware
//app.use("/user", userRoutes);

// Health check endpoint
//BASIC Route
app.get("/", (req, res) => {
    res.send("🚀 Server is running!");
});

//create the root route
//including the post page
/*
app.get("/get-user-info", verifySession(), async (req, res) => {
    let userId = req.session.getUserId();
    
    let userInfo = await supertokens.getUser(userId)
    res.json(userInfo);
})*/
/*
app.get("/user/userinfo", verifySession(), async (req, res) => {
    try {
        const userId = req.session.getUserId();
        const { metadata } = await UserMetadata.getUserMetadata(userId);

        res.json({
            userId,
            username: metadata.userName || "Guest",
        });
    } catch (error) {
        console.error("🚨 Error retrieving user metadata:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
*/

//----------------------------------------------------
app.post("/updateinfo", verifySession(), async (req, res) => {
    const session = req.session;
    const userId = session.getUserId();

    // Assume username is sent from frontend
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }

    // Store username in metadata
    await UserMetadata.updateUserMetadata(userId, { username });

    res.json({ message: "User metadata updated successfully!" });
});
//----------------------------------------------------
app.get("/user/userinfo", verifySession(), async (req, res) => {
    
    try {
        const userId = req.session.getUserId();
        const { metadata } = await UserMetadata.getUserMetadata(userId);

        // If username exists in metadata, return it
        const username = metadata.username || "Unknown User";

        res.json({
            userId,
            username, // Now returns the real username instead of "Guest"
        });
    } catch (error) {
        console.error("🚨 Error retrieving user metadata:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    //BELOW CODE DOES NOT WORK
   /*
        try {
            const userId = req.session.getUserId();
            console.log("✅ Fetching user info for userId:", userId); // Debugging log
    
            // Fetch user metadata from SuperTokens
            const { metadata } = await UserMetadata.getUserMetadata(userId);
            console.log("✅ SuperTokens Metadata:", metadata); // Debugging log
    
            // Fetch user details from the database using Drizzle ORM
            const users = await db.select().from(schema.users).where(eq(schema.users.id, userId));
            console.log("✅ Users from DB:", users); // Debugging log
    
            if (users.length === 0) {
                console.warn("⚠️ No user found in DB for userId:", userId);
            }
    
            const dbUser = users.length > 0 ? users[0] : null;
    
            // Determine final username (database takes priority)
            const username = dbUser?.username || metadata.username || "Unknown User";
    
            res.json({
                userId,
                username,
                email: dbUser?.email || "No email found",
                createdAt: dbUser?.created_at || "N/A",
            });
        } catch (error) {
            console.error("🚨 Error retrieving user data:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
        */
});



// New endpoint to fetch username by user ID
app.get("/api/users/:userId", verifySession(), async (req, res) => {
    const userId = req.params.userId;
    console.log("Fetching user with ID:", userId); // Log the user ID
    try {
        const user = await db.select().from(schema.users).where(schema.users.id.eq(userId)).single();
        console.log("User fetched from DB:", user); // Log the user fetched from DB
        if (user) {
            res.json({ username: user.username });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Failed to fetch user" });
    }
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