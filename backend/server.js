const express = require("express");
const cors = require("cors");
const SuperTokens = require("supertokens-node");
const { middleware, errorHandler } = require("supertokens-node/framework/express");

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json()); // Ensure JSON body parsing

SuperTokens.init({
    appInfo: {
        appName: "Quantum Coders",
        apiDomain: "http://localhost:3001",
        websiteDomain: "http://localhost:3000",
    },
    supertokens: {
        connectionURI: "https://try.supertokens.com", // Or your local DB
    },
    recipeList: [require("supertokens-node/recipe/emailpassword").init()],
});

app.use(middleware());
app.use(errorHandler());

app.listen(3001, () => console.log("Backend running on port 3001"));
