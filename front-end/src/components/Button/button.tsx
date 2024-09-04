import React from "react";

interface Props {
  name: string;
  onClick?: () => void;
  width?: string;
  height?: string;
  backgroundColor?: string;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  border?: string; // Add border to Props
}

const Button: React.FC<Props> = ({
  name,
  onClick,
  width,
  height,
  backgroundColor,
  disabled,
  className = '',
  type = 'button',
  border = 'border-none', // Default to no border if not provided
}) => {
  let bgColorClass = '';

  if (backgroundColor === 'success') {
    bgColorClass = 'bg-[#2ECC71]';
  } else if (backgroundColor === 'error') {
    bgColorClass = 'bg-[#FF5733]';
  } else if (backgroundColor === 'pending') {
    bgColorClass = 'bg-[#FFD700]';
  } else {
    bgColorClass = 'bg-[#00A8E8]';
  }

  const buttonClass = `font-Poppins text-white text-[16px] p-1 w-full rounded-[3px] tracking-[2px] ${bgColorClass} ${border} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-white hover:bg-opacity-75'} transition duration-300 ${className}`;

  return (
    <button
      className={buttonClass}
      style={{ width, height }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      type={type}
    >
      {name}
    </button>
  );
};

export default Button;