import React, { ReactNode } from "react";
import "./App.css";
import { useNavigation } from "react-router-dom";
import { ErrorBoundary } from "../ErrorBoundary/ErrorBoundary";
import PageLoading from "../PageLoading/PageLoading";

type AppProps = {
  children: ReactNode;
};
const App: React.FunctionComponent<AppProps> = ({ children }) => {
  const navigation = useNavigation();

  return (
    <>
      <ErrorBoundary>
        {navigation.state === "loading" ? <PageLoading /> : children}
      </ErrorBoundary>
    </>
  );
};

export default App;
