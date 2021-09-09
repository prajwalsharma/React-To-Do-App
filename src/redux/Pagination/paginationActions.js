import { SET_CURRENT_PAGE } from "./paginationTypes";

export const setCurrentPage = (currentPage) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: currentPage
  };
};
