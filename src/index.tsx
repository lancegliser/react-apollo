import React from "react";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./AppRoutes";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
