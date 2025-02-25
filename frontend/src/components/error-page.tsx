import { useRouteError } from "react-router-dom";

import './general.css'
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <h1 className="error-page" >Oops!</h1>
      <br></br>
      <p className="error-page">Sorry, an unexpected error has occurred.</p>
      <p className="error-page">Go back!</p>
    </div>
  );
}