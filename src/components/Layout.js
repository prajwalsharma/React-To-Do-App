import React, { Component } from "react";
import styles from "../components/Layout.module.css";
import { TextField, Button, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ReactPaginate from "react-paginate";
import {
  addTaskImplementation,
  deleteTaskImplementation,
  setCurrentTask
} from "../redux/ToDo/toDoActions";
import { setCurrentPage } from "../redux/Pagination/paginationActions";
import { connect } from "react-redux";

class Layout extends Component {
  render() {
    const { task, tasks, currentPage } = this.props;
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
                  onClick={() =>
                    this.props.deleteTaskClickHandler(task.id, tasks)
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
                  onClick={() =>
                    this.props.deleteTaskClickHandler(task.id, tasks)
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
            onChange={(event) =>
              this.props.taskInputChangeHandler(event.target.value)
            }
            value={task}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.props.addTaskClickHandler(task, tasks)}
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
              onPageChange={this.props.handlePageClick}
              activeClassName={styles.activeClassName}
              containerClassName={styles.paginationContainer}
              pageClassName={styles.pageClassName}
              nextClassName={styles.nextClassName}
              previousLinkClassName={styles.previousClassName}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    task: state.todo.task,
    tasks: state.todo.tasks,
    currentPage: state.pagination.currentPage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTaskClickHandler: (task, tasks) =>
      dispatch(addTaskImplementation(task, tasks)),
    deleteTaskClickHandler: (taskId, tasks) =>
      dispatch(deleteTaskImplementation(taskId, tasks)),
    taskInputChangeHandler: (task) => dispatch(setCurrentTask(task)),
    handlePageClick: ({ selected: selectedPage }) =>
      dispatch(setCurrentPage(selectedPage))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
