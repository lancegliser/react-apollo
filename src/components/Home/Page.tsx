import React from "react";
import logo from "./logo.svg";
import "./Home.css";
import { Helmet } from "react-helmet-async";
import { routeHomeTitle } from "./Router";
import App from "../App/App";
import { getMetaTitle } from "../../utils/meta";
import { generateUsersSearchPath } from "../Users/Router";
import { Link } from "react-router-dom";

const Page: React.FunctionComponent = () => {
  return (
    <>
      <Helmet>
        <title>{getMetaTitle([routeHomeTitle])}</title>
      </Helmet>
      <App>
        <main className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>

          <Link className="App-link" to={usersPath}>
            Learn React and Apollo client
          </Link>
        </main>
      </App>
    </>
  );
};
export default Page;

const usersPath = generateUsersSearchPath();
