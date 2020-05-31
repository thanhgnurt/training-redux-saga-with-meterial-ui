import React, { Component } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import { STATUSES } from "../../constants";
import TaskList from "./../../component/TaskList";
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import * as taskActions from './../../actions/task'
import TaskForm from "../../component/TaskForm";


class Taskboard extends Component {
  state={
    open : false
  }

  componentDidMount(){
    const {taskActionCreators} = this.props;
    const {fetchListTaskRequest} = taskActionCreators;
    fetchListTaskRequest();
  }

  renderBoard() {
    const {listTask}= this.props
    let xhtml = null;
    xhtml = (
      <Grid container spacing={2}>
        {STATUSES.map((status, index) => {
          const listTaskFilter = listTask.filter(
            (task) => task.status === status.value
          );
          return <TaskList key={status.value} tasks={listTaskFilter} status={status} />
        })}
      </Grid>
    );
    return xhtml;
  };

  handleClose = ()=>{
    this.setState({
      open: false
    })
  }

  openForm = () =>{
    this.setState({
      open: true
    })
  }

  renderForm () {
    let {open} = this.state;
    let xhtml = null;
    xhtml = <TaskForm open={open} onClose={this.handleClose} />

    return xhtml;
  }

  render() {
    let { classes } = this.props;
    return (
      <div className={classes.taskboard}>
        <Button variant="contained" color="primary" className={classes.button} onClick={this.openForm} >
          <AddIcon /> Add Task
        </Button>
        {this.renderBoard()}
        {this.renderForm()}
      </div>
    );
  }
}
const mapStateToProps = state =>{
  return{
    listTask : state.task.listTask

  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    taskActionCreators: bindActionCreators(taskActions, dispatch),
  }
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Taskboard),
);
