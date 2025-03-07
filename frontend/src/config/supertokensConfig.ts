import SuperTokens from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";

SuperTokens.init({
  appInfo: {
    apiDomain: "http://localhost:3001", // Backend API URL
    appName: "Quantum-Coders",
    websiteDomain: "http://localhost:5173", // Frontend URL
  },
  recipeList: [
    EmailPassword.init(), // Email/password authentication
    Session.init(),       // ✅ Ensure session management is initialized
  ],
});


/*

import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import EmailPassword from 'supertokens-web-js/recipe/emailpassword'
SuperTokens.init({
  appInfo: {
    apiDomain: "http://localhost:3001",
    apiBasePath: "/auth",
    appName: "Quantum-Coders",
  },
  recipeList: [
    Session.init(),
    EmailPassword.init(), // Email/password authentication
    EmailPassword.init(),
  ],
});*/