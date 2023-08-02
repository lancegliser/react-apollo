import React from "react";
import { Link } from "react-router-dom";
import "./AppHeader.css";
import { generateHomePath, routeHomeTitle } from "../../../Home/Router";

const AppHeader: React.FunctionComponent = () => {
  return (
    <header className="AppHeader">
      <nav className="AppHeader-nav">
        <Link className="AppHeader-link" to={generateHomePath()}>
          {routeHomeTitle}
        </Link>
      </nav>
    </header>
  );
};
export default AppHeader;
