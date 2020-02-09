import React from "react";
import { Route, Switch } from "react-router-dom";
import MusicPage from "./components/pages/musicPage";

export default () => {
  return (
    <Switch>
      <Route path="/page/:id" component={MusicPage} />
      <Route path="/" component={MusicPage} />
    </Switch>
  );
};
