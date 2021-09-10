import React, { Component } from "react";
import styles from "../components/Layout.module.css";
import { connect } from "react-redux";
import Paginate from "./Paginate";
import Task from "./Task";
import TaskInput from "./TaskInput";

class Layout extends Component {
  render() {
    const { tasks, currentPage } = this.props;
    const PER_PAGE = 3;
    const offset = currentPage * PER_PAGE;
    const currentPageData =
      tasks.length <= PER_PAGE
        ? tasks.map((task) => {
            return <Task key={task.id} task={task} />;
          })
        : tasks.slice(offset, offset + PER_PAGE).map((task) => {
            return <Task key={task.id} task={task} />;
          });
    const pageCount = Math.ceil(tasks.length / PER_PAGE);
    return (
      <div className={styles.flexContainer}>
        <h1>React To-Do App</h1>
        <TaskInput />
        <div className={styles.taskListContainer}>{currentPageData}</div>
        <div>
          {tasks.length > PER_PAGE && <Paginate pageCount={pageCount} />}
        </div>
      </div>
    );
  }
}

// Map redux state with props
const mapStateToProps = (state) => {
  return {
    tasks: state.todo.tasks,
    currentPage: state.pagination.currentPage
  };
};

// connect both redux state & methods with component
export default connect(mapStateToProps, null)(Layout);
