import React from 'react';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  // Generate page numbers to show
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      {/* Previous Button */}
      <button
        className={`page-btn prev ${currentPage === 1 ? 'disabled' : ''}`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous Page"
      >
        &laquo;
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`page-btn num-btn ${currentPage === number ? 'active' : ''}`}
          onClick={() => onPageChange(number)}
          aria-label={`Page ${number}`}
        >
          {number}
        </button>
      ))}

      {/* Next Button */}
      <button
        className={`page-btn next ${currentPage === totalPages ? 'disabled' : ''}`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next Page"
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
