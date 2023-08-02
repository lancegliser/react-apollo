import React, { FunctionComponent } from "react";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import { apolloClient } from "./services/apollo";
import { ThemeContextProvider } from "./contexts/ThemeContext";

type AppProvidersProps = {
  children?: React.ReactNode;
};
const AppProviders: FunctionComponent<AppProvidersProps> = ({ children }) => (
  <HelmetProvider>
    <ThemeContextProvider>
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </ThemeContextProvider>
  </HelmetProvider>
);
export default AppProviders;
