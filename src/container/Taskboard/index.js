import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TaskForm from "../TaskForm";
import { STATUSES } from "../../constants";
import * as taskActions from "./../../actions/task";
import * as modalActions from "./../../actions/modal";
import TaskList from "./../../component/TaskList";
import styles from "./styles";
import PropTypes from "prop-types";
import SearchBox from "./SearchBox";

class Taskboard extends Component {
  state = {
    open: false,
  };

  componentDidMount() {
    const { taskActionCreators } = this.props;
    const { fetchListTask } = taskActionCreators;
    fetchListTask();
  }

  loadData = () => {
    const { taskActionCreators } = this.props;
    const { fetchListTask } = taskActionCreators;
    fetchListTask();
  };

  renderBoard() {
    const { listTask } = this.props;
    let xhtml = null;
    xhtml = (
      <Grid container spacing={2}>
        {STATUSES.map((status, index) => {
          const listTaskFilter = listTask.filter(
            (task) => task.status === status.value
          );
          return (
            <TaskList
              key={status.value}
              tasks={listTaskFilter}
              status={status}
            />
          );
        })}
      </Grid>
    );
    return xhtml;
  }

  handleFilter = (event) => {
    const { value } = event.target;
    const { taskActionCreators } = this.props;
    const { filterTask } = taskActionCreators;
    filterTask(value);
  };

  renderSearchBox = () => {
    let xhtml = null;
    xhtml = <SearchBox handleChange={this.handleFilter} />;
    return xhtml;
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  openForm = () => {
    const { modalActionCreators } = this.props;
    const {
      showModal,
      changeModalContent,
      changeModalTittle,
    } = modalActionCreators;
    showModal();
    changeModalTittle("Add New Job");
    changeModalContent(<TaskForm/>);
  };

  renderForm() {
    let { open } = this.state;
    let xhtml = null;
    xhtml = <TaskForm open={open} onClose={this.handleClose} />;

    return xhtml;
  }

  render() {
    let { classes } = this.props;
    return (
      <div className={classes.taskboard}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.loadData}
        >
          Load Data
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.openForm}
        >
          <AddIcon /> Add Task
        </Button>
        {this.renderSearchBox()}

        {this.renderBoard()}
        {/* {this.renderForm()} */}
      </div>
    );
  }
}
Taskboard.propTypes = {
  classes: PropTypes.object,
  taskActionCreators: PropTypes.shape({
    fetchListTask: PropTypes.func,
  }),
  listTask: PropTypes.array,
  filterTask: PropTypes.func,
  modalActionCreators: PropTypes.shape({
    showModal: PropTypes.func,
    hideModal: PropTypes.func,
    changeModalTittle: PropTypes.func,
    changeModalContent: PropTypes.func,
  }),
};

const mapStateToProps = (state) => {
  return {
    listTask: state.task.listTask,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    taskActionCreators: bindActionCreators(taskActions, dispatch),
    modalActionCreators: bindActionCreators(modalActions, dispatch),
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Taskboard)
);
