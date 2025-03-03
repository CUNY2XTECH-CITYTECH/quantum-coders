import SuperTokens from "supertokens-node";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session";

SuperTokens.init({
    appInfo: {
        apiDomain: "http://localhost:3001",   
        appName: "Quantum-Coders",
        websiteDomain: "http://localhost:5173" 
    },
    /*
    supertokens: {
        connectionURI: //SUPERTOKEN
    },*/
    recipeList: [
        EmailPassword.init({
            signUpFeature: {
                formFields: [
                    { id: "email" },
                    { id: "password" },
                    { id: "username" },
                    { id: "fullName" },
                ]
            }
        }),
        Session.init()
    ]
});
