import React from "react";
import { usersRouter } from "./components/Users/Router";
import { createBrowserRouter, Outlet } from "react-router-dom";
import AppProviders from "./AppProviders";
import App from "./components/App/App";
import { routeHome } from "./components/Home/Router";
import RouteErrorPage from "./components/App/RouteErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppProviders>
        <App>
          <Outlet />
        </App>
      </AppProviders>
    ),
    errorElement: <RouteErrorPage />,
    children: [routeHome, usersRouter],
  },
]);
