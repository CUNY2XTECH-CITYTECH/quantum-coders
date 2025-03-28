import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import EmailPassword from 'supertokens-web-js/recipe/emailpassword'

SuperTokens.init({
    appInfo: {
        apiDomain: "http://localhost:3001",
        apiBasePath: "/auth",
        appName: "Quantum Coders",
    },
    recipeList: [
        Session.init(),
        EmailPassword.init(),
    ],
});