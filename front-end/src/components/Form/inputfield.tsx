import React from "react";

interface Props {
  id?: string; // Add id prop to the interface
  height?: string;
  width?: string;
  type?: "text" | "password" | "number" | "email" | "search";
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  value?: string | number;
  border?: string;
  assetCharacter?: RegExp;
}

const InputField: React.FC<Props> = ({
  id,  // Destructure the id prop
  height,
  width,
  type = "text",
  border,
  onChange,
  placeholder,
  value,
  assetCharacter,
  ...rest
}) => {
  return (
    <input
      id={id}  // Assign the id prop to the input element
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      style={{ width, height, border }}
      className="border font-Poppins text-[15px] w-full h-[40px] outline-none rounded-[3px] px-2 max-sm:h-[35px] max-sm:rounded-0 max-sm:text-[14px]"
      {...rest}
    />
  );
};

export default InputField;
