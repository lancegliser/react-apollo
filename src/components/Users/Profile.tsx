import React, { FormEventHandler, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSaveUserMutation, useUserByIdQuery } from "../../generated/types";
import { useParams } from "react-router-dom";
import { RouteUserProfileParams, routeUserProfileTitle } from "./Router";
import { getMetaTitle } from "../../utils/meta";

const Page: React.FunctionComponent = () => {
  const params = useParams<RouteUserProfileParams>();
  // Pull the full user object from getUserByLazyQuery 🤷🏻
  // This *is* the type safe solution, but useParams is being a little bitch and adding Partial<>...
  // we don't have to listen to it, because we wrote the router.
  // const [getUserById, userQuery] = useUserByIdLazyQuery();
  // useEffect(() => {
  //   if (!params.id) {
  //     return;
  //   }
  //
  //   getUserById({ variables: { id: params.id } });
  // }, [params, getUserById]);

  const userQuery = useUserByIdQuery({ variables: { id: params.id! } });

  // Allow 'editing' of the display name
  const [saveUser, saveUserMutation] = useSaveUserMutation();
  const [displayName, setDisplayName] = useState("");
  // Keep the editable display name property in sync with the user definition
  useEffect(() => {
    setDisplayName(userQuery.data?.users.getById?.displayName ?? "");
  }, [userQuery, setDisplayName]);

  const onSaveUser: FormEventHandler = async (event) => {
    event.preventDefault();

    if (!userQuery.data?.users.getById?.id) {
      throw new Error("userQuery.data?.users.getById?.id is undefined");
    }

    await saveUser({
      variables: {
        user: {
          displayName,
          id: userQuery.data.users.getById.id,
        },
      },
    });

    // Apollo will figure out to update the User with matching ID properties.
    // If it didn't, you could try:
    // await userQuery.refetch()
  };
  const user = userQuery.data?.users.getById;

  return (
    <>
      <Helmet>
        <title>
          {getMetaTitle([user?.displayName, routeUserProfileTitle])}
        </title>
      </Helmet>
      <main>
        <h1>{userQuery.loading ? "Loading..." : user?.displayName}</h1>
        <code>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </code>
        {userQuery.error && (
          <p>
            Oh no! Could not load user:
            <br /> {userQuery.error?.message}
          </p>
        )}

        <h1>Save user</h1>
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
                {JSON.stringify(userQuery.data?.users.getById, null, 2)}
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
      </main>
    </>
  );
};
export default Page;
