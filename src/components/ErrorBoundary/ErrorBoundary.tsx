import React, { ErrorInfo } from "react";
import FallbackUI from "./components/FallbackUI/FallbackUI";

export interface IErrorBoundaryProps {}

interface IState {
  error?: Error;
  errorInfo?: ErrorInfo;
}
export class ErrorBoundary extends React.Component {
  state: IState = {
    error: undefined,
    errorInfo: undefined,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.error && this.state.errorInfo) {
      return (
        <FallbackUI error={this.state.error} errorInfo={this.state.errorInfo} />
      );
    }

    return this.props.children;
  }
}
