import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { routeUsersTitle } from "./Router";
import { useUsersSearchLazyQuery } from "../../generated/types";

const Page: React.FunctionComponent = () => {
  // Pull the full user object from getUserById
  const [searchUsers, usersSearchQuery] = useUsersSearchLazyQuery();
  // Keep the user query in sync with the self definition
  useEffect(() => {
    // getUserById({ variables: { id: self.id } });
  }, [searchUsers]);

  return (
    <>
      <Helmet>
        <title>{routeUsersTitle}</title>
      </Helmet>
      <main>
        <h1>Users</h1>
        {usersSearchQuery.error && <p>{usersSearchQuery.error?.message}</p>}
        <h1>User:</h1>
        <p>Users {usersSearchQuery.loading && "Loading...."}</p>
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
