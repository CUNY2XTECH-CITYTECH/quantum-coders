import SuperTokens, { /*SuperTokensWrapper*/ } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";

SuperTokens.init({
  appInfo: {
    appName: "Quantum Coders",
    apiDomain: "http://localhost:3001",
    websiteDomain: "http://localhost:5173",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    EmailPassword.init({
      signInAndUpFeature: {
        signUpForm: {
          formFields: [
            {
                id: "fullname",
                label: "fullname",
                placeholder: "Write your full name",
                validate: async (value) => {
                  if (value.length < 1) {
                    return "Username must be at least 1 character";
                  }
                  return undefined;
                },
              },
            {
              id: "email",
              label: "Email",
              placeholder: "Enter your email",
            },
            {
              id: "password",
              label: "Password",
              placeholder: "Enter your password",
            },
            {
              id: "username",
              label: "Username",
              placeholder: "Write an username",
              validate: async (value) => {
                if (value.length < 5) {
                  return "Username must be at least 5 characters";
                }
                return undefined;
              },
            },
          ],
        },
      },
    }),
    Session.init(),
  ],
});