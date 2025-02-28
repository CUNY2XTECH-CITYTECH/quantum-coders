import SuperTokens from "supertokens-node";
import { middleware, errorHandler } from "supertokens-node/framework/express";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import dotenv from "dotenv";

dotenv.config();

SuperTokens.init({
  framework: "express",
  supertokens: {
    connectionURI: process.env.SUPERTOKENS_CONNECTION_URI || "http://localhost:3567",
    apiKey: process.env.SUPERTOKENS_API_KEY,
  },
  appInfo: {
    appName: "Quantum Coders",
    apiDomain: "http://localhost:4000",
    websiteDomain: "http://localhost:5173",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    EmailPassword.init({
      override: {
        functions: (originalImplementation) => {
          return {
            ...originalImplementation,
            signUp: async function (input) {  
              console.log("🔄 SuperTokens Signup Attempt:", input);
              return await originalImplementation.signUp(input);
            },
          };
        },
      },
    }),
    Session.init(),
  ],
});

export { middleware, errorHandler };
