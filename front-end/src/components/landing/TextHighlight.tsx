import React from "react";

interface TextHighlightProps {
  text: string;
  textSize?: string;
  className?: string;
}

const TextHighlight: React.FC<TextHighlightProps> = ({
  text,
  textSize = "lg:text-[18px] md:text-[16px] sm:text-xs",
}) => {
  return <p className={`${textSize} font-semibold text-websiteBlue`}>{text}</p>;
};

const Heading: React.FC<TextHighlightProps> = ({
  text,
  textSize = "text-[45px]",
  className,
}) => {
  return <h1 className={`${textSize} font-semibold ${className}`}>{text}</h1>;
};

export { TextHighlight, Heading };
