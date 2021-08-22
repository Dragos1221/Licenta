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
import LoginPage from "./pages/Logpage2";
import MovieList from "./pages/MovieList";
import MoviePage from "./pages/MoviePage";
import RegisterPage from "./pages/RegisterPage";

export default function () {
  return (
    <Router>
      <Switch>
        <Route exact path="/main">
          <PrivateRoute component={MainPage}></PrivateRoute>
        </Route>
        <Route exact path="/movie">
          <PrivateRoute component={MoviePage}></PrivateRoute>
        </Route>
        <Route exact path="/myList">
          <PrivateRoute component={MovieList}></PrivateRoute>
        </Route>
        <Route exact path="/">
          <LoginPage></LoginPage>
        </Route>
        <Route exact path="/register">
          <RegisterPage></RegisterPage>
        </Route>
        <Route render={() => <Redirect to={{ pathname: "/" }} />} />
      </Switch>
    </Router>
  );
}
