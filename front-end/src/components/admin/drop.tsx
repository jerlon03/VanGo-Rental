// components/Drop.tsx
'use client'

import React, { useState, useRef, useEffect } from 'react';
import { MdArrowDropDown, MdArrowDropUp } from '@/components/icons/index';

interface Props {
  onClick?: () => void;
  width?: string;
  children?: React.ReactNode;
}

const Drop: React.FC<Props> = ({ onClick, width, children }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown function
  const toggleDropdown = () => {
    setOpen(!open);
  };

  // Handle click outside the dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  // Set up and clean up the event listener
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative inline-block font-Poppins`} style={{ width }} ref={dropdownRef}>
      {/* Dropdown toggle button with conditional icon */}
      <button onClick={toggleDropdown} style={{ zIndex: 10 }}>
        {open ? <MdArrowDropUp size={20} className='text-button' /> : <MdArrowDropDown size={20} className='text-button' />}
      </button>

      {/* Dropdown content */}
      {open && (
        <div className="absolute z-20 origin-top-right right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 text-[16px]">
          <div className="p-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Drop;
