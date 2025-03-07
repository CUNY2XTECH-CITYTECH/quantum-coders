/*import SuperTokens from "supertokens-node";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session";

SuperTokens.init({
    appInfo: {
        apiDomain: "http://localhost:3001",   
        appName: "Quantum-Coders",
        websiteDomain: "http://localhost:5173" 
    },
    
    //supertokens: {
    //    connectionURI: //SUPERTOKEN
    
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
});*/
import SuperTokens from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";

SuperTokens.init({
  appInfo: {
    apiDomain: "http://localhost:3001",
    appName: "Quantum-Coders",
    websiteDomain: "http://localhost:5173",
  },
  recipeList: [
    EmailPassword.init(),
    Session.init(),
  ],
});
