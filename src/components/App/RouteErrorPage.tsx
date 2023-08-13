import React, { FunctionComponent } from "react";
import { generateHomePath, routeHomeTitle } from "../Home/Router";
import { Link } from "react-router-dom";

const RouteErrorPage: FunctionComponent = () => {
  // const error = useRouteError();
  // console.error(error);

  return (
    <div>
      <h1>Page not found</h1>
      <p>
        Return to <Link to={generateHomePath()}>{routeHomeTitle}</Link>
      </p>
    </div>
  );
};
export default RouteErrorPage;
