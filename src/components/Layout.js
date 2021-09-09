import React, { Component } from "react";
import styles from "../components/Layout.module.css";
import { TextField, Button, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: "",
      tasks: []
    };
  }

  // Save current task in state
  taskInputChangeHandler = (event) => {
    this.setState(
      {
        task: event.target.value
      },
      () => console.log(this.state.task)
    );
  };

  // Add task to list on button click
  addTaskClickHandler = (event) => {
    let currentTask = this.state.task;
    if (currentTask.length === 0) {
      alert("Task is empty!");
      return;
    }
    let date = new Date();
    let taskId = date.getTime();
    let newTask = {
      id: taskId,
      name: currentTask
    };
    let previousTasks = this.state.tasks;
    let newTasks = previousTasks.slice();
    newTasks.push(newTask);
    this.setState({
      tasks: newTasks,
      task: ""
    });
  };

  deleteTaskClickHandler = (event, taskId) => {
    console.log(taskId);
    let prevTasks = this.state.tasks;
    let newTasks = prevTasks.filter((task) => task.id !== taskId);
    this.setState({
      tasks: newTasks
    });
  };

  render() {
    const { task, tasks } = this.state;
    return (
      <div className={styles.flexContainer}>
        <h1>React To-Do App</h1>
        <div className={styles.taskInputContainer}>
          <TextField
            id="outlined-basic"
            label="Enter task name..."
            variant="outlined"
            onChange={(event) => this.taskInputChangeHandler(event)}
            value={task}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => this.addTaskClickHandler(event)}
          >
            Add
          </Button>
        </div>
        <div className={styles.taskListContainer}>
          {tasks.map((task) => {
            return (
              <div key={task.id} className={styles.taskItem}>
                <p>{task.name}</p>
                <IconButton
                  color="secondary"
                  onClick={(event) =>
                    this.deleteTaskClickHandler(event, task.id)
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Layout;
