import React from "react";

interface Props {
  id?: string; // Add id prop to the interface
  height?: string;
  width?: string;
  type?:
    | "text"
    | "password"
    | "number"
    | "email"
    | "search"
    | "date"
    | "time"
    | "tel";
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>; // Add onKeyPress prop to the interface
  placeholder?: string;
  value?: string | null | undefined; // Allow value to be null or undefined
  border?: string;
  assetCharacter?: RegExp;
  readOnly?: boolean; // Add readOnly prop to the interface
  onClick?: React.MouseEventHandler<HTMLInputElement>; // Add onClick prop to the interface
  icon?: React.ReactNode; // Add icon prop to the interface
  className?: string; // Add className prop to the interface
  required?: boolean; // Add required prop to the interface
  maxLength?: number;
  name?: string;
  inputMode?:
    | "search"
    | "numeric"
    | "email"
    | "tel"
    | "text"
    | "url"
    | "none"
    | "decimal"; // Updated inputMode prop
  disabled?: boolean; // Add disabled prop to the interface
}

const InputField: React.FC<Props> = ({
  id,
  height,
  width,
  type = "text",
  border,
  onChange,
  onKeyPress,
  placeholder,
  value,
  assetCharacter,
  readOnly = false,
  onClick,
  icon,
  className,
  required,
  maxLength,
  name,
  inputMode,
  disabled = false,
  ...rest
}) => {
  return (
    <div style={{ position: "relative", width }}>
      {icon && (
        <span
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}
        >
          {icon}
        </span>
      )}
      <input
        id={id}
        name={name}
        type={type}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value ?? ""}
        readOnly={readOnly}
        onClick={onClick}
        required={required}
        inputMode={inputMode}
        style={{
          width,
          height,
          border,
          paddingLeft: icon ? "40px" : "10px",
        }}
        className={`${className} w-full border font-Poppins text-[15px] outline-none rounded-[3px] px-2 md:h-[40px] sm:h-[40px] max-sm:rounded-0 max-sm:text-[14px] placeholder:text-[#CCCCCC] placeholder:font-light text-blackColor`}
        disabled={disabled}
        {...rest}
      />
    </div>
  );
};

export default InputField;
