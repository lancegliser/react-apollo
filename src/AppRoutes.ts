import { RouteProps } from "react-router-dom";

export interface AppRoute extends RouteProps {
  title: string;
  // Reduced functionality, but a lot simpler to program
  path: string;
}

export const AppRouteHome: AppRoute = {
  title: `Home`,
  path: `/`,
};

export const AppRouteProfile: AppRoute = {
  title: `Profile`,
  path: `/profile`,
};
