import React, { ChangeEvent, FC } from 'react';

interface TextAreaProps {
  value?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  cols?: number;
  maxLength?: number;
  disabled?: boolean;
  name?: string;
}

const TextArea: FC<TextAreaProps> = ({
  value = '',
  onChange,
  placeholder = '',
  rows = 4,
  cols = 50,
  maxLength = 500,
  disabled = false,
  name,
}) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      cols={cols}
      maxLength={maxLength}
      disabled={disabled}
      className="text-area border w-full rounded-[3px] p-2 resize-none outline-none text-[14px]"
    />
  );
};

export default TextArea;
