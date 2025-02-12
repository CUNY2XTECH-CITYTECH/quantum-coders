//import React from "react";

import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";

import { FormSignUp } from "./Form";
SuperTokens.init({
  appInfo: {
    
    appName: "Quantum Coders",
    apiDomain: "", //<YOUR_API_DOMAIN>
    websiteDomain: "", //<YOUR_WEBSITE_DOMAIN>
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [EmailPassword.init(), 
    Session.init()],
});

/* Your App */
export const registerForm = () =>{
    return (
      <SuperTokensWrapper>
        {/*Your app components*/}
        <FormSignUp/>
      </SuperTokensWrapper>
    );
  }