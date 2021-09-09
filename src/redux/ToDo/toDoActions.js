import { SET_CURRENT_TASK, ADD_TASK, DELETE_TASK } from "./toDoTypes";

export const setCurrentTask = (task) => {
  return {
    type: SET_CURRENT_TASK,
    payload: task
  };
};

export const addTask = (task) => {
  return {
    type: ADD_TASK,
    payload: task
  };
};

export const deleteTask = (taskId) => {
  return {
    type: DELETE_TASK,
    payload: taskId
  };
};

export const addTaskImplementation = (task, previousTasks) => {
  return (dispatch) => {
    console.log(task, previousTasks);
    let currentTask = task;
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
    console.log(previousTasks);
    let newTasks = previousTasks.slice();
    newTasks.push(newTask);
    dispatch(addTask(newTasks));
  };
};

export const deleteTaskImplementation = (taskId, prevTasks) => {
  return (dispatch) => {
    let newTasks = prevTasks.filter((task) => task.id !== taskId);
    dispatch(deleteTask(newTasks));
  };
};
