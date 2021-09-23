import React from "react";
import { Redirect, Route } from "react-router";

const GuardRoute = ({ component, path, ...rest }) => {
  if (localStorage.getItem("loggedIn")) {
    return <Redirect to="/" />;
  } else {
    return <Route path="/login" component={component} {...rest} />;
  }
};

export default GuardRoute;
