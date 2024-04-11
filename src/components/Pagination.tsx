import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  // Generate an array of page numbers to display
  const getPageNumbers = () => {
    const totalPagesToShow = Math.min(totalPages, 5); // Show up to 5 page numbers
    const startPage = Math.max(
      1,
      currentPage - Math.floor(totalPagesToShow / 2)
    );
    const endPage = Math.min(totalPages, startPage + totalPagesToShow - 1);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <div className="pagination">
      <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
        Prev
      </button>
      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => setCurrentPage(pageNumber)}
          className={currentPage === pageNumber ? "active" : ""}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
