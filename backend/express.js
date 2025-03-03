//Endpoint for Account (sign up/register)
const express = require("express");
const supertokens = require("supertokens-node");
const { middleware, errorHandler } = require("supertokens-node/framework/express");
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const Session = require("supertokens-node/recipe/session");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

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
                    signUpPOST: async (input) => {
                        if (originalImplementation.signUpPOST === undefined) {
                            throw new Error("Sign-up API not available");
                        }

                        let response = await originalImplementation.signUpPOST(input);

                        if (response.status === "OK") {
                            return {
                                status: "success",
                                message: "Account created successfully!",
                                user: response.user
                            };
                        } else if (response.status === "EMAIL_ALREADY_EXISTS_ERROR") {
                            return {
                                status: "error",
                                message: "Email is already in use. Try logging in."
                            };
                        } else {
                            return {
                                status: "error",
                                message: "Something went wrong. Please try again later."
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
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(middleware());

// Sign-up Route
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

app.use(errorHandler());

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/auth`));
