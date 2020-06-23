import { Button, withStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./styles";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as modalActions from "./../../actions/modal";
import { Field, reduxForm } from "redux-form";
import renderTextField from "../../component/FormHelper/TextField";
import validate from "./validate";
import * as taskActions from "./../../actions/task";
import renderSelectField from "../../component/FormHelper/Select";

class TaskFrom extends Component {
  handleSubmitForm = (data) => {
    const { tittle, description, status } = data;
    const { taskActionCreators, taskEditting } = this.props;
    const { addTask, updateTask } = taskActionCreators;
    if (taskEditting && taskEditting.id) {
      updateTask(tittle, description, status);
    } else {
      addTask(tittle, description);
    }
  };
  renderStatusSelection() {
    let { taskEditting, classes } = this.props;
    let xhtml = null;
    if (taskEditting && taskEditting.id) {
      xhtml = (
        <Field
          id="status"
          label="Status"
          className={classes.select}
          name="status"
          component={renderSelectField}
        >
          <MenuItem value={0}>Ready</MenuItem>
          <MenuItem value={1}>Inprogess</MenuItem>
          <MenuItem value={2}>Complete</MenuItem>
        </Field>
      );
    }
    return xhtml;
  }

  render() {
    const {
      classes,
      modalActionCreators,
      handleSubmit,
      invalid,
      submitting,
    } = this.props;
    const { hideModal } = modalActionCreators;
    return (
      <form onSubmit={handleSubmit(this.handleSubmitForm)}>
        <Grid container>
          <Grid item md={12}>
            <Field
              id="tittle"
              label="Tittle"
              className={classes.textField}
              margin="normal"
              name="tittle"
              component={renderTextField}
            />
          </Grid>
          <Grid item md={12}>
            <Field
              id="description"
              label="Description"
              name="description"
              margin="normal"
              rowmax="4"
              multiline
              className={classes.textField}
              component={renderTextField}
            />
          </Grid>
          {this.renderStatusSelection()}
          <Grid item md={12} className={classes.buttonModal}>
            <Box display="flex" flexDirection="row-reverse" mt={2}>
              <Button variant="contained" onClick={hideModal}>
                Cancel
              </Button>
              <Box mr={1}>
                <Button
                  disabled={invalid || submitting}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </form>
    );
  }
}

TaskFrom.propTypes = {
  classes: PropTypes.object,
  modalActionCreators: PropTypes.shape({
    hideModal: PropTypes.func,
  }),
  handleSubmit: PropTypes.func,
  tastActionCreators: PropTypes.shape({
    addTask: PropTypes.func,
    updateTask: PropTypes.func,
  }),
  taskEditting: PropTypes.object,
};

const mapStateToProps = (state) => ({
  taskEditting: state.task.taskEditting,
  initialValues: {
    tittle: state.task.taskEditting ? state.task.taskEditting.tittle : null,
    description: state.task.taskEditting
      ? state.task.taskEditting.description
      : null,
    status: state.task.taskEditting ? state.task.taskEditting.status : null,
  },
});

const mapDispatchToProps = (dispatch) => ({
  modalActionCreators: bindActionCreators(modalActions, dispatch),
  taskActionCreators: bindActionCreators(taskActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const FORM_NAME = "TASK_MANAGEMANT";
const withReduxForm = reduxForm({
  form: FORM_NAME,
  validate,
});

export default compose(
  withStyles(styles),
  withConnect,
  withReduxForm
)(TaskFrom);
