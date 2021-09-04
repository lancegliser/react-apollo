import React from "react";
import { Link } from "react-router-dom";
import { AppRouteHome, AppRouteProfile } from "../../../../AppRoutes";
import "./AppHeader.css";

const AppHeader: React.FunctionComponent = () => {
  return (
    <header className="AppHeader">
      <nav className="AppHeader-nav">
        <Link className="AppHeader-link" to={AppRouteHome.path}>
          {AppRouteHome.title}
        </Link>
        <Link className="AppHeader-link" to={AppRouteProfile.path}>
          {AppRouteProfile.title}
        </Link>
      </nav>
    </header>
  );
};
export default AppHeader;
