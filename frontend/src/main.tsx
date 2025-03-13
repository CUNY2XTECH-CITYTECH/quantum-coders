import React from "react";
import ReactDOM from "react-dom/client";
import { SuperTokensWrapper } from "supertokens-auth-react";
import App from "./App";
import "./config/supertokensConfig"; 

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SuperTokensWrapper>
      <App /> 
    </SuperTokensWrapper>
  </React.StrictMode>
);

