import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import styles from "./styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TaskItem from "./../TaskItem";
import PropTypes from 'prop-types';

class TaskList extends Component {

  render() {
    let { classes, tasks, status, onClickDelete, onClickEdit } = this.props;
    return (
      <Grid key={status.value} item md={4} xs={12}>
        <Box mt={2} mb={2}>
          <div className={classes.status}>{status.label}</div>
        </Box>
        <div className={classes.wrapperListTask}>
          {tasks.map((task) => {
            return (
              <TaskItem
                key={task.id}
                task={task}
                status={status}
                onClickEdit={() => onClickEdit(task)}
                onClickDelete={()=>onClickDelete(task)}
              />
            );
          })}
        </div>
      </Grid>
    );
  }
}
TaskList.propTypes = {
  onClickDelete: PropTypes.func,
  onClickEdit: PropTypes.func,
  classes : PropTypes.object,
  tasks : PropTypes.array,
  status : PropTypes.object,
}

export default withStyles(styles)(TaskList);
