import React, { FormEventHandler, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { generateUsersProfilePath, routeUsersTitle } from "./Router";
import {
  useSaveUserMutation,
  useUsersSearchQuery,
} from "../../generated/types";
import { getMetaTitle } from "../../utils/meta";
import { Link } from "react-router-dom";

const limit = 2;
const offsetDefault = 0;
const Page: React.FunctionComponent = () => {
  // Listing functionality
  const [offset, setOffset] = useState(offsetDefault);

  // The obvious solution, just change the args and get new data! ❌
  // useEffect(() => {
  //   searchUsers({ variables: { offset, limit } });
  // }, [searchUsers, offset]);
  // const [searchUsers, usersSearchQuery] = useUsersSearchLazyQuery();

  // // The suggested solution: .fetchMore() ☣️ via merge return
  // If used, be sure to comment *out* the read query function!
  // // https://www.apollographql.com/docs/react/pagination/core-api/
  // const usersSearchQuery = useUsersSearchQuery({
  //   notifyOnNetworkStatusChange: true, // Yes please!
  //   // Do not include any variable that will change, you will get a new query
  //   variables: { limit, offset: offsetDefault },
  // });
  // useEffect(() => {
  //   // Determine if it's in cache
  //   const cachedItemsLength =
  //     usersSearchQuery.data?.users.search.items.length ?? 0;
  //   if (limit + offset <= cachedItemsLength) {
  //     return;
  //   }
  //
  //   console.info(`${limit} + ${offset} <= ${cachedItemsLength} .fetchMore!`);
  //   usersSearchQuery.fetchMore({
  //     variables: {
  //       offset: offset,
  //       // limit // Hasn't changed, no need to provide
  //     },
  //   });
  //   // ☣️Our fetchMore function is here, but we're not finished! ☣️
  //   // The cache doesn't know yet that it should merge our followup query's result with the original
  //   // query's result. Instead, it will store the two results as two completely separate lists.
  //   // See src/services/apollo
  // }, [usersSearchQuery.data?.users.search.items.length, offset]);
  //
  // const total = usersSearchQuery.data?.users.search.total || 0;
  // const pages = Math.floor(total / limit);
  // const items = useMemo(
  //   () =>
  //     usersSearchQuery.data?.users.search.items.slice(offset, offset + limit) ??
  //     [],
  //   [usersSearchQuery.data, offset],
  // );
  // const items = useMemo(
  //     () =>
  //         usersSearchQuery.data?.users.search.items.slice(offset, offset + limit) ??
  //         [],
  //     [usersSearchQuery.data, offset],
  // );

  // The suggested solution: .fetchMore() ✅ via merge + read return
  // https://www.apollographql.com/docs/react/pagination/core-api/
  const usersSearchQuery = useUsersSearchQuery({
    notifyOnNetworkStatusChange: true, // Yes please!
    variables: { limit, offset },
  });
  // ☣️Our query relies on both merge, and read functions, we're not finished! ☣️
  // The cache doesn't know yet that it should merge our followup query's result with the original
  // query's result. Instead, it will store the two results as two completely separate lists.
  // See src/services/apollo
  // ☣️Apollo tools Dev inspector will not show 'all' cached data for the query, it'll be replaced! ☣️
  const items = useMemo(
    () => usersSearchQuery.data?.users.search.items ?? [],
    [usersSearchQuery.data],
  );

  // Shared functionality
  const total = usersSearchQuery.data?.users.search.total || 0;
  const pages = Math.floor(total / limit);

  // Add functionality
  const [saveUser, saveUserMutation] = useSaveUserMutation();
  const [displayName, setDisplayName] = useState("");

  const onSaveUser: FormEventHandler = async (event) => {
    event.preventDefault();
    const newId = new Date().getTime().toString();

    await saveUser({
      variables: {
        user: {
          displayName,
          id: newId,
        },
      },
    });

    // Apollo will figure out to update the User with matching ID properties.
    // If it didn't, you could try:
    // await userQuery.refetch()
  };

  return (
    <>
      <Helmet>
        <title>{getMetaTitle([routeUsersTitle])}</title>
      </Helmet>
      <main>
        <section>
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
            <button
              onClick={() => {
                setOffset(0);
                usersSearchQuery.refetch();
              }}
            >
              Reset
            </button>
          </p>
        </section>

        <section>
          <h1>New user</h1>
          <form onSubmit={onSaveUser}>
            <label>
              <p>Display name:</p>
              <input
                placeholder={"Display name"}
                required
                value={displayName}
                onChange={(event) => {
                  setDisplayName(event.target.value);
                }}
              />
            </label>
            <input
              type={"submit"}
              value={saveUserMutation.loading ? "Saving" : "Save"}
              disabled={saveUserMutation.loading}
            />
          </form>
          {saveUserMutation.data && (
            <>
              <p>Updated data:</p>
              <code>
                <pre>
                  {JSON.stringify(
                    saveUserMutation.data.users.saveUser,
                    null,
                    2,
                  )}
                </pre>
              </code>
            </>
          )}
          {saveUserMutation.error && (
            <p>
              Oh no! Could not save user:
              <br /> {saveUserMutation.error.message}
            </p>
          )}
        </section>
      </main>
    </>
  );
};
export default Page;
