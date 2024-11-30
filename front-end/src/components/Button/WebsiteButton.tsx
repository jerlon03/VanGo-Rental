import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  width?: string;
  height?: string;
  variant?: "primary" | "secondary"; // New prop for button variant
  textSize?: string; // New prop for text size
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className,
  width = "200px",
  height,
  variant = "primary", // Default to primary
  textSize = "lg:text-[20px] md:text-[16px]", // Default text size
}) => {
  const baseStyle = `rounded-[5px] ${className} lg:h-[50px] md:h-[40px]  w-[${width}] ${textSize}`;
  const variantStyle =
    variant === "primary"
      ? "bg-websiteBlue text-white"
      : "text-websiteBlue bg-websiteSecondary lg:text-[20px] md:text-[16px]";

  return (
    <button onClick={onClick} className={`${baseStyle} ${variantStyle}`}>
      {label}
    </button>
  );
};

export default Button;
