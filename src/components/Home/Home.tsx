import React from "react";
import logo from "./logo.svg";
import "./Home.css";
import { Helmet } from "react-helmet-async";
import { AppRouteHome } from "../../AppRoutes";

const Home: React.FunctionComponent = () => {
  return (
    <>
      <Helmet>
        <title>Sample app - {AppRouteHome.title}</title>
      </Helmet>
      <header className="App-header">
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
      </header>
    </>
  );
};
export default Home;
