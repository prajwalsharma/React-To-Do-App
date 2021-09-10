import React from "react";
import ReactPaginate from "react-paginate";
import styles from "../components/Paginate.module.css";
import { setCurrentPage } from "../redux/Pagination/paginationActions";
import { connect } from "react-redux";

const Paginate = (props) => {
  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      pageCount={props.pageCount}
      onPageChange={props.handlePageClick}
      activeClassName={styles.activeClassName}
      containerClassName={styles.paginationContainer}
      pageClassName={styles.pageClassName}
      nextClassName={styles.nextClassName}
      previousLinkClassName={styles.previousClassName}
    />
  );
};

// Map redux actions with props
const mapDispatchToProps = (dispatch) => {
  return {
    handlePageClick: ({ selected: selectedPage }) =>
      dispatch(setCurrentPage(selectedPage))
  };
};

// connect both redux state & methods with component
export default connect(null, mapDispatchToProps)(Paginate);
