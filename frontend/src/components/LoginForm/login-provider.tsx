// import React from "react";

// import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
// import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
// import Session from "supertokens-auth-react/recipe/session";

// SuperTokens.init({
//   appInfo: {
//     // learn more about this on https://supertokens.com/docs/references/app-info
//     appName: "Quantum Coders",
//     apiDomain: "<YOUR_API_DOMAIN>",
//     websiteDomain: "<YOUR_WEBSITE_DOMAIN>",
//     apiBasePath: "/auth",
//     websiteBasePath: "/auth",
//   },
//   recipeList: [EmailPassword.init(), Session.init()],
// });

// /* Your App */
// class App extends React.Component {
//   render() {
//     return (
//       <SuperTokensWrapper>
//         {/*Your app components*/}
//       </SuperTokensWrapper>
//     );
//   }
// }