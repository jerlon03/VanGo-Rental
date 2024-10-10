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
  readOnly?: boolean; // Add readOnly prop to the interface
  onClick?: React.MouseEventHandler<HTMLInputElement>; // Add onClick prop to the interface
  icon?: React.ReactNode; // Add icon prop to the interface
}

const InputField: React.FC<Props> = ({
  id,
  height,
  width,
  type = "text",
  border,
  onChange,
  placeholder,
  value,
  assetCharacter,
  readOnly = false,
  onClick,
  icon, // Destructure icon prop
  ...rest
}) => {
  return (
    <div style={{ position: "relative", width }}>
      {icon && (
        <span
          style={{
            position: "absolute",
            left: "10px", // Adjust left position
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none", // Prevent icon from capturing clicks
          }}
        >
          {icon}
        </span>
      )}
      <input
        id={id}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        onClick={onClick}
        style={{
          width,
          height,
          border,
          paddingLeft: icon ? "40px" : "10px", // Adjust padding for icon
        }}
        className=" w-full border font-Poppins text-[15px] outline-none rounded-[3px] px-2 md:h-[40px] sm:h-[35px] max-sm:rounded-0 max-sm:text-[14px] placeholder:text-[#CCCCCC] placeholder:font-light text-blackColor"
        {...rest}
      />
    </div>
  );
};

export default InputField;
