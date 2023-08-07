import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { generateUsersProfilePath, routeUsersTitle } from "./Router";
import { useUsersSearchQuery } from "../../generated/types";
import { getMetaTitle } from "../../utils/meta";
import { Link } from "react-router-dom";

const limit = 2;
const offsetDefault = 0;
const Page: React.FunctionComponent = () => {
  const [offset, setOffset] = useState(offsetDefault);
  // The obvious solution, just change the args and get new data! ❌
  // useEffect(() => {
  //   searchUsers({ variables: { offset, limit } });
  // }, [searchUsers, offset]);
  // const [searchUsers, usersSearchQuery] = useUsersSearchLazyQuery();

  // The suggested solution: .fetchMore() ✅
  // https://www.apollographql.com/docs/react/pagination/core-api/
  const usersSearchQuery = useUsersSearchQuery({
    notifyOnNetworkStatusChange: true, // Yes please!
    // Do not include any variable that will change, you will get a new query
    variables: { limit, offset: offsetDefault },
  });
  useEffect(() => {
    // Determine if it's in cache
    const cachedItemsLength =
      usersSearchQuery.data?.users.search.items.length ?? 0;
    if (limit + offset <= cachedItemsLength) {
      return;
    }

    console.info(`${limit} + ${offset} <= ${cachedItemsLength} .fetchMore!`);
    usersSearchQuery.fetchMore({
      variables: {
        offset: offset,
        // limit // Hasn't changed, no need to provide
      },
    });
    // ☣️Our fetchMore function is here, but we're not finished! ☣️
    // The cache doesn't know yet that it should merge our followup query's result with the original
    // query's result. Instead, it will store the two results as two completely separate lists.
    // See src/services/apollo
  }, [usersSearchQuery.data?.users.search.items.length, offset]);

  const total = usersSearchQuery.data?.users.search.total || 0;
  const pages = Math.floor(total / limit);
  const items = useMemo(
    () =>
      usersSearchQuery.data?.users.search.items.slice(offset, offset + limit) ??
      [],
    [usersSearchQuery.data, offset],
  );

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
        ) : (items.length || 0) > 0 ? (
          items.map((user) => (
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
