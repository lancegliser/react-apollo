import React from "react";
import { Helmet } from "react-helmet-async";

const PageLoading: React.FunctionComponent = () => {
  return (
    <>
      <Helmet>
        <title>Sample app - Loading</title>
      </Helmet>
      <div>
        <h1>Loading...</h1>
      </div>
    </>
  );
};
export default PageLoading;
