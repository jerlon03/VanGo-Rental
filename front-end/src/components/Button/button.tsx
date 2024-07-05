import React from "react";

interface Props {
  name: string;
  onClick?: () => void;
  width?: string;
  backgroundColor?: string;
}

const Button = ({ name, onClick, width, backgroundColor }: Props) => {
  // Determine the Tailwind CSS background color class dynamically
  let bgColorClass = '';

  if (backgroundColor === 'success') {
    bgColorClass = 'bg-[#2ECC71]';
  } else if (backgroundColor === 'error') {
    bgColorClass = 'bg-[#FF5733]';
  } else if (backgroundColor === 'pending') {
    bgColorClass = 'bg-[#FFD700]';
  } else {
    bgColorClass = 'bg-[#00A8E8]'; // Default background color class
  }

  return (
    <button
      className={`font-Poppins text-white text-[16px] p-1 w-full rounded-[3px] ${bgColorClass} hover:text-white hover:bg-opacity-75 transition duration-300`}
      style={{ width }}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
