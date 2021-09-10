import React from "react";
import { TextField, Button } from "@material-ui/core";
import styles from "../components/TaskInput.module.css";
import { connect } from "react-redux";
import {
  addTaskImplementation,
  setCurrentTask
} from "../redux/ToDo/toDoActions";

const TaskInput = (props) => {
  return (
    <div className={styles.taskInputContainer}>
      <TextField
        id="outlined-basic"
        label="Enter task name..."
        variant="outlined"
        onChange={(event) => props.taskInputChangeHandler(event.target.value)}
        value={props.task}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.addTaskClickHandler(props.task, props.tasks)}
      >
        Add
      </Button>
    </div>
  );
};

// Map redux state with props
const mapStateToProps = (state) => {
  return {
    task: state.todo.task,
    tasks: state.todo.tasks
  };
};

// Map redux actions with props
const mapDispatchToProps = (dispatch) => {
  return {
    addTaskClickHandler: (task, tasks) =>
      dispatch(addTaskImplementation(task, tasks)),
    taskInputChangeHandler: (task) => dispatch(setCurrentTask(task))
  };
};

// connect both redux state & methods with component
export default connect(mapStateToProps, mapDispatchToProps)(TaskInput);
