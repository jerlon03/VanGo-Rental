import React from 'react';
import Button from '@/components/Button/button';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center gap-4 mt-4 text-blackColor text-[15px]">
      <Button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        name='< Previous'
        width='120px'
      />
      <span>
        <span className='border p-1 px-3 rounded-[5px] border-blackColor font-medium'>{currentPage}</span> of {totalPages} Page
      </span>
      <Button
        name='Next >'
        onClick={handleNext}
        disabled={currentPage === totalPages}
        width='80px'
      />
    </div>
  );
};

export default Pagination;
