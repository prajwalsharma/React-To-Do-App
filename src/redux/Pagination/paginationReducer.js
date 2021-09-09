import { SET_CURRENT_PAGE } from "./paginationTypes";

const initialState = {
  currentPage: 0
};

export const paginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
    default:
      return state;
  }
};
