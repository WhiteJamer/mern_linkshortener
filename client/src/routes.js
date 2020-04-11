import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import LinksPage from "./pages/LinksPage";
import DetailPage from "./pages/DetailPage";
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
        <Route path="/links/:id" exact>
          <DetailPage />
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
