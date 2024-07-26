// components/Drop.tsx
'use client'


import React, { useState } from 'react';
import { MdArrowDropDown, MdArrowDropUp} from '@/components/icons/index';

interface Props {

  onClick?: () => void;
  width?: string;
  children?: React.ReactNode;
}

const Drop: React.FC<Props> = ({  onClick, width, children }) => {
  // State to track whether dropdown is open or closed
  const [open, setOpen] = useState(false);

  // Toggle dropdown function
  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <div className={`relative inline-block font-Poppins`} style={{ width }}>
      {/* Dropdown toggle button with conditional icon */}
      <button onClick={toggleDropdown}>
     {open ? <MdArrowDropUp size={20} className='text-button '/> : <MdArrowDropDown size={20}  className='text-button'/>}
      </button>

      {/* Dropdown content */}
      {open && (
        <div className="origin-top-right absolute right-0 mt-2  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 text-[16px]">
          <div className="p-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu" >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Drop;
