// components/Pagination.tsx
import React from 'react';
import Button from '@/components/Button/button';
import {GrFormPrevious} from '@/components/icons/index'

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
        <div>
            <Button onClick={handlePrevious} disabled={currentPage === 1} name='<Previous' className={`${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' :  'text-white'}`} width='120px'></Button>
        </div>
   
      <span className="">
        Page {currentPage} of {totalPages}
      </span>
      <Button name='Next>' onClick={handleNext} disabled={currentPage === totalPages}  className={`${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'text-white '}`} width='80px'></Button>
    </div>
  );
};

export default Pagination;
