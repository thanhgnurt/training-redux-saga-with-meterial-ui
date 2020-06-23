import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import styles from "./styles";
import { Route } from "react-router-dom";
import Dashboard from "./../../../component/Dashboard";
import PropTypes from "prop-types";

class AdminLayoutRoute extends Component {
  render() {

    const { component : YourComponent, ...remainProps } = this.props;

    return (
      <Route
      {...remainProps}
      render={routeProps => {
        return (
          <Dashboard {...remainProps}>
            <YourComponent {...routeProps} />
          </Dashboard>
        );
      }}
    />

    );
  }
}
AdminLayoutRoute.propTypes = {
  component : PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  path : PropTypes.string,
  name : PropTypes.string,
  exact : PropTypes.bool,
};
export default withStyles(styles)(AdminLayoutRoute);
