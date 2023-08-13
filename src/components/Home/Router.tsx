import { generatePath, RouteObject } from "react-router-dom";
import Page from "./Page";
import React from "react";

export const routeHomeTitle = "Home";
export const routeHome: RouteObject = {
  index: true,
  path: ``,
  element: <Page />,
};
export const generateHomePath = () => generatePath(routeHome.path!);
