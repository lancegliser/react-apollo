import React, { FunctionComponent, ReactNode, useContext } from "react";
import "./AppTheme.css";
import ThemeContext from "../contexts/ThemeContext";

type AppThemeProps = {
  children: ReactNode;
};
const AppTheme: FunctionComponent<AppThemeProps> = (props) => {
  const themeContext = useContext(ThemeContext);

  const classes = ["AppTheme"];
  classes.push(
    themeContext.isColorSchemeLight
      ? "AppTheme--colorSchemeLight"
      : "AppTheme--colorSchemeDark",
  );

  return (
    <>
      <div className={classes.join(" ")}>{props.children}</div>
    </>
  );
};
export default AppTheme;
