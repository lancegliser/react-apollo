import React, { ReactNode } from "react";
import { SelfQuery, SelfQueryResult, useSelfQuery } from "../generated/types";

export interface ISelfContext {
  self: SelfQuery["self"];
  isLoading: SelfQueryResult["loading"];
  error: SelfQueryResult["error"];
}

export const SelfDefaults: ISelfContext = {
  self: {
    displayName: "Guest",
    id: "",
  },
  isLoading: false,
  error: undefined,
};

const SelfContext = React.createContext<ISelfContext>(SelfDefaults);
SelfContext.displayName = "SelfContext";
export default SelfContext;

export interface ProviderProps {
  children: ReactNode;
}
export const Provider: React.FunctionComponent<ProviderProps> = (props) => {
  const selfQuery = useSelfQuery();

  return (
    <SelfContext.Provider
      value={{
        error: selfQuery.error,
        isLoading: selfQuery.loading,
        self: selfQuery.data?.self,
      }}
    >
      {props.children}
    </SelfContext.Provider>
  );
};
