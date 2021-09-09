import { applyMiddleware, combineReducers, createStore } from "redux";
import { setTaskReducer } from "./ToDo/toDoReducer";
import { paginationReducer } from "./Pagination/paginationReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  todo: setTaskReducer,
  pagination: paginationReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
