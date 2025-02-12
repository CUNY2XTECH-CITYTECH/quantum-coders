const express = require("express");
const supertokens = require("supertokens-node");
const bodyParser = require("body-parser");
const { middleware, errorHandler } = require("supertokens-node/framework/express");
const Session = require("supertokens-node/recipe/session");
const { verifySession } = require("supertokens-node/recipe/session/framework/express");
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Supertokens
supertokens.init({
    framework: "express",
    supertokens: {
        connectionURI: "https://try.supertokens.io",
        apiKey: process.env.SUPERTOKENS_API_KEY
    },
    appInfo: {
        appName: "Quantum Coders",
        apiDomain: "http://localhost:3001",
        websiteDomain: "http://localhost:5173",
    },
    recipeList: [
        EmailPassword.init({
            override: {
                apis: (originalImplementation) => ({
                    ...originalImplementation,
                    signInPOST: async (input) => {
                        if (originalImplementation.signInPOST === undefined) {
                            throw new Error("Sign-in API not available");
                        }

                        let response = await originalImplementation.signInPOST(input);

                        if (response.status === "OK") {
                            // Customize response if login is successful
                            return {
                                status: "success",
                                message: "You have successfully logged in!",
                                user: response.user
                            };
                        } else {
                            // Customize response for failed login
                            return {
                                status: "error",
                                message: "Invalid email or password. Try again."
                            };
                        }
                    }
                })
            }
        }),
        Session.init(),       
    ],
});

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(middleware());

app.get("/protected", verifySession(), async (req, res) => {
    res.json({ message: "You are authenticated!", userId: req.session.getUserId() });
});

app.use(errorHandler());

// Start the server
app.listen(3001, () => console.log("Server running on http://localhost:3001/auth"));
