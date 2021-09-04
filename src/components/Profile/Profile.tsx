import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { AppRouteHome } from "../../AppRoutes";
import SelfContext from "../../contexts/SelfContext";

const Profile: React.FunctionComponent = () => {
  const { self, error } = useContext(SelfContext);

  return (
    <>
      <Helmet>
        <title>{AppRouteHome.title}</title>
      </Helmet>
      <main>
        <p>You are: {self?.displayName || "Unknown"}</p>
        {error && (
          <p>
            Oh no! Could not load self:
            <br /> {error.message}
          </p>
        )}
      </main>
    </>
  );
};
export default Profile;
