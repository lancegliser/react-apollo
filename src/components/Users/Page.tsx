import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { routeUsersTitle } from "./Router";
import { useUsersSearchLazyQuery } from "../../generated/types";
import { getMetaTitle } from "../../utils/meta";

const limit = 2;
const Page: React.FunctionComponent = () => {
  const [searchUsers, usersSearchQuery] = useUsersSearchLazyQuery();
  const [offset, setOffset] = useState();

  // Keep the user query in sync with the self definition
  useEffect(() => {
    searchUsers({ variables: { offset, limit } });
  }, [searchUsers, offset]);

  return (
    <>
      <Helmet>
        <title>{getMetaTitle([routeUsersTitle])}</title>
      </Helmet>
      <main>
        <h1>Users</h1>
        {usersSearchQuery.error && <p>{usersSearchQuery.error?.message}</p>}
        {usersSearchQuery.loading && <p>"Loading...."</p>}
        <code>
          <pre>
            {JSON.stringify(usersSearchQuery.data?.users.search, null, 2)}
          </pre>
        </code>
      </main>
    </>
  );
};
export default Page;
