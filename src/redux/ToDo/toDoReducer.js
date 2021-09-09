import { SET_CURRENT_TASK, ADD_TASK, DELETE_TASK } from "./toDoTypes";

const initialState = {
  task: "",
  tasks: []
};

export const setTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_TASK:
      return {
        ...state,
        task: action.payload
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: action.payload,
        task: ""
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: action.payload
      };
    default:
      return state;
  }
};
