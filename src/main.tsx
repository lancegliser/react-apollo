import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppProviders from "./AppProviders";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { routes } from "./AppRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppProviders>
        <Outlet />
      </AppProviders>
    ),
    children: routes,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
