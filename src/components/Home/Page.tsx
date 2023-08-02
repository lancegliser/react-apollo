import React from "react";
import logo from "./logo.svg";
import "./Home.css";
import { Helmet } from "react-helmet-async";
import { routeHomeTitle } from "./Router";
import App from "../App/App";
import { getMetaTitle } from "../../utils/meta";

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

          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </main>
      </App>
    </>
  );
};
export default Page;
