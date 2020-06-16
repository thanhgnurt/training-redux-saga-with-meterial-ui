import { Button, withStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./styles";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as modalActions from "./../../actions/modal";

class TaskFrom extends Component {
  render() {
    const { classes, modalActionCreators } = this.props;
    const {hideModal}= modalActionCreators
    return (
      <form>
        <Grid container>
          <Grid item md={12}>
            <TextField
              label="Tittle"
              margin="normal"
              className={classes.textField}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              label="Description"
              multiline
              margin="normal"
              className={classes.textField}
            />
          </Grid>
          <Grid item md={12} className={classes.buttonModal}>
            <Box display="flex" flexDirection="row-reverse" mt={2}>
              <Box ml={1}>
                <Button color="primary" variant="contained">
                  Save
                </Button>
              </Box>
              <Button variant="contained" onClick={hideModal}>
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    );
  }
}

TaskFrom.propTypes = {
  classes: PropTypes.object,
  modalActionCreators : PropTypes.shape({
    hideModal : PropTypes.func
  })
};
const mapDispatchToProps = (dispatch) => ({
  modalActionCreators: bindActionCreators(modalActions, dispatch),
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withStyles(styles), withConnect)(TaskFrom);
