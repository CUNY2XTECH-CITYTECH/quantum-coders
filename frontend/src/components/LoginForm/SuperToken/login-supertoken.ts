import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import EmailPassword from 'supertokens-web-js/recipe/emailpassword'

SuperTokens.init({
    appInfo: {
        apiDomain: "<YOUR_API_DOMAIN>",
        apiBasePath: "/auth",
        appName: "...",
    },
    recipeList: [
        Session.init(),
        EmailPassword.init(),
    ],
});