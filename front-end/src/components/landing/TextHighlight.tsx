import React from "react";

interface TextHighlightProps {
  text: string;
  textSize?: string;
}

const TextHighlight: React.FC<TextHighlightProps> = ({ text }) => {
  return <p className="text-[18px] font-semibold text-yellow">{text}</p>;
};
const Heading: React.FC<TextHighlightProps> = ({
  text,
  textSize = "text-[45px]",
}) => {
  return <h1 className={`${textSize} font-semibold`}>{text}</h1>;
};

export { TextHighlight, Heading };
