import React from "react";
import "./App.css";
import { Helmet } from "react-helmet-async";
import AppRouter from "./components/AppRouter/AppRouter";
import { ErrorBoundary } from "../ErrorBoundary/ErrorBoundary";

export const App: React.FunctionComponent = () => (
  <>
    <Helmet>
      <title>Sample app</title>
    </Helmet>
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  </>
);
export default App;
