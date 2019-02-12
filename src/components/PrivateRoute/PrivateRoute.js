import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

// This component is to be used when we want to load a component only when the authentication object is present or the user will be redirected to the home page.

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object
};

PrivateRoute.defaultProps = {
  auth: {
    isAuthenticated: false
  }
};

export default PrivateRoute;
