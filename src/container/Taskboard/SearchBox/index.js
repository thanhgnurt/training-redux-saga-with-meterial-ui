import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import styles from "./styles";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

class SearchBox extends Component {
  render() {
    const { classes, handleChange } = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          className={classes.textField}
          margin="normal"
          onChange={handleChange}
          autoComplete="off"
          label="Input text"
        />
      </form>
    );
  }
}

SearchBox.propTypes = {
  classes: PropTypes.object,
  handleChange: PropTypes.func,
};

export default withStyles(styles)(SearchBox);
