import React, { ReactNode, useState } from "react";

export interface IThemeContext {
  isColorSchemeLight: boolean;
  toggleColorScheme(): IThemeContext;
}

export const themeDefaults: IThemeContext = {
  isColorSchemeLight: true,
  toggleColorScheme: () => themeDefaults,
};

const ThemeContext = React.createContext<IThemeContext>(themeDefaults);
ThemeContext.displayName = "ThemeContext";
export default ThemeContext;

export interface ProviderProps {
  children: ReactNode;
}
export const ThemeContextProvider: React.FunctionComponent<ProviderProps> = (
  props,
) => {
  const [state, setState] = useState(themeDefaults);
  const context: IThemeContext = {
    ...state,

    toggleColorScheme: (): IThemeContext => {
      setState({ ...state, isColorSchemeLight: !context.isColorSchemeLight });
      return context;
    },
  };

  return (
    <ThemeContext.Provider value={context}>
      {props.children}
    </ThemeContext.Provider>
  );
};
