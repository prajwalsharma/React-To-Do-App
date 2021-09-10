import React from "react";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "../components/Task.module.css";
import { deleteTaskImplementation } from "../redux/ToDo/toDoActions";
import { connect } from "react-redux";

const Task = (props) => {
  return (
    <div className={styles.taskItem}>
      <p>{props.task.name}</p>
      <IconButton
        color="secondary"
        onClick={() => props.deleteTaskClickHandler(props.task.id, props.tasks)}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

// Map redux state with props
const mapStateToProps = (state) => {
  return {
    tasks: state.todo.tasks
  };
};

// Map redux actions with props
const mapDispatchToProps = (dispatch) => {
  return {
    deleteTaskClickHandler: (taskId, tasks) =>
      dispatch(deleteTaskImplementation(taskId, tasks))
  };
};

// connect both redux state & methods with component
export default connect(mapStateToProps, mapDispatchToProps)(Task);
