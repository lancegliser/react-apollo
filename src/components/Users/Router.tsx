import React from "react";
import { generatePath, Outlet, RouteObject } from "react-router-dom";

export const routeUsersTitle = "Users";
export const routeUsersSearch: RouteObject = {
  index: true,
  path: ``,
  async lazy() {
    const { default: Component } = await import("./Page");
    return {
      Component,
    };
  },
};
export type RouteUsersSearchParams = {};
export type RouteUsersSearchQueryParams = {
  page?: number;
};
export const generateUsersSearchPath = (
  params: RouteUsersSearchParams,
  searchParams: RouteUsersSearchQueryParams = {},
): string => {
  const path = generatePath(
    [usersRouter.path, routeUsersSearch.path].join("/"),
  );
  const filteredSearchParams = Object.entries(searchParams).reduce(
    (entries, [key, value]) => {
      switch (typeof value) {
        case "undefined":
          return entries;
        case "boolean":
          entries[key] = !!value ? "1" : "0";
          return entries;
        case "bigint":
        case "number":
          entries[key] = `${value}`;
          return entries;
        case "string":
          entries[key] = value;
          return entries;
        default:
          throw new Error(`Unhandled search query param value: `, value);
      }
    },
    {} as Record<string, string>,
  );
  const urlSearchParams = new URLSearchParams(filteredSearchParams);

  const urlSearchParamsString = urlSearchParams.toString();
  return path + (urlSearchParamsString ? "?" + urlSearchParamsString : "");
};

export const routeUserProfileTitle = "Profile";
export const routeUserProfile: RouteObject = {
  path: `:id`,
  async lazy() {
    const { default: Component } = await import("./Profile");
    return {
      Component,
    };
  },
};
export type RouteUserProfileParams = {
  id: string;
};
export const generateUsersProfilePath = (
  params: RouteUserProfileParams,
): string => {
  return generatePath(
    [usersRouter.path, routeUserProfile.path].join("/"),
    params,
  );
};

// Primary route
export const usersRoutesTitle = "Users";
export const usersRouter: RouteObject = {
  path: `/Users`,
  element: <Outlet />,
  children: [routeUsersSearch],
};
