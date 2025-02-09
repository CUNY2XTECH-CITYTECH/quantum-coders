// import React from 'react';
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Link
// } from "react-router-dom";

// import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
// import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
// import { EmailPasswordPreBuiltUI } from 'supertokens-auth-react/recipe/emailpassword/prebuiltui';
// import * as reactRouterDom from "react-router-dom";

// class App extends React.Component {
//     render() {
//         return (
//             <SuperTokensWrapper>
//                 <BrowserRouter>
//                     <Routes>
//                         {/*This renders the login UI on the /auth route*/}
//                         {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [EmailPasswordPreBuiltUI])}
//                         {/*Your app routes*/}
//                     </Routes>
//                 </BrowserRouter>
//             </SuperTokensWrapper>
//         );
//     }
// }