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
  height = "50px",
  variant = "primary", // Default to primary
  textSize = "text-[20px]", // Default text size
}) => {
  const baseStyle = `rounded-[5px] ${className} h-[${height}] w-[${width}] ${textSize}`;
  const variantStyle =
    variant === "primary"
      ? "bg-websiteBlue text-white"
      : "border border-yellow text-yellow";

  return (
    <button onClick={onClick} className={`${baseStyle} ${variantStyle}`}>
      {label}
    </button>
  );
};

export default Button;
