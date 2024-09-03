import React from "react";

interface Props {
  name: string;
  onClick?: () => void;
  width?: string;
  height?: string;
  backgroundColor?: string;
  disabled?: boolean;
  className?: string; // Add className to Props
  type?: 'button' | 'submit' | 'reset'; // Add type prop here
}

const Button: React.FC<Props> = ({
  name,
  onClick,
  width,
  height,
  backgroundColor,
  disabled,
  className = '', // Default to an empty string if not provided
  type = 'button', // Default to 'button' if not provided
}) => {
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

  // Define classes for disabled state
  const buttonClass = `font-Poppins text-white text-[16px] p-1 w-full rounded-[3px] tracking-[2px] ${bgColorClass} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-white hover:bg-opacity-75'} transition duration-300 ${className}`;

  return (
    <button
      className={buttonClass}
      style={{ width, height }}
      onClick={disabled ? undefined : onClick} // Prevent onClick when disabled
      disabled={disabled}
      type={type} 
    >
      {name}
    </button>
  );
};

export default Button;
