import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import LinksPage from "./pages/LinksPage";
import CreatePage from "./pages/CreatePage";

export const useRoutes = (isAuth) => {
  if (isAuth) {
    return (
      <Switch>
        <Route path="/links" exact>
          <LinksPage />
        </Route>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Redirect to="create" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" component={AuthPage} exact />
      <Redirect to="/" />
    </Switch>
  );
};
