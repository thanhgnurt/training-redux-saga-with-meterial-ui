import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import styles from "./styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";

class TaskItem extends Component {
  // onClickEdit = ()=>{
  //   this.props.setTaskEditting()
  // }
  // onClickDelete=()=>{
  //   this.props.
  // }
  render() {
    let { classes, task, status, onClickDelete, onClickEdit } = this.props;
    let { tittle, description } = task;
    return (
      <Card key={task.id} className={classes.card}>
        <CardContent>
          <Grid container justify="space-between">
            <Grid item md={8}>
              <Typography component="h2">{tittle}</Typography>
            </Grid>
            <Grid item md={4}>
              <Typography component="h2">{status.label}</Typography>
            </Grid>
            <p>{description}</p>
          </Grid>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Fab
            color="primary"
            size="small"
            aria-label="edit"
            onClick={onClickEdit}
          >
            <EditIcon fontSize="small" />
          </Fab>
          <Fab
            color="secondary"
            size="small"
            aria-label="delete"
            onClick={onClickDelete}
          >
            <DeleteIcon fontSize="small" />
          </Fab>
        </CardActions>
      </Card>
    );
  }
}
TaskItem.propTypes = {
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
  classes: PropTypes.object,
  task: PropTypes.object,
  status: PropTypes.object,
};

export default withStyles(styles)(TaskItem);
