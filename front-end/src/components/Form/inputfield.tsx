import React from "react";

interface Props {
    height?: string;
    width?: string;
    type?: "text" | "password" | "number" | "email" | "search";
    onChange?: (e: any) => void;
    placeholder?: string;
    value?: string | number;
    border?: string;
  }

  const InputField = (props: Props) => {
    const { width, height, type = "text", border } = props;

  return (
    <input
      type={type}
      className="border font-Poppins text-[15px] w-full h-[40px] outline-none rounded-[3px] px-2 max-sm:h-[35px] max-sm:rounded-0 max-sm:text-[14px]"
      style={{ width, height,border }}
      {...props}
    />
  );
};

export default InputField;