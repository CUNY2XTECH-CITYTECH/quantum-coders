import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import ThirdParty from "supertokens-node/recipe/thirdparty";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import { middleware, errorHandler } from "supertokens-node/framework/express";
import dotenv from "dotenv";

import { verifySession } from "supertokens-node/recipe/session/framework/express";

// Import Drizzle ORM connection and schema
import { db } from "./src/drizzle/db.js"; // ensure your db file is correctly referenced
import * as schema from "./src/drizzle/schema.js";

// Import user metadata
import UserMetadata from "supertokens-node/recipe/usermetadata";

dotenv.config();


// Check for API key
if (!process.env.SUPERTOKENS_API_KEY) {
    console.warn("⚠️ Warning: SUPER TOKENS API KEY is missing. Make sure to set it in your .env file!");
}

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
        EmailPassword.init({
            signUpFeature: {
                formFields: [
                    { id: "email", label: "Email", placeholder: "Enter your email" },
                    { id: "password", label: "Password", placeholder: "Enter your password" },
                    { id: "username", label: "Username", placeholder: "Enter your username" },
                    { id: "fullName", label: "Full Name", placeholder: "Enter your full name" },
                ],
            },
            override: {
                apis: (originalImplementation) => {
                    return {
                        ...originalImplementation,
                        signUpPOST: async function (input) {
                            if (originalImplementation.signUpPOST === undefined) {
                                throw Error("Should never come here");
                            }
        
                            // First, call the original implementation of signUpPOST
                            let response = await originalImplementation.signUpPOST(input);
        
                            if (response.status === "OK") {
                                let { id, email } = response.user;
                                let formFields = input.formFields || [];
        
                                console.log("🔍 Received formFields:", formFields);
                                console.log("🆔 User ID:", id);
                                console.log("📧 User Email:", email);
        
                                // Extract additional user metadata
                                let usernameField = formFields.find(field => field.id === "username");
                                let fullNameField = formFields.find(field => field.id === "fullName");
                                let passwordField = formFields.find(field => field.id === "password");
        
                                let username = usernameField ? usernameField.value : null;
                                let fullName = fullNameField ? fullNameField.value : null;
                                let password = passwordField ? passwordField.value : null; 
        
                                console.log("👤 Username:", username);
                                console.log("📝 Full Name:", fullName);
                                console.log("🔑 Password (hashed by SuperTokens):", password);
        
                                // ✅ Store additional user metadata
                                await UserMetadata.updateUserMetadata(id, { username, fullName, email });
        
                                console.log("✅ Metadata stored successfully:", { id, email, username, fullName });
                            }
        
                            return response;
                        },
                    };
                },
            },
        }),        
        ThirdParty.init(),
        Session.init(),
        UserMetadata.init(),
    ],
});

const app = express();
app.use(express.json()); // ✅ Parses incoming JSON requests
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());
app.use(middleware()); // SuperTokens middleware


// Health check endpoint end-point [Rudgino's code]
app.get("/", (req, res) => {
    res.send("🚀 Server is running!");
});

// Fetch user info [Yuzhen's code]
app.get("/user/userinfo", verifySession(), async (req, res) => {
    try {
        const userId = req.session.getUserId();
        const { metadata } = await UserMetadata.getUserMetadata(userId);

        console.log("✅ User Metadata Retrieved:", metadata); // Debugging log

        res.json({
            userId: userId,
            fullName: metadata.fullName || "Unknown User",
            username: metadata.username || "unknown",
            email: metadata.email || "No email found",  // ✅ Now fetching email
        });

    } catch (error) {
        console.error("🚨 Error retrieving user metadata:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//update user information end-point [Yuzhen's code]
app.post("/user/updateUser", verifySession(), async (req, res) => {
    const session = req.session;
    const userId = session.getUserId();
  
    await UserMetadata.updateUserMetadata(userId, { newKey: "data" });
  
    res.json({ message: "successfully updated user metadata" });
  });

//log in user end-point[Asmar's code]
app.post("/auth/signup", async (req, res) => {
    try {
        let { email, password } = req.body;

        let response = await EmailPassword.signUp(email, password);

        if (response.status === "OK") {
            return res.json({
                status: "success",
                message: "Account created successfully!",
                user: response.user
            });
        } else if (response.status === "EMAIL_ALREADY_EXISTS_ERROR") {
            return res.status(400).json({
                status: "error",
                message: "Email is already registered. Try logging in."
            });
        }
    } catch (error) {
        console.error("Sign-Up Error:", error);
        return res.status(500).json({
            status: "error",
            message: "An unexpected error occurred. Please try again later."
        });
    }
});

/*
// Editing profile end-point [Yuzhen's code]
app.post("/api/edit_profile", Session.verifySession(), async (req, res) => {
    const userId = req.session.getUserId();
    const { fullName, username } = req.body;

    await UserMetadata.updateUserMetadata(userId, { fullName, username });

    res.json({ success: true });
});
app.get("/api/files", Session.verifySession(), async (req, res) => {
    const files = await getFilesFromStorage(); // Replace with Fly.io + Tigris integration
    res.json(files);
});

app.post("/api/upload_files", Session.verifySession(), async (req, res) => {
    const { name, data } = req.body;
    await uploadFileToStorage(name, data); // Replace with Fly.io storage
    res.json({ success: true });
});

app.post("/api/delete_file", Session.verifySession(), async (req, res) => {
    const { name } = req.body;
    await deleteFileFromStorage(name); // Replace with Fly.io storage
    res.json({ success: true });
});
*/

// Fetch users from Drizzle ORM [Rudgino's code]
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
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}/auth`));
