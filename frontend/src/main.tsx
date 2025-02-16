/// <reference types="node" />
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import Session from "supertokens-auth-react/recipe/session";

SuperTokens.init({
  appInfo: {
    appName: "CMS",
    apiDomain: process.env.REACT_APP_API_DOMAIN!,
    websiteDomain: process.env.REACT_APP_WEBSITE_DOMAIN!,
  },
  recipeList: [Session.init()],
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SuperTokensWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SuperTokensWrapper>
  </StrictMode>
);
