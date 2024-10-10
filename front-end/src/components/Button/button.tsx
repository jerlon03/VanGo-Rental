import React from "react";
import { IconType } from "react-icons";

interface Props {
  name: string;
  onClick?: () => void;
  width?: string;
  height?: string;
  backgroundColor?: string;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  border?: string;
  icon?: IconType; // Optional icon
  iconPosition?: 'left' | 'right'; // Icon position
  iconSize?: string; // Optional icon size
  iconColor?: string; // Optional icon color
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
  border = 'border-none',
  icon: Icon,
  iconPosition = 'left',
  iconSize = '20px', // Default icon size
  iconColor = 'white', // Default icon color
}) => {
  let bgColorClass = '';

  if (backgroundColor === 'success') {
    bgColorClass = 'bg-[#2ECC71]';
  } else if (backgroundColor === 'error') {
    bgColorClass = 'bg-[#FF0000]';
  } else if (backgroundColor === 'pending') {
    bgColorClass = 'bg-[#FFD700]';
  } else if (backgroundColor === 'alert'){
    bgColorClass = 'bg-[#003459]';
  }else {
    bgColorClass = 'bg-[#00A8E8]';
  }

  const buttonClass = `flex justify-center items-center font-Poppins text-white text-[16px] p-1 w-full rounded-[3px] tracking-[2px rounded-[3px] ${bgColorClass} ${border} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-white hover:bg-opacity-75'} transition duration-300 ${className}`;
  
  return (
    <button
      className={buttonClass}
      style={{ width, height }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      type={type}
    >
      {iconPosition === 'left' && Icon && (
        <Icon className="mr-2" size={iconSize} color={iconColor} />
      )}
      {name}
      {iconPosition === 'right' && Icon && (
        <Icon className="ml-2" size={iconSize} color={iconColor} />
      )}
    </button>
  );
};

export default Button;
