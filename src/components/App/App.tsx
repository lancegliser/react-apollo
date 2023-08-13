import { FunctionComponent, ReactNode } from "react";
import { useNavigation } from "react-router-dom";
import { ErrorBoundary } from "../ErrorBoundary/ErrorBoundary";
import PageLoading from "../PageLoading/PageLoading";

type AppProps = {
  children: ReactNode;
};
const App: FunctionComponent<AppProps> = ({ children }) => {
  const navigation = useNavigation();

  return (
    <>
      <ErrorBoundary>
        {navigation.state === "loading" ? <PageLoading /> : children}
      </ErrorBoundary>
    </>
  );
};

export default App;
