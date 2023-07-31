import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageLoading from "../../../PageLoading/PageLoading";
import { AppRouteHome, AppRouteProfile } from "../../../../AppRoutes";
import Page from "../../../Home/Page";
import AppHeader from "../AppHeader/AppHeader";

const Profile = React.lazy(() => import("../../../Users/Page"));

const AppRouter: React.FunctionComponent = () => (
  <Router>
    <AppHeader />
    <Suspense fallback={<PageLoading />}>
      <Switch>
        <Route path={AppRouteHome.path} exact>
          <Page />
        </Route>
        <Route path={AppRouteProfile.path} exact>
          <Profile />
        </Route>
      </Switch>
    </Suspense>
  </Router>
);
export default AppRouter;
