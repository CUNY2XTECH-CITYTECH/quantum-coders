import React from "react";
import ReactDOM from "react-dom/client";
import { SuperTokensWrapper } from "supertokens-auth-react";
import App from "./App";
import "./config/supertokensConfig"; // Ensure SuperTokens is initialized

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SuperTokensWrapper>
      <App /> {/* Now using RouterProvider inside App */}
    </SuperTokensWrapper>
  </React.StrictMode>
);

