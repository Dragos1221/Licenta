import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import MainPage from "./MainPage";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "./pages/Logpage2"

export default function () {
  return (
    <Router>
      <Switch>
        <Route exact path="/main">
          <PrivateRoute component={MainPage}></PrivateRoute>
        </Route>
        <Route exact path="/">
          <LoginPage></LoginPage>
        </Route>
        <Route render={() => <Redirect to={{ pathname: "/" }} />} />
      </Switch>
    </Router>
  );
}
