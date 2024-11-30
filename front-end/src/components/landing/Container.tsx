interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <div
      className={`max-w-[1440px] mx-auto w-full  md:px-[4%] 2xl:px-0 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default Container;
