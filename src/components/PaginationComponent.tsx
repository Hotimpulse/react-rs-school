import React from 'react';
interface IPaginationProps {
  currentPage: number;
  currentLimit: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<IPaginationProps> = ({
  currentPage,
  onPageChange,
}) => {
  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
  };

  return (
    <div>
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Prev
      </button>

      <span>Page {currentPage}</span>

      <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
    </div>
  );
};

export default PaginationComponent;
