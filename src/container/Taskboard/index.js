import React, { Component } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core";

class Taskboard extends Component {
  render() {
    let { classes } = this.props;
    return (
      <div className="App">
        <div className={classes.taskboard}>
          <div className={classes.shape}> ReactJS </div>
          <div className={classes.shape}> Agular JS </div>
          <div className={classes.shape}> Vue JS </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Taskboard);
