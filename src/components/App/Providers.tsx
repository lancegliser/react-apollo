import React from "react";
import "./App.css";
import { Provider as ThemeContextProvider } from "../../contexts/ThemeContext";
import { Provider as SelfContextProvider } from "../../contexts/SelfContext";
import { apolloClient } from "../../services/apollo";
import { ApolloProvider } from "@apollo/client";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";

const Providers: React.FunctionComponent = () => (
  <HelmetProvider>
    <ThemeContextProvider>
      <ApolloProvider client={apolloClient}>
        <SelfContextProvider>
          <App />
        </SelfContextProvider>
      </ApolloProvider>
    </ThemeContextProvider>
  </HelmetProvider>
);
export default Providers;
