const express = require("express");
const { signUp } = require("supertokens-node/recipe/emailpassword");
const { middleware } = require("supertokens-node/framework/express");
const db = require("../db"); // Your database connection

const router = express.Router();

router.post("/auth/signup", async (req, res) => {
    const { email, password, username, fullName } = req.body;

    try {
        // Check if username already exists
        const existingUser = await db.getUserByUsername(username); 
        if (existingUser) {
            return res.status(400).json({ message: "Username is already taken" });
        }

        // Register user in SuperTokens
        let response = await signUp({
            email,
            password
        });

        if (response.status === "OK") {
            // Store username and fullName in your database
            await db.saveUser({ id: response.user.id, username, fullName, email });

            res.status(200).json({ message: "User registered successfully" });
        } else {
            res.status(400).json({ message: "Sign-up failed" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;