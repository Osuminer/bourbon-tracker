// PaginationComponent.jsx
import React from 'react';
import { Pagination } from 'react-bootstrap';

const CustomPagination = ({ currentPage, totalPages, handlePageClick, style }) => {
  return (
    <Pagination style={style}>
      <Pagination.First onClick={() => handlePageClick(0)} disabled={currentPage === 0} />
      <Pagination.Prev onClick={() => handlePageClick(1)} disabled={currentPage === 0} />

			<Pagination.Item onClick={() => handlePageClick(0)} active={currentPage === 0}>{1}</Pagination.Item>
			<Pagination.Ellipsis />

      {(currentPage !== 0) && (currentPage !== totalPages - 1) && (
        <Pagination.Item active>{parseInt(currentPage) + 1}</Pagination.Item>
      )}

			<Pagination.Ellipsis />
			<Pagination.Item onClick={() => handlePageClick(3)} active={currentPage === totalPages - 1}>{totalPages}</Pagination.Item>

      <Pagination.Next onClick={() => handlePageClick(2)} disabled={currentPage === totalPages - 1} />
      <Pagination.Last onClick={() => handlePageClick(3)} disabled={currentPage === totalPages - 1} />
    </Pagination>
  );
};

export default CustomPagination;
