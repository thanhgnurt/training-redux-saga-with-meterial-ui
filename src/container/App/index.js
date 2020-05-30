import React, { Component } from "react";
// import Button from "@material-ui/core/Button";
import styles from "./styles";
import { withStyles } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import Taskboard from "./../Taskboard";

class App extends Component {
  render() {
    return (
      <ThemeProvider>
       <Taskboard/>
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
