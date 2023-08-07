import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { generateUsersProfilePath, routeUsersTitle } from "./Router";
import { useUsersSearchLazyQuery } from "../../generated/types";
import { getMetaTitle } from "../../utils/meta";
import { Link } from "react-router-dom";

const limit = 2;
const Page: React.FunctionComponent = () => {
  const [searchUsers, usersSearchQuery] = useUsersSearchLazyQuery();
  const [offset, setOffset] = useState(0);

  // Keep the user query in sync with the self definition
  useEffect(() => {
    searchUsers({ variables: { offset, limit } });
  }, [searchUsers, offset]);

  const total = usersSearchQuery.data?.users.search.total || 0;
  const pages = Math.floor(total / limit);

  return (
    <>
      <Helmet>
        <title>{getMetaTitle([routeUsersTitle])}</title>
      </Helmet>
      <main>
        <h1>Users</h1>
        {usersSearchQuery.error && <p>{usersSearchQuery.error?.message}</p>}
        {usersSearchQuery.loading ? (
          <p>"Loading...."</p>
        ) : (usersSearchQuery.data?.users.search.items.length || 0) > 0 ? (
          usersSearchQuery.data?.users.search.items.map((user) => (
            <p key={user.id}>
              <Link to={generateUsersProfilePath({ id: user.id })}>
                {user.displayName}
              </Link>
            </p>
          ))
        ) : (
          <p>No users</p>
        )}
        <section>
          <p>
            {offset}-{offset + limit} of {total}
            <br />
            {new Array(pages).fill(0).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setOffset(index * limit);
                }}
              >
                {index + 1}
              </button>
            ))}
          </p>
          <p></p>
        </section>
      </main>
    </>
  );
};
export default Page;
