import React from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute = ({ component, path, ...rest }) => {

  if (localStorage.getItem("loggedIn")) {
    return <Route component={component} path={path} {...rest} />;
  } else {
    return <Redirect to="/login" {...rest} />;
  }
};

export default PrivateRoute;
