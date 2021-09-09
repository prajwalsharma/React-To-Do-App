import React, { Component } from "react";
import styles from "../components/Layout.module.css";
import { TextField, Button, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ReactPaginate from "react-paginate";

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: "",
      tasks: [],
      currentPage: 0
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

  handlePageClick = ({ selected: selectedPage }) => {
    this.setState({
      currentPage: selectedPage
    });
  };

  render() {
    const { task, tasks, currentPage } = this.state;
    const PER_PAGE = 3;
    const offset = currentPage * PER_PAGE;
    const currentPageData =
      tasks.length <= PER_PAGE
        ? tasks.map((task) => {
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
          })
        : tasks.slice(offset, offset + PER_PAGE).map((task) => {
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
          });
    const pageCount = Math.ceil(tasks.length / PER_PAGE);
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
        <div className={styles.taskListContainer}>{currentPageData}</div>
        <div>
          {tasks.length > PER_PAGE && (
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={pageCount}
              onPageChange={this.handlePageClick}
              activeClassName={styles.activeClassName}
              containerClassName={styles.paginationContainer}
              pageClassName={styles.pageClassName}
              nextClassName={styles.nextClassName}
              previousClassName={styles.previousClassName}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Layout;
