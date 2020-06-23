import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
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
  handleEditTask = (task) => {
    const { taskActionCreators, modalActionCreators } = this.props;
    const { setTaskEditting } = taskActionCreators;
    setTaskEditting(task);
    const {
      showModal,
      changeModalContent,
      changeModalTittle,
    } = modalActionCreators;
    showModal();
    changeModalTittle("Edit Task");
    changeModalContent(<TaskForm />);
  };

  handleDeleteTask = (task) => {
    const { id } = task;
    const { taskActionCreators} = this.props;
    const {deleteTask} = taskActionCreators;
    deleteTask(id)
  };

  showModalDeleteTask = (task) => {
    const { modalActionCreators, classes } = this.props;
    const {
      showModal,
      hideModal,
      changeModalContent,
      changeModalTittle,
    } = modalActionCreators;
    showModal();
    changeModalTittle("Delete Task");
    changeModalContent(
      <div className={classes.modalDelete}>
        <div className={classes.modalComfirmText}>
          Do you delete this task :
          <span className={classes.modalConfirmTextBold}> {task.tittle} ?</span>
          <Box display="flex" flexDirection="row-reverse" mt={2}>
            <Box ml={1}>
              <Button variant="contained" onClick={hideModal}>
                Cancel
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.handleDeleteTask(task)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </div>
      </div>
    );
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
              onClickEdit={this.handleEditTask}
              onClickDelete={this.showModalDeleteTask}
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
    const { taskActionCreators, modalActionCreators } = this.props;
    const { setTaskEditting } = taskActionCreators;
    const {
      showModal,
      changeModalContent,
      changeModalTittle,
    } = modalActionCreators;
    setTaskEditting(null);
    showModal();
    changeModalTittle("Add New Job");
    changeModalContent(<TaskForm />);
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
  handleDeleteTask: PropTypes.func,
  handelEditTask: PropTypes.func,
  showModalDeleteTask: PropTypes.func,
  deleteTask : PropTypes.func
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
