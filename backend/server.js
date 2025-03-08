/*const express = require("express");
const cors = require("cors");
const SuperTokens = require("supertokens-node");
const { middleware, errorHandler } = require("supertokens-node/framework/express");
const { verifySession } = require('supertokens-node/recipe/session/framework/express');
const { SessionRequest } = require('supertokens-node/framework/express');
const supertokens  = require('supertokens-node');

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


//import express from "express";

//
//let app = express();
app.get("/get-user-info", verifySession(), async (req, res) => {
    let userId = req.session.getUserId();
    
    let userInfo = await supertokens.getUser(userId)
    res.json(userInfo);
    /**
     * 
     * userInfo contains the following info:
     * - emails
     * - id
     * - timeJoined
     * - tenantIds
     * - phone numbers
     * - third party login info
     * - all the login methods associated with this user.
     * - information about if the user's email is verified or not.
     * 
    */
   /*
})



app.use(middleware());
app.use(errorHandler());

app.listen(3001, () => console.log("Backend running on port 3001"));
*/