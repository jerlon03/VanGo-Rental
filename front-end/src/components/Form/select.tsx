import React, { useEffect, useRef, useState } from "react";

interface SelectProps {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  value?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  value,
  className,
  disabled,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    toggleDropdown();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className={`border font-Poppins text-[15px] outline-none rounded-[3px] px-2 cursor-pointer flex items-center ${
          disabled ? "bg-gray-500 cursor-not-allowed" : ""
        } ${className}`}
        style={{ height: "40px" }}
      >
        {value || placeholder}
      </div>
      {isOpen && (
        <div
          className="absolute z-10 w-full border bg-white"
          style={{ maxHeight: "150px", overflowY: "auto" }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
