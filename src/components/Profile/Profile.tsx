import React, {
  FormEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import { Helmet } from "react-helmet-async";
import { AppRouteHome } from "../../AppRoutes";
import SelfContext from "../../contexts/SelfContext";
import {
  useSaveUserMutation,
  useUserByIdLazyQuery,
} from "../../generated/types";

const Profile: React.FunctionComponent = () => {
  const { self, error: selfError } = useContext(SelfContext);

  // Pull the full user object from getUserById
  const [getUserById, getUserIdByQuery] = useUserByIdLazyQuery();
  // Keep the user query in sync with the self definition
  useEffect(() => {
    if (!self?.id) {
      return;
    }

    getUserById({ variables: { id: self.id } });
  }, [self, getUserById]);

  // Allow 'editing' of the display name
  const [saveUser, saveUserMutation] = useSaveUserMutation();
  const [displayName, setDisplayName] = useState("");
  // Keep the editable display name property in sync with the user definition
  useEffect(() => {
    setDisplayName(getUserIdByQuery.data?.users.getById?.displayName ?? "");
  }, [getUserIdByQuery, setDisplayName]);

  const onSaveUser: FormEventHandler = async (event) => {
    event.preventDefault();

    if (!getUserIdByQuery.data?.users.getById?.id) {
      throw new Error("getUserIdByQuery.data?.users.getById?.id is undefined");
    }

    await saveUser({
      variables: {
        user: {
          displayName,
          id: getUserIdByQuery.data.users.getById.id,
        },
      },
    });

    // Apollo will figure out to update the User with matching ID properties.
    // If it didn't, you could try:
    // await getUserIdByQuery.refetch()
  };

  return (
    <>
      <Helmet>
        <title>{AppRouteHome.title}</title>
      </Helmet>
      <main>
        <h1>Self:</h1>
        <p>You are: {self?.displayName || "Unknown"}</p>
        <code>
          <pre>{JSON.stringify(self, null, 2)}</pre>
        </code>
        {selfError && (
          <p>
            Oh no! Could not load self:
            <br /> {selfError.message}
          </p>
        )}
        <h1>User:</h1>
        <p>User details {getUserIdByQuery.loading && "Loading...."}</p>
        <code>
          <pre>
            {JSON.stringify(getUserIdByQuery.data?.users.getById, null, 2)}
          </pre>
        </code>
        {getUserIdByQuery.error && (
          <p>
            Oh no! Could not load user:
            <br /> {getUserIdByQuery.error.message}
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
                {JSON.stringify(getUserIdByQuery.data?.users.getById, null, 2)}
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
export default Profile;
