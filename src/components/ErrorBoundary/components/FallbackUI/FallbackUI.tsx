import React, { ErrorInfo } from "react";
import "./FallbackUI.css";

export interface IFallbackUIProps {
  error: Error;
  errorInfo: ErrorInfo;
}
const FallbackUI: React.FunctionComponent<IFallbackUIProps> = (props) => {
  return (
    <section className="fallbackUI">
      <h2>Something went wrong.</h2>
      <details style={{ whiteSpace: "pre-wrap" }}>
        {props.error.toString()}
        <br />
        {props.errorInfo.componentStack}
      </details>
    </section>
  );
};
export default FallbackUI;
