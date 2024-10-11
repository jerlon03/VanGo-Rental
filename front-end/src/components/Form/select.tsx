import React from 'react';

interface SelectProps {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  defaultValue?: string;
  className?: string; // Allow passing custom className
  disabled?: boolean; // Add disabled prop
}

const Select: React.FC<SelectProps> = ({ options, onChange, defaultValue, className, disabled }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="w-full">
      <select
        defaultValue={defaultValue}
        onChange={handleChange}
        className={`w-full border font-Poppins text-[15px] outline-none rounded-[3px] px-2 md:h-[40px] sm:h-[35px] max-sm:rounded-0 max-sm:text-[14px] placeholder:text-[#CCCCCC] placeholder:font-light text-blackColor ${
          disabled ? 'bg-gray-500 cursor-not-allowed' : ''
        } ${className}`}
        disabled={disabled} // Apply disabled attribute
      >
        <option value="" disabled hidden>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
